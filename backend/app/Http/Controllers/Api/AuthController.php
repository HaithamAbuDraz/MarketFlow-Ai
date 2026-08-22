<?php
// app/Http/Controllers/Api/AuthController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password as PasswordRule;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new seller account.
     *
     * Wrapped in a DB transaction so that if store creation fails,
     * the user record is also rolled back (no orphan users).
     */
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'store_name' => 'required|string|max:255',
            'email'      => 'required|string|email|max:255|unique:users',
            'password'   => [
                'required',
                'confirmed',
                PasswordRule::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
        ]);

        $result = DB::transaction(function () use ($validated) {
            $user = User::create([
                'store_name' => $validated['store_name'],
                'email'      => $validated['email'],
                'password'   => Hash::make($validated['password']),
                'role'       => 'seller',
            ]);

            $store = Store::create([
                'user_id' => $user->id,
                'name'    => $validated['store_name'],
                'slug'    => Str::slug($validated['store_name']) . '-' . Str::lower(Str::random(6)),
                'status'  => 'pending',
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return compact('user', 'store', 'token');
        });

        return response()->json([
            'user'    => $result['user'],
            'store'   => $result['store'],
            'token'   => $result['token'],
            'message' => 'Account created successfully. Proceed to onboarding.',
        ], 201);
    }

    /**
     * Authenticate an existing user.
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'  => $user->load('store'),
            'token' => $token,
        ]);
    }

    /**
     * Return the authenticated user's profile.
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json($request->user()->load('store'));
    }

    /**
     * Revoke the current access token (logout).
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully.']);
    }

    /**
     * Send a password-reset link.
     *
     * Security requirements:
     *  - Always return the same generic message regardless of whether the
     *    email exists, preventing user-enumeration attacks.
     *  - Token is stored in `password_reset_tokens` table (Laravel built-in).
     *  - Token is NEVER returned in the API response.
     *  - Rate-limited at the route level (throttle:5,1).
     */
    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email|max:255',
        ]);

        // Store token and attempt to send reset link.
        // We use a custom resolver so the reset URL points to the frontend,
        // not a non-existent web route.
        // Even if mail is not configured (e.g. in tests with MAIL_MAILER=log/array),
        // the token is still stored in password_reset_tokens.
        try {
            Password::broker()->sendResetLink(
                $request->only('email'),
                function ($user, $token) {
                    // In production, send a proper email with the frontend reset URL.
                    // For now, we log it so developers can find it.
                    $frontendUrl = config('app.frontend_url', config('app.url'));
                    $resetUrl = rtrim($frontendUrl, '/') . '/reset-password?token=' . $token . '&email=' . urlencode($user->email);
                    \Illuminate\Support\Facades\Log::info('Password reset link', [
                        'email' => $user->email,
                        'url'   => $resetUrl,
                    ]);
                }
            );
        } catch (\Exception $e) {
            // Swallow any exceptions (mail failures, etc.) — the token is still
            // stored in the DB. Never expose internal errors to the client.
            \Illuminate\Support\Facades\Log::error('Forgot password error', [
                'message' => $e->getMessage(),
            ]);
        }

        // Always return the same response — never reveal user existence.
        return response()->json([
            'message' => 'If an account exists for this email, a reset link has been sent.',
        ]);
    }


    /**
     * Reset the user's password using a valid token.
     *
     * Security requirements:
     *  - Token is validated against password_reset_tokens table.
     *  - Invalid/expired token → generic 422 (does NOT reveal user existence).
     *  - All existing tokens are revoked after successful reset.
     */
    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'token'    => 'required|string',
            'email'    => 'required|email|max:255',
            'password' => [
                'required',
                'confirmed',
                PasswordRule::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
        ]);

        $status = Password::broker()->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();

                // Revoke all tokens so existing sessions are invalidated.
                $user->tokens()->delete();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Your password has been reset successfully. Please log in with your new password.',
            ]);
        }

        // Do not expose the specific failure reason (invalid token, user not found, etc.).
        throw ValidationException::withMessages([
            'email' => ['The password reset request could not be completed. Please request a new reset link.'],
        ]);
    }
}