import { motion } from 'framer-motion';
import SkillBadge from '../ui/SkillBadge';
import { profile } from '../../data/profile';

const categoryTitles = {
  languages: 'Languages',
  frontend: 'Frontend Web',
  backend: 'Backend & DB',
  aiml: 'AI / Machine Learning',
  tools: 'Tools & Platforms',
};

export default function Skills() {
  const { skills } = profile;

    const allSkillsList = [
    ...skills.languages,
    ...skills.frontend,
    ...skills.backend,
    ...skills.aiml,
    ...skills.tools,
  ];

    const marqueeItems = [...allSkillsList, ...allSkillsList, ...allSkillsList];

  return (
    <section className="skills-section" id="skills">
      <div className="section-container">
        {/* Section Heading */}
        <div className="section-header" data-animate>
          <span className="section-eyebrow">02           <h2 className="section-title">What I work with</h2>
          <div className="section-underline" />
        </div>

        {/* Skill Groups Grid */}
        <div className="skills-groups-container">
          {Object.entries(skills).map(([categoryKey, categorySkills], catIdx) => (
            <motion.div
              key={categoryKey}
              className="skills-category-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            >
              <h3 className="category-title">{categoryTitles[categoryKey] || categoryKey}</h3>
              <div className="category-badges-grid">
                {categorySkills.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                    level={skill.level}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Infinite Logo Marquee row */}
        <div className="skills-marquee-container">
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {marqueeItems.map((item, idx) => (
                <div key={`${item.name}-${idx}`} className="marquee-item">
                  <span className="marquee-icon">{item.icon || '✦'}</span>
                  <span className="marquee-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
