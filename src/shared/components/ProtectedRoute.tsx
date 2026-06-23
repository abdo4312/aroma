import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, useIsAuthenticated } from '@/shared/hooks/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation();
    const isAuthenticated = useIsAuthenticated();
    const hydrate = useAuth((s) => s.hydrate);
    const isHydrated = useAuth((s) => s.isHydrated);

    // Hydrate auth state from localStorage on first mount
    useEffect(() => {
        hydrate();
    }, [hydrate]);

    // Don't render anything until we know the real auth state
    // This prevents a flash-redirect to /login on page refresh
    if (!isHydrated) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}