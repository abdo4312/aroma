import { Navigate } from 'react-router-dom'
import { ShoppingBag, ShieldCheck, Truck, Headphones } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { CheckoutForm } from '@/features/checkout/CheckoutForm'

export function CheckoutPage() {
  const items = useCartStore((state) => state.items)

  if (items.length === 0) {
    return <Navigate to="/shop-beans" replace />
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_20%_15%,#fff8f1_0%,#f9e8d8_35%,#efdac7_65%,#e3ccb8_100%)] py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-[#8C6239]/10 rounded-2xl mb-4">
            <ShoppingBag className="h-7 w-7 text-[#8C6239]" />
          </div>
          <h1 className="text-3xl font-bold text-[#4A3B32]">Complete Your Order</h1>
          <p className="text-[#6B4423]/70 mt-2">One step away from your distinctive coffee</p>
        </div>

        {/* Form Wrapper */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-sm border border-white/40">
          <CheckoutForm />
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[
            { icon: ShieldCheck, text: 'Secure encrypted payment' },
            { icon: Truck, text: 'Fast shipping within 24 hours' },
            { icon: Headphones, text: '24/7 customer support' }
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white/40 rounded-2xl border border-white/50 backdrop-blur-sm hover:bg-white/60 transition-colors">
              <badge.icon className="h-5 w-5 text-[#8C6239] flex-shrink-0" />
              <span className="text-sm font-medium text-[#4A3B32]/80">{badge.text}</span>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}