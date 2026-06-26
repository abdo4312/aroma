import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Coffee, ArrowRight, Sparkles, Star } from 'lucide-react'

interface FloatingParticle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

function buildParticles(count: number = 12): FloatingParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.1,
  }))
}

export function HeroBanner() {
  const navigate = useNavigate()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [shimmerX, setShimmerX] = useState(0)
  const containerRef = useRef<HTMLElement>(null)
  const [particles, setParticles] = useState<FloatingParticle[]>([])

  useEffect(() => {
    setParticles(buildParticles(12))
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      setMousePos({ x, y })
      const shimmerPercent = ((e.clientX - rect.left) / rect.width) * 100
      setShimmerX(shimmerPercent)
    }

    const el = containerRef.current
    el?.addEventListener('mousemove', handleMouseMove)
    return () => el?.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }) }}
      aria-labelledby="hero-heading"
      className="relative overflow-hidden rounded-none -mx-4 sm:mx-0 sm:rounded-[2rem] md:rounded-[2.5rem] min-h-[340px] sm:min-h-[440px] md:min-h-[480px] shadow-[0_40px_120px_-40px_rgba(30,16,10,0.9)]"
    >
      {/* ─── Layer 0: Deep Dark Base ─── */}
      <div className="absolute inset-0 bg-gradient-to-br from-coffee-950 via-[#1a0e08] to-coffee-900" />

      {/* ─── Layer 1: Aurora / Wave Effect ─── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/2 -left-1/4 h-[200%] w-[150%] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(217,170,123,0.3) 0%, rgba(140,98,57,0.1) 30%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(180,120,60,0.2) 0%, transparent 50%)',
            transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 10}px)`,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      {/* ─── Layer 2: GOLD & SILVER SHIMMER — follows mouse (desktop only) ─── */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] hidden md:block transition-opacity duration-700"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `
            radial-gradient(600px circle at ${shimmerX}% 50%, rgba(217,170,123,0.12) 0%, rgba(184,134,11,0.06) 30%, transparent 60%),
            radial-gradient(400px circle at ${shimmerX}% 50%, rgba(192,192,192,0.06) 0%, transparent 50%)
          `,
        }}
      />

      {/* ─── Layer 3: Floating Golden Particles ─── */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-amber-300 animate-float"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              filter: `blur(${p.size > 3 ? 1 : 0}px)`,
            }}
          />
        ))}
      </div>

      {/* ─── Layer 4: Vignette ─── */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,5,3,0.6)_100%)]" />

      {/* ═══════════════════════════════════════════════════════════════
          📱 MOBILE-ONLY: Compact App-like Hero (full-width, edge-to-edge)
          ═══════════════════════════════════════════════════════════════ */}
      <div className="md:hidden relative z-10 flex flex-col justify-center min-h-[340px] px-5 py-8">

        {/* Premium Glass Badge — compact */}
        <div className="inline-flex self-start items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 px-3 py-1 backdrop-blur-xl animate-fade-up">
          <Sparkles className="h-2.5 w-2.5 text-amber-400" />
          <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-[9px] font-bold uppercase tracking-[0.2em] text-transparent">
            Single-Origin Micro-Lots
          </span>
          <span className="relative flex h-1 w-1">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-1 w-1 rounded-full bg-amber-400" />
          </span>
        </div>

        {/* Headline — compact but bold */}
        <h1 className="mt-5 text-[1.75rem] leading-[1.05] font-black tracking-tight text-white animate-fade-up-delay">
          Where Every Sip
          <br />
          <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-coffee-400 bg-clip-text text-transparent">
            Tells a Story
          </span>
        </h1>

        {/* Subtitle — single line, short */}
        <p className="mt-3 max-w-[16rem] text-[12px] leading-snug text-stone-300 animate-fade-up-delay-2">
          Hand-picked beans, roasted with precision.
        </p>

        {/* CTA */}
        <div className="mt-5 flex items-center gap-3 animate-fade-up-delay-3">
          <button
            onClick={() => navigate('/shop-beans')}
            className="group relative flex-1 overflow-hidden rounded-xl bg-gradient-to-r from-coffee-400 via-amber-600 to-coffee-500 px-4 py-3 text-[13px] font-bold text-coffee-950 shadow-lg shadow-amber-900/40 transition-all duration-300 active:scale-[0.98]"
            aria-label="Explore our coffee beans"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10 flex items-center justify-center gap-1.5">
              Explore Beans
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>

        {/* Trust Line — minimal */}
        <div className="mt-4 flex items-center justify-center gap-3 text-[9px] font-medium text-stone-400 animate-fade-up-delay-4">
          <div className="flex items-center gap-1">
            <Coffee className="h-2.5 w-2.5 text-amber-500/60" />
            <span>48h Fresh</span>
          </div>
          <div className="w-0.5 h-0.5 rounded-full bg-stone-600" aria-hidden="true" />
          <div className="flex items-center gap-1">
            <Star className="h-2.5 w-2.5 text-amber-500/60" />
            <span>12+ Origins</span>
          </div>
          <div className="w-0.5 h-0.5 rounded-full bg-stone-600" aria-hidden="true" />
          <div className="flex items-center gap-1">
            <Sparkles className="h-2.5 w-2.5 text-amber-500/60" />
            <span>4.9 Rated</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          🖥️ DESKTOP: Original content (COMPLETELY UNTOUCHED)
          ═══════════════════════════════════════════════════════════════ */}
      <div className="hidden md:grid relative z-10 min-h-[480px] sm:min-h-[440px] md:min-h-[480px] items-center gap-6 px-5 py-8 sm:px-8 sm:py-10 md:px-16 md:py-14 lg:grid-cols-[1.4fr_0.6fr]">

        {/* ═══ Text Column ═══ */}
        <div className="flex flex-col justify-center space-y-4 sm:space-y-6">

          <div className="group inline-flex self-start items-center gap-2 sm:gap-3 rounded-full border border-amber-500/20 bg-amber-950/40 px-3 sm:px-5 py-1.5 sm:py-2 backdrop-blur-xl transition-all duration-300">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400" />
            <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-transparent">
              Single-Origin Micro-Lots
            </span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
            </span>
          </div>

          <div className="space-y-1">
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight text-white animate-fade-up"
            >
              Where Every Sip
              <br />
              <span className="inline-block mt-2 bg-gradient-to-r from-amber-200 via-yellow-400 to-[#d9aa7b] bg-clip-text text-transparent animate-fade-up-delay">
                Tells a Story
              </span>
            </h1>

            <div className="hidden sm:flex items-center gap-4 pt-3 animate-fade-up-delay-2">
              <div className="h-[2px] w-16 bg-gradient-to-r from-amber-500 to-transparent" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-500">
                Est. 2024 — Aroma Corner
              </span>
            </div>
          </div>

          <p className="max-w-lg text-sm sm:text-base md:text-lg leading-relaxed text-stone-300 animate-fade-up-delay-3">
            Hand-picked beans from the world's most exclusive estates, roasted with precision to unlock flavors you never knew existed.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-4 pt-1 animate-fade-up-delay-4">
            <button
              onClick={() => navigate('/shop-beans')}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#d9aa7b] via-[#b8860b] to-[#8C6239] px-6 sm:px-9 py-3.5 sm:py-4 text-sm font-bold text-coffee-950 shadow-lg shadow-amber-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/20 active:scale-[0.97]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Our Beans
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>

            <button
              onClick={() => navigate('/build-your-box')}
              className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] px-6 sm:px-9 py-3.5 sm:py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] active:scale-[0.97]"
            >
              <span className="relative z-10">Build Your Box</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-6 border-t border-white/[0.06] pt-5 sm:pt-7 animate-fade-up-delay-4">
            {[
              { value: '48h', label: 'Fresh from Roast', icon: Coffee },
              { value: '12+', label: 'Elite Origins', icon: Star },
              { value: '4.9', label: 'By 18K+ Lovers', icon: Sparkles },
            ].map((stat, i) => (
              <div
                key={i}
                className="group cursor-default transition-all duration-300"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <stat.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500/60" />
                  <span className="text-lg sm:text-2xl font-black bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>
                <p className="mt-1 text-[9px] sm:text-[11px] font-medium text-stone-400 group-hover:text-stone-300 transition-colors leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ RIGHT: Floating Visual Element (desktop only) ═══ */}
        <div className="relative hidden items-center justify-center lg:flex">
          <div
            style={{
              transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -15}px)`,
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="absolute -inset-16 rounded-full bg-[radial-gradient(circle,rgba(217,170,123,0.08)_0%,transparent_70%)]" />
            <div className="absolute inset-[-40px] rounded-full border border-amber-500/[0.07] animate-[spin_50s_linear_infinite]" />
            <div className="absolute inset-[-70px] rounded-full border border-dashed border-white/[0.04] animate-[spin_80s_linear_infinite_reverse]" />

            <div className="group relative h-72 w-72 md:h-80 md:w-80">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(184,134,11,0.15)_0%,transparent_60%)] blur-2xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-80" />

              <div className="absolute inset-0 rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:shadow-[0_35px_90px_-20px_rgba(139,98,57,0.4)] group-hover:border-amber-500/20">
                <div className="absolute inset-4 rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#3d2215] via-[#5c3b2a] to-[#2a1610]">
                  <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-amber-500/10 to-transparent" />
                  <div className="absolute inset-0 animate-liquid-shimmer bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" style={{ backgroundSize: '200% 100%' }} />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-20 w-14 -rotate-12 rounded-[40%_60%_40%_60%_/_50%] bg-gradient-to-br from-[#dfb76c] via-[#8C6239] to-[#4a2e1f] shadow-xl transition-all duration-700 group-hover:rotate-12 group-hover:scale-110">
                      <div className="absolute inset-y-2 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/60 via-amber-200/30 to-black/60" />
                    </div>
                  </div>

                  <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 flex gap-3">
                    <span className="h-10 w-[1.5px] rounded-full bg-gradient-to-t from-amber-400/50 to-transparent animate-[steam_2.5s_infinite_ease-in-out]" />
                    <span className="h-14 w-[1.5px] rounded-full bg-gradient-to-t from-yellow-300/30 to-transparent animate-[steam_3s_infinite_ease-in-out_0.4s]" />
                    <span className="h-12 w-[1.5px] rounded-full bg-gradient-to-t from-amber-400/40 to-transparent animate-[steam_2s_infinite_ease-in-out_0.8s]" />
                    <span className="h-8 w-[1.5px] rounded-full bg-gradient-to-t from-amber-300/30 to-transparent animate-[steam_2.8s_infinite_ease-in-out_1.2s]" />
                  </div>
                </div>
              </div>

              <FloatingBadge
                position="top-[-12px] left-[-20px]"
                color="bg-coffee-800/85"
                dot="bg-amber-400"
                text="Medium Roast"
              />
              <FloatingBadge
                position="top-1/2 right-[-30px] -translate-y-1/2"
                color="bg-coffee-900/85"
                dot="bg-yellow-300"
                text="Cherry & Cocoa"
              />
              <FloatingBadge
                position="bottom-[-12px] left-[20px]"
                color="bg-coffee-700/85"
                dot="bg-emerald-400"
                text="Freshly Roasted"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-coffee-950/50 to-transparent" />

      {/* ─── Custom CSS Animations ─── */}
      <style>{`
        @keyframes steam {
          0% { transform: translateY(12px) scaleX(0.8) scaleY(0.5); opacity: 0; filter: blur(1px); }
          50% { opacity: 0.5; filter: blur(2px); }
          100% { transform: translateY(-35px) scaleX(1.5) scaleY(1.6); opacity: 0; filter: blur(4px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-12px) translateX(4px); }
          50% { transform: translateY(-6px) translateX(-3px); }
          75% { transform: translateY(-15px) translateX(2px); }
        }

        @keyframes liquid-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-up { animation: fade-up 0.8s ease-out both; }
        .animate-fade-up-delay { animation: fade-up 0.8s ease-out 0.15s both; }
        .animate-fade-up-delay-2 { animation: fade-up 0.8s ease-out 0.3s both; }
        .animate-fade-up-delay-3 { animation: fade-up 0.8s ease-out 0.45s both; }
        .animate-fade-up-delay-4 { animation: fade-up 0.8s ease-out 0.6s both; }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-liquid-shimmer { animation: liquid-shimmer 4s linear infinite; }
      `}</style>
    </section>
  )
}

// ─── Reusable Floating Badge Component ───
function FloatingBadge({
  position,
  color,
  dot,
  text,
}: {
  position: string
  color: string
  dot: string
  text: string
}) {
  return (
    <div
      className={`absolute ${position} flex items-center gap-2 rounded-xl border border-white/15 ${color} px-3 py-1.5 text-[10px] font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-xl`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {text}
    </div>
  )
}