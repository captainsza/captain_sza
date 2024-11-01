/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
// src/components/AnimatedSection.tsx
"use client"
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useScroll, useTransform } from 'framer-motion';
import { Circle, Hexagon, Triangle, Square, Star } from 'lucide-react';

interface AnimatedSectionProps {
  id: string;
  children: React.ReactNode;
  index: number;
}

// Transition shapes component for decorative elements
const TransitionShapes: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: progress }}
      >
        {/* Grid of animated shapes */}
        <div className="grid grid-cols-4 gap-8 w-full h-full absolute">
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              className="relative flex items-center justify-center"
              animate={{
                rotate: [0, 180, 360],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            >
              {i % 4 === 0 && <Circle className="w-6 h-6 text-primary/30" />}
              {i % 4 === 1 && <Hexagon className="w-6 h-6 text-primary/30" />}
              {i % 4 === 2 && <Triangle className="w-6 h-6 text-primary/30" />}
              {i % 4 === 3 && <Star className="w-6 h-6 text-primary/30" />}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ id, children, index }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isReady, setIsReady] = useState(false);
  const isInView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth scroll progress with tighter spring config
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 15,
    restDelta: 0.001
  });

  // Background transition layer
  const BackgroundTransition = () => (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 z-[-1]" />
  );

  useEffect(() => {
    setIsReady(true);
    
    // Preload the next section
    const preloadNext = () => {
      const sections = document.querySelectorAll('section');
      const currentIndex = Array.from(sections).findIndex(section => section.id === id);
      const nextSection = sections[currentIndex + 1];
      if (nextSection) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                nextSection.style.visibility = 'visible';
              }
            });
          },
          { rootMargin: "50% 0px" }
        );
        observer.observe(nextSection);
        return () => observer.disconnect();
      }
    };
    
    preloadNext();
  }, [id]);

  // Transform values with smoother curves
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);
  const y = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  // Transition progress for decorative elements
  const transitionProgress = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.2, 0.2, 0]
  );

  return (
    <>
      <BackgroundTransition />
      <TransitionShapes progress={transitionProgress.get()} />
      
      <motion.section
        ref={sectionRef}
        id={id}
        className={`
          relative min-h-screen w-full
          overflow-hidden
          bg-transparent
          transition-all duration-1000
        `}
        initial={false}
        style={{
          opacity: isReady ? opacity : 0,
          scale: isReady ? scale : 0.9,
          y: isReady ? y : 100,
        }}
      >
        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                circle at 50% 50%,
                rgba(var(--color-primary-rgb), 0.15) 0%,
                transparent 70%
              )
            `,
            opacity: useTransform(smoothProgress, [0, 0.5, 1], [0, 1, 0]),
          }}
        />

        {/* Content wrapper with enhanced animations */}
        <motion.div
          className="relative z-10 p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.6, 0.05, 0.01, 0.9],
            }
          } : { 
            opacity: 0, 
            y: 50 
          }}
        >
          {children}
        </motion.div>

        {/* Decorative particles */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: transitionProgress }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                rotate: 360,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "linear",
              }}
            >
              <div className="w-2 h-2 bg-primary/20 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </>
  );
};

export default AnimatedSection;