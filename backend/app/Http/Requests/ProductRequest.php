<?php
// app/Http/Requests/ProductRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Authorization is enforced by the ProductPolicy on the controller.
        // The policy ensures the authenticated user is a seller with a store.
        return true;
    }

    public function rules(): array
    {
        $product = $this->route('product');
        $productId = $product?->id;

        // Derive store_id from the authenticated seller's store — NEVER trust client input.
        $storeId = $this->user()?->store?->id;

        return [
            'category_id' => [
                'nullable',
                Rule::exists('categories', 'id')->where('store_id', $storeId),
            ],
            'title' => 'required|string|max:255',

            // Slug is unique per store, not globally.
            'slug' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('products', 'slug')
                    ->where('store_id', $storeId)
                    ->ignore($productId),
            ],

            'description'       => 'nullable|string',
            'short_description' => 'nullable|string|max:500',

            // Price must be non-negative
            'price'             => 'required|numeric|min:0',
            'compare_at_price'  => 'nullable|numeric|min:0|gt:price',

            'sku'     => 'nullable|string|max:100',
            'barcode' => 'nullable|string|max:100',
            'weight'  => 'nullable|integer|min:0',

            'images'  => 'nullable|array|max:10',
            'images.*' => 'string|url',

            'status' => 'required|in:active,draft,archived',

            'track_inventory'    => 'boolean',
            'stock_quantity'     => 'integer|min:0',
            'low_stock_threshold' => 'integer|min:0',

            // Variant rules
            'variants'                  => 'nullable|array|max:100',
            'variants.*.title'          => 'required_with:variants|string|max:255',
            'variants.*.sku'            => 'nullable|string|max:100',
            'variants.*.price'          => 'nullable|numeric|min:0',
            'variants.*.compare_at_price' => 'nullable|numeric|min:0',
            'variants.*.stock_quantity' => 'integer|min:0',
            'variants.*.options'        => 'nullable|array',
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.exists'     => 'The selected category does not belong to your store.',
            'price.min'              => 'Price cannot be negative.',
            'compare_at_price.gt'   => 'Compare-at price must be greater than the selling price.',
            'stock_quantity.min'     => 'Stock quantity cannot be negative.',
            'slug.regex'             => 'Slug may only contain lowercase letters, numbers, and hyphens.',
            'variants.*.price.min'   => 'Variant price cannot be negative.',
        ];
    }
}