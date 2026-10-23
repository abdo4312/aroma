import { apiClient } from '@/services/apiClient';
import { ENDPOINTS } from '@/api/endpoints';
import type { AuthResponse } from '@/shared/types/api';
import { logApiFallback, logIgnoredError } from '@/shared/utils/apiLogger';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const DEMO_TOKEN = 'demo-token';

interface RegisterInput {
    name: string;
    email: string;
    phone?: string;
    password: string;
}

/**
 * Demo mode only. It does not validate credentials and never touches a real
 * backend; set VITE_USE_MOCK=true to use it.
 */
function mockLogin(email: string): AuthResponse {
    return {
        user: {
            id: 'demo-user',
            email,
            name: email.split('@')[0] || 'Demo User',
        },
        token: `${DEMO_TOKEN}-demo`,
    };
}

function mockRegister(data: RegisterInput): AuthResponse {
    return {
        user: {
            id: `demo-${Date.now()}`,
            email: data.email,
            name: data.name,
        },
        token: `${DEMO_TOKEN}-demo`,
    };
}

function mockGetMe() {
    try {
        const raw = localStorage.getItem('user');
        if (raw) return JSON.parse(raw);
    } catch (err) {
        logIgnoredError('auth', 'mockGetMe', err);
    }

    return {
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@example.com',
        phone: '',
        address: '',
    };
}

async function apiLogin(email: string, password: string): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
    });
    return data;
}

async function apiRegister(regData: RegisterInput): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(
        ENDPOINTS.AUTH.REGISTER,
        regData
    );
    return data;
}

async function apiGetMe() {
    const { data } = await apiClient.get(ENDPOINTS.AUTH.ME);
    return data;
}

async function apiLogout(): Promise<void> {
    try {
        await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    } catch (err) {
        // Local session cleanup should not depend on the network.
        logIgnoredError('auth', 'logout', err);
    }
}

async function apiForgotPassword(email: string): Promise<{ message: string }> {
    const { data } = await apiClient.post<{ message: string }>(
        ENDPOINTS.AUTH.FORGOT_PASSWORD,
        { email }
    );
    return data;
}

async function apiResetPassword(
    token: string,
    password: string
): Promise<{ message: string }> {
    const { data } = await apiClient.post<{ message: string }>(
        ENDPOINTS.AUTH.RESET_PASSWORD,
        { token, password }
    );
    return data;
}

export const authService = {
    login: USE_MOCK
        ? (email: string, _password: string) => Promise.resolve(mockLogin(email))
        : apiLogin,

    register: USE_MOCK
        ? (data: RegisterInput) => Promise.resolve(mockRegister(data))
        : apiRegister,

    getMe: USE_MOCK ? () => Promise.resolve(mockGetMe()) : apiGetMe,

    logout: USE_MOCK ? () => Promise.resolve() : apiLogout,

    forgotPassword: USE_MOCK
        ? (_email: string) =>
            Promise.resolve({
                message:
                    'If an account with that email exists, we sent a reset link.',
            })
        : async (email: string) => {
            try {
                return await apiForgotPassword(email);
            } catch (err) {
                // Do not reveal whether an account exists.
                logApiFallback('auth', 'forgotPassword', err);
                return {
                    message:
                        'If an account with that email exists, we sent a reset link.',
                };
            }
        },

    resetPassword: USE_MOCK
        ? (_token: string, _password: string) =>
            Promise.resolve({ message: 'Password reset successfully.' })
        : apiResetPassword,
};
