import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, MapPin, Award, User, Code } from 'lucide-react';
import { profile } from '../../data/profile';

export default function About() {
  const [terminalTab, setTerminalTab] = useState('whoami');
  const [typedContent, setTypedContent] = useState('yash-vijay');

  const handleTerminalTab = (tab) => {
    setTerminalTab(tab);
    if (tab === 'whoami') {
      setTypedContent('yash-vijay');
    } else if (tab === 'skills') {
      setTypedContent('react  nextjs  python  ml  cpp  flask  mongodb  express  zustand  prisma');
    } else if (tab === 'fun_facts') {
      setTypedContent(
        '→ Typed 90+ WPM (I literally built a typing speed app)\n→ Built an AI that reads faces. φ = 1.618\n→ AES-256 encrypted everything I could\n→ BTech CSE-AI student @ JECRC Foundation'
      );
    }
  };

  return (
    <section className="about-section" id="about">
      <div className="section-container">
        {/* Section Heading */}
        <div className="section-header" data-animate>
          <span className="section-eyebrow">01           <h2 className="section-title">Who is Yash?</h2>
          <div className="section-underline" />
        </div>

        <div className="about-grid">
          {/* Left Column - Image Block */}
          <div className="about-visual-column">
            <motion.div
              className="about-image-wrapper"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={profile.avatarUrl}
                alt="Yash Vijay"
                className="about-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://avatars.githubusercontent.com/u/230879230?v=4';
                }}
              />
              <div className="about-image-accent" />
              
              {/* Overlay badges */}
              <div className="floating-badge badge-top">
                <Code size={14} className="badge-icon" />
                <span>AIML Dev</span>
              </div>
              <div className="floating-badge badge-bottom">
                <Award size={14} className="badge-icon" />
                <span>4★ HackerRank</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Text Bio */}
          <div className="about-text-column">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="about-bio"
            >
              <p className="bio-paragraph">
                {profile.bio.substring(0, 318)}
              </p>
              <p className="bio-paragraph">
                {profile.bio.substring(318)}
              </p>

              <ul className="bio-bullets">
                <li className="bio-bullet-item">
                  <MapPin size={18} className="bullet-icon" />
                  <span>Based in <strong>{profile.location}</strong></span>
                </li>
                <li className="bio-bullet-item">
                  <User size={18} className="bullet-icon" />
                  <span><strong>4★ HackerRank</strong> in Problem Solving</span>
                </li>
                <li className="bio-bullet-item">
                  <Award size={18} className="bullet-icon" />
                  <span>BTech CSE-AI at <strong>JECRC Foundation</strong> (CGPA 9.34)</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Terminal Easter Egg row */}
        <motion.div
          className="about-terminal-container"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="terminal-title">yashvijay@macbook-pro: ~</div>
            <div className="terminal-icon">
              <Terminal size={14} />
            </div>
          </div>

          <div className="terminal-body">
            <div className="terminal-tabs">
              <button
                className={`terminal-tab ${terminalTab === 'whoami' ? 'active' : ''}`}
                onClick={() => handleTerminalTab('whoami')}
              >
                whoami
              </button>
              <button
                className={`terminal-tab ${terminalTab === 'skills' ? 'active' : ''}`}
                onClick={() => handleTerminalTab('skills')}
              >
                ls skills/
              </button>
              <button
                className={`terminal-tab ${terminalTab === 'fun_facts' ? 'active' : ''}`}
                onClick={() => handleTerminalTab('fun_facts')}
              >
                cat fun_facts.txt
              </button>
            </div>

            <div className="terminal-output">
              <div className="terminal-command-line">
                <span className="prompt">$</span>
                <span className="command-text">
                  {terminalTab === 'whoami' && 'whoami'}
                  {terminalTab === 'skills' && 'ls skills/'}
                  {terminalTab === 'fun_facts' && 'cat fun_facts.txt'}
                </span>
              </div>
              <pre className="terminal-result">{typedContent}</pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
