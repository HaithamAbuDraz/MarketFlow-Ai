<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AdminAnalyticsController extends Controller {
    public function index(Request $request): JsonResponse { return response()->json(['data' => []]); }
}
