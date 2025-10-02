import { motion } from 'framer-motion';
import { Project } from '../../data/projects';
import { useState, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useInView } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hover: {
      scale: 1.02,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as const;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const calculateRotate = () => {
    const rotateX = -15 * (mousePosition.y - 0.5);
    const rotateY = 15 * (mousePosition.x - 0.5);
    return { rotateX, rotateY };
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="relative h-full overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-blue-500/5 dark:shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 flex flex-col transform-gpu will-change-transform"
      style={{
        perspective: '1000px',
        transform: isHovered
          ? `rotateX(${calculateRotate().rotateX}deg) rotateY(${calculateRotate().rotateY}deg)`
          : 'none'
      }}
      onMouseMove={handleMouseMove}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden h-48 w-full group">
        <motion.div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${project.image || '/project-placeholder.jpg'})`
          }}
          variants={imageVariants}
          animate={isHovered ? {
            scale: 1.05,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
          } : {
            scale: 1,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-gray-900/0 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
      </div>

      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20 text-blue-700 dark:text-blue-300 border border-blue-500/10 dark:border-blue-400/20 backdrop-blur-sm transition-colors duration-300 hover:from-blue-500/20 hover:to-purple-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Tech Stack Badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 transition-colors duration-300 hover:bg-gray-200/80 dark:hover:bg-gray-600/80"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 dark:from-blue-800/95 dark:to-purple-800/95 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <div className="text-center p-6">
            <h3 className="text-xl font-bold text-white mb-3">
              View Project
            </h3>
            <p className="text-blue-100 mb-6 text-sm">
              Click to see more details
            </p>
            <div className="flex justify-center space-x-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  title="View project on GitHub"
                  aria-label="View project on GitHub"
                >
                  <FaGithub className="w-5 h-5 text-white" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  title="View live demo"
                  aria-label="View live demo"
                >
                  <FaExternalLinkAlt className="w-5 h-5 text-white" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
