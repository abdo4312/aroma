import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  ChevronRight,
  Truck,
  ShieldCheck,
  RefreshCw,
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
      <main className="min-h-screen bg-gradient-to-br from-coffee-50 via-coffee-100 to-coffee-50 flex items-center justify-center">
        <div className="text-center space-y-4" role="status">
          <Loader2 className="w-12 h-12 text-coffee-500 animate-spin mx-auto" aria-hidden="true" />
          <p className="text-coffee-700/70 font-medium">Loading product details...</p>
        </div>
      </main>
    );
  }

  /* ─── Error ─── */
  if (error || !product) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-coffee-50 via-coffee-100 to-coffee-50 flex items-center justify-center p-4 pb-24 md:pb-12">
        <div
          className="text-center space-y-4 max-w-md bg-white/40 backdrop-blur-2xl border border-white/60 p-8 rounded-[2rem] shadow-2xl"
          role="alert"
        >
          <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto" aria-hidden="true" />
          <h2 className="text-xl font-bold text-coffee-800">Oops! Product not found</h2>
          <p className="text-coffee-700/70 font-medium">
            The coffee beans you are looking for might have been moved or are out of stock.
          </p>
          <button
            onClick={() => navigate('/shop-beans')}
            className="px-8 py-3 rounded-xl bg-coffee-800 text-white font-bold hover:bg-coffee-500 transition-all shadow-lg"
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
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

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
    <main className="relative min-h-screen bg-gradient-to-br from-coffee-50 via-coffee-100/60 to-coffee-50 pb-32 md:pb-16 overflow-hidden">

      {/* ─── Decorative Glassmorphism Background Orbs ─── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-coffee-200/50 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-[26rem] h-[26rem] bg-coffee-300/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-coffee-100/60 rounded-full blur-3xl" />
      </div>

      {/* ─── Desktop Breadcrumb ─── */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 pt-8 pb-2 relative z-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-medium text-coffee-600"
        >
          <Link to="/" className="hover:text-coffee-800 transition-colors">Home</Link>
          <ChevronRight size={14} className="text-coffee-400" aria-hidden="true" />
          <Link to="/shop-beans" className="hover:text-coffee-800 transition-colors">Beans</Link>
          <ChevronRight size={14} className="text-coffee-400" aria-hidden="true" />
          <span className="text-coffee-900 font-bold truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* ─── Two-column layout (desktop) / stacked (mobile) ─── */}
      <div className="relative z-10 md:max-w-7xl md:mx-auto md:px-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16">

        {/* ═══ LEFT: Image Column ═══ */}
        <div className="md:sticky md:top-28 md:self-start md:pb-8">
          <div className="relative w-full aspect-square md:aspect-[4/5] md:rounded-[2rem] md:overflow-hidden md:border-8 md:border-white/60 md:shadow-2xl md:backdrop-blur-2xl">
            {!imageError ? (
              <img
                src={productImage}
                alt={`${product.name} — ${roastLevel} from ${productOrigin || 'specialty origin'}`}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center bg-gradient-to-br from-coffee-100 to-coffee-200 text-coffee-500"
                aria-hidden="true"
              >
                <Coffee size={64} strokeWidth={1.5} />
              </div>
            )}

            {/* Discount badge */}
            {discount > 0 && (
              <div
                className="absolute top-4 left-4 z-10 md:top-6 md:left-6 bg-coffee-800/90 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg border border-white/20"
                aria-label={`Save ${discount}% off`}
              >
                −{discount}%
              </div>
            )}

            {/* Mobile-only overlay nav */}
            <header className="md:hidden absolute top-0 left-0 right-0 z-10 px-4 py-3 flex justify-between items-center pt-[env(safe-area-inset-top,12px)]">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-coffee-800 shadow-sm active:scale-95 transition-transform border border-white/60"
                aria-label="Go back to previous page"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={handleToggleWishlist}
                className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-coffee-800 shadow-sm active:scale-95 transition-transform border border-white/60 group"
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
              className="absolute top-16 right-4 z-10 md:top-auto md:bottom-6 md:right-6 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md border border-white/60"
              role="img"
              aria-label={`Rated ${product.rating} out of 5 stars`}
            >
              <Star size={14} className="fill-amber-400 text-amber-400" aria-hidden="true" />
              <span className="text-xs font-bold text-coffee-800">{product.rating}</span>
              <span className="text-[10px] text-coffee-700/60">({product.reviewCount || 0})</span>
            </div>
          </div>

          {/* Desktop thumbnail strip in glass pill */}
          <div className="hidden md:flex gap-3 mt-4 justify-center">
            <button
              className="w-20 h-20 rounded-xl overflow-hidden border-2 border-coffee-500 shadow-md bg-white/40 backdrop-blur-xl"
              aria-label="Viewing main image"
              aria-current="true"
            >
              <img src={productImage} alt="" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        {/* ═══ RIGHT: Product Info Column ═══ */}
        <div className="px-4 py-6 md:py-0 md:px-0">

          {/* ── Desktop: Big Glass Panel ── */}
          <div className="hidden md:block bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2rem] shadow-2xl p-8 lg:p-10 space-y-6">

            {/* Roast + rating + stock row */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coffee-500/10 text-coffee-700 text-xs font-black uppercase tracking-wider border border-coffee-500/20">
                <Coffee size={12} aria-hidden="true" />
                {roastLevel}
              </span>
              <div className="flex items-center gap-1 text-coffee-700">
                <Star size={16} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                <span className="text-sm font-bold">{product.rating}</span>
                <span className="text-xs text-coffee-700/60">({product.reviewCount || 0} reviews)</span>
              </div>
              {product.inStock ? (
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100/70 text-emerald-700 text-[11px] font-bold uppercase tracking-wide border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  In Stock
                </span>
              ) : (
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100/70 text-rose-700 text-[11px] font-bold uppercase tracking-wide border border-rose-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" aria-hidden="true" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Product name */}
            <h1 className="text-4xl lg:text-5xl font-black text-coffee-800 leading-[1.1] tracking-tight">
              {product.name}
            </h1>

            {/* Price row */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-coffee-800">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-coffee-700/40 line-through font-medium">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="ml-auto text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200/60">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {product.subCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/60 text-coffee-700 text-[11px] font-bold uppercase tracking-wide border border-white/80">
                  <Leaf size={12} className="text-emerald-600" aria-hidden="true" />
                  {product.subCategory}
                </span>
              )}
              {productOrigin && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/60 text-coffee-700 text-[11px] font-bold uppercase tracking-wide border border-white/80">
                  <MapPin size={12} className="text-coffee-500" aria-hidden="true" />
                  {productOrigin}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-base text-coffee-700/90 leading-relaxed">
              {product.description}
            </p>

            {/* Flavor Notes */}
            {productNotes.length > 0 && (
              <section aria-labelledby="flavor-notes-heading">
                <h2
                  id="flavor-notes-heading"
                  className="text-xs font-bold uppercase tracking-[0.18em] text-coffee-600 mb-2.5"
                >
                  Flavor Notes
                </h2>
                <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                  {productNotes.map((note) => (
                    <li
                      key={note}
                      className="px-3.5 py-1.5 rounded-xl bg-white/70 text-coffee-800 text-xs font-bold shadow-sm border border-white/80"
                    >
                      #{note}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Size Selector */}
            <fieldset className="border-0 p-0 m-0">
              <legend className="text-xs font-bold uppercase tracking-[0.18em] text-coffee-600 mb-2.5">
                Choose Size
              </legend>
              <div className="flex gap-2" role="radiogroup" aria-label="Coffee size">
                {['250g', '500g', '1kg'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    role="radio"
                    aria-checked={selectedSize === size}
                    aria-label={`Select size ${size}`}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${selectedSize === size
                      ? 'bg-coffee-800 text-white shadow-lg shadow-coffee-900/20 border border-coffee-800'
                      : 'bg-white/60 text-coffee-800 hover:bg-white/90 border border-white/80 shadow-sm'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Quantity + Add to Cart + Wishlist */}
            <div className="flex items-center gap-4">
              <div
                className="flex items-center bg-white/70 backdrop-blur-md rounded-2xl border border-white/80 p-1 shadow-sm"
                role="group"
                aria-label="Quantity selector"
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center font-black text-xl hover:bg-coffee-50 rounded-xl transition-colors text-coffee-800 disabled:opacity-40"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-5 w-5" aria-hidden="true" />
                </button>
                <span
                  className="w-10 text-center font-black text-xl text-coffee-800"
                  role="status"
                  aria-live="polite"
                  aria-label={`Quantity ${quantity}`}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center font-black text-xl hover:bg-coffee-50 rounded-xl transition-colors text-coffee-800"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                aria-label={product.inStock ? `Add ${quantity} ${product.name} to cart` : 'Out of stock'}
                className={`flex-1 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl active:scale-95 ${product.inStock
                  ? 'bg-coffee-800 text-white hover:bg-coffee-700 hover:shadow-coffee-900/30'
                  : 'bg-coffee-200 text-coffee-400 cursor-not-allowed'
                  }`}
              >
                <ShoppingCart size={22} aria-hidden="true" />
                {product.inStock ? `Add to Cart — ${formatCurrency(totalPrice)}` : 'Out of Stock'}
              </button>

              <button
                onClick={handleToggleWishlist}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={isWishlisted}
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-sm text-coffee-800 hover:text-red-500 transition-colors shrink-0"
              >
                <Heart
                  className={`h-6 w-6 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Feature highlights */}
            <ul
              className="grid grid-cols-3 gap-3 pt-4 border-t border-coffee-500/15 list-none p-0 m-0"
              aria-label="Product highlights"
            >
              {[
                { icon: Zap, label: 'High Energy' },
                { icon: Clock, label: 'Fresh Roast' },
                { icon: Coffee, label: '100% Arabica' },
              ].map((item, idx) => (
                <li key={idx} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center shadow-sm border border-white/80"
                    aria-hidden="true"
                  >
                    <item.icon size={18} className="text-coffee-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-coffee-700/70 text-center">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Trust badges row */}
            <ul className="grid grid-cols-3 gap-3 pt-4 border-t border-coffee-500/15 list-none p-0 m-0">
              {[
                { icon: Truck, title: 'Free Shipping', sub: 'On orders over 200 SAR' },
                { icon: ShieldCheck, title: 'Secure Checkout', sub: '256-bit SSL encrypted' },
                { icon: RefreshCw, title: 'Fresh Roast', sub: 'Roasted within 48 hours' },
              ].map((badge, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white/60 border border-white/80"
                >
                  <div
                    className="w-9 h-9 rounded-lg bg-coffee-500/10 flex items-center justify-center shrink-0 border border-coffee-500/20"
                    aria-hidden="true"
                  >
                    <badge.icon size={16} className="text-coffee-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-coffee-800 leading-tight">{badge.title}</div>
                    <div className="text-[10px] text-coffee-700/60 leading-tight mt-0.5">{badge.sub}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Mobile: Stacked glassy layout ── */}
          <div className="md:hidden space-y-5">

            {/* Roast + name + rating + price */}
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-coffee-500 block mb-1">
                  {roastLevel}
                </span>
                <h1 className="text-2xl font-black text-coffee-800 leading-tight">{product.name}</h1>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Star size={14} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span className="text-xs font-bold text-coffee-800">{product.rating}</span>
                  <span className="text-[10px] text-coffee-700/60">({product.reviewCount || 0} reviews)</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl font-black text-coffee-800">{formatCurrency(product.price)}</div>
                {product.originalPrice && (
                  <div className="text-sm text-coffee-700/40 line-through font-medium">
                    {formatCurrency(product.originalPrice)}
                  </div>
                )}
              </div>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {product.subCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md text-coffee-700 text-[11px] font-bold uppercase tracking-wide border border-white/80 shadow-sm">
                  <Leaf size={12} className="text-emerald-600" aria-hidden="true" />
                  {product.subCategory}
                </span>
              )}
              {productOrigin && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md text-coffee-700 text-[11px] font-bold uppercase tracking-wide border border-white/80 shadow-sm">
                  <MapPin size={12} className="text-coffee-500" aria-hidden="true" />
                  {productOrigin}
                </span>
              )}
              {product.inStock ? (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-100/70 backdrop-blur-md text-emerald-700 text-[11px] font-bold uppercase tracking-wide border border-emerald-200/60 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-100/70 backdrop-blur-md text-rose-700 text-[11px] font-bold uppercase tracking-wide border border-rose-200/60 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" aria-hidden="true" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-coffee-700/90 leading-relaxed">
              {product.description}
            </p>

            {/* Flavor Notes */}
            {productNotes.length > 0 && (
              <section aria-labelledby="flavor-notes-heading-mobile">
                <h2
                  id="flavor-notes-heading-mobile"
                  className="text-xs font-bold uppercase tracking-[0.18em] text-coffee-600 mb-2"
                >
                  Flavor Notes
                </h2>
                <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                  {productNotes.map((note) => (
                    <li
                      key={note}
                      className="px-3 py-1.5 rounded-xl bg-white/60 backdrop-blur-md text-coffee-800 text-xs font-bold shadow-sm border border-white/80"
                    >
                      #{note}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Size Selector */}
            <fieldset className="border-0 p-0 m-0">
              <legend className="text-xs font-bold uppercase tracking-[0.18em] text-coffee-600 mb-2">
                Choose Size
              </legend>
              <div className="flex gap-2" role="radiogroup" aria-label="Coffee size">
                {['250g', '500g', '1kg'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    role="radio"
                    aria-checked={selectedSize === size}
                    aria-label={`Select size ${size}`}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${selectedSize === size
                      ? 'bg-coffee-800 text-white shadow-lg shadow-coffee-900/20'
                      : 'bg-white/60 backdrop-blur-md text-coffee-800 hover:bg-white border border-white/80 shadow-sm'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Feature highlights */}
            <ul
              className="grid grid-cols-3 gap-3 pt-4 border-t border-coffee-500/10 list-none p-0 m-0"
              aria-label="Product highlights"
            >
              {[
                { icon: Zap, label: 'High Energy' },
                { icon: Clock, label: 'Fresh Roast' },
                { icon: Coffee, label: '100% Arabica' },
              ].map((item, idx) => (
                <li key={idx} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-md flex items-center justify-center shadow-sm border border-white/80"
                    aria-hidden="true"
                  >
                    <item.icon size={18} className="text-coffee-500" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-coffee-700/60 text-center">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Mobile Sticky Add-to-cart Bar (glassmorphism) ─── */}
      <div
        className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-white/70 backdrop-blur-2xl border-t border-white/60 shadow-[0_-8px_24px_-12px_rgba(72,45,32,0.25)]"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="px-4 py-3 flex items-center gap-3">
          <div
            className="flex items-center bg-white/60 backdrop-blur-md rounded-full px-1 py-1 border border-white/80 shrink-0"
            role="group"
            aria-label="Quantity selector"
          >
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-full flex items-center justify-center text-coffee-800 hover:bg-white active:scale-95 transition-all disabled:opacity-40"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <span
              className="w-7 text-center font-bold text-base text-coffee-800"
              role="status"
              aria-live="polite"
              aria-label={`Quantity ${quantity}`}
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-coffee-800 hover:bg-white active:scale-95 transition-all"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={product.inStock ? `Add ${quantity} ${product.name} to cart` : 'Out of stock'}
            className={`flex-1 h-12 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${product.inStock
              ? 'bg-coffee-800 text-white hover:bg-coffee-700 shadow-lg shadow-coffee-900/20'
              : 'bg-coffee-200 text-coffee-400 cursor-not-allowed'
              }`}
          >
            <ShoppingCart size={18} aria-hidden="true" />
            {product.inStock ? `Add — ${formatCurrency(totalPrice)}` : 'Out of Stock'}
          </button>
        </div>
      </div>
    </main>
  );
}