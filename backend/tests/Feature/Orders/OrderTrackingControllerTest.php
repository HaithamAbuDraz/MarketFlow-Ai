<?php
// tests/Feature/Orders/OrderTrackingControllerTest.php
namespace Tests\Feature\Orders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderTrackingControllerTest extends TestCase
{
    use RefreshDatabase;

    private Store $store;
    private Order $order;

    protected function setUp(): void
    {
        parent::setUp();

        $seller = User::factory()->create(['role' => 'seller']);
        $this->store = Store::factory()->create([
            'user_id' => $seller->id,
            'slug'    => 'test-tracking-store',
        ]);

        $this->order = Order::create([
            'store_id'       => $this->store->id,
            'order_number'   => 'ORD-2026-9999',
            'status'         => 'processing',
            'payment_status' => 'paid',
            'total_amount'   => 129.50,
        ]);
    }

    public function test_customer_can_view_order_confirmation(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);

        $response = $this->actingAs($customer, 'sanctum')
            ->getJson("/api/store/{$this->store->slug}/orders/{$this->order->order_number}/confirmation");

        $response->assertStatus(200)
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.order_number', 'ORD-2026-9999')
            ->assertJsonPath('data.status', 'processing')
            ->assertJsonPath('data.payment_status', 'paid');
    }

    public function test_customer_can_track_order_live_status(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);

        // Add a timeline status change
        $this->order->statusHistory()->create([
            'from_status' => 'pending',
            'to_status'   => 'processing',
            'note'        => 'Payment confirmed, preparing shipment',
        ]);

        $response = $this->actingAs($customer, 'sanctum')
            ->getJson("/api/store/{$this->store->slug}/orders/{$this->order->order_number}/track");

        $response->assertStatus(200)
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.order_number', 'ORD-2026-9999')
            ->assertJsonPath('data.current_status', 'processing')
            ->assertJsonPath('data.timeline.0.to_status', 'processing');
    }

    public function test_order_tracking_fails_if_store_slug_does_not_match(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);
        $otherStore = Store::factory()->create(['slug' => 'other-unrelated-store']);

        $response = $this->actingAs($customer, 'sanctum')
            ->getJson("/api/store/{$otherStore->slug}/orders/{$this->order->order_number}/track");

        $response->assertStatus(404);
    }
}
