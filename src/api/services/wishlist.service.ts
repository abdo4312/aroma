import { apiClient } from '@/services/apiClient';
import { ENDPOINTS } from '@/api/endpoints';
import type { Product } from '@/shared/types/product.types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export interface WishlistResponse {
    items: Product[];
    total: number;
}


function mockGetWishlist(): WishlistResponse {
    try {
        const raw = localStorage.getItem('aroma-wishlist-storage');
        if (raw) {
            const parsed = JSON.parse(raw);
            const ids: string[] = parsed?.state?.items || [];
            return { items: [], total: ids.length };
        }
    } catch { /* ignore */ }
    return { items: [], total: 0 };
}

function mockAddToWishlist(_productId: string): { success: boolean } {
    return { success: true };
}

function mockRemoveFromWishlist(_productId: string): { success: boolean } {
    return { success: true };
}

function mockToggleWishlist(_productId: string): { added: boolean } {
    return { added: true };
}


async function apiGetWishlist(): Promise<WishlistResponse> {
    const { data } = await apiClient.get<WishlistResponse>(
        ENDPOINTS.WISHLIST.GET
    );
    return data;
}

async function apiAddToWishlist(
    productId: string
): Promise<WishlistResponse> {
    const { data } = await apiClient.post<WishlistResponse>(
        ENDPOINTS.WISHLIST.ADD,
        { productId }
    );
    return data;
}

async function apiRemoveFromWishlist(
    productId: string
): Promise<WishlistResponse> {
    const { data } = await apiClient.delete<WishlistResponse>(
        ENDPOINTS.WISHLIST.REMOVE(productId)
    );
    return data;
}

async function apiToggleWishlist(
    productId: string
): Promise<{ added: boolean }> {
    const { data } = await apiClient.post<{ added: boolean }>(
        ENDPOINTS.WISHLIST.TOGGLE,
        { productId }
    );
    return data;
}


export const wishlistService = {
    get: USE_MOCK
        ? () => Promise.resolve(mockGetWishlist())
        : async () => {
            try {
                return await apiGetWishlist();
            } catch {
                return mockGetWishlist();
            }
        },

    add: USE_MOCK
        ? (productId: string) =>
            Promise.resolve(mockAddToWishlist(productId))
        : async (productId: string) => {
            try {
                return await apiAddToWishlist(productId);
            } catch {
                return mockAddToWishlist(productId);
            }
        },

    remove: USE_MOCK
        ? (productId: string) =>
            Promise.resolve(mockRemoveFromWishlist(productId))
        : async (productId: string) => {
            try {
                return await apiRemoveFromWishlist(productId);
            } catch {
                return mockRemoveFromWishlist(productId);
            }
        },

    toggle: USE_MOCK
        ? (productId: string) =>
            Promise.resolve(mockToggleWishlist(productId))
        : async (productId: string) => {
            try {
                return await apiToggleWishlist(productId);
            } catch {
                return mockToggleWishlist(productId);
            }
        },
};