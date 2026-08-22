<?php
// app/Http/Controllers/Api/OrderTrackingController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Store;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderTrackingController extends Controller
{
    /**
     * Get order confirmation details for a placed order in a store.
     */
    public function confirmation(Request $request, $storeSlug, $orderIdentifier): JsonResponse
    {
        $store = $storeSlug instanceof Store ? $storeSlug : Store::where('slug', $storeSlug)->firstOrFail();
        
        $order = $orderIdentifier instanceof Order 
            ? $orderIdentifier 
            : Order::where('order_number', $orderIdentifier)
                ->orWhere('id', $orderIdentifier)
                ->firstOrFail();

        // Ensure order belongs to this store
        if ($order->store_id !== $store->id) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Order not found in this store.',
            ], 404);
        }

        $order->load(['items', 'store:id,name,slug']);

        return response()->json([
            'status' => 'success',
            'data'   => [
                'order_number'    => $order->order_number,
                'status'          => $order->status,
                'payment_status'  => $order->payment_status,
                'subtotal'        => $order->subtotal,
                'shipping_cost'   => $order->shipping_cost,
                'tax_amount'      => $order->tax_amount,
                'discount_amount' => $order->discount_amount,
                'total'           => $order->total ?: $order->total_amount,
                'currency'        => $order->currency ?: 'USD',
                'created_at'      => $order->created_at,
                'items'           => $order->items,
                'store'           => [
                    'id'   => $store->id,
                    'name' => $store->name,
                    'slug' => $store->slug,
                ],
            ],
        ]);
    }

    /**
     * Track live order status and fulfillment milestones.
     *
     * Returns dynamic order state based on actual database records and status history.
     */
    public function track(Request $request, $storeSlug, $orderIdentifier): JsonResponse
    {
        $store = $storeSlug instanceof Store ? $storeSlug : Store::where('slug', $storeSlug)->firstOrFail();
        
        $order = $orderIdentifier instanceof Order 
            ? $orderIdentifier 
            : Order::where('order_number', $orderIdentifier)
                ->orWhere('id', $orderIdentifier)
                ->firstOrFail();

        // Ensure order belongs to this store
        if ($order->store_id !== $store->id) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Order not found in this store.',
            ], 404);
        }

        $history = $order->statusHistory()
            ->orderBy('created_at', 'asc')
            ->get(['id', 'from_status', 'to_status', 'note', 'created_at']);

        return response()->json([
            'status' => 'success',
            'data'   => [
                'order_number'    => $order->order_number,
                'current_status'  => $order->status,
                'payment_status'  => $order->payment_status,
                'placed_at'       => $order->created_at,
                'paid_at'         => $order->paid_at,
                'shipped_at'      => $order->shipped_at,
                'delivered_at'    => $order->delivered_at,
                'timeline'        => $history,
                'items_count'     => $order->items()->count(),
            ],
        ]);
    }
}
