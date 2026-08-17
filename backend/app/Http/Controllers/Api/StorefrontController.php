<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class StorefrontController extends Controller {
    public function overview(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function themes(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function setTheme(Request $request, $theme): JsonResponse { return response()->json(['status' => 'success']); }
    public function customize(Request $request): JsonResponse { return response()->json(['status' => 'success']); }
    public function preview(Request $request): JsonResponse { return response()->json(['data' => []]); }
}
