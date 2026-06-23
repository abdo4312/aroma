import { Users, Globe, Clock, ThumbsUp, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '@/shared/hooks/use-scroll-reveal';

const stats = [
    { icon: Users, value: '18,000', suffix: '+', label: 'Happy Customers Worldwide' },
    { icon: Globe, value: '12', suffix: '+', label: 'Coffee Origins Sourced' },
    { icon: Clock, value: '48', suffix: 'h', label: 'Roast to Your Door' },
    { icon: ThumbsUp, value: '98', suffix: '%', label: 'Customer Satisfaction Rate' },
];

export function WhyChooseUs() {
    const sectionRef = useScrollReveal<HTMLElement>();
    const navigate = useNavigate();

    return (
        <section
            ref={sectionRef}
            className="reveal trust-section relative overflow-hidden rounded-[2rem] border border-white/45 bg-white/25 shadow-[0_28px_80px_-38px_rgba(59,34,19,0.7)] backdrop-blur-xl"
        >
            <div className="trust-inner relative grid gap-8 rounded-[1.7rem] bg-[linear-gradient(125deg,rgba(255,255,255,0.62),rgba(255,255,255,0.16))] p-8 md:grid-cols-2 md:p-0 md:gap-0">
                {/* Content side */}
                <div className="flex flex-col justify-center gap-7 md:p-10">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a46]">why choose us</p>
                        <h2 className="mt-2 text-3xl font-bold text-[#3f2518] md:text-4xl">
                            Why Coffee Lovers Trust Us
                        </h2>
                    </div>

                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            className="reveal flex items-start gap-4 rounded-2xl border border-white/45 bg-white/30 p-4 backdrop-blur-sm transition-all duration-400 hover:translate-x-2 hover:bg-white/45 hover:shadow-[0_12px_30px_-12px_rgba(72,45,32,0.3)]"
                            style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
                        >
                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5f3a26] to-[#8c6239] text-[#fff2e2]">
                                <stat.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[22px] font-extrabold leading-tight text-[#3f2518]">
                                    {stat.value}
                                    <span className="text-base font-semibold text-[#8c6239]">{stat.suffix}</span>
                                </p>
                                <p className="mt-0.5 text-[13px] font-medium text-[#7a5a46]">{stat.label}</p>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => navigate('/about')}
                        className="group inline-flex w-fit items-center gap-2 rounded-xl bg-[#5d3a27] px-6 py-3 text-sm font-semibold text-[#fff8f1] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4a2e1f] hover:shadow-[0_10px_25px_-8px_rgba(54,31,21,0.7)]"
                    >
                        Learn More
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>

                {/* Image side */}
                <div className="trust-image-side relative overflow-hidden rounded-[1.4rem] min-h-[300px] md:min-h-[480px] md:rounded-none md:rounded-tr-[1.7rem] md:rounded-br-[1.7rem]">
                    <img
                        src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80"
                        alt="Why Choose Us"
                        className="h-full w-full object-cover transition-transform duration-[8s] ease-in-out hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e0f08]/35 to-[#1e0f08]/10 pointer-events-none" />

                    {/* Shimmer */}
                    <div className="trust-image-shimmer absolute inset-0 pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute bottom-5 left-5 flex items-center gap-2.5 rounded-[14px] border border-white/30 bg-white/20 px-4 py-2.5 text-[13px] font-semibold text-white backdrop-blur-md">
                        <Star className="h-5 w-5 fill-[#f3b079] text-[#f3b079]" />
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="h-3.5 w-3.5 fill-[#f3b079] text-[#f3b079]" />
                            ))}
                        </div>
                        4.9 Average
                    </div>
                </div>
            </div>
        </section>
    );
}