<?php
// app/Http/Requests/ProductRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => 'nullable|exists:categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug,' . $this->product?->id,
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'price' => 'required|numeric|min:0',
            'compare_at_price' => 'nullable|numeric|min:0',
            'sku' => 'nullable|string|max:100',
            'barcode' => 'nullable|string|max:100',
            'weight' => 'nullable|integer|min:0',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'status' => 'required|in:active,draft,archived',
            'track_inventory' => 'boolean',
            'stock_quantity' => 'integer|min:0',
            'low_stock_threshold' => 'integer|min:0',
            'variants' => 'nullable|array',
            'variants.*.title' => 'required_with:variants|string',
            'variants.*.sku' => 'nullable|string',
            'variants.*.price' => 'nullable|numeric|min:0',
            'variants.*.options' => 'nullable|array',
            'variants.*.stock_quantity' => 'integer|min:0',
        ];
    }
}