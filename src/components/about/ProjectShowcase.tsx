import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  icon: React.ReactNode;
  imageUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  category?: string;
}

interface ProjectShowcaseProps {
  projects: Project[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = ['All', 'AI/ML', 'Web', 'Startup', 'IoT'];

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  activeCategory,
  onCategoryChange,
}) => {
  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project =>
        project.tags.some(tag => tag.toLowerCase().includes(activeCategory.toLowerCase())) ||
        project.category?.toLowerCase() === activeCategory.toLowerCase()
      );

  return (
    <section id="projects" className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0dGVybiBpZD0icGF0dGVybi1iYXNlIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMzUpIj48cmVjdCB3aWR0aD0iNTAlIiBoZWlnaHQ9IjUwJSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAxKSIvPjxyZWN0IHdpZHRoPSI1MCUiIGhlaWdodD0iNTAlIiB4PSI1MCUiIHk9IjUwJSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAxKSIvPjwvcGF0dGVybj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4tYmFzZSkiLz48L3N2Zz4=')]" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block text-sm font-mono font-medium text-cyan-400 mb-3 tracking-widest"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            MY WORK
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6 font-display"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore my latest work and contributions in AI, web development, and innovative solutions.
          </motion.p>
        </motion.div>

        {/* Project Filter Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category.toLowerCase())}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                category.toLowerCase() === activeCategory
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-400/30 shadow-lg shadow-cyan-500/10 backdrop-blur-sm'
                  : 'bg-gray-800/30 text-gray-300 border-gray-700/50 hover:bg-gray-700/30 hover:border-cyan-400/20'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 auto-rows-fr">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group relative h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(600px circle at center, rgba(14, 165, 233, 0.1), transparent 50%)`,
                    filter: 'blur(20px)'
                  }}
                />
                
                {/* Main card */}
                <div 
                  className="relative h-full p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-cyan-400/30 group-hover:bg-gray-900/70 group-hover:transform group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-cyan-500/10"
                  style={{
                    backgroundImage: `url(${project.imageUrl || '/default-project-bg.jpg'})`
                  }}
                >
                  <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-[2px] group-hover:bg-gray-900/70 transition-all duration-500" />
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-start mb-6">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mr-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg bg-cyan-500/10"
                      >
                        {project.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
                      </div>
                    </div>

                    {/* Technology badges */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/20 transition-all duration-300 hover:bg-cyan-500/20 hover:border-cyan-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="px-3 py-1 text-xs font-medium bg-gray-800/50 text-gray-400 rounded-full border border-gray-700/50">
                            +{project.tags.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end space-x-2 mt-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-900/80 hover:bg-cyan-500/20 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
                          aria-label="View on GitHub"
                          title="View on GitHub"
                        >
                          <svg className="w-5 h-5 text-slate-200" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2 1 .1-.7.4-1.2.8-1.5-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 1.1 1.2 1.1h.3c.8 0 1.6.1 2.3.5.7-.2 1.4-.3 2.2-.3s1.5.1 2.2.3c.7-.4 1.5-.5 2.3-.5.8 0 1.6.1 2.3.5.7-.4 1.5-.5 2.3-.5s1.5.1 2.2.3c.7-.4 1.5-.5 2.3-.5h.3c1.4 0 1.2 1.1 1.2 1.1.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/>
                          </svg>
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-900/80 hover:bg-cyan-500/20 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
                          aria-label="View Live Demo"
                          title="View Live Demo"
                        >
                          <svg className="w-5 h-5 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/10 text-cyan-400 mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400">Try selecting a different category</p>
          </motion.div>
        )}

        {/* View All Projects Link */}
        <div className="text-center mt-12">
          <Link 
            to="/projects"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            View All Projects
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};