import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { GitBranch, Star, Eye } from 'lucide-react';

export default function GitHubStats() {
  const [theme, setTheme] = useState('dark');
  const username = 'yash23082007';

  useEffect(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(currentTheme);

        const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const nextTheme = document.documentElement.getAttribute('data-theme') || 'dark';
          setTheme(nextTheme);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

    const isDark = theme === 'dark';
  const textColor = isDark ? 'F0EEE8' : '0D0D0D';
  const titleColor = isDark ? 'FF6B35' : 'FF4D00';
  const iconColor = isDark ? 'FF6B35' : 'FF4D00';

  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&title_color=${titleColor}&icon_color=${iconColor}&text_color=${textColor}&rank_icon=github`;
  const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true&title_color=${titleColor}&text_color=${textColor}`;
  const streakUrl = `https://streak-stats.demolab.com?user=${username}&theme=transparent&hide_border=true&title_color=${titleColor}&text_color=${textColor}&fire=${titleColor}`;

  return (
    <section className="github-stats-section" id="github-stats">
      <div className="section-container">
        {/* Section Heading */}
        <div className="section-header" data-animate>
          <span className="section-eyebrow">06           <h2 className="section-title">GitHub Activity</h2>
          <div className="section-underline" />
        </div>

        {/* Live Contribution Calendar */}
        <motion.div
          className="github-calendar-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="calendar-header-meta">
            <span className="calendar-title">Contribution Calendar</span>
            <a 
              href={`https://github.com/${username}`} 
              target="_blank" 
              rel="noreferrer" 
              className="calendar-link"
            >
              @github/{username}
            </a>
          </div>
          
          <div className="calendar-widget-wrapper">
            <GitHubCalendar 
              username={username}
              fontSize={12}
              blockSize={12}
              blockMargin={4}
              colorScheme={isDark ? 'dark' : 'light'}
            />
          </div>
        </motion.div>

        {/* Stats API Graphics Grid */}
        <div className="github-graphics-grid">
          {/* Stats Summary Graphic */}
          <motion.div
            className="graphic-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="graphic-card-header">General Stats</div>
            <div className="graphic-image-wrapper">
              <img 
                src={statsUrl} 
                alt={`${username} GitHub stats`} 
                loading="lazy"
                className="stats-svg-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </motion.div>

          {/* Languages Distribution Graphic */}
          <motion.div
            className="graphic-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="graphic-card-header">Top Languages</div>
            <div className="graphic-image-wrapper">
              <img 
                src={langsUrl} 
                alt={`${username} top languages`} 
                loading="lazy"
                className="stats-svg-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </motion.div>

          {/* Streak Counter Graphic */}
          <motion.div
            className="graphic-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="graphic-card-header">Commit Streak</div>
            <div className="graphic-image-wrapper">
              <img 
                src={streakUrl} 
                alt={`${username} commit streak`} 
                loading="lazy"
                className="stats-svg-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
