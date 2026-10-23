import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { productsService } from '@/api/services/products.service';
import type {
  ProductsQuery,
  PaginatedResponse,
  Product,
} from '@/shared/types/product.types';


type ProductsQueryResult = UseQueryResult<PaginatedResponse<Product>, Error>;

export function useProducts() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query: ProductsQuery = {
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 12,
    category: searchParams.get('category') ?? undefined,
    subCategory: searchParams.get('subCategory') ?? undefined,
    productType: (searchParams.get('type') as ProductsQuery['productType']) ?? undefined,
    search: searchParams.get('search') ?? undefined,
    sortBy: (searchParams.get('sort') as ProductsQuery['sortBy']) ?? undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    roastLevel: (searchParams.get('roastLevel') as ProductsQuery['roastLevel']) ?? undefined,
    origin: searchParams.get('origin') ?? undefined,
    inStock: searchParams.get('inStock') === 'true' ? true : undefined,
  };

  // Explicit return-type annotation; PaginatedResponse<Product> appears as a concrete type above
  const result: ProductsQueryResult = useQuery({
    queryKey: ['products', query],
    queryFn: () => productsService.getAll(query),
    staleTime: 1000 * 60 * 5,
  });

  const paginationItems = result.data?.data ?? [];

  const setFilter = (
    key: keyof ProductsQuery | 'q' | 'sort',
    value: string | number | boolean | null
  ) => {
    setSearchParams((prev: URLSearchParams) => {
      const next = new URLSearchParams(prev);
      if (value === null || value === undefined || value === '') {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
      if (key !== 'page') {
        next.delete('page');
      }
      return next;
    });
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return {
    products: paginationItems, // Product[] — directly derived from PaginatedResponse<Product>.data
    pagination: {
      total: result.data?.total ?? 0,       // from PaginatedResponse.total
      page: result.data?.page ?? 1,         // from PaginatedResponse.page
      totalPages: result.data?.totalPages ?? 1, // from PaginatedResponse.totalPages
      limit: result.data?.limit ?? 12,      // from PaginatedResponse.limit
    },
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    error: result.error,
    query,
    setFilter,
    clearFilters,
  };
}
