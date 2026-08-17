<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'store_name' => 'MarketFlow Demo Store',
                'name' => 'Demo Merchant',
                'password' => \Illuminate\Support\Facades\Hash::make('Password123!'),
                'role' => 'seller',
                'status' => 'active',
            ]
        );

        $store = \App\Models\Store::firstOrCreate(
            ['user_id' => $user->id],
            [
                'name' => 'MarketFlow Demo Store',
                'slug' => 'marketflow-demo-store',
                'description' => 'Your all-in-one AI powered ecommerce flagship store.',
                'status' => 'active',
            ]
        );

        \App\Models\Product::firstOrCreate(
            ['store_id' => $store->id, 'title' => 'Quantum Smart Watch Ultra'],
            [
                'slug' => 'quantum-smart-watch-ultra',
                'description' => 'Next-gen titanium wearable with real-time biometric and AI fitness coaching.',
                'price' => 299.99,
                'compare_at_price' => 349.99,
                'sku' => 'QSW-001',
                'stock_quantity' => 45,
                'status' => 'active',
            ]
        );

        \App\Models\Product::firstOrCreate(
            ['store_id' => $store->id, 'title' => 'Aura Pro Noise Cancelling Headphones'],
            [
                'slug' => 'aura-pro-noise-cancelling-headphones',
                'description' => 'Spatial audio wireless headphones with adaptive ANC and 40h battery life.',
                'price' => 199.50,
                'compare_at_price' => 249.00,
                'sku' => 'APH-002',
                'stock_quantity' => 28,
                'status' => 'active',
            ]
        );

        \App\Models\Product::firstOrCreate(
            ['store_id' => $store->id, 'title' => 'Nexus Ergonomic Mechanical Keyboard'],
            [
                'slug' => 'nexus-ergonomic-mechanical-keyboard',
                'description' => 'Custom hot-swappable wireless keyboard with OLED display and silent tactile switches.',
                'price' => 149.00,
                'sku' => 'NMK-003',
                'stock_quantity' => 12,
                'status' => 'active',
            ]
        );
    }
}
