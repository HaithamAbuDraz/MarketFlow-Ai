<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OrderTrackingController extends Controller {
    public function confirmation(Request $request, $slug, $order): JsonResponse { return response()->json(['order' => $order]); }
    public function track(Request $request, $slug, $order): JsonResponse { return response()->json(['status' => 'in_transit']); }
}
