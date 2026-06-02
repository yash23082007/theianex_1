import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../ui/ProjectCard';
import { projects as staticProjects } from '../../data/profile';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const GITHUB_REPOS_URL = 'https://api.github.com/users/yash23082007/repos?per_page=100&sort=updated';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
        const initialProjects = [...staticProjects];

    axios.get(`${API_BASE_URL}/api/projects`)
      .then((res) => {
                const merged = mergeProjectsData(initialProjects, res.data);
        setProjects(merged);
      })
      .catch(() => {
        setError('Portfolio API offline. Merging directly with GitHub live repository statistics.');
        return axios.get(GITHUB_REPOS_URL).then((res) => {
          const githubData = res.data.filter((repo) => !repo.fork && !repo.archived);
          const merged = mergeProjectsData(initialProjects, githubData);
          setProjects(merged);
        });
      })
      .catch(() => {
        setError('Live repository data could not be fetched. Displaying offline project records.');
        setProjects(initialProjects);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const mergeProjectsData = (staticData, liveData) => {
    return staticData.map((project) => {
            const slug = project.github ? project.github.split('/').pop().toLowerCase() : '';
      const matchingLive = liveData.find((liveItem) => {
        const liveSlug = liveItem.slug || liveItem.name || '';
        return liveSlug.toLowerCase() === slug || String(liveItem.githubId || liveItem.id) === String(project.id);
      });

      if (matchingLive) {
        return {
          ...project,
          stars: matchingLive.stars || matchingLive.stargazers_count || 0,
          forks: matchingLive.forks || matchingLive.forks_count || 0,
          pushedAt: matchingLive.pushedAt || matchingLive.pushed_at || null,
          live: project.live === '#' ? (matchingLive.liveLink || matchingLive.homepage || '#') : project.live,
        };
      }
      return project;
    });
  };

  const categories = useMemo(() => {
    return ['All', 'AI/ML', 'Developer Tool', 'Full-stack', 'Web3'];
  }, []);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
            const categoryMatch = activeCategory === 'All' || 
        (project.stack && project.stack.some(tech => tech.toLowerCase() === activeCategory.toLowerCase())) ||
        (activeCategory === 'AI/ML' && (project.name === 'MindCheck' || project.name === 'GoldenFace AI' || project.name === 'NeuralFlix')) ||
        (activeCategory === 'Developer Tool' && (project.name === 'DevType' || project.name === 'ExecuteX' || project.name === 'Caption Studio')) ||
        (activeCategory === 'Full-stack' && (project.name === 'DevType' || project.name === 'Share At Ease')) ||
        (activeCategory === 'Web3' && project.stack && project.stack.includes('Web3'));

            const searchMatch = !normalizedQuery || [
        project.name,
        project.tagline,
        project.description,
        ...(project.stack || [])
      ].join(' ').toLowerCase().includes(normalizedQuery);

      return categoryMatch && searchMatch;
    });
  }, [projects, activeCategory, query]);

    const stats = useMemo(() => {
    const totalStars = projects.reduce((acc, p) => acc + (p.stars || 0), 0);
    return {
      count: projects.length,
      featured: projects.filter((p) => p.featured).length,
      stars: totalStars,
    };
  }, [projects]);

  return (
    <section className="projects-section" id="projects">
      <div className="section-container">
        {/* Section Heading */}
        <div className="projects-heading-container" data-animate>
          <div>
            <span className="section-eyebrow">03             <h2 className="section-title font-display">Featured Projects</h2>
            <div className="section-underline" />
          </div>
          <div className="project-metrics" aria-label="Project metrics summary">
            <span className="metric-tag">{stats.count} Projects Shipped</span>
            <span className="metric-tag">{stats.featured} Featured Builds</span>
            {stats.stars > 0 && <span className="metric-tag">{stats.stars} Repo Stars</span>}
          </div>
        </div>

        {/* Project search and filters */}
        <div className="project-controls">
          <div className="search-bar-wrapper">
            <input
              type="text"
              placeholder="Search by keyword, tool, or feature..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="project-search-input"
            />
          </div>
          
          <div className="category-tabs" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="notice-banner">{error}</div>}

        {/* Bento Grid */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <span>Assembling bento grid modules...</span>
          </div>
        ) : (
          <>
            <div className="projects-bento-grid">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + 1}
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="empty-state">
                <p>No project configurations correspond to "{query}" in this category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
