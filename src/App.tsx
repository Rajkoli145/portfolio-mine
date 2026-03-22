import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Layers,
  Zap,
  BookOpen,
  Globe,
  FileText,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { Section, ProjectModal, CustomCursor, StoryReveal, CinematicBackground, Navbar, ProjectStackCard } from './components';
import ShinyText from './components/react-bits/ShinyText';
import StarBorder from './components/react-bits/StarBorder';
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

const TechIcons: Record<string, React.ReactNode> = {
  'React': (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="8" fill="#61DAFB" />
      <ellipse cx="50" cy="50" rx="45" ry="18" stroke="#61DAFB" strokeWidth="2" transform="rotate(0 50 50)" />
      <ellipse cx="50" cy="50" rx="45" ry="18" stroke="#61DAFB" strokeWidth="2" transform="rotate(60 50 50)" />
      <ellipse cx="50" cy="50" rx="45" ry="18" stroke="#61DAFB" strokeWidth="2" transform="rotate(120 50 50)" />
    </svg>
  ),
  'Next.js': (
    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.35 17.5h-1.3l-5.6-7.85V17.5H9.15V6.5h1.3l5.6 7.85V6.5h1.3v11z" />
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" fill="#68A063" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.4 0L1 2.5v19L5.4 24l4.4-2.5v-19L5.4 0zm13.2 0L14.2 2.5v19l4.4 2.5 4.4-2.5v-19L18.6 0zM5.5 17.5l-2.6-1.5V8l2.6-1.5 2.6 1.5v8l-2.6 1.5zm13.1 0l-2.6-1.5V8l2.6-1.5 2.6 1.5v8l-2.6 1.5z" />
    </svg>
  ),
  'TypeScript': (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 1.5h125v125H1.5z" fill="#3178c6" /><path d="M118.7 102.9c0 10.2-8 18.4-19.1 18.4-5.4 0-10.2-2.2-13.7-5.9l5.8-5.8c2.1 2.4 4.8 3.8 7.8 3.8 6.1 0 11.2-4.1 11.2-10.5 0-15.8-24.3-16.9-24.3-33.9 0-9.4 7.6-17.1 17.4-17.1 5.3 0 9.1 1.9 12.5 5.3l-5.3 5.3c-2.4-2.4-4.5-3.3-7.2-3.3-5.3 0-9.4 3.9-9.4 9.1 0 13.1 24.3 14.1 24.3 34.6zm-51.1-41.2V121h-8.2V61.7h-21V54h50.1v7.7H67.6z" fill="#fff" />
    </svg>
  ),
  'MongoDB': (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path d="M89.2 57.6c-4.4-18.4-14.6-34.6-25.2-46.6.1 0 .1.1.1.1 0 0 .1-.1.1-.1-10.6 12-20.8 28.2-25.2 46.6-4.6 19.3-2.1 36.3 3.6 48.4 4.8 10.2 12.4 17.8 21.6 22 9.1-4.2 16.7-11.8 21.4-22 5.3-11.9 8.1-29.3 3.6-48.4z" fill="#47a248" /><path d="M64.4 11c-.1 0-.1 0 0 0z" fill="#3f3e3e" /><path d="M64.1 110.1v17.4c0 .3.3.5.5.5.3 0 .5-.3.5-.5v-17.4c0-.3-.3-.5-.5-.5-.2 0-.5.2-.5.5z" fill="#3f3e3e" /><path d="M64.6 127.5c-.3 0-.5.2-.5.5 0 .3.2.5.5.5.3 0 .5-.2.5-.5 0-.3-.2-.5-.5-.5z" fill="#3f3e3e" /><path d="M68.5 63.3c0 8-3.7 15.1-7.1 20.3-.7 1.1-.7 1.1 0 0 3.4-5.2 7.1-12.3 7.1-20.3 0-6.9-2.7-13.1-6-17.8.4.5.3.4.4.5 3.3 4.7 5.6 10.6 5.6 17.3z" fill="#89c540" />
    </svg>
  ),
  'Python': (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path d="M64 5.4c-15.6 0-14.7 6.8-14.7 6.8l.1 7.1h15V21h-21s-10.7-1.3-10.7 14.7c0 16 9.4 15.4 9.4 15.4h5.6v-7.9s-.3-9.4 9.4-9.4h15.9s9.1 0 9.1-8.5V14s.9-8.6-12.1-8.6zm-6.8 4.6a2.2 2.2 0 1 1 0 4.3 2.2 2.2 0 0 1 0-4.3zm36 30.2v7.9s.3 9.4-9.4 9.4H67.8s-9.1 0-9.1 8.5v11.3s-.9 8.6 12.1 8.6c15.6 0 14.7-6.8 14.7-6.8l-.1-7.1h-15V71h21s10.7 1.3 10.7-14.7c0-16-9.4-15.4-9.4-15.4h-5.6zm1.3 35a2.2 2.2 0 1 1 0 4.3 2.2 2.2 0 0 1 0-4.3z" fill="#3776ab" />
    </svg>
  ),
  'Tailwind CSS': (
    <svg viewBox="0 0 24 24" fill="#06B6D4" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  'Docker': (
    <svg viewBox="0 0 24 24" fill="#2496ED" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.983 11.078h2.119c.102 0 .186.084.186.186V13.04c0 .102-.084.186-.186.186h-2.119a.186.186 0 01-.186-.186V11.264c0-.102.084-.187.186-.187zm-2.409 0h2.119c.102 0 .186.084.186.186V13.04c0 .102-.084.186-.186.186h-2.119a.186.186 0 01-.186-.186V11.264c0-.102.084-.187.186-.187zm-2.409 0h2.119c.102 0 .186.084.186.186V13.04c0 .102-.084.186-.186.186H9.165a.186.186 0 01-.186-.186V11.264c0-.102.084-.187.186-.187zm-2.409 0h2.119c.102 0 .186.084.186.186V13.04c0 .102-.084.186-.186.186h-2.119a.186.186 0 01-.186-.186V11.264c0-.102.084-.187.186-.187zm-2.41 0h2.119c.101 0 .186.084.186.186V13.04c0 .102-.085.186-.186.186H4.346a.186.186 0 01-.186-.186V11.264c0-.102.085-.187.186-.187zm2.41-2.409h2.119c.102 0 .186.084.186.186V10.63c0 .101-.084.185-.186.185h-2.119a.186.186 0 01-.186-.185V8.855c0-.101.084-.186.186-.186zm2.409 0h2.119c.102 0 .186.084.186.186V10.63c0 .101-.084.185-.186.185h-2.119a.186.186 0 01-.186-.185V8.855c0-.101.084-.186.186-.186zm2.41 0h2.119c.101 0 .186.084.186.186V10.63c0 .101-.085.185-.186.185h-2.119a.186.186 0 01-.186-.185V8.855c0-.101.085-.186.186-.186zm-4.818-2.408h2.119c.102 0 .186.084.186.186V8.22c0 .101-.084.185-.186.185h-2.119a.186.186 0 01-.186-.185V6.447c0-.101.084-.186.186-.186zM23.955 12.3c-.407-.389-1.05-.36-1.503-.36-.084-.287-.333-.944-.333-1.07a.127.127 0 00-.115-.125c-.218-.04-1.127-.04-1.393.03a.128.128 0 00-.096.126c.01 1.206-.06 3.368-1.53 4.417-.184.13-.377.247-.58.35h-.007s-.167.087-.167.087l.142.012c.3.003.738-.002.738-.002s3.69-.02 4.908-1.428a1.644 1.644 0 00.413-1.114V13.1c0-.28-.09-.537-.477-.8zM19.1 16.518c.03.04.053.081.071.125.003.008.017.042.01.037a4.581 4.581 0 01-1.848 1.48c-.643.32-1.336.567-2.053.729l-.262.06c-1.493.303-2.92.303-4.41-.01l-.26-.06c-1.337-.301-2.617-.833-3.717-1.48a.428.428 0 00-.23-.01V18.1c0 .2.022.408.083.58.113.333.315.65.657.854a11.77 11.77 0 004.226 1.34c.907.126 1.819.176 2.733.15a13.9 13.9 0 002.73-.15 11.666 11.666 0 004.18-1.344c.46-.276.756-.731.834-1.114.1-.482.1-1 .1-1.503V16.6l-.167.126-.145-.208z" />
    </svg>
  ),
  'Express': (
    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm6 17h-2.5l-1.5-3.5L12.5 17H10l2.5-5.5L10 6h2.5l1.5 3.5L15.5 6H18l-2.5 5.5L18 17z" />
    </svg>
  ),
  'PostgreSQL': (
    <svg viewBox="0 0 24 24" fill="#336791" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.15 11.19a4.88 4.88 0 00-.51-2.12c-.51-1.02-1.25-1.74-2.17-2.12a5.45 5.45 0 00-2.31-.5c-.87 0-1.63.17-2.3.51a5.4 5.4 0 00-2.16 2.12 4.9 4.9 0 00-.52 2.12c0 .87.17 1.63.52 2.3a5.4 5.4 0 002.16 2.16c.67.35 1.43.52 2.3.52 1.95 0 3.55-.83 4.41-2.43.2-.38.35-.8.43-1.25a4.7 4.7 0 00.08-1.21zm-4.99 3.09a2.7 2.7 0 01-1-.4 3.1 3.1 0 01-.8-.8c-.23-.33-.35-.7-.35-1.09a3.1 3.1 0 01.35-1.3 3.1 3.1 0 012.16-1.52c.3-.06.6-.08.9-.08.6 0 1.15.15 1.62.45a3.1 3.1 0 011.16 1.15c.23.4.35.85.35 1.3s-.12.9-.35 1.3a3.1 3.1 0 01-1.16 1.15c-.47.3-1.02.45-1.62.45a3 3 0 01-1.26-.3z" />
    </svg>
  ),
  'Git': (
    <svg viewBox="0 0 24 24" fill="#F05032" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.546 10.93L13.067.452a1.5 1.5 0 00-2.121 0L8.831 2.565l2.303 2.303a1.499 1.499 0 012.146 2.119L11.171 9.1l-.01.01a1.501 1.501 0 01-2.12-2.131L6.75 4.686l-6.3 6.297a1.5 1.5 0 000 2.121l10.479 10.479a1.5 1.5 0 002.121 0l10.496-10.496a1.502 1.502 0 000-2.157z" />
    </svg>
  ),
  'Vercel': (
    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 22.525H0l12-21.05 12 21.05z" />
    </svg>
  ),
  'AWS': (
    <svg viewBox="0 0 24 24" fill="#FF9900" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.923 14.155c-.155-2.073-1.656-2.538-3.054-2.538-2.64 0-3.365 2.123-3.365 3.365 0 1.139.673 2.692 2.744 2.692 1.45 0 2.226-1.036 3.013-2.226.207.259.259.57.259.88 0 1.294-.725 1.916-2.071 1.916-1.812 0-2.848-.932-3.158-2.692H5c.414 3.727 3.055 4.504 5.436 4.504 3.106 0 4.814-1.398 4.814-4.245 0-1.812-.932-3.417-2.329-4.14 1.346-.466 2.381-1.346 2.381-2.899 0-2.174-1.967-3.21-3.779-3.21-3.106 0-4.66.57-5.592 3.728l2.64.414s.57-2.123 2.434-2.123c1.035 0 1.656.777 1.656 1.708 0 1.709-1.967 1.864-2.692 1.864Z" />
    </svg>
  ),
  'Firebase': (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.7 94.6l5.2-32.9.1-.4L39.8 35.5l.1-.2c.2-.4.6-.3.7 0l9.3 17.5 14.8-28c.2-.3.6-.3.8 0l42.8 77.8c.2.4-.1.9-.6.8L21.3 95.8c-.4-.1-.7-.7-.6-1.2z" fill="#ffca28" /><path d="M20.7 94.6l5.2-32.9.1-.4L39.8 35.5l.1-.2c.2-.4.6-.3.7 0l9.3 17.5-.1.2L21.3 95.8c-.4-.1-.7-.7-.6-1.2z" fill="#ffa000" /><path d="M109.2 103.5l-42.8-77.8c-.2-.3-.6-.3-.8 0l-14.8 28-.1.2 21.6 40.5 36.6 9.9c.5.1.7-.4.5-.8z" fill="#ff8f00" /><path d="M21.3 95.8l43.5 11.5c.3.1.6.1.9 0L108 97.4c.5-.1.6-.8.2-1l-14.1-8-30.4-17.1-13-7.3-15.3-28.5L20.8 94.6c-.1.5.1 1.1.5 1.2z" fill="#eceff1" /><path d="M21.3 95.8l43.5 11.5c.3.1.6.1.9 0L108 97.4c.5-.1.6-.8.2-1l-14.1-8-30.4-17.1c-.6-.3-1.3-.3-1.9 0L21.3 95.8c-.4-.1-.7-.7-.6-1.2.1-.4.4-.7.8-.7z" fill="#f44336" />
    </svg>
  )
};

const projects = [
  {
    id: "01",
    title: "FreelancerFlow",
    category: "Full-Stack SaaS",
    description: "Comprehensive platform for freelance project tracking and automated invoicing. Designed with a modular backend for high scalability.",
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    accentColor: "#7c6fd4",
    imageUrl: "/projects/thumb-1.png",
    githubUrl: "https://github.com/Rajkoli145",
    liveUrl: "#",
  },
  {
    id: "02",
    title: "Cross-Lingo Talk",
    category: "Real-time Communication",
    description: "Real-time WebSocket chat system with instant translation integration. Built for low-latency global collaboration.",
    tags: ['React', 'Socket.io', 'Express', 'MongoDB'],
    accentColor: "#7ab8e8",
    imageUrl: "/projects/thumb-2.png",
    githubUrl: "https://github.com/Rajkoli145",
    liveUrl: "#",
  },
  {
    id: "03",
    title: "EduStory",
    category: "AI & Education",
    description: "AI-powered storytelling engine with structured prompt pipelines. Transforms curriculum into engaging interactive narratives.",
    tags: ['Next.js', 'MongoDB', 'AI', 'NextAuth'],
    accentColor: "#e8a87c",
    imageUrl: "/projects/thumb-3.png",
    githubUrl: "https://github.com/Rajkoli145",
    liveUrl: "#",
  },
  {
    id: "04",
    title: "RustChain Installer",
    category: "Systems Engineering",
    description: "High-performance cross-platform installer for blockchain nodes. Automates system-level configuration with Rust safety.",
    tags: ['Rust', 'Systems', 'Blockchain', 'Shell'],
    accentColor: "#7ae8a8",
    imageUrl: "/projects/thumb-4.png",
    githubUrl: "https://github.com/Rajkoli145",
    liveUrl: "#",
  }
];

function App() {
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isLocked, setIsLocked] = useState(false);
  const accRef = useRef(0);
  const isCoolingRef = useRef(false);
  const justReleasedRef = useRef(false);
  const threshold = 160;
  const cooldown = 750;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Use IntersectionObserver to catch the section as it scrolls into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // If the section is mostly in view and we haven't just released the lock
        if (entry.intersectionRatio > 0.8 && !isLocked && !justReleasedRef.current) {
          // Snap it to the top and lock it
          window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
          setIsLocked(true);
          accRef.current = 0;
        }

        // Reset the "justReleased" flag only when we've moved significantly away
        if (entry.intersectionRatio < 0.1) {
          justReleasedRef.current = false;
        }
      });
    }, { threshold: [0, 0.1, 0.8, 1] });

    observer.observe(section);

    const handleWheel = (e: WheelEvent) => {
      if (!isLocked) return;

      // During animation/cooldown, strictly block all scrolls within this section
      if (isCoolingRef.current) {
        e.preventDefault();
        return;
      }

      // Exit Boundaries
      const isAtStart = current === 0;
      const isAtEnd = current === projects.length - 1;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // If we are at the cards edges and scrolling OUT of the stack, 
      // release the lock and let normal scroll happen.
      if ((isAtStart && scrollingUp) || (isAtEnd && scrollingDown)) {
        setIsLocked(false);
        justReleasedRef.current = true;
        return;
      }

      // Within the stack scope, we intercept everything to cycle cards
      e.preventDefault();
      accRef.current += e.deltaY;

      if (accRef.current > threshold) {
        accRef.current = 0;
        isCoolingRef.current = true;
        setCurrent(c => Math.min(projects.length - 1, c + 1));
        setTimeout(() => { isCoolingRef.current = false; }, cooldown);
      }

      if (accRef.current < -threshold) {
        accRef.current = 0;
        isCoolingRef.current = true;
        setCurrent(c => Math.max(0, c - 1));
        setTimeout(() => { isCoolingRef.current = false; }, cooldown);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isLocked) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) { // Swipe up (scroll down)
          if (current < projects.length - 1) {
            setCurrent(c => c + 1);
          } else {
            setIsLocked(false);
            justReleasedRef.current = true;
          }
        } else { // Swipe down (scroll up)
          if (current > 0) {
            setCurrent(c => c - 1);
          } else {
            setIsLocked(false);
            justReleasedRef.current = true;
          }
        }
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      observer.disconnect();
      section.removeEventListener('wheel', handleWheel);
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchend', handleTouchEnd);
    };
  }, [current, isLocked]);


  return (
    <div className={`app-container ${isStoryOpen || selectedProject ? 'story-active' : ''}`}>
      <CinematicBackground />
      <Navbar />
      <CustomCursor />

      <StoryReveal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

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
              <span className="first-name">
                <AnimatedName text="Raj" />
              </span>
              {' '}
              <span className="last-name gradient-text">
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
                <StarBorder
                  key={skill}
                  as={motion.div}
                  className="skill-pill"
                  color="rgba(168, 139, 255, 0.5)"
                  speed="5s"
                  thickness={1}
                  variants={{
                    hidden: { opacity: 0, y: 10, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <div className="pill-content">
                    <span className="pill-icon">{TechIcons[skill]}</span>
                    <span>{skill}</span>
                  </div>
                </StarBorder>
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
                <motion.div
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <StarBorder
                    as="a"
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : "_blank"}
                    rel={link.href.startsWith('mailto') ? undefined : "noopener noreferrer"}
                    className="hero-social-link"
                    color="rgba(143, 168, 255, 0.5)"
                    speed="4s"
                    thickness={1}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </StarBorder>
                </motion.div>
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

      <section ref={sectionRef} id="projects">
        <div className="sec-header">
          <div className="eyebrow-container">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Selected Work</span>
          </div>
          <h2 className="stack-title">
            Featured <span style={{ color: '#7c6fd4' }}>Projects</span>
          </h2>
          <p className="stack-subtitle">
            {projects.length.toString().padStart(2, '0')} projects · scroll to explore
          </p>
        </div>

        <div className="stack-area">
          {projects.map((project, index) => (
            <ProjectStackCard
              key={project.title}
              {...project}
              index={index}
              pos={index - current}
            />
          ))}
        </div>

        {/* Progress + Dots */}
        <div className="stack-indicators">
          <div className="peek-progress-container">
            <div
              className="peek-progress-bar"
              style={{ width: `${((current + 1) / projects.length) * 100}%` }}
            />
          </div>
          <div className="peek-label">
            {(current + 1).toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')}
          </div>
          <div className="peek-dots">
            {projects.map((_, i) => (
              <div
                key={i}
                className={`peek-dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
      </section>

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

        {/* Tech Stack / Skills */}
        <Section title="Tech Stack" delay={0.1} id="skills">
          <div className="skills-grid-editorial">
            <div className="glass skills-category">
              <div className="category-header">
                <Code2 size={20} className="accent-icon" />
                <h3>Frontend</h3>
              </div>
              <div className="skill-tags">
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux'].map(skill => (
                  <span key={skill} className="skill-tag-with-icon">
                    {TechIcons[skill] && <span className="skill-icon-inline">{TechIcons[skill]}</span>}
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass skills-category">
              <div className="category-header">
                <Zap size={20} className="accent-icon" />
                <h3>Backend</h3>
              </div>
              <div className="skill-tags">
                {['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Python', 'Socket.io'].map(skill => (
                  <span key={skill} className="skill-tag-with-icon">
                    {TechIcons[skill] && <span className="skill-icon-inline">{TechIcons[skill]}</span>}
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass skills-category">
              <div className="category-header">
                <Layers size={20} className="accent-icon" />
                <h3>Tools & Platforms</h3>
              </div>
              <div className="skill-tags">
                {['Git', 'Docker', 'Postman', 'Vercel', 'AWS', 'Firebase'].map(skill => (
                  <span key={skill} className="skill-tag-with-icon">
                    {TechIcons[skill] && <span className="skill-icon-inline">{TechIcons[skill]}</span>}
                    {skill}
                  </span>
                ))}
              </div>
            </div>
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
                <span className="teaser-btn">
                  <ShinyText text="Read My Story" speed={3} color="rgba(143, 168, 255, 0.7)" shineColor="#ffffff" />
                </span>
              </div>
            </div>
          </div>
        </Section>

        {/* About / Philosophy */}
        <Section title="Philosophy" delay={0.2} id="about">
          <p>
            I believe that code is a notebook for thought. Every repository represents something I learned through struggle. My philosophy is simple:
          </p>
          <ul>
            <li>
              <strong>Simple {'\u003E'} Clever:</strong> Complexity is easy to add but hard to remove. I strive for clarity in every line.
            </li>
            <li>
              <strong>Shipped {'>'} Perfect:</strong> Real learning happens when code meets the real world.
            </li>
            <li>
              <strong>Fundamentals Matter:</strong> Frameworks come and go; first principles last a lifetime.
            </li>
          </ul>
        </Section>

        {/* Education */}
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

        {/* Connect / Contact */}
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
