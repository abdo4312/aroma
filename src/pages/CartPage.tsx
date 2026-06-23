import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft, Coffee } from 'lucide-react';
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

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#fff8f1_0%,#f9e8d8_36%,#efdac7_66%,#e3ccb8_100%)] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-[#8C6239]/10 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
            <Coffee className="h-10 w-10 text-[#8C6239]" />
          </div>
          <h2 className="text-2xl font-bold text-[#4A3B32] mb-2">Your cart is empty</h2>
          <p className="text-[#6B4423]/70 mb-6 max-w-sm mx-auto">Start adding your favorite coffee from our store and enjoy distinctive global flavors.</p>
          <Link
            to="/shop-beans"
            className="inline-flex items-center gap-2 bg-[#8C6239] text-white px-6 py-3 rounded-xl hover:bg-[#5f3a26] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-8px_rgba(95,58,38,0.5)]"
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

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_20%_15%,#fff8f1_0%,#f9e8d8_35%,#efdac7_65%,#e3ccb8_100%)] py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/40 rounded-xl transition-colors"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="h-5 w-5 text-[#4A3B32]" aria-hidden="true" />
          </button>
          <h1 className="text-3xl font-bold text-[#4A3B32]">Shopping Cart</h1>
          <span className="bg-[#8C6239]/10 text-[#8C6239] px-3 py-1 rounded-full text-sm font-medium" aria-live="polite">
            {items.length} item{items.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Product List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white/60 backdrop-blur-xl rounded-3xl p-4 border border-white/40 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-2xl bg-neutral-100" />

                <div className="flex-1">
                  <h3 className="font-bold text-[#4A3B32]">{item.name}</h3>
                  {item.roastLevel && <p className="text-sm text-[#6B4423]/70 mb-1">Roast: {item.roastLevel}</p>}
                  <p className="font-semibold text-[#8C6239]">{formatCurrency(item.price * item.quantity)}</p>
                </div>

                {/* Quantity Controls */}
                <div
                  className="flex items-center gap-3 bg-white/80 rounded-xl px-2 py-1 border border-neutral-200"
                  role="group"
                  aria-label={`Quantity for ${item.name}`}
                >
                  <button
                    onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                    className="p-1 hover:text-[#8C6239] transition-colors"
                    aria-label={item.quantity > 1 ? `Decrease quantity of ${item.name}` : `Remove ${item.name} from cart`}
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span
                    className="w-8 text-center font-medium text-[#4A3B32]"
                    role="status"
                    aria-live="polite"
                    aria-label={`Quantity ${item.quantity}`}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:text-[#8C6239] transition-colors"
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-[#6B4423]/70 hover:text-red-500 transition-colors mt-4 flex items-center gap-2"
              aria-label="Clear entire cart — remove all items"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" /> Clear entire cart
            </button>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-white/40 sticky top-24 shadow-[0_20px_60px_-25px_rgba(72,45,32,0.5)]">
              <h2 className="text-xl font-bold text-[#4A3B32] mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm text-[#6B4423]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                    {shippingCost === 0 ? 'Free' : `${formatCurrency(shippingCost)}`}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-[#6B4423]/50" aria-label={`Free shipping on orders over ${SHIPPING_THRESHOLD} SAR`}>
                    🚚 Free shipping on orders over {SHIPPING_THRESHOLD} SAR
                  </p>
                )}
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-[#4A3B32]">
                  <span>Total</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#5f3a26] text-white font-bold py-3 rounded-xl hover:bg-[#4c2d1e] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-8px_rgba(57,33,22,0.6)] mt-6 flex items-center justify-center gap-2"
                aria-label="Proceed to checkout"
              >
                <ShoppingCart className="h-4 w-4" aria-hidden="true" /> Proceed to Checkout
              </button>

              <Link
                to="/shop-beans"
                className="block text-center mt-3 text-sm text-[#8C6239] hover:underline"
                aria-label="Continue shopping for more products"
              >
                Or continue shopping
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}