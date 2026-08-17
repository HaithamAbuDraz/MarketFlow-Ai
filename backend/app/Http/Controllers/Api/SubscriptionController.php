<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SubscriptionController extends Controller {
    public function currentPlan(Request $request): JsonResponse { return response()->json(['plan' => 'Pro', 'status' => 'active']); }
    public function availablePlans(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function subscribe(Request $request): JsonResponse { return response()->json(['status' => 'success']); }
    public function billingHistory(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function updatePaymentMethod(Request $request): JsonResponse { return response()->json(['status' => 'success']); }
}
