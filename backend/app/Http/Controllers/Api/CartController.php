<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CartController extends Controller {
    public function show(Request $request, $slug): JsonResponse { return response()->json(['items' => []]); }
    public function addItem(Request $request, $slug): JsonResponse { return response()->json(['status' => 'success']); }
    public function updateItem(Request $request, $slug, $item): JsonResponse { return response()->json(['status' => 'success']); }
    public function removeItem(Request $request, $slug, $item): JsonResponse { return response()->json(['status' => 'success']); }
}
