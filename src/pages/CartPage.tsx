import { useNavigate, Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight, Coffee, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { SHIPPING_THRESHOLD, SHIPPING_COST } from '@/shared/utils/shipping';

export function CartPage() {
  const navigate = useNavigate();

  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice
  } = useCartStore();

  const totalPrice = getTotalPrice();

  /* ─── Empty Cart ─── */
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#fff8f1_0%,#f9e8d8_36%,#efdac7_66%,#e3ccb8_100%)] flex items-center justify-center p-4 pb-24 md:pb-12">
        <div className="text-center max-w-md">
          <div className="mx-auto w-20 h-20 bg-[#8C6239]/10 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
            <Coffee className="h-10 w-10 text-[#8C6239]" />
          </div>
          <h2 className="text-2xl font-bold text-[#4A3B32] mb-2">Your cart is empty</h2>
          <p className="text-[#6B4423]/70 mb-6">Start adding your favorite coffee from our store and enjoy distinctive global flavors.</p>
          <Link
            to="/shop-beans"
            className="inline-flex items-center gap-2 bg-[#4A3B32] text-white px-6 py-3 rounded-xl hover:bg-[#5F3A26] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-8px_rgba(95,58,38,0.5)]"
            aria-label="Browse products and start shopping"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Browse products
          </Link>
        </div>
      </main>
    );
  }

  const shippingCost = totalPrice > SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalTotal = totalPrice + shippingCost;
  const freeShippingRemaining = Math.max(0, SHIPPING_THRESHOLD - totalPrice);

  return (
    <main className="relative min-h-screen bg-[radial-gradient(circle_at_20%_15%,#fff8f1_0%,#f9e8d8_35%,#efdac7_65%,#e3ccb8_100%)] pb-40 md:pb-12">
      <div className="coffee-blob coffee-blob-a" aria-hidden="true" />
      <div className="coffee-blob coffee-blob-b" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-6 md:py-10">

        {/* ─── Header ─── */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/40 rounded-xl transition-colors"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="h-5 w-5 text-[#4A3B32]" aria-hidden="true" />
          </button>
          <h1 className="text-2xl font-bold text-[#4A3B32] flex-1">My Cart</h1>
          <span className="bg-[#8C6239]/10 text-[#8C6239] px-3 py-1 rounded-full text-xs font-bold" aria-live="polite">
            {items.length} item{items.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* ─── Free shipping progress (mobile nicety) ─── */}
        {freeShippingRemaining > 0 ? (
          <div className="mb-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/50 p-3" role="status">
            <p className="text-xs text-[#6B4423] mb-2">
              Add <span className="font-bold text-[#8C6239]">{formatCurrency(freeShippingRemaining)}</span> more for free shipping!
            </p>
            <div className="h-1.5 w-full bg-[#8C6239]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#8C6239] to-[#5F3A26] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (totalPrice / SHIPPING_THRESHOLD) * 100)}%` }}
                aria-hidden="true"
              />
            </div>
          </div>
        ) : (
          <div className="mb-4 rounded-2xl bg-green-50/70 backdrop-blur-xl border border-green-200/40 p-3 text-xs text-green-700 font-bold flex items-center gap-2" role="status">
            <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
            You've unlocked free shipping!
          </div>
        )}

        {/* ─── Cart Items List ─── */}
        <section className="space-y-3 mb-6" aria-label="Cart items">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex items-center gap-3 bg-white/70 backdrop-blur-xl p-3 rounded-2xl border border-white/50 shadow-[0px_4px_12px_rgba(46,26,18,0.08)]"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-[#3f2518] text-sm truncate">{item.name}</h2>
                {item.roastLevel && (
                  <span className="inline-block px-2 py-0.5 mt-1 rounded-full bg-[#8C6239]/10 text-[#6B4423] text-[10px] font-bold uppercase tracking-wide">
                    {item.roastLevel}
                  </span>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-[#4A3B32] text-base">{formatCurrency(item.price * item.quantity)}</span>

                  {/* Quantity Stepper */}
                  <div
                    className="flex items-center bg-[#FAF7F2] rounded-full px-2 py-1 gap-2 border border-[#8C6239]/15"
                    role="group"
                    aria-label={`Quantity for ${item.name}`}
                  >
                    <button
                      onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                      className="text-[#4A3B32] p-1 hover:bg-white rounded-full transition-colors flex items-center justify-center w-6 h-6"
                      aria-label={item.quantity > 1 ? `Decrease quantity of ${item.name}` : `Remove ${item.name} from cart`}
                    >
                      <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <span
                      className="w-5 text-center font-bold text-sm text-[#4A3B32]"
                      role="status"
                      aria-live="polite"
                      aria-label={`Quantity ${item.quantity}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-[#4A3B32] p-1 hover:bg-white rounded-full transition-colors flex items-center justify-center w-6 h-6"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="self-start p-2 text-[#8C6239]/40 hover:text-red-500 transition-colors"
                aria-label={`Remove ${item.name} from cart`}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </article>
          ))}

          <button
            onClick={clearCart}
            className="text-xs text-[#6B4423]/60 hover:text-red-500 transition-colors flex items-center gap-1.5 px-2"
            aria-label="Clear entire cart — remove all items"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> Clear entire cart
          </button>
        </section>

        {/* ─── Order Summary (desktop / tablet sees inline, mobile sees it pushed up by sticky CTA) ─── */}
        <section
          className="bg-white/70 backdrop-blur-xl p-5 rounded-2xl border border-white/50 shadow-[0px_4px_12px_rgba(46,26,18,0.08)]"
          aria-labelledby="order-summary-heading"
        >
          <h3 id="order-summary-heading" className="font-bold text-[#4A3B32] mb-4">Order Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-[#6B4423]">
              <span>Subtotal</span>
              <span className="font-bold">{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-[#6B4423]">
              <span>Shipping</span>
              <span className={shippingCost === 0 ? 'text-green-600 font-bold' : 'font-bold'}>
                {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
              </span>
            </div>
            <div className="border-t border-[#8C6239]/15 my-3" aria-hidden="true" />
            <div className="flex justify-between items-end">
              <span className="font-bold text-[#4A3B32]">Total</span>
              <span className="text-xl font-black text-[#4A3B32]">{formatCurrency(finalTotal)}</span>
            </div>
          </div>

          {/* Desktop: inline checkout button */}
          <button
            onClick={() => navigate('/checkout')}
            className="hidden md:flex w-full mt-5 bg-[#4A3B32] text-white font-bold py-3.5 rounded-full hover:bg-[#5F3A26] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-8px_rgba(57,33,22,0.6)] items-center justify-center gap-2"
            aria-label="Proceed to checkout"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" /> Proceed to Checkout
          </button>

          <Link
            to="/shop-beans"
            className="hidden md:block text-center mt-3 text-sm text-[#8C6239] hover:underline"
            aria-label="Continue shopping for more products"
          >
            Or continue shopping
          </Link>
        </section>
      </div>

      {/* ─── Sticky Mobile Checkout Bar (above bottom nav) ─── */}
      <div
        className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(72,45,32,0.2)] border-t border-[#8C6239]/15"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wide text-[#6B4423]/60 font-bold">Total</p>
            <p className="text-lg font-black text-[#4A3B32]">{formatCurrency(finalTotal)}</p>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="flex-1 bg-[#4A3B32] text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#5F3A26] active:scale-[0.98] transition-all"
            aria-label="Proceed to checkout"
          >
            Checkout
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </main>
  );
}