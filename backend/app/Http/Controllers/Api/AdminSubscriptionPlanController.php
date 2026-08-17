<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AdminSubscriptionPlanController extends Controller {
    public function index(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function store(Request $request): JsonResponse { return response()->json(['data' => []], 201); }
    public function show(Request $request, $id): JsonResponse { return response()->json(['data' => []]); }
    public function update(Request $request, $id): JsonResponse { return response()->json(['data' => []]); }
    public function destroy(Request $request, $id): JsonResponse { return response()->json(['message' => 'Deleted']); }
    public function activate(Request $request, $plan): JsonResponse { return response()->json(['status' => 'active']); }
    public function deactivate(Request $request, $plan): JsonResponse { return response()->json(['status' => 'inactive']); }
}
