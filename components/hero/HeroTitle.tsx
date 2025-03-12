import React from 'react';
import { motion } from 'framer-motion';
import HyperText from '../ui/hyper-text';

interface HeroTitleProps {
  title: string;
  highlightedText: string;
}

const HeroTitle: React.FC<HeroTitleProps> = ({ title, highlightedText }) => {
  return (
    <div className="relative mb-4 sm:mb-6 md:mb-10 px-2 sm:px-4 md:px-6">
      <motion.div 
        className="flex flex-col sm:flex-row items-center justify-center text-center gap-2 sm:gap-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tighter relative z-10"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        animate="visible"
        transition={{ 
          type: "spring", 
          stiffness: 120, 
          damping: 15 
        }}
      >
        <h2 className="hero glitch layers" data-text={title}>
          <span>{title}</span> 
        </h2>
        <HyperText 
          className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent' 
          text={highlightedText}
        />
      </motion.div>
      
      {/* Dynamic underline animation */}
      <motion.div 
        className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 h-[2px]"
        initial={{ width: 0 }}
        animate={{ width: ["0%", "60%", "40%", "50%"] }}
        transition={{ 
          duration: 3,
          times: [0, 0.6, 0.7, 1],
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </motion.div>

      {/* Decorative elements */}
      <motion.div 
        className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 flex justify-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
              i % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'
            }`}
            animate={{ 
              y: [0, -6, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 1.5,
              delay: i * 0.15,
              repeat: Infinity
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default HeroTitle;
