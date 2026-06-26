import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/useCartStore';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/features/products/product.api';
import type { Product } from '@/shared/types/product.types';
import { Loader2, ShoppingCart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { formatCurrency } from '@/shared/utils/formatCurrency';

/* ───────── Helpers ───────── */

const roastLevelDisplay: Record<string, string> = {
  'light': 'Light Roast',
  'medium': 'Medium Roast',
  'dark': 'Dark Roast',
  'cold-brew': 'Cold Brew',
};

function formatRoastLevel(level?: string): string {
  if (!level) return '';
  return roastLevelDisplay[level] || level;
}

/* ───────── Component ───────── */

export function FeaturedProducts() {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['featured-products'],
    queryFn: productsApi.getFeatured,
    staleTime: 1000 * 60 * 5,
  });

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();

    const image = product.images?.[0] || '';
    const roastLevel = formatRoastLevel(product.roastLevel);

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image,
      roastLevel,
      quantity: 1
    });

    toast.success(`${product.name} added to cart!`);
  };

  if (isLoading) {
    return (
      <section className="rounded-[1.8rem] border border-white/40 bg-white/20 p-6 shadow-[0_24px_70px_-45px_rgba(72,45,32,0.85)] backdrop-blur-xl md:p-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-coffee-500 animate-spin" />
        </div>
      </section>
    );
  }

  if (error || !products.length) return null;

  return (
    <section className="rounded-[1.8rem] border border-white/40 bg-white/20 p-4 sm:p-6 shadow-[0_24px_70px_-45px_rgba(72,45,32,0.85)] backdrop-blur-xl md:p-8">
      {/* ─── Section Header ─── */}
      <div className="mb-4 sm:mb-6 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-coffee-600">
            best sellers
          </p>
          <h2 className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold text-coffee-900 truncate">
            Featured Coffee Drops
          </h2>
        </div>
        <button
          onClick={() => navigate('/shop-beans')}
          className="shrink-0 rounded-lg border border-white/65 bg-white/45 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-semibold text-coffee-700 transition hover:bg-white/65 active:scale-95"
        >
          View All
        </button>
      </div>

      {/* ─── Product Grid ─── */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            onClick={() => navigate(`/coffee/${product.id}`)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-white/50 bg-white/30 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-3 hover:shadow-[0_20px_60px_-20px_rgba(86,45,24,0.6)] sm:hover:shadow-[0_30px_80px_-30px_rgba(86,45,24,0.72)]"
          >
            {/* Image */}
            <div className="relative h-32 sm:h-56 overflow-hidden">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <span className="absolute left-2 top-2 sm:left-4 sm:top-4 rounded-full border border-white/40 bg-coffee-950/55 px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em] text-coffee-100 backdrop-blur-md">
                {product.subCategory || product.category}
              </span>
            </div>

            {/* Card Body */}
            <div className="relative space-y-1.5 sm:space-y-3 p-2.5 sm:p-5">
              <h3 className="text-xs sm:text-lg font-semibold text-coffee-800 line-clamp-1 sm:line-clamp-2">
                {product.name}
              </h3>
              <p className="hidden sm:block text-sm text-coffee-700">
                {product.description?.substring(0, 60) || ''}...
              </p>
              <div className="flex items-center justify-between gap-2 pt-0.5 sm:pt-1">
                <span className="text-sm sm:text-2xl font-bold text-coffee-900">
                  {formatCurrency(product.price)}
                </span>
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={!product.inStock}
                  aria-label={product.inStock ? `Add ${product.name} to cart` : 'Out of stock'}
                  className={`rounded-lg sm:rounded-xl p-1.5 sm:px-4 sm:py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 active:scale-90 flex items-center gap-1 sm:gap-1.5 ${product.inStock
                    ? 'bg-coffee-700 text-coffee-50 hover:bg-coffee-800 hover:shadow-[0_12px_24px_-12px_rgba(57,33,22,0.85)]'
                    : 'bg-coffee-200 text-coffee-400 cursor-not-allowed'
                    }`}
                >
                  <ShoppingCart size={14} />
                  <span className="hidden sm:inline">
                    {product.inStock ? 'Add' : 'Sold Out'}
                  </span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}