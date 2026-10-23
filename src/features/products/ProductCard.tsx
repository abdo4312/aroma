import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/shared/utils/cn';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { Heart, Eye, Plus, Star, Clock, Coffee } from 'lucide-react';
import type { Product } from './product.types';
import { useProductCardActions } from './useProductCardActions';

/* ───────── Types ───────── */

export type ProductCardVariant = 'beans' | 'equipment';

export interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
  className?: string;
}

/* ───────── Variant-Specific Helpers ───────── */

/**
 * Equipment-only display helpers.
 * Kept inside this file so the rest of the app doesn't need to know
 * about equipment-specific UI concerns — only the variant prop.
 */
const difficultyColor: Record<string, string> = {
  beginner: 'bg-emerald-100/80 text-emerald-700',
  intermediate: 'bg-amber-100/80 text-amber-700',
  advanced: 'bg-rose-100/80 text-rose-700',
};

const difficultyLabel: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const equipmentCategoryDisplayNames: Record<string, string> = {
  stovetop: 'Stovetop',
  immersion: 'Immersion',
  'pour-over': 'Pour Over',
  pressure: 'Pressure',
  'cold-brew-maker': 'Cold Brew',
  grinders: 'Grinders',
  kettles: 'Kettles',
  accessories: 'Accessories',
  'brewing-tools': 'Brewing Tools',
};

function getEquipmentCategoryLabel(product: Product): string {
  return (
    equipmentCategoryDisplayNames[product.subCategory || product.category] ||
    product.subCategory ||
    product.category
  );
}

/* ───────── Component ───────── */

export function ProductCard({
  product,
  variant = 'beans',
  className,
}: ProductCardProps) {
  const {
    isWishlisted,
    discount,
    secondImage,
    roastLevel,
    handleAddToCart,
    toggleWishlist,
    handleQuickView,
  } = useProductCardActions(product);

  const [imageError, setImageError] = useState(false);
  const isEquipment = variant === 'equipment';

  // Category label: differs between variants.
  // - beans: uses roastLevel tag (e.g. "Light Roast")
  // - equipment: uses the friendly equipment category name (e.g. "Pour Over")
  const categoryLabel = isEquipment
    ? getEquipmentCategoryLabel(product)
    : (roastLevel ?? product.category);

  return (
    <article
      className={cn(
        'group relative bg-white/95 backdrop-blur-2xl rounded-3xl overflow-hidden',
        'border border-white/60 shadow-xl hover:shadow-2xl hover:-translate-y-4',
        'transition-all duration-500 ease-out hover:border-coffee-500/30',
        className
      )}
    >
      {/* ── Image Section ── */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Link to={`/coffee/${product.id}`} className="block h-full">
          {!imageError ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center bg-gradient-to-br from-coffee-100 to-coffee-200 text-coffee-500"
              aria-hidden="true"
            >
              <Coffee size={48} strokeWidth={1.5} />
            </div>
          )}
          {secondImage && (
            <img
              src={secondImage}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 group-hover:to-black/40 transition-all duration-500"
            aria-hidden="true"
          />
        </Link>

        {/* Category Badge — equipment only, top-left over the image */}
        {isEquipment && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-coffee-700 text-white text-[10px] font-bold uppercase tracking-[1px]">
            {categoryLabel}
          </div>
        )}

        {/* Discount Badge */}
        {discount && (
          <div
            className={cn(
              'absolute bg-white/90 backdrop-blur-xl text-red-600 text-xs font-bold rounded-2xl shadow-lg border border-white/70',
              // Equipment has a category badge on top-left, so push the discount down.
              // Beans has nothing there, so it sits at the very top.
              isEquipment ? 'top-14 left-4 px-4 py-1' : 'top-4 left-4 px-4 py-1'
            )}
          >
            -{discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/70 text-neutral-700 hover:text-red-500 active:scale-95 transition-all duration-200 shadow-md hover:shadow-xl"
          aria-label="Add to Wishlist"
        >
          <Heart
            className={cn(
              'w-5 h-5 transition-all duration-300',
              isWishlisted
                ? 'fill-red-500 text-red-500 scale-110'
                : 'hover:scale-110'
            )}
          />
        </button>

        {/* Quick View Button */}
        <button
          onClick={handleQuickView}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white/95 hover:bg-white backdrop-blur-2xl px-7 py-3 rounded-2xl text-sm font-semibold text-neutral-900 shadow-2xl border border-white/70 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-300"
        >
          <Eye className="w-4 h-4" />
          Fast View
        </button>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center">
            <span className="text-white font-bold text-2xl tracking-widest drop-shadow-lg uppercase">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* ── Details Section ── */}
      <div className="p-6">
        {/* Top row: category label + stars */}
        <div className="flex items-center justify-between mb-3">
          <span className="uppercase text-[10px] font-bold tracking-[1px] text-coffee-500">
            {categoryLabel}
          </span>
          <div className="flex items-center gap-px">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-3.5 h-3.5',
                  i < Math.floor(product.rating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-neutral-200'
                )}
              />
            ))}
            <span className="text-[10px] text-neutral-400 ml-1.5 font-bold">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-[17px] leading-tight line-clamp-2 text-coffee-900 mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* ── Equipment-only: Difficulty Badge ── */}
        {isEquipment && product.difficulty && (
          <div className="mb-3">
            <span
              className={cn(
                'text-[10px] font-bold px-2.5 py-1 rounded-lg',
                difficultyColor[product.difficulty]
              )}
            >
              {difficultyLabel[product.difficulty] || product.difficulty}
            </span>
          </div>
        )}

        {/* ── Equipment-only: Brew Time ── */}
        {isEquipment && product.brewTime && (
          <div className="flex items-center gap-1.5 text-coffee-600/60 text-xs mb-3">
            <Clock size={13} aria-hidden="true" />
            <span>{product.brewTime}</span>
          </div>
        )}

        {/* ── Equipment-only: Features Preview ── */}
        {isEquipment && product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.features.slice(0, 3).map((f: string) => (
              <span
                key={f}
                className="px-2 py-0.5 bg-coffee-500/10 text-coffee-600 text-[10px] rounded-md border border-coffee-500/15"
              >
                {f}
              </span>
            ))}
          </div>
        )}

        {/* ── Bottom: Price + Add to Cart ── */}
        <div
          className={cn(
            'flex items-center justify-between pt-3 border-t border-coffee-500/10',
            // Beans: simple spacing (mb-5 already on h3).
            // Equipment: needs top margin because of the extra metadata block.
            !isEquipment && 'mt-3'
          )}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-coffee-900">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through font-medium">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={cn(
              'w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-300 active:scale-95',
              product.inStock
                ? 'bg-coffee-700 hover:bg-coffee-800 hover:scale-110 shadow-coffee-700/20'
                : 'bg-neutral-200 cursor-not-allowed text-neutral-400'
            )}
            aria-label="Add to Cart"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </article>
  );
}