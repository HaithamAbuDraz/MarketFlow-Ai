<?php
// app/Http/Controllers/Api/PaymentController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * PaymentController
 *
 * IMPORTANT: Payment gateway integration is not yet configured.
 * These endpoints return 501 Not Implemented rather than fake success responses.
 *
 * Integration path:
 *   1. Implement App\Contracts\PaymentGatewayInterface
 *   2. Create a concrete gateway (e.g. StripeGateway)
 *   3. Bind in AppServiceProvider
 *   4. Inject and call here
 *
 * Payment states: pending → processing → succeeded | failed | canceled
 * Trust payment status ONLY from the gateway callback, never from request body.
 */
class PaymentController extends Controller
{
    public function process(Request $request, string $slug): JsonResponse
    {
        return response()->json([
            'message' => 'Payment processing is not yet configured. Please integrate a payment gateway.',
            'code'    => 'PAYMENT_GATEWAY_NOT_CONFIGURED',
        ], 501);
    }

    public function confirm(Request $request, string $slug): JsonResponse
    {
        return response()->json([
            'message' => 'Payment confirmation is not yet configured. Please integrate a payment gateway.',
            'code'    => 'PAYMENT_GATEWAY_NOT_CONFIGURED',
        ], 501);
    }
}
