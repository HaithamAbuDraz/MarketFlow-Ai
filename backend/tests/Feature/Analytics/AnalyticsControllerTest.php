<?php
// tests/Feature/Analytics/AnalyticsControllerTest.php
namespace Tests\Feature\Analytics;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AnalyticsControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $seller;
    private Store $store;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seller = User::factory()->create(['role' => 'seller']);
        $this->store  = Store::factory()->create(['user_id' => $this->seller->id]);
    }

    public function test_seller_can_view_analytics_overview(): void
    {
        Order::create([
            'store_id'       => $this->store->id,
            'order_number'   => 'ORD-AN-1',
            'status'         => 'delivered',
            'payment_status' => 'paid',
            'total_amount'   => 150.00,
        ]);

        Product::factory()->create([
            'store_id' => $this->store->id,
            'status'   => 'active',
        ]);

        Customer::create([
            'store_id'     => $this->store->id,
            'first_name'   => 'Jane',
            'email'        => 'jane@analytics.test',
            'total_orders' => 1,
            'total_spent'  => 150.00,
        ]);

        $response = $this->actingAs($this->seller, 'sanctum')
            ->getJson('/api/merchant/analytics/overview');

        $response->assertStatus(200)
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.revenue.total', 150)
            ->assertJsonPath('data.orders.total', 1)
            ->assertJsonPath('data.products.active', 1)
            ->assertJsonPath('data.customers.total', 1);
    }

    public function test_seller_can_view_sales_and_product_analytics(): void
    {
        $salesResponse = $this->actingAs($this->seller, 'sanctum')
            ->getJson('/api/merchant/analytics/sales?days=7');

        $salesResponse->assertStatus(200)
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.period_days', 7);

        $productsResponse = $this->actingAs($this->seller, 'sanctum')
            ->getJson('/api/merchant/analytics/products');

        $productsResponse->assertStatus(200)
            ->assertJsonPath('status', 'success')
            ->assertJsonStructure(['status', 'data' => ['top_products', 'stock_distribution']]);
    }
}
