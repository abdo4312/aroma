import { useMemo, useState } from 'react'
import { cn } from '@/shared/utils/cn'

const categories = [
  'All',
  'Single Origin',
  'Espresso Blend',
  'Dark Roast',
  'Season Offers',
] as const

const viewModes = ['All Ads', 'Best Sellers'] as const

type BeansCategory = (typeof categories)[number]
type ViewMode = (typeof viewModes)[number]

interface BeanAd {
  id: string
  title: string
  description: string
  price: string
  category: Exclude<BeansCategory, 'All'>
  image: string
  cta: string
  isBestSeller: boolean
}

const beanAds: BeanAd[] = [
  {
    id: 'beans-ethiopian-bloom',
    title: 'Ethiopian Bloom - 250g',
    description: 'Fruity beans with floral notes and balanced acidity for daily brewing.',
    price: '289 SAR',
    category: 'Single Origin',
    image:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80',
    cta: 'Buy Now',
    isBestSeller: true,
  },
  {
    id: 'beans-colombia-caramel',
    title: 'Colombia Caramel Notes',
    description: 'Smooth body with caramel and milk chocolate notes, suitable for espresso.',
    price: '269 SAR',
    category: 'Espresso Blend',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    cta: 'Add to Cart',
    isBestSeller: true,
  },
  {
    id: 'beans-night-roast',
    title: 'Night Roast - Dark Blend',
    description: 'Dark roast with concentrated cocoa flavor and a light smoky touch.',
    price: '255 SAR',
    category: 'Dark Roast',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    cta: 'Try Now',
    isBestSeller: false,
  },
  {
    id: 'beans-house-espresso',
    title: 'House Espresso Signature',
    description: 'Balanced blend with stable crema, perfect for latte and cappuccino.',
    price: '299 SAR',
    category: 'Espresso Blend',
    image:
      'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=80',
    cta: 'Details',
    isBestSeller: true,
  },
  {
    id: 'beans-kenya-bright',
    title: 'Kenya Bright Berry',
    description: 'Clear berry notes and a clean finish for specialty coffee lovers.',
    price: '315 SAR',
    category: 'Single Origin',
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80',
    cta: 'Buy Now',
    isBestSeller: false,
  },
  {
    id: 'beans-weekend-offer',
    title: 'Weekend Beans Bundle',
    description: 'Seasonal offer: 3 diverse bags with a special limited-time discount.',
    price: '699 SAR',
    category: 'Season Offers',
    image:
      'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1200&q=80',
    cta: 'View Offer',
    isBestSeller: true,
  },
]

export function AdsPage() {
  const [activeCategory, setActiveCategory] = useState<BeansCategory>('All')
  const [activeViewMode, setActiveViewMode] = useState<ViewMode>('All Ads')

  const filteredAds = useMemo(() => {
    let ads = beanAds

    if (activeCategory !== 'All') {
      ads = ads.filter((ad) => ad.category === activeCategory)
    }

    if (activeViewMode === 'Best Sellers') {
      ads = ads.filter((ad) => ad.isBestSeller)
    }

    return ads
  }, [activeCategory, activeViewMode])

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_18%_18%,#fff9f3_0%,#f8e8d8_34%,#edd8c4_64%,#dfc7b3_100%)] text-[#2e1a12]">
      <div className="coffee-blob coffee-blob-a" />
      <div className="coffee-blob coffee-blob-b" />
      <div className="coffee-blob coffee-blob-c" />

      <div
        className="liquid-blob absolute left-[7%] top-24 h-44 w-44 bg-[#cb7f4c]/35"
        style={{ ['--blob-duration' as string]: '22s', ['--blob-delay' as string]: '-7s' }}
      />
      <div
        className="liquid-blob absolute bottom-20 right-[8%] h-56 w-56 bg-[#8f5a3d]/32"
        style={{ ['--blob-duration' as string]: '26s', ['--blob-delay' as string]: '-10s' }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 md:gap-8 md:px-8 md:py-14">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/45 bg-white/24 p-1 shadow-[0_28px_80px_-40px_rgba(62,35,22,0.8)] backdrop-blur-xl">
          <div className="coffee-hero-gradient absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.6),transparent_58%)]" />

          <div className="relative rounded-[1.7rem] bg-[linear-gradient(125deg,rgba(255,255,255,0.62),rgba(255,255,255,0.18))] px-6 py-12 text-center md:px-10 md:py-16">
            <p className="mb-4 inline-flex rounded-full border border-white/50 bg-white/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#5d3a27]">
              Beans Promotion Hub
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">Premium Promotions</h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-[#5c3b2a] md:text-base">
              The best specialty coffee bean offers with premium choices for espresso and pour-over.
            </p>
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-white/45 bg-white/24 p-4 shadow-[0_22px_60px_-40px_rgba(70,42,28,0.82)] backdrop-blur-xl md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d4a35]">
                Filter by Category
              </span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300',
                    activeCategory === category
                      ? 'border-[#7a4d35] bg-[#5f3a26] text-[#fff3e6] shadow-[0_10px_24px_-12px_rgba(70,41,26,0.85)]'
                      : 'border-white/55 bg-white/42 text-[#583827] hover:-translate-y-0.5 hover:bg-white/62',
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="inline-flex rounded-full border border-white/55 bg-white/40 p-1">
              {viewModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveViewMode(mode)}
                  className={cn(
                    'rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 md:text-sm',
                    activeViewMode === mode
                      ? 'bg-[#6d4330] text-[#fff3e6] shadow-[0_10px_22px_-12px_rgba(65,38,24,0.88)]'
                      : 'text-[#5e3c2b] hover:bg-white/70',
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredAds.map((ad) => (
            <article
              key={ad.id}
              className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/28 shadow-[0_20px_55px_-42px_rgba(70,42,29,0.88)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_34px_90px_-38px_rgba(86,45,24,0.72)]"
            >
              <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(255,222,189,0.75),transparent_62%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative h-56 overflow-hidden">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#23140e]/70 via-[#23140e]/15 to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full border border-white/40 bg-[#2f1f16]/55 px-3 py-1 text-[11px] font-semibold text-[#f8e7d4] backdrop-blur-md">
                    {ad.category}
                  </span>
                  {ad.isBestSeller && (
                    <span className="rounded-full border border-[#ffe0bf]/65 bg-[#f5c08d]/45 px-3 py-1 text-[11px] font-semibold text-[#3f2416] backdrop-blur-md">
                      Best Seller
                    </span>
                  )}
                </div>
              </div>

              <div className="relative space-y-3 p-5">
                <h2 className="text-xl font-bold text-[#402518]">{ad.title}</h2>
                <p className="text-sm leading-relaxed text-[#6f4f3b]">{ad.description}</p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-2xl font-bold text-[#30190f]">{ad.price}</span>
                  <button className="rounded-xl bg-[#5b3623] px-4 py-2 text-xs font-semibold text-[#fff3e6] transition-all duration-300 hover:bg-[#452919] hover:shadow-[0_12px_24px_-12px_rgba(57,33,22,0.85)]">
                    {ad.cta}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
