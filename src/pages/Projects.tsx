import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, categories, Project } from '../data/projects';
import { FiMail, FiMessageCircle } from 'react-icons/fi';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectModal } from '../components/projects/ProjectModal';
import { FiFilter, FiX } from 'react-icons/fi';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Filter projects based on selected category and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle project selection
  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  // Navigation between projects in modal
  const currentProjectIndex = selectedProject
    ? projects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const nextProject = useCallback(() => {
    if (currentProjectIndex < projects.length - 1) {
      setSelectedProject(projects[currentProjectIndex + 1]);
    }
  }, [currentProjectIndex]);

  const prevProject = useCallback(() => {
    if (currentProjectIndex > 0) {
      setSelectedProject(projects[currentProjectIndex - 1]);
    }
  }, [currentProjectIndex]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
        <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 mb-4">
            My Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my portfolio of innovative projects that showcase my skills and expertise in AI, web development, and more.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <input
              type="text"
              aria-label="Search projects"
              placeholder="Search projects by name, tech, or keyword..."
              className="w-full px-5 py-3 pr-12 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-300 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex justify-center mb-4">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              aria-expanded={isFiltersOpen ? "true" : "false"}
              aria-controls="filter-panel"
              aria-label="Toggle filter panel"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiFilter className="w-4 h-4" />
              <span>Filter Projects</span>
              {selectedCategory !== 'all' && (
                <span className="w-5 h-5 flex items-center justify-center text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">
                  {categories.find(c => c.id === selectedCategory)?.name.split(' ')[0].charAt(0)}
                </span>
              )}
            </button>
          </div>

          {/* Category Filters - Desktop */}
          <div className="hidden md:flex justify-center gap-2 flex-wrap">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? 'all' : category.id)}
                aria-pressed={selectedCategory === category.id}
                aria-label={`Filter by ${category.name}`}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 backdrop-blur-xl border border-white/10'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Mobile Filter Panel */}
          <AnimatePresence>
            {isFiltersOpen && (
              <motion.div 
                id="filter-panel"
                role="dialog"
                aria-label="Filter projects by category"
                className="md:hidden mt-4 p-4 bg-white/5 backdrop-blur-xl rounded-xl shadow-lg border border-white/10"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">Filter by Category</h3>
                  <button 
                    onClick={() => setIsFiltersOpen(false)}
                    aria-label="Close filter panel"
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id === selectedCategory ? 'all' : category.id);
                        setIsFiltersOpen(false);
                      }}
                    className={`px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30'
                          : 'text-gray-300 hover:bg-white/5 border border-white/10'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            className="columns-1 md:columns-2 lg:columns-3 gap-8 [column-fill:_balance] w-full"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="mb-8 break-inside-avoid"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 100,
                      damping: 15
                    }
                  }
                }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => handleProjectClick(project)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">We couldn't find any projects matching your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              aria-label="Clear all filters"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2 mx-auto"
            >
              <span>Clear all filters</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={nextProject}
        onPrev={prevProject}
        hasNext={currentProjectIndex < projects.length - 1}
        hasPrev={currentProjectIndex > 0}
      />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 hud-grid" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 -right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-orb-1" />
        <div className="absolute -bottom-20 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-orb-2" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-orb-3" />
        
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 animate-gradient-slow" />
        
        {/* Noise Texture */}
                {/* Noise Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] mix-blend-overlay" />
      </div>
    </motion.div>
  );
};
export default Projects;
