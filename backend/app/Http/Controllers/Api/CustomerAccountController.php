<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CustomerAccountController extends Controller {
    public function profile(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function updateProfile(Request $request): JsonResponse { return response()->json(['status' => 'success']); }
    public function orders(Request $request): JsonResponse { return response()->json(['data' => []]); }
}
