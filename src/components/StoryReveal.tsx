import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Section } from './Section';

interface StoryRevealProps {
    isOpen: boolean;
    onClose: () => void;
}

export const StoryReveal = ({ isOpen, onClose }: StoryRevealProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
                    animate={{ opacity: 1, clipPath: 'circle(150% at 50% 50%)' }}
                    exit={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="story-reveal-overlay"
                >
                    <div className="story-content container">
                        <button onClick={onClose} className="close-story glass" aria-label="Close story">
                            <X size={24} />
                        </button>

                        <Section title="Beginning" delay={0.2}>
                            <p>
                                I didn’t start with fancy frameworks or perfect plans. My journey in tech began with the simplest of tools: basic HTML and CSS. In those early days, code wasn't an abstraction; it was a way to make things appear on a screen.
                            </p>
                            <p>
                                I spent countless hours cloning real-world applications, not to copy them, but to understand the "how" behind the "what." Every broken layout and every failed script was a lesson learned the hard way. JavaScript followed shortly after, turning static pages into living, interactive experiments.
                            </p>
                        </Section>

                        <Section title="The Shift" delay={0.4}>
                            <p>
                                There comes a point in every developer's journey where "making it work" is no longer enough. I felt a shift from surface-level development towards a deeper interest in systems thinking. It wasn't just about the UI anymore; it was about how the data flowed, how the state was managed, and how the underlying systems communicated.
                            </p>
                            <p>
                                This transition led me to explore full-stack development, dive into open-source contributions, and participate in hackathons where rapid prototyping forced me to think in terms of scalable systems rather than just isolated features.
                            </p>
                        </Section>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="story-footer"
                        >
                            <button onClick={onClose} className="back-btn">
                                <span>Back to Portfolio</span>
                                <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
