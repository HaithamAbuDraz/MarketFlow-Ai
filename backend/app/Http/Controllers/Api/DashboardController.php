<?php
// app/Http/Controllers/Api/DashboardController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Return real dashboard overview metrics for the authenticated seller's store.
     *
     * Previously returned hardcoded fake numbers.
     */
    public function overview(Request $request): JsonResponse
    {
        $store = $request->user()->store;

        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        $storeId = $store->id;

        // Orders summary
        $totalOrders   = Order::where('store_id', $storeId)->count();
        $pendingOrders = Order::where('store_id', $storeId)->where('status', 'pending')->count();

        // Revenue (only from paid orders)
        $totalRevenue = Order::where('store_id', $storeId)
            ->where('payment_status', 'paid')
            ->sum('total_amount');

        // Products
        $totalProducts   = Product::where('store_id', $storeId)->count();
        $lowStockProducts = Product::where('store_id', $storeId)
            ->where('track_inventory', true)
            ->whereColumn('stock_quantity', '<=', 'low_stock_threshold')
            ->count();

        return response()->json([
            'data' => [
                'sales'    => [
                    'total'    => (float) $totalRevenue,
                    'currency' => 'USD',
                ],
                'orders'   => [
                    'total'   => $totalOrders,
                    'pending' => $pendingOrders,
                ],
                'products' => [
                    'total'     => $totalProducts,
                    'low_stock' => $lowStockProducts,
                ],
            ],
        ]);
    }
}
