<?php
// app/Policies/ProductPolicy.php
namespace App\Policies;

use App\Models\Product;
use App\Models\User;

/**
 * ProductPolicy — enforces multi-tenant ownership for product operations.
 *
 * Safe checks:
 *  - Verify the user's role is 'seller' (strict).
 *  - Verify the user actually has a store (null-safe).
 *  - Verify the store ID matches the product's store_id (strict ===).
 *
 * This prevents:
 *  - Customer or admin accounts from managing products.
 *  - Sellers without a store crashing the policy.
 *  - Cross-store IDOR (seller A accessing seller B's products).
 */
class ProductPolicy
{
    public function view(User $user, Product $product): bool
    {
        return $user->role === 'seller'
            && $user->store !== null
            && $user->store->id === $product->store_id;
    }

    public function update(User $user, Product $product): bool
    {
        return $user->role === 'seller'
            && $user->store !== null
            && $user->store->id === $product->store_id;
    }

    public function delete(User $user, Product $product): bool
    {
        return $user->role === 'seller'
            && $user->store !== null
            && $user->store->id === $product->store_id;
    }
}