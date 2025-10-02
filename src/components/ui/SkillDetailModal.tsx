import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface SkillDetail {
  title: string;
  description: string[];
}

interface SkillDetailModalProps {
  skill: {
    name: string;
    color: string;
    icon: string;
    details: SkillDetail[];
  } | null;
  onClose: () => void;
}

const SkillDetailModal: React.FC<SkillDetailModalProps> = ({ skill, onClose }) => {
  if (!skill) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gray-900/90 backdrop-blur-xl 
                     border border-gray-700/50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 p-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{skill.icon}</span>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r"
                  style={{ backgroundImage: `linear-gradient(to right, ${skill.color}, ${adjustColor(skill.color, 40)})` }}>
                {skill.name}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid gap-6">
              {skill.details.map((detail, index) => (
                <motion.div
                  key={detail.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl" />
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))]"
                       style={{ backgroundImage: `radial-gradient(circle at 50% 0%, ${skill.color}, transparent)` }} />

                  {/* Content Container */}
                  <div className="relative p-6 rounded-xl border border-gray-700/50 hover:border-[color:var(--skill-color)]/50 
                                transition-colors duration-300"
                       style={{ '--skill-color': skill.color } as any}>
                    {/* Section Title */}
                    <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r"
                        style={{ backgroundImage: `linear-gradient(to right, ${skill.color}, ${adjustColor(skill.color, 40)})` }}>
                      {detail.title}
                    </h3>

                    {/* Skills List */}
                    <ul className="space-y-3">
                      {detail.description.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--skill-color)]"
                                style={{ '--skill-color': skill.color } as any} />
                          {item}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-0 left-0 w-12 h-12 opacity-30">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r"
                           style={{ backgroundImage: `linear-gradient(to right, ${skill.color}, transparent)` }} />
                      <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b"
                           style={{ backgroundImage: `linear-gradient(to bottom, ${skill.color}, transparent)` }} />
                    </div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 opacity-30">
                      <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l"
                           style={{ backgroundImage: `linear-gradient(to left, ${skill.color}, transparent)` }} />
                      <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t"
                           style={{ backgroundImage: `linear-gradient(to top, ${skill.color}, transparent)` }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 
                     border border-gray-600/30 hover:border-gray-500/30 transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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

export default SkillDetailModal;