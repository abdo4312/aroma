import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleImageError } from '@/shared/utils/imageFallback';

const pairings = [
    {
        title: 'Morning Starter Kit',
        desc: 'Colombia Supremo beans + French press. The perfect way to kickstart your day with rich, full-bodied flavor.',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
        price: 89,
        originalPrice: 112,
        save: 20,
    },
    {
        title: 'Afternoon Escape',
        desc: 'Ethiopian Yirgacheffe + pour-over dripper. Bright, floral notes for a refreshing mid-day coffee break.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
        price: 95,
        originalPrice: 118,
        save: 19,
    },
    {
        title: 'Evening Indulgence',
        desc: 'Dark Espresso Blend + milk frother. Create cafe-quality lattes and cappuccinos in your own kitchen.',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
        price: 105,
        originalPrice: 132,
        save: 20,
    },
];

export function CoffeePairings() {
    const sectionRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();

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
        <section
            ref={sectionRef}
            className="reveal rounded-[1.5rem] sm:rounded-[1.8rem] border border-white/40 bg-white/20 p-4 sm:p-6 shadow-[0_24px_70px_-45px_rgba(72,45,32,0.85)] backdrop-blur-xl md:p-8"
        >
            <div className="mb-4 sm:mb-6 flex items-end justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-coffee-600">
                        curated bundles
                    </p>
                    <h2 className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold text-coffee-900 truncate">
                        Coffee Pairings
                    </h2>
                </div>
                <button
                    onClick={() => navigate('/build-your-box')}
                    className="shrink-0 rounded-lg border border-white/65 bg-white/45 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-semibold text-coffee-700 transition hover:bg-white/65 active:scale-95"
                >
                    Build Yours
                </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {pairings.map((p) => (
                    <article
                        key={p.title}
                        className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-white/45 bg-white/25 backdrop-blur-xl transition-all duration-400 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_18px_50px_-15px_rgba(89,58,40,0.5)] sm:hover:shadow-[0_24px_60px_-20px_rgba(89,58,40,0.6)]"
                    >
                        <div className="overflow-hidden">
                            <img
                                src={p.image}
                                alt={p.title}
                                onError={handleImageError}
                                className="h-32 sm:h-[180px] w-full object-cover transition-transform duration-600 group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                        <div className="p-3 sm:p-5">
                            <h3 className="mb-1 sm:mb-1.5 text-sm sm:text-lg font-bold text-coffee-900 line-clamp-1 sm:line-clamp-2">
                                {p.title}
                            </h3>
                            <p className="hidden sm:block mb-3 text-sm leading-relaxed text-coffee-700">
                                {p.desc}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-base sm:text-[22px] font-bold text-coffee-900">
                                    {p.price} SAR
                                </span>
                                <span className="text-xs sm:text-sm text-coffee-500 line-through">
                                    {p.originalPrice} SAR
                                </span>
                                <span className="ml-auto sm:ml-0 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-emerald-700">
                                    Save {p.save}%
                                </span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}