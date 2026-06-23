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
          <Loader2 className="w-8 h-8 text-[#8C6239] animate-spin" />
        </div>
      </section>
    );
  }

  if (error || !products.length) return null;

  return (
    <section className="rounded-[1.8rem] border border-white/40 bg-white/20 p-6 shadow-[0_24px_70px_-45px_rgba(72,45,32,0.85)] backdrop-blur-xl md:p-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a46]">best sellers</p>
          <h2 className="mt-2 text-3xl font-bold text-[#3f2518]">Featured Coffee Drops</h2>
        </div>
        <button
          onClick={() => navigate('/shop-beans')}
          className="rounded-lg border border-white/65 bg-white/45 px-4 py-2 text-sm font-semibold text-[#583727] transition hover:bg-white/65 active:scale-95"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            onClick={() => navigate(`/coffee/${product.id}`)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/50 bg-white/30 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_-30px_rgba(86,45,24,0.72)]"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-[#2f1f16]/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f8e7d4] backdrop-blur-md">
                {product.subCategory || product.category}
              </span>
            </div>

            <div className="relative space-y-3 p-5">
              <h3 className="text-lg font-semibold text-[#412619]">{product.name}</h3>
              <p className="text-sm text-[#704f3c]">
                {product.description?.substring(0, 60) || ''}...
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-2xl font-bold text-[#30190f]">{formatCurrency(product.price)}</span>
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={!product.inStock}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 active:scale-90 flex items-center gap-1.5 ${product.inStock
                    ? 'bg-[#5b3623] text-[#fff3e6] hover:bg-[#452919] hover:shadow-[0_12px_24px_-12px_rgba(57,33,22,0.85)]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  <ShoppingCart size={14} />
                  {product.inStock ? 'Add' : 'Sold Out'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}