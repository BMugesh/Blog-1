import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ProjectShowcase } from '../components/about/ProjectShowcase';
import SkillGrid from '../components/ui/SkillGrid';
import SkillDetailModal from '../components/ui/SkillDetailModal';
import GalaxyView from '../components/GalaxyView';
import LottiePlayer from '../components/ui/LottiePlayer';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState<null | { name: string; level: number }>(null);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const skills = {
    technical: [
      {
        name: "Front-end Development",
        level: 90,
        color: "#60A5FA",
        icon: "💻",
        details: [
          {
            title: "Core Technologies",
            description: [
              "HTML5, CSS3, JavaScript (ES6+), TypeScript",
              "Modern frameworks: React.js, Next.js",
              "UI/UX design principles & responsive layouts",
              "Tailwind CSS, Material-UI, Shadcn/UI, Framer Motion (animations)",
              "3D UI & WebGL basics for immersive experiences",
              "Cross-browser compatibility & performance optimization"
            ]
          }
        ]
      },
      {
        name: "Data Analytics & Data Science",
        level: 85,
        color: "#34D399",
        icon: "📊",
        details: [
          {
            title: "Data Processing & Visualization",
            description: [
              "Data wrangling with Pandas & NumPy",
              "Data visualization: Matplotlib, Seaborn, Plotly, Power BI",
              "Statistical analysis, hypothesis testing, and predictive modeling",
              "Feature engineering & preprocessing pipelines",
              "Time series analysis & forecasting",
              "Exploratory Data Analysis (EDA) & reporting"
            ]
          }
        ]
      },
      {
        name: "AI & Machine Learning",
        level: 95,
        color: "#A78BFA",
        icon: "🤖",
        details: [
          {
            title: "Advanced AI Techniques",
            description: [
              "Supervised & unsupervised learning algorithms",
              "Deep Learning: CNNs, RNNs, LSTMs, GRUs, Transformers",
              "Reinforcement Learning for decision-making systems",
              "Model optimization & evaluation metrics",
              "AI model deployment & API integration",
              "Advanced NLP with Transformers & custom embeddings"
            ]
          }
        ]
      },
      {
        name: "Python & PyTorch",
        level: 90,
        color: "#F59E0B",
        icon: "🐍",
        details: [
          {
            title: "Development & Deep Learning",
            description: [
              "Python scripting & OOP design patterns",
              "PyTorch for building neural networks from scratch",
              "Tensor manipulation, autograd, and custom loss functions",
              "Model training, fine-tuning, and deployment",
              "Integration with data pipelines, APIs, and web frontends"
            ]
          }
        ]
      },
      {
        name: "Prompt Engineering",
        level: 85,
        color: "#EC4899",
        icon: "✨",
        details: [
          {
            title: "AI Prompt Optimization",
            description: [
              "Crafting effective prompts for AI tools (ChatGPT, GPT-4/5, LLMs)",
              "Optimizing responses with structured instructions & constraints",
              "Fine-tuning prompts for coding, summarization, and content creation",
              "Designing multi-step AI workflows for advanced automation"
            ]
          }
        ]
      },
      {
        name: "Web & App Development",
        level: 88,
        color: "#6366F1",
        icon: "🌐",
        details: [
          {
            title: "Full-Stack Development",
            description: [
              "Full-stack web apps using React, Node.js, Express.js",
              "RESTful APIs and backend integration",
              "Streamlit for interactive AI/ML apps and dashboards",
              "Mobile-first design and progressive web apps (PWAs)",
              "Deployment on cloud platforms (AWS, Vercel, Heroku, Netlify)"
            ]
          }
        ]
      },
      {
        name: "Networking & Cybersecurity",
        level: 80,
        color: "#10B981",
        icon: "🔒",
        details: [
          {
            title: "Security Fundamentals",
            description: [
              "Networking basics: TCP/IP, DNS, HTTP/HTTPS, sockets",
              "Linux commands & server management",
              "Firewall, VPN, and network security principles",
              "Penetration testing concepts and threat detection",
              "Microgrid & IoT communication security"
            ]
          }
        ]
      },
      {
        name: "DNN & Deep Learning",
        level: 92,
        color: "#8B5CF6",
        icon: "🧠",
        details: [
          {
            title: "Advanced Neural Networks",
            description: [
              "Deep Neural Network design for various applications",
              "Hybrid AI models combining Transformers & RL",
              "Hyperparameter tuning & model optimization",
              "Deployment of models in interactive systems",
              "Advanced projects: StockGenie, PowerCast, EduPredict"
            ]
          }
        ]
      }
    ],
    projects: [
      {
        title: "StockGenie",
        description: "Hybrid AI for Stock Price Prediction with Transformer & Reinforcement Learning",
        tags: ["AI/ML", "Finance", "Python"],
        link: "/projects/stockgenie",
        icon: "📈",
        category: "AI/ML"
      },
      {
        title: "EduPredict",
        description: "Student Performance Forecasting System using Advanced Analytics",
        tags: ["Machine Learning", "Education", "Python"],
        link: "/projects/edupredict",
        icon: "📚",
        category: "AI/ML"
      },
      {
        title: "PowerCast",
        description: "Energy Load Forecasting with Deep Neural Networks",
        tags: ["Deep Learning", "Energy", "Python"],
        link: "/projects/powercast",
        icon: "⚡",
        category: "AI/ML"
      },
      {
        title: "AI Study Companion",
        description: "Interactive study assistant with intelligent syllabus processing",
        tags: ["NLP", "Education", "AI"],
        link: "/projects/study-companion",
        icon: "🎓",
        category: "AI/ML"
      },
      {
        title: "Script&Style",
        description: "Revolutionary freelancing platform with immersive 3D interfaces",
        tags: ["Web", "3D", "Startup"],
        link: "/projects/scriptstyle",
        icon: "🎨",
        category: "Startup"
      }
    ]
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <GalaxyView />
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center px-4"
        style={{ opacity }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent"
          style={{ y }}
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-6 leading-tight"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Innovate. Create.<br/>Transform.
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Multi-talented innovator passionate about pushing the boundaries of technology. 
              Combining expertise in AI, machine learning, and creative development to build 
              tomorrow's solutions today.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Storytelling Section with Lottie */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              From Curiosity to Creation
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              I craft immersive digital experiences that blend AI, design, and engineering.
              Each project is a narrative—starting with research, evolving through prototyping,
              and culminating in polished, human-centered products.
            </motion.p>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <div className="glass-panel p-4 text-center">
                <div className="text-2xl font-semibold text-cyan-300">AI</div>
                <div className="text-sm text-gray-400">Intelligent systems</div>
              </div>
              <div className="glass-panel p-4 text-center">
                <div className="text-2xl font-semibold text-blue-300">3D</div>
                <div className="text-sm text-gray-400">Immersive visuals</div>
              </div>
              <div className="glass-panel p-4 text-center">
                <div className="text-2xl font-semibold text-purple-300">UX</div>
                <div className="text-sm text-gray-400">Delightful flows</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-tr from-cyan-500/30 via-fuchsia-500/20 to-indigo-500/30 rounded-3xl" />
            <LottiePlayer src="/lottie/innovation.json" className="w-full h-[320px] md:h-[420px]" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Core Competencies
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Mastering cutting-edge technologies to create innovative solutions
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SkillGrid
              skills={skills.technical}
              onHover={setHoveredSkill}
              onClick={setSelectedSkill}
            />
          </motion.div>

          {/* Skill Detail Modal */}
          <SkillDetailModal
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
          />
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 relative">
        <ProjectShowcase 
          projects={skills.projects}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </section>

      {/* Philosophy Section */}
      <motion.section 
        className="py-32 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl transform rotate-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl transform -rotate-1" />
            
            <div className="relative p-8 md:p-12 rounded-2xl bg-gray-800/30 backdrop-blur-xl border border-gray-700/30">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Personal Philosophy
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-300 leading-relaxed text-center"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                "In the realm of technology, I believe in pushing boundaries and challenging conventional thinking. 
                Every line of code, every model trained, and every system designed is an opportunity to create 
                something extraordinary. My journey is about combining technical expertise with creative innovation 
                to build solutions that make a real difference in how we interact with technology."
              </motion.p>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-16 h-16 opacity-50">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500 to-transparent" />
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-cyan-500 to-transparent" />
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-50">
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-purple-500 to-transparent" />
                <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t from-purple-500 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
