export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  technologies: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  features: string[];
  category: 'ai-ml' | 'web' | 'app' | 'startup';
}

export const projects: Project[] = [
  {
    id: 'stockgenie',
    title: 'StockGenie',
    description: 'Hybrid AI for stock price prediction with DNNs, transformers, and reinforcement learning',
    longDescription: 'A comprehensive stock market analysis platform that combines deep neural networks, transformer-based models, and reinforcement learning to provide actionable investment insights and predictions.',
    tags: ['AI/ML', 'Finance', 'Deep Learning'],
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'React', 'Node.js'],
    image: '/project-images/stockgenie.jpg',
    githubUrl: 'https://github.com/yourusername/stockgenie',
    demoUrl: 'https://stockgenie-demo.com',
    features: [
      'Hybrid AI model combining DNNs and Transformers',
      'Reinforcement learning for portfolio optimization',
      'Real-time market data processing',
      'Interactive visualization of predictions',
      'Sentiment analysis of financial news'
    ],
    category: 'ai-ml'
  },
  {
    id: 'edupredict',
    title: 'EduPredict',
    description: 'Student performance forecasting system using ML models',
    longDescription: 'An educational analytics platform that predicts student performance and identifies at-risk students using machine learning models, helping educators provide timely interventions.',
    tags: ['Education', 'Machine Learning', 'Analytics'],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'React'],
    image: '/project-images/edupredict.jpg',
    githubUrl: 'https://github.com/yourusername/edupredict',
    demoUrl: 'https://edupredict-demo.com',
    features: [
      'Predicts student performance with 90%+ accuracy',
      'Identifies at-risk students early',
      'Interactive dashboards for educators',
      'Personalized learning recommendations',
      'Data visualization of performance trends'
    ],
    category: 'ai-ml'
  },
  {
    id: 'powercast',
    title: 'PowerCast',
    description: 'Energy load forecasting with deep neural networks',
    longDescription: 'A sophisticated energy management system that uses deep learning to predict power consumption patterns, helping utility companies optimize energy distribution and reduce waste.',
    tags: ['Energy', 'Deep Learning', 'Sustainability'],
    technologies: ['Python', 'TensorFlow', 'Keras', 'Django', 'React'],
    image: '/project-images/powercast.jpg',
    githubUrl: 'https://github.com/yourusername/powercast',
    features: [
      'Time-series forecasting of energy consumption',
      'Multi-step ahead predictions',
      'Anomaly detection in power usage',
      'API for integration with existing systems',
      'Interactive energy usage dashboards'
    ],
    category: 'ai-ml'
  },
  {
    id: 'ai-study-companion',
    title: 'AI Study Companion',
    description: 'Streamlit-based AI tool for syllabus processing and personalized study assistance',
    longDescription: 'An intelligent study assistant that processes course syllabi using NLP and provides personalized study plans, flashcards, and practice questions to enhance learning outcomes.',
    tags: ['Education', 'NLP', 'Productivity'],
    technologies: ['Python', 'Streamlit', 'spaCy', 'Transformers'],
    image: '/project-images/ai-study-companion.jpg',
    githubUrl: 'https://github.com/yourname/ai-study-companion',
    demoUrl: 'https://aistudycompanion.streamlit.app',
    features: [
      'Syllabus parsing and analysis',
      'Automated flashcard generation',
      'Personalized study plans',
      'Practice question generation',
      'Progress tracking and analytics'
    ],
    category: 'ai-ml'
  },
  {
    id: 'script-style',
    title: 'Script&Style',
    description: '3D model-based freelancing platform for students and users',
    longDescription: 'A revolutionary freelancing platform that uses 3D modeling and AI to connect students with freelance opportunities, featuring an immersive 3D interface and smart matching algorithms.',
    tags: ['Web3D', 'Freelance', 'Startup'],
    technologies: ['Three.js', 'React', 'Node.js', 'MongoDB', 'WebGL'],
    image: '/project-images/script-style.jpg',
    githubUrl: 'https://github.com/yourname/script-style',
    demoUrl: 'https://scriptandstyle.com',
    features: [
      '3D interactive portfolio showcase',
      'AI-powered project matching',
      'Real-time collaboration tools',
      'Blockchain-based escrow payments',
      'Skill verification system'
    ],
    category: 'startup'
  }
];

export const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'ai-ml', name: 'AI/ML Projects' },
  { id: 'web', name: 'Web Development' },
  { id: 'app', name: 'Mobile Apps' },
  { id: 'startup', name: 'Startup Projects' }
];
