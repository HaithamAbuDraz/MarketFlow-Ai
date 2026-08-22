<?php
// tests/Feature/Inventory/InventoryControllerTest.php
namespace Tests\Feature\Inventory;

use App\Models\InventoryMovement;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InventoryControllerTest extends TestCase
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

    public function test_seller_can_view_inventory_overview(): void
    {
        Product::factory()->create([
            'store_id'            => $this->store->id,
            'track_inventory'     => true,
            'stock_quantity'      => 3,
            'low_stock_threshold' => 5,
        ]);

        Product::factory()->create([
            'store_id'            => $this->store->id,
            'track_inventory'     => true,
            'stock_quantity'      => 20,
            'low_stock_threshold' => 5,
        ]);

        $response = $this->actingAs($this->seller, 'sanctum')
            ->getJson('/api/merchant/inventory');

        $response->assertStatus(200)
            ->assertJsonPath('data.total_tracked_products', 2)
            ->assertJsonPath('data.total_stock_units', 23)
            ->assertJsonPath('data.low_stock_count', 1);
    }

    public function test_seller_can_adjust_product_inventory_with_transaction(): void
    {
        $product = Product::factory()->create([
            'store_id'        => $this->store->id,
            'stock_quantity'  => 10,
            'track_inventory' => true,
        ]);

        $response = $this->actingAs($this->seller, 'sanctum')
            ->postJson('/api/merchant/inventory/adjust', [
                'product_id'      => $product->id,
                'type'            => 'adjustment',
                'quantity_change' => 5,
                'note'            => 'Added 5 units from supplier restock',
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.quantity_before', 10)
            ->assertJsonPath('data.quantity_after', 15)
            ->assertJsonPath('data.quantity_change', 5);

        // Product stock in database must be updated
        $this->assertDatabaseHas('products', [
            'id'             => $product->id,
            'stock_quantity' => 15,
        ]);

        // Inventory movement record must exist
        $this->assertDatabaseHas('inventory_movements', [
            'product_id'      => $product->id,
            'type'            => 'adjustment',
            'quantity_change' => 5,
            'quantity_before' => 10,
            'quantity_after'  => 15,
            'created_by'      => $this->seller->id,
        ]);
    }

    public function test_adjustment_prevents_negative_stock(): void
    {
        $product = Product::factory()->create([
            'store_id'        => $this->store->id,
            'stock_quantity'  => 5,
            'track_inventory' => true,
        ]);

        $response = $this->actingAs($this->seller, 'sanctum')
            ->postJson('/api/merchant/inventory/adjust', [
                'product_id'      => $product->id,
                'type'            => 'adjustment',
                'quantity_change' => -10, // Trying to subtract more than available
            ]);

        $response->assertStatus(422)
            ->assertJsonPath('errors.quantity_change', fn ($v) => ! empty($v));

        // Stock remains unchanged
        $this->assertDatabaseHas('products', [
            'id'             => $product->id,
            'stock_quantity' => 5,
        ]);
    }

    public function test_adjustment_rejects_product_from_another_store(): void
    {
        $otherSeller = User::factory()->create(['role' => 'seller']);
        $otherStore  = Store::factory()->create(['user_id' => $otherSeller->id]);
        $otherProduct = Product::factory()->create([
            'store_id'       => $otherStore->id,
            'stock_quantity' => 10,
        ]);

        $response = $this->actingAs($this->seller, 'sanctum')
            ->postJson('/api/merchant/inventory/adjust', [
                'product_id'      => $otherProduct->id,
                'type'            => 'adjustment',
                'quantity_change' => 2,
            ]);

        $response->assertStatus(422);
    }
}
