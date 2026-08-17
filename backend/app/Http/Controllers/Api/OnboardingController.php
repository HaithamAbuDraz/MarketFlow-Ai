<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OnboardingController extends Controller {
    public function storeSetup(Request $request): JsonResponse { return response()->json(['status' => 'success', 'data' => []]); }
    public function businessInfo(Request $request): JsonResponse { return response()->json(['status' => 'success', 'data' => []]); }
    public function preferences(Request $request): JsonResponse { return response()->json(['status' => 'success', 'data' => []]); }
    public function complete(Request $request): JsonResponse { return response()->json(['status' => 'success', 'message' => 'Onboarding complete']); }
}
