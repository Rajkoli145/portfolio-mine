import { useState } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import type { ReactNode } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import SpotlightCard from './react-bits/SpotlightCard';

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    imageUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
    icon?: ReactNode;
    delay?: number;
    onClick?: () => void;
}

export const ProjectCard = ({
    title,
    description,
    tags,
    imageUrl,
    githubUrl,
    liveUrl,
    icon,
    delay = 0,
    onClick,
}: ProjectCardProps) => {
    const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
    const rotateY = useSpring(0, { stiffness: 150, damping: 20 });
    const [isHovered, setIsHovered] = useState(false);

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
        setIsHovered(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="project-card-container"
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
            onMouseEnter={() => setIsHovered(true)}
        >
            <SpotlightCard
                className="glass project-card"
                spotlightColor="rgba(143, 168, 255, 0.15)"
            >
                <div 
                    className="project-card-inner"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Thumbnail */}
                    {imageUrl && (
                        <div className="project-thumbnail-wrapper">
                            <img src={imageUrl} alt={title} className="project-thumbnail" />
                            <div className="project-thumbnail-overlay">
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="view-case-study"
                                        >
                                            View Case Study
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}

                    <motion.div
                        className="project-content"
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <div className="project-header">
                            <div className="project-icon-box">
                                {icon}
                            </div>
                            <div className="project-actions">
                                {githubUrl && (
                                    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="project-action-btn github">
                                        <Github size={18} />
                                    </a>
                                )}
                                {liveUrl && (
                                    <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="project-action-btn live">
                                        <ExternalLink size={18} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="project-info">
                            <h3>{title}</h3>
                            <p>{description}</p>
                        </div>

                        <div className="project-tags">
                            {tags.map((tag) => (
                                <span key={tag} className="project-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </SpotlightCard>
        </motion.div>
    );
};
