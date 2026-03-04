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
                                I didn't start with fancy frameworks or perfect plans. My journey began with the simplest of tools: basic HTML and CSS. In those early days, code wasn't an abstraction — it was a way to make things appear on a screen and see something real.
                            </p>
                            <p>
                                I spent countless hours cloning real-world applications, not to copy them, but to understand the "how" behind the "what." Every broken layout and every failed script was a lesson learned the hard way. JavaScript followed shortly after, turning static pages into living, interactive experiments.
                            </p>
                        </Section>

                        <Section title="The Internship" delay={0.3}>
                            <p>
                                My first real taste of production code came during my internship at <strong>Unified Mentor</strong> as a Frontend Developer. Working within structured Git workflows, pull requests, and code reviews taught me that writing code is only half the job — collaborating on it is the other half.
                            </p>
                            <p>
                                I built modular, reusable UI components and resolved complex state-related issues that improved UI consistency. It was here I learned that real engineering is about making systems reliable, not just making them work once.
                            </p>
                        </Section>

                        <Section title="The Shift to Systems" delay={0.4}>
                            <p>
                                There came a point where "making it work" was no longer enough. I began contributing to <strong>La Tanda's</strong> production-grade TypeScript SDK, aligning with 67+ verified API endpoints. Designing a modular HttpClient with centralized error handling pushed me to think in terms of architecture, not just features.
                            </p>
                            <p>
                                My open-source contribution to <strong>RustChain</strong> — building a cross-platform installer with systemd/launchd integration — earned me a merged PR and a project bounty. It proved that real-world impact doesn't require a title; it requires shipping code that works.
                            </p>
                        </Section>

                        <Section title="What Drives Me" delay={0.5}>
                            <p>
                                Today, I'm pursuing my BTech in Computer Science at ITM Skills University while continuing to build. From AI-powered platforms like <strong>EduStory</strong> to real-time systems like <strong>Cross-Lingo Talk</strong>, every project is a notebook entry — a record of something I learned through struggle.
                            </p>
                            <p>
                                I believe in simplicity over cleverness, shipping over perfection, and fundamentals over frameworks. The journey from cloning apps to systems thinking is far from over, but every line of code is a step forward.
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
