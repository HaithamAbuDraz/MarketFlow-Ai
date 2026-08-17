<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class InventoryController extends Controller {
    public function overview(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function movements(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function adjust(Request $request): JsonResponse { return response()->json(['status' => 'success']); }
}
