import { Loader2, Coffee } from 'lucide-react';

/**
 * PageLoader
 * ==========
 * Full-screen coffee-themed loading fallback used by <Suspense>
 * while React.lazy chunks are being fetched.
 *
 * Accessibility:
 * - role="status" + aria-live="polite" announces loading to screen readers.
 * - sr-only text provides a verbal description.
 * - The animation is decorative → aria-hidden on the icon.
 */
export function PageLoader({ label = 'Loading page' }: { label?: string }) {
    return (
        <div
            role="status"
            aria-live="polite"
            className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4"
        >
            <div className="relative flex items-center justify-center">
                {/* Outer spinning ring */}
                <Loader2
                    className="h-12 w-12 animate-spin text-[#8C6239]"
                    aria-hidden="true"
                />
                {/* Center coffee icon (static) */}
                <Coffee
                    className="absolute h-5 w-5 text-[#5f3a26]"
                    aria-hidden="true"
                />
            </div>
            <p className="text-sm font-medium text-[#6B4423]">
                {label}…
            </p>
            <span className="sr-only">{label}. Please wait.</span>
        </div>
    );
}