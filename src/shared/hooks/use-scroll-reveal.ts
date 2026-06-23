import { useEffect, useRef } from 'react';

/**
 * useScrollReveal
 * ===============
 * Hook that observes elements with reveal classes and adds a "visible"
 * class when they enter the viewport.
 *
 * Supported classes: reveal, reveal-up, reveal-left, reveal-right, reveal-scale
 *
 * IMPORTANT — Bug this hook fixes:
 *   The CSS rule `.reveal { opacity: 0 }` (see src/index.css) hides any
 *   element with that class UNTIL a "visible" class is added by an
 *   IntersectionObserver. If a section uses `className="reveal"` but
 *   has no observer, it stays at opacity:0 forever — looking like an
 *   empty gap on the page.
 *
 *   This hook solves it by observing BOTH:
 *     1. The container element itself (if it has any reveal class)
 *     2. All descendant elements with any reveal class
 *
 *   It also calls `observer.unobserve()` after the element becomes visible,
 *   so scrolling back up does NOT re-hide already-revealed content.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        // 1) Observe the container itself if it has any reveal class
        const revealClassList = ['reveal', 'reveal-up', 'reveal-left', 'reveal-right', 'reveal-scale'];
        const hasRevealClass = revealClassList.some((cls) => el.classList.contains(cls));
        if (hasRevealClass) {
            observer.observe(el);
        }

        // 2) Observe all descendant reveal elements
        el.querySelectorAll(
            '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale'
        ).forEach((child) => {
            observer.observe(child);
        });

        return () => observer.disconnect();
    }, []);

    return ref;
}