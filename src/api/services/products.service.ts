import { apiClient } from '@/services/apiClient';
import { ENDPOINTS } from '@/api/endpoints';
import {
    filterMockProducts,
    getMockProductById,
    searchMockProducts,
    getMockFeaturedProducts,
    getMockCategories,
} from '@/shared/data/fallback';
import type {
    Product,
    ProductsQuery,
    PaginatedResponse,
} from '@/shared/types/product.types';
import { logApiFallback } from '@/shared/utils/apiLogger';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';


async function apiGetAll(
    query?: ProductsQuery
): Promise<PaginatedResponse<Product>> {
    const { data } = await apiClient.get<PaginatedResponse<Product>>(
        ENDPOINTS.PRODUCTS.ALL,
        {
            params: {
                page: query?.page,
                limit: query?.limit,
                category: query?.category,
                subCategory: query?.subCategory,
                type: query?.productType,
                q: query?.search,
                roastLevel: query?.roastLevel,
                origin: query?.origin,
                sort: query?.sortBy,
                minPrice: query?.minPrice,
                maxPrice: query?.maxPrice,
                inStock: query?.inStock,
            },
        }
    );
    return data;
}

async function apiGetById(id: string): Promise<Product> {
    const { data } = await apiClient.get<Product>(
        ENDPOINTS.PRODUCTS.BY_ID(id)
    );
    return data;
}

async function apiGetFeatured(): Promise<Product[]> {
    const { data } = await apiClient.get<Product[]>(
        ENDPOINTS.PRODUCTS.FEATURED
    );
    return data;
}

async function apiSearch(q: string): Promise<Product[]> {
    const { data } = await apiClient.get<Product[]>(
        ENDPOINTS.PRODUCTS.SEARCH,
        { params: { q } }
    );
    return data;
}

async function apiGetCategories(): Promise<string[]> {
    const { data } = await apiClient.get<string[]>('/categories');
    return data;
}


export const productsService = {
    getAll: USE_MOCK
        ? (query?: ProductsQuery) =>
            Promise.resolve(filterMockProducts(query))
        : async (query?: ProductsQuery) => {
            try {
                return await apiGetAll(query);
            } catch (err) {
                logApiFallback('products', 'getAll', err);
                return filterMockProducts(query);
            }
        },

    getById: USE_MOCK
        ? (id: string) => {
            const product = getMockProductById(id);
            if (!product) throw new Error('Product not found');
            return Promise.resolve(product);
        }
        : async (id: string) => {
            try {
                return await apiGetById(id);
            } catch (err) {
                logApiFallback('products', 'getById', err);
                const product = getMockProductById(id);
                if (!product) throw new Error('Product not found');
                return product;
            }
        },

    getFeatured: USE_MOCK
        ? () => Promise.resolve(getMockFeaturedProducts())
        : async () => {
            try {
                return await apiGetFeatured();
            } catch (err) {
                logApiFallback('products', 'getFeatured', err);
                return getMockFeaturedProducts();
            }
        },

    search: USE_MOCK
        ? (q: string) => Promise.resolve(searchMockProducts(q))
        : async (q: string) => {
            try {
                return await apiSearch(q);
            } catch (err) {
                logApiFallback('products', 'search', err);
                return searchMockProducts(q);
            }
        },

    getCategories: USE_MOCK
        ? () => Promise.resolve(getMockCategories())
        : async () => {
            try {
                return await apiGetCategories();
            } catch (err) {
                logApiFallback('products', 'getCategories', err);
                return getMockCategories();
            }
        },
};