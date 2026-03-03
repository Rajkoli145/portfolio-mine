import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for trailing effect
    const springConfig = { damping: 25, stiffness: 250 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.closest('a') ||
                target.closest('button') ||
                target.closest('.project-card') ||
                target.tagName.toLowerCase() === 'input' ||
                target.tagName.toLowerCase() === 'textarea';

            setIsHovering(!!isInteractive);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

    return (
        <div
            className="custom-cursor-container"
            style={{
                opacity: isVisible ? 1 : 0,
                pointerEvents: 'none'
            }}
        >
            {/* Outer Spring Circle */}
            <motion.div
                className="cursor-outer"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: isHovering ? 60 : 32,
                    height: isHovering ? 60 : 32,
                    backgroundColor: isHovering ? 'var(--accent-soft)' : 'transparent',
                    borderColor: isHovering ? 'var(--accent-primary)' : 'var(--accent-primary)',
                    opacity: isHovering ? 0.3 : 0.5,
                }}
                transition={{ type: 'spring', stiffness: 250, damping: 25 }}
            />

            {/* Center Fixed Dot */}
            <motion.div
                className="cursor-inner"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 0.5 : 1,
                }}
            />
        </div>
    );
};
