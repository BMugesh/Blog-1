import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, AcademicCapIcon, LightBulbIcon, StarIcon, ChartBarIcon, BookOpenIcon } from '@heroicons/react/24/outline';

type Achievement = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: JSX.Element;
  category: 'award' | 'certification' | 'publication' | 'education';
};

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Best Project Award',
    issuer: 'Tech Innovators Summit',
    date: '2023',
    description: 'Awarded for developing an innovative AI solution that improves energy efficiency in smart homes.',
    icon: <TrophyIcon className="h-6 w-6 text-yellow-500" />,
    category: 'award'
  },
  {
    id: 2,
    title: 'Advanced React Certification',
    issuer: 'Meta (Facebook)',
    date: '2023',
    description: 'Completed advanced React concepts including hooks, context API, and performance optimization.',
    icon: <AcademicCapIcon className="h-6 w-6 text-blue-500" />,
    category: 'certification'
  },
  {
    id: 3,
    title: 'Research Paper Published',
    issuer: 'International Journal of Web Development',
    date: '2022',
    description: 'Published research on "Modern Web Architecture Patterns for Scalable Applications" in a peer-reviewed journal.',
    icon: <BookOpenIcon className="h-6 w-6 text-green-500" />,
    category: 'publication'
  },
  {
    id: 4,
    title: 'Hackathon Winner',
    issuer: 'Global Hack 2023',
    date: '2023',
    description: 'Won first place in the AI/ML category for developing a real-time language translation app.',
    icon: <LightBulbIcon className="h-6 w-6 text-purple-500" />,
    category: 'award'
  },
  {
    id: 5,
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2022',
    description: 'Demonstrated expertise in designing distributed systems on AWS.',
    icon: <AcademicCapIcon className="h-6 w-6 text-orange-500" />,
    category: 'certification'
  },
  {
    id: 6,
    title: 'Tech Conference Speaker',
    issuer: 'DevConf 2023',
    date: '2023',
    description: 'Invited speaker on the topic of "The Future of Web Development: Trends and Predictions".',
    icon: <StarIcon className="h-6 w-6 text-red-500" />,
    category: 'award'
  },
  {
    id: 7,
    title: 'MSc in Computer Science',
    issuer: 'Stanford University',
    date: '2021',
    description: 'Specialized in Artificial Intelligence and Machine Learning with a focus on Natural Language Processing.',
    icon: <AcademicCapIcon className="h-6 w-6 text-indigo-500" />,
    category: 'education'
  },
  {
    id: 8,
    title: 'Top Performer Award',
    issuer: 'TechCorp Inc.',
    date: '2022',
    description: 'Recognized as the top performing engineer for Q3 2022 for outstanding contributions to the core platform.',
    icon: <ChartBarIcon className="h-6 w-6 text-teal-500" />,
    category: 'award'
  },
];

const Achievements = () => {
  const categories = [
    { id: 'all', name: 'All', count: achievements.length },
    { id: 'award', name: 'Awards', count: achievements.filter(a => a.category === 'award').length },
    { id: 'certification', name: 'Certifications', count: achievements.filter(a => a.category === 'certification').length },
    { id: 'publication', name: 'Publications', count: achievements.filter(a => a.category === 'publication').length },
    { id: 'education', name: 'Education', count: achievements.filter(a => a.category === 'education').length },
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredAchievements = activeCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === activeCategory);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              My <span className="gradient-text">Achievements</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A collection of my awards, certifications, publications, and educational background.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
                <span className="ml-1.5 bg-white/20 dark:bg-black/20 px-2 py-0.5 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-full bg-opacity-10 bg-current">
                      {achievement.icon}
                    </div>
                    <h3 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                      {achievement.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span>{achievement.issuer}</span>
                    <span className="mx-2">•</span>
                    <span>{achievement.date}</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
