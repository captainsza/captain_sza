import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const HeroCtaButtons: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center"
    >
      <Link href="#projects">
        <motion.button
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold w-auto"
        >
          <span className="relative z-10">Explore My Universe</span>
          
          {/* Enhanced shine/lightning effect */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: 1,
                repeatDelay: 0.3,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Tech button corners with animation */}
          {['top-left', 'top-right', 'bottom-right', 'bottom-left'].map((pos, i) => (
            <motion.div 
              key={pos}
              className={`absolute ${pos.includes('top') ? 'top-[4px]' : 'bottom-[4px]'} ${pos.includes('left') ? 'left-[4px]' : 'right-[4px]'} w-2 h-2 border-${pos.includes('top') ? 't' : 'b'} border-${pos.includes('left') ? 'l' : 'r'} border-white/50`}
              animate={{ 
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ 
                duration: 1.5, 
                delay: i * 0.3,
                repeat: Infinity 
              }}
            />
          ))}
        </motion.button>
      </Link>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-4 sm:mt-0 cursor-pointer relative backdrop-blur-md px-2 py-2 sm:px-3 sm:py-3 rounded-full bg-white/5 border border-white/10"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)" 
        }}
      >
        <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-white/80" />
        
        {/* Pulse animation */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{ 
            boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 10px rgba(59, 130, 246, 0.4)", "0 0 0px rgba(59, 130, 246, 0)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroCtaButtons;
