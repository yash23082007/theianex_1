import { motion } from 'framer-motion';
import { ArrowUp, Trophy, Heart } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { profile } from '../../data/profile';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top split row */}
        <div className="footer-top-row">
          <div className="footer-brand-side">
            <div className="brand-logo-combo">
              <span className="footer-logo">YV</span>
              <span className="logo-dot" />
            </div>
            <p className="footer-brand-tagline">
              BTech CSE-AI student @ JECRC Foundation, Jaipur
            </p>
          </div>

          <div className="footer-nav-side">
            <h4 className="footer-side-title">Connect & Explore</h4>
            <div className="footer-social-links">
              <a 
                href={profile.githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="GitHub Profile" 
                className="footer-social-icon clickable"
              >
                <FaGithub size={18} />
              </a>
              <a 
                href={profile.linkedinUrl} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn Profile" 
                className="footer-social-icon clickable"
              >
                <FaLinkedin size={18} />
              </a>
              <a 
                href={profile.instagramUrl} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram Profile" 
                className="footer-social-icon clickable"
              >
                <FaInstagram size={18} />
              </a>
              <a 
                href={profile.hackerrankUrl} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="HackerRank Profile" 
                className="footer-social-icon clickable"
              >
                <Trophy size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="footer-divider" />

        {/* Bottom split row */}
        <div className="footer-bottom-row">
          <div className="footer-copyright-text">
            <span>© {new Date().getFullYear()} Yash Vijay. Crafted with </span>
            <Heart size={12} className="heart-icon" />
            <span> and curiosity.</span>
          </div>

          {/* Return to top clicker */}
          <motion.a
            href="#home"
            onClick={scrollToTop}
            className="footer-back-to-top clickable"
            whileHover={{ y: -3, backgroundColor: 'var(--accent)', color: '#FFFFFF' }}
            transition={{ duration: 0.2 }}
            aria-label="Return to top of page"
          >
            <ArrowUp size={16} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
