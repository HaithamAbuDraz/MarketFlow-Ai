<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller {
    public function index(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function markAsRead(Request $request, $notification): JsonResponse { return response()->json(['status' => 'read']); }
    public function markAllAsRead(Request $request): JsonResponse { return response()->json(['status' => 'all_read']); }
}
