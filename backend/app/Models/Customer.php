<?php
// app/Models/Customer.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'store_id', 'user_id', 'first_name', 'last_name',
        'email', 'phone', 'total_orders', 'total_spent',
    ];

    protected $casts = [
        'total_orders' => 'integer',
        'total_spent'  => 'decimal:2',
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
