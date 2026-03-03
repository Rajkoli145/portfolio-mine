import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Cpu,
  Brain,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Terminal,
  Layers,
  Zap,
  BookOpen
} from 'lucide-react';
import { Section, ProjectCard, ThemeToggle, CustomCursor, StoryReveal, CinematicBackground } from './components';
import './App.css';

function App() {
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  return (
    <div className={`app-container ${isStoryOpen ? 'story-active' : ''}`}>
      <CinematicBackground />
      <CustomCursor />
      <ThemeToggle />

      <StoryReveal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

      <header className="hero">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-badge"
          >
            <Sparkles size={16} />
            <span>Available for new systems</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Raj <span className="gradient-text">Koli</span>
          </motion.h1>

          <motion.p
            className="personal-statement"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            A developer who learned by building — breaking things, fixing them, and doing it again until it worked.
          </motion.p>
        </div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="mouse"></div>
        </motion.div>
      </header>

      <main className="container">
        <Section title="What I’m Building Now" delay={0.1}>
          <p>
            Today, my focus has moved even closer to the fundamentals. I'm currently working on several projects that challenge my understanding of how software works at its core:
          </p>
          <div className="projects-grid">
            <ProjectCard
              title="Custom DSL"
              description="Exploring language design and compiler basics to create a domain-specific language for specific automation tasks."
              tags={['TypeScript', 'Compilers', 'AST']}
              icon={<Terminal size={24} />}
              delay={0.2}
              githubUrl="https://github.com/Rajkoli145"
            />
            <ProjectCard
              title="Neural Network Framework"
              description="Building a framework from scratch (no high-level libraries) to deeply understand the mathematics and logic behind machine learning."
              tags={['Math', 'Algorithms', 'Logic']}
              icon={<Cpu size={24} />}
              delay={0.3}
            />
            <ProjectCard
              title="AI Experimentation"
              description="Practical applications of LLMs and agentic workflows to solve real-world problems."
              tags={['LLMs', 'Agents', 'Python']}
              icon={<Brain size={24} />}
              delay={0.4}
            />
          </div>
        </Section>

        <Section delay={0.2}>
          <div className="glass story-teaser" onClick={() => setIsStoryOpen(true)}>
            <div className="story-teaser-content">
              <div className="icon-wrapper">
                <BookOpen size={32} className="gradient-text" />
              </div>
              <div className="story-teaser-text">
                <h3 className="gradient-text">Interested in the journey?</h3>
                <p>From cloning apps to systems thinking — discover the story behind the code.</p>
                <span className="teaser-btn">Read My Story</span>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Philosophy" delay={0.2}>
          <p>
            I believe that code is a notebook for thought. Every repository represents something I learned through struggle. My philosophy is simple:
          </p>
          <ul>
            <li>
              <strong>Simple {'>'} Clever:</strong> Complexity is easy to add but hard to remove. I strive for clarity in every line.
            </li>
            <li>
              <strong>Shipped {'>'} Perfect:</strong> Real learning happens when code meets the real world.
            </li>
            <li>
              <strong>Fundamentals Matter:</strong> Frameworks come and go; first principles last a lifetime.
            </li>
          </ul>
        </Section>

        <Section title="Influence & Beyond" delay={0.2}>
          <div className="grid-split">
            <div>
              <h3>Books & Learning</h3>
              <p>
                My thinking has been shaped by more than just documentation. I find deep inspiration in books that explore systems, logic, and the human side of engineering.
              </p>
            </div>
            <div>
              <h3>Balance</h3>
              <p>
                I find balance in personal growth, music, and the discipline required to master any craft. These pursuits outside of tech inform my approach to development.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Connect" delay={0.2} id="contact">
          <div className="glass contact-card">
            <p>If you’re reading this, you’re already part of the journey. I’m always open to discussing systems, code, or anything in between.</p>
            <div className="contact-links">
              <a href="mailto:your-email@example.com" className="contact-link">
                <Mail size={20} />
                <span>Email</span>
              </a>
              <a href="https://github.com/Rajkoli145" target="_blank" rel="noopener noreferrer" className="contact-link">
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/raj-koli-626008318/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer className="container">
        <hr />
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Raj Koli. Code is my notebook.</p>
          <div className="footer-badges">
            <span className="badge"><Code2 size={14} /> React</span>
            <span className="badge"><Zap size={14} /> Vite</span>
            <span className="badge"><Layers size={14} /> Framer</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
