// ============================================================
// Aroma Corner — Fallback Helpers
// withFallback: try API, fall back to mock data on error
// filterMockProducts: apply the same filters on local data
// ============================================================

import type { Product, ProductsQuery, PaginatedResponse } from '@/shared/types/product.types';
import { allProducts, getFeaturedProducts } from './products';
import { FLAT_CATEGORIES } from './categories';

/**
 * Try an API call; if it fails, return the fallback value instead.
 */
export async function withFallback<T>(
    apiCall: () => Promise<T>,
    fallback: T
): Promise<T> {
    try {
        return await apiCall();
    } catch {
        return fallback;
    }
}

/**
 * Apply ProductsQuery filters to the local mock data.
 * Used as fallback when the API is unavailable.
 */
export function filterMockProducts(query?: ProductsQuery): PaginatedResponse<Product> {
    let filtered = [...allProducts];

    if (query?.productType) {
        filtered = filtered.filter((p) => p.productType === query.productType);
    }

    if (query?.category) {
        filtered = filtered.filter((p) => p.category === query.category);
    }

    if (query?.subCategory) {
        filtered = filtered.filter((p) => p.subCategory === query.subCategory);
    }

    if (query?.roastLevel) {
        filtered = filtered.filter((p) => p.roastLevel === query.roastLevel);
    }

    if (query?.origin) {
        filtered = filtered.filter((p) => p.origin === query.origin);
    }

    if (query?.search) {
        const q = query.search.toLowerCase();
        filtered = filtered.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.tags.some((t) => t.toLowerCase().includes(q)) ||
                (p.origin && p.origin.toLowerCase().includes(q)) ||
                (p.flavorNotes && p.flavorNotes.some((n) => n.toLowerCase().includes(q)))
        );
    }

    if (query?.minPrice !== undefined) {
        filtered = filtered.filter((p) => p.price >= query.minPrice!);
    }

    if (query?.maxPrice !== undefined) {
        filtered = filtered.filter((p) => p.price <= query.maxPrice!);
    }

    if (query?.inStock) {
        filtered = filtered.filter((p) => p.inStock);
    }

    // Sort
    switch (query?.sortBy) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'newest':
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
    }

    // Pagination
    const page = query?.page ?? 1;
    const limit = query?.limit ?? 20;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return { data, total, page, limit, totalPages };
}

/**
 * Get mock categories as strings (for API fallback).
 */
export function getMockCategories(): string[] {
    return FLAT_CATEGORIES.map((c) => c.name);
}

/**
 * Get mock featured products (for API fallback).
 */
export function getMockFeaturedProducts(): Product[] {
    return getFeaturedProducts();
}

/**
 * Get a single mock product by ID (for API fallback).
 */
export function getMockProductById(id: string): Product | undefined {
    return allProducts.find((p) => p.id === id);
}

/**
 * Search mock products by query string (for API fallback).
 */
export function searchMockProducts(q: string): Product[] {
    const lower = q.toLowerCase();
    return allProducts.filter(
        (p) =>
            p.name.toLowerCase().includes(lower) ||
            p.description.toLowerCase().includes(lower) ||
            p.tags.some((t) => t.toLowerCase().includes(lower))
    );
}