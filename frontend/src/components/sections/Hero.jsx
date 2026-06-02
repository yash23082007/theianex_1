import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Trophy } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import MagneticButton from '../ui/MagneticButton';
import { profile } from '../../data/profile';

const roles = [
  'AI/ML Developer',
  'Full Stack Engineer',
  'Problem Solver',
  'Open Source Enthusiast',
  'BTech CSE-AI Student',
];

export default function Hero() {
  const canvasRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
    let timer;
    const currentFullText = roles[roleIndex];
    
    if (isDeleting) {
            timer = setTimeout(() => {
        setDisplayedRole(currentFullText.substring(0, displayedRole.length - 1));
      }, 50);
    } else {
            timer = setTimeout(() => {
        setDisplayedRole(currentFullText.substring(0, displayedRole.length + 1));
      }, 100);
    }

        if (!isDeleting && displayedRole === currentFullText) {
            timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedRole === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

    useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));
    
        const mouse = {
      x: null,
      y: null,
      radius: 140,
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

                if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
                        this.x += (dx / dist) * force * 1.5;
            this.y += (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
                const accentColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--accent')
          .trim() || '#FF4D00';

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${accentColor}80`;         ctx.fill();
      }
    }

        for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

        const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

        const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

        const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim() || '#FF4D00';

            particles.forEach((p) => {
        p.update();
        p.draw();
      });

            for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (110 - dist) / 110 * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `${accentColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScrollDown = (e) => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

    const nameArray = profile.name.split('');

  return (
    <section className="hero-section" id="home">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-content">
        {/* Floating open to work status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="status-badge"
        >
          <span className="pulse-dot" />
          <span className="status-text">Open to Internships & Collaboration</span>
        </motion.div>

        {/* Intro Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hero-eyebrow"
        >
          Hi, my name is
        </motion.p>

        {/* Name Title with letter staggered entrance */}
        <h1 className="hero-name" aria-label={profile.name}>
          {nameArray.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3 + i * 0.04,
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="name-char"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        {/* Typing roles subtitle */}
        <div className="hero-subtitle-container">
          <span className="role-prefix">I build </span>
          <span className="role-text">
            {displayedRole}
            <span className="role-cursor">|</span>
          </span>
        </div>

        {/* Summary bio snippet */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="hero-summary"
        >
          {profile.summary}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="hero-actions"
        >
          <MagneticButton
            className="btn-primary"
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
          </MagneticButton>

          <a href="/resume-yash-vijay.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary clickable">
            Download CV
          </a>
        </motion.div>

        {/* Social Icons Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="hero-socials"
        >
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="social-icon">
            <FaGithub size={20} />
          </a>
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon">
            <FaLinkedin size={20} />
          </a>
          <a href={profile.hackerrankUrl} target="_blank" rel="noreferrer" aria-label="HackerRank" className="social-icon">
            <Trophy size={18} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="social-icon">
            <Mail size={19} />
          </a>
        </motion.div>
      </div>

      {/* Bouncing scroll down indicator */}
      <motion.a
        href="#about"
        onClick={handleScrollDown}
        className="scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <span className="scroll-indicator-text">Scroll Down</span>
        <ArrowDown size={14} className="scroll-indicator-icon" />
      </motion.a>
    </section>
  );
}
