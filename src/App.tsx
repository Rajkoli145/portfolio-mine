import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Brain,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Layers,
  Zap,
  BookOpen,
  Globe,
  MessageSquare,
  FileText,
  Briefcase,
  GraduationCap
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
        <div className="hero-editorial">
          {/* Left: Massive Name */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="hero-name">
              Raj
              <br />
              <span className="gradient-text">Koli</span>
            </h1>
          </motion.div>

          {/* Right: Bio & Details */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-badge">
              <Sparkles size={14} />
              <span>Available for new systems</span>
            </div>

            <p className="hero-role">Software Engineer</p>

            <p className="hero-bio">
              Specializing in full-stack JavaScript systems, API integrations, and AI-assisted tooling. Building scalable web platforms with a focus on clean architecture.
            </p>

            <div className="skill-pills">
              {['TypeScript', 'React', 'Node.js', 'Next.js', 'Python', 'MongoDB'].map(skill => (
                <span key={skill} className="skill-pill">{skill}</span>
              ))}
            </div>

            <div className="hero-links">
              <a href="https://github.com/Rajkoli145" target="_blank" rel="noopener noreferrer" className="hero-social-link">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/raj-koli-626008318/" target="_blank" rel="noopener noreferrer" className="hero-social-link">
                <Linkedin size={18} />
              </a>
              <a href="mailto:koliraj911@gmail.com" className="hero-social-link">
                <Mail size={18} />
              </a>
            </div>
          </motion.div>
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

        {/* Experience */}
        <Section title="Experience" delay={0.1}>
          <div className="experience-list">
            <div className="glass experience-card">
              <div className="experience-header">
                <div>
                  <h3>SDK Developer</h3>
                  <p className="mono-label">La Tanda — Fintech Platform · 2025 – Present</p>
                </div>
                <Briefcase size={20} style={{ color: 'var(--accent-primary)', opacity: 0.7 }} />
              </div>
              <ul>
                <li>Contributing to production-grade TypeScript SDK aligned with 67+ verified API endpoints.</li>
                <li>Ensuring endpoint accuracy through Swagger validation and structured testing workflows.</li>
                <li>Designed modular HttpClient architecture with centralized error handling.</li>
              </ul>
            </div>

            <div className="glass experience-card">
              <div className="experience-header">
                <div>
                  <h3>Frontend Developer Intern</h3>
                  <p className="mono-label">Unified Mentor · Sep 2025 – Dec 2025</p>
                </div>
                <Briefcase size={20} style={{ color: 'var(--accent-primary)', opacity: 0.7 }} />
              </div>
              <ul>
                <li>Developed modular and reusable UI components using modern JavaScript practices.</li>
                <li>Resolved complex state-related issues improving UI consistency and responsiveness.</li>
                <li>Worked within structured Git workflows including pull requests and code reviews.</li>
              </ul>
            </div>

            <div className="glass experience-card">
              <div className="experience-header">
                <div>
                  <h3>RustChain Installer Contributor</h3>
                  <p className="mono-label">Open Source · 2026</p>
                </div>
                <Globe size={20} style={{ color: 'var(--accent-primary)', opacity: 0.7 }} />
              </div>
              <ul>
                <li>Built cross-platform installer (macOS & Linux) with wallet configuration and checksum validation.</li>
                <li>Integrated system-level automation using systemd and launchd.</li>
                <li>Pull request merged into main branch; awarded project bounty.</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Projects */}
        <Section title="Selected Projects" delay={0.1}>
          <div className="projects-grid">
            <ProjectCard
              title="FreelancerFlow"
              description="Full-stack platform for freelance project tracking and invoicing. Modular backend architecture with structured REST APIs and validation middleware."
              tags={['React', 'Node.js', 'MongoDB', 'Tailwind CSS']}
              icon={<Layers size={24} />}
              delay={0.2}
              githubUrl="https://github.com/Rajkoli145"
            />
            <ProjectCard
              title="Cross-Lingo Talk"
              description="Real-time WebSocket chat system with multilingual translation integration. Features OTP-based authentication and secure session handling."
              tags={['React', 'Express', 'MongoDB', 'Socket.io']}
              icon={<MessageSquare size={24} />}
              delay={0.3}
              githubUrl="https://github.com/Rajkoli145"
            />
            <ProjectCard
              title="EduStory"
              description="AI-powered storytelling engine with structured prompt pipelines. Integrated authentication and persistent storage using NextAuth."
              tags={['Next.js', 'MongoDB', 'AI', 'NextAuth']}
              icon={<Brain size={24} />}
              delay={0.4}
              githubUrl="https://github.com/Rajkoli145"
            />
          </div>
        </Section>

        {/* Story Teaser */}
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

        {/* Philosophy */}
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

        {/* Education & Certifications */}
        <Section title="Education" delay={0.2}>
          <div className="grid-split">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <GraduationCap size={20} style={{ color: 'var(--accent-primary)' }} />
                <h3 style={{ marginBottom: 0 }}>BTech in Computer Science</h3>
              </div>
              <p className="mono-label" style={{ marginBottom: '0.5rem' }}>ITM Skills University · 2024 – 2028</p>
              <p>12th (PCMB) — 80%</p>
            </div>
            <div>
              <h3>Certifications</h3>
              <ul>
                <li>Postman API Fundamentals — Student Expert</li>
                <li>GenAI 101 with Pieces</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Connect */}
        <Section title="Connect" delay={0.2} id="contact">
          <div className="glass contact-card">
            <p>I'm always open to discussing systems, code, or anything in between. Let's connect.</p>
            <div className="contact-links">
              <a href="mailto:koliraj911@gmail.com" className="contact-link">
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
              <a href="/Rajkoli_CV.pdf" target="_blank" rel="noopener noreferrer" className="contact-link">
                <FileText size={20} />
                <span>Resume</span>
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
