<?php
// app/Models/ProductVariant.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id', 'title', 'sku', 'price',
        'compare_at_price', 'stock_quantity', 'options', 'is_active',
    ];

    protected $casts = [
        'price'            => 'decimal:2',
        'compare_at_price' => 'decimal:2',
        'stock_quantity'   => 'integer',
        'options'          => 'json',
        'is_active'        => 'boolean',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
