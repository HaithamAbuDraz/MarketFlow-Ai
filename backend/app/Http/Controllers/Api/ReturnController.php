<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ReturnController extends Controller {
    public function index(Request $request, $order = null): JsonResponse { return response()->json(['data' => []]); }
    public function store(Request $request, $order = null): JsonResponse { return response()->json(['data' => []], 201); }
    public function approve(Request $request, $return): JsonResponse { return response()->json(['status' => 'approved']); }
    public function reject(Request $request, $return): JsonResponse { return response()->json(['status' => 'rejected']); }
}
