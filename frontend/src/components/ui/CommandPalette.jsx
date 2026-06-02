import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, Globe, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commands = [
    { id: 'about', label: 'Go to About Me', category: 'Navigation', icon: <Hash size={16} />, action: () => scrollToSection('#about') },
    { id: 'skills', label: 'Go to Skills', category: 'Navigation', icon: <Hash size={16} />, action: () => scrollToSection('#skills') },
    { id: 'projects', label: 'Go to Projects', category: 'Navigation', icon: <Hash size={16} />, action: () => scrollToSection('#projects') },
    { id: 'timeline', label: 'Go to Education Timeline', category: 'Navigation', icon: <Hash size={16} />, action: () => scrollToSection('#timeline') },
    { id: 'achievements', label: 'Go to Achievements', category: 'Navigation', icon: <Hash size={16} />, action: () => scrollToSection('#achievements') },
    { id: 'contact', label: 'Go to Contact', category: 'Navigation', icon: <Hash size={16} />, action: () => scrollToSection('#contact') },
    
    { id: 'github', label: 'Open GitHub Profile', category: 'Socials', icon: <Globe size={16} />, action: () => window.open('https://github.com/yash23082007', '_blank') },
    { id: 'linkedin', label: 'Open LinkedIn Profile', category: 'Socials', icon: <Globe size={16} />, action: () => window.open('https://www.linkedin.com/in/yash-vijay-b0a75937a', '_blank') },
    { id: 'instagram', label: 'Open Instagram Profile', category: 'Socials', icon: <Globe size={16} />, action: () => window.open('https://www.instagram.com/yash_vj23', '_blank') },
    
    { id: 'resume', label: 'Download Resume PDF', category: 'Resume', icon: <FileText size={16} />, action: () => window.open('/resume-yash-vijay.pdf', '_blank') },
    { id: 'devtype', label: 'Open DevType typing speed app', category: 'Projects', icon: <ArrowRight size={16} />, action: () => window.open('https://dev-type-self.vercel.app', '_blank') },
    { id: 'mindcheck', label: 'Open MindCheck AI Depression Predictor', category: 'Projects', icon: <ArrowRight size={16} />, action: () => window.open('https://ai-depression-predictor.vercel.app', '_blank') },
    { id: 'goldenface', label: 'Open GoldenFace Facial Analysis', category: 'Projects', icon: <ArrowRight size={16} />, action: () => window.open('https://goldenface-ai.vercel.app', '_blank') },
  ];

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cmd) => {
    cmd.action();
    setIsOpen(false);
  };

  const handleKeyDownList = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        handleSelect(filteredCommands[selectedIndex]);
      }
    }
  };

    useEffect(() => {
    if (!listRef.current) return;
    const activeElement = listRef.current.children[selectedIndex];
    if (activeElement) {
      activeElement.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <>
      {/* Floating command prompt reminder */}
      <button 
        className="cmd-palette-trigger" 
        onClick={() => setIsOpen(true)}
        aria-label="Open command palette"
      >
        <span className="cmd-text">Press</span>
        <kbd className="cmd-key">Ctrl + K</kbd>
        <span className="cmd-text">to navigate</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="cmd-palette-overlay">
            <motion.div
              className="cmd-palette-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className="cmd-palette-modal"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="cmd-input-container">
                <Search size={18} className="cmd-search-icon" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDownList}
                  className="cmd-search-input"
                />
                <span className="cmd-esc-badge">ESC</span>
              </div>

              <div ref={listRef} className="cmd-list">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, i) => (
                    <div
                      key={cmd.id}
                      onClick={() => handleSelect(cmd)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`cmd-item ${i === selectedIndex ? 'active' : ''}`}
                    >
                      <span className="cmd-item-icon">{cmd.icon}</span>
                      <div className="cmd-item-info">
                        <span className="cmd-item-label">{cmd.label}</span>
                        <span className="cmd-item-category">{cmd.category}</span>
                      </div>
                      {i === selectedIndex && (
                        <span className="cmd-item-enter">
                          <CornerDownLeft size={12} />
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="cmd-empty">No results found for "{query}"</div>
                )}
              </div>

              <div className="cmd-footer-guide">
                <span>Use arrows <kbd>↑</kbd> <kbd>↓</kbd> to move, <kbd>Enter</kbd> to select</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
