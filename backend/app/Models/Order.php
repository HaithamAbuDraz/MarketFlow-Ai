<?php
// app/Models/Order.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'store_id', 'customer_id', 'user_id', 'order_number', 'status', 'payment_status',
        'subtotal', 'discount_amount', 'shipping_cost', 'tax_amount', 'total', 'total_amount',
        'currency', 'notes', 'paid_at', 'shipped_at', 'delivered_at'
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'total' => 'decimal:2',
        'paid_at' => 'datetime',
        'shipped_at' => 'datetime',
        'delivered_at' => 'datetime',
    ];

    public function store() {
        return $this->belongsTo(Store::class);
    }

    public function customer() {
        return $this->belongsTo(Customer::class);
    }

    public function items() {
        return $this->hasMany(OrderItem::class);
    }

    public function returns() {
        return $this->hasMany(ReturnModel::class);
    }

    public function refunds() {
        return $this->hasMany(Refund::class);
    }

    public function statusHistory() {
        return $this->hasMany(OrderStatusHistory::class);
    }

    public function payments() {
        return $this->hasMany(Payment::class);
    }
}