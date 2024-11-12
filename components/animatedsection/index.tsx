/* eslint-disable @typescript-eslint/no-unused-vars */
// RippleTransition.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RippleProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const RippleTransition: React.FC<RippleProps> = ({ isActive, onComplete }) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    if (isActive) {
      const newRipples = Array.from({ length: 5 }).map((_, i) => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        id: Date.now() + i,
      }));
      setRipples(newRipples);
    } else {
      setRipples([]);
    }
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={onComplete}
        >
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 backdrop-blur-lg"
              style={{ left: ripple.x, top: ripple.y }}
              initial={{ width: 0, height: 0, x: 0, y: 0 }}
              animate={{
                width: ['0px', '300px'],
                height: ['0px', '300px'],
                x: [0, -150],
                y: [0, -150],
              }}
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
                times: [0, 1],
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// TransitionWrapper.tsx
interface TransitionWrapperProps {
  children: React.ReactNode;
  sectionId: string;
  activeSection: string;
  nextSection: string;
  threshold?: number;
}

export const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  children,
  sectionId,
  activeSection,
  nextSection,
  threshold = 0.8
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const progress = 1 - (rect.bottom / window.innerHeight);
      setScrollProgress(progress);

      if (progress > threshold && !isTransitioning && activeSection === sectionId) {
        setIsTransitioning(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionId, threshold, isTransitioning, activeSection]);

  return (
    <motion.div className="relative">
      {children}
      <RippleTransition
        isActive={isTransitioning}
        onComplete={() => setIsTransitioning(false)}
      />
    </motion.div>
  );
};