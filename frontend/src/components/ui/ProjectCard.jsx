import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, GitFork } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import VanillaTilt from 'vanilla-tilt';

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || !cardRef.current) return;

    VanillaTilt.init(cardRef.current, {
      max: 10,
      speed: 400,
      glare: true,
      'max-glare': 0.12,
      scale: 1.02,
      perspective: 1000,
    });

    const currentCard = cardRef.current;
    return () => {
      if (currentCard && currentCard.vanillaTilt) {
        currentCard.vanillaTilt.destroy();
      }
    };
  }, []);

    const formatDate = (dateValue) => {
    if (!dateValue) return null;
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateValue));
  };

  const projectColor = project.color || 'var(--accent)';
  const formattedIndex = index < 10 ? `0${index}` : index;

  return (
    <motion.article
      ref={cardRef}
      className={`project-card ${project.featured ? 'featured' : ''} ${project.wip ? 'wip' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{ '--project-color': projectColor }}
    >
      <div className="project-card-glow" style={{ background: `radial-gradient(circle at 50% 50%, ${projectColor}15, transparent 70%)` }} />

      <div className="card-header">
        <span className="project-number" style={{ color: projectColor }}>
          {project.emoji ? `${project.emoji} ` : ''}{formattedIndex}
        </span>
        <div className="card-links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} on GitHub`}
              className="card-link-icon"
            >
              <FaGithub size={18} />
            </a>
          )}
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.name}`}
              className="card-link-icon"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <div className="card-body">
        <h3 className="project-title">
          {project.name}
          {project.wip && <span className="wip-badge">WIP</span>}
        </h3>
        {project.tagline && <h4 className="project-tagline">{project.tagline}</h4>}
        <p className="project-desc">{project.description}</p>
      </div>

      <div className="card-footer">
        <div className="tech-stack">
          {project.stack && project.stack.slice(0, 5).map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        {(project.stars > 0 || project.forks > 0 || project.pushedAt) && (
          <div className="project-meta">
            {project.stars !== undefined && project.stars > 0 && (
              <span className="meta-item">
                <Star size={13} className="meta-icon" /> {project.stars}
              </span>
            )}
            {project.forks !== undefined && project.forks > 0 && (
              <span className="meta-item">
                <GitFork size={13} className="meta-icon" /> {project.forks}
              </span>
            )}
            {project.pushedAt && (
              <span className="meta-item date">
                {formatDate(project.pushedAt)}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
