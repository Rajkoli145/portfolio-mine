import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    title?: string;
    className?: string;
    delay?: number;
    id?: string;
}

export const Section = ({ children, title, className = '', delay = 0, id }: SectionProps) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            className={`essay-section ${className}`}
        >
            {title && <h2 className="gradient-text">{title}</h2>}
            {children}
        </motion.section>
    );
};
