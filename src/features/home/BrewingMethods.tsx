import { useEffect, useRef } from 'react';
import { Clock, Layers, Droplets, Grid3x3, Zap, ArrowRight } from 'lucide-react';
import { handleImageError } from '@/shared/utils/imageFallback';

interface BrewMethod {
    num: string;
    tag: string;
    tagIcon: React.ReactNode;
    title: string;
    desc: string;
    time: string;
    grind: string;
    image: string;
}

const brewMethods: BrewMethod[] = [
    {
        num: '01',
        tag: 'Pour Over',
        tagIcon: <Layers className="h-3.5 w-3.5" />,
        title: 'Pour Over',
        desc: 'Clean, bright, and nuanced. Perfect for showcasing single-origin flavors with precision and control over every variable.',
        time: '3-4 min',
        grind: 'Medium Grind',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    },
    {
        num: '02',
        tag: 'Espresso',
        tagIcon: <Zap className="h-3.5 w-3.5" />,
        title: 'Espresso',
        desc: 'Rich, concentrated, and versatile. The foundation for lattes, cappuccinos, and all espresso-based drinks you love.',
        time: '25-30 sec',
        grind: 'Fine Grind',
        // FIXED: was 'aefda' (typo) → 'aefdd' (verified working)
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
    },
    {
        num: '03',
        tag: 'Cold Brew',
        tagIcon: <Droplets className="h-3.5 w-3.5" />,
        title: 'Cold Brew',
        desc: 'Smooth, low-acidity extraction over 12-24 hours. Refreshing and perfect for summer sipping or a gentle caffeine boost.',
        time: '12-24h',
        grind: 'Coarse Grind',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    },
    {
        num: '04',
        tag: 'French Press',
        tagIcon: <Grid3x3 className="h-3.5 w-3.5" />,
        title: 'French Press',
        desc: 'Full immersion brewing for a rich, full-bodied cup. Simple, consistent, and deeply satisfying with no paper filters needed.',
        time: '4 min',
        grind: 'Coarse Grind',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80',
    },
    {
        num: '05',
        tag: 'AeroPress',
        tagIcon: <Zap className="h-3.5 w-3.5" />,
        title: 'AeroPress',
        desc: 'Versatile and portable. Makes smooth, rich coffee in under a minute with pressure and immersion combined in one device.',
        time: '1-2 min',
        grind: 'Fine-Medium',
        image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&q=80',
    },
];

function BrewItem({ method, index }: { method: BrewMethod; index: number }) {
    const itemRef = useRef<HTMLDivElement>(null);
    const isEven = index % 2 === 1;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.12 }
        );
        if (itemRef.current) observer.observe(itemRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={itemRef}
            className={`reveal brew-item group flex flex-col overflow-hidden rounded-3xl border border-white/40 bg-white/18 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(72,45,32,0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-16px_rgba(72,45,32,0.55)] md:flex-row md:min-h-[260px] ${isEven ? 'md:flex-row-reverse' : ''}`}
            style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
        >
            {/* Image */}
            <div className="brew-img relative h-[180px] overflow-hidden flex-shrink-0 sm:h-[200px] md:h-auto md:w-[45%]">
                <img
                    src={method.image}
                    alt={method.title}
                    onError={handleImageError}
                    className="h-full w-full object-cover brightness-95 transition-all duration-700 group-hover:scale-108 group-hover:brightness-110"
                    loading="lazy"
                />
                <span className="absolute left-4 top-4 z-[3] flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#5f3a26]/75 text-base font-extrabold text-[#fff2e2] backdrop-blur-sm">
                    {method.num}
                </span>
                {/* Shimmer */}
                <div className="brew-img-shimmer absolute inset-0 pointer-events-none mix-blend-overlay" />
            </div>

            {/* Body */}
            <div className="brew-body relative flex flex-1 flex-col justify-center p-5 sm:p-6">
                {/* Accent bar */}
                <div className={`brew-accent absolute top-0 ${isEven ? 'right-0' : 'left-0'} h-0 w-[3px] rounded-sm bg-gradient-to-b from-[#f3b079] to-[#8C6239] transition-all duration-500 group-hover:h-full`} />

                <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#8C6239]/25 bg-[#8C6239]/10 px-3.5 py-1 text-[11px] font-semibold uppercase text-[#7a5a46]">
                    {method.tagIcon}
                    {method.tag}
                </span>

                <h3 className="mb-2 text-[22px] font-bold leading-tight text-[#3f2518]">
                    {method.title}
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-[#6e4f3a]">
                    {method.desc}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-[10px] border border-white/45 bg-white/30 px-3 py-1.5 text-xs font-semibold text-[#5f3a2a] transition-colors duration-300 group-hover:bg-white/45">
                        <Clock className="h-3.5 w-3.5 text-[#8C6239]" />
                        {method.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-[10px] border border-white/45 bg-white/30 px-3 py-1.5 text-xs font-semibold text-[#5f3a2a] transition-colors duration-300 group-hover:bg-white/45">
                        <Grid3x3 className="h-3.5 w-3.5 text-[#8C6239]" />
                        {method.grind}
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#5f3a26] transition-colors duration-300 group-hover:text-[#3f2518]">
                        Brew Guide
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                </div>
            </div>
        </div>
    );
}

export function BrewingMethods() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="reveal rounded-[1.8rem] border border-white/40 bg-white/20 p-6 shadow-[0_24px_70px_-45px_rgba(72,45,32,0.85)] backdrop-blur-xl md:p-8">
            <div className="mb-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a46]">brewing methods</p>
                <h2 className="mt-2 text-3xl font-bold text-[#3f2518]">Find Your Perfect Brew</h2>
            </div>

            <div className="flex flex-col gap-5">
                {brewMethods.map((method, i) => (
                    <BrewItem key={method.num} method={method} index={i} />
                ))}
            </div>
        </section>
    );
}