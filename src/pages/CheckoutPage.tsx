import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Truck, Headphones } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { CheckoutForm } from '@/features/checkout/CheckoutForm'
import { Navigate } from 'react-router-dom'

export function CheckoutPage() {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)

  if (items.length === 0) {
    return <Navigate to="/shop-beans" replace />
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-32">
      {/* ═════════ TOP BAR ═════════ */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-coffee-100 px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-coffee-900 active:scale-95 transition-all"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-black text-coffee-900 tracking-tight">Checkout</h1>
        <div className="w-10" /> {/* Spacer for balance */}
      </nav>

      <div className="px-4 py-8 max-w-2xl mx-auto">
        <CheckoutForm />

        {/* Trust Badges */}
        <div className="grid grid-cols-1 gap-3 mt-12">
          {[
            { icon: ShieldCheck, text: 'Secure encrypted payment' },
            { icon: Truck, text: 'Fast shipping within 24 hours' },
            { icon: Headphones, text: '24/7 customer support' }
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-coffee-100">
              <div className="w-10 h-10 rounded-xl bg-coffee-50 flex items-center justify-center text-coffee-600">
                <badge.icon size={20} />
              </div>
              <span className="text-sm font-bold text-coffee-800/80">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
