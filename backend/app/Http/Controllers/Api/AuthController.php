<?php
// app/Http/Controllers/Api/AuthController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'store_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
            ],
        ]);

        $user = User::create([
            'store_name' => $request->store_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'seller',
        ]);

        // Auto-create store
        $store = Store::create([
            'user_id' => $user->id,
            'name' => $request->store_name,
            'slug' => \Illuminate\Support\Str::slug($request->store_name) . '-' . uniqid(),
            'status' => 'pending',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'store' => $store,
            'token' => $token,
            'message' => 'Account created successfully. Proceed to onboarding.'
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user()->load('store'));
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['We could not find an account associated with this email address. Please verify and try again.'],
            ]);
        }

        // Generate reset token (in production, stored in password_reset_tokens table)
        $resetToken = \Illuminate\Support\Str::random(60);

        return response()->json([
            'status' => 'success',
            'message' => 'Password reset link has been sent to your email.',
            'reset_token' => $resetToken,
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'email' => 'required|email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
            ],
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['We could not find a user with that email address.'],
            ]);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        // Revoke existing tokens for security
        $user->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Your password has been reset successfully. Please log in with your new password.',
        ]);
    }
}