import { motion } from 'framer-motion';

export default function SkillBadge({ name, icon, level }) {
    const displayIcon = icon || '⚡';

  return (
    <motion.div
      className="skill-badge"
      whileHover={{ scale: 1.05, y: -4, borderColor: 'var(--accent)' }}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <div className="skill-content">
        <span className="skill-icon">{displayIcon}</span>
        <span className="skill-name">{name}</span>
      </div>
      {level !== undefined && (
        <div className="skill-dots" aria-label={`Skill level ${level} out of 5`}>
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`skill-dot ${i <= level ? 'active' : ''}`}
              style={{
                backgroundColor: i <= level ? 'var(--accent)' : 'var(--border)',
                transitionDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
