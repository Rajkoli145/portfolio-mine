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
import { Section, ProjectCard, CustomCursor, StoryReveal, CinematicBackground, Navbar } from './components';
import './App.css';

/* Character-by-character reveal helper */
const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const AnimatedName = ({ text }: { text: string }) => (
  <>
    {text.split('').map((char, i) => (
      <motion.span
        key={`${char}-${i}`}
        variants={charVariants}
        style={{ display: 'inline-block' }}
      >
        {char}
      </motion.span>
    ))}
  </>
);

function App() {
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  return (
    <div className={`app-container ${isStoryOpen ? 'story-active' : ''}`}>
      <CinematicBackground />
      <Navbar />
      <CustomCursor />

      <StoryReveal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

      <header className="hero">
        <div className="hero-editorial">
          {/* Left: Name with character-by-character reveal */}
          <motion.div
            className="hero-left"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            <h1 className="hero-name">
              <AnimatedName text="Raj" />
              <br />
              <span className="gradient-text">
                <AnimatedName text="Koli" />
              </span>
            </h1>
          </motion.div>

          {/* Right: Bio & Details — staggered cascade */}
          <motion.div
            className="hero-right"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: 0.45,
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            <motion.div
              className="hero-badge"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <Sparkles size={12} />
              <span>Open to new opportunities</span>
            </motion.div>

            <motion.p
              className="hero-role"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              Full-Stack Software Engineer
            </motion.p>

            <motion.p
              className="hero-bio"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              I build scalable web applications and AI-powered tools that transform complex ideas into <strong>fast, reliable products</strong>. My focus is clean architecture, performance, and seamless user experiences.
            </motion.p>

            <motion.div
              className="skill-pills"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'Python'].map(skill => (
                <motion.span
                  key={skill}
                  className="skill-pill"
                  variants={{
                    hidden: { opacity: 0, y: 10, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="hero-links"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {[
                { href: "https://github.com/Rajkoli145", icon: <Github size={14} />, label: "GitHub" },
                { href: "https://www.linkedin.com/in/raj-koli-626008318/", icon: <Linkedin size={14} />, label: "LinkedIn" },
                { href: "/Rajkoli_CV.pdf", icon: <FileText size={14} />, label: "Resume" },
                { href: "mailto:koliraj911@gmail.com", icon: <Mail size={14} />, label: "Email" },
              ].map(link => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : "_blank"}
                  rel={link.href.startsWith('mailto') ? undefined : "noopener noreferrer"}
                  className="hero-social-link"
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <div className="mouse"></div>
        </motion.div>
      </header>

      <main className="container">

        {/* Experience */}
        <Section title="Experience" delay={0.1} id="experience">
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
        <Section title="Selected Projects" delay={0.1} id="projects">
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
        <Section title="Philosophy" delay={0.2} id="about">
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
