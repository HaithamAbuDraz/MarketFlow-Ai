<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AdminStoreController extends Controller {
    public function index(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function updateStatus(Request $request, $store): JsonResponse { return response()->json(['status' => 'success']); }
}
