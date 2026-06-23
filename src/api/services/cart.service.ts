

import { apiClient } from '@/services/apiClient';
import { ENDPOINTS } from '@/api/endpoints';
import type { CartItem } from '@/shared/types/product.types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export interface CartResponse {
    items: CartItem[];
    total: number;
}


function mockGetCart(): CartResponse {
    try {
        const raw = localStorage.getItem('aroma-cart-storage');
        if (raw) {
            const parsed = JSON.parse(raw);
            const items: CartItem[] = parsed?.state?.items || [];
            const total = items.reduce(
                (sum: number, item: CartItem) => sum + item.price * item.quantity,
                0
            );
            return { items, total };
        }
    } catch { /* ignore */ }
    return { items: [], total: 0 };
}

function mockAddToCart(_item: Omit<CartItem, 'quantity'> & { quantity?: number }): { success: boolean } {
    return { success: true };
}

function mockRemoveFromCart(_id: string): { success: boolean } {
    return { success: true };
}

function mockUpdateQuantity(_id: string, _quantity: number): { success: boolean } {
    return { success: true };
}

function mockClearCart(): { success: boolean } {
    return { success: true };
}


async function apiGetCart(): Promise<CartResponse> {
    const { data } = await apiClient.get<CartResponse>(ENDPOINTS.CART.GET);
    return data;
}

async function apiAddToCart(
    item: Omit<CartItem, 'quantity'> & { quantity?: number }
): Promise<CartResponse> {
    const { data } = await apiClient.post<CartResponse>(
        ENDPOINTS.CART.ADD,
        item
    );
    return data;
}

async function apiRemoveFromCart(id: string): Promise<CartResponse> {
    const { data } = await apiClient.delete<CartResponse>(
        ENDPOINTS.CART.REMOVE(id)
    );
    return data;
}

async function apiUpdateQuantity(
    id: string,
    quantity: number
): Promise<CartResponse> {
    const { data } = await apiClient.put<CartResponse>(
        ENDPOINTS.CART.UPDATE(id),
        { quantity }
    );
    return data;
}

async function apiClearCart(): Promise<{ success: boolean }> {
    const { data } = await apiClient.delete<{ success: boolean }>(
        ENDPOINTS.CART.CLEAR
    );
    return data;
}


export const cartService = {
    get: USE_MOCK
        ? () => Promise.resolve(mockGetCart())
        : async () => {
            try {
                return await apiGetCart();
            } catch {
                return mockGetCart();
            }
        },

    add: USE_MOCK
        ? (item: Omit<CartItem, 'quantity'> & { quantity?: number }) =>
            Promise.resolve(mockAddToCart(item))
        : async (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
            try {
                return await apiAddToCart(item);
            } catch {
                return mockAddToCart(item);
            }
        },

    remove: USE_MOCK
        ? (id: string) => Promise.resolve(mockRemoveFromCart(id))
        : async (id: string) => {
            try {
                return await apiRemoveFromCart(id);
            } catch {
                return mockRemoveFromCart(id);
            }
        },

    update: USE_MOCK
        ? (id: string, quantity: number) =>
            Promise.resolve(mockUpdateQuantity(id, quantity))
        : async (id: string, quantity: number) => {
            try {
                return await apiUpdateQuantity(id, quantity);
            } catch {
                return mockUpdateQuantity(id, quantity);
            }
        },

    clear: USE_MOCK
        ? () => Promise.resolve(mockClearCart())
        : async () => {
            try {
                return await apiClearCart();
            } catch {
                return mockClearCart();
            }
        },
};