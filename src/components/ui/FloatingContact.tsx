import { motion } from 'framer-motion';
import { FiMessageCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const FloatingContact = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.5 
      }}
      className="fixed bottom-8 right-8 z-50"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/contact')}
        className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
        aria-label="Contact Us"
      >
        <FiMessageCircle className="w-5 h-5" />
        <span className="font-medium">Let's Talk</span>
        <motion.div
          className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          initial={false}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"
          initial={false}
          transition={{ duration: 0.2 }}
        />
      </motion.button>
    </motion.div>
  );
};

export default FloatingContact;