<?php
// app/Http/Resources/ProductVariantResource.php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductVariantResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'product_id'       => $this->product_id,
            'title'            => $this->title,
            'sku'              => $this->sku,
            'price'            => $this->price,
            'compare_at_price' => $this->compare_at_price,
            'stock_quantity'   => $this->stock_quantity,
            'options'          => $this->options,
            'is_active'        => $this->is_active,
            'created_at'       => $this->created_at,
            'updated_at'       => $this->updated_at,
        ];
    }
}
