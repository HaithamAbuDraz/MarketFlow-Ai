<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AiController extends Controller {
    public function overview(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function chat(Request $request): JsonResponse { return response()->json(['message' => 'AI response']); }
    public function insights(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function recommendations(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function conversations(Request $request): JsonResponse { return response()->json(['data' => []]); }
    public function conversationHistory(Request $request, $conversation): JsonResponse { return response()->json(['data' => []]); }
}
