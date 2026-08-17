<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SettingsController extends Controller {
    public function account(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function updateAccount(Request $request): JsonResponse { return response()->json(['status' => 'success']); }
    public function store(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function updateStore(Request $request): JsonResponse { return response()->json(['status' => 'success']); }
    public function payments(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function updatePayments(Request $request): JsonResponse { return response()->json(['status' => 'success']); }
    public function shipping(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function updateShipping(Request $request): JsonResponse { return response()->json(['status' => 'success']); }
    public function notifications(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function updateNotifications(Request $request): JsonResponse { return response()->json(['status' => 'success']); }
    public function security(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function updateSecurity(Request $request): JsonResponse { return response()->json(['status' => 'success']); }
    public function activityLogs(Request $request): JsonResponse { return response()->json(['data' => []]); }
}
