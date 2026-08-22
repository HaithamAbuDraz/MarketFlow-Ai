<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * CheckRole middleware — enforces role-based access control.
 *
 * Usage in routes:
 *   ->middleware('role:seller')
 *   ->middleware('role:seller,admin')
 *
 * Behaviour:
 *   - Unauthenticated user            → 401 Unauthorized
 *   - Authenticated, wrong role       → 403 Forbidden
 *   - Authenticated, correct role     → continue
 */
class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     * @param  string  ...$roles  One or more allowed roles (e.g. 'seller', 'admin').
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        // 1. Must be authenticated first.
        if ($user === null) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Unauthenticated. Please log in to continue.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        // 2. User's role must be in the allowed list (strict comparison).
        if (! in_array($user->role, $roles, true)) {
            return response()->json([
                'status'  => 'error',
                'message' => 'You do not have permission to access this resource.',
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
