import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&q=80',
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
            className="reveal rounded-[1.8rem] border border-white/40 bg-white/20 p-6 shadow-[0_24px_70px_-45px_rgba(72,45,32,0.85)] backdrop-blur-xl md:p-8"
        >
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a46]">
                        curated bundles
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-[#3f2518]">Coffee Pairings</h2>
                </div>
                <button
                    onClick={() => navigate('/build-your-box')}
                    className="rounded-lg border border-white/65 bg-white/45 px-4 py-2 text-sm font-semibold text-[#583727] transition hover:bg-white/65 active:scale-95"
                >
                    Build Yours
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {pairings.map((p) => (
                    <article
                        key={p.title}
                        className="group overflow-hidden rounded-3xl border border-white/45 bg-white/25 backdrop-blur-xl transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_24px_60px_-20px_rgba(89,58,40,0.6)]"
                    >
                        <div className="overflow-hidden">
                            <img
                                src={p.image}
                                alt={p.title}
                                className="h-[180px] w-full object-cover transition-transform duration-600 group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                        <div className="p-5">
                            <h3 className="mb-1.5 text-lg font-bold text-[#3f2518]">{p.title}</h3>
                            <p className="mb-3 text-sm leading-relaxed text-[#6e4f3a]">{p.desc}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-[22px] font-bold text-[#30190f]">{p.price} SAR</span>
                                <span className="text-sm text-[#8c6239] line-through">{p.originalPrice} SAR</span>
                                <span className="rounded-md bg-[#5a8a3c]/12 px-2 py-0.5 text-xs font-semibold text-[#5a8a3c]">
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