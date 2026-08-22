<?php
// app/Http/Controllers/Api/SettingsController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password as PasswordRule;

class SettingsController extends Controller
{
    public function account(Request $request): JsonResponse
    {
        $user = $request->user();
        return response()->json([
            'status' => 'success',
            'data'   => [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email,
                'store_name' => $user->store_name,
                'role'       => $user->role,
                'created_at' => $user->created_at,
            ],
        ]);
    }

    public function updateAccount(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'       => 'nullable|string|max:255',
            'store_name' => 'nullable|string|max:255',
            'email'      => [
                'sometimes',
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
        ]);

        $user->update($validated);

        return response()->json([
            'status'  => 'success',
            'message' => 'Account settings updated successfully.',
            'data'    => $user->fresh(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $store = $request->user()->store;
        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        return response()->json([
            'status' => 'success',
            'data'   => $store,
        ]);
    }

    public function updateStore(Request $request): JsonResponse
    {
        $store = $request->user()->store;
        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        $validated = $request->validate([
            'name'            => 'sometimes|required|string|max:255',
            'description'     => 'nullable|string|max:1000',
            'domain'          => 'nullable|string|max:255',
            'logo'            => 'nullable|string|max:500',
            'banner'          => 'nullable|string|max:500',
            'colors'          => 'nullable|array',
            'layout_settings' => 'nullable|array',
        ]);

        $store->update($validated);

        return response()->json([
            'status'  => 'success',
            'message' => 'Store settings updated successfully.',
            'data'    => $store->fresh(),
        ]);
    }

    public function payments(Request $request): JsonResponse
    {
        $store = $request->user()->store;
        return response()->json([
            'status' => 'success',
            'data'   => [
                'currency'              => 'USD',
                'gateway'               => 'mock',
                'is_gateway_configured' => false,
                'available_gateways'    => ['stripe', 'paypal'],
            ],
        ]);
    }

    public function updatePayments(Request $request): JsonResponse
    {
        return response()->json([
            'status'  => 'success',
            'message' => 'Payment settings saved.',
        ]);
    }

    public function shipping(Request $request): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data'   => [
                'flat_rate'     => 5.00,
                'free_shipping' => false,
                'handling_fee'  => 0.00,
            ],
        ]);
    }

    public function updateShipping(Request $request): JsonResponse
    {
        return response()->json([
            'status'  => 'success',
            'message' => 'Shipping settings saved.',
        ]);
    }

    public function notifications(Request $request): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data'   => [
                'email_order_placed'    => true,
                'email_order_shipped'   => true,
                'email_low_stock_alert' => true,
            ],
        ]);
    }

    public function updateNotifications(Request $request): JsonResponse
    {
        return response()->json([
            'status'  => 'success',
            'message' => 'Notification preferences saved.',
        ]);
    }

    public function security(Request $request): JsonResponse
    {
        $user = $request->user();
        return response()->json([
            'status' => 'success',
            'data'   => [
                'active_tokens_count' => $user->tokens()->count(),
                'role'                => $user->role,
                'two_factor_enabled'  => false,
            ],
        ]);
    }

    public function updateSecurity(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'current_password' => 'required|string',
            'password'         => [
                'required',
                'confirmed',
                PasswordRule::min(8)->mixedCase()->numbers()->symbols(),
            ],
        ]);

        if (! Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'status'  => 'error',
                'message' => 'The provided current password does not match our records.',
                'errors'  => [
                    'current_password' => ['The current password is incorrect.']
                ]
            ], 422);
        }

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Password updated successfully.',
        ]);
    }

    public function activityLogs(Request $request): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data'   => [],
        ]);
    }
}
