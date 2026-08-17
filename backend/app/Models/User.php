<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['store_name', 'name', 'email', 'password', 'role', 'status'];

    protected $hidden = ['password', 'remember_token'];

    public function store() {
        return $this->hasOne(Store::class);
    }

    public function subscriptions() {
        return $this->hasMany(SellerSubscription::class);
    }

    public function aiConversations() {
        return $this->hasMany(AiConversation::class);
    }
}
