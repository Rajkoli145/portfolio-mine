import { ExternalLink, Github, Layout, MessageSquare, Brain, Terminal } from 'lucide-react';

interface ProjectStackCardProps {
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    accentColor: string;
    githubUrl?: string;
    liveUrl?: string;
    index: number;
    pos: number;
}

// Helper to convert hex to RGB for CSS variables
const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        '143, 168, 255';
};

const AbstractVisual = ({ title }: { title: string }) => {
    if (title === "FreelancerFlow") {
        return (
            <div className="abstract-visual">
                <Layout size={200} strokeWidth={1} />
                <div 
                    className="visual-decoration"
                    style={{ position: 'absolute', bottom: 40, left: 40, width: 8, height: 80, background: 'currentColor', borderRadius: 4 }}
                />
                <div 
                    className="visual-decoration"
                    style={{ position: 'absolute', bottom: 40, left: 60, width: 8, height: 50, background: 'currentColor', borderRadius: 4 }}
                />
                <div 
                    className="visual-decoration"
                    style={{ position: 'absolute', bottom: 40, left: 80, width: 8, height: 100, background: 'currentColor', borderRadius: 4 }}
                />
            </div>
        );
    }
    if (title === "Cross-Lingo Talk") {
        return (
            <div className="abstract-visual">
                <MessageSquare size={200} strokeWidth={1} />
                <div 
                    style={{ position: 'absolute', top: 50, right: 50, width: 40, height: 40, border: '2px solid currentColor', borderRadius: '50%', opacity: 0.4 }}
                />
            </div>
        );
    }
    if (title === "EduStory") {
        return (
            <div className="abstract-visual">
                <Brain size={200} strokeWidth={1} />
                <div 
                    style={{ position: 'absolute', inset: 0, border: '2px dashed currentColor', borderRadius: '50%', opacity: 0.15 }}
                />
            </div>
        );
    }
    return (
        <div className="abstract-visual">
            <Terminal size={200} strokeWidth={1} />
            <div style={{ position: 'absolute', bottom: 60, left: 60, fontFamily: 'monospace', fontSize: '14px', opacity: 0.5, lineHeight: 1.6 }}>
                {`> run_node\n> init_wallet\n> sync_chain`}
            </div>
        </div>
    );
};

export const ProjectStackCard = ({
    title,
    category,
    description,
    tags,
    accentColor,
    githubUrl,
    liveUrl,
    index,
    pos
}: ProjectStackCardProps) => {
    const rgbColor = hexToRgb(accentColor);

    return (
        <div
            className="pcard"
            data-pos={pos}
            style={{
                '--card-accent': accentColor,
                '--card-accent-rgb': rgbColor
            } as any}
        >
            <div className="stack-card-content">
                <div className="card-watermark">{(index + 1).toString().padStart(2, '0')}</div>
                <div className="card-category">{category}</div>
                <h3>{title}</h3>
                <p className="card-description">{description}</p>
                
                <div className="card-tags">
                    {tags.map(tag => (
                        <span key={tag} className="stack-tag">{tag}</span>
                    ))}
                </div>

                <div className="card-actions">
                    {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="stack-btn primary">
                            <span>View Project</span>
                            <ExternalLink size={16} />
                        </a>
                    )}
                    {githubUrl && (
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="stack-btn secondary">
                            <Github size={16} />
                            <span>GitHub</span>
                        </a>
                    )}
                </div>
            </div>

            <div className="card-right">
                <div className="panel-fade" />
                <div className="visual-glow" />
                <AbstractVisual title={title} />
            </div>
        </div>
    );
};
