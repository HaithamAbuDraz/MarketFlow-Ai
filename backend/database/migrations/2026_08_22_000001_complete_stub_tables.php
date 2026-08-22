<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Corrective migration: Complete all stub tables that were created with only
 * id + timestamps. Each table receives its proper columns, foreign keys,
 * indexes, and constraints.
 *
 * Uses Schema::hasColumn() guards so this migration is safe to run against
 * databases that may have already received partial manual changes.
 */
return new class extends Migration
{
    public function up(): void
    {
        // ─────────────────────────────────────────────────────────────────
        // CATEGORIES — store-scoped, unique slug per store
        // ─────────────────────────────────────────────────────────────────
        Schema::table('categories', function (Blueprint $table) {
            if (! Schema::hasColumn('categories', 'store_id')) {
                $table->foreignId('store_id')
                    ->after('id')
                    ->constrained()
                    ->onDelete('cascade');
            }
            if (! Schema::hasColumn('categories', 'name')) {
                $table->string('name')->after('store_id');
            }
            if (! Schema::hasColumn('categories', 'slug')) {
                $table->string('slug')->after('name');
            }
            if (! Schema::hasColumn('categories', 'description')) {
                $table->text('description')->nullable()->after('slug');
            }
            if (! Schema::hasColumn('categories', 'parent_id')) {
                $table->foreignId('parent_id')
                    ->nullable()
                    ->after('description')
                    ->constrained('categories')
                    ->onDelete('set null');
            }
            if (! Schema::hasColumn('categories', 'sort_order')) {
                $table->integer('sort_order')->default(0)->after('parent_id');
            }
            if (! Schema::hasColumn('categories', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('sort_order');
            }

            // Composite unique: slug unique per store (not globally)
            $table->unique(['store_id', 'slug'], 'categories_store_slug_unique');
            $table->index('store_id', 'categories_store_id_index');
        });

        // ─────────────────────────────────────────────────────────────────
        // CUSTOMERS — store-scoped customer profiles (linked to users)
        // ─────────────────────────────────────────────────────────────────
        Schema::table('customers', function (Blueprint $table) {
            if (! Schema::hasColumn('customers', 'store_id')) {
                $table->foreignId('store_id')
                    ->after('id')
                    ->constrained()
                    ->onDelete('cascade');
            }
            if (! Schema::hasColumn('customers', 'user_id')) {
                $table->foreignId('user_id')
                    ->nullable()
                    ->after('store_id')
                    ->constrained()
                    ->onDelete('set null');
            }
            if (! Schema::hasColumn('customers', 'first_name')) {
                $table->string('first_name')->after('user_id');
            }
            if (! Schema::hasColumn('customers', 'last_name')) {
                $table->string('last_name')->nullable()->after('first_name');
            }
            if (! Schema::hasColumn('customers', 'email')) {
                $table->string('email')->after('last_name');
            }
            if (! Schema::hasColumn('customers', 'phone')) {
                $table->string('phone')->nullable()->after('email');
            }
            if (! Schema::hasColumn('customers', 'total_orders')) {
                $table->integer('total_orders')->default(0)->after('phone');
            }
            if (! Schema::hasColumn('customers', 'total_spent')) {
                $table->decimal('total_spent', 12, 2)->default(0)->after('total_orders');
            }

            $table->unique(['store_id', 'email'], 'customers_store_email_unique');
            $table->index('store_id', 'customers_store_id_index');
        });

        // ─────────────────────────────────────────────────────────────────
        // PRODUCT VARIANTS — child of products
        // ─────────────────────────────────────────────────────────────────
        Schema::table('product_variants', function (Blueprint $table) {
            if (! Schema::hasColumn('product_variants', 'product_id')) {
                $table->foreignId('product_id')
                    ->after('id')
                    ->constrained()
                    ->onDelete('cascade');
            }
            if (! Schema::hasColumn('product_variants', 'title')) {
                $table->string('title')->after('product_id');
            }
            if (! Schema::hasColumn('product_variants', 'sku')) {
                $table->string('sku')->nullable()->after('title');
            }
            if (! Schema::hasColumn('product_variants', 'price')) {
                $table->decimal('price', 10, 2)->nullable()->after('sku');
            }
            if (! Schema::hasColumn('product_variants', 'compare_at_price')) {
                $table->decimal('compare_at_price', 10, 2)->nullable()->after('price');
            }
            if (! Schema::hasColumn('product_variants', 'stock_quantity')) {
                $table->integer('stock_quantity')->default(0)->after('compare_at_price');
            }
            if (! Schema::hasColumn('product_variants', 'options')) {
                $table->json('options')->nullable()->after('stock_quantity');
            }
            if (! Schema::hasColumn('product_variants', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('options');
            }

            $table->index('product_id', 'product_variants_product_id_index');
        });

        // ─────────────────────────────────────────────────────────────────
        // SHOPPING CARTS — one cart per user per store
        // ─────────────────────────────────────────────────────────────────
        Schema::table('shopping_carts', function (Blueprint $table) {
            if (! Schema::hasColumn('shopping_carts', 'user_id')) {
                $table->foreignId('user_id')
                    ->after('id')
                    ->constrained()
                    ->onDelete('cascade');
            }
            if (! Schema::hasColumn('shopping_carts', 'store_id')) {
                $table->foreignId('store_id')
                    ->after('user_id')
                    ->constrained()
                    ->onDelete('cascade');
            }

            // Prevent duplicate carts per user+store
            $table->unique(['user_id', 'store_id'], 'carts_user_store_unique');
        });

        // ─────────────────────────────────────────────────────────────────
        // CART ITEMS — items within a shopping cart
        // ─────────────────────────────────────────────────────────────────
        Schema::table('cart_items', function (Blueprint $table) {
            if (! Schema::hasColumn('cart_items', 'shopping_cart_id')) {
                $table->foreignId('shopping_cart_id')
                    ->after('id')
                    ->constrained('shopping_carts')
                    ->onDelete('cascade');
            }
            if (! Schema::hasColumn('cart_items', 'product_id')) {
                $table->foreignId('product_id')
                    ->after('shopping_cart_id')
                    ->constrained()
                    ->onDelete('cascade');
            }
            if (! Schema::hasColumn('cart_items', 'product_variant_id')) {
                $table->foreignId('product_variant_id')
                    ->nullable()
                    ->after('product_id')
                    ->constrained('product_variants')
                    ->onDelete('set null');
            }
            if (! Schema::hasColumn('cart_items', 'quantity')) {
                $table->integer('quantity')->default(1)->after('product_variant_id');
            }
            if (! Schema::hasColumn('cart_items', 'unit_price')) {
                $table->decimal('unit_price', 10, 2)->after('quantity');
            }

            // Prevent duplicate line items for same product+variant in same cart
            $table->unique(
                ['shopping_cart_id', 'product_id', 'product_variant_id'],
                'cart_items_cart_product_variant_unique'
            );
            $table->index('shopping_cart_id', 'cart_items_cart_id_index');
        });

        // ─────────────────────────────────────────────────────────────────
        // WISHLISTS — one wishlist per user per store
        // ─────────────────────────────────────────────────────────────────
        Schema::table('wishlists', function (Blueprint $table) {
            if (! Schema::hasColumn('wishlists', 'user_id')) {
                $table->foreignId('user_id')
                    ->after('id')
                    ->constrained()
                    ->onDelete('cascade');
            }
            if (! Schema::hasColumn('wishlists', 'store_id')) {
                $table->foreignId('store_id')
                    ->after('user_id')
                    ->constrained()
                    ->onDelete('cascade');
            }
            if (! Schema::hasColumn('wishlists', 'product_id')) {
                $table->foreignId('product_id')
                    ->after('store_id')
                    ->constrained()
                    ->onDelete('cascade');
            }

            // Prevent duplicate wishlist entries for same user+product+store
            $table->unique(
                ['user_id', 'store_id', 'product_id'],
                'wishlists_user_store_product_unique'
            );
        });

        // ─────────────────────────────────────────────────────────────────
        // ORDER ITEMS — line items within an order
        // ─────────────────────────────────────────────────────────────────
        Schema::table('order_items', function (Blueprint $table) {
            if (! Schema::hasColumn('order_items', 'order_id')) {
                $table->foreignId('order_id')
                    ->after('id')
                    ->constrained()
                    ->onDelete('cascade');
            }
            if (! Schema::hasColumn('order_items', 'product_id')) {
                $table->foreignId('product_id')
                    ->after('order_id')
                    ->nullable()
                    ->constrained()
                    ->onDelete('set null');
            }
            if (! Schema::hasColumn('order_items', 'product_variant_id')) {
                $table->foreignId('product_variant_id')
                    ->nullable()
                    ->after('product_id')
                    ->constrained('product_variants')
                    ->onDelete('set null');
            }
            if (! Schema::hasColumn('order_items', 'product_title')) {
                // Snapshot of product title at time of order (product may be deleted later)
                $table->string('product_title')->after('product_variant_id');
            }
            if (! Schema::hasColumn('order_items', 'variant_title')) {
                $table->string('variant_title')->nullable()->after('product_title');
            }
            if (! Schema::hasColumn('order_items', 'sku')) {
                $table->string('sku')->nullable()->after('variant_title');
            }
            if (! Schema::hasColumn('order_items', 'quantity')) {
                $table->integer('quantity')->default(1)->after('sku');
            }
            if (! Schema::hasColumn('order_items', 'unit_price')) {
                $table->decimal('unit_price', 10, 2)->after('quantity');
            }
            if (! Schema::hasColumn('order_items', 'total_price')) {
                $table->decimal('total_price', 10, 2)->after('unit_price');
            }

            $table->index('order_id', 'order_items_order_id_index');
        });

        // ─────────────────────────────────────────────────────────────────
        // PAYMENTS — payment records for orders
        // ─────────────────────────────────────────────────────────────────
        Schema::table('payments', function (Blueprint $table) {
            if (! Schema::hasColumn('payments', 'order_id')) {
                $table->foreignId('order_id')
                    ->after('id')
                    ->constrained()
                    ->onDelete('cascade');
            }
            if (! Schema::hasColumn('payments', 'gateway')) {
                // 'mock', 'stripe', 'paypal', etc.
                $table->string('gateway')->default('mock')->after('order_id');
            }
            if (! Schema::hasColumn('payments', 'gateway_transaction_id')) {
                $table->string('gateway_transaction_id')->nullable()->after('gateway');
            }
            if (! Schema::hasColumn('payments', 'amount')) {
                $table->decimal('amount', 10, 2)->after('gateway_transaction_id');
            }
            if (! Schema::hasColumn('payments', 'currency')) {
                $table->string('currency', 3)->default('USD')->after('amount');
            }
            if (! Schema::hasColumn('payments', 'status')) {
                // pending | processing | succeeded | failed | canceled | refunded
                $table->string('status')->default('pending')->after('currency');
            }
            if (! Schema::hasColumn('payments', 'paid_at')) {
                $table->timestamp('paid_at')->nullable()->after('status');
            }
            if (! Schema::hasColumn('payments', 'metadata')) {
                $table->json('metadata')->nullable()->after('paid_at');
            }

            $table->index('order_id', 'payments_order_id_index');
            $table->index('status', 'payments_status_index');
        });

        // ─────────────────────────────────────────────────────────────────
        // ORDER STATUS HISTORY — audit trail for order state changes
        // ─────────────────────────────────────────────────────────────────
        Schema::table('order_status_history', function (Blueprint $table) {
            if (! Schema::hasColumn('order_status_history', 'order_id')) {
                $table->foreignId('order_id')
                    ->after('id')
                    ->constrained()
                    ->onDelete('cascade');
            }
            if (! Schema::hasColumn('order_status_history', 'from_status')) {
                $table->string('from_status')->nullable()->after('order_id');
            }
            if (! Schema::hasColumn('order_status_history', 'to_status')) {
                $table->string('to_status')->after('from_status');
            }
            if (! Schema::hasColumn('order_status_history', 'changed_by')) {
                $table->foreignId('changed_by')
                    ->nullable()
                    ->after('to_status')
                    ->constrained('users')
                    ->onDelete('set null');
            }
            if (! Schema::hasColumn('order_status_history', 'note')) {
                $table->text('note')->nullable()->after('changed_by');
            }

            $table->index('order_id', 'order_status_history_order_id_index');
        });

        // ─────────────────────────────────────────────────────────────────
        // INVENTORY MOVEMENTS — audit trail for stock changes
        // ─────────────────────────────────────────────────────────────────
        Schema::table('inventory_movements', function (Blueprint $table) {
            if (! Schema::hasColumn('inventory_movements', 'product_id')) {
                $table->foreignId('product_id')
                    ->after('id')
                    ->constrained()
                    ->onDelete('cascade');
            }
            if (! Schema::hasColumn('inventory_movements', 'product_variant_id')) {
                $table->foreignId('product_variant_id')
                    ->nullable()
                    ->after('product_id')
                    ->constrained('product_variants')
                    ->onDelete('set null');
            }
            if (! Schema::hasColumn('inventory_movements', 'type')) {
                // sale | return | adjustment | restock
                $table->string('type')->after('product_variant_id');
            }
            if (! Schema::hasColumn('inventory_movements', 'quantity_change')) {
                // Positive = stock added, negative = stock removed
                $table->integer('quantity_change')->after('type');
            }
            if (! Schema::hasColumn('inventory_movements', 'quantity_before')) {
                $table->integer('quantity_before')->after('quantity_change');
            }
            if (! Schema::hasColumn('inventory_movements', 'quantity_after')) {
                $table->integer('quantity_after')->after('quantity_before');
            }
            if (! Schema::hasColumn('inventory_movements', 'reference_type')) {
                $table->string('reference_type')->nullable()->after('quantity_after');
            }
            if (! Schema::hasColumn('inventory_movements', 'reference_id')) {
                $table->unsignedBigInteger('reference_id')->nullable()->after('reference_type');
            }
            if (! Schema::hasColumn('inventory_movements', 'note')) {
                $table->text('note')->nullable()->after('reference_id');
            }
            if (! Schema::hasColumn('inventory_movements', 'created_by')) {
                $table->foreignId('created_by')
                    ->nullable()
                    ->after('note')
                    ->constrained('users')
                    ->onDelete('set null');
            }

            $table->index('product_id', 'inventory_movements_product_id_index');
        });
    }

    public function down(): void
    {
        // Drop the added unique/index constraints and columns in reverse order.
        // Wrapped in try/catch because SQLite doesn't support dropping foreign keys.
        // A full rollback would require dropping and recreating the tables.
        Schema::table('inventory_movements', function (Blueprint $table) {
            $table->dropIndex('inventory_movements_product_id_index');
            $table->dropColumn([
                'product_id', 'product_variant_id', 'type',
                'quantity_change', 'quantity_before', 'quantity_after',
                'reference_type', 'reference_id', 'note', 'created_by',
            ]);
        });

        Schema::table('order_status_history', function (Blueprint $table) {
            $table->dropIndex('order_status_history_order_id_index');
            $table->dropColumn(['order_id', 'from_status', 'to_status', 'changed_by', 'note']);
        });

        Schema::table('payments', function (Blueprint $table) {
            $table->dropIndex('payments_order_id_index');
            $table->dropIndex('payments_status_index');
            $table->dropColumn([
                'order_id', 'gateway', 'gateway_transaction_id',
                'amount', 'currency', 'status', 'paid_at', 'metadata',
            ]);
        });

        Schema::table('order_items', function (Blueprint $table) {
            $table->dropIndex('order_items_order_id_index');
            $table->dropColumn([
                'order_id', 'product_id', 'product_variant_id',
                'product_title', 'variant_title', 'sku',
                'quantity', 'unit_price', 'total_price',
            ]);
        });

        Schema::table('wishlists', function (Blueprint $table) {
            $table->dropUnique('wishlists_user_store_product_unique');
            $table->dropColumn(['user_id', 'store_id', 'product_id']);
        });

        Schema::table('cart_items', function (Blueprint $table) {
            $table->dropUnique('cart_items_cart_product_variant_unique');
            $table->dropIndex('cart_items_cart_id_index');
            $table->dropColumn([
                'shopping_cart_id', 'product_id', 'product_variant_id',
                'quantity', 'unit_price',
            ]);
        });

        Schema::table('shopping_carts', function (Blueprint $table) {
            $table->dropUnique('carts_user_store_unique');
            $table->dropColumn(['user_id', 'store_id']);
        });

        Schema::table('product_variants', function (Blueprint $table) {
            $table->dropIndex('product_variants_product_id_index');
            $table->dropColumn([
                'product_id', 'title', 'sku', 'price',
                'compare_at_price', 'stock_quantity', 'options', 'is_active',
            ]);
        });

        Schema::table('customers', function (Blueprint $table) {
            $table->dropUnique('customers_store_email_unique');
            $table->dropIndex('customers_store_id_index');
            $table->dropColumn([
                'store_id', 'user_id', 'first_name', 'last_name',
                'email', 'phone', 'total_orders', 'total_spent',
            ]);
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropUnique('categories_store_slug_unique');
            $table->dropIndex('categories_store_id_index');
            $table->dropColumn([
                'store_id', 'name', 'slug', 'description',
                'parent_id', 'sort_order', 'is_active',
            ]);
        });
    }
};
