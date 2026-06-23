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
      <div className="coffee-blob coffee-blob-a" />
      <div className="coffee-blob coffee-blob-b" />
      <div className="coffee-blob coffee-blob-c" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-6 md:gap-20 md:px-8 md:py-10">
        <HeroBanner />
        <ScrollingMarquee />
        <FeaturedCategories />
        <FeaturedProducts />
        <HowItWorks />
        <WhyChooseUs />
        <BrewingMethods />
        <CoffeePairings />
        <CoffeeStories />
        <PromoSection />
        <Newsletter />
      </div>
    </main>
  )
}