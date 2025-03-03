/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { ChevronDown, Terminal, Cpu, CircuitBoard, Wifi, Database, Globe, Code, Server } from 'lucide-react'
import Link from 'next/link'
import HyperText from './ui/hyper-text'
import HeroWelcomeSection, { WelcomeAvatar } from './AboutMe/avatarhero'

// Custom hook for mouse position tracking
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return mousePosition
}

// Enhanced 3D Floating Cube with more futuristic style
const FloatingCube: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  const cubeAnimation = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Subtle animation when not hovered
    if (!isHovered) {
      cubeAnimation.start({
        rotateX: [0, 15, 0],
        rotateY: [0, 15, 0],
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }
      });
    }
  }, [isHovered, cubeAnimation]);
  
  return (
    <div 
      className="absolute top-10 right-2 sm:top-20 sm:right-10 h-24 w-24 sm:h-40 sm:w-40 transform-style-3d perspective-1000 z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="h-full w-full"
        animate={isHovered ? {
          rotateX: mousePosition.y / 20,
          rotateY: mousePosition.x / 20
        } : cubeAnimation}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Cube faces with enhanced effects */}
        <div className="absolute h-full w-full transform bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center" style={{ transform: 'translateZ(20px)' }}>
          <CircuitBoard className="text-blue-400/70 w-1/2 h-1/2" />
        </div>
        <div className="absolute h-full w-full transform bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center" style={{ transform: 'rotateY(180deg) translateZ(20px)' }}>
          <Cpu className="text-purple-400/70 w-1/2 h-1/2" />
        </div>
        <div className="absolute h-full w-full transform bg-pink-500/20 backdrop-blur-sm border border-pink-500/30 flex items-center justify-center" style={{ transform: 'rotateY(-90deg) translateZ(20px)' }}>
          <Code className="text-pink-400/70 w-1/2 h-1/2" />
        </div>
        <div className="absolute h-full w-full transform bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center" style={{ transform: 'rotateY(90deg) translateZ(20px)' }}>
          <Database className="text-blue-400/70 w-1/2 h-1/2" />
        </div>
        <div className="absolute h-full w-full transform bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center" style={{ transform: 'rotateX(90deg) translateZ(20px)' }}>
          <Wifi className="text-purple-400/70 w-1/2 h-1/2" />
        </div>
        <div className="absolute h-full w-full transform bg-pink-500/20 backdrop-blur-sm border border-pink-500/30 flex items-center justify-center" style={{ transform: 'rotateX(-90deg) translateZ(20px)' }}>
          <Server className="text-pink-400/70 w-1/2 h-1/2" />
        </div>
        
        {/* Animated light effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="absolute inset-0 bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Orbit ring around cube */}
      <motion.div 
        className="absolute inset-[-10px] border border-blue-500/20 rounded-full"
        animate={{
          rotateZ: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

// Enhanced Statistics Panel with futuristic design
const StatisticsPanel = () => {
  const stats = [
    { label: 'Projects', value: 40, color: 'blue', icon: <Code className="w-4 h-4" /> },
    { label: 'Experience', value: 1, unit: 'years', color: 'purple', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Technologies', value: 10, color: 'pink', icon: <CircuitBoard className="w-4 h-4" /> },
  ]

  return (
    <div className="absolute bottom-10 right-2 sm:bottom-20 sm:right-10 flex gap-2 sm:gap-4 z-20">
      {stats.map(({ label, value, unit, color, icon }) => (
        <motion.div
          key={label}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-black/50 to-black/30 p-4 backdrop-blur-md border border-gray-700/20"
          whileHover={{ 
            scale: 1.05,
            boxShadow: `0 0 15px rgba(59, 130, 246, 0.3)` 
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {/* Tech corner decorations */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-blue-500/40"></div>
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-blue-500/40"></div>
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-blue-500/40"></div>
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-blue-500/40"></div>
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'linear',
            }}
          />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <div className={`text-${color}-400`}>{icon}</div>
              <motion.span
                className="block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                {value}
                {unit && <span className="ml-1 text-sm">{unit}</span>}
              </motion.span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1 w-1 rounded-full bg-blue-500/50"></div>
              <span className="text-sm text-gray-400 font-mono tracking-tight">{label}</span>
            </div>
          </div>
          
          {/* Scan line */}
          <motion.div 
            className="absolute left-0 top-0 w-full h-[1px] bg-blue-500/30"
            animate={{
              y: ['0%', '400%'],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

// Floating tech particles component
const TechParticles: React.FC = () => {
  const particles = Array(15).fill(null);
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((_, index) => {
        const size = Math.random() * 5 + 2;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        
        return (
          <motion.div 
            key={index}
            className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
            style={{ left: `${initialX}%`, top: `${initialY}%` }}
            animate={{
              x: [
                Math.random() * 200 - 100,
                Math.random() * 200 - 100,
                Math.random() * 200 - 100
              ],
              y: [
                Math.random() * 200 - 100,
                Math.random() * 200 - 100,
                Math.random() * 200 - 100
              ],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
};

// Main hero section component
export function HeroSectionComponent() {
  const mousePosition = useMousePosition();
  const controls = useAnimation();


  // Ref for the main container to detect when in view
  const containerRef = useRef(null);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    });
  }, [controls]);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      {/* Background video with improved overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        >
          <source src="/videos/coool.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient overlays for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 mix-blend-overlay" />
      </div>
      
      {/* Futuristic grid pattern */}
      <div className="absolute inset-0 z-1 opacity-10 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}/>
      </div>

      {/* Tech particles */}
      <TechParticles />

      {/* Interactive elements */}
      <FloatingCube mousePosition={mousePosition} />
      <StatisticsPanel />

      {/* Main content with enhanced animations */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className="text-center"
        >
          {/* Digital interface decoration */}
          <motion.div 
            className="flex justify-center mb-3 space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-blue-500"
                animate={{ 
                  opacity: [0.3, 1, 0.3], 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>

          <div className="relative mb-8 p-8">
            {/* Title with enhanced glitch effect */}
            <motion.div
              className="text-center text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl relative z-10"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              animate="visible"
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
            >
              <h2 className="hero glitch layers" data-text="WELCOME TO">
                <span>WELCOME TO</span> 
                <HyperText className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent' text='CAPTAIN HOME'/>
              </h2>
              
              {/* Animated title decoration */}
              <motion.div 
                className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-40 h-[2px]"
                initial={{ width: 0 }}
                animate={{ width: "10rem" }}
                transition={{ 
                  delay: 0.5,
                  duration: 0.8,
                  ease: "easeOut"
                }}
              >
                <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              </motion.div>
            </motion.div>
            
            {/* Enhanced animated subtitle with better terminal styling */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6 font-mono text-blue-400 relative"
            >
              <div className="inline-flex items-center px-4 py-2 bg-gray-900/50 rounded-md border border-blue-500/20 backdrop-blur-sm">
                <Terminal className="mr-2 inline-block h-4 w-4" />
                <motion.span
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="typing-text flex items-center"
                >
                  <span>Exploring the Digital Frontier</span>
                  <motion.span 
                    className="inline-block w-1.5 h-4 bg-blue-400 ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.span>
              </div>
              
              {/* Tech frame corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-400/50"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-400/50"></div>
            </motion.div>
          </div>

          {/* CTA section with enhanced button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center"
          >
            <Link href="#projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-3 text-lg font-semibold w-full sm:w-auto"
              >
                <span className="relative z-10">Explore My Universe</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Tech button corners */}
                <div className="absolute top-[6px] left-[6px] w-2 h-2 border-t border-l border-white/50"></div>
                <div className="absolute bottom-[6px] right-[6px] w-2 h-2 border-b border-r border-white/50"></div>
              </motion.button>
            </Link>

            {/* Scroll indicator with animation */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 cursor-pointer sm:mt-0 relative backdrop-blur-sm px-3 py-2 rounded-full bg-white/5 border border-white/10"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" 
              }}
            >
              <ChevronDown className="h-6 w-6 text-white/70" />
              
              {/* Pulse animation */}
              <motion.div 
                className="absolute inset-0 rounded-full"
                animate={{ 
                  boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 10px rgba(59, 130, 246, 0.5)", "0 0 0px rgba(59, 130, 246, 0)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Welcome Avatar */}
      <motion.div 
        className="absolute top-4 left-4 sm:top-auto sm:left-0 sm:bottom-0 sm:p-4 lg:left-8 lg:bottom-8 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        <WelcomeAvatar
          imageUrl="/2.png"
          size="sm"
          className="sm:w-80 sm:h-80" // Override size for larger screens
          welcomeMessage="Welcome to My Digital Universe!"
          additionalInfo={{
            title: "Quick Intro",
            items: [
              { label: "Name", value: "Zaid Ahmad" },
              { label: "Company", value: "Flexeere IT Sol PVT LTD" }
            ]
          }}
        />
        
        {/* Decorative glow */}
        <motion.div 
          className="absolute -inset-4 rounded-full bg-blue-500/20 blur-3xl -z-10"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    </div>
  )
}
