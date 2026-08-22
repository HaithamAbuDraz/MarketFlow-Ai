<?php
// tests/Feature/Onboarding/OnboardingControllerTest.php
namespace Tests\Feature\Onboarding;

use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OnboardingControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_seller_can_complete_onboarding_flow(): void
    {
        $user = User::factory()->create(['role' => 'seller']);

        // Step 1: Store setup
        $step1 = $this->actingAs($user, 'sanctum')
            ->postJson('/api/onboarding/setup', [
                'store_name' => 'Nova Fashion Store',
                'store_slug' => 'nova-fashion',
                'theme'      => 'modern',
            ]);

        $step1->assertStatus(200)
            ->assertJsonPath('status', 'success');

        $this->assertDatabaseHas('stores', [
            'user_id' => $user->id,
            'name'    => 'Nova Fashion Store',
            'slug'    => 'nova-fashion',
        ]);

        // Step 2: Business info
        $step2 = $this->actingAs($user, 'sanctum')
            ->postJson('/api/onboarding/business-info', [
                'category'        => 'Apparel & Fashion',
                'description'     => 'Curated modern streetwear',
                'type'            => 'retail',
                'target_audience' => 'Young adults',
            ]);

        $step2->assertStatus(200)
            ->assertJsonPath('status', 'success');

        // Step 3: Preferences
        $step3 = $this->actingAs($user, 'sanctum')
            ->postJson('/api/onboarding/preferences', [
                'language'  => 'en-US',
                'currency'  => 'USD',
                'time_zone' => 'UTC',
            ]);

        $step3->assertStatus(200)
            ->assertJsonPath('status', 'success');

        // Step 4: Complete
        $step4 = $this->actingAs($user, 'sanctum')
            ->postJson('/api/onboarding/complete');

        $step4->assertStatus(200)
            ->assertJsonPath('status', 'success');

        $this->assertDatabaseHas('stores', [
            'user_id' => $user->id,
            'status'  => 'active',
        ]);
    }
}
