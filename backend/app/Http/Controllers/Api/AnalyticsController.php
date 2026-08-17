<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AnalyticsController extends Controller {
    public function overview(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function sales(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function products(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function customers(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function inventory(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function export(Request $request): JsonResponse { return response()->json(['download_url' => '']); }
}
