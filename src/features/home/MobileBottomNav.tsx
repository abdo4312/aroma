import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, User, MoreHorizontal } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useIsAuthenticated } from '@/shared/hooks/useAuth';

/**
 * MobileBottomNav
 * ===============
 * Fixed bottom navigation bar — mobile only (hidden on md+).
 * Same glassmorphism pattern as the rest of the site:
 *   bg-[#FAF7F2]/95 + backdrop-blur-xl + border-t in coffee-500/15
 *
 * IMPORTANT: All hooks must be called at the TOP LEVEL of the component,
 * never inside try/catch, conditions, or loops. Otherwise React's
 * Rules of Hooks are violated and the ErrorBoundary will crash the app.
 */

type Tab = {
    label: string;
    to: string;
    icon: typeof Home;
    match?: (pathname: string) => boolean;
    badge?: number;
};

export function MobileBottomNav() {
    const location = useLocation();
    const totalItems = useCartStore((state) => state.getTotalItems());
    const isAuthenticated = useIsAuthenticated();
    const profilePath = isAuthenticated ? '/profile' : '/login';

    const tabs: Tab[] = [
        {
            label: 'Home',
            to: '/',
            icon: Home,
            match: (p) => p === '/',
        },
        {
            label: 'Shop',
            to: '/shop-beans',
            icon: ShoppingBag,
            match: (p) => p === '/shop-beans' || p.startsWith('/coffee/'),
        },
        {
            label: 'Cart',
            to: '/cart',
            icon: ShoppingCart,
            badge: totalItems,
        },
        {
            label: 'Profile',
            to: profilePath,
            icon: User,
            match: (p) => p === '/profile' || p === '/login',
        },
        {
            label: 'More',
            to: '/more',
            icon: MoreHorizontal,
            match: (p) =>
                p === '/more' ||
                p === '/about' ||
                p === '/shipping' ||
                p === '/brew-guide' ||
                p === '/support' ||
                p === '/privacy-policy' ||
                p === '/terms-of-service',
        },
    ];

    return (
        <>
            {/* Spacer — reserves vertical space so the last page section
                isn't hidden behind the fixed bar (mobile only). */}
            <div className="h-16 md:hidden" aria-hidden="true" />

            {/* Fixed bottom bar — same glassmorphism pattern as the header/footer.
                z-[90] sits below header (z-100), below modals (z-200),
                but above page content. */}
            <nav
                className="fixed bottom-0 left-0 right-0 z-[90] flex justify-around items-center px-2 py-2 md:hidden border-t border-[#8C6239]/15 bg-[#FAF7F2]/95 backdrop-blur-xl rounded-t-2xl shadow-[0_-8px_24px_-8px_rgba(72,45,32,0.18)]"
                aria-label="Mobile bottom navigation"
                style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))' }}
            >
                {tabs.map((tab) => {
                    const isActive = tab.match
                        ? tab.match(location.pathname)
                        : location.pathname === tab.to;
                    const Icon = tab.icon;

                    return (
                        <Link
                            key={tab.label}
                            to={tab.to}
                            className="relative flex flex-1 flex-col items-center justify-center gap-1 py-1.5 transition-all duration-200 hover:scale-110 active:scale-95"
                            aria-label={tab.label}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {/* Icon + badge */}
                            <span className="relative">
                                <Icon
                                    className={`h-6 w-6 transition-colors ${isActive ? 'text-[#8C6239]' : 'text-[#6B4423]/70'
                                        }`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                    fill={isActive ? 'currentColor' : 'none'}
                                    aria-hidden="true"
                                />

                                {tab.badge !== undefined && tab.badge > 0 && (
                                    <span
                                        className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[10px] font-bold text-white ring-2 ring-[#FAF7F2]"
                                        aria-label={`${tab.badge} items in cart`}
                                    >
                                        {tab.badge > 9 ? '9+' : tab.badge}
                                    </span>
                                )}
                            </span>

                            {/* Label */}
                            <span
                                className={`text-[10px] font-bold uppercase tracking-wide transition-colors ${isActive ? 'text-[#8C6239]' : 'text-[#6B4423]/70'
                                    }`}
                            >
                                {tab.label}
                            </span>

                            {/* Active dot indicator (below the label) */}
                            {isActive && (
                                <span
                                    className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-[#8C6239]"
                                    aria-hidden="true"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </>
    );
}
