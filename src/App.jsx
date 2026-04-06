import { useEffect, useRef, useState } from 'react';
import SoftAurora from './component/SoftAurora';
import './App.css';
import GlassIcons from './component/GlassIcons';
import { SiMysql, SiJavascript, SiHtml5 } from 'react-icons/si';
import { FaReact, FaNodeJs, FaGitAlt, FaFigma, FaCss3Alt } from 'react-icons/fa';

  const skills = [
    { icon: <FaReact size={40} />,      label: 'React',      color: '#61DAFB' },
    { icon: <SiJavascript size={40} />, label: 'JavaScript', color: '#F7DF1E' },
    { icon: <SiHtml5 size={40} />,      label: 'HTML5',      color: '#E34F26' },
    { icon: <FaCss3Alt size={40} />,    label: 'CSS3',        color: '#1572B6' },
    { icon: <SiMysql size={40} />,      label: 'MySQL',      color: '#4479A1' },
    { icon: <FaGitAlt size={40} />,     label: 'Git',        color: '#F05032' },
  ];

  const projects = [
    {
      title: 'Ineventory App Management',
      description: 'A smart inventory management app with real-time tracking, stock alerts, and reporting to optimize inventory operations.',
      link: 'https://github.com/japaldiansyah/Inventory-App-Management'
    },
    {
      title: 'Enterprise Asset Management System',
      description: 'A smart asset management platform with real-time tracking, analytics, and decision support to optimize asset performance',
      link: 'https://github.com/japaldiansyah/enterprise-asset-management'
    },
    
  ];

const socials = [
  { label: 'GitHub', icon: '⌥', href: 'https://github.com/' },
  { label: 'LinkedIn', icon: '◈', href: 'https://linkedin.com/' },
  { label: 'Twitter / X', icon: '✕', href: 'https://twitter.com/' },
  { label: 'Email', icon: '◉', href: 'mailto:you@email.com' },
];

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState({ about: false, skills: false, social: false, projects: false });
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const socialRef = useRef(null);
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

  // Scroll progress: 0 = top of hero, 1 = transition complete
  const transitionStart = windowHeight * 0.4;
  const transitionEnd = windowHeight * 0.9;
  const rawProgress = (scrollY - transitionStart) / (transitionEnd - transitionStart);
  const scrollProgress = Math.min(1, Math.max(0, rawProgress));

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observers for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.dataset.section;
            setVisible((v) => ({ ...v, [id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (skillsRef.current) observer.observe(skillsRef.current);
    if (socialRef.current) observer.observe(socialRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);

    return () => observer.disconnect();
  }, []);

  const auroraOpacity = 1 - scrollProgress;
  const blackOpacity = scrollProgress;
  const heroScale = 1 - scrollProgress * 0.05;


  return (
    <div className="app">

      {/* ── HERO SECTION ── */}
      <section
        ref={heroRef}
        className="hero"
        style={{ transform: `scale(${heroScale})` }}
      >
        {/* Aurora BG */}
        <div className="aurora-layer" style={{ opacity: auroraOpacity }}>
          <SoftAurora
            speed={0.6}
            scale={1.5}
            brightness={1}
            color1="#f7f7f7"
            color2="#e100ff"
            noiseFrequency={2.5}
            noiseAmplitude={1}
            bandHeight={0.5}
            bandSpread={1}
            octaveDecay={0.1}
            layerOffset={0}
            colorSpeed={1}
            enableMouseInteraction
            mouseInfluence={0.25}
          />
        </div>

        {/* Black overlay fading in */}
        <div className="black-overlay" style={{ opacity: blackOpacity }} />

        {/* Hero Text */}
        <div className="hero-content" style={{ opacity: Math.max(0, 1 - scrollProgress * 2.5) }}>
          <p className="hero-eyebrow">Hello</p>
          <h1 className="hero-title">
            I'm <span className="hero-name">Reza</span>
          </h1>
          <p className="hero-subtitle">Fullstack Developer · Software Engginer · Creative Coder</p>
          <div className="hero-scroll-hint">
            <span>Scroll to explore</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      {/* ── INTRO / ABOUT SECTION ── */}
      <section
        className={`intro-section ${visible.about ? 'visible' : ''}`}
        ref={aboutRef}
        data-section="about"
      >
        <div className="section-inner">
          <div className="section-label">01 — About</div>
          <h2 className="section-title"> One in<br /> Million Developer.</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I’m a frontend developer from Yogyakarta, Indonesia, 
                dedicated to creating modern, responsive, and high-performance websites. 
                I focus on delivering interfaces that are both visually engaging and easy to use.
                My approach is centered on understanding user needs and translating them into 
                effective digital solutions. I aim to build products that not only look good but also 
                help businesses achieve their goals.
              </p>
            </div>
            <div className="about-card">
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS SECTION ── */}
      <section
        className={`skills-section ${visible.skills ? 'visible' : ''}`}
        ref={skillsRef}
        data-section="skills"
      >
        <div className="section-inner">
          <div className="section-label">02 — Skills</div>
          <h2 className="section-title">Tools I wield<br />with confidence.</h2>
          <GlassIcons items={skills} className="skills-glass-grid" />
        </div>
      </section>


      {/* ── PROJECTS SECTION ── */}
      <section
        className={`projects-section ${visible.projects ? 'visible' : ''}`}
        ref={projectsRef}
        data-section="projects"
      >
        <div className="section-inner">
          <div className="section-label">03 — Projects</div>
          <h2 className="section-title">Things I've<br />built recently.</h2>
          <div className="projects-grid">
            {projects.map((project, i) => (
              <a
                key={i}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="project-card"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* ← hapus seluruh bagian ini */}
                {/* <div className="project-image-wrap">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-overlay">
                    <span>View Project →</span>
                  </div>
                </div> */}

                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL SECTION ── */}
      <section
        className={`social-section ${visible.social ? 'visible' : ''}`}
        ref={socialRef}
        data-section="social"
      >
        <div className="section-inner">
          <div className="section-label">04 — Find Me</div>
          <h2 className="section-title">Let's connect<br />& build together.</h2>
          <div className="social-grid">
            {socials.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="social-card"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="social-icon">{s.icon}</span>
                <span className="social-label">{s.label}</span>
                <span className="social-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
        <footer className="footer">
          <p>Built with React + Vite · © {new Date().getFullYear()} Your Name</p>
        </footer>
      </section>
      

    </div>
  );
}