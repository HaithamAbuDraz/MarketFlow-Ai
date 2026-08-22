<?php
// tests/Feature/Auth/AuthControllerTest.php
namespace Tests\Feature\Auth;

use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

/**
 * Tests for AuthController.
 *
 * Covers:
 *   - Registration (success, duplicate email, weak password, transaction rollback)
 *   - Login (success, invalid credentials)
 *   - Me / Logout
 *   - Password reset (generic response, no token leak, validation)
 */
class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    // ─────────────────────────────────────────────────────────────────
    // Registration
    // ─────────────────────────────────────────────────────────────────

    public function test_seller_can_register(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'store_name'            => 'Test Store',
            'email'                 => 'seller@example.com',
            'password'              => 'SecurePass1!',
            'password_confirmation' => 'SecurePass1!',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure(['user', 'store', 'token', 'message'])
            ->assertJsonPath('user.role', 'seller');

        $this->assertDatabaseHas('users', ['email' => 'seller@example.com']);
        $this->assertDatabaseHas('stores', ['name' => 'Test Store']);
    }

    public function test_registration_rejects_duplicate_email(): void
    {
        User::factory()->create(['email' => 'existing@example.com']);

        $response = $this->postJson('/api/auth/register', [
            'store_name'            => 'Another Store',
            'email'                 => 'existing@example.com',
            'password'              => 'SecurePass1!',
            'password_confirmation' => 'SecurePass1!',
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('errors.email', fn ($v) => ! empty($v));
    }

    public function test_registration_rejects_weak_password(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'store_name'            => 'Store',
            'email'                 => 'user@example.com',
            'password'              => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(422);
    }

    public function test_registration_rejects_password_mismatch(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'store_name'            => 'Store',
            'email'                 => 'user@example.com',
            'password'              => 'SecurePass1!',
            'password_confirmation' => 'DifferentPass1!',
        ]);

        $response->assertStatus(422);
    }

    /**
     * Registration must be atomic: if store creation fails, user must not be saved.
     */
    public function test_registration_rolls_back_if_store_creation_fails(): void
    {
        // Hook into Store saving to throw an exception, simulating a database failure during store creation
        Store::saving(function () {
            throw new \Exception('Simulated database error during store creation');
        });

        try {
            $this->postJson('/api/auth/register', [
                'store_name'            => 'Rollback Store',
                'email'                 => 'rollback@example.com',
                'password'              => 'SecurePass1!',
                'password_confirmation' => 'SecurePass1!',
            ]);
        } catch (\Throwable $e) {
            // Expected simulated exception
        }

        // The user record must NOT exist in the database (rolled back)
        $this->assertDatabaseMissing('users', [
            'email' => 'rollback@example.com',
        ]);
        $this->assertDatabaseMissing('stores', [
            'name' => 'Rollback Store',
        ]);
    }

    // ─────────────────────────────────────────────────────────────────
    // Login
    // ─────────────────────────────────────────────────────────────────

    public function test_user_can_login_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email'    => 'test@example.com',
            'password' => Hash::make('SecurePass1!'),
            'role'     => 'seller',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email'    => 'test@example.com',
            'password' => 'SecurePass1!',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['user', 'token'])
            ->assertJsonPath('user.email', 'test@example.com');
    }

    public function test_login_rejects_wrong_password(): void
    {
        User::factory()->create([
            'email'    => 'test@example.com',
            'password' => Hash::make('CorrectPass1!'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email'    => 'test@example.com',
            'password' => 'WrongPassword1!',
        ]);

        $response->assertStatus(422);
    }

    public function test_login_rejects_non_existent_email(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'email'    => 'ghost@example.com',
            'password' => 'AnyPass1!',
        ]);

        $response->assertStatus(422);
    }

    // ─────────────────────────────────────────────────────────────────
    // Me
    // ─────────────────────────────────────────────────────────────────

    public function test_me_returns_authenticated_user(): void
    {
        $user = User::factory()->create(['role' => 'seller']);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/auth/me');

        $response->assertStatus(200)
            ->assertJsonPath('email', $user->email);
    }

    public function test_me_requires_authentication(): void
    {
        $response = $this->getJson('/api/auth/me');

        $response->assertStatus(401);
    }

    // ─────────────────────────────────────────────────────────────────
    // Logout
    // ─────────────────────────────────────────────────────────────────

    public function test_logout_revokes_token(): void
    {
        $user  = User::factory()->create();
        $token = $user->createToken('test');

        $response = $this->withHeader('Authorization', "Bearer {$token->plainTextToken}")
            ->postJson('/api/auth/logout');

        $response->assertStatus(200);

        // Verify the token is gone from the database — that's the security guarantee.
        $this->assertDatabaseMissing('personal_access_tokens', [
            'id' => $token->accessToken->id,
        ]);

        // Total tokens for the user should be 0
        $this->assertEquals(0, $user->tokens()->count());
    }


    // ─────────────────────────────────────────────────────────────────
    // Password Reset
    // ─────────────────────────────────────────────────────────────────

    public function test_forgot_password_returns_generic_message_for_existing_email(): void
    {
        User::factory()->create(['email' => 'known@example.com']);

        $response = $this->postJson('/api/auth/forgot-password', [
            'email' => 'known@example.com',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath(
                'message',
                'If an account exists for this email, a reset link has been sent.'
            );

        // Token must NOT be returned in the response
        $response->assertJsonMissingPath('reset_token');
        $response->assertJsonMissingPath('token');
    }

    public function test_forgot_password_returns_same_generic_message_for_non_existent_email(): void
    {
        $response = $this->postJson('/api/auth/forgot-password', [
            'email' => 'nobody@example.com',
        ]);

        // Must be the SAME response as for an existing user — no user enumeration
        $response->assertStatus(200)
            ->assertJsonPath(
                'message',
                'If an account exists for this email, a reset link has been sent.'
            );
    }

    public function test_forgot_password_responses_are_identical_for_existing_and_missing(): void
    {
        User::factory()->create(['email' => 'exists@example.com']);

        $existing = $this->postJson('/api/auth/forgot-password', ['email' => 'exists@example.com']);
        $missing  = $this->postJson('/api/auth/forgot-password', ['email' => 'missing@example.com']);

        // Same HTTP status
        $this->assertEquals($existing->status(), $missing->status());

        // Same message
        $this->assertEquals(
            $existing->json('message'),
            $missing->json('message')
        );
    }

    public function test_forgot_password_does_not_expose_token_in_response(): void
    {
        User::factory()->create(['email' => 'user@example.com']);

        $response = $this->postJson('/api/auth/forgot-password', [
            'email' => 'user@example.com',
        ]);

        $data = $response->json();
        $this->assertArrayNotHasKey('reset_token', $data);
        $this->assertArrayNotHasKey('token', $data);
    }

    public function test_forgot_password_requires_valid_email_format(): void
    {
        $response = $this->postJson('/api/auth/forgot-password', [
            'email' => 'not-an-email',
        ]);

        $response->assertStatus(422);
    }

    public function test_reset_password_rejects_invalid_token(): void
    {
        User::factory()->create(['email' => 'reset@example.com']);

        $response = $this->postJson('/api/auth/reset-password', [
            'token'                 => 'totally_invalid_token',
            'email'                 => 'reset@example.com',
            'password'              => 'NewSecurePass1!',
            'password_confirmation' => 'NewSecurePass1!',
        ]);

        // Should fail — invalid token
        $response->assertStatus(422);
    }

    public function test_reset_password_with_valid_token_succeeds(): void
    {
        $user  = User::factory()->create(['email' => 'reset@example.com']);
        $token = Password::broker()->createToken($user);

        $response = $this->postJson('/api/auth/reset-password', [
            'token'                 => $token,
            'email'                 => 'reset@example.com',
            'password'              => 'NewSecurePass1!',
            'password_confirmation' => 'NewSecurePass1!',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('message', fn ($v) => str_contains($v, 'reset successfully'));

        // Verify password was actually changed
        $user->refresh();
        $this->assertTrue(Hash::check('NewSecurePass1!', $user->password));
    }

    public function test_reset_password_revokes_all_tokens_on_success(): void
    {
        $user  = User::factory()->create(['email' => 'revoke@example.com']);
        $user->createToken('existing_session');
        $token = Password::broker()->createToken($user);

        $this->postJson('/api/auth/reset-password', [
            'token'                 => $token,
            'email'                 => 'revoke@example.com',
            'password'              => 'NewSecurePass1!',
            'password_confirmation' => 'NewSecurePass1!',
        ]);

        // All personal access tokens should be revoked
        $this->assertEquals(0, $user->tokens()->count());
    }
}
