import { useState, useCallback, useEffect, useRef } from 'react';
import { Quote, Star, Heart, Coffee, MapPin, Award, ChevronLeft, ChevronRight } from 'lucide-react';

interface Story {
    id: number;
    name: string;
    role: string;
    location: string;
    quote: string;
    story: string;
    image: string;
    avatar: string;
    featured: boolean;
    rating: number;
    blend: string;
    yearsCustomer: number;
}

const stories: Story[] = [
    {
        id: 1,
        name: 'Sara Al-Rashid',
        role: 'Coffee Connoisseur',
        location: 'Riyadh',
        quote: '\u201CAroma Corner transformed my mornings \u2014 their Ethiopian Yirgacheffe is unlike anything I\u2019ve ever tasted. Every sip feels like a journey.\u201D',
        story: 'I discovered Aroma Corner three years ago while searching for authentic single-origin beans in Riyadh. Their Ethiopian Yirgacheffe immediately became my daily ritual \u2014 the floral notes and citrus undertones are simply extraordinary. What keeps me coming back isn\u2019t just the coffee, but the community they\u2019ve built around it.',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
        featured: true,
        rating: 5,
        blend: 'Ethiopian Yirgacheffe',
        yearsCustomer: 3,
    },
    {
        id: 2,
        name: 'Omar Hassan',
        role: 'Home Barista',
        location: 'Jeddah',
        quote: '\u201CThe Cold Brew Kit changed everything \u2014 smooth, rich, and perfectly balanced every single time.\u201D',
        story: 'As someone who brews at home daily, finding the right beans was a struggle until I tried Aroma Corner\u2019s Cold Brew Kit. The consistency is remarkable \u2014 every batch comes out smooth and full-bodied.',
        image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
        featured: false,
        rating: 5,
        blend: 'Cold Brew Kit',
        yearsCustomer: 2,
    },
    {
        id: 3,
        name: 'Layla Noor',
        role: 'Cafe Owner',
        location: 'Dammam',
        quote: '\u201CWe serve Aroma Corner exclusively \u2014 our customers notice the difference and keep coming back.\u201D',
        story: 'When I opened my cafe, I sampled beans from over 20 suppliers. Aroma Corner\u2019s Espresso Blend stood out immediately \u2014 the crema, the body, the lingering sweetness. Our regulars now ask for it by name.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
        featured: false,
        rating: 5,
        blend: 'Espresso Blend',
        yearsCustomer: 4,
    },
    {
        id: 4,
        name: 'Khalid Mansour',
        role: 'Architecture Designer',
        location: 'Mecca',
        quote: '\u201CThe Golden Hour Roast is pure magic \u2014 hazelnut and orange zest in perfect harmony.\u201D',
        story: 'I\u2019m not a coffee expert, but I know what I love. The Golden Hour Roast is something special \u2014 those warm hazelnut notes with a hint of orange zest make my late-night design sessions so much better.',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
        featured: false,
        rating: 4,
        blend: 'Golden Hour Roast',
        yearsCustomer: 1,
    },
    {
        id: 5,
        name: 'Amira Youssef',
        role: 'Food Blogger',
        location: 'Medina',
        quote: '\u201CTheir Build-Your-Box feature is genius \u2014 I curate gifts for every occasion.\u201D',
        story: 'As a food blogger, I\u2019m always looking for unique gift ideas. Aroma Corner\u2019s Build-Your-Box lets me create personalized coffee gift sets that my friends and followers absolutely adore. The packaging is beautiful too!',
        image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
        featured: false,
        rating: 5,
        blend: 'Curated Box',
        yearsCustomer: 2,
    },
];

const storyStats = [
    { icon: Heart, value: '18k+', label: 'Happy Customers' },
    { icon: Coffee, value: '50+', label: 'Blends Curated' },
    { icon: MapPin, value: '24', label: 'Cities Delivered' },
    { icon: Award, value: '4.9', label: 'Average Rating' },
];

function FeaturedCard({ story }: { story: Story }) {
    return (
        <article className="group reveal-left relative col-span-1 row-span-2 overflow-hidden rounded-3xl border border-white/45 shadow-[0_24px_70px_-45px_rgba(72,45,32,0.85)] md:col-span-2 md:row-span-2">
            <img
                src={story.image}
                alt={story.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2f1f16]/90 via-[#2f1f16]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2f1f16]/60 via-transparent to-transparent" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur-md">
                        {Array.from({ length: story.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-[#f3b079] text-[#f3b079]" />
                        ))}
                    </div>
                    <span className="rounded-full border border-[#8C6239]/40 bg-[#8C6239]/25 px-3 py-1 text-xs font-medium text-[#f3b079] backdrop-blur-md">
                        {story.blend}
                    </span>
                    <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
                        {story.yearsCustomer}yr member
                    </span>
                </div>
                <p className="mb-3 text-lg font-medium leading-relaxed text-white/95 md:text-xl">
                    {story.quote}
                </p>
                <p className="mb-4 max-h-0 overflow-hidden text-sm leading-relaxed text-white/70 transition-all duration-500 group-hover:max-h-40">
                    {story.story}
                </p>
                <div className="flex items-center gap-3">
                    <img
                        src={story.avatar}
                        alt={story.name}
                        className="h-10 w-10 rounded-full border-2 border-white/40 object-cover"
                        loading="lazy"
                    />
                    <div>
                        <p className="text-sm font-semibold text-white">{story.name}</p>
                        <div className="flex items-center gap-1 text-xs text-white/60">
                            <MapPin className="h-3 w-3" />
                            {story.role} · {story.location}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

function StoryCard({ story }: { story: Story }) {
    return (
        <article className="group reveal-up relative overflow-hidden rounded-2xl border border-white/40 bg-white/20 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(72,45,32,0.75)]">
            <div className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-gradient-to-b from-[#8C6239] to-[#f3b079] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#8C6239]/0 blur-2xl transition-all duration-500 group-hover:bg-[#8C6239]/20" />
            <div className="relative">
                <Quote className="mb-3 h-5 w-5 text-[#8C6239]/50" />
                <div className="mb-3 flex items-center gap-0.5">
                    {Array.from({ length: story.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#f3b079] text-[#f3b079]" />
                    ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-[#4a2e1f]">
                    {story.quote}
                </p>
                <span className="mb-4 inline-block rounded-full border border-[#8C6239]/25 bg-[#8C6239]/10 px-3 py-1 text-xs font-medium text-[#7a5a46]">
                    {story.blend}
                </span>
                <div className="flex items-center gap-3">
                    <img
                        src={story.avatar}
                        alt={story.name}
                        className="h-9 w-9 rounded-full border border-white/50 object-cover"
                        loading="lazy"
                    />
                    <div>
                        <p className="text-sm font-semibold text-[#3f2518]">{story.name}</p>
                        <div className="flex items-center gap-1 text-xs text-[#7a5a46]">
                            <MapPin className="h-3 w-3" />
                            {story.location}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

function StoryCarousel() {
    const [active, setActive] = useState(0);
    const touchStartX = useRef(0);

    const prev = useCallback(() => setActive((i) => (i === 0 ? stories.length - 1 : i - 1)), []);
    const next = useCallback(() => setActive((i) => (i === stories.length - 1 ? 0 : i + 1)), []);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) next(); else prev();
        }
    };

    const story = stories[active];

    return (
        <div
            className="md:hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="relative overflow-hidden rounded-3xl border border-white/45 bg-white/20 p-5 backdrop-blur-xl">
                <div className="mb-3 flex items-center gap-0.5">
                    {Array.from({ length: story.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#f3b079] text-[#f3b079]" />
                    ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-[#4a2e1f]">
                    {story.quote}
                </p>
                <span className="mb-4 inline-block rounded-full border border-[#8C6239]/25 bg-[#8C6239]/10 px-3 py-1 text-xs font-medium text-[#7a5a46]">
                    {story.blend}
                </span>
                <div className="mb-4 flex items-center gap-3">
                    <img
                        src={story.avatar}
                        alt={story.name}
                        className="h-10 w-10 rounded-full border border-white/50 object-cover"
                        loading="lazy"
                    />
                    <div>
                        <p className="text-sm font-semibold text-[#3f2518]">{story.name}</p>
                        <div className="flex items-center gap-1 text-xs text-[#7a5a46]">
                            <MapPin className="h-3 w-3" />
                            {story.role} · {story.location}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {stories.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-[#8C6239]' : 'w-2 bg-[#8C6239]/30'
                                    }`}
                                aria-label={`Go to story ${i + 1}`}
                            />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={prev}
                            className="rounded-full border border-white/50 bg-white/30 p-2 backdrop-blur-md transition hover:bg-white/50"
                            aria-label="Previous story"
                        >
                            <ChevronLeft className="h-4 w-4 text-[#5d3a27]" />
                        </button>
                        <button
                            onClick={next}
                            className="rounded-full border border-white/50 bg-white/30 p-2 backdrop-blur-md transition hover:bg-white/50"
                            aria-label="Next story"
                        >
                            <ChevronRight className="h-4 w-4 text-[#5d3a27]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CoffeeStories() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.12 }
        );

        const el = sectionRef.current;
        if (el) {
            el.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach((child) => {
                observer.observe(child);
            });
        }

        return () => observer.disconnect();
    }, []);

    const featuredStory = stories.find((s) => s.featured)!;
    const regularStories = stories.filter((s) => !s.featured);

    return (
        <section ref={sectionRef} className="rounded-[1.8rem] border border-white/40 bg-white/20 p-6 shadow-[0_24px_70px_-45px_rgba(72,45,32,0.85)] backdrop-blur-xl md:p-8">
            <div className="reveal-up mb-8 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a46]">our community</p>
                <h2 className="mt-2 text-3xl font-bold text-[#3f2518]">Coffee Stories</h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-[#654634] md:text-base">
                    Real voices from our community of coffee lovers — their rituals, their blends, their story.
                </p>
            </div>

            <div className="reveal-scale mb-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {storyStats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col items-center gap-2 rounded-2xl border border-white/45 bg-white/25 p-4 backdrop-blur-md"
                    >
                        <stat.icon className="h-5 w-5 text-[#8C6239]" />
                        <p className="text-2xl font-bold text-[#3f2518]">{stat.value}</p>
                        <p className="text-xs text-[#7a5a46]">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="hidden md:grid md:grid-cols-3 md:grid-rows-2 md:gap-5">
                <FeaturedCard story={featuredStory} />
                {regularStories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>

            <StoryCarousel />

            <div className="reveal-up mt-8 flex items-center justify-center gap-2 text-[#8C6239]/30">
                <div className="h-px w-12 bg-[#8C6239]/20" />
                <Coffee className="h-5 w-5" />
                <div className="h-px w-12 bg-[#8C6239]/20" />
            </div>
        </section>
    );
}