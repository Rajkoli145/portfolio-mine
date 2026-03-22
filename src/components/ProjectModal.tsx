import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Cpu, Target, Rocket, Layers } from 'lucide-react';
import type { ReactNode } from 'react';

interface ProjectModalProps {
    project: {
        title: string;
        description: string;
        tags: string[];
        problem: string;
        solution: string;
        architecture: string;
        imageUrl: string;
        githubUrl?: string;
        liveUrl?: string;
        icon: ReactNode;
    } | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="project-modal-wrapper">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="project-modal-backdrop"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="project-modal-container glass"
                    >
                        <button onClick={onClose} className="project-modal-close" aria-label="Close">
                            <X size={24} />
                        </button>

                        <div className="project-modal-scroll">
                            <div className="project-modal-content">
                                {/* Header Section */}
                                <div className="modal-header">
                                    <div className="modal-icon-box">
                                        {project.icon}
                                    </div>
                                    <div className="modal-title-box">
                                        <div className="modal-badge">Case Study</div>
                                        <h2>{project.title}</h2>
                                        <p className="modal-summary">{project.description}</p>
                                    </div>
                                    <div className="modal-links">
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                                                <Github size={20} />
                                                <span>Source Code</span>
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="modal-link-btn premium">
                                                <ExternalLink size={20} />
                                                <span>Live Demo</span>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Main Image */}
                                <div className="modal-image-wrapper">
                                    <img src={project.imageUrl} alt={project.title} />
                                    <div className="image-scanlines"></div>
                                </div>

                                {/* Details Grid */}
                                <div className="modal-details-grid">
                                    <div className="detail-item">
                                        <div className="detail-label">
                                            <Target size={18} />
                                            <span>The Problem</span>
                                        </div>
                                        <p>{project.problem}</p>
                                    </div>

                                    <div className="detail-item">
                                        <div className="detail-label">
                                            <Rocket size={18} />
                                            <span>The Solution</span>
                                        </div>
                                        <p>{project.solution}</p>
                                    </div>

                                    <div className="detail-item full-width">
                                        <div className="detail-label">
                                            <Cpu size={18} />
                                            <span>Architecture Overview</span>
                                        </div>
                                        <p>{project.architecture}</p>
                                    </div>

                                    <div className="detail-item full-width">
                                        <div className="detail-label">
                                            <Layers size={18} />
                                            <span>Tech Stack</span>
                                        </div>
                                        <div className="modal-tags">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="project-tag">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
