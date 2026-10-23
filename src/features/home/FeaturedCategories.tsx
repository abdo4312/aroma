import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { handleImageError } from '@/shared/utils/imageFallback'
import { CATEGORIES } from '@/shared/data/categories'

/**
 * FeaturedCategories
 * =================
 * Renders the 4 category cards on the home page.
 *
 * Data source: now reads from the central CATEGORIES array
 * (src/shared/data/categories.ts) instead of a local hardcoded array.
 * This means a broken image can be fixed in ONE place.
 *
 * The 4 cards we display:
 *   1. Single-Origin Beans  (subcategory of 'coffee-beans')
 *   2. Espresso Blends      (subcategory of 'coffee-beans')
 *   3. Cold Brew Kits       (subcategory of 'coffee-beans')
 *   4. Equipment            (top-level category — used as "Coffee Tools")
 */
export function FeaturedCategories() {
  const navigate = useNavigate()

  // Pick the 4 categories we want to feature on the home page.
  // We read from the central source of truth and add display-only metadata
  // (tag) that doesn't belong in the data layer.
  const featuredCategories = [
    {
      ...CATEGORIES[0].subCategories![0], // Single-Origin Beans
      tag: 'Single Origin',
    },
    {
      ...CATEGORIES[0].subCategories![1], // Espresso Blends
      tag: 'Espresso',
    },
    {
      ...CATEGORIES[0].subCategories![2], // Cold Brew Kits
      tag: 'Cold Brew',
    },
    {
      ...CATEGORIES[1], // Equipment (top-level)
      tag: 'Equipment',
    },
  ]

  return (
    <section className="rounded-[1.8rem] bg-white/20 p-6 shadow-[0_24px_70px_-45px_rgba(72,45,32,0.85)] backdrop-blur-xl md:p-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a46]">shop by mood</p>
          <h2 className="mt-2 text-3xl font-bold text-[#3f2518]">Coffee Categories</h2>
        </div>
        <span className="rounded-full bg-white/40 px-4 py-1 text-xs font-medium text-[#6a4b37]">
          Curated Picks
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {featuredCategories.map((category, i) => (
          <article
            key={category.id}
            onClick={() => navigate(category.route)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl aspect-square shadow-[0_8px_30px_-12px_rgba(72,45,32,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-16px_rgba(72,45,32,0.65)]"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={category.image}
                alt={category.name}
                onError={handleImageError}
                className="h-full w-full object-cover brightness-95 transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                loading="lazy"
              />
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[rgba(30,15,8,0.05)] via-[rgba(30,15,8,0.25)] via-40% to-[rgba(30,15,8,0.72)] transition-all duration-500 group-hover:from-[rgba(30,15,8,0.02)] group-hover:via-[rgba(30,15,8,0.18)] group-hover:via-35% group-hover:to-[rgba(30,15,8,0.62)]" />

            {/* Shimmer Sweep */}
            <div
              className="absolute top-0 left-[-150%] z-[2] h-full w-[60%] pointer-events-none mix-blend-overlay transition-[left] duration-0 group-hover:left-[200%] group-hover:duration-[850ms] group-hover:ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{
                background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.4) 70%, rgba(255,255,255,0) 100%)',
                transform: 'skewX(-25deg)',
              }}
            />

            {/* Content */}
            <div className="relative z-[3] flex h-full flex-col justify-end p-5">
              <span className="mb-2.5 w-fit rounded-full bg-white/14 px-3 py-[3px] text-[11px] font-semibold uppercase text-[rgba(255,245,232,0.85)] backdrop-blur-sm transition-all duration-400 group-hover:bg-white/22 group-hover:text-white">
                {category.tag}
              </span>
              <h3 className="text-[17px] font-bold leading-tight text-white shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all duration-400 group-hover:shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                {category.name}
              </h3>
              <p className="mt-1 max-h-0 overflow-hidden text-xs leading-snug text-[rgba(255,240,220,0.72)] opacity-0 transition-all duration-500 group-hover:mt-1.5 group-hover:max-h-[50px] group-hover:opacity-100">
                {category.description}
              </p>
            </div>

            {/* Arrow Icon */}
            <div className="absolute top-3.5 right-3.5 z-[4] flex h-8 w-8 items-center justify-center rounded-[10px] bg-white/12 text-[rgba(255,245,232,0.8)] backdrop-blur-sm opacity-0 -translate-x-2 translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-white/25">
              <ArrowUpRight className="h-4 w-4" />
            </div>

            {/* Bottom Accent Bar */}
            <div className="absolute bottom-0 left-0 z-[4] h-[3px] w-0 rounded-tr-sm bg-gradient-to-r from-[#f3b079] to-[#d9aa7b] transition-all duration-500 group-hover:w-full" />
          </article>
        ))}
      </div>
    </section>
  )
}