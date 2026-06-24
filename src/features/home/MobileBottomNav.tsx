import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, User, MoreHorizontal } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/shared/hooks/useAuth';

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
    const authState = useAuth();
    const isAuthenticated = !!authState.user;

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

            <div className="h-16 md:hidden" aria-hidden="true" />
            <nav
                className="fixed bottom-0 left-0 right-0 z-[90] flex md:hidden border-t border-[#8C6239]/15 bg-[#FAF7F2]/95 backdrop-blur-xl shadow-[0_-8px_30px_-12px_rgba(72,45,32,0.25)]"
                aria-label="Mobile bottom navigation"
                style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
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
                            className="relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 transition-colors"
                            aria-label={tab.label}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {/* Active indicator: small dot above the icon */}
                            {isActive && (
                                <span
                                    className="absolute top-1 h-1 w-1 rounded-full bg-[#8C6239]"
                                    aria-hidden="true"
                                />
                            )}

                            {/* Icon container with badge */}
                            <span className="relative">
                                <Icon
                                    className={`h-5 w-5 transition-colors ${isActive
                                        ? 'text-[#8C6239]'
                                        : 'text-[#6B4423]/70'
                                        }`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                    aria-hidden="true"
                                />

                                {/* Cart badge */}
                                {tab.badge !== undefined && tab.badge > 0 && (
                                    <span
                                        className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[10px] font-bold text-white ring-2 ring-[#FAF7F2]"
                                        aria-label={`${tab.badge} items in cart`}
                                    >
                                        {tab.badge > 9 ? '9+' : tab.badge}
                                    </span>
                                )}
                            </span>

                            {/* Label */}
                            <span
                                className={`text-[10px] font-bold uppercase tracking-wide transition-colors ${isActive
                                    ? 'text-[#8C6239]'
                                    : 'text-[#6B4423]/70'
                                    }`}
                            >
                                {tab.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </>
    );
}