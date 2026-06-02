import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Timeline from './components/sections/Timeline';
import Achievements from './components/sections/Achievements';
import GitHubStats from './components/sections/GitHubStats';
import Contact from './components/sections/Contact';


import CustomCursor from './components/ui/CustomCursor';
import CommandPalette from './components/ui/CommandPalette';
import ScrollProgress from './components/ui/ScrollProgress';

import './App.css';

export default function App() {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Disable smooth scroll on touch devices to improve native scrolling
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.05,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Handle curtain loading timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds loader duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Dynamic Scroll Progress & Cursor overlays */}
      <ScrollProgress />
      <CustomCursor />

      {/* Intro Curtain Loader */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            className="intro-overlay"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: 'top' }}
          >
            <div className="intro-loader-content">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="intro-logo-container"
              >
                <span className="intro-logo">YV</span>
                <span className="intro-logo-dot" />
              </motion.div>
              <motion.div
                className="loader-bar"
                initial={{ width: 0 }}
                animate={{ width: 140 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
              <span className="loader-status">Initializing System...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="app-layout">
        {/* Navigation bar */}
        <Navbar />

        {/* Search command panel overlay */}
        <CommandPalette />

        <main className="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Achievements />
          <GitHubStats />
          <Contact />
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </>
  );
}
