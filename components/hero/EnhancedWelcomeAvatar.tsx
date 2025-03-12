import React from 'react';
import { motion } from 'framer-motion';
import { WelcomeAvatar } from '../AboutMe/avatarhero';

interface EnhancedWelcomeAvatarProps {
  imageUrl: string;
}

const EnhancedWelcomeAvatar: React.FC<EnhancedWelcomeAvatarProps> = ({ imageUrl }) => {
  return (
    <motion.div 
      className="absolute left-2 bottom-4 sm:left-4 sm:bottom-8 md:left-8 md:bottom-12 lg:left-16 lg:bottom-16 z-20"
      initial={{ opacity: 0, x: -50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 100 }}
    >
      <WelcomeAvatar
        imageUrl={imageUrl}
        size="sm"
        className="w-20 h-20 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-64 lg:h-64"
        welcomeMessage="Welcome to My Digital Universe!"
        additionalInfo={{
          title: "System Status",
          items: [
            { label: "Identity", value: "Zaid Ahmad" },
            { label: "Base", value: "Flexeere IT Sol PVT LTD" },
            { label: "Status", value: "Online" }
          ]
        }}
      />
      
      {/* Enhanced background glow that responds to viewport */}
      <motion.div 
        className="absolute -inset-4 sm:-inset-8 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-transparent blur-xl -z-10"
        animate={{ 
          scale: [0.95, 1.05, 0.95],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Animated connection lines */}
      <motion.div
        className="hidden sm:block absolute top-1/3 right-[-50px] h-[2px] bg-gradient-to-r from-blue-500/80 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: [0, 50, 30, 40] }}
        transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Information bubbles */}
      <motion.div
        className="hidden sm:block absolute top-1/4 right-[-80px] bg-gray-900/80 backdrop-blur-sm rounded-lg border border-blue-500/30 px-2 py-1"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.8] }}
        transition={{ 
          duration: 3,
          delay: 2,
          repeat: Infinity,
          repeatDelay: 5,
          times: [0, 0.1, 0.9, 1]
        }}
      >
        <span className="text-xs text-blue-400 font-mono">System online</span>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedWelcomeAvatar;
