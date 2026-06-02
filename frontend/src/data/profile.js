export const profile = {
  name: 'Yash Vijay',
  title: 'AI/ML & Full Stack Developer',
  education: 'B.Tech CSE-AI, JECRC Foundation Jaipur',
  educationPeriod: '2025 - 2029',
  cgpa: '9.34',
  location: 'Jaipur, Rajasthan',
  summary:
    'Second-year CSE-AI student building real-world projects. I love shipping code to production and solving actual problems.',
  bio: 'Hey there! I am Yash Vijay, currently navigating my second year of B.Tech in CSE (Artificial Intelligence) at JECRC Foundation. I really enjoy building things that matter, whether that is a mental health tool powered by AI or a secure file sharing app. My tech stack usually involves full-stack web dev and some machine learning sprinkled in. I try to make sure everything I build actually gets deployed and used. Besides that, I have a 4-star problem solving rating on HackerRank and write code in C++, Python, and JS. Right now I am heavily focused on NeuralFlix, a movie recommendation prototype I am working on. When I am not debugging, I am probably grinding my WPM on DevType or experimenting with random web APIs.',
  shortBio: 'B.Tech CSE-AI @ JECRC | Full Stack & AI Enthusiast | 4-star HackerRank',
  githubUrl: 'https://github.com/yash23082007',
  linkedinUrl: 'https://www.linkedin.com/in/yash-vijay-b0a75937a',
  instagramUrl: 'https://www.instagram.com/yash_vj23',
  hackerrankUrl: 'https://www.hackerrank.com/profile/yash23082007',
  avatarUrl: 'https://avatars.githubusercontent.com/u/230879230?v=4',
  email: 'ktanayash@gmail.com',
  
  skills: {
    languages: [
      { name: "C",          level: 5, icon: "C" },
      { name: "C++",        level: 5, icon: "C++" },
      { name: "Python",     level: 5, icon: "ðŸ" },
      { name: "JavaScript", level: 4, icon: "JS" },
      { name: "TypeScript", level: 3, icon: "TS" },
      { name: "HTML/CSS",   level: 5, icon: "ðŸŒ" },
    ],
    frontend: [
      { name: "React.js",     level: 5 },
      { name: "Next.js",      level: 5 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Framer Motion",level: 3 },
      { name: "Zustand",      level: 4 },
    ],
    backend: [
      { name: "Node.js",  level: 4 },
      { name: "Flask",    level: 4 },
      { name: "Express",  level: 4 },
      { name: "Prisma",   level: 4 },
      { name: "MongoDB",  level: 4 },
      { name: "JWT Auth", level: 4 },
    ],
    aiml: [
      { name: "Scikit-Learn", level: 4 },
      { name: "MediaPipe",    level: 4 },
      { name: "Pinecone",     level: 3 },
      { name: "Pandas",       level: 4 },
      { name: "NumPy",        level: 4 },
    ],
    tools: [
      { name: "Git / GitHub", level: 5 },
      { name: "Vercel",       level: 5 },
      { name: "VS Code",      level: 5 },
      { name: "Postman",      level: 4 },
      { name: "Figma",        level: 3 },
    ],
  },

  highlights: [
    'Full-stack portfolio powered by GitHub and MongoDB',
    'AIML projects with Flask, Python, and Scikit-Learn',
    'Frontend builds with React, Next.js, and TypeScript',
  ],

  achievements: [
    { title: "4 Stars â€” HackerRank Problem Solving", icon: "ðŸ†", desc: "Top-tier rank in competitive programming using C, C++, and Python." },
    { title: "BTech CSE-AI â€” JECRC Foundation", icon: "ðŸŽ“", desc: "Pursuing degree with focus on AI models and applications (CGPA 9.34)." },
    { title: "7+ Projects Shipped to Production", icon: "ðŸš€", desc: "Deployed functional and useful applications accessible to anyone on the web." },
    { title: "End-to-end Encrypted App in Production", icon: "ðŸ”", desc: "Built Share At Ease for secure file sharing using AES-256." },
    { title: "First ML Model Deployed", icon: "ðŸ§ ", desc: "Deployed MindCheck, predicting depression risk based on lifestyle parameters." },
    { title: "Built Full-Stack Typing Speed App", icon: "âŒ¨ï¸", desc: "DevType lets developers practice typing with syntax highlighting across 3 difficulty levels." },
    { title: "Golden Ratio Facial Analysis Tool", icon: "ðŸŒŸ", desc: "Real-time 468-landmark analysis using Google MediaPipe and vector search." }
  ],

  timeline: [
    {
      year: "2025 - 2029",
      title: "B.Tech in CSE-AI",
      subtitle: "JECRC Foundation, Jaipur",
      description: "Focusing on artificial intelligence, machine learning, and core computer science fundamentals. Maintaining a 9.34 CGPA."
    },
    {
      year: "2025",
      title: "4â˜… HackerRank â€” Problem Solving",
      subtitle: "Competitive Programming",
      description: "Achieved top-tier problem-solving certification. Solved algorithmic challenges in C, C++, and Python."
    },
    {
      year: "2025",
      title: "Launched 7 Production Projects",
      subtitle: "Full-Stack & AIML Web Apps",
      description: "Built and shipped DevType, MindCheck, GoldenFace AI, Share At Ease, ExecuteX, Caption Studio, and NeuralFlix."
    }
  ]
};

export const projects = [
  {
    id: 1,
    name: "DevType",
    tagline: "Typing Speed App for Developers",
    description: "A full-stack typing speed app where developers type real code snippets in JS, Python, HTML, C++, and English across 3 difficulty levels. Features JWT auth, live WPM/accuracy tracking, personal dashboard with stats & trends.",
    stack: ["Next.js", "React", "Prisma", "MongoDB", "Zustand", "Tailwind CSS", "JWT"],
    live: "https://dev-type-self.vercel.app",
    github: "https://github.com/yash23082007/dev-type",
    featured: true,
    emoji: "âŒ¨ï¸",
    color: "#FF4D00",
  },
  {
    id: 2,
    name: "MindCheck",
    tagline: "AI Depression Risk Detector",
    description: "An AI-powered mental health assessment tool that predicts depression risk based on lifestyle factors using machine learning. Built with a React frontend, Flask API, and Scikit-Learn classification model.",
    stack: ["React.js", "Flask", "Scikit-Learn", "Python", "ML"],
    live: "https://ai-depression-predictor.vercel.app",
    github: "https://github.com/yash23082007/ai-depression-predictor",
    featured: false,
    emoji: "ðŸ§ ",
    color: "#8B5CF6",
  },
  {
    id: 3,
    name: "GoldenFace AI",
    tagline: "Privacy-First Facial Analysis",
    description: "Facial analysis using the Golden Ratio (Ï† â‰ˆ 1.618). Real-time 468-landmark detection via MediaPipe, celebrity doppelgÃ¤nger matching via Pinecone vector search, and personalized style recommendations. All in-browser â€” no data leaves your device.",
    stack: ["React", "MediaPipe", "Pinecone", "TensorFlow.js", "Golden Ratio AI"],
    live: "https://goldenface-ai.vercel.app",
    github: "https://github.com/yash23082007/goldenface-ai",
    featured: false,
    emoji: "ðŸŒŸ",
    color: "#F59E0B",
  },
  {
    id: 4,
    name: "Share At Ease",
    tagline: "Encrypted File Sharing",
    description: "Privacy-first file sharing with end-to-end AES-256 encryption, smart share codes, QR code transfer, and automatic file expiry. No accounts required. No tracking. Just secure, ephemeral sharing.",
    stack: ["React", "Express.js", "AES-256", "Node.js", "QR Code"],
    live: "https://share-at-ease.vercel.app",
    github: "https://github.com/yash23082007/share.at.ease",
    featured: false,
    emoji: "ðŸ”",
    color: "#10B981",
  },
  {
    id: 5,
    name: "ExecuteX",
    tagline: "Online Multi-Language Compiler",
    description: "A web-based compiler and code executor supporting multiple programming languages. Write, run, and test code directly in the browser without any local environment setup.",
    stack: ["React", "Judge0 API", "Monaco Editor", "Express"],
    live: "https://execute-x.vercel.app",
    github: "https://github.com/yash23082007/ExecuteX",
    featured: false,
    emoji: "âš¡",
    color: "#3B82F6",
  },
  {
    id: 6,
    name: "Caption Studio",
    tagline: "AI Caption Generator",
    description: "An AI-powered social media caption generator. Input your context, tone, and platform â€” get scroll-stopping captions instantly.",
    stack: ["React", "AI API", "Tailwind CSS"],
    live: "#",
    github: "https://github.com/yash23082007/Caption",
    featured: false,
    emoji: "âœï¸",
    color: "#EC4899",
  },
  {
    id: 7,
    name: "NeuralFlix",
    tagline: "ML Movie Recommendation System",
    description: "A machine learning-powered movie recommendation engine. Currently in active development. Uses collaborative filtering and content-based algorithms to suggest personalized movie picks.",
    stack: ["Python", "Scikit-Learn", "Pandas", "React", "Flask"],
    live: "#",
    github: "https://github.com/yash23082007/NeuralFlix",
    featured: false,
    wip: true,
    emoji: "ðŸŽ¬",
    color: "#FF4D00",
  },
];

export const socials = {
  github:    "https://github.com/yash23082007",
  linkedin:  "https://www.linkedin.com/in/yash-vijay-b0a75937a",
  instagram: "https://www.instagram.com/yash_vj23",
  email:     "ktanayash@gmail.com",
  hackerrank:"https://www.hackerrank.com/profile/yash23082007",
};
