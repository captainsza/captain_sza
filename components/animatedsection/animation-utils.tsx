/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { 
  motion, useScroll, useSpring, useTransform, 
  useReducedMotion, useAnimationControls
} from 'framer-motion';

// Custom hook for smooth section transitions
export const useSmoothTransition = (threshold = 0.2) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const controls = useAnimationControls();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        controls.start(isIntersecting ? "visible" : "hidden");
      },
      { threshold, rootMargin: "-10%" }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls, threshold]);

  return { ref, isVisible, controls, prefersReducedMotion };
};

// Enhanced section variants with stagger effects
export const enhancedSectionVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    filter: "blur(10px)",
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

// Parallax scroll effect hook
export const useParallaxScroll = (range = 100, delay = 0.2) => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  const y = useTransform(smoothProgress, [0, 1], [0, range]);
  
  return { y, smoothProgress };
};

// Enhanced scroll progress indicator
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 z-50"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  );
};

// Content fade-in animation variants
export const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

// Enhanced floating animation
export const useFloatingAnimation = (index: number) => ({
  y: [0, -15, 0],
  x: [0, 10, 0],
  rotate: [0, 5, -5, 0],
  scale: [1, 1.1, 1],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
    delay: index * 0.2,
    times: [0, 0.5, 1],
  },
});

// Smooth scroll handler with easing
export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const yOffset = -80; // Adjust based on your header height
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }
};