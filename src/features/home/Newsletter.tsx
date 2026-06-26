import { useState } from 'react'
import { Mail, ArrowRight, Check, Coffee, Gift, Sparkles } from 'lucide-react'

export function Newsletter() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setSubmitted(true)
            setEmail('')
        }
    }

    return (
        <section
            className="group relative overflow-hidden rounded-[1.5rem] sm:rounded-[1.8rem] shadow-[0_24px_70px_-45px_rgba(72,45,32,0.85)] md:min-h-[420px]"
            aria-labelledby="newsletter-heading"
        >
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80"
                    alt="Coffee beans background"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-coffee-950/92 via-coffee-950/78 to-coffee-950/45" aria-hidden="true" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-coffee-950/60 via-transparent to-coffee-950/30" aria-hidden="true" />

            <div
                className="absolute top-0 left-[-150%] z-[2] h-full w-[60%] pointer-events-none mix-blend-overlay transition-[left] duration-0 group-hover:left-[200%] group-hover:duration-[1000ms] group-hover:ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                style={{
                    background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.3) 70%, rgba(255,255,255,0) 100%)',
                    transform: 'skewX(-25deg)',
                }}
                aria-hidden="true"
            />

            <div className="relative z-[3] flex min-h-[320px] md:min-h-[420px] flex-col items-center justify-center px-5 py-8 sm:px-6 sm:py-10 text-center md:px-10 md:py-14">

                <div className="mb-3 sm:mb-5 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-white/10 px-3 sm:px-4 py-1 sm:py-1.5 backdrop-blur-md">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-cream" aria-hidden="true" />
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-brand-cream">
                        Newsletter
                    </span>
                </div>

                <h2
                    id="newsletter-heading"
                    className="mb-2 sm:mb-3 text-2xl sm:text-3xl font-bold text-white md:text-4xl"
                >
                    Stay in the Loop
                </h2>
                <p className="mx-auto mb-5 sm:mb-8 max-w-lg text-[13px] sm:text-[15px] leading-relaxed text-white/70">
                    Get exclusive offers, new blend alerts, and brewing tips delivered to your inbox. No spam, just great coffee vibes.
                </p>

                <ul
                    className="mb-5 sm:mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 list-none p-0 m-0"
                    aria-label="Newsletter perks"
                >
                    <li className="flex items-center gap-1.5 sm:gap-2 text-white/60">
                        <Gift className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-cream" aria-hidden="true" />
                        <span className="text-[10px] sm:text-xs font-medium">Exclusive Offers</span>
                    </li>
                    <li className="h-2.5 sm:h-3 w-px bg-white/20" aria-hidden="true" />
                    <li className="flex items-center gap-1.5 sm:gap-2 text-white/60">
                        <Coffee className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-cream" aria-hidden="true" />
                        <span className="text-[10px] sm:text-xs font-medium">New Blend Alerts</span>
                    </li>
                    <li className="h-2.5 sm:h-3 w-px bg-white/20" aria-hidden="true" />
                    <li className="flex items-center gap-1.5 sm:gap-2 text-white/60">
                        <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-cream" aria-hidden="true" />
                        <span className="text-[10px] sm:text-xs font-medium">Brewing Tips</span>
                    </li>
                </ul>

                {submitted ? (
                    <div
                        className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-2xl border border-green-400/30 bg-green-900/30 px-5 sm:px-6 py-3.5 sm:py-4 backdrop-blur-md"
                        role="status"
                        aria-live="polite"
                    >
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" aria-hidden="true" />
                        <p className="text-xs sm:text-sm font-semibold text-green-300">
                            You're in! Check your inbox for a welcome surprise.
                        </p>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="mx-auto flex w-full max-w-md flex-col gap-2.5 sm:gap-3 sm:flex-row"
                    >
                        <div className="relative flex-1">
                            <label htmlFor="newsletter-email" className="sr-only">
                                Email address for newsletter subscription
                            </label>
                            <Mail
                                className="absolute left-4 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-white/40"
                                aria-hidden="true"
                            />
                            <input
                                id="newsletter-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                aria-describedby="newsletter-privacy"
                                className="w-full rounded-xl border border-white/25 bg-white/10 py-3 sm:py-3.5 pl-10 sm:pl-11 pr-4 text-xs sm:text-sm text-white placeholder-white/40 backdrop-blur-md outline-none transition-all duration-300 focus:border-brand-cream/50 focus:bg-white/15 focus:shadow-[0_0_0_3px_rgba(243,176,121,0.15)]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-cream px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-coffee-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e9a368] hover:shadow-[0_10px_30px_-8px_rgba(243,176,121,0.5)] active:scale-95"
                            aria-label="Subscribe to newsletter"
                        >
                            Subscribe
                            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                        </button>
                    </form>
                )}

                <p id="newsletter-privacy" className="mt-3 sm:mt-4 text-[10px] sm:text-[11px] text-white/35">
                    Unsubscribe anytime. We respect your privacy.
                </p>
            </div>

            <div
                className="absolute bottom-0 left-0 z-[4] h-[3px] w-0 bg-gradient-to-r from-brand-cream to-coffee-500 transition-all duration-500 group-hover:w-full"
                aria-hidden="true"
            />
        </section>
    )
}