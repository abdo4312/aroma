import { apiClient } from '@/services/apiClient';
import type { ProductsQuery, PaginatedResponse, Product } from '@/shared/types/product.types';
import { withFallback, filterMockProducts, getMockFeaturedProducts, getMockCategories } from '@/shared/data/fallback';
import { getProductById } from '@/shared/data/products';
import { logApiFallback } from '@/shared/utils/apiLogger';

export const productsApi = {
  async list(query?: ProductsQuery): Promise<PaginatedResponse<Product>> {
    return withFallback(
      async () => {
        const { data } = await apiClient.get<PaginatedResponse<Product>>('/products', {
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
        });
        return data;
      },
      filterMockProducts(query)
    );
  },

  async getById(id: string): Promise<Product | undefined> {
    try {
      const { data } = await apiClient.get<Product>(`/products/${id}`);
      return data;
    } catch (err) {
      logApiFallback('productsApi', 'getById', err);
      return getProductById(id);
    }
  },

  async search(q: string): Promise<Product[]> {
    try {
      const { data } = await apiClient.get<Product[]>('/products/search', { params: { q } });
      return data;
    } catch (err) {
      logApiFallback('productsApi', 'search', err);
      return filterMockProducts({ search: q, limit: 50 }).data;
    }
  },

  async getCategories(): Promise<string[]> {
    try {
      const { data } = await apiClient.get<string[]>('/categories');
      return data;
    } catch (err) {
      logApiFallback('productsApi', 'getCategories', err);
      return getMockCategories();
    }
  },

  async getFeatured(): Promise<Product[]> {
    try {
      const { data } = await apiClient.get<Product[]>('/products/featured');
      return data;
    } catch (err) {
      logApiFallback('productsApi', 'getFeatured', err);
      return getMockFeaturedProducts();
    }
  },
};