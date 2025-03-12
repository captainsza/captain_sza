/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useScroll, useSpring } from 'framer-motion'

// Import modular components
import useMousePosition from './hero/useMousePosition'
import FloatingCube from './hero/FloatingCube'
import StatisticsPanel from './hero/StatisticsPanel'
import TechParticles from './hero/TechParticles'
import HeroTitle from './hero/HeroTitle'
import HeroSubtitle from './hero/HeroSubtitle'
import HeroCtaButtons from './hero/HeroCtaButtons'
import EnhancedWelcomeAvatar from './hero/EnhancedWelcomeAvatar'

// Main hero section component
export function HeroSectionComponent() {
  const mousePosition = useMousePosition();
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const springScroll = useSpring(scrollY, { stiffness: 100, damping: 30 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check device screen size and initialize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        staggerChildren: 0.2
      }
    });
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [controls]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black text-white"
    >
      {/* Enhanced background with dynamic effects */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay"
          style={{ objectPosition: isMobile ? "70% center" : "center" }}
        >
          <source src="/videos/coool.mp4" type="video/mp4" />
        </video>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/30 to-purple-900/30"
          animate={{ opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Dynamic grid with parallax */}
      <motion.div 
        className="absolute inset-0 z-5 opacity-15 pointer-events-none"
        style={{ y: springScroll }}
      >
        <motion.div 
          className="h-full w-full" 
          animate={{ backgroundPosition: ['0px 0px', '20px 20px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(59,130,246,0.3) 0.5px, transparent 1px),
              linear-gradient(to right, rgba(59,130,246,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59,130,246,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </motion.div>

      {/* Add modular components */}
      <TechParticles />
      <FloatingCube mousePosition={mousePosition} />
      <StatisticsPanel />
      <EnhancedWelcomeAvatar imageUrl="/2.png" />

      {/* Main content with responsive layout */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={controls}
          className="text-center w-full max-w-5xl"
        >
          {/* Digital indicator lights */}
          <motion.div 
            className="flex justify-center mb-4 sm:mb-6 space-x-1.5 sm:space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                  i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-purple-500' : 'bg-pink-500'
                }`}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                  boxShadow: [
                    '0 0 0px rgba(59, 130, 246, 0)',
                    '0 0 5px rgba(59, 130, 246, 0.4)',
                    '0 0 0px rgba(59, 130, 246, 0)'
                  ]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.15,
                  repeat: Infinity
                }}
              />
            ))}
          </motion.div>

          {/* Title and subtitle using components */}
          <HeroTitle title="WELCOME TO" highlightedText="CAPTAIN HOME" />
          <HeroSubtitle text="Navigating the Digital Frontier" />
          
          {/* CTA buttons */}
          <HeroCtaButtons />
        </motion.div>
      </div>
    </div>
  )
}