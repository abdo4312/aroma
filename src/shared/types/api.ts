// src/shared/types/api.ts

export interface ApiError {
    message: string;
    statusCode?: number;
    errors?: Record<string, string[]>;
}

export interface AuthResponse {
    user: {
        id: string;
        email: string;
        name: string;
    };
    token: string;
}

/**
 * Minimal user shape returned by auth endpoints (`/auth/me`, `/auth/login`, `/auth/register`).
 * Extended fields (phone, address, avatar) are optional so updateUser() can persist
 * them after a profile update without forcing every auth response to include them.
 */
export interface User {
    id: string;
    email: string;
    name: string;
    /** Phone is optional in auth responses but populated after profile fetch. */
    phone?: string;
    address?: string;
    avatar?: string;
}

export interface OrderItem {
    productId: string;
    quantity: number;
}

export interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
}

export type UserProfile = User;