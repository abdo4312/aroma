import { Search, Sun, Truck, Coffee, BookOpen, CheckCircle, Clock, Layers, Heart } from 'lucide-react';
import { useScrollReveal } from '@/shared/hooks/use-scroll-reveal';

interface HowStep {
    number: number;
    label: string;
    labelIcon: React.ReactNode;
    title: string;
    description: string;
    features: { icon: React.ReactNode; text: string }[];
    image: string;
    badge: { icon: React.ReactNode; text: string };
}

const steps: HowStep[] = [
    {
        number: 1,
        label: 'Step One',
        labelIcon: <Search className="h-3.5 w-3.5" />,
        title: 'Choose Your Beans',
        description: 'Browse single-origin, espresso blends, or let us match your taste with our flavor quiz. Every bean has a story waiting for you.',
        features: [
            { icon: <Layers className="h-3.5 w-3.5" />, text: '12+ Origins' },
            { icon: <CheckCircle className="h-3.5 w-3.5" />, text: 'Flavor Quiz' },
        ],
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
        badge: { icon: <Search className="h-3.5 w-3.5" />, text: 'Explore Beans' },
    },
    {
        number: 2,
        label: 'Step Two',
        labelIcon: <Sun className="h-3.5 w-3.5" />,
        title: 'We Roast Fresh',
        description: 'Your order triggers a small-batch roast within 24 hours. No pre-roasted stock sitting on shelves — just pure, peak freshness.',
        features: [
            { icon: <Clock className="h-3.5 w-3.5" />, text: 'Within 24h' },
            { icon: <Sun className="h-3.5 w-3.5" />, text: 'Small Batch' },
        ],
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
        badge: { icon: <Sun className="h-3.5 w-3.5" />, text: 'Small Batch' },
    },
    {
        number: 3,
        label: 'Step Three',
        labelIcon: <Truck className="h-3.5 w-3.5" />,
        title: 'Fast Delivery',
        description: 'Vacuum-sealed and shipped within 48 hours of roasting. Your coffee arrives as fresh as if it came straight from our roastery.',
        features: [
            { icon: <Clock className="h-3.5 w-3.5" />, text: '48h Shipping' },
            { icon: <CheckCircle className="h-3.5 w-3.5" />, text: 'Vacuum-Sealed' },
        ],
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80',
        badge: { icon: <Truck className="h-3.5 w-3.5" />, text: 'Free Shipping' },
    },
    {
        number: 4,
        label: 'Step Four',
        labelIcon: <Coffee className="h-3.5 w-3.5" />,
        title: 'Brew & Enjoy',
        description: 'Follow our detailed brew guides for the perfect cup, or experiment with your own methods. Every sip is your reward.',
        features: [
            { icon: <BookOpen className="h-3.5 w-3.5" />, text: 'Brew Guides' },
            { icon: <Heart className="h-3.5 w-3.5" />, text: 'Pure Joy' },
        ],
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
        badge: { icon: <Heart className="h-3.5 w-3.5" />, text: 'Enjoy!' },
    },
];

export function HowItWorks() {
    const sectionRef = useScrollReveal<HTMLElement>();

    return (
        <section ref={sectionRef} className="reveal">
            <div className="mb-6 sm:mb-10 text-left sm:text-center">
                <p className="section-label text-[10px] sm:text-xs">simple process</p>
                <h2 className="section-title text-xl sm:text-3xl mt-1 sm:mt-2">How It Works</h2>
                <p className="mt-2 sm:mt-3 max-w-[520px] sm:mx-auto text-[12px] sm:text-[15px] leading-relaxed text-coffee-700">
                    From farm to your cup in four simple steps. We make specialty coffee accessible, fresh, and personal.
                </p>
            </div>

            <div className="how-timeline relative flex flex-col">
                <div className="absolute left-5 top-[40px] bottom-[40px] w-[2px] bg-gradient-to-b from-transparent via-coffee-500/35 to-transparent md:left-1/2 md:top-[60px] md:bottom-[60px] md:-translate-x-1/2" />

                {steps.map((step, i) => (
                    <div
                        key={step.number}
                        className={`group relative z-[1] pb-5 sm:pb-8 last:pb-0 pl-12 sm:pl-16 md:pl-0 md:flex md:items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} reveal delay-${i + 1}`}
                    >
                        <div className="absolute left-0 top-0 z-[5] flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full border-[3px] border-white/60 bg-gradient-to-br from-coffee-700 via-coffee-500 to-coffee-400 text-base sm:text-xl font-extrabold text-coffee-50 shadow-[0_0_0_4px_rgba(140,98,57,0.15),0_8px_24px_-6px_rgba(95,57,38,0.5)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 sm:group-hover:shadow-[0_0_0_8px_rgba(140,98,57,0.2),0_12px_32px_-6px_rgba(95,57,38,0.6)] md:left-1/2 md:top-1/2 md:-mt-7 md:-translate-x-1/2 after:absolute after:inset-[-8px] after:rounded-full after:border-2 after:border-coffee-500/20 after:content-[''] after:animate-[howDotPulse_2.5s_ease-out_infinite]">
                            {step.number}
                        </div>

                        <div className={`relative w-full md:w-[44%] md:flex-shrink-0 ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                            <span className="mb-1.5 sm:mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-coffee-500/25 bg-coffee-500/10 px-2.5 sm:px-3.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.12em] text-coffee-600">
                                {step.labelIcon}
                                {step.label}
                            </span>
                            <h3 className="mb-1.5 sm:mb-2 text-base sm:text-[22px] font-bold leading-tight text-coffee-900">{step.title}</h3>
                            <p className="mb-2.5 sm:mb-3.5 text-[12px] sm:text-sm leading-relaxed text-coffee-700">{step.description}</p>
                            <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                                {step.features.map((feat) => (
                                    <span
                                        key={feat.text}
                                        className="inline-flex items-center gap-1 sm:gap-1.5 rounded-[8px] sm:rounded-[10px] border border-white/45 bg-white/30 px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-coffee-700 transition-all duration-300"
                                    >
                                        <span className="text-coffee-500">{feat.icon}</span>
                                        {feat.text}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className={`hidden md:block relative md:mt-0 overflow-hidden rounded-[20px] border border-white/40 aspect-[4/3] shadow-[0_12px_35px_-15px_rgba(72,45,32,0.4)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_-15px_rgba(72,45,32,0.55)] md:w-[44%] md:flex-shrink-0 ${i % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                            <img
                                src={step.image}
                                alt={step.title}
                                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-coffee-950/30 pointer-events-none" />
                            <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.15)_45%,rgba(255,255,255,0.25)_50%,rgba(255,255,255,0.15)_55%,transparent_60%)] bg-[length:250%_100%] bg-[position:120%_0] transition-[background-position] duration-800 pointer-events-none group-hover:bg-[position:-40%_0]" />
                            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-xl border border-white/25 bg-white/18 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md [text-shadow:0_1px_4px_rgba(0,0,0,0.3)]">
                                {step.badge.icon}
                                {step.badge.text}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}