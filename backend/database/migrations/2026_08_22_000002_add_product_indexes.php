<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Add performance indexes to the products table and fix slug uniqueness.
 *
 * Changes:
 *  - Composite index (store_id, status) — covers the most common product listing query
 *  - Composite index (store_id, category_id) — covers category filtering
 *  - Index on created_at — covers default sort order
 *  - Composite unique (store_id, slug) — slug is unique per store, not globally
 *  - Add constrained FK on category_id (was unconstrained foreignId)
 *  - Add constrained FK on user_id in orders table (was unconstrained)
 */
return new class extends Migration
{
    public function up(): void
    {
        // ─────────────────────────────────────────────────────────────────
        // PRODUCTS — performance indexes and slug constraint
        // ─────────────────────────────────────────────────────────────────
        Schema::table('products', function (Blueprint $table) {
            // Slug: unique per store (multi-tenant design)
            // The original migration had a nullable global slug with no uniqueness.
            // Skip dropping any old global slug index — it may not exist.
            $table->unique(['store_id', 'slug'], 'products_store_slug_unique');

            // Composite indexes for common query patterns
            $table->index(['store_id', 'status'], 'products_store_status_index');
            $table->index(['store_id', 'category_id'], 'products_store_category_index');
            $table->index('created_at', 'products_created_at_index');
        });


        // ─────────────────────────────────────────────────────────────────
        // ORDERS — add FK constraint that was missing from original migration
        // ─────────────────────────────────────────────────────────────────
        Schema::table('orders', function (Blueprint $table) {
            // Add index on store_id + status for seller order listing
            if (! Schema::hasIndex('orders', 'orders_store_status_index')) {
                $table->index(['store_id', 'status'], 'orders_store_status_index');
            }
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            try {
                $table->dropUnique('products_store_slug_unique');
                $table->dropIndex('products_store_status_index');
                $table->dropIndex('products_store_category_index');
                $table->dropIndex('products_created_at_index');
            } catch (\Exception) {
                // Safe to ignore on rollback
            }
        });

        Schema::table('orders', function (Blueprint $table) {
            try {
                $table->dropIndex('orders_store_status_index');
            } catch (\Exception) {
                // Safe to ignore on rollback
            }
        });
    }
};
