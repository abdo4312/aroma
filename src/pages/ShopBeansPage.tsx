import { useSearchParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useProducts } from '@/features/products/useProducts'
import { ProductCard } from '@/features/products/ProductCard'
import {
    Search,
    ChevronDown,
    Check,
    Coffee,
    X,
    PackageSearch,
    SlidersHorizontal,
    RotateCcw,
    Sparkles,
    Flame,
    Sun,
    Sunset,
    Snowflake,
    Globe2,
    Tag,
    ArrowRight,
    Leaf,
    Clock,
    ChevronRight,
    Star,
    Truck,
    Shield,
} from 'lucide-react'
import type { Product, SortOption } from '@/shared/types/product.types'

/* ───────── Types ───────── */

type RoastFilter = 'all' | 'light' | 'medium' | 'dark' | 'cold-brew'
type PriceRange = 'all' | 'under-50' | '50-70' | 'above-70'

/* ───────── Constants ───────── */

const ITEMS_PER_PAGE = 6

/* ───────── Data ───────── */

const categoryInfo: Record<string, { title: string; description: string; icon: typeof Coffee }> = {
    'Single-Origin Beans': {
        title: 'Single-Origin Beans',
        description: 'Complex notes from seasonal farm lots. Explore unique flavors from around the world.',
        icon: Globe2,
    },
    'Espresso Blends': {
        title: 'Espresso Blends',
        description: 'Balanced body with caramel sweetness. Perfect for your espresso machine.',
        icon: Flame,
    },
    'Cold Brew Kits': {
        title: 'Cold Brew Kits',
        description: 'Smooth extraction for iced coffee lovers. Pre-ground for optimal cold extraction.',
        icon: Snowflake,
    },
}

const roastOptions: { value: RoastFilter; label: string; icon: typeof Sun }[] = [
    { value: 'all', label: 'All Roasts', icon: Coffee },
    { value: 'light', label: 'Light Roast', icon: Sun },
    { value: 'medium', label: 'Medium Roast', icon: Sunset },
    { value: 'dark', label: 'Dark Roast', icon: Flame },
    { value: 'cold-brew', label: 'Cold Brew', icon: Snowflake },
]

const priceOptions: { value: PriceRange; label: string }[] = [
    { value: 'all', label: 'All Prices' },
    { value: 'under-50', label: 'Under 50 SAR' },
    { value: '50-70', label: '50 – 70 SAR' },
    { value: 'above-70', label: 'Above 70 SAR' },
]

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low → High' },
    { value: 'price-desc', label: 'Price: High → Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'name', label: 'Name: A → Z' },
]

const uniqueOrigins = [
    'Colombia', 'Ethiopia', 'Kenya', 'Brazil',
    'Indonesia', 'Guatemala', 'Peru', 'Honduras',
]

/* ───────── Sub-components ───────── */

function FilterChip({
    active,
    onClick,
    children,
}: {
    active: boolean
    onClick: () => void
    children: React.ReactNode
}) {
    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${active
                ? 'border-[#5f3a26]/40 bg-[#5f3a26]/12 text-[#3f2518] shadow-[0_4px_16px_-6px_rgba(95,58,38,0.3)]'
                : 'border-white/45 bg-white/25 text-[#6B4423]/80 backdrop-blur-md hover:bg-white/40 hover:border-white/60'
                }`}
        >
            {children}
        </button>
    )
}

function FilterRadio({
    selected,
    onClick,
    children,
}: {
    selected: boolean
    onClick: () => void
    children: React.ReactNode
}) {
    return (
        <button
            onClick={onClick}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200 ${selected
                ? 'bg-[#5f3a26]/10 text-[#3f2518] font-medium'
                : 'text-[#6B4423]/75 hover:bg-white/35'
                }`}
        >
            <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${selected ? 'border-[#5f3a26] bg-[#5f3a26]' : 'border-[#8c6239]/35'
                    }`}
            >
                {selected && <Check className="h-2.5 w-2.5 text-white" />}
            </span>
            {children}
        </button>
    )
}

/* ───────── Main Component ───────── */

export function ShopBeansPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isFiltersOpen, setIsFiltersOpen] = useState(false)

    const categoryFromUrl = searchParams.get('category') || ''
    const searchQuery = searchParams.get('search') || ''
    const roastFilter = (searchParams.get('roast') as RoastFilter) || 'all'
    const priceRange = (searchParams.get('price') as PriceRange) || 'all'
    const originFilter = searchParams.get('origin') || 'all'
    const sortBy = (searchParams.get('sort') as SortOption) || 'newest'
    const currentPage = Number(searchParams.get('page')) || 1

    /* ───── URL Param Helpers ───── */

    const updateParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        if (value && value !== 'all') {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        if (key !== 'page') {
            params.set('page', '1')
        }
        setSearchParams(params, { replace: true })
    }

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams)
        if (page > 1) {
            params.set('page', String(page))
        } else {
            params.delete('page')
        }
        setSearchParams(params, { replace: true })
        document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const resetFilters = () => setSearchParams({}, { replace: true })

    /* ───── Data ───── */

    const { products, isLoading, isFetching, error } = useProducts()

    /* ───── Client-Side Filtering & Sorting ───── */

    const filteredProducts = useMemo(() => {
        let result = [...products]

        if (categoryFromUrl) {
            result = result.filter((p) => p.subCategory === categoryFromUrl)
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase()
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.description?.toLowerCase().includes(q) ||
                    p.origin?.toLowerCase().includes(q) ||
                    p.flavorNotes?.some((n) => n.toLowerCase().includes(q))
            )
        }

        if (roastFilter !== 'all') {
            result = result.filter((p) => p.roastLevel === roastFilter)
        }

        if (priceRange !== 'all') {
            result = result.filter((p) => {
                const price = p.price
                if (priceRange === 'under-50') return price < 50
                if (priceRange === '50-70') return price >= 50 && price <= 70
                if (priceRange === 'above-70') return price > 70
                return true
            })
        }

        if (originFilter !== 'all') {
            result = result.filter((p) => p.origin === originFilter)
        }

        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price)
                break
            case 'price-desc':
                result.sort((a, b) => b.price - a.price)
                break
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name))
                break
            case 'rating':
                result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
                break
            case 'newest':
            default:
                break
        }

        return result
    }, [products, categoryFromUrl, searchQuery, roastFilter, priceRange, originFilter, sortBy])

    /* ───── Pagination ───── */

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE))

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE
        const end = start + ITEMS_PER_PAGE
        return filteredProducts.slice(start, end)
    }, [filteredProducts, currentPage])

    const safeCurrentPage = Math.min(currentPage, totalPages)

    /* ───── Derived State ───── */

    const activeFiltersCount = [
        roastFilter !== 'all',
        originFilter !== 'all',
        priceRange !== 'all',
        searchQuery !== '',
        !!categoryFromUrl,
    ].filter(Boolean).length

    const currentCategory = categoryFromUrl && categoryInfo[categoryFromUrl]
        ? categoryInfo[categoryFromUrl]
        : null

    const CategoryIcon = currentCategory?.icon ?? Sparkles

    /* ───── Helpers ───── */

    const getPageNumbers = (): (number | 'dots')[] => {
        const pages: (number | 'dots')[] = []

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            pages.push(1)
            if (safeCurrentPage > 3) pages.push('dots')
            for (
                let i = Math.max(2, safeCurrentPage - 1);
                i <= Math.min(totalPages - 1, safeCurrentPage + 1);
                i++
            ) {
                pages.push(i)
            }
            if (safeCurrentPage < totalPages - 2) pages.push('dots')
            pages.push(totalPages)
        }

        return pages
    }

    return (
        <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_15%,#fff8f1_0%,#f9e8d8_35%,#efdac7_65%,#e3ccb8_100%)] text-[#2e1a12]">

            {/* Background Blobs */}
            <div className="coffee-blob coffee-blob-a" />
            <div className="coffee-blob coffee-blob-b" />
            <div className="coffee-blob coffee-blob-d" />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">

                {/* ══════════════════════════════════════════════════
                    HERO BANNER — With Image
                ══════════════════════════════════════════════════ */}
                <section className="beans-hero group relative mb-10 overflow-hidden rounded-[2rem] border border-white/45 bg-white/22 p-1 shadow-[0_28px_80px_-38px_rgba(59,34,19,0.7)] backdrop-blur-xl">

                    {/* Gradient Overlay */}
                    <div className="coffee-hero-gradient absolute inset-0" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.55),transparent_55%)]" />

                    {/* Gold Shimmer on Hover */}
                    <div className="beans-shimmer-sweep absolute inset-0 z-10 pointer-events-none" />

                    {/* Inner Content */}
                    <div className="relative z-20 overflow-hidden rounded-[1.7rem] bg-[linear-gradient(125deg,rgba(255,255,255,0.6),rgba(255,255,255,0.16))]">

                        {/* Two-Column Grid: Image + Text */}
                        <div className="grid md:grid-cols-[1fr_1.2fr]">

                            {/* ── Left: Hero Image ── */}
                            <div className="relative min-h-[320px] md:min-h-[480px]">
                                <img
                                    src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80"
                                    alt="Freshly roasted coffee beans"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/30 md:to-[rgba(255,255,255,0.7)]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent md:hidden" />

                                {/* Floating Badge on Image */}
                                <div className="beans-badge-1 absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-white/75 px-4 py-2.5 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#5d3a27] text-[#fff2e2]">
                                        <Leaf className="h-4 w-4" />
                                    </span>
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7c5a45]">100%</p>
                                        <p className="text-xs font-bold text-[#3f2518]">Organic</p>
                                    </div>
                                </div>

                                {/* Rating Badge on Image */}
                                <div className="beans-badge-2 absolute top-6 right-6 inline-flex items-center gap-1.5 rounded-xl border border-white/60 bg-white/75 px-3 py-2 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    <span className="text-sm font-bold text-[#3f2518]">4.9</span>
                                    <span className="text-[10px] text-[#7c5a45]">(2.4k)</span>
                                </div>
                            </div>

                            {/* ── Right: Text Content ── */}
                            <div className="flex flex-col justify-center p-8 md:p-12">

                                {/* Category Badge */}
                                <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/50 bg-white/40 px-4 py-1.5 backdrop-blur-md">
                                    <CategoryIcon className="h-4 w-4 text-[#8c6239]" />
                                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5d3a27]">
                                        {currentCategory ? currentCategory.title : 'Premium Selection'}
                                    </span>
                                </div>

                                {/* Headline */}
                                <h1 className="mb-4 text-3xl font-bold leading-tight text-[#3f2518] md:text-5xl lg:text-[3.4rem]">
                                    {currentCategory ? currentCategory.title : 'Shop Signature'}
                                    <span className="beans-gradient-text block bg-gradient-to-r from-[#5d3a27] via-[#8c5c3e] to-[#c4956a] bg-clip-text text-transparent">
                                        {currentCategory ? '' : 'Coffee Beans'}
                                    </span>
                                </h1>

                                {/* Description */}
                                <p className="mb-7 max-w-md text-sm text-[#5c3b2a]/90 md:text-base">
                                    {currentCategory
                                        ? currentCategory.description
                                        : 'Curated from the world\'s finest farms. Small-batch roasted for peak flavor — delivered fresh to your door.'}
                                </p>

                                {/* CTA Buttons */}
                                <div className="mb-7 flex flex-wrap items-center gap-3">
                                    <a
                                        href="#products-grid"
                                        className="inline-flex items-center gap-2 rounded-xl bg-[#5d3a27] px-7 py-3 text-sm font-semibold text-[#fff8f1] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4a2e1f] hover:shadow-[0_10px_25px_-8px_rgba(54,31,21,0.7)]"
                                    >
                                        Explore Beans
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                    <button
                                        onClick={resetFilters}
                                        className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/35 px-7 py-3 text-sm font-semibold text-[#4a2e1f] backdrop-blur-md transition-all duration-300 hover:bg-white/55"
                                    >
                                        View All
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Trust Row */}
                                <div className="flex flex-wrap items-center gap-5">
                                    {[
                                        { icon: Truck, label: 'Free Shipping', sub: 'Orders 100+ SAR' },
                                        { icon: Shield, label: 'Quality', sub: 'Guaranteed' },
                                        { icon: Clock, label: 'Freshness', sub: '48h Roasted' },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center gap-2.5">
                                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5f3a26]/8 text-[#8c6239]">
                                                <item.icon className="h-4 w-4" />
                                            </span>
                                            <div>
                                                <p className="text-xs font-bold text-[#3f2518]">{item.label}</p>
                                                <p className="text-[10px] text-[#7c5a45]/70">{item.sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════ Controls Bar ══════════ */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c6239]/55" />
                        <input
                            type="text"
                            placeholder="Search beans, origins, flavors…"
                            value={searchQuery}
                            onChange={(e) => updateParam('search', e.target.value)}
                            className="w-full rounded-2xl border border-white/40 bg-white/30 py-3 pl-11 pr-4 text-sm text-[#3f2518] placeholder:text-[#8c6239]/45 focus:border-[#8c6239]/40 focus:outline-none focus:ring-2 focus:ring-[#8c6239]/15 backdrop-blur-xl transition-all duration-300"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => updateParam('search', '')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#8c6239]/50 hover:bg-white/30 hover:text-[#5f3a26] transition-colors"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Right controls — wraps on narrow mobile screens to prevent overflow */}
                    <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
                        <button
                            onClick={() => setIsFiltersOpen(true)}
                            className="flex items-center gap-2 rounded-xl border border-white/50 bg-white/30 px-4 py-2.5 text-sm font-medium text-[#412619] backdrop-blur-xl transition-all duration-300 hover:bg-white/45 md:hidden"
                            aria-label="Open filters"
                            aria-expanded={isFiltersOpen}
                            aria-controls="filters-sidebar"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            Filters
                            {activeFiltersCount > 0 && (
                                <span className="rounded-full bg-[#5f3a26] px-2 py-0.5 text-[10px] font-bold text-white">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>

                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => updateParam('sort', e.target.value)}
                                className="appearance-none rounded-xl border border-white/50 bg-white/30 px-4 py-2.5 pr-10 text-sm font-medium text-[#412619] backdrop-blur-xl transition-all duration-300 hover:bg-white/45 focus:outline-none focus:ring-2 focus:ring-[#8c6239]/15 cursor-pointer"
                            >
                                {sortOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c6239]/60" />
                        </div>

                        {activeFiltersCount > 0 && (
                            <button
                                onClick={resetFilters}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-[#8c6239]/25 bg-white/25 px-4 py-2.5 text-sm font-medium text-[#5f3a26] backdrop-blur-md transition-all duration-300 hover:bg-[#8c6239]/8"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* ══════════ Roast Quick Chips ══════════ */}
                <div className="mb-8 flex flex-wrap gap-2">
                    {roastOptions.map((roast) => (
                        <FilterChip
                            key={roast.value}
                            active={roastFilter === roast.value}
                            onClick={() => updateParam('roast', roast.value)}
                        >
                            <roast.icon className="h-3.5 w-3.5" />
                            {roast.label}
                        </FilterChip>
                    ))}
                </div>

                {/* ══════════ Main Content ══════════ */}
                <div id="products-grid" className="flex gap-8">

                    {/* ═══ Mobile Filter Backdrop ═══ */}
                    {isFiltersOpen && (
                        <div
                            className="fixed inset-0 z-40 bg-[#2e1a12]/50 backdrop-blur-sm md:hidden"
                            onClick={() => setIsFiltersOpen(false)}
                            aria-hidden="true"
                        />
                    )}

                    {/* Filter Sidebar — React-driven (was using DOM classList.toggle) */}
                    <aside
                        id="filters-sidebar"
                        className={`absolute left-0 right-0 top-0 z-50 rounded-3xl bg-[#FAF7F2]/98 p-6 backdrop-blur-2xl transition-transform duration-300 md:static md:block md:w-64 md:bg-transparent md:p-0 md:backdrop-blur-none md:transition-none ${isFiltersOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                            }`}
                        aria-hidden={!isFiltersOpen && window.innerWidth < 768}
                    >
                        <div className="mb-5 flex items-center justify-between md:hidden">
                            <h3 className="text-lg font-semibold text-[#3f2518]">Filters</h3>
                            <button
                                onClick={() => setIsFiltersOpen(false)}
                                className="rounded-full p-1 hover:bg-[#8c6239]/10"
                                aria-label="Close filters"
                            >
                                <X className="h-5 w-5 text-[#412619]" />
                            </button>
                        </div>

                        <div className="space-y-1 rounded-[1.5rem] border border-white/40 bg-white/22 p-5 backdrop-blur-xl shadow-[0_20px_60px_-25px_rgba(72,45,32,0.5)]">
                            <div className="pb-4">
                                <h4 className="mb-2.5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7a5a46]">
                                    <Tag className="h-3 w-3" />
                                    Price Range
                                </h4>
                                <div className="space-y-1">
                                    {priceOptions.map((opt) => (
                                        <FilterRadio
                                            key={opt.value}
                                            selected={priceRange === opt.value}
                                            onClick={() => updateParam('price', opt.value)}
                                        >
                                            {opt.label}
                                        </FilterRadio>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-white/30" />

                            <div className="pt-4">
                                <h4 className="mb-2.5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7a5a46]">
                                    <Globe2 className="h-3 w-3" />
                                    Origin
                                </h4>
                                <div className="max-h-44 space-y-1 overflow-y-auto pr-1 scrollbar-thin">
                                    <FilterRadio
                                        selected={originFilter === 'all'}
                                        onClick={() => updateParam('origin', 'all')}
                                    >
                                        All Origins
                                    </FilterRadio>
                                    {uniqueOrigins.map((origin) => (
                                        <FilterRadio
                                            key={origin}
                                            selected={originFilter === origin}
                                            onClick={() => updateParam('origin', origin)}
                                        >
                                            {origin}
                                        </FilterRadio>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <section className="flex-1">

                        <div className="mb-5 flex items-center justify-between">
                            <p className="text-sm text-[#6B4423]/65">
                                {isLoading || isFetching ? (
                                    <span className="animate-pulse">Loading products…</span>
                                ) : (
                                    <>
                                        Showing{' '}
                                        <span className="font-semibold text-[#3f2518]">{paginatedProducts.length}</span>
                                        {' '}of{' '}
                                        <span className="font-semibold text-[#3f2518]">{filteredProducts.length}</span>
                                        {' '}products
                                    </>
                                )}
                            </p>
                            {isFetching && !isLoading && (
                                <span className="text-[10px] font-medium uppercase tracking-wider text-[#8c6239]/50">
                                    Updating…
                                </span>
                            )}
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="beans-skeleton h-80 rounded-3xl bg-white/25 backdrop-blur-sm animate-pulse" />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center rounded-[2rem] border border-white/40 bg-white/22 py-20 text-center backdrop-blur-xl">
                                <div className="mb-5 rounded-2xl border border-red-200/50 bg-red-50/60 p-5 backdrop-blur-md">
                                    <PackageSearch className="h-10 w-10 text-red-400" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-[#3f2518]">Error loading products</h3>
                                <p className="mb-6 text-sm text-[#6B4423]/60">Please try again or check your internet connection</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="rounded-xl bg-[#5f3a26] px-7 py-3 text-sm font-semibold text-[#fff8f1] shadow-[0_8px_25px_-8px_rgba(95,58,38,0.6)] transition-all duration-300 hover:bg-[#4c2d1e] hover:-translate-y-0.5"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-[2rem] border border-white/40 bg-white/22 py-20 text-center backdrop-blur-xl">
                                <div className="mb-5 rounded-2xl border border-[#8c6239]/20 bg-[#8c6239]/8 p-5 backdrop-blur-md">
                                    <Coffee className="h-10 w-10 text-[#8c6239]/50" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-[#3f2518]">No beans found</h3>
                                <p className="mb-6 text-sm text-[#6B4423]/60">Try adjusting your filters or search query</p>
                                <button
                                    onClick={resetFilters}
                                    className="rounded-xl bg-[#5f3a26] px-7 py-3 text-sm font-semibold text-[#fff8f1] shadow-[0_8px_25px_-8px_rgba(95,58,38,0.6)] transition-all duration-300 hover:bg-[#4c2d1e] hover:-translate-y-0.5"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {paginatedProducts.map((product: Product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* ══════════ Pagination ══════════ */}
                                {totalPages > 1 && (
                                    <nav className="mt-10 flex items-center justify-center gap-2">
                                        {/* Prev Button */}
                                        <button
                                            disabled={safeCurrentPage <= 1}
                                            onClick={() => goToPage(safeCurrentPage - 1)}
                                            className="flex h-10 items-center gap-1.5 rounded-xl border border-white/45 bg-white/25 px-4 text-sm font-medium text-[#5d3a27] backdrop-blur-md transition-all duration-300 hover:bg-white/40 active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed"
                                        >
                                            Prev
                                        </button>

                                        {/* Page Numbers */}
                                        {getPageNumbers().map((page, idx) =>
                                            page === 'dots' ? (
                                                <span
                                                    key={`dots-${idx}`}
                                                    className="flex h-10 w-10 items-center justify-center text-sm text-[#5d3a27]/40"
                                                >
                                                    …
                                                </span>
                                            ) : (
                                                <button
                                                    key={page}
                                                    onClick={() => goToPage(page)}
                                                    className={`h-10 w-10 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-95 ${page === safeCurrentPage
                                                        ? 'bg-[#5f3a26] text-white shadow-[0_6px_20px_-6px_rgba(95,58,38,0.5)]'
                                                        : 'border border-white/45 bg-white/25 text-[#5d3a27] backdrop-blur-md hover:bg-white/40'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        )}

                                        {/* Next Button */}
                                        <button
                                            disabled={safeCurrentPage >= totalPages}
                                            onClick={() => goToPage(safeCurrentPage + 1)}
                                            className="flex h-10 items-center gap-1.5 rounded-xl border border-white/45 bg-white/25 px-4 text-sm font-medium text-[#5d3a27] backdrop-blur-md transition-all duration-300 hover:bg-white/40 active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </nav>
                                )}
                            </>
                        )}
                    </section>
                </div>
            </div>
        </main>
    )
}