<?php
// app/Http/Controllers/Api/CheckoutController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * CheckoutController
 *
 * IMPORTANT: Checkout flow requires payment gateway integration.
 * Returns 501 Not Implemented rather than fake success.
 *
 * Full implementation requires:
 *   - Validating cart items against current stock
 *   - Applying coupons/discounts
 *   - Creating the Order + OrderItems in a transaction
 *   - Initiating payment via PaymentGatewayInterface
 *   - Reserving inventory
 */
class CheckoutController extends Controller
{
    public function process(Request $request, string $slug): JsonResponse
    {
        return response()->json([
            'message' => 'Checkout is not yet implemented. Payment gateway integration required.',
            'code'    => 'CHECKOUT_NOT_IMPLEMENTED',
        ], 501);
    }

    public function applyCoupon(Request $request, string $slug): JsonResponse
    {
        return response()->json([
            'message' => 'Coupon application is not yet implemented.',
            'code'    => 'FEATURE_NOT_IMPLEMENTED',
        ], 501);
    }
}
