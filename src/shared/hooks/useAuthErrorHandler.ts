import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setOnUnauthorized } from '@/services/apiClient';

export function useAuthErrorHandler() {
    const navigate = useNavigate();

    useEffect(() => {
        setOnUnauthorized(() => {
            navigate('/login', { replace: true });
        });

        // Cleanup: remove callback on unmount
        return () => {
            setOnUnauthorized(null);
        };
    }, [navigate]);
}