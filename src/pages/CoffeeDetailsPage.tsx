import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/features/products/product.api';
import type { Product } from '@/shared/types/product.types';
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Coffee,
  Leaf,
  Zap,
  Clock,
  Loader2,
  AlertTriangle,
  MapPin,
  Minus,
  Plus,
  Heart,
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
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
  if (!level) return 'Specialty';
  return roastLevelDisplay[level] || level;
}

/* ───────── Component ───────── */

export function CoffeeDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('250g');
  const [imageError, setImageError] = useState(false);

  // Fetch product data
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const result = await productsApi.getById(id!);
      if (!result) throw new Error('Product not found');
      return result;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  /* ─── Loading ─── */
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center space-y-4" role="status">
          <Loader2 className="w-12 h-12 text-[#8C6239] animate-spin mx-auto" aria-hidden="true" />
          <p className="text-[#6B4423]/70 font-medium">Loading product details...</p>
        </div>
      </main>
    );
  }

  /* ─── Error ─── */
  if (error || !product) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 pb-24 md:pb-12">
        <div className="text-center space-y-4 max-w-md bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white" role="alert">
          <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto" aria-hidden="true" />
          <h2 className="text-xl font-bold text-[#4A3B32]">Oops! Product not found</h2>
          <p className="text-[#6B4423]/70 font-medium">The coffee beans you are looking for might have been moved or are out of stock.</p>
          <button
            onClick={() => navigate('/shop-beans')}
            className="px-8 py-3 rounded-xl bg-[#4A3B32] text-white font-bold hover:bg-[#8C6239] transition-all shadow-lg"
            aria-label="Back to shop beans page"
          >
            Back to Shop
          </button>
        </div>
      </main>
    );
  }

  /* ─── Product data ─── */
  const productImage = product.images?.[0] || '';
  const productNotes = product.flavorNotes || [];
  const roastLevel = formatRoastLevel(product.roastLevel);
  const productOrigin = product.origin || '';
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (product.inStock) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: productImage,
        roastLevel: roastLevel,
        quantity,
      });
      toast.success(`Added ${quantity} ${product.name} to your cart!`);
    }
  };

  const handleToggleWishlist = () => {
    toggleItem(product.id);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const totalPrice = product.price * quantity;

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] pb-32 md:pb-12">

      {/* ─── Hero Image (mobile: full-width, desktop: side-by-side) ─── */}
      <div className="relative w-full aspect-square md:aspect-[4/5] md:max-w-xl md:mx-auto md:rounded-b-[3rem] md:overflow-hidden md:border-8 md:border-white/50 md:shadow-2xl">
        {!imageError ? (
          <img
            src={productImage}
            alt={`${product.name} — ${roastLevel} from ${productOrigin || 'specialty origin'}`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f9e8d8] to-[#efdac7] text-[#8C6239]"
            aria-hidden="true"
          >
            <Coffee size={64} strokeWidth={1.5} />
          </div>
        )}

        {/* Gradient overlay at bottom for text legibility */}
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/30 to-transparent md:hidden" aria-hidden="true" />

        {/* Top nav overlay (back + wishlist) */}
        <header className="absolute top-0 left-0 right-0 z-10 px-4 py-3 flex justify-between items-center pt-[env(safe-area-inset-top,12px)]">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#4A3B32] shadow-sm active:scale-95 transition-transform"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={handleToggleWishlist}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#4A3B32] shadow-sm active:scale-95 transition-transform group"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={isWishlisted}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'group-hover:text-red-500'}`}
              aria-hidden="true"
            />
          </button>
        </header>

        {/* Rating badge */}
        <div
          className="absolute top-16 right-4 z-10 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm md:top-20 md:right-8"
          role="img"
          aria-label={`Rated ${product.rating} out of 5 stars`}
        >
          <Star size={14} className="fill-amber-400 text-amber-400" aria-hidden="true" />
          <span className="text-xs font-bold text-[#4A3B32]">{product.rating}</span>
          <span className="text-[10px] text-[#6B4423]/60">({product.reviewCount || 0})</span>
        </div>
      </div>

      {/* ─── Product Info Section ─── */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-6 md:py-8">

        {/* Roast + Name */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#8C6239] block mb-1">
              {roastLevel}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-[#4A3B32] leading-tight">{product.name}</h1>
          </div>
          <div className="text-right shrink-0">
            <div className="text-2xl font-black text-[#4A3B32]">{formatCurrency(product.price)}</div>
            {product.originalPrice && (
              <div className="text-sm text-[#6B4423]/40 line-through font-medium">{formatCurrency(product.originalPrice)}</div>
            )}
          </div>
        </div>

        {/* Origin + Subcategory chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.subCategory && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#8C6239]/10 text-[#6B4423] text-[11px] font-bold uppercase tracking-wide">
              <Leaf size={12} className="text-emerald-600" aria-hidden="true" />
              {product.subCategory}
            </span>
          )}
          {productOrigin && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#8C6239]/10 text-[#6B4423] text-[11px] font-bold uppercase tracking-wide">
              <MapPin size={12} className="text-[#8C6239]" aria-hidden="true" />
              {productOrigin}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-[#6B4423]/90 leading-relaxed mb-5">
          {product.description}
        </p>

        {/* Flavor Notes */}
        {productNotes.length > 0 && (
          <section className="mb-5" aria-labelledby="flavor-notes-heading">
            <h2 id="flavor-notes-heading" className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a5a46] mb-2">Flavor Notes</h2>
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
              {productNotes.map((note) => (
                <li
                  key={note}
                  className="px-3 py-1.5 rounded-xl bg-white/60 backdrop-blur-sm border border-white/50 text-[#4A3B32] text-xs font-bold"
                >
                  #{note}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Size Selector */}
        <fieldset className="mb-5 border-0 p-0 m-0">
          <legend className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a5a46] mb-2">Choose Size</legend>
          <div className="flex gap-2" role="radiogroup" aria-label="Coffee size">
            {['250g', '500g', '1kg'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                role="radio"
                aria-checked={selectedSize === size}
                aria-label={`Select size ${size}`}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${selectedSize === size
                    ? 'bg-[#4A3B32] text-white shadow-lg'
                    : 'bg-white/60 text-[#4A3B32] hover:bg-white border border-white/50'
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Feature highlights */}
        <ul className="grid grid-cols-3 gap-3 pt-4 border-t border-[#8C6239]/10 list-none p-0 m-0" aria-label="Product highlights">
          {[
            { icon: Zap, label: "High Energy" },
            { icon: Clock, label: "Fresh Roast" },
            { icon: Coffee, label: "100% Arabica" }
          ].map((item, idx) => (
            <li key={idx} className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm border border-white/50" aria-hidden="true">
                <item.icon size={18} className="text-[#8C6239]" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B4423]/60 text-center">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ─── Sticky Bottom Action Bar (mobile) ─── */}
      <div
        className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#8C6239]/15 shadow-[0_-8px_24px_-12px_rgba(72,45,32,0.2)]"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="px-4 py-3 flex items-center gap-3">
          {/* Quantity Stepper */}
          <div
            className="flex items-center bg-[#FAF7F2] rounded-full px-1 py-1 border border-[#8C6239]/15 shrink-0"
            role="group"
            aria-label="Quantity selector"
          >
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#4A3B32] hover:bg-white active:scale-95 transition-all disabled:opacity-40"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <span
              className="w-7 text-center font-bold text-base text-[#4A3B32]"
              role="status"
              aria-live="polite"
              aria-label={`Quantity ${quantity}`}
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#4A3B32] hover:bg-white active:scale-95 transition-all"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={product.inStock ? `Add ${quantity} ${product.name} to cart` : 'Out of stock'}
            className={`flex-1 h-12 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${product.inStock
                ? 'bg-[#4A3B32] text-white hover:bg-[#5F3A26]'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
          >
            <ShoppingCart size={18} aria-hidden="true" />
            {product.inStock ? `Add — ${formatCurrency(totalPrice)}` : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* ─── Desktop Add to Cart (inline, not sticky) ─── */}
      <div className="hidden md:block max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center bg-white/80 backdrop-blur-md rounded-2xl border border-white p-1 shadow-sm"
            role="group"
            aria-label="Quantity selector"
          >
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 flex items-center justify-center font-black text-xl hover:bg-[#FAF7F2] rounded-xl transition-colors text-[#4A3B32]"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
            >
              <Minus className="h-5 w-5" aria-hidden="true" />
            </button>
            <span
              className="w-10 text-center font-black text-xl text-[#4A3B32]"
              role="status"
              aria-live="polite"
              aria-label={`Quantity ${quantity}`}
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 flex items-center justify-center font-black text-xl hover:bg-[#FAF7F2] rounded-xl transition-colors text-[#4A3B32]"
              aria-label="Increase quantity"
            >
              <Plus className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={product.inStock ? `Add ${quantity} ${product.name} to cart` : 'Out of stock'}
            className={`flex-1 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl active:scale-95 ${product.inStock
                ? 'bg-[#4A3B32] text-white hover:bg-[#5F3A26]'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
          >
            <ShoppingCart size={22} aria-hidden="true" />
            {product.inStock ? `Add to Cart — ${formatCurrency(totalPrice)}` : 'Out of Stock'}
          </button>
        </div>
      </div>
    </main>
  );
}