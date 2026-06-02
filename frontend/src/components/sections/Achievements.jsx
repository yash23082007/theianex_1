import { motion } from 'framer-motion';
import { profile } from '../../data/profile';

export default function Achievements() {
  const { achievements } = profile;

  return (
    <section className="achievements-section" id="achievements">
      <div className="section-container">
        {/* Section Heading */}
        <div className="section-header" data-animate>
          <span className="section-eyebrow">05           <h2 className="section-title">Achievements</h2>
          <div className="section-underline" />
        </div>

        {/* Grid layout of achievements cards */}
        <div className="achievements-grid">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              className="achievement-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{
                y: -6,
                borderColor: 'var(--accent)',
                boxShadow: '0 12px 30px rgba(255, 77, 0, 0.08)'
              }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 12,
                delay: index * 0.04
              }}
            >
              <div className="achievement-icon-wrapper">
                <span className="achievement-icon">{item.icon}</span>
              </div>
              <div className="achievement-card-body">
                <h3 className="achievement-card-title">{item.title}</h3>
                <p className="achievement-card-desc">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
