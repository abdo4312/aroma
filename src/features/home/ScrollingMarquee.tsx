import { useScrollReveal } from '@/shared/hooks/use-scroll-reveal';

const marqueeItems = [
    'Single-Origin',
    'Espresso Blends',
    'Cold Brew',
    'Pour Over',
    'French Press',
    'AeroPress',
    'Gift Boxes',
    'Brewing Tools',
    'Limited Batch',
    'Subscription',
];

export function ScrollingMarquee() {
    const ref = useScrollReveal<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className="reveal overflow-hidden rounded-[1.4rem] border border-white/35 bg-white/15 p-4 backdrop-blur-lg"
        >
            <div className="marquee-track flex w-max">
                {marqueeItems.map((item) => (
                    <span key={`a-${item}`} className="flex items-center gap-2 whitespace-nowrap px-8 text-sm font-semibold uppercase tracking-[0.1em] text-[#5f3a2a]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8C6239]" />
                        {item}
                    </span>
                ))}
                {marqueeItems.map((item) => (
                    <span key={`b-${item}`} className="flex items-center gap-2 whitespace-nowrap px-8 text-sm font-semibold uppercase tracking-[0.1em] text-[#5f3a2a]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8C6239]" />
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}