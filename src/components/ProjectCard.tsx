import { motion, useSpring } from 'framer-motion';
import type { ReactNode } from 'react';
import { ExternalLink, Github } from 'lucide-react';

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
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="glass project-card"
            style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden',
                perspective: '800px',
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Punch Holes */}
            <div style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                top: '-40px',
                right: '-60px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.02)',
                boxShadow: 'var(--punch-depth)',
                zIndex: 0,
            }} />
            <div style={{
                position: 'absolute',
                width: '80px',
                height: '80px',
                bottom: '20px',
                left: '-20px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.02)',
                boxShadow: 'var(--punch-depth)',
                zIndex: 0,
            }} />

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
    );
};
