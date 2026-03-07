import { motion, useSpring } from 'framer-motion';
import type { ReactNode } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import SpotlightCard from './react-bits/SpotlightCard';

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    icon?: ReactNode;
    delay?: number;
}

export const ProjectCard = ({
    title,
    description,
    tags,
    githubUrl,
    liveUrl,
    icon,
    delay = 0
}: ProjectCardProps) => {
    const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
    const rotateY = useSpring(0, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        rotateX.set(-(mouseY / rect.height) * 8);
        rotateY.set((mouseX / rect.width) * 8);
    };

    const handleMouseLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="project-card-container"
            style={{
                perspective: '800px',
            }}
        >
            <SpotlightCard
                className="glass project-card"
                spotlightColor="rgba(143, 168, 255, 0.15)"
            >
                <motion.div
                    style={{
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        position: 'relative',
                        rotateX,
                        rotateY,
                        transformStyle: 'preserve-3d',
                        height: '100%',
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Content */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                        <div style={{
                            padding: '0.75rem',
                            borderRadius: '16px',
                            background: 'var(--accent-soft)',
                            color: 'var(--accent-primary)',
                        }}>
                            {icon}
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {githubUrl && (
                                <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                                    style={{ padding: '0.5rem', borderRadius: '50%', transition: 'var(--transition-smooth)' }}>
                                    <Github size={20} />
                                </a>
                            )}
                            {liveUrl && (
                                <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                                    style={{ padding: '0.5rem', borderRadius: '50%', transition: 'var(--transition-smooth)' }}>
                                    <ExternalLink size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{description}</p>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto', position: 'relative', zIndex: 1 }}>
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.65rem',
                                    fontWeight: 500,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: '8px',
                                    background: 'var(--accent-soft)',
                                    color: 'var(--accent-primary)',
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </SpotlightCard>
        </motion.div>
    );
};
