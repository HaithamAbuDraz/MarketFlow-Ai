<?php
// routes/api.php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    AuthController,
    ProductController,
    OnboardingController,
    DashboardController,
    CategoryController,
    InventoryController,
    OrderController,
    ReturnController,
    RefundController,
    CustomerController,
    ReviewController,
    AnalyticsController,
    DiscountController,
    CouponController,
    AiController,
    StorefrontController,
    SubscriptionController,
    SettingsController,
    StorefrontCustomerController,
    CartController,
    CheckoutController,
    PaymentController,
    OrderTrackingController,
    CustomerAccountController,
    AddressController,
    WishlistController,
    AdminDashboardController,
    AdminSellerController,
    AdminStoreController,
    AdminSubscriptionPlanController,
    AdminAnalyticsController,
    AdminAuditLogController,
    AdminSettingsController,
    NotificationController
};

// Public Auth Routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Onboarding
    Route::post('/onboarding/setup', [OnboardingController::class, 'storeSetup']);
    Route::post('/onboarding/business-info', [OnboardingController::class, 'businessInfo']);
    Route::post('/onboarding/preferences', [OnboardingController::class, 'preferences']);
    Route::post('/onboarding/complete', [OnboardingController::class, 'complete']);

    // Merchant Dashboard
    Route::prefix('merchant')->middleware('role:seller')->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'overview']);

        // Products
        Route::apiResource('products', ProductController::class);
        Route::get('/products/{product}/inventory', [ProductController::class, 'inventory']);
        Route::apiResource('categories', CategoryController::class);

        // Inventory
        Route::get('/inventory', [InventoryController::class, 'overview']);
        Route::get('/inventory/movements', [InventoryController::class, 'movements']);
        Route::post('/inventory/adjust', [InventoryController::class, 'adjust']);

        // Orders
        Route::apiResource('orders', OrderController::class);
        Route::get('/orders/{order}/details', [OrderController::class, 'details']);
        Route::post('/orders/{order}/status', [OrderController::class, 'updateStatus']);

        // Returns & Refunds (Nested under Orders)
        Route::post('/orders/{order}/returns', [ReturnController::class, 'store']);
        Route::get('/orders/{order}/returns', [ReturnController::class, 'index']);
        Route::post('/returns/{return}/approve', [ReturnController::class, 'approve']);
        Route::post('/returns/{return}/reject', [ReturnController::class, 'reject']);

        Route::post('/orders/{order}/refunds', [RefundController::class, 'store']);
        Route::post('/refunds/{refund}/approve', [RefundController::class, 'approve']);
        Route::post('/refunds/{refund}/process', [RefundController::class, 'process']);

        // Customers
        Route::apiResource('customers', CustomerController::class);
        Route::get('/customers/{customer}/orders', [CustomerController::class, 'orders']);
        Route::get('/reviews', [ReviewController::class, 'index']);
        Route::post('/reviews/{review}/respond', [ReviewController::class, 'respond']);

        // Analytics
        Route::get('/analytics/overview', [AnalyticsController::class, 'overview']);
        Route::get('/analytics/sales', [AnalyticsController::class, 'sales']);
        Route::get('/analytics/products', [AnalyticsController::class, 'products']);
        Route::get('/analytics/customers', [AnalyticsController::class, 'customers']);
        Route::get('/analytics/inventory', [AnalyticsController::class, 'inventory']);
        Route::get('/analytics/export', [AnalyticsController::class, 'export']);

        // Marketing
        Route::apiResource('discounts', DiscountController::class);
        Route::apiResource('coupons', CouponController::class);

        // AI Workspace
        Route::get('/ai/overview', [AiController::class, 'overview']);
        Route::post('/ai/chat', [AiController::class, 'chat']);
        Route::get('/ai/insights', [AiController::class, 'insights']);
        Route::get('/ai/recommendations', [AiController::class, 'recommendations']);
        Route::get('/ai/conversations', [AiController::class, 'conversations']);
        Route::get('/ai/conversations/{conversation}', [AiController::class, 'conversationHistory']);

        // Storefront
        Route::get('/storefront/overview', [StorefrontController::class, 'overview']);
        Route::get('/storefront/themes', [StorefrontController::class, 'themes']);
        Route::post('/storefront/themes/{theme}', [StorefrontController::class, 'setTheme']);
        Route::post('/storefront/customize', [StorefrontController::class, 'customize']);
        Route::get('/storefront/preview', [StorefrontController::class, 'preview']);

        // Subscription
        Route::get('/subscription/current', [SubscriptionController::class, 'currentPlan']);
        Route::get('/subscription/plans', [SubscriptionController::class, 'availablePlans']);
        Route::post('/subscription/subscribe', [SubscriptionController::class, 'subscribe']);
        Route::get('/subscription/history', [SubscriptionController::class, 'billingHistory']);
        Route::post('/subscription/payment-method', [SubscriptionController::class, 'updatePaymentMethod']);

        // Settings
        Route::get('/settings/account', [SettingsController::class, 'account']);
        Route::put('/settings/account', [SettingsController::class, 'updateAccount']);
        Route::get('/settings/store', [SettingsController::class, 'store']);
        Route::put('/settings/store', [SettingsController::class, 'updateStore']);
        Route::get('/settings/payments', [SettingsController::class, 'payments']);
        Route::put('/settings/payments', [SettingsController::class, 'updatePayments']);
        Route::get('/settings/shipping', [SettingsController::class, 'shipping']);
        Route::put('/settings/shipping', [SettingsController::class, 'updateShipping']);
        Route::get('/settings/notifications', [SettingsController::class, 'notifications']);
        Route::put('/settings/notifications', [SettingsController::class, 'updateNotifications']);
        Route::get('/settings/security', [SettingsController::class, 'security']);
        Route::put('/settings/security', [SettingsController::class, 'updateSecurity']);
        Route::get('/settings/activity-logs', [SettingsController::class, 'activityLogs']);
    });

    // Customer Storefront
    Route::prefix('store/{store:slug}')->group(function () {
        Route::get('/', [StorefrontCustomerController::class, 'home']);
        Route::get('/products', [StorefrontCustomerController::class, 'products']);
        Route::get('/products/{product:slug}', [StorefrontCustomerController::class, 'productDetails']);

        // Cart
        Route::get('/cart', [CartController::class, 'show']);
        Route::post('/cart', [CartController::class, 'addItem']);
        Route::put('/cart/{item}', [CartController::class, 'updateItem']);
        Route::delete('/cart/{item}', [CartController::class, 'removeItem']);

        // Checkout
        Route::post('/checkout', [CheckoutController::class, 'process']);
        Route::post('/checkout/apply-coupon', [CheckoutController::class, 'applyCoupon']);

        // Payment
        Route::post('/payment/process', [PaymentController::class, 'process']);
        Route::post('/payment/confirm', [PaymentController::class, 'confirm']);

        // Order Confirmation & Tracking
        Route::get('/orders/{order:order_number}/confirmation', [OrderTrackingController::class, 'confirmation']);
        Route::get('/orders/{order:order_number}/track', [OrderTrackingController::class, 'track']);
    });

    // Customer Account
    Route::prefix('customer')->middleware('role:customer')->group(function () {
        Route::get('/profile', [CustomerAccountController::class, 'profile']);
        Route::put('/profile', [CustomerAccountController::class, 'updateProfile']);
        Route::apiResource('addresses', AddressController::class);
        Route::get('/orders', [CustomerAccountController::class, 'orders']);
        Route::get('/wishlist', [WishlistController::class, 'index']);
        Route::post('/wishlist', [WishlistController::class, 'store']);
        Route::delete('/wishlist/{product}', [WishlistController::class, 'destroy']);
    });

    // Platform Admin
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index']);

        // Sellers
        Route::get('/sellers', [AdminSellerController::class, 'index']);
        Route::get('/sellers/{seller}', [AdminSellerController::class, 'show']);
        Route::post('/sellers/{seller}/status', [AdminSellerController::class, 'updateStatus']);

        // Stores
        Route::get('/stores', [AdminStoreController::class, 'index']);
        Route::post('/stores/{store}/status', [AdminStoreController::class, 'updateStatus']);

        // Subscription Plans
        Route::apiResource('subscription-plans', AdminSubscriptionPlanController::class);
        Route::post('/subscription-plans/{plan}/activate', [AdminSubscriptionPlanController::class, 'activate']);
        Route::post('/subscription-plans/{plan}/deactivate', [AdminSubscriptionPlanController::class, 'deactivate']);

        // Platform Analytics
        Route::get('/analytics', [AdminAnalyticsController::class, 'index']);

        // Audit Logs
        Route::get('/audit-logs', [AdminAuditLogController::class, 'index']);

        // Platform Settings
        Route::get('/settings', [AdminSettingsController::class, 'index']);
        Route::put('/settings', [AdminSettingsController::class, 'update']);
    });

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{notification}/read', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
});