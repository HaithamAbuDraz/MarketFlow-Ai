<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PaymentController extends Controller {
    public function process(Request $request, $slug): JsonResponse { return response()->json(['status' => 'success']); }
    public function confirm(Request $request, $slug): JsonResponse { return response()->json(['status' => 'confirmed']); }
}
