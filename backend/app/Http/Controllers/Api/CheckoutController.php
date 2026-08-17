<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CheckoutController extends Controller {
    public function process(Request $request, $slug): JsonResponse { return response()->json(['status' => 'success']); }
    public function applyCoupon(Request $request, $slug): JsonResponse { return response()->json(['status' => 'success']); }
}
