import { HeroBanner } from '@/features/home/HeroBanner'
import { ScrollingMarquee } from '@/features/home/ScrollingMarquee'
import { FeaturedCategories } from '@/features/home/FeaturedCategories'
import { FeaturedProducts } from '@/features/home/FeaturedProducts'
import { HowItWorks } from '@/features/home/HowItWorks'
import { WhyChooseUs } from '@/features/home/WhyChooseUs'
import { BrewingMethods } from '@/features/home/BrewingMethods'
import { CoffeePairings } from '@/features/home/CoffeePairings'
import { CoffeeStories } from '@/features/home/CoffeeStories'
import { PromoSection } from '@/features/home/PromoSection'
import { Newsletter } from '@/features/home/Newsletter'

export function HomePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_20%,#fff8f1_0%,#f9e8d8_36%,#efdac7_66%,#e3ccb8_100%)] text-[#2e1a12]">
      <div className="coffee-blob coffee-blob-a" aria-hidden="true" />
      <div className="coffee-blob coffee-blob-b" aria-hidden="true" />
      <div className="coffee-blob coffee-blob-c" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-4 py-6 md:px-8 md:py-10">

        {/* ═══ Group 1: Banner + Categories (tight on mobile so both are visible) ═══ */}
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-20">
          <HeroBanner />
          <FeaturedCategories />
        </div>

        {/* ═══ Group 2: Rest of the sections (generous spacing) ═══ */}
        <div className="flex flex-col gap-16 mt-16 sm:gap-20 md:gap-20 md:mt-20">
          <ScrollingMarquee />
          <FeaturedProducts />
          <HowItWorks />
          <WhyChooseUs />
          <BrewingMethods />
          <CoffeePairings />
          <CoffeeStories />
          <PromoSection />
          <Newsletter />
        </div>
      </div>
    </main>
  )
}