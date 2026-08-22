<?php
// app/Http/Controllers/Api/OrderController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * OrderController — Seller order management.
 *
 * index/show/details: Real queries scoped to authenticated seller's store.
 * store/update/destroy: 501 — order creation is handled by checkout flow.
 * updateStatus: Real implementation for seller-driven status changes.
 */
class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $store = $request->user()->store;

        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        $perPage = min(max((int) $request->integer('per_page', 20), 1), 100);

        $orders = Order::where('store_id', $store->id)
            ->when(
                $request->filled('status'),
                fn ($q) => $q->where('status', $request->input('status'))
            )
            ->when(
                $request->filled('payment_status'),
                fn ($q) => $q->where('payment_status', $request->input('payment_status'))
            )
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json($orders);
    }

    public function store(Request $request): JsonResponse
    {
        // Orders are created by the checkout flow, not directly by seller API.
        return response()->json([
            'message' => 'Orders are created via the checkout flow.',
            'code'    => 'USE_CHECKOUT_ENDPOINT',
        ], 501);
    }

    public function show(Request $request, $id): JsonResponse
    {
        $store = $request->user()->store;

        // Scope to seller's store — prevents IDOR
        $order = Order::where('store_id', $store?->id)->findOrFail($id);

        return response()->json(['data' => $order]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        return response()->json([
            'message' => 'Direct order updates are not supported. Use the status update endpoint.',
            'code'    => 'USE_STATUS_ENDPOINT',
        ], 501);
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        return response()->json([
            'message' => 'Order deletion is not permitted. Orders may be cancelled via status update.',
            'code'    => 'ORDER_DELETION_NOT_PERMITTED',
        ], 501);
    }

    public function details(Request $request, $id): JsonResponse
    {
        $store = $request->user()->store;

        $order = Order::where('store_id', $store?->id)
            ->with(['items', 'payments'])
            ->findOrFail($id);

        return response()->json(['data' => $order]);
    }

    public function updateStatus(Request $request, $id): JsonResponse
    {
        $store = $request->user()->store;

        $order = Order::where('store_id', $store?->id)->findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,processing,shipped,delivered,cancelled',
            'note'   => 'nullable|string|max:1000',
        ]);

        $previousStatus = $order->status;
        $order->update(['status' => $validated['status']]);

        // Record status history
        $order->statusHistory()->create([
            'from_status' => $previousStatus,
            'to_status'   => $validated['status'],
            'changed_by'  => $request->user()->id,
            'note'        => $validated['note'] ?? null,
        ]);

        return response()->json([
            'data'    => $order->fresh(),
            'message' => 'Order status updated successfully.',
        ]);
    }
}
