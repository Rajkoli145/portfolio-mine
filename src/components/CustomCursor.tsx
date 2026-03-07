import { useEffect, useRef, useCallback } from 'react';

/**
 * Ultra-smooth custom cursor using pure requestAnimationFrame + lerp.
 * No Framer Motion springs — direct DOM manipulation for 60fps.
 */
export const CustomCursor = () => {
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Track raw mouse position
    const mouse = useRef({ x: -100, y: -100 });
    // Smoothed positions for trailing elements
    const outerPos = useRef({ x: -100, y: -100 });
    const spotlightPos = useRef({ x: -100, y: -100 });
    const isHovering = useRef(false);
    const rafId = useRef<number>(0);

    // Lerp utility — pure math, no library
    const lerp = useCallback((start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
    }, []);

    useEffect(() => {
        // Touch device — bail out
        if ('ontouchstart' in window) return;

        const outer = outerRef.current;
        const inner = innerRef.current;
        const spotlight = spotlightRef.current;
        const container = containerRef.current;
        if (!outer || !inner || !spotlight || !container) return;

        // ---- EVENT HANDLERS (passive for perf) ----
        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
            container.style.opacity = '1';
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive =
                target.closest('a') ||
                target.closest('button') ||
                target.closest('.project-card') ||
                target.closest('.skill-pill') ||
                target.closest('.contact-link') ||
                target.closest('.hero-social-link') ||
                target.closest('svg') ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA';

            const nowHovering = !!interactive;
            if (nowHovering !== isHovering.current) {
                isHovering.current = nowHovering;
                if (nowHovering) {
                    outer.style.width = '42px';
                    outer.style.height = '42px';
                    outer.style.boxShadow = '0 0 16px rgba(143, 168, 255, 0.4)';
                    outer.style.backgroundColor = 'rgba(143, 168, 255, 0.04)';
                    outer.style.opacity = '0.8';
                } else {
                    outer.style.width = '32px';
                    outer.style.height = '32px';
                    outer.style.boxShadow = 'none';
                    outer.style.backgroundColor = 'transparent';
                    outer.style.opacity = '0.5';
                }
            }
        };

        const onMouseLeave = () => {
            container.style.opacity = '0';
        };
        const onMouseEnter = () => {
            container.style.opacity = '1';
        };

        // ---- ANIMATION LOOP ----
        const animate = () => {
            const mx = mouse.current.x;
            const my = mouse.current.y;

            // Inner dot — direct position, zero lag
            const scale = isHovering.current ? 0.5 : 1;
            inner.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${scale})`;

            // Outer ring — smooth trail (lerp factor 0.15 = ~6 frames to catch up)
            outerPos.current.x = lerp(outerPos.current.x, mx, 0.15);
            outerPos.current.y = lerp(outerPos.current.y, my, 0.15);
            outer.style.transform = `translate3d(${outerPos.current.x}px, ${outerPos.current.y}px, 0) translate(-50%, -50%)`;

            // Spotlight — "Flashlight" effect (dark overlay with transparent hole)
            // Only active in dark mode to keep light mode clean
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

            if (isDark) {
                spotlightPos.current.x = lerp(spotlightPos.current.x, mx, 0.08);
                spotlightPos.current.y = lerp(spotlightPos.current.y, my, 0.08);

                const radius = isHovering.current ? 500 : 450;
                const darkness = 0.8; // How dark the rest of the screen is

                spotlight.style.background = `radial-gradient(
                    ${radius}px circle at ${spotlightPos.current.x}px ${spotlightPos.current.y}px,
                    transparent 0%,
                    transparent 40%,
                    rgba(0, 0, 0, ${darkness}) 70%
                )`;
            } else {
                spotlightPos.current.x = lerp(spotlightPos.current.x, mx, 0.08);
                spotlightPos.current.y = lerp(spotlightPos.current.y, my, 0.08);

                const radius = isHovering.current ? 350 : 300;
                const opacity = 0.12;

                spotlight.style.background = `radial-gradient(
                    ${radius}px circle at ${spotlightPos.current.x}px ${spotlightPos.current.y}px,
                    rgba(143, 168, 255, ${opacity}),
                    transparent 70%
                )`;
            }

            rafId.current = requestAnimationFrame(animate);
        };

        // Start the loop
        rafId.current = requestAnimationFrame(animate);

        // Attach listeners
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', onMouseOver, { passive: true });
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        return () => {
            cancelAnimationFrame(rafId.current);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
        };
    }, [lerp]);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

    return (
        <div
            ref={containerRef}
            className="custom-cursor-container"
            style={{ opacity: 0, pointerEvents: 'none' }}
        >
            {/* Spotlight ambient glow */}
            <div ref={spotlightRef} className="cursor-spotlight" />

            {/* Outer trailing ring */}
            <div
                ref={outerRef}
                className="cursor-outer"
                style={{
                    width: 32,
                    height: 32,
                    opacity: 0.5,
                }}
            />

            {/* Inner dot — zero lag */}
            <div
                ref={innerRef}
                className="cursor-inner"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                }}
            />
        </div>
    );
};
