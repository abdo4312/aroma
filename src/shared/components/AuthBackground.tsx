import { useRef, useEffect, useState } from 'react';

const VIDEO_SRC = '/videos/b_A_cinematic_close-up.mp4';

/**
 * AuthBackground
 * --------------
 * Renders the background video (looped, muted, auto-played) for auth pages.
 *
 * - On error → falls back to a static dark gradient.
 * - On `prefers-reduced-motion: reduce` → falls back to the SAME gradient,
 *   and never even attempts to call play() on the video.
 * - No children: this component owns the entire background layer.
 *
 * Usage:
 *   <AuthBackground />
 *
 * Place it as the FIRST child inside a `relative` parent, then put your content
 * in a sibling `relative z-20` container.
 */
export function AuthBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoError, setVideoError] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });

    // Keep prefersReducedMotion in sync if the user changes the OS/browser
    // setting while this page is open (no reload needed).
    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleChange = (e: MediaQueryListEvent) => {
            console.log('ℹ️ prefers-reduced-motion changed:', e.matches);
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        // If the user prefers reduced motion, never even try to play the video.
        if (prefersReducedMotion) {
            console.log('ℹ️ prefers-reduced-motion is ON — skipping video, showing gradient fallback.');
            return;
        }

        const video = videoRef.current;
        if (!video) return;

        // ✅ Force mute — some browsers ignore the `muted` attribute on autoplay
        video.muted = true;
        video.volume = 0;

        const handleError = () => {
            console.error('❌ AuthBackground video error. Code:', video.error?.code);
            setVideoError(true);
        };

        const handleLoadedData = () => {
            console.log('✅ Video loaded successfully! Duration:', video.duration);
        };

        const handleCanPlay = () => {
            console.log('✅ Video can play now!');
        };

        const handlePlaying = () => {
            console.log('✅ Video is playing!');
        };

        video.addEventListener('error', handleError);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('playing', handlePlaying);

        // Try to play — some browsers require an explicit play() call
        const playPromise = video.play();
        if (playPromise) {
            playPromise.catch((err) => {
                // In dev mode, React StrictMode mounts/unmounts components twice,
                // which can interrupt this. That specific error is harmless noise.
                if (err.name === 'AbortError') {
                    console.log('ℹ️ Play interrupted by StrictMode remount (expected in dev).');
                } else {
                    console.warn('⚠️ Auto-play prevented:', err.message);
                }
            });
        }

        return () => {
            video.removeEventListener('error', handleError);
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('playing', handlePlaying);
        };
    }, [prefersReducedMotion]);

    // Fallback: static gradient when video fails OR when reduced motion is preferred.
    // Uses coffee tokens instead of hardcoded hex.
    if (videoError || prefersReducedMotion) {
        return (
            <div
                className="absolute inset-0 z-0 bg-gradient-to-br from-coffee-950 via-coffee-900 to-coffee-950"
                aria-hidden="true"
            />
        );
    }

    return (
        <div className="absolute inset-0 z-0" aria-hidden="true">
            {/* Video layer — sits at the bottom */}
            <video
                ref={videoRef}
                src={VIDEO_SRC}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark overlay so white text stays readable on top of the video */}
            <div className="absolute inset-0 bg-black/40" />
        </div>
    );
}