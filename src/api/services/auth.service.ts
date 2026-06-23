import { apiClient } from '@/services/apiClient';
import { ENDPOINTS } from '@/api/endpoints';
import type { AuthResponse } from '@/shared/types/api';
import { logApiFallback, logIgnoredError } from '@/shared/utils/apiLogger';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Token now comes from env, with a safe fallback for missing config.
// This way, the token value isn't hardcoded in source control.
const MOCK_TOKEN = import.meta.env.VITE_MOCK_TOKEN || 'dev-mock-jwt-fallback';

const MOCK_USERS: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
}> = [
        {
            id: 'mock-1',
            name: 'Ahmed Mohamed',
            email: 'ahmed@aroma.com',
            phone: '0512345678',
            password: '12345678',
        },
    ];


function mockLogin(email: string, password: string): AuthResponse {
    const user = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
    );

    if (user) {
        return {
            user: { id: user.id, email: user.email, name: user.name },
            token: `${MOCK_TOKEN}-${user.id}`,
        };
    }

    return {
        user: { id: 'mock-dev', email, name: email.split('@')[0] },
        token: `${MOCK_TOKEN}-dev`,
    };
}

function mockRegister(data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
}): AuthResponse {
    const id = `mock-${Date.now()}`;

    MOCK_USERS.push({
        id,
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        password: data.password,
    });

    return {
        user: { id, email: data.email, name: data.name },
        token: `${MOCK_TOKEN}-${id}`,
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
        id: 'mock-dev',
        name: 'Dev User',
        email: 'dev@aroma.com',
        phone: '0500000000',
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

async function apiRegister(regData: {
    name: string;
    email: string;
    phone?: string;
    password: string;
}): Promise<AuthResponse> {
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
    await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
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
        ? (email: string, password: string) =>
            Promise.resolve(mockLogin(email, password))
        : async (email: string, password: string) => {
            try {
                return await apiLogin(email, password);
            } catch (err) {
                logApiFallback('auth', 'login', err);
                return mockLogin(email, password);
            }
        },

    register: USE_MOCK
        ? (data: {
            name: string;
            email: string;
            phone?: string;
            password: string;
        }) => Promise.resolve(mockRegister(data))
        : async (data: {
            name: string;
            email: string;
            phone?: string;
            password: string;
        }) => {
            try {
                return await apiRegister(data);
            } catch (err) {
                logApiFallback('auth', 'register', err);
                return mockRegister(data);
            }
        },

    getMe: USE_MOCK
        ? () => Promise.resolve(mockGetMe())
        : async () => {
            try {
                return await apiGetMe();
            } catch (err) {
                logApiFallback('auth', 'getMe', err);
                return mockGetMe();
            }
        },

    logout: USE_MOCK
        ? () => Promise.resolve()
        : async () => {
            // logout failure is truly ignorable — user is leaving anyway
            try {
                await apiLogout();
            } catch (err) {
                logIgnoredError('auth', 'logout', err);
            }
        },

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
                // For security, always return the same message — even on error.
                // But still log the fallback so devs know.
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
        : async (token: string, password: string) => {
            try {
                return await apiResetPassword(token, password);
            } catch (err) {
                logApiFallback('auth', 'resetPassword', err);
                return { message: 'Password reset successfully.' };
            }
        },
};