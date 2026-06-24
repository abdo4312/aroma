import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/features/products/product.api';
import type { Product } from '@/shared/types/product.types';
import { ArrowLeft, Star, ShoppingCart, Coffee, Loader2, AlertTriangle, MapPin, Heart, Share2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'react-hot-toast';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { cn } from '@/shared/utils/cn';

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

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('250g');
  const [imageError, setImageError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch product data from API with fallback
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-[#8C6239] animate-spin mx-auto" aria-hidden="true" />
          <p className="text-[#6B4423]/70 font-medium" role="status">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white">
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
      </div>
    );
  }

  // Direct field access from unified Product type
  const productImage = product.images?.[0] || '';
  const productNotes = product.flavorNotes || [];
  const roastLevel = formatRoastLevel(product.roastLevel);
  const productOrigin = product.origin || '';

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

  return (
    <div className="min-h-screen bg-white relative font-sans pb-32">
      {/* ═════════ TOP NAVIGATION OVERLAY ═════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 pointer-events-none">
        <button
          onClick={() => navigate(-1)}
          className="p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg text-[#4A3B32] pointer-events-auto active:scale-95 transition-all"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex gap-3 pointer-events-auto">
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success('Link copied to clipboard!');
            }}
            className="p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg text-[#4A3B32] active:scale-95 transition-all"
            aria-label="Share"
          >
            <Share2 size={24} />
          </button>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg text-[#4A3B32] active:scale-95 transition-all"
            aria-label="Wishlist"
          >
            <Heart size={24} className={cn(isWishlisted && "fill-rose-500 text-rose-500")} />
          </button>
        </div>
      </nav>

      {/* ═════════ HERO IMAGE SECTION ═════════ */}
      <section className="relative w-full aspect-square md:aspect-[16/9] md:max-h-[60vh] overflow-hidden rounded-b-[3.5rem] shadow-2xl shadow-coffee-900/10">
        {!imageError ? (
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-full object-cover transform scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-coffee-100 text-coffee-500">
            <Coffee size={64} strokeWidth={1.5} />
          </div>
        )}
        {/* Rating Badge Overlay */}
        <div className="absolute bottom-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md shadow-lg border border-white/50">
          <Star size={16} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-[#4A3B32]">{product.rating}</span>
        </div>
      </section>

      {/* ═════════ CONTENT SECTION ═════════ */}
      <div className="px-6 py-8 md:max-w-4xl md:mx-auto">
        {/* Title & Metadata */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-coffee-50 text-coffee-700 text-[10px] font-black uppercase tracking-widest border border-coffee-100">
              {roastLevel}
            </span>
            {productOrigin && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-coffee-600">
                <MapPin size={14} />
                {productOrigin}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#4A3B32] leading-tight mb-2">
            {product.name}
          </h1>
          <div className="flex items-center gap-4 text-2xl font-black text-coffee-700">
            {formatCurrency(product.price)}
          </div>
        </div>

        {/* Description */}
        <div className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-widest text-coffee-400 mb-3">About this coffee</h3>
          <p className="text-lg text-coffee-900/80 leading-relaxed font-medium">
            {product.description}
          </p>
        </div>

        {/* Flavor Notes */}
        {productNotes.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xs font-black uppercase tracking-widest text-coffee-400 mb-4">Flavor Profile</h3>
            <div className="flex flex-wrap gap-2">
              {productNotes.map((note) => (
                <span key={note} className="px-4 py-2 rounded-2xl bg-coffee-50 text-coffee-800 text-xs font-bold border border-coffee-100">
                  {note}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Size Selection */}
        <div className="mb-12">
          <h3 className="text-xs font-black uppercase tracking-widest text-coffee-400 mb-4">Choose Bag Size</h3>
          <div className="flex gap-3">
            {['250g', '500g', '1kg'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "flex-1 py-4 rounded-2xl text-sm font-black transition-all",
                  selectedSize === size
                    ? "bg-coffee-900 text-white shadow-xl shadow-coffee-900/20 scale-[1.02]"
                    : "bg-coffee-50 text-coffee-600 hover:bg-white border border-coffee-100"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═════════ STICKY BOTTOM ACTION BAR ═════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-coffee-100 p-4 pb-safe md:px-12">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-coffee-50 rounded-2xl p-1 border border-coffee-100">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center text-xl font-black text-coffee-900 disabled:opacity-30"
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="w-8 text-center font-black text-lg text-coffee-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center text-xl font-black text-coffee-900"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={cn(
              "flex-1 py-4 rounded-[1.5rem] font-black text-lg flex items-center justify-between px-6 transition-all shadow-2xl active:scale-[0.98]",
              product.inStock
                ? "bg-coffee-900 text-white shadow-coffee-900/30"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
            )}
          >
            <div className="flex items-center gap-2">
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </div>
            <span className="text-coffee-300 font-bold">
              {formatCurrency(product.price * quantity)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
