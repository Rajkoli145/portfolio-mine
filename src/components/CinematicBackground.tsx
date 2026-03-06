import { motion } from 'framer-motion';
import './CinematicBackground.css';

export const CinematicBackground = () => {
    return (
        <div className="cinematic-bg">
            {/* Ambient Floating Glows */}
            <motion.div
                className="ambient-orb orb-1"
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -100, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div
                className="ambient-orb orb-2"
                animate={{
                    x: [0, -120, 80, 0],
                    y: [0, 80, -120, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Hero Animated Gradient Lighting */}
            <motion.div
                className="hero-light-gradient"
                animate={{
                    x: [0, 80, -60, 40, 0],
                    y: [0, -40, 30, -20, 0],
                    scale: [1, 1.08, 0.95, 1.05, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* SVG Grain — feTurbulence noise */}
            <svg className="vellum-grain">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
            <div className="vignette-layer" />
        </div>
    );
};
