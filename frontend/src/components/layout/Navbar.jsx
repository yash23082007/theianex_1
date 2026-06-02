import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

const navLinks = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Timeline', href: '#timeline', id: 'timeline' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',       threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <a href="#home" className="navbar-logo" onClick={(e) => handleLinkClick(e, '#home')}>
            <span className="logo-text">YV</span>
            <span className="logo-dot" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="navbar-links" aria-label="Desktop navigation">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`navbar-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="active-indicator"
                    className="navbar-active-bar"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right Action group */}
          <div className="navbar-actions">
            <ThemeToggle />
            <a
              href="/resume-yash-vijay.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-button"
            >
              <FileText size={15} />
              <span>Resume</span>
            </a>
            
            {/* Mobile Hamburger toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation side menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="mobile-menu-overlay">
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              className="mobile-menu-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="drawer-header">
                <a href="#home" className="navbar-logo" onClick={(e) => handleLinkClick(e, '#home')}>
                  <span className="logo-text">YV</span>
                  <span className="logo-dot" />
                </a>
                <button
                  className="mobile-menu-close"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="drawer-nav" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`drawer-link ${activeSection === link.id ? 'active' : ''}`}
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                ))}
                
                <a
                  href="/resume-yash-vijay.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drawer-resume-button"
                >
                  <FileText size={18} />
                  <span>Download Resume</span>
                </a>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
