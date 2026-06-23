/**
 * apiLogger
 * =========
 * Lightweight logger for silent API fallbacks.
 *
 * Problem we're solving:
 *   Every service file has a pattern like:
 *     try { return await apiCall() } catch { return mockData() }
 *   This silently swallows errors — the user gets mock data thinking
 *   it's real, and devs have no way to know the API is failing.
 *
 * Solution:
 *   Call `logApiFallback()` inside every catch block. It:
 *   - Prints a warning to the console (visible in dev tools)
 *   - Includes the service name, method, and original error
 *   - In production, can be wired to Sentry/LogRocket via `setRemoteReporter`
 *
 * Usage:
 *   import { logApiFallback } from '@/shared/utils/apiLogger';
 *
 *   try {
 *     return await apiLogin(email, password);
 *   } catch (err) {
 *     logApiFallback('auth', 'login', err);
 *     return mockLogin(email, password);
 *   }
 */

type Reporter = (payload: {
    service: string;
    method: string;
    error: unknown;
    timestamp: string;
    isDev: boolean;
}) => void;

let remoteReporter: Reporter | null = null;

/**
 * Register a remote error reporter (e.g. Sentry, LogRocket).
 * Call this once at app startup.
 */
export function setRemoteReporter(reporter: Reporter | null) {
    remoteReporter = reporter;
}

/**
 * Log a silent API fallback.
 *
 * - In dev: prints a yellow warning to the console.
 * - Always: forwards to the remote reporter if one is registered.
 *
 * The original error is preserved so the stack trace is not lost.
 */
export function logApiFallback(
    service: string,
    method: string,
    error: unknown,
): void {
    const payload = {
        service,
        method,
        error,
        timestamp: new Date().toISOString(),
        isDev: import.meta.env.DEV,
    };

    // Dev: visible console warning (NOT an error, since fallback is intentional)
    if (import.meta.env.DEV) {
        console.warn(
            `⚠️ [API Fallback] ${service}.${method}() failed — using mock data.`,
            '\n  Error:',
            error,
        );
    }

    // Prod: forward to remote reporter (Sentry, LogRocket, etc.) if registered
    if (remoteReporter) {
        try {
            remoteReporter(payload);
        } catch {
            // The reporter itself must never break the app
        }
    }
}

/**
 * Same as logApiFallback but for cases where the error is truly
 * ignorable (e.g. logout failing — we don't care, user is leaving).
 * Still logs in dev so we know it happened, but doesn't escalate.
 */
export function logIgnoredError(
    service: string,
    method: string,
    error: unknown,
): void {
    if (import.meta.env.DEV) {
        console.info(
            `ℹ️ [Ignored] ${service}.${method}() failed (expected/intentional).`,
            '\n  Error:',
            error,
        );
    }
}