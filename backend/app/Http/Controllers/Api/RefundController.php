<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RefundController extends Controller {
    public function store(Request $request, $order): JsonResponse { return response()->json(['data' => []], 201); }
    public function approve(Request $request, $refund): JsonResponse { return response()->json(['status' => 'approved']); }
    public function process(Request $request, $refund): JsonResponse { return response()->json(['status' => 'processed']); }
}
