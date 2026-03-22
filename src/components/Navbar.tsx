import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import './Navbar.css';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const navLinks = [
        { label: 'Projects', href: '#projects', id: 'projects' },
        { label: 'Experience', href: '#experience', id: 'experience' },
        { label: 'Skills', href: '#skills', id: 'skills' },
        { label: 'About', href: '#about', id: 'about' },
        { label: 'Contact', href: '#contact', id: 'contact' },
    ];

    useEffect(() => {
        // 1. Handle background contrast on scroll
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        // 2. Intersection Observer for Scroll Spy
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -30% 0px', // Narrower margin to avoid overlap at top/bottom
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });

            // If scrolled back to top area, ensure highlight is removed
            if (window.scrollY < 100) {
                setActiveSection(null);
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        navLinks.forEach((link) => {
            const section = document.getElementById(link.id);
            if (section) observer.observe(section);
        });

        // Forced reset when very near the top
        const handleScrollState = () => {
            if (window.scrollY < 100) {
                setActiveSection(null);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('scroll', handleScrollState, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleScrollState);
            observer.disconnect();
        };
    }, []);

    return (
        <motion.nav
            className="navbar-container"
            initial={{ y: -60, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
            <div className={`navbar-pill ${isScrolled ? 'scrolled' : ''}`}>
                {/* Left: Logo */}
                <a href="#" className="nav-logo" onClick={() => setActiveSection(null)}>
                    Raj<span className="gradient-text">.</span>
                </a>

                {/* Center: Desktop Links */}
                <div className="nav-links">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                        >
                            {link.label}
                            {activeSection === link.id && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="nav-indicator"
                                    transition={{
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 30
                                    }}
                                />
                            )}
                        </a>
                    ))}
                </div>

                {/* Right: Actions */}
                <div className="nav-actions">
                    <ThemeToggle />
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown (Simplified) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu-dropdown glass"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
