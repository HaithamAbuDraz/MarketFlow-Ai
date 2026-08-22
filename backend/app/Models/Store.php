<?php
// app/Models/Store.php
namespace App\Models;

use Database\Factories\StoreFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Store extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id', 'name', 'slug', 'description', 'logo', 'banner',
        'domain', 'colors', 'layout_settings', 'status'
    ];

    protected $casts = [
        'colors' => 'json',
        'layout_settings' => 'json',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function products() {
        return $this->hasMany(Product::class);
    }

    public function categories() {
        return $this->hasMany(Category::class);
    }

    public function orders() {
        return $this->hasMany(Order::class);
    }

    public function customers() {
        return $this->hasMany(Customer::class);
    }

    public function inventoryMovements() {
        return $this->hasMany(InventoryMovement::class);
    }

    public function discounts() {
        return $this->hasMany(Discount::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }

    public function aiConversations() {
        return $this->hasMany(AiConversation::class);
    }

    public function aiInsights() {
        return $this->hasMany(AiInsight::class);
    }

    public function storeConfiguration() {
        return $this->hasOne(StoreConfiguration::class);
    }

    public function activityLogs() {
        return $this->hasMany(ActivityLog::class);
    }

    public function shippingConfigurations() {
        return $this->hasMany(ShippingConfiguration::class);
    }

    public function paymentConfigurations() {
        return $this->hasMany(PaymentConfiguration::class);
    }
}