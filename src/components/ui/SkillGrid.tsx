import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import { useSpring } from 'framer-motion';
import ParticleEffect from './ParticleEffect';

interface Skill {
  name: string;
  level: number;
  color: string;
  icon: string;
}

interface SkillGridProps {
  skills: Skill[];
  onHover?: (skill: Skill | null) => void;
  onClick?: (skill: Skill) => void;
}

const SkillGrid: React.FC<SkillGridProps> = ({ skills, onHover, onClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {skills.map((skill, index) => (
        <SkillCard 
          key={skill.name} 
          skill={skill} 
          index={index}
          isHovered={hoveredIndex === index}
          onHover={(isHovered) => {
            setHoveredIndex(isHovered ? index : null);
            onHover?.(isHovered ? skill : null);
          }}
          onClick={() => onClick?.(skill)}
        />
      ))}
    </div>
  );
};

interface SkillCardProps {
  skill: Skill;
  index: number;
  isHovered: boolean;
  onHover: (isHovered: boolean) => void;
  onClick: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index, isHovered, onHover, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(rotateX, springConfig);
  const springY = useSpring(rotateY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;
    x.set(xPct * 100);
    y.set(yPct * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHover(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => onHover(true)}
      onClick={onClick}
      style={{
        rotateX: springX,
        rotateY: springY,
        perspective: 1000,
      }}
      className="relative group cursor-pointer"
    >
      <div 
        className="relative p-6 rounded-2xl h-[200px] transform-gpu transition-all duration-300
                   bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg
                   border border-gray-700/30 group-hover:border-[color:var(--skill-color)]
                   group-hover:shadow-lg group-hover:shadow-[color:var(--skill-color)]/20"
        style={{ '--skill-color': skill.color } as any}
      >
        {/* Particle Effect Background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <ParticleEffect color={skill.color} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{skill.icon}</span>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center
                       bg-gradient-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-sm
                       border border-gray-600/20"
            >
              <span className="text-xl font-bold text-[color:var(--skill-color)]">
                {skill.level}%
              </span>
            </div>
          </div>

          <h3 
            className="text-xl font-bold mb-2 bg-clip-text text-transparent transition-colors duration-300"
            style={{
              backgroundImage: `linear-gradient(to right, ${skill.color}, ${adjustColor(skill.color, 40)})`
            }}
          >
            {skill.name}
          </h3>

          {/* Progress Bar */}
          <div className="relative h-2 rounded-full bg-gray-700/50 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                backgroundImage: `linear-gradient(to right, ${skill.color}, ${adjustColor(skill.color, 40)})`
              }}
            />
          </div>
        </div>

        {/* Glowing corner accents */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${skill.color}, transparent)` }} />
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b" style={{ backgroundImage: `linear-gradient(to bottom, ${skill.color}, transparent)` }} />
          </div>
          <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l" style={{ backgroundImage: `linear-gradient(to left, ${skill.color}, transparent)` }} />
            <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t" style={{ backgroundImage: `linear-gradient(to top, ${skill.color}, transparent)` }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.min(255, Math.max(0, parseInt(hex.substring(0, 2), 16) + amount));
  const g = Math.min(255, Math.max(0, parseInt(hex.substring(2, 4), 16) + amount));
  const b = Math.min(255, Math.max(0, parseInt(hex.substring(4, 6), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default SkillGrid;