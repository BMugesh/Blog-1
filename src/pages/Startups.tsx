import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowTopRightOnSquareIcon, ArrowRightIcon, LightBulbIcon, CubeIcon, AcademicCapIcon, MapIcon, CodeBracketIcon, SparklesIcon, ArrowPathIcon, RocketLaunchIcon, CursorArrowRaysIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { useInView } from 'react-intersection-observer';
import GalaxyView from '../components/GalaxyView';

type Startup = {
  id: number;
  name: string;
  tagline: string;
  description: string;
  role: string;
  period: string;
  achievements: string[];
  website?: string;
  icon: JSX.Element;
  color: string;
  gradient: string;
  techStack: string[];
  status: 'active' | 'growing' | 'incubating';
};

const startups: Startup[] = [
  {
    id: 2,
    name: 'Orivox',
    tagline: 'Unified Ecosystem for Tech Innovation',
    description: 'The umbrella startup bringing together Crystal View, Script&Style, ImmerseLearn, and ExploreExpo into a unified ecosystem for tech innovation, education, and digital platforms.',
    role: 'Founder & Visionary',
    period: '2021 - Present',
    achievements: [
      'Incubated 4 successful startups with combined 10,000+ users',
      'Established strategic partnerships with 20+ educational institutions',
      'Developed cross-platform technologies powering all ventures',
      'Created 50+ jobs in the tech industry',
      'Generated $2M+ in combined revenue across portfolio companies'
    ],
    website: 'https://orivox.tech',
    icon: <LightBulbIcon className="h-8 w-8" />,
    color: 'from-purple-500 via-fuchsia-500 to-pink-500',
    gradient: 'bg-gradient-to-r from-purple-600 to-pink-600',
    techStack: ['React', 'Node.js', 'Three.js', 'WebGL', 'Blockchain', 'AI/ML'],
    status: 'active'
  },
  {
    id: 1,
    name: 'Crystal View',
    tagline: 'Transparent Display Technologies',
    description: 'Pioneering transparent display and immersive visualization technologies, creating futuristic glass-like interactive screens that merge the digital and physical worlds.',
    role: 'Founder & CEO',
    period: '2022 - Present',
    achievements: [
      'Developed proprietary transparent display technology with 85% transparency',
      'Secured $1.2M in seed funding from top-tier investors',
      'Building MVP for commercial applications in retail and automotive',
      'Filed 3 patents for innovative display technologies',
      'Partnering with major retail and automotive brands'
    ],
    website: 'https://crystalview.tech',
    icon: <CubeIcon className="h-8 w-8" />,
    color: 'from-cyan-400 via-blue-500 to-indigo-600',
    gradient: 'bg-gradient-to-r from-cyan-500 to-blue-600',
    techStack: ['Computer Vision', 'AR/VR', 'IoT', 'Edge Computing', 'AI'],
    status: 'growing'
  },
  {
    id: 3,
    name: 'Script&Style',
    tagline: '3D Model Freelancing Platform',
    description: 'A revolutionary 3D model-based freelancing platform for college students and young professionals to showcase skills, connect with opportunities, and collaborate in a metaverse environment.',
    role: 'Co-founder & CTO',
    period: '2021 - Present',
    achievements: [
      'Launched MVP with 5,000+ registered users',
      'Onboarded 1,200+ freelancers and 300+ clients',
      'Featured in TechCrunch and Forbes 30 Under 30',
      'Won SIH National Finalist award',
      'Generated $500K+ in freelancer earnings'
    ],
    website: 'https://scriptandstyle.io',
    icon: <CodeBracketIcon className="h-8 w-8" />,
    color: 'from-emerald-400 via-teal-500 to-green-600',
    gradient: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    techStack: ['Three.js', 'Web3', 'Blockchain', '3D Modeling', 'WebRTC'],
    status: 'growing'
  },
  {
    id: 4,
    name: 'ImmerseLearn',
    tagline: 'Next-Gen Education Platform',
    description: 'An immersive learning platform using interactive 3D and AI-driven environments to enhance student engagement, understanding, and knowledge retention through experiential learning.',
    role: 'Co-founder & Product Lead',
    period: '2022 - Present',
    achievements: [
      'Developed 120+ interactive learning modules across 15 subjects',
      'Partnered with 25+ educational institutions',
      'Improved learning outcomes by 63% in pilot studies',
      'Selected for Y Combinator W23 batch',
      '10,000+ active students monthly'
    ],
    website: 'https://immerselearn.com',
    icon: <AcademicCapIcon className="h-8 w-8" />,
    color: 'from-amber-400 via-orange-500 to-red-600',
    gradient: 'bg-gradient-to-r from-amber-500 to-orange-600',
    techStack: ['VR/AR', 'AI/ML', 'Gamification', 'Learning Analytics', 'WebXR'],
    status: 'growing'
  },
  {
    id: 5,
    name: 'ExploreExpo',
    tagline: 'Virtual Showcase Platform',
    description: 'A cutting-edge digital showcase and networking platform for students, startups, and innovators to present ideas, products, and research in immersive 3D environments and connect with global communities.',
    role: 'Technical Advisor',
    period: '2023 - Present',
    achievements: [
      'Launched beta with 200+ business clients',
      'Hosted 50+ virtual events with 10,000+ attendees',
      'Integrated with major e-commerce and payment platforms',
      'Achieved 97% customer satisfaction rate',
      'Featured in Tech in Asia and Product Hunt'
    ],
    website: 'https://exploreexpo.tech',
    icon: <MapIcon className="h-8 w-8" />,
    color: 'from-rose-400 via-pink-500 to-fuchsia-600',
    gradient: 'bg-gradient-to-r from-rose-500 to-pink-600',
    techStack: ['WebGL', 'WebRTC', '3D Environments', 'Real-time Networking', 'Cloud Computing'],
    status: 'incubating'
  }
];

// Particle Background Component (CSS-based)
const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 6 + 1}px`,
              height: `${Math.random() * 6 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

// Animated Gradient Text Component
interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ children, className = '' }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 ${className}`}>
    {children}
  </span>
);

// Status Badge Component
interface StatusBadgeProps {
  status: 'active' | 'growing' | 'incubating';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    active: {
      text: 'Active',
      className: 'bg-green-500/10 text-green-400 border-green-500/30',
      icon: <RocketLaunchIcon className="w-3.5 h-3.5" />
    },
    growing: {
      text: 'Growing',
      className: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      icon: <ArrowPathIcon className="w-3.5 h-3.5 animate-spin-slow" />
    },
    incubating: {
      text: 'Incubating',
      className: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      icon: <SparklesIcon className="w-3.5 h-3.5" />
    }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.incubating;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}>
      {config.icon}
      {config.text}
    </span>
  );
};

// Startup Card Component
interface StartupCardProps {
  startup: Startup;
  index: number;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Gradient overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${startup.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        style={{
          backgroundImage: `radial-gradient(circle at ${isHovered ? '50% 50%' : '50% 100%'}, transparent 0%, ${startup.gradient.replace('bg-gradient-to-r', '')} 100%)`,
        }}
      />
      
      {/* Card content */}
      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`h-14 w-14 rounded-xl ${startup.gradient} flex items-center justify-center`}>
            {startup.icon}
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={startup.status} />
            {startup.website && (
              <a 
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Visit ${startup.name} website`}
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-1">{startup.name}</h3>
        <p className="text-sm text-cyan-300 mb-3">{startup.tagline}</p>
        
        <p className="text-gray-300 mb-4">{startup.description}</p>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <CursorArrowRaysIcon className="w-4 h-4" />
            Key Achievements
          </h4>
          <ul className="space-y-2">
            {startup.achievements.slice(0, 3).map((achievement, i) => (
              <li key={i} className="flex items-start">
                <svg className="h-4 w-4 text-cyan-400 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-300">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {startup.techStack.slice(0, 4).map((tech, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300">
                {tech}
              </span>
            ))}
            {startup.techStack.length > 4 && (
              <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
                +{startup.techStack.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Startups = () => {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openModal = (startup: Startup) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  const [activeTab, setActiveTab] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const filteredStartups = activeTab === 'all' 
    ? startups 
    : startups.filter(startup => startup.status === activeTab);

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden" ref={containerRef}>
      <ParticleBackground />
      
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.2) 0%, rgba(0, 0, 0, 0) 50%)',
          opacity,
          y
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg blur opacity-75 transition duration-200"></div>
              <h1 className="relative text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 px-6 py-2">
                🚀 My Startups
              </h1>
            </div>
          </motion.div>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Building futuristic platforms that empower students, freelancers, and industries.
          </motion.p>
        </motion.div>

        {/* Galaxy View */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative z-10 my-16"
        >
          <GalaxyView />
        </motion.div>

        {/* Detailed Startup Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 mt-32"
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Our Ventures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {startups.map((startup, index) => (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openModal(startup)}
                className="cursor-pointer"
              >
                <StartupCard startup={startup} index={index} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Startup Modal */}
        <AnimatePresence>
          {isModalOpen && selectedStartup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
                className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700`}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-start space-x-6 mb-6">
                  <div className={`p-3 rounded-xl ${selectedStartup.gradient} bg-opacity-20`}>
                    {selectedStartup.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedStartup.name}</h3>
                    <p className="text-purple-300">{selectedStartup.tagline}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">About</h4>
                    <p className="text-gray-300">{selectedStartup.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Achievements</h4>
                    <ul className="space-y-2">
                      {selectedStartup.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          <span className="text-gray-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStartup.techStack.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-700/50 text-gray-200 text-sm rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedStartup.website && (
                    <a
                      href={selectedStartup.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Visit Website
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white/80 mb-6 border border-white/10"
              >
                <RocketLaunchIcon className="w-4 h-4 mr-2 text-cyan-400" />
                Let's Build Together
              </motion.div>

              <motion.h2
                className="text-3xl sm:text-4xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Collaborate</span> on the Next Big Thing?
              </motion.h2>

              <motion.p
                className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                I'm always excited to discuss new partnerships, investment opportunities, or innovative projects.
                Let's turn visionary ideas into reality together.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                >
                  Get In Touch
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#startups"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-xl bg-white/5 text-white hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-colors"
                >
                  Explore My Work
                </a>
              </motion.div>

              <motion.p
                className="text-sm text-gray-400 mt-8 flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="h-px w-8 bg-gray-700" />
                Let's create something extraordinary
                <span className="h-px w-8 bg-gray-700" />
              </motion.p>
            </div>
          </div>
        </section>

        {/* Floating particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes float {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) translateX(20px);
              opacity: 0;
            }
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #8b5cf6, #ec4899);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(45deg, #7c3aed, #db2777);
          }
        `}</style>
      </div>
    </div>
  );
};

export default Startups;
