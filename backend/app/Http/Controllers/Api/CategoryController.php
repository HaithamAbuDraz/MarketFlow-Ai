<?php
// app/Http/Controllers/Api/CategoryController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $store = $request->user()->store;

        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        $categories = Category::where('store_id', $store->id)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return response()->json(['data' => CategoryResource::collection($categories)]);
    }

    public function store(Request $request): JsonResponse
    {
        $store = $request->user()->store;

        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'slug'        => [
                'nullable',
                'string',
                'max:255',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('categories', 'slug')->where('store_id', $store->id),
            ],
            'description' => 'nullable|string',
            'parent_id'   => [
                'nullable',
                Rule::exists('categories', 'id')->where('store_id', $store->id),
            ],
            'sort_order'  => 'integer|min:0',
            'is_active'   => 'boolean',
        ]);

        // Auto-generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $validated['store_id'] = $store->id;

        $category = Category::create($validated);

        return response()->json(['data' => new CategoryResource($category)], 201);
    }

    public function show(Request $request, $id): JsonResponse
    {
        $store = $request->user()->store;

        $category = Category::where('store_id', $store?->id)->findOrFail($id);

        return response()->json(['data' => new CategoryResource($category)]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $store = $request->user()->store;

        if (! $store) {
            return response()->json(['message' => 'No store found for this account.'], 422);
        }

        // Scope to current store — prevents cross-tenant updates
        $category = Category::where('store_id', $store->id)->findOrFail($id);

        $validated = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'slug'        => [
                'sometimes',
                'string',
                'max:255',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('categories', 'slug')
                    ->where('store_id', $store->id)
                    ->ignore($category->id),
            ],
            'description' => 'nullable|string',
            'parent_id'   => [
                'nullable',
                Rule::exists('categories', 'id')->where('store_id', $store->id),
            ],
            'sort_order'  => 'integer|min:0',
            'is_active'   => 'boolean',
        ]);

        $category->update($validated);

        return response()->json(['data' => new CategoryResource($category->fresh())]);
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        $store = $request->user()->store;

        // Scope to current store — prevents cross-tenant deletes
        $category = Category::where('store_id', $store?->id)->findOrFail($id);

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully.']);
    }
}
