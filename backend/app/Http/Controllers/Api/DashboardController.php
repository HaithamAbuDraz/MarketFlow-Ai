<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller {
    public function overview(Request $request): JsonResponse {
        return response()->json([
            'sales' => ['total' => 125400, 'growth' => 14.5],
            'orders' => ['total' => 1420, 'pending' => 28],
            'customers' => ['total' => 980, 'active' => 640],
            'products' => ['total' => 64, 'low_stock' => 3],
        ]);
    }
}
