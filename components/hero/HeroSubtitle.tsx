import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface HeroSubtitleProps {
  text: string;
}

const HeroSubtitle: React.FC<HeroSubtitleProps> = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
      className="mt-4 sm:mt-6 font-mono text-blue-400 relative max-w-xl mx-auto"
    >
      <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-900/70 rounded-lg border border-blue-500/30 backdrop-blur-md">
        <Terminal className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
        <motion.span
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="typing-text flex items-center text-xs sm:text-sm md:text-base"
        >
          <span>{text}</span>
          <motion.span 
            className="inline-block w-1 sm:w-1.5 h-3 sm:h-4 bg-blue-400 ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.span>
      </div>

      {/* Tech frame corners */}
      <motion.div 
        className="absolute top-0 left-0 w-1.5 sm:w-2 h-1.5 sm:h-2 border-t border-l border-blue-400/50"
        animate={{ 
          borderColor: ["rgba(59, 130, 246, 0.5)", "rgba(139, 92, 246, 0.5)", "rgba(59, 130, 246, 0.5)"]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-1.5 sm:w-2 h-1.5 sm:h-2 border-b border-r border-blue-400/50"
        animate={{ 
          borderColor: ["rgba(59, 130, 246, 0.5)", "rgba(139, 92, 246, 0.5)", "rgba(59, 130, 246, 0.5)"]
        }}
        transition={{ duration: 3, delay: 1.5, repeat: Infinity }}
      />

      {/* Moving scan line */}
      <motion.div 
        className="absolute left-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
        style={{ width: '100%' }}
        animate={{
          top: ["10%", "90%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </motion.div>
  );
};

export default HeroSubtitle;
