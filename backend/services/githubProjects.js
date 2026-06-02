const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'yash23082007';
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

const FEATURED_REPOS = new Set([
  'ai-depression-predictor',
  'goldenface-ai',
  'share.at.ease',
  'dev-type',
  'ExecuteX',
  'NeuralFlix',
]);

const KNOWN_TECH = [
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'MongoDB',
  'Prisma',
  'Tailwind CSS',
  'Flask',
  'Scikit-Learn',
  'Python',
  'TypeScript',
  'JavaScript',
  'HTML',
  'CSS',
  'C',
  'Web3',
  'Stellar',
  'Soroban',
  'MediaPipe',
  'Pinecone',
  'Zustand',
];

function titleFromName(name) {
  return name
    .replace(/[._-]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .trim();
}

function cleanDescription(repo) {
  const description = (repo.description || '').replace(/^"|"$/g, '').trim();

  if (description && !/^\.*-?$/.test(description)) {
    return description;
  }

  const title = titleFromName(repo.name);
  return `${title} is a ${repo.language || 'software'} project from Yash Vijay's GitHub portfolio.`;
}

function inferCategory(repo) {
  const haystack = `${repo.name} ${repo.description || ''}`.toLowerCase();

  if (haystack.includes('ai') || haystack.includes('neural') || haystack.includes('predictor')) {
    return 'AI/ML';
  }

  if (haystack.includes('blockchain') || haystack.includes('web3') || haystack.includes('soroban')) {
    return 'Web3';
  }

  if (haystack.includes('typing') || haystack.includes('compiler')) {
    return 'Developer Tool';
  }

  if (haystack.includes('crop') || haystack.includes('agri') || haystack.includes('farm')) {
    return 'AgriTech';
  }

  if (haystack.includes('chatbot')) {
    return 'AI Assistant';
  }

  if (repo.language === 'C') {
    return 'Programming Fundamentals';
  }

  return 'Full-stack';
}

function inferTechStack(repo) {
  const haystack = `${repo.name} ${repo.description || ''}`.toLowerCase();
  const stack = [];

  KNOWN_TECH.forEach((tech) => {
    if (haystack.includes(tech.toLowerCase())) {
      stack.push(tech);
    }
  });

  if (repo.language && !stack.includes(repo.language)) {
    stack.unshift(repo.language);
  }

  return [...new Set(stack)].slice(0, 8);
}

function normalizeRepo(repo, index = 0) {
  const pushedAt = repo.pushed_at || repo.updated_at || repo.created_at;

  return {
    title: titleFromName(repo.name),
    slug: repo.name,
    githubId: String(repo.id),
    description: cleanDescription(repo),
    techStack: inferTechStack(repo),
    language: repo.language || 'Code',
    category: inferCategory(repo),
    repoLink: repo.html_url,
    liveLink: repo.homepage || undefined,
    featured: FEATURED_REPOS.has(repo.name) || repo.stargazers_count > 0,
    year: pushedAt ? new Date(pushedAt).getFullYear() : new Date().getFullYear(),
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    pushedAt: pushedAt ? new Date(pushedAt) : undefined,
    sortOrder: index + 1,
  };
}

async function fetchGithubProjects() {
  const response = await fetch(GITHUB_REPOS_URL, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'yash-vijay-portfolio',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed with ${response.status}`);
  }

  const repos = await response.json();

  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .map(normalizeRepo);
}

module.exports = {
  fetchGithubProjects,
  normalizeRepo,
};
