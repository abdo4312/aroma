import { useNavigate } from 'react-router-dom';
import { Flame, Clock, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { useScrollReveal } from '@/shared/hooks/use-scroll-reveal';

export function PromoSection() {
  const navigate = useNavigate();
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="promo-section reveal group relative overflow-hidden rounded-[2rem] border border-white/45 shadow-[0_28px_80px_-38px_rgba(59,34,19,0.7)]"
    >
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80"
        alt="Golden Hour Roast"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        loading="lazy"
      />

      {/* Multi-layer gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(30,15,8,0.88)] via-[rgba(30,15,8,0.65)] to-[rgba(30,15,8,0.35)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(30,15,8,0.5)] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(243,176,121,0.15),transparent_60%)]" />

      {/* Shimmer sweep */}
      <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.06)_45%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0.06)_55%,transparent_60%)] bg-[length:250%_100%] bg-[position:120%_0] transition-[background-position] duration-1000 pointer-events-none group-hover:bg-[position:-40%_0]" />

      {/* Decorative floating elements */}
      <div className="absolute top-8 right-8 h-24 w-24 rounded-full bg-[#f3b079]/10 blur-2xl animate-[floatSlow_6s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute bottom-12 left-12 h-32 w-32 rounded-full bg-[#8C6239]/10 blur-3xl animate-[floatUp_8s_ease-in-out_infinite] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:gap-8 md:p-10 lg:p-12">
        <div className="max-w-xl">
          {/* Badges row */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#f3b079]/40 bg-[#f3b079]/20 px-4 py-1.5 backdrop-blur-md">
              <Flame className="h-3.5 w-3.5 text-[#f3b079]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f3b079]">Limited Batch</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <Clock className="h-3.5 w-3.5 text-white/70" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">This Week Only</span>
            </span>
          </div>

          {/* Title — badge wraps below on mobile to prevent overflow */}
          <h2 className="mb-3 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            Golden Hour Roast
            <span className="mt-2 block w-fit items-center gap-1 rounded-xl bg-[#f3b079] px-3 py-1 text-base font-extrabold text-[#3f2518] sm:ml-3 sm:inline-flex sm:mt-0 sm:text-lg md:text-xl">
              <Sparkles className="h-4 w-4" />
              25% OFF
            </span>
          </h2>

          {/* Description */}
          <p className="mb-6 max-w-lg text-[15px] leading-relaxed text-white/70 md:text-base">
            A warm blend of hazelnut, milk chocolate, and orange zest.
            Expertly roasted in small batches for a limited time.
            Available while stocks last.
          </p>

          {/* Feature chips */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/60 backdrop-blur-sm">
              🌰 Hazelnut
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/60 backdrop-blur-sm">
              🍫 Milk Chocolate
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/60 backdrop-blur-sm">
              🍊 Orange Zest
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/60 backdrop-blur-sm">
              🔥 Small Batch
            </span>
          </div>
        </div>

        {/* CTA area */}
        <div className="flex flex-col items-start gap-4 md:items-end">
          {/* Price display */}
          <div className="text-right">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-white md:text-5xl">60 SAR</span>
              <span className="text-lg font-medium text-white/40 line-through md:text-xl">80 SAR</span>
            </div>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#f3b079]">Save 20 SAR</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate('/golden-hour')}
              className="group/btn inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#f3b079] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-[#3f2518] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f5c08f] hover:shadow-[0_12px_30px_-8px_rgba(243,176,121,0.5)] active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" />
              Claim the Offer
            </button>
            <button
              onClick={() => navigate('/shop-beans')}
              className="group/btn inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:text-white active:scale-95"
            >
              Explore All Beans
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>

          {/* Urgency indicator */}
          <div className="flex items-center gap-2 text-xs text-white/40">
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#f3b079]" />
            <span>Limited stock — selling fast</span>
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 z-10 h-[3px] w-0 bg-gradient-to-r from-[#f3b079] via-[#d9aa7b] to-[#8C6239] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />

      {/* Corner glow */}
      <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-[#f3b079]/0 blur-3xl transition-all duration-700 group-hover:bg-[#f3b079]/15 pointer-events-none" />
    </section>
  );
}