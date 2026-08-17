<?php
// app/Http/Controllers/Api/ProductController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::where('store_id', auth()->user()->store->id)
            ->with(['category', 'variants'])
            ->when($request->search, fn($q, $search) => $q->where('title', 'like', "%{$search}%"))
            ->when($request->status, fn($q, $status) => $q->where('status', $status))
            ->when($request->category_id, fn($q, $cat) => $q->where('category_id', $cat))
            ->paginate($request->per_page ?? 20);

        return ProductResource::collection($products);
    }

    public function store(ProductRequest $request)
    {
        $product = auth()->user()->store->products()->create($request->validated());

        if ($request->has('variants')) {
            $product->variants()->createMany($request->variants);
        }

        return new ProductResource($product->load('variants'));
    }

    public function show(Product $product)
    {
        $this->authorize('view', $product);
        return new ProductResource($product->load(['category', 'variants', 'inventoryMovements']));
    }

    public function update(ProductRequest $request, Product $product)
    {
        $this->authorize('update', $product);
        $product->update($request->validated());
        return new ProductResource($product->fresh());
    }

    public function destroy(Product $product)
    {
        $this->authorize('delete', $product);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}