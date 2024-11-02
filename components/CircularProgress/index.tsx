/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Loader2, Activity } from 'lucide-react';

const Particle = ({ angle, isVisible }: { angle: number; isVisible: boolean }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: isVisible ? [0, 1, 0] : 0,
      opacity: isVisible ? [0, 1, 0] : 0
    }}
    transition={{ 
      duration: 2,
      repeat: Infinity,
      repeatDelay: Math.random() * 2
    }}
    className="absolute w-1 h-1 bg-blue-400 rounded-full z-30"
    style={{
      transform: `rotate(${angle}deg) translateY(-16px)`
    }}
  />
);

const GlowingRing = ({ progress }: { progress: number }) => (
  <motion.div
    className="absolute inset-0 rounded-full z-10"
    animate={{
      boxShadow: [
        '0 0 10px rgba(59, 130, 246, 0.3)',
        '0 0 20px rgba(59, 130, 246, 0.5)',
        '0 0 10px rgba(59, 130, 246, 0.3)'
      ]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      border: '1px solid rgba(59, 130, 246, 0.5)',
    }}
  />
);

const ScanLine = () => (
  <motion.div
    className="absolute inset-1 rounded-full overflow-hidden z-20"
    style={{ opacity: 0.1 }}
  >
    <motion.div
      className="w-full h-1/3 bg-gradient-to-b from-transparent via-blue-400 to-transparent"
      animate={{
        y: ["0%", "300%"]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  </motion.div>
);

const CircularProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (winScroll / height);
      setScrollPercentage(percentage);
      scrollProgress.set(percentage);
      
      animate(count, percentage * 100, {
        duration: 0.5,
        ease: "easeOut"
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [count, scrollProgress]);

  const variants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="fixed bottom-6 right-6 flex items-center justify-center z-50"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      whileHover="hover"
      whileTap="tap"
      variants={variants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-16 w-16 flex items-center justify-center cursor-pointer"
        style={{
          background: `conic-gradient(from 0deg, 
            rgba(59, 130, 246, ${0.7 + scrollPercentage * 0.3}) ${scrollPercentage * 360}deg, 
            rgba(59, 130, 246, 0.1) 0)`,
          borderRadius: '50%',
        }}
      >
        {/* Multiple glowing rings */}
        <GlowingRing progress={scrollPercentage} />
        <GlowingRing progress={scrollPercentage} />
        
        {/* Scan line effect */}
        <ScanLine />

        {/* Inner circle with terminal-style number */}
        <motion.div 
          className="absolute inset-1 rounded-full bg-gray-900 flex items-center justify-center z-25"
          style={{
            boxShadow: 'inset 0 0 10px rgba(59, 130, 246, 0.2)'
          }}
        >
          <AnimatePresence>
            {isHovered ? (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute inset-0 flex items-center justify-center z-40"
              >
                <Activity className="w-6 h-6 text-blue-500" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="relative flex items-center justify-center z-40"
              >
                <motion.span 
                  className="text-lg font-mono text-blue-500"
                  style={{ 
                    textShadow: '0 0 5px rgba(59, 130, 246, 0.5)',
                  }}
                >
                  {rounded}
                </motion.span>
                <span className="absolute text-xs text-blue-500 -right-3 top-0">%</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Animated particles */}
        {[...Array(8)].map((_, i) => (
          <Particle 
            key={i} 
            angle={i * 45} 
            isVisible={scrollPercentage > (i / 8)}
          />
        ))}

        {/* Loading spinner */}
        <motion.div 
          className="absolute inset-0 z-15"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 
            className="w-full h-full text-blue-500 opacity-10" 
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CircularProgress;