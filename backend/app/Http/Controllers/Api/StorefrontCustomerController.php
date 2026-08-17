<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class StorefrontCustomerController extends Controller {
    public function home(Request $request, $slug): JsonResponse { return response()->json(['store' => $slug]); }
    public function products(Request $request, $slug): JsonResponse { return response()->json(['data' => []]); }
    public function productDetails(Request $request, $slug, $product): JsonResponse { return response()->json(['data' => []]); }
}
