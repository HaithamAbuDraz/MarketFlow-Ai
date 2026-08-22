<?php
// app/Models/Payment.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'order_id', 'gateway', 'gateway_transaction_id',
        'amount', 'currency', 'status', 'paid_at', 'metadata',
    ];

    protected $casts = [
        'amount'   => 'decimal:2',
        'paid_at'  => 'datetime',
        'metadata' => 'json',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
