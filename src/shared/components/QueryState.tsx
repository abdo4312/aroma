import { type ReactNode } from 'react';
import { Loader2, AlertTriangle, Inbox } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

// ── Loading State ─────────────────────────────────────────

interface LoadingProps {
    message?: string;
    className?: string;
}

export function QueryLoading({
    message = 'Loading...',
    className,
}: LoadingProps) {
    return (
        <div className={cn('flex flex-col items-center justify-center py-20', className)}>
            <Loader2 className="w-12 h-12 text-coffee-500 animate-spin mb-4" />
            <p className="text-coffee-700/70 font-bold animate-pulse uppercase tracking-widest text-xs">
                {message}
            </p>
        </div>
    );
}

// ── Error State ───────────────────────────────────────────

interface ErrorProps {
    message?: string;
    onRetry?: () => void;
    className?: string;
}

export function QueryError({
    message = 'Something went wrong. Please try again.',
    onRetry,
    className,
}: ErrorProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center py-20 bg-red-50/50 rounded-[3rem] border border-red-100',
                className
            )}
        >
            <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
            <p className="text-coffee-700/70 font-medium mb-4">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-8 py-3 rounded-xl bg-coffee-800 text-white font-bold hover:bg-coffee-600 transition-all shadow-lg active:scale-95"
                >
                    Retry
                </button>
            )}
        </div>
    );
}

// ── Empty State ───────────────────────────────────────────

interface EmptyProps {
    icon?: ReactNode;
    title?: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export function QueryEmpty({
    icon,
    title = 'No Results Found',
    description = 'There are no items to display at the moment.',
    action,
    className,
}: EmptyProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center py-20 text-center',
                className
            )}
        >
            <div className="w-16 h-16 bg-coffee-50/80 rounded-2xl flex items-center justify-center mb-4 text-coffee-400">
                {icon ?? <Inbox className="w-8 h-8" />}
            </div>
            <h3 className="text-lg font-bold text-coffee-900 mb-2">{title}</h3>
            <p className="text-coffee-700/60 text-sm max-w-sm mb-6">{description}</p>
            {action}
        </div>
    );
}

// ── Composite QueryState ──────────────────────────────────

interface QueryStateProps {
    isLoading?: boolean;
    error?: unknown;
    isEmpty?: boolean;
    /** Custom loading message */
    loadingMessage?: string;
    /** Custom error message */
    errorMessage?: string;
    /** Retry callback — shows retry button on error */
    onRetry?: () => void;
    /** Empty state configuration */
    emptyConfig?: Omit<EmptyProps, 'className'>;
    /** Content to render when not loading / error / empty */
    children: ReactNode;
    className?: string;
}

/**
 * A unified component for handling loading, error, and empty states.
 *
 * Usage:
 * ```tsx
 * <QueryState
 *   isLoading={isLoading}
 *   error={error}
 *   isEmpty={products.length === 0}
 *   loadingMessage="Loading coffee beans..."
 *   onRetry={refetch}
 *   emptyConfig={{ title: 'No beans found', description: 'Try different filters.' }}
 * >
 *   <ProductGrid products={products} />
 * </QueryState>
 * ```
 */
export function QueryState({
    isLoading,
    error,
    isEmpty,
    loadingMessage,
    errorMessage,
    onRetry,
    emptyConfig,
    children,
    className,
}: QueryStateProps) {
    if (isLoading) {
        return <QueryLoading message={loadingMessage} className={className} />;
    }

    if (error) {
        return (
            <QueryError
                message={errorMessage}
                onRetry={onRetry}
                className={className}
            />
        );
    }

    if (isEmpty) {
        return <QueryEmpty {...emptyConfig} className={className} />;
    }

    return <>{children}</>;
}