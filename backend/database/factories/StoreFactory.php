<?php

namespace Database\Factories;

use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Store>
 */
class StoreFactory extends Factory
{
    protected $model = Store::class;

    public function definition(): array
    {
        $name = fake()->company();

        return [
            'user_id'     => User::factory(),
            'name'        => $name,
            'slug'        => Str::slug($name) . '-' . Str::lower(Str::random(6)),
            'description' => fake()->sentence(),
            'status'      => 'active',
        ];
    }

    public function pending(): static
    {
        return $this->state(['status' => 'pending']);
    }
}
