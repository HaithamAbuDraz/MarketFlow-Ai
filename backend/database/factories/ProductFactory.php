<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Store;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $title = fake()->unique()->words(3, true);

        return [
            'store_id'            => Store::factory(),
            'title'               => ucwords($title),
            'slug'                => Str::slug($title),
            'description'         => fake()->paragraph(),
            'price'               => fake()->randomFloat(2, 1, 500),
            'status'              => 'active',
            'track_inventory'     => true,
            'stock_quantity'      => fake()->numberBetween(0, 200),
            'low_stock_threshold' => 5,
        ];
    }

    public function draft(): static
    {
        return $this->state(['status' => 'draft']);
    }

    public function archived(): static
    {
        return $this->state(['status' => 'archived']);
    }
}
