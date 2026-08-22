<?php
// app/Http/Controllers/Api/InventoryController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InventoryMovement;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class InventoryController extends Controller
{
    /**
     * Get inventory overview metrics for the authenticated seller's store.
     */
    public function overview(Request $request): JsonResponse
    {
        $store = $request->user()->store;
        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        $storeId = $store->id;

        $totalTracked = Product::where('store_id', $storeId)
            ->where('track_inventory', true)
            ->count();

        $totalStockUnits = (int) Product::where('store_id', $storeId)
            ->where('track_inventory', true)
            ->sum('stock_quantity');

        $lowStockCount = Product::where('store_id', $storeId)
            ->where('track_inventory', true)
            ->where('stock_quantity', '>', 0)
            ->whereColumn('stock_quantity', '<=', 'low_stock_threshold')
            ->count();

        $outOfStockCount = Product::where('store_id', $storeId)
            ->where('track_inventory', true)
            ->where('stock_quantity', '<=', 0)
            ->count();

        $recentMovements = InventoryMovement::whereHas('product', function ($q) use ($storeId) {
            $q->where('store_id', $storeId);
        })
            ->with(['product:id,title,sku', 'variant:id,title,sku', 'creator:id,name,email'])
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        return response()->json([
            'data' => [
                'total_tracked_products' => $totalTracked,
                'total_stock_units'      => $totalStockUnits,
                'low_stock_count'        => $lowStockCount,
                'out_of_stock_count'     => $outOfStockCount,
                'recent_movements'       => $recentMovements,
            ],
        ]);
    }

    /**
     * Get paginated inventory movements for products in the authenticated seller's store.
     */
    public function movements(Request $request): JsonResponse
    {
        $store = $request->user()->store;
        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        $perPage = min(max((int) $request->integer('per_page', 20), 1), 100);
        $storeId = $store->id;

        $query = InventoryMovement::whereHas('product', function ($q) use ($storeId) {
            $q->where('store_id', $storeId);
        })
            ->with(['product:id,title,sku', 'variant:id,title,sku', 'creator:id,name,email'])
            ->when($request->filled('product_id'), function ($q) use ($request) {
                $q->where('product_id', $request->integer('product_id'));
            })
            ->when($request->filled('type'), function ($q) use ($request) {
                $q->where('type', $request->string('type'));
            })
            ->orderBy('created_at', 'desc');

        $movements = $query->paginate($perPage);

        return response()->json($movements);
    }

    /**
     * Adjust inventory stock in an atomic database transaction.
     *
     * Creates an immutable inventory movement record and updates the product or variant stock.
     */
    public function adjust(Request $request): JsonResponse
    {
        $store = $request->user()->store;
        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        $storeId = $store->id;

        $validated = $request->validate([
            'product_id' => [
                'required',
                'integer',
                Rule::exists('products', 'id')->where('store_id', $storeId),
            ],
            'product_variant_id' => [
                'nullable',
                'integer',
                Rule::exists('product_variants', 'id')->where('product_id', $request->input('product_id')),
            ],
            'type' => 'required|string|in:adjustment,restock,correction,damage,sale,return',
            'quantity_change' => 'required|integer|not_in:0',
            'note' => 'nullable|string|max:500',
        ]);

        $movement = DB::transaction(function () use ($validated, $request) {
            $product = Product::where('id', $validated['product_id'])
                ->lockForUpdate()
                ->firstOrFail();

            $variant = null;
            if (! empty($validated['product_variant_id'])) {
                $variant = ProductVariant::where('id', $validated['product_variant_id'])
                    ->where('product_id', $product->id)
                    ->lockForUpdate()
                    ->firstOrFail();
                $quantityBefore = $variant->stock_quantity ?? 0;
            } else {
                $quantityBefore = $product->stock_quantity ?? 0;
            }

            $quantityChange = (int) $validated['quantity_change'];
            $quantityAfter = $quantityBefore + $quantityChange;

            if ($quantityAfter < 0) {
                throw ValidationException::withMessages([
                    'quantity_change' => [
                        "Insufficient stock. Current stock is {$quantityBefore}, cannot adjust by {$quantityChange}."
                    ],
                ]);
            }

            if ($variant) {
                $variant->update(['stock_quantity' => $quantityAfter]);
            } else {
                $product->update(['stock_quantity' => $quantityAfter]);
            }

            $record = InventoryMovement::create([
                'product_id'         => $product->id,
                'product_variant_id' => $variant?->id,
                'type'               => $validated['type'],
                'quantity_change'    => $quantityChange,
                'quantity_before'    => $quantityBefore,
                'quantity_after'     => $quantityAfter,
                'note'               => $validated['note'] ?? null,
                'created_by'         => $request->user()->id,
            ]);

            return $record->load(['product:id,title,sku,stock_quantity', 'variant:id,title,sku,stock_quantity', 'creator:id,name,email']);
        });

        return response()->json([
            'status'  => 'success',
            'message' => 'Inventory adjusted successfully.',
            'data'    => $movement,
        ], 200);
    }
}
