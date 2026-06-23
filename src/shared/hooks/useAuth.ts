import { create } from 'zustand';
import type { User } from '@/shared/types/api';

// Keys used in storage
const TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

interface AuthState {
    /** The current JWT token (null = not logged in) */
    token: string | null;
    /** The current user profile (null = not logged in) */
    user: User | null;
    /** Whether we've hydrated from storage on app start */
    isHydrated: boolean;

    // ── Actions ──────────────────────────────────────────────
    /** Persist token + user after successful login/register */
    login: (token: string, user: User, rememberMe?: boolean) => void;
    /** Clear everything on logout */
    logout: () => void;
    /** Update user profile locally (e.g. after editing name) */
    updateUser: (user: Partial<User>) => void;
    /** Read persisted data from storage (call once on app mount) */
    hydrate: () => void;
}

/** Get the active storage — check both localStorage and sessionStorage */
function readToken(): string | null {
    try {
        return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
}

function readUser(): User | null {
    try {
        const fromLocal = localStorage.getItem(USER_KEY);
        const fromSession = sessionStorage.getItem(USER_KEY);
        const raw = fromLocal ?? fromSession;
        return raw ? (JSON.parse(raw) as User) : null;
    } catch {
        return null;
    }
}

function persistToken(token: string | null, storage: Storage) {
    try {
        if (token) {
            storage.setItem(TOKEN_KEY, token);
        } else {
            // Clear from BOTH storages on logout
            localStorage.removeItem(TOKEN_KEY);
            sessionStorage.removeItem(TOKEN_KEY);
        }
    } catch {
        // Storage unavailable — silently ignore
    }
}

function persistUser(user: User | null, storage: Storage) {
    try {
        if (user) {
            storage.setItem(USER_KEY, JSON.stringify(user));
        } else {
            // Clear from BOTH storages on logout
            localStorage.removeItem(USER_KEY);
            sessionStorage.removeItem(USER_KEY);
        }
    } catch {
        // Storage unavailable — silently ignore
    }
}

export const useAuth = create<AuthState>()((set, get) => ({
    token: null,
    user: null,
    isHydrated: false,

    login: (token, user, rememberMe = true) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        persistToken(token, storage);
        persistUser(user, storage);
        set({ token, user, isHydrated: true });
    },

    logout: () => {
        persistToken(null, localStorage); // clears both storages
        persistUser(null, localStorage);   // clears both storages
        set({ token: null, user: null, isHydrated: true });
    },

    updateUser: (partial) => {
        const current = get().user;
        if (!current) return;
        const updated = { ...current, ...partial };
        // Persist to whichever storage currently holds the data
        const storage = localStorage.getItem(TOKEN_KEY) ? localStorage : sessionStorage;
        persistUser(updated, storage);
        set({ user: updated });
    },

    hydrate: () => {
        if (get().isHydrated) return; // already hydrated
        set({
            token: readToken(),
            user: readUser(),
            isHydrated: true,
        });
    },
}));

export const useIsAuthenticated = () => useAuth((s) => !!s.token);