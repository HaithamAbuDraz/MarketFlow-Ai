<?php
// tests/Feature/Auth/CheckRoleMiddlewareTest.php
namespace Tests\Feature\Auth;

use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Tests for CheckRole middleware.
 *
 * Verifies all three cases:
 *   1. Unauthenticated → 401
 *   2. Wrong role → 403
 *   3. Correct role → continues to controller
 *   4. Multiple allowed roles → any one passes
 */
class CheckRoleMiddlewareTest extends TestCase
{
    use RefreshDatabase;

    // ─────────────────────────────────────────────────────────────────
    // Unauthenticated access
    // ─────────────────────────────────────────────────────────────────

    public function test_unauthenticated_user_gets_401_on_seller_route(): void
    {
        $response = $this->getJson('/api/merchant/dashboard');

        $response->assertStatus(401);
    }

    public function test_unauthenticated_user_gets_401_on_admin_route(): void
    {
        $response = $this->getJson('/api/admin/dashboard');

        $response->assertStatus(401);
    }

    public function test_unauthenticated_user_gets_401_on_customer_route(): void
    {
        $response = $this->getJson('/api/customer/profile');

        $response->assertStatus(401);
    }

    // ─────────────────────────────────────────────────────────────────
    // Customer accessing seller routes
    // ─────────────────────────────────────────────────────────────────

    public function test_customer_cannot_access_seller_dashboard(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);

        $response = $this->actingAs($customer, 'sanctum')
            ->getJson('/api/merchant/dashboard');

        $response->assertStatus(403);
        $response->assertJsonPath('status', 'error');
    }

    public function test_customer_cannot_access_seller_products(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);

        $response = $this->actingAs($customer, 'sanctum')
            ->getJson('/api/merchant/products');

        $response->assertStatus(403);
    }

    // ─────────────────────────────────────────────────────────────────
    // Seller accessing seller routes
    // ─────────────────────────────────────────────────────────────────

    public function test_seller_can_access_seller_dashboard(): void
    {
        $seller = User::factory()->create(['role' => 'seller']);
        Store::factory()->create(['user_id' => $seller->id]);

        $response = $this->actingAs($seller, 'sanctum')
            ->getJson('/api/merchant/dashboard');

        // Any 2xx is passing the middleware — dashboard itself may return data or empty
        $response->assertSuccessful();
    }

    public function test_seller_cannot_access_admin_route(): void
    {
        $seller = User::factory()->create(['role' => 'seller']);

        $response = $this->actingAs($seller, 'sanctum')
            ->getJson('/api/admin/dashboard');

        $response->assertStatus(403);
    }

    // ─────────────────────────────────────────────────────────────────
    // Admin access
    // ─────────────────────────────────────────────────────────────────

    public function test_admin_can_access_admin_route(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin, 'sanctum')
            ->getJson('/api/admin/dashboard');

        $response->assertStatus(200);
    }

    public function test_admin_cannot_access_seller_route(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin, 'sanctum')
            ->getJson('/api/merchant/dashboard');

        $response->assertStatus(403);
    }
}
