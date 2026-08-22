<?php
// tests/Feature/Settings/SettingsControllerTest.php
namespace Tests\Feature\Settings;

use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class SettingsControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $seller;
    private Store $store;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seller = User::factory()->create([
            'role'     => 'seller',
            'password' => Hash::make('CurrentSecret1!'),
        ]);
        $this->store = Store::factory()->create(['user_id' => $this->seller->id]);
    }

    public function test_seller_can_view_and_update_account_settings(): void
    {
        $response = $this->actingAs($this->seller, 'sanctum')
            ->getJson('/api/merchant/settings/account');

        $response->assertStatus(200)
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.email', $this->seller->email);

        $updateResponse = $this->actingAs($this->seller, 'sanctum')
            ->putJson('/api/merchant/settings/account', [
                'name'       => 'Updated Seller Name',
                'store_name' => 'Updated Store Brand',
            ]);

        $updateResponse->assertStatus(200)
            ->assertJsonPath('status', 'success');

        $this->assertDatabaseHas('users', [
            'id'   => $this->seller->id,
            'name' => 'Updated Seller Name',
        ]);
    }

    public function test_seller_can_update_password_with_correct_current_password(): void
    {
        $response = $this->actingAs($this->seller, 'sanctum')
            ->putJson('/api/merchant/settings/security', [
                'current_password'      => 'CurrentSecret1!',
                'password'              => 'BrandNewPass123#',
                'password_confirmation' => 'BrandNewPass123#',
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('status', 'success');

        $this->seller->refresh();
        $this->assertTrue(Hash::check('BrandNewPass123#', $this->seller->password));
    }

    public function test_password_update_rejects_incorrect_current_password(): void
    {
        $response = $this->actingAs($this->seller, 'sanctum')
            ->putJson('/api/merchant/settings/security', [
                'current_password'      => 'WrongCurrentPassword!',
                'password'              => 'BrandNewPass123#',
                'password_confirmation' => 'BrandNewPass123#',
            ]);

        $response->assertStatus(422);
    }
}
