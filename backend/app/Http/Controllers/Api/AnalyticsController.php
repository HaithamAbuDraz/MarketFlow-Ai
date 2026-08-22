<?php
// app/Http/Controllers/Api/AnalyticsController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\InventoryMovement;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    /**
     * High-level analytics overview for the seller's store.
     */
    public function overview(Request $request): JsonResponse
    {
        $store = $request->user()->store;
        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        $storeId = $store->id;
        $now = Carbon::now();
        $thirtyDaysAgo = $now->copy()->subDays(30);

        $totalRevenue = (float) Order::where('store_id', $storeId)
            ->where('payment_status', 'paid')
            ->sum('total_amount');

        $totalOrders = Order::where('store_id', $storeId)->count();
        $paidOrders = Order::where('store_id', $storeId)->where('payment_status', 'paid')->count();
        $averageOrderValue = $paidOrders > 0 ? round($totalRevenue / $paidOrders, 2) : 0.00;

        $totalProducts = Product::where('store_id', $storeId)->count();
        $activeProducts = Product::where('store_id', $storeId)->where('status', 'active')->count();
        $totalCustomers = Customer::where('store_id', $storeId)->count();

        // 30-day revenue trend
        $recentOrders = Order::where('store_id', $storeId)
            ->where('payment_status', 'paid')
            ->where('created_at', '>=', $thirtyDaysAgo)
            ->select([
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(id) as orders_count'),
                DB::raw('SUM(total_amount) as daily_revenue'),
            ])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date', 'asc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data'   => [
                'revenue' => [
                    'total'    => $totalRevenue,
                    'currency' => 'USD',
                ],
                'orders' => [
                    'total'               => $totalOrders,
                    'paid'                => $paidOrders,
                    'average_order_value' => $averageOrderValue,
                ],
                'products' => [
                    'total'  => $totalProducts,
                    'active' => $activeProducts,
                ],
                'customers' => [
                    'total' => $totalCustomers,
                ],
                'recent_trend' => $recentOrders,
            ],
        ]);
    }

    /**
     * Sales breakdown by date range.
     */
    public function sales(Request $request): JsonResponse
    {
        $store = $request->user()->store;
        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        $storeId = $store->id;
        $days = min(max((int) $request->integer('days', 30), 1), 365);
        $startDate = Carbon::now()->subDays($days);

        $salesData = Order::where('store_id', $storeId)
            ->where('created_at', '>=', $startDate)
            ->select([
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(id) as total_orders'),
                DB::raw('SUM(CASE WHEN payment_status = "paid" THEN total_amount ELSE 0 END) as paid_revenue'),
                DB::raw('SUM(CASE WHEN status = "cancelled" THEN 1 ELSE 0 END) as cancelled_orders'),
            ])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date', 'asc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data'   => [
                'period_days' => $days,
                'sales'       => $salesData,
            ],
        ]);
    }

    /**
     * Product performance metrics.
     */
    public function products(Request $request): JsonResponse
    {
        $store = $request->user()->store;
        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        $storeId = $store->id;

        $topProducts = Product::where('store_id', $storeId)
            ->withCount('orderItems')
            ->orderBy('order_items_count', 'desc')
            ->take(10)
            ->get(['id', 'title', 'price', 'stock_quantity', 'status']);

        $stockDistribution = [
            'in_stock' => Product::where('store_id', $storeId)->where('stock_quantity', '>', 5)->count(),
            'low_stock' => Product::where('store_id', $storeId)->whereBetween('stock_quantity', [1, 5])->count(),
            'out_of_stock' => Product::where('store_id', $storeId)->where('stock_quantity', '<=', 0)->count(),
        ];

        return response()->json([
            'status' => 'success',
            'data'   => [
                'top_products'       => $topProducts,
                'stock_distribution' => $stockDistribution,
            ],
        ]);
    }

    /**
     * Customer analytics metrics.
     */
    public function customers(Request $request): JsonResponse
    {
        $store = $request->user()->store;
        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        $storeId = $store->id;

        $totalCustomers = Customer::where('store_id', $storeId)->count();
        $repeatCustomers = Customer::where('store_id', $storeId)->where('total_orders', '>', 1)->count();
        $totalCustomerSpent = (float) Customer::where('store_id', $storeId)->sum('total_spent');

        $topCustomers = Customer::where('store_id', $storeId)
            ->orderBy('total_spent', 'desc')
            ->take(10)
            ->get(['id', 'first_name', 'last_name', 'email', 'total_orders', 'total_spent']);

        return response()->json([
            'status' => 'success',
            'data'   => [
                'total_customers'       => $totalCustomers,
                'repeat_customers'      => $repeatCustomers,
                'repeat_customer_rate'  => $totalCustomers > 0 ? round(($repeatCustomers / $totalCustomers) * 100, 2) : 0,
                'total_customer_spent'  => $totalCustomerSpent,
                'top_customers'         => $topCustomers,
            ],
        ]);
    }

    /**
     * Inventory movements and stock metrics.
     */
    public function inventory(Request $request): JsonResponse
    {
        $store = $request->user()->store;
        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        $storeId = $store->id;

        $movementsSummary = InventoryMovement::whereHas('product', function ($q) use ($storeId) {
            $q->where('store_id', $storeId);
        })
            ->select([
                'type',
                DB::raw('COUNT(id) as total_events'),
                DB::raw('SUM(quantity_change) as net_quantity_change'),
            ])
            ->groupBy('type')
            ->get();

        return response()->json([
            'status' => 'success',
            'data'   => [
                'movements_summary' => $movementsSummary,
            ],
        ]);
    }

    /**
     * Generate structured export summary.
     */
    public function export(Request $request): JsonResponse
    {
        $store = $request->user()->store;
        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        return response()->json([
            'status'  => 'success',
            'message' => 'Analytics export generated.',
            'data'    => [
                'store_name'   => $store->name,
                'generated_at' => Carbon::now()->toIso8601String(),
                'export_type'  => $request->input('type', 'sales_summary'),
            ],
        ]);
    }
}
