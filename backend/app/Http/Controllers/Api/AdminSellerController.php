<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AdminSellerController extends Controller {
    public function index(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function show(Request $request, $seller): JsonResponse { return response()->json(['data' => []]); }
    public function updateStatus(Request $request, $seller): JsonResponse { return response()->json(['status' => 'success']); }
}
