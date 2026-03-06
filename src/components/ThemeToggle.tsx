import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeToggle = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            if (saved) return saved as 'light' | 'dark';
        }
        return 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = (e: React.MouseEvent) => {
        const isDark = theme === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';

        // Circular Reveal logic
        if (!document.startViewTransition) {
            setTheme(nextTheme);
            return;
        }

        const x = e.clientX;
        const y = e.clientY;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            setTheme(nextTheme);
        });

        transition.ready.then(() => {
            const isShrinking = nextTheme === 'light';
            document.documentElement.animate(
                {
                    clipPath: isShrinking
                        ? [
                            `circle(${endRadius}px at ${x}px ${y}px)`,
                            `circle(0px at ${x}px ${y}px)`,
                        ]
                        : [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${endRadius}px at ${x}px ${y}px)`,
                        ],
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: isShrinking
                        ? '::view-transition-old(root)'
                        : '::view-transition-new(root)',
                    fill: 'forwards'
                }
            );
        });
    };

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle glass"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: 20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </motion.div>
            </AnimatePresence>
        </button>
    );
};
