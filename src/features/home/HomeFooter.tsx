import {
  Coffee,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Heart,
} from 'lucide-react'
import { Link } from 'react-router-dom'

/* ───────── Data ───────── */

const quickLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Shipping', path: '/shipping' },
  { name: 'Brew Guide', path: '/brew-guide' },
  { name: 'Support', path: '/support' },
]

const categories = [
  { name: 'Signature Beans', path: '/shop-beans' },
  { name: 'Build Your Box', path: '/build-your-box' },
  { name: 'Gift Cards', path: '/gift-cards' },
  { name: 'Brew Gear', path: '/brew-gear' },
]

const socials = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/aromacornercoffee' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@aromacorner.shop' },
  { icon: Phone, label: 'Phone', href: 'tel:+201234567890' },
]

/* ───────── Sub-components ───────── */

function FloatingBean({ className }: { className?: string }) {
  return (
    <div className={`footer-float-bean pointer-events-none absolute ${className ?? ''}`}>
      <Coffee className="h-5 w-5 text-[#c4956a]/30" />
    </div>
  )
}

/* ───────── Main Component ───────── */

export function HomeFooter() {
  return (
    <footer className="footer-wrapper group relative hidden overflow-hidden rounded-[2rem] border border-white/45 bg-white/22 p-1 shadow-[0_28px_80px_-38px_rgba(59,34,19,0.7)] backdrop-blur-xl md:block">
      {/* ── Gradient Overlay ── */}
      <div className="coffee-hero-gradient absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.45),transparent_55%)]" />

      {/* ── Gold/Silver Shimmer Sweep on Hover ── */}
      <div className="footer-shimmer-sweep absolute inset-0 z-10 pointer-events-none" />

      {/* ── Floating Decorative Beans ── */}
      <FloatingBean className="top-8 left-6 footer-float-1" />
      <FloatingBean className="top-16 right-12 footer-float-2" />
      <FloatingBean className="bottom-20 left-1/3 footer-float-3" />
      <FloatingBean className="bottom-10 right-1/4 footer-float-4" />

      {/* ── Liquid Blobs ── */}
      <div
        className="liquid-blob absolute -bottom-14 left-8 h-28 w-28 bg-[#7d4930]/30"
        style={{ '--blob-duration': '24s', '--blob-delay': '-7s' } as React.CSSProperties}
      />
      <div
        className="liquid-blob absolute -right-8 top-6 h-20 w-20 bg-[#f0b57f]/40"
        style={{ '--blob-duration': '18s', '--blob-delay': '-3s' } as React.CSSProperties}
      />
      <div
        className="liquid-blob absolute bottom-1/3 left-1/2 h-16 w-16 bg-[#c4956a]/25"
        style={{ '--blob-duration': '22s', '--blob-delay': '-11s' } as React.CSSProperties}
      />

      {/* ── Content ── */}
      <div className="relative z-20 grid gap-8 rounded-[1.7rem] bg-[linear-gradient(125deg,rgba(255,255,255,0.55),rgba(255,255,255,0.12))] p-5 text-left sm:p-6 md:grid-cols-[1.3fr_1fr_1fr_1.2fr] md:p-10">

        {/* ── Column 1: Brand ── */}
        <div>
          {/* Logo */}
          <div className="inline-flex items-center gap-2.5 rounded-xl border border-white/50 bg-white/40 px-3.5 py-2 shadow-[0_8px_25px_-12px_rgba(72,45,32,0.5)] backdrop-blur-md">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#5f3a26] text-[#fff2e2] shadow-[0_4px_12px_-4px_rgba(95,58,38,0.6)]">
              <Coffee className="h-5 w-5" />
            </span>
            <span className="text-sm font-bold tracking-[0.12em] text-[#4c2d1e]">Aroma Corner</span>
          </div>

          {/* Tagline */}
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#5d3e2c]/90">
            Specialty coffee for slow mornings and bold afternoons.
            We roast in small batches and ship fresh to your door —
            because every cup deserves to be extraordinary.
          </p>

          {/* Social Icons */}
          <div className="mt-5 flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="footer-social-icon inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/50 bg-white/30 text-[#5d3a27] shadow-[0_4px_14px_-6px_rgba(72,45,32,0.4)] backdrop-blur-md transition-all duration-300 hover:bg-white/50 hover:shadow-[0_8px_22px_-6px_rgba(72,45,32,0.5)] hover:-translate-y-0.5"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* ── Column 2: Quick Links ── */}
        <div>
          <h3 className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6f4f3b]">
            <span className="inline-block h-px w-4 bg-[#c4956a]/60" />
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="footer-link group/link inline-flex items-center gap-1.5 text-sm text-[#4f2f21] transition-all duration-300 hover:text-[#7a4d35] hover:translate-x-[-4px]"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Column 3: Categories ── */}
        <div>
          <h3 className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6f4f3b]">
            <span className="inline-block h-px w-4 bg-[#c4956a]/60" />
            Categories
          </h3>
          <ul className="mt-4 space-y-2.5">
            {categories.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="footer-link group/link inline-flex items-center gap-1.5 text-sm text-[#4f2f21] transition-all duration-300 hover:text-[#7a4d35] hover:translate-x-[-4px]"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Column 4: Contact Card ── */}
        <div>
          <h3 className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6f4f3b]">
            <span className="inline-block h-px w-4 bg-[#c4956a]/60" />
            Get in Touch
          </h3>
          <div className="mt-4 space-y-3">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-item group/contact flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-all duration-300 hover:border-white/40 hover:bg-white/25"
            >
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5f3a26]/10 text-[#7d4930] transition-colors duration-300 group-hover/contact:bg-[#5f3a26]/20">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#4f2f21]">Downtown Roastery</p>
                <p className="text-xs text-[#6f503d]/80">Cairo, Egypt</p>
              </div>
            </a>

            <a
              href="mailto:hello@aromacorner.shop"
              className="footer-contact-item group/contact flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-all duration-300 hover:border-white/40 hover:bg-white/25"
            >
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5f3a26]/10 text-[#7d4930] transition-colors duration-300 group-hover/contact:bg-[#5f3a26]/20">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#4f2f21]">hello@aromacorner.shop</p>
                <p className="text-xs text-[#6f503d]/80">We reply within 24h</p>
              </div>
            </a>

            <a
              href="tel:+201234567890"
              className="footer-contact-item group/contact flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-all duration-300 hover:border-white/40 hover:bg-white/25"
            >
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5f3a26]/10 text-[#7d4930] transition-colors duration-300 group-hover/contact:bg-[#5f3a26]/20">
                <Phone className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#4f2f21]">+20 123 456 7890</p>
                <p className="text-xs text-[#6f503d]/80">Mon–Sat, 9 AM – 8 PM</p>
              </div>
            </a>

            <a
              href="https://instagram.com/aromacornercoffee"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-item group/contact flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-all duration-300 hover:border-white/40 hover:bg-white/25"
            >
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5f3a26]/10 text-[#7d4930] transition-colors duration-300 group-hover/contact:bg-[#5f3a26]/20">
                <Instagram className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#4f2f21]">@aromacornercoffee</p>
                <p className="text-xs text-[#6f503d]/80">Follow our journey</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="relative z-20 mx-2 mb-1 flex flex-col items-center justify-between gap-3 rounded-2xl border-t border-white/30 bg-white/15 px-5 py-4 backdrop-blur-md sm:flex-row sm:px-6">
        <p className="flex items-center gap-1.5 text-xs text-[#6f503d]">
          © 2026 Aroma Corner. Crafted with
          <Heart className="inline h-3 w-3 text-[#b5544a] footer-heart-pulse" />
          in Cairo
        </p>
        <div className="flex items-center gap-4 text-xs text-[#6f503d]/70">
          <Link
            to="/privacy-policy"
            className="transition-colors duration-300 hover:text-[#5d3a27]"
          >
            Privacy Policy
          </Link>
          <span className="h-3 w-px bg-[#6f503d]/25" />
          <Link
            to="/terms-of-service"
            className="transition-colors duration-300 hover:text-[#5d3a27]"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}