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
            className="reveal overflow-hidden rounded-[1.2rem] sm:rounded-[1.4rem] border border-white/35 bg-white/15 p-2.5 sm:p-4 backdrop-blur-lg"
        >
            <div className="marquee-track flex w-max">
                {marqueeItems.map((item) => (
                    <span
                        key={`a-${item}`}
                        className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-4 sm:px-8 text-[11px] sm:text-sm font-semibold uppercase tracking-[0.08em] sm:tracking-[0.1em] text-coffee-700"
                    >
                        <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-coffee-500" />
                        {item}
                    </span>
                ))}
                {marqueeItems.map((item) => (
                    <span
                        key={`b-${item}`}
                        className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-4 sm:px-8 text-[11px] sm:text-sm font-semibold uppercase tracking-[0.08em] sm:tracking-[0.1em] text-coffee-700"
                    >
                        <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-coffee-500" />
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}