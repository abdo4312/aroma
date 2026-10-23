import { Link } from 'react-router-dom';
import {
    Coffee,
    Instagram,
    Mail,
    MapPin,
    Phone,
    ChevronRight,
    Heart,
    ShoppingBag,
    User,
    BookOpen,
    Truck,
    LifeBuoy,
    Info,
    Shield,
    FileText,
    Sparkles,
} from 'lucide-react';

/**
 * MorePage
 * ========
 * Mobile-only "More" page — hosts the content that the desktop footer
 * shows inline. Reached via the "More" tab in MobileBottomNav.
 *
 * Design: app-settings-list style. Grouped sections with section headers,
 * each item is a full-width tappable row with chevron icon. Optimized
 * for thumb reach on mobile screens.
 *
 * NOTE: This page is NOT linked from desktop nav (desktop keeps the full
 * footer). It's intentionally mobile-focused, but still works on desktop
 * if someone hits /more directly.
 */

/* ───────── Data (mirrors HomeFooter.tsx — kept in sync manually) ───────── */

const quickLinks = [
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Shipping', path: '/shipping', icon: Truck },
    { name: 'Brew Guide', path: '/brew-guide', icon: BookOpen },
    { name: 'Support', path: '/support', icon: LifeBuoy },
];

const categories = [
    { name: 'Signature Beans', path: '/shop-beans', icon: Coffee },
    { name: 'Build Your Box', path: '/build-your-box', icon: Sparkles },
    { name: 'Gift Cards', path: '/gift-cards', icon: ShoppingBag },
    { name: 'Brew Gear', path: '/brew-gear', icon: Coffee },
];

const socials = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/aromacornercoffee', display: '@aromacornercoffee' },
    { icon: Mail, label: 'Email', href: 'mailto:hello@aromacorner.shop', display: 'hello@aromacorner.shop' },
    { icon: Phone, label: 'Phone', href: 'tel:+201234567890', display: '+20 123 456 7890' },
];

const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy', icon: Shield },
    { name: 'Terms of Service', path: '/terms-of-service', icon: FileText },
];

/* ───────── Sub-components ───────── */

function SectionHeader({ children }: { children: React.ReactNode }) {
    return (
        <p className="mb-2 px-4 text-xs font-bold uppercase tracking-[0.18em] text-[#7a5a46]">
            {children}
        </p>
    );
}

function NavRow({
    to,
    icon: Icon,
    label,
}: {
    to: string;
    icon: typeof Coffee;
    label: string;
}) {
    return (
        <Link
            to={to}
            className="flex items-center gap-3.5 bg-white/70 px-4 py-3.5 backdrop-blur-sm transition-all active:scale-[0.99] hover:bg-white first:rounded-t-2xl last:rounded-b-2xl border-b border-[#8C6239]/8 last:border-b-0"
        >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#5f3a26]/8 text-[#7d4930]">
                <Icon className="h-4.5 w-4.5" size={18} aria-hidden="true" />
            </span>
            <span className="flex-1 text-[15px] font-semibold text-[#3f2518]">{label}</span>
            <ChevronRight className="h-4 w-4 text-[#8c6239]/50" aria-hidden="true" />
        </Link>
    );
}

function ExternalRow({
    href,
    icon: Icon,
    label,
    display,
}: {
    href: string;
    icon: typeof Coffee;
    label: string;
    display: string;
}) {
    const isExternal = href.startsWith('http');
    return (
        <a
            href={href}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="flex items-center gap-3.5 bg-white/70 px-4 py-3.5 backdrop-blur-sm transition-all active:scale-[0.99] hover:bg-white first:rounded-t-2xl last:rounded-b-2xl border-b border-[#8C6239]/8 last:border-b-0"
            aria-label={label}
        >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#5f3a26]/8 text-[#7d4930]">
                <Icon className="h-4.5 w-4.5" size={18} aria-hidden="true" />
            </span>
            <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold text-[#3f2518]">{label}</p>
                <p className="truncate text-xs text-[#6f503d]/80">{display}</p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#8c6239]/50" aria-hidden="true" />
        </a>
    );
}

/* ───────── Main Component ───────── */

export function MorePage() {
    return (
        <main
            className="relative min-h-screen bg-[radial-gradient(circle_at_20%_15%,#fff8f1_0%,#f9e8d8_35%,#efdac7_65%,#e3ccb8_100%)] text-[#2e1a12]"
            aria-label="More options"
        >
            <div className="relative z-10 mx-auto max-w-2xl px-4 py-6 pb-24 md:py-10 md:pb-10">

                {/* ─── Brand Hero Block ─── */}
                <div className="mb-6 rounded-3xl border border-white/50 bg-white/40 p-6 backdrop-blur-xl shadow-lg">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4A3B32] text-[#D4B895] shadow-lg">
                            <Coffee className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <div>
                            <h1 className="text-xl font-black tracking-tight uppercase text-[#4A3B32]">Aroma Corner</h1>
                            <p className="text-xs text-[#6f4f3b]">Specialty coffee, delivered fresh</p>
                        </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[#5d3e2c]/90">
                        Specialty coffee for slow mornings and bold afternoons.
                        We roast in small batches and ship fresh to your door —
                        because every cup deserves to be extraordinary.
                    </p>
                </div>

                {/* ─── Quick Links Section ─── */}
                <section className="mb-6" aria-labelledby="more-quicklinks-heading">
                    <SectionHeader>
                        <span id="more-quicklinks-heading">Quick Links</span>
                    </SectionHeader>
                    <div className="overflow-hidden rounded-2xl border border-white/50 shadow-md">
                        {quickLinks.map((item) => (
                            <NavRow
                                key={item.name}
                                to={item.path}
                                icon={item.icon}
                                label={item.name}
                            />
                        ))}
                    </div>
                </section>

                {/* ─── Categories Section ─── */}
                <section className="mb-6" aria-labelledby="more-categories-heading">
                    <SectionHeader>
                        <span id="more-categories-heading">Shop</span>
                    </SectionHeader>
                    <div className="overflow-hidden rounded-2xl border border-white/50 shadow-md">
                        {categories.map((item) => (
                            <NavRow
                                key={item.name}
                                to={item.path}
                                icon={item.icon}
                                label={item.name}
                            />
                        ))}
                    </div>
                </section>

                {/* ─── Get in Touch Section ─── */}
                <section className="mb-6" aria-labelledby="more-contact-heading">
                    <SectionHeader>
                        <span id="more-contact-heading">Get in Touch</span>
                    </SectionHeader>
                    <div className="overflow-hidden rounded-2xl border border-white/50 shadow-md">
                        <ExternalRow
                            href="https://maps.google.com"
                            icon={MapPin}
                            label="Downtown Roastery"
                            display="Cairo, Egypt"
                        />
                        {socials.map((s) => (
                            <ExternalRow
                                key={s.label}
                                href={s.href}
                                icon={s.icon}
                                label={s.label}
                                display={s.display}
                            />
                        ))}
                    </div>
                </section>

                {/* ─── Account Quick Access (mobile-only nicety) ─── */}
                <section className="mb-6" aria-labelledby="more-account-heading">
                    <SectionHeader>
                        <span id="more-account-heading">Account</span>
                    </SectionHeader>
                    <div className="overflow-hidden rounded-2xl border border-white/50 shadow-md">
                        <NavRow to="/login" icon={User} label="Login / Register" />
                        <NavRow to="/cart" icon={ShoppingBag} label="View Cart" />
                    </div>
                </section>

                {/* ─── Legal Section ─── */}
                <section className="mb-6" aria-labelledby="more-legal-heading">
                    <SectionHeader>
                        <span id="more-legal-heading">Legal</span>
                    </SectionHeader>
                    <div className="overflow-hidden rounded-2xl border border-white/50 shadow-md">
                        {legalLinks.map((item) => (
                            <NavRow
                                key={item.name}
                                to={item.path}
                                icon={item.icon}
                                label={item.name}
                            />
                        ))}
                    </div>
                </section>

                {/* ─── Footer Note ─── */}
                <div className="mt-8 flex flex-col items-center gap-2 text-center">
                    <p className="flex items-center gap-1.5 text-xs text-[#6f503d]">
                        © 2026 Aroma Corner. Crafted with
                        <Heart className="inline h-3 w-3 text-[#b5544a]" aria-hidden="true" />
                        in Cairo
                    </p>
                    <p className="text-[10px] text-[#6f503d]/60">Freshly roasted. Delivered to your door.</p>
                </div>
            </div>
        </main>
    );
}