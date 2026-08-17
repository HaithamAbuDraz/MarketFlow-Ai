<?php
// app/Models/Product.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'store_id', 'category_id', 'title', 'slug', 'description',
        'short_description', 'price', 'compare_at_price', 'sku', 'barcode',
        'weight', 'images', 'status', 'track_inventory', 'stock_quantity', 'low_stock_threshold'
    ];

    protected $casts = [
        'images' => 'json',
        'price' => 'decimal:2',
        'compare_at_price' => 'decimal:2',
    ];

    public function store() {
        return $this->belongsTo(Store::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function variants() {
        return $this->hasMany(ProductVariant::class);
    }

    public function inventoryMovements() {
        return $this->hasMany(InventoryMovement::class);
    }

    public function orderItems() {
        return $this->hasMany(OrderItem::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }

    public function cartItems() {
        return $this->hasMany(CartItem::class);
    }
}