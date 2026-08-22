<?php
// tests/Feature/Products/ProductControllerTest.php
namespace Tests\Feature\Products;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Tests for ProductController — covers CRUD, tenant isolation, validation,
 * pagination cap, and cross-tenant IDOR prevention.
 */
class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $sellerA;
    private Store $storeA;
    private User $sellerB;
    private Store $storeB;

    protected function setUp(): void
    {
        parent::setUp();

        $this->sellerA = User::factory()->create(['role' => 'seller']);
        $this->storeA  = Store::factory()->create(['user_id' => $this->sellerA->id]);

        $this->sellerB = User::factory()->create(['role' => 'seller']);
        $this->storeB  = Store::factory()->create(['user_id' => $this->sellerB->id]);
    }

    private function validProductPayload(array $overrides = []): array
    {
        return array_merge([
            'title'       => 'Test Product',
            'slug'        => 'test-product',
            'price'       => 29.99,
            'status'      => 'active',
            'description' => 'A test product',
        ], $overrides);
    }

    // ─────────────────────────────────────────────────────────────────
    // Create
    // ─────────────────────────────────────────────────────────────────

    public function test_seller_can_create_product(): void
    {
        $response = $this->actingAs($this->sellerA, 'sanctum')
            ->postJson('/api/merchant/products', $this->validProductPayload());

        $response->assertStatus(201)
            ->assertJsonPath('data.title', 'Test Product')
            ->assertJsonPath('data.status', 'active');

        $this->assertDatabaseHas('products', [
            'store_id' => $this->storeA->id,
            'title'    => 'Test Product',
        ]);
    }

    public function test_product_store_id_comes_from_auth_not_request(): void
    {
        // Seller A tries to inject Seller B's store_id in the request body
        $payload = $this->validProductPayload(['store_id' => $this->storeB->id]);

        $this->actingAs($this->sellerA, 'sanctum')
            ->postJson('/api/merchant/products', $payload);

        // Product must be created under Seller A's store, not B's
        $this->assertDatabaseHas('products', ['store_id' => $this->storeA->id]);
        $this->assertDatabaseMissing('products', ['store_id' => $this->storeB->id]);
    }

    // ─────────────────────────────────────────────────────────────────
    // Validation
    // ─────────────────────────────────────────────────────────────────

    public function test_product_requires_title(): void
    {
        $response = $this->actingAs($this->sellerA, 'sanctum')
            ->postJson('/api/merchant/products', ['price' => 10, 'status' => 'active', 'slug' => 'x']);

        $response->assertStatus(422)
            ->assertJsonPath('errors.title', fn ($v) => ! empty($v));
    }

    public function test_product_rejects_negative_price(): void
    {
        $response = $this->actingAs($this->sellerA, 'sanctum')
            ->postJson('/api/merchant/products', $this->validProductPayload(['price' => -5]));

        $response->assertStatus(422);
    }

    public function test_product_rejects_negative_stock(): void
    {
        $response = $this->actingAs($this->sellerA, 'sanctum')
            ->postJson('/api/merchant/products', $this->validProductPayload(['stock_quantity' => -1]));

        $response->assertStatus(422);
    }

    public function test_product_rejects_invalid_status(): void
    {
        $response = $this->actingAs($this->sellerA, 'sanctum')
            ->postJson('/api/merchant/products', $this->validProductPayload(['status' => 'invalid']));

        $response->assertStatus(422);
    }

    public function test_product_rejects_category_from_another_store(): void
    {
        // Category belongs to Store B
        $categoryB = Category::create([
            'store_id' => $this->storeB->id,
            'name'     => 'Category B',
            'slug'     => 'category-b',
        ]);

        // Seller A tries to use Store B's category
        $response = $this->actingAs($this->sellerA, 'sanctum')
            ->postJson('/api/merchant/products', $this->validProductPayload([
                'category_id' => $categoryB->id,
            ]));

        $response->assertStatus(422);
    }

    // ─────────────────────────────────────────────────────────────────
    // Pagination cap
    // ─────────────────────────────────────────────────────────────────

    public function test_per_page_is_capped_at_100(): void
    {
        Product::factory(5)->create(['store_id' => $this->storeA->id]);

        $response = $this->actingAs($this->sellerA, 'sanctum')
            ->getJson('/api/merchant/products?per_page=99999');

        $response->assertStatus(200);
        // per_page in response should not exceed 100
        $perPage = $response->json('meta.per_page') ?? $response->json('per_page');
        $this->assertLessThanOrEqual(100, (int) $perPage);
    }

    // ─────────────────────────────────────────────────────────────────
    // Tenant isolation — IDOR prevention
    // ─────────────────────────────────────────────────────────────────

    public function test_seller_b_cannot_update_seller_a_product(): void
    {
        $productA = Product::factory()->create([
            'store_id' => $this->storeA->id,
            'title'    => 'Seller A Product',
        ]);

        $response = $this->actingAs($this->sellerB, 'sanctum')
            ->patchJson("/api/merchant/products/{$productA->id}", [
                'title'  => 'Hacked Title',
                'slug'   => 'hacked-slug',
                'price'  => 1,
                'status' => 'active',
            ]);

        $response->assertStatus(403);

        // Product must remain unchanged
        $this->assertDatabaseHas('products', ['id' => $productA->id, 'title' => 'Seller A Product']);
    }

    public function test_seller_b_cannot_delete_seller_a_product(): void
    {
        $productA = Product::factory()->create(['store_id' => $this->storeA->id]);

        $response = $this->actingAs($this->sellerB, 'sanctum')
            ->deleteJson("/api/merchant/products/{$productA->id}");

        $response->assertStatus(403);

        // Product must still exist
        $this->assertDatabaseHas('products', ['id' => $productA->id]);
    }

    public function test_seller_a_can_update_own_product(): void
    {
        $product = Product::factory()->create([
            'store_id' => $this->storeA->id,
            'title'    => 'Original Title',
            'slug'     => 'original-slug',
            'price'    => 10,
            'status'   => 'active',
        ]);

        $response = $this->actingAs($this->sellerA, 'sanctum')
            ->patchJson("/api/merchant/products/{$product->id}", [
                'title'  => 'Updated Title',
                'slug'   => 'updated-slug',
                'price'  => 20,
                'status' => 'active',
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.title', 'Updated Title');
    }

    public function test_seller_a_can_delete_own_product(): void
    {
        $product = Product::factory()->create(['store_id' => $this->storeA->id]);

        $response = $this->actingAs($this->sellerA, 'sanctum')
            ->deleteJson("/api/merchant/products/{$product->id}");

        $response->assertStatus(200);
        $this->assertSoftDeleted('products', ['id' => $product->id]);
    }

    // ─────────────────────────────────────────────────────────────────
    // Seller with no store
    // ─────────────────────────────────────────────────────────────────

    public function test_product_search_and_filtering(): void
    {
        Product::factory()->create([
            'store_id' => $this->storeA->id,
            'title'    => 'Nike Running Shoes',
            'status'   => 'active',
        ]);

        Product::factory()->create([
            'store_id' => $this->storeA->id,
            'title'    => 'Adidas Track Pants',
            'status'   => 'draft',
        ]);

        // Search by keyword
        $searchResponse = $this->actingAs($this->sellerA, 'sanctum')
            ->getJson('/api/merchant/products?search=Nike');

        $searchResponse->assertStatus(200);
        $this->assertCount(1, $searchResponse->json('data'));
        $this->assertEquals('Nike Running Shoes', $searchResponse->json('data.0.title'));

        // Filter by status
        $statusResponse = $this->actingAs($this->sellerA, 'sanctum')
            ->getJson('/api/merchant/products?status=draft');

        $statusResponse->assertStatus(200);
        $this->assertCount(1, $statusResponse->json('data'));
        $this->assertEquals('Adidas Track Pants', $statusResponse->json('data.0.title'));
    }

    public function test_product_creation_rolls_back_if_variants_fail(): void
    {
        // Hook into ProductVariant saving to throw an exception
        ProductVariant::saving(function () {
            throw new \Exception('Simulated failure during variant creation');
        });

        try {
            $this->actingAs($this->sellerA, 'sanctum')
                ->postJson('/api/merchant/products', $this->validProductPayload([
                    'title'    => 'Product With Bad Variant',
                    'slug'     => 'bad-variant-product',
                    'variants' => [
                        ['title' => 'Variant 1', 'price' => 10],
                    ],
                ]));
        } catch (\Throwable $e) {
            // Expected exception
        }

        // Product should have rolled back
        $this->assertDatabaseMissing('products', [
            'slug'     => 'bad-variant-product',
            'store_id' => $this->storeA->id,
        ]);
    }

    public function test_seller_without_store_gets_422_on_product_create(): void
    {
        $sellerNoStore = User::factory()->create(['role' => 'seller']);
        // No store created for this seller

        $response = $this->actingAs($sellerNoStore, 'sanctum')
            ->postJson('/api/merchant/products', $this->validProductPayload());

        $response->assertStatus(422)
            ->assertJsonPath('message', 'No store found for this account.');
    }
}
