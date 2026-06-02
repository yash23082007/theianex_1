import { motion } from 'framer-motion';
import { Calendar, Award, BookOpen } from 'lucide-react';
import { profile } from '../../data/profile';

const timelineIcons = [
  <BookOpen size={16} />,
  <Award size={16} />,
  <Award size={16} />
];

export default function Timeline() {
  const { timeline } = profile;

  return (
    <section className="timeline-section" id="timeline">
      <div className="section-container">
        {/* Section Heading */}
        <div className="section-header" data-animate>
          <span className="section-eyebrow">04           <h2 className="section-title">My Journey</h2>
          <div className="section-underline" />
        </div>

        {/* Vertical Timeline wrapper */}
        <div className="timeline-container">
          <div className="timeline-line" />

          {timeline.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div 
                key={index} 
                className={`timeline-item ${isLeft ? 'left' : 'right'}`}
              >
                {/* Node dot on the line */}
                <motion.div 
                  className="timeline-node"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }}
                >
                  <span className="node-icon-wrapper">
                    {timelineIcons[index] || <Calendar size={16} />}
                  </span>
                </motion.div>

                {/* Timeline Card content block */}
                <motion.div
                  className="timeline-card"
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
                >
                  <div className="timeline-card-glow" />
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <h4 className="timeline-subtitle">{item.subtitle}</h4>
                  <p className="timeline-desc">{item.description}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
