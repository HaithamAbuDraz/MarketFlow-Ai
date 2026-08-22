<?php
// app/Http/Controllers/Api/ProductController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Maximum records per page to prevent unbounded queries.
     */
    private const MAX_PER_PAGE = 100;
    private const DEFAULT_PER_PAGE = 20;

    public function index(Request $request)
    {
        $store = $request->user()->store;

        if (! $store) {
            return response()->json([
                'message' => 'No store found for this account.',
            ], 422);
        }

        // Enforce pagination cap: 1–100 items per page.
        $perPage = min(
            max((int) $request->integer('per_page', self::DEFAULT_PER_PAGE), 1),
            self::MAX_PER_PAGE
        );

        $products = Product::where('store_id', $store->id)
            ->with(['category', 'variants'])
            ->when(
                $request->filled('search'),
                fn ($q) => $q->where('title', 'like', '%' . $request->string('search') . '%')
            )
            ->when(
                $request->filled('status'),
                fn ($q) => $q->where('status', $request->input('status'))
            )
            ->when(
                $request->filled('category_id'),
                fn ($q) => $q->where('category_id', $request->integer('category_id'))
            )
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return ProductResource::collection($products);
    }

    public function store(ProductRequest $request)
    {
        $store = $request->user()->store;

        if (! $store) {
            return response()->json([
                'message' => 'No store found for this account.',
            ], 422);
        }

        $product = DB::transaction(function () use ($request, $store) {
            $data = $request->validated();

            // Auto-generate slug from title if not provided or empty
            if (empty($data['slug'])) {
                $data['slug'] = Str::slug($data['title']);
            }

            // Exclude variants from the product data
            $variants = $data['variants'] ?? null;
            unset($data['variants']);

            // store_id must come from the authenticated user, never from request body
            $data['store_id'] = $store->id;

            $product = Product::create($data);

            if (! empty($variants)) {
                $product->variants()->createMany($variants);
            }

            return $product;
        });

        return new ProductResource($product->load(['category', 'variants']));
    }

    public function show(Product $product)
    {
        $this->authorize('view', $product);

        return new ProductResource(
            $product->load(['category', 'variants', 'inventoryMovements'])
        );
    }

    public function update(ProductRequest $request, Product $product)
    {
        $this->authorize('update', $product);

        $product = DB::transaction(function () use ($request, $product) {
            $data = $request->validated();
            $variants = $data['variants'] ?? null;
            unset($data['variants']);

            // store_id cannot be changed via update
            unset($data['store_id']);

            $product->update($data);

            // Replace variants if provided
            if ($variants !== null) {
                $product->variants()->delete();
                $product->variants()->createMany($variants);
            }

            return $product;
        });

        return new ProductResource($product->fresh()->load(['category', 'variants']));
    }

    public function destroy(Product $product)
    {
        $this->authorize('delete', $product);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully.']);
    }

    public function inventory(Request $request, Product $product): JsonResponse
    {
        $this->authorize('view', $product);

        return response()->json([
            'data' => [
                'stock_quantity'      => $product->stock_quantity,
                'low_stock_threshold' => $product->low_stock_threshold,
                'track_inventory'     => $product->track_inventory,
                'movements'           => $product->inventoryMovements()
                    ->orderBy('created_at', 'desc')
                    ->take(50)
                    ->get(),
            ],
        ]);
    }
}