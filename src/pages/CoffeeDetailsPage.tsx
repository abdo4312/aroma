import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/features/products/product.api';
import type { Product } from '@/shared/types/product.types';
import { ArrowLeft, Star, ShoppingCart, Coffee, Leaf, Zap, Clock, Loader2, AlertTriangle, MapPin } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
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

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('250g');
  const [imageError, setImageError] = useState(false);

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
    <div className="min-h-screen bg-[#FAF7F2] relative overflow-hidden font-sans pb-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed left-6 top-24 z-50 p-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl text-[#4A3B32] hover:bg-[#4A3B32] hover:text-white transition-all duration-300 group"
        aria-label="Go back to previous page"
      >
        <ArrowLeft size={28} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
      </button>

      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#D4B895]/10 rounded-full blur-[100px] -z-10" aria-hidden="true" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Product Image Section */}
          <div className="relative group">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/50">
              {!imageError ? (
                <img
                  src={productImage}
                  alt={`${product.name} — ${roastLevel} from ${productOrigin || 'specialty origin'}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
            </div>
            <div
              className="absolute -top-4 -right-4 bg-[#8C6239] text-white px-6 py-3 rounded-2xl font-black shadow-lg flex items-center gap-2"
              role="img"
              aria-label={`Rated ${product.rating} out of 5 stars`}
            >
              <Star size={18} className="fill-current text-amber-400" aria-hidden="true" />
              {product.rating}
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-[#8C6239] font-black tracking-[0.2em] uppercase text-xs">
                {roastLevel}
              </span>
              <h1 className="text-5xl font-black text-[#4A3B32] leading-tight">{product.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                {product.subCategory && (
                  <p className="text-[#6B4423]/60 flex items-center gap-2 font-bold text-sm bg-white/40 w-fit px-3 py-1 rounded-full border border-white/60">
                    <Leaf size={16} className="text-emerald-600" aria-hidden="true" /> {product.subCategory}
                  </p>
                )}
                {productOrigin && (
                  <p className="text-[#6B4423]/60 flex items-center gap-2 font-bold text-sm bg-white/40 w-fit px-3 py-1 rounded-full border border-white/60">
                    <MapPin size={16} className="text-[#8C6239]" aria-hidden="true" /> {productOrigin}
                  </p>
                )}
              </div>
            </div>

            <p className="text-lg text-[#6B4423]/80 leading-relaxed max-w-xl font-medium">
              {product.description}
            </p>

            {/* Flavor Notes */}
            {productNotes.length > 0 && (
              <ul className="flex gap-3 flex-wrap list-none p-0" aria-label="Flavor notes">
                {productNotes.map((note) => (
                  <li key={note} className="px-5 py-2 rounded-2xl bg-[#8C6239]/5 border border-[#8C6239]/10 text-[#4A3B32] text-xs font-black uppercase tracking-wider">
                    # {note}
                  </li>
                ))}
              </ul>
            )}

            {/* Selection - Size */}
            <fieldset className="space-y-4 border-0 p-0 m-0">
              <legend className="font-black text-[#4A3B32] text-sm uppercase tracking-widest mb-3">Choose Size:</legend>
              <div className="flex gap-3" role="radiogroup" aria-label="Coffee size">
                {['250g', '500g', '1kg'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    role="radio"
                    aria-checked={selectedSize === size}
                    aria-label={`Select size ${size}`}
                    className={`px-8 py-3 rounded-2xl font-black text-sm transition-all duration-300 ${selectedSize === size
                      ? 'bg-[#4A3B32] text-white shadow-xl scale-105 shadow-[#4a3b32]/20'
                      : 'bg-white/60 text-[#4A3B32] hover:bg-white border border-white'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>

            <hr className="border-[#6B4423]/10" aria-hidden="true" />

            {/* Price & Action */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-1 w-full sm:w-auto">
                <span className="text-[10px] font-black text-[#6B4423]/40 uppercase tracking-widest block mb-1">Total Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-[#4A3B32] tracking-tighter">
                    {formatCurrency(product.price * quantity)}
                  </span>
                </div>
              </div>

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
                  <span aria-hidden="true">−</span>
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
                  <span aria-hidden="true">+</span>
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                aria-label={product.inStock ? `Add ${quantity} ${product.name} to cart` : 'Out of stock'}
                className={`flex-[2] w-full sm:w-auto py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl active:scale-95 group ${product.inStock
                  ? 'bg-[#4A3B32] text-white hover:bg-[#5F3A26] shadow-[#4A3B32]/30'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none'
                  }`}
              >
                <ShoppingCart size={22} className={product.inStock ? 'group-hover:translate-x-1 transition-transform' : ''} aria-hidden="true" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            {/* Feature Icons */}
            <ul className="grid grid-cols-3 gap-6 pt-6 border-t border-[#6B4423]/5 list-none p-0 m-0" aria-label="Product highlights">
              {[
                { icon: Zap, label: "High Energy" },
                { icon: Clock, label: "Fresh Roast" },
                { icon: Coffee, label: "100% Arabica" }
              ].map((item, idx) => (
                <li key={idx} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-[#8C6239] transition-colors duration-500" aria-hidden="true">
                    <item.icon size={20} className="text-[#8C6239] group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#6B4423]/50">{item.label}</span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
}