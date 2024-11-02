/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
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


// Interactive floating cube component
const FloatingCube: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  return (
    <div className="absolute right-10 top-20 h-40 w-40 transform-style-3d perspective-1000">
      <motion.div
        className="h-full w-full"
        style={{
          rotateX: mousePosition.y / 20,
          rotateY: mousePosition.x / 20,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Cube faces */}
        <div className="absolute h-full w-full transform bg-blue-500/20 backdrop-blur-sm" style={{ transform: 'translateZ(20px)' }} />
        <div className="absolute h-full w-full transform bg-purple-500/20 backdrop-blur-sm" style={{ transform: 'rotateY(180deg) translateZ(20px)' }} />
        <div className="absolute h-full w-full transform bg-pink-500/20 backdrop-blur-sm" style={{ transform: 'rotateY(-90deg) translateZ(20px)' }} />
        <div className="absolute h-full w-full transform bg-blue-500/20 backdrop-blur-sm" style={{ transform: 'rotateY(90deg) translateZ(20px)' }} />
        <div className="absolute h-full w-full transform bg-purple-500/20 backdrop-blur-sm" style={{ transform: 'rotateX(90deg) translateZ(20px)' }} />
        <div className="absolute h-full w-full transform bg-pink-500/20 backdrop-blur-sm" style={{ transform: 'rotateX(-90deg) translateZ(20px)' }} />
      </motion.div>
    </div>
  )
}



// Animated statistics component
const StatisticsPanel = () => {
  const stats = [
    { label: 'Projects', value: 40, color: 'blue' },
    { label: 'Experience', value: 1, unit: 'years', color: 'purple' },
    { label: 'Technologies', value: 10, color: 'pink' },
  ]

  return (
    <div className="absolute bottom-20 right-10 flex gap-4">
      {stats.map(({ label, value, unit, color }) => (
        <motion.div
          key={label}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-black/50 to-black/30 p-4 backdrop-blur-md"
        >
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
            <motion.span
              className="block text-2xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              {value}
              {unit && <span className="ml-1 text-sm">{unit}</span>}
            </motion.span>
            <span className="text-sm text-gray-400">{label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Main hero section component
export function HeroSectionComponent() {
  const mousePosition = useMousePosition()

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background elements */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      >
        <source src="/videos/coool.mp4" type="video/mp4" />
      </video>


      {/* Interactive elements */}
      <FloatingCube mousePosition={mousePosition} />

      <StatisticsPanel />

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className=" relative mb-8 p-8">
          <div
          
          className=" text-center text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <h2 className="hero glitch layers" data-text="WELCOME TO"><span>WELCOME TO</span> <HyperText className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent' text='CAPTAIN HOME'/></h2>


          

        </div>
            
            {/* Animated subtitle */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-4 font-mono text-blue-400"
            >
              <Terminal className="mr-2 inline-block h-4 w-4" />
              <span className="typing-text">Exploring the Digital Frontier</span>
            </motion.div>
          </div>

          {/* CTA section */}
          <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <Link href="#projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-3 text-lg font-semibold"
              >
                <span className="relative z-10">Explore My Universe</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </Link>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 cursor-pointer sm:mt-0"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <ChevronDown className="h-8 w-8 text-white/50" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute left-0 bottom-0 p-4 lg:left-8 lg:bottom-8 z-20">
        <WelcomeAvatar
          imageUrl="/2.png"
          size="lg"
          welcomeMessage="Welcome to My Digital Universe!"
          additionalInfo={{
            title: "Quick Intro",
            items: [
              { label: "Name", value: "Zaid Ahmad" },
  
            ]
          }}
        />
      </div>
    </div>
  )
}
