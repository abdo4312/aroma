import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    Coffee,
    Search,
    Star,
    X,
    ChevronRight,
    ChevronLeft,
    Thermometer,
    Wind,
    Flame,
    Clock,
    Shield,
    Truck,
    ArrowRight,
    Package,
    Sparkles,
    SlidersHorizontal,
    RotateCcw,
} from 'lucide-react';
import { allProducts } from '@/shared/data/products';
import { cn } from '@/shared/utils/cn';
import { ProductCard } from '@/features/products/ProductCard';

/* ───────── Helpers ───────── */

// NOTE: Equipment-specific display names are now owned by ProductCard
// (variant="equipment"). This map is kept here ONLY for the page-level
// category filter UI (sidebar chips + headings), which doesn't belong
// inside the card itself.
const categoryDisplayNames: Record<string, string> = {
    stovetop: 'Stovetop',
    immersion: 'Immersion',
    'pour-over': 'Pour Over',
    pressure: 'Pressure',
    'cold-brew-maker': 'Cold Brew',
    grinders: 'Grinders',
    kettles: 'Kettles',
    accessories: 'Accessories',
    'brewing-tools': 'Brewing Tools',
};

const categoryIcons: Record<string, typeof Coffee> = {
    Stovetop: Flame,
    Immersion: Coffee,
    'Pour Over': Package,
    Pressure: Wind,
    'Cold Brew': Sparkles,
    Grinders: Thermometer,
    Kettles: Flame,
    Accessories: SlidersHorizontal,
    All: Coffee,
};

const ITEMS_PER_PAGE = 6;

/* ───────── Sub-components ───────── */

function CategoryChip({
    active,
    onClick,
    children,
    icon: Icon,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    icon?: typeof Coffee;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={cn(
                'inline-flex items-center gap-2 whitespace-nowrap rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-300',
                active
                    ? 'border-coffee-700/40 bg-coffee-700/12 text-coffee-900 shadow-[0_4px_16px_-6px_rgba(95,58,38,0.3)]'
                    : 'border-white/45 bg-white/25 text-coffee-600/80 backdrop-blur-md hover:bg-white/40 hover:border-white/60'
            )}
        >
            {Icon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
            {children}
        </button>
    );
}

/* ───────── Pagination Helper ───────── */

function getPageNumbers(current: number, total: number): (number | 'dots')[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: (number | 'dots')[] = [1];
    if (current > 3) pages.push('dots');

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 2) pages.push('dots');
    pages.push(total);

    return pages;
}

/* ───────── Main Component ───────── */

export function EquipmentPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Filter equipment products from shared data
    const equipmentProducts = useMemo(
        () => allProducts.filter((p) => p.productType === 'equipment'),
        []
    );

    // Derive categories from products
    const categories = useMemo(() => {
        const cats = Array.from(
            new Set(
                equipmentProducts.map((p) => p.subCategory || p.category).filter(Boolean)
            )
        );
        return ['All', ...cats];
    }, [equipmentProducts]);

    // Filter products
    const filteredProducts = useMemo(() => {
        return equipmentProducts.filter((p) => {
            const matchesCategory =
                activeCategory === 'All' ||
                p.subCategory === activeCategory ||
                p.category === activeCategory;
            const matchesSearch =
                !searchQuery ||
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.subCategory?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [equipmentProducts, activeCategory, searchQuery]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const paginatedProducts = useMemo(() => {
        const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProducts, safeCurrentPage]);

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset page when filters change
    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setCurrentPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const clearAllFilters = () => {
        setActiveCategory('All');
        setSearchQuery('');
        setCurrentPage(1);
    };

    return (
        <main
            className="relative isolate min-h-screen overflow-hidden bg-coffee-radial text-coffee-950"
            aria-label="Brew gear and equipment page"
        >

            {/* Background Blobs */}
            <div className="coffee-blob coffee-blob-a" aria-hidden="true" />
            <div className="coffee-blob coffee-blob-b" aria-hidden="true" />
            <div className="coffee-blob coffee-blob-d" aria-hidden="true" />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">

                {/* ══════════════════════════════════════════════════
                    HERO BANNER — Matching ShopBeansPage Style
                ══════════════════════════════════════════════════ */}
                <section
                    className="beans-hero group relative mb-10 overflow-hidden rounded-[2rem] border border-white/45 bg-white/22 p-1 shadow-[0_28px_80px_-38px_rgba(59,34,19,0.7)] backdrop-blur-xl"
                    aria-labelledby="equipment-hero-heading"
                >

                    {/* Gradient Overlay */}
                    <div className="coffee-hero-gradient absolute inset-0" aria-hidden="true" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.55),transparent_55%)]" aria-hidden="true" />

                    {/* Gold Shimmer on Hover */}
                    <div className="beans-shimmer-sweep absolute inset-0 z-10 pointer-events-none" aria-hidden="true" />

                    {/* Inner Content */}
                    <div className="relative z-20 overflow-hidden rounded-[1.7rem] bg-[linear-gradient(125deg,rgba(255,255,255,0.6),rgba(255,255,255,0.16))]">

                        {/* Two-Column Grid: Image + Text */}
                        <div className="grid md:grid-cols-[1fr_1.2fr]">

                            {/* ── Left: Hero Image ── */}
                            <div className="relative min-h-[320px] md:min-h-[480px]">
                                <img
                                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80"
                                    alt="Professional coffee equipment"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/30 md:to-[rgba(255,255,255,0.7)]" aria-hidden="true" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent md:hidden" aria-hidden="true" />

                                {/* Floating Badge on Image */}
                                <div className="beans-badge-1 absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-white/75 px-4 py-2.5 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-coffee-700 text-coffee-50" aria-hidden="true">
                                        <Thermometer className="h-4 w-4" />
                                    </span>
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-coffee-600">Barista</p>
                                        <p className="text-xs font-bold text-coffee-900">Grade Tools</p>
                                    </div>
                                </div>

                                {/* Rating Badge on Image */}
                                <div className="beans-badge-2 absolute top-6 right-6 inline-flex items-center gap-1.5 rounded-xl border border-white/60 bg-white/75 px-3 py-2 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                                    <span className="text-sm font-bold text-coffee-900">4.9</span>
                                    <span className="text-[10px] text-coffee-600">(1.8k)</span>
                                </div>
                            </div>

                            {/* ── Right: Text Content ── */}
                            <div className="flex flex-col justify-center p-8 md:p-12">

                                {/* Category Badge */}
                                <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/50 bg-white/40 px-4 py-1.5 backdrop-blur-md">
                                    <Coffee className="h-4 w-4 text-coffee-500" aria-hidden="true" />
                                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee-700">Equipment</span>
                                </div>

                                {/* Headline */}
                                <h1
                                    id="equipment-hero-heading"
                                    className="mb-4 text-3xl font-bold leading-tight text-coffee-900 md:text-5xl lg:text-[3.4rem]"
                                >
                                    Brew
                                    <span className="beans-gradient-text block bg-gradient-to-r from-coffee-700 via-coffee-500 to-coffee-400 bg-clip-text text-transparent">
                                        Gear &amp; Tools
                                    </span>
                                </h1>

                                {/* Description */}
                                <p className="mb-7 max-w-md text-sm text-coffee-700/90 md:text-base">
                                    From precision grinders to artisan brewers — every great cup starts with the right equipment. Find your perfect brewing companion.
                                </p>

                                {/* CTA Buttons */}
                                <div className="mb-7 flex flex-wrap items-center gap-3">
                                    <a
                                        href="#equipment-grid"
                                        className="inline-flex items-center gap-2 rounded-xl bg-coffee-700 px-7 py-3 text-sm font-semibold text-coffee-50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coffee-800 hover:shadow-[0_10px_25px_-8px_rgba(54,31,21,0.7)]"
                                        aria-label="Jump to equipment grid below"
                                    >
                                        Explore Gear
                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </a>
                                    <button
                                        type="button"
                                        onClick={clearAllFilters}
                                        className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/35 px-7 py-3 text-sm font-semibold text-coffee-800 backdrop-blur-md transition-all duration-300 hover:bg-white/55"
                                        aria-label="View all equipment — clear filters"
                                    >
                                        View All
                                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Trust Row */}
                                <div className="flex flex-wrap items-center gap-5">
                                    {[
                                        { icon: Truck, label: 'Free Shipping', sub: 'Orders 100+ SAR' },
                                        { icon: Shield, label: 'Quality', sub: 'Guaranteed' },
                                        { icon: Clock, label: 'Fast Delivery', sub: '2-3 Days' },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center gap-2.5">
                                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-coffee-700/8 text-coffee-500" aria-hidden="true">
                                                <item.icon className="h-4 w-4" />
                                            </span>
                                            <div>
                                                <p className="text-xs font-bold text-coffee-900">{item.label}</p>
                                                <p className="text-[10px] text-coffee-600/70">{item.sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════ Filters & Search ══════════ */}
                <div className="sticky top-4 z-20 mb-8">
                    <div className="rounded-2xl bg-white/50 border border-white/60 backdrop-blur-lg p-3 shadow-lg">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                            {/* Category Chips */}
                            <div
                                className="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
                                role="group"
                                aria-label="Filter equipment by category"
                            >
                                {categories.map((cat) => {
                                    const Icon = categoryIcons[categoryDisplayNames[cat] || cat];
                                    return (
                                        <CategoryChip
                                            key={cat}
                                            active={activeCategory === cat}
                                            onClick={() => handleCategoryChange(cat)}
                                            icon={Icon}
                                        >
                                            {categoryDisplayNames[cat] || cat}
                                        </CategoryChip>
                                    );
                                })}
                            </div>

                            {/* Search */}
                            <div role="search" className="relative w-full md:w-72">
                                <label htmlFor="equipment-search" className="sr-only">Search equipment</label>
                                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-coffee-500/55" aria-hidden="true" />
                                <input
                                    id="equipment-search"
                                    type="search"
                                    placeholder="Search equipment..."
                                    aria-label="Search equipment by name or category"
                                    value={searchQuery}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    className="w-full rounded-xl border border-white/40 bg-white/30 py-2.5 pl-11 pr-4 text-sm text-coffee-900 placeholder:text-coffee-500/45 focus:border-coffee-500/40 focus:outline-none focus:ring-2 focus:ring-coffee-500/15 backdrop-blur-xl transition-all duration-300"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => handleSearchChange('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-coffee-500/50 hover:bg-white/30 hover:text-coffee-700 transition-colors"
                                        aria-label="Clear search"
                                    >
                                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══════════ Results Count ══════════ */}
                <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm text-coffee-600/65" aria-live="polite">
                        Showing{' '}
                        <span className="font-semibold text-coffee-900">{filteredProducts.length}</span>{' '}
                        {filteredProducts.length === 1 ? 'item' : 'items'}
                    </p>
                    {(activeCategory !== 'All' || searchQuery) && (
                        <button
                            type="button"
                            onClick={clearAllFilters}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-coffee-500/25 bg-white/25 px-4 py-2 text-sm font-medium text-coffee-700 backdrop-blur-md transition-all duration-300 hover:bg-coffee-500/8"
                            aria-label="Clear all filters"
                        >
                            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                            Clear
                        </button>
                    )}
                </div>

                {/* ══════════ Product Grid ══════════ */}
                <div id="equipment-grid">
                    {paginatedProducts.length > 0 ? (
                        <ul
                            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0"
                            aria-label="Equipment products list"
                        >
                            {paginatedProducts.map((product) => (
                                <li key={product.id}>
                                    <ProductCard
                                        product={product}
                                        variant="equipment"
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div
                            className="flex flex-col items-center justify-center rounded-[2rem] border border-white/40 bg-white/22 py-20 text-center backdrop-blur-xl"
                            role="status"
                        >
                            <div className="mb-5 rounded-2xl border border-coffee-500/20 bg-coffee-500/8 p-5 backdrop-blur-md">
                                <Coffee className="h-10 w-10 text-coffee-500/50" aria-hidden="true" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-coffee-900">No equipment found</h3>
                            <p className="mb-6 text-sm text-coffee-600/60">Try adjusting your search or category filter</p>
                            <button
                                type="button"
                                onClick={clearAllFilters}
                                className="rounded-xl bg-coffee-700 px-7 py-3 text-sm font-semibold text-coffee-50 shadow-[0_8px_25px_-8px_rgba(95,58,38,0.6)] transition-all duration-300 hover:bg-coffee-800 hover:-translate-y-0.5"
                                aria-label="Clear all filters"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* ══════════ Pagination ══════════ */}
                    {totalPages > 1 && (
                        <nav
                            className="mt-10 flex justify-center items-center gap-2"
                            aria-label="Equipment pagination"
                        >
                            {/* Prev */}
                            <button
                                type="button"
                                disabled={safeCurrentPage <= 1}
                                onClick={() => goToPage(safeCurrentPage - 1)}
                                aria-label="Go to previous page"
                                className="h-10 rounded-xl border border-white/45 bg-white/25 px-3 text-sm font-medium text-coffee-700 backdrop-blur-md transition-all duration-300 hover:bg-white/40 disabled:opacity-35 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                                Prev
                            </button>

                            {/* Page Numbers */}
                            {getPageNumbers(safeCurrentPage, totalPages).map((p, i) =>
                                p === 'dots' ? (
                                    <span
                                        key={`dots-${i}`}
                                        className="w-10 h-10 flex items-center justify-center text-sm text-coffee-600/50"
                                        aria-hidden="true"
                                    >
                                        …
                                    </span>
                                ) : (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => goToPage(p)}
                                        aria-label={`Go to page ${p}`}
                                        aria-current={p === safeCurrentPage ? 'page' : undefined}
                                        className={cn(
                                            'h-10 w-10 rounded-xl font-medium transition-all duration-300',
                                            p === safeCurrentPage
                                                ? 'bg-coffee-700 text-white shadow-[0_6px_20px_-6px_rgba(95,58,38,0.5)]'
                                                : 'border border-white/45 bg-white/25 text-coffee-700 backdrop-blur-md hover:bg-white/40'
                                        )}
                                    >
                                        {p}
                                    </button>
                                )
                            )}

                            {/* Next */}
                            <button
                                type="button"
                                disabled={safeCurrentPage >= totalPages}
                                onClick={() => goToPage(safeCurrentPage + 1)}
                                aria-label="Go to next page"
                                className="h-10 rounded-xl border border-white/45 bg-white/25 px-3 text-sm font-medium text-coffee-700 backdrop-blur-md transition-all duration-300 hover:bg-white/40 disabled:opacity-35 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </nav>
                    )}
                </div>

                {/* ══════════ CTA Section ══════════ */}
                <div className="mt-16 p-10 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-coffee-800 to-coffee-950 text-white relative overflow-hidden shadow-2xl border border-white/10">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="space-y-5 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-black leading-tight">Professional <br />Consultation</h2>
                            <p className="text-coffee-400 max-w-md font-medium text-lg leading-relaxed">
                                Unlock the full potential of your home brewing. Our experts are ready to guide you.
                            </p>
                            <Link
                                to="/consultation"
                                className="inline-flex items-center gap-3 px-10 py-4 bg-coffee-400 text-coffee-950 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl active:scale-95"
                            >
                                Get Started
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>
                        <div className="flex gap-10 opacity-20 hidden lg:flex" aria-hidden="true">
                            <Thermometer size={100} strokeWidth={1} />
                            <Wind size={100} strokeWidth={1} />
                            <Coffee size={100} strokeWidth={1} />
                        </div>
                    </div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-coffee-500/20 rounded-full blur-3xl" aria-hidden="true" />
                </div>
            </div>
        </main>
    );
}