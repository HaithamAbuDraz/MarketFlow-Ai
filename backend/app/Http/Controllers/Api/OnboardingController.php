<?php
// app/Http/Controllers/Api/OnboardingController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OnboardingController extends Controller
{
    /**
     * Save basic store setup during onboarding.
     */
    public function storeSetup(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'store_name' => 'required|string|max:255',
            'store_slug' => 'nullable|string|max:255',
            'theme'      => 'nullable|string|max:100',
        ]);

        $user = $request->user();
        $store = $user->store;

        $slug = ! empty($validated['store_slug'])
            ? Str::slug($validated['store_slug'])
            : Str::slug($validated['store_name']) . '-' . Str::lower(Str::random(4));

        if (! $store) {
            $store = Store::create([
                'user_id'         => $user->id,
                'name'            => $validated['store_name'],
                'slug'            => $slug,
                'layout_settings' => ['theme' => $validated['theme'] ?? 'modern'],
                'status'          => 'pending',
            ]);
        } else {
            $settings = $store->layout_settings ?? [];
            $settings['theme'] = $validated['theme'] ?? 'modern';

            $store->update([
                'name'            => $validated['store_name'],
                'layout_settings' => $settings,
            ]);
        }

        $user->update(['store_name' => $validated['store_name']]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Store setup saved successfully.',
            'data'    => $store->fresh(),
        ]);
    }

    /**
     * Save business details and category.
     */
    public function businessInfo(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category'        => 'required|string|max:255',
            'description'     => 'nullable|string|max:1000',
            'type'            => 'nullable|string|max:100',
            'target_audience' => 'nullable|string|max:255',
        ]);

        $user = $request->user();
        $store = $user->store;

        if ($store) {
            $layoutSettings = $store->layout_settings ?? [];
            $layoutSettings['business_category'] = $validated['category'];
            $layoutSettings['business_type'] = $validated['type'] ?? null;
            $layoutSettings['target_audience'] = $validated['target_audience'] ?? null;

            $store->update([
                'description'     => $validated['description'] ?? $store->description,
                'layout_settings' => $layoutSettings,
            ]);
        }

        return response()->json([
            'status'  => 'success',
            'message' => 'Business information saved.',
            'data'    => $store ? $store->fresh() : [],
        ]);
    }

    /**
     * Save localization and display preferences.
     */
    public function preferences(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'language'    => 'nullable|string|max:20',
            'currency'    => 'nullable|string|max:10',
            'time_zone'   => 'nullable|string|max:50',
            'unit_system' => 'nullable|string|max:50',
        ]);

        $user = $request->user();
        $store = $user->store;

        if ($store) {
            $layoutSettings = $store->layout_settings ?? [];
            $layoutSettings['preferences'] = $validated;

            $store->update([
                'layout_settings' => $layoutSettings,
            ]);
        }

        return response()->json([
            'status'  => 'success',
            'message' => 'Preferences saved.',
            'data'    => $store ? $store->fresh() : [],
        ]);
    }

    /**
     * Finalize the onboarding wizard and activate the store.
     */
    public function complete(Request $request): JsonResponse
    {
        $user = $request->user();
        $store = Store::where('user_id', $user->id)->first();

        if ($store) {
            $store->update([
                'status' => 'active',
            ]);
        }

        return response()->json([
            'status'  => 'success',
            'message' => 'Onboarding completed successfully. Welcome to MarketFlow-AI!',
            'data'    => [
                'user'  => $user->fresh(['store']),
                'store' => $store ? $store->fresh() : null,
            ],
        ]);
    }
}
