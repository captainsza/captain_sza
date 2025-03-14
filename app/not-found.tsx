'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, AlertCircle, RefreshCw, Terminal } from 'lucide-react'

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const errorCodeRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, speed: number }>>([])
  
  useEffect(() => {
    // Generate random particles for background effect
    const newParticles = Array(40).fill(null).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 30 + 10
    }))
    setParticles(newParticles)
    
    // Track mouse for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    // Add glitch effect to error code
    const glitchInterval = setInterval(() => {
      if (errorCodeRef.current) {
        errorCodeRef.current.classList.add('glitch-effect')
        setTimeout(() => {
          if (errorCodeRef.current) {
            errorCodeRef.current.classList.remove('glitch-effect')
          }
        }, 200)
      }
    }, 3000)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(glitchInterval)
    }
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-90"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 z-1 opacity-10 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}/>
      </div>
      
      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/50"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, window.innerHeight],
            opacity: [0.7, 0]
          }}
          transition={{
            duration: particle.speed,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      {/* 404 Content */}
      <div className="container z-10 mx-auto flex flex-col items-center justify-center px-5 text-center">
        {/* Central error content with parallax effect */}
        <motion.div 
          className="flex flex-col items-center justify-center"
          animate={{
            x: mousePosition.x ? (mousePosition.x - window.innerWidth / 2) / 50 : 0,
            y: mousePosition.y ? (mousePosition.y - window.innerHeight / 2) / 50 : 0,
          }}
          transition={{ type: "spring", damping: 50 }}
        >
          {/* Error signal icon */}
          <motion.div 
            className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/20 backdrop-blur-sm"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [0, 0, 0, 270, 270, 0],
            }}
            transition={{ 
              duration: 1.5,
            }}
          >
            <AlertCircle className="h-12 w-12 text-red-400" />
            
            {/* Pulsing rings */}
            <motion.div 
              className="absolute inset-0 rounded-full border border-red-500/50"
              animate={{
                scale: [1, 1.5],
                opacity: [0.8, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          </motion.div>
          
          {/* Error code with glitch effect */}
          <motion.div
            ref={errorCodeRef}
            className="relative mb-6 text-[120px] font-bold leading-none sm:text-[150px] md:text-[180px] lg:text-[220px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              404
            </span>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-2 -left-2 h-3 w-3 border-t border-l border-blue-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-2 -right-2 h-3 w-3 border-b border-r border-pink-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
          
          {/* Terminal-style error message */}
          <div className="relative mb-8 w-full max-w-md">
            <motion.div 
              className="flex items-center gap-2 bg-gray-900/70 backdrop-blur-md rounded-t-md px-4 py-2 border-t border-l border-r border-blue-500/30"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Terminal className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-gray-400">system_error.log</span>
              
              <motion.div 
                className="ml-auto h-2 w-2 rounded-full"
                animate={{ backgroundColor: ["#4ade80", "#ef4444"] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
              />
            </motion.div>
            
            <motion.div 
              className="rounded-b-md border border-blue-500/30 bg-black/50 backdrop-blur-md p-4 font-mono text-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <span className="text-green-500">$</span> 
                <motion.span
                  className="ml-2 text-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ delay: 1.3 }}
                >
                  Error: Page not found
                </motion.span>
              </motion.div>
              
              <motion.p 
                className="mt-2 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                The requested URL could not be located on this server.
              </motion.p>
              
              <motion.p 
                className="mt-2 text-pink-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
              >
                &gt; Process terminated with code <span className="text-white">404</span>
              </motion.p>
            </motion.div>
          </div>
            
          {/* Message and CTA */}
          <motion.p 
            className="mx-auto mb-6 max-w-md text-center text-lg text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            It seems that you&apos;ve traveled to an unexplored corner of the digital universe.
          </motion.p>
  
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            {/* Button to go home */}
            <Link href="/">
              <motion.button
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3 text-white transition"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="relative z-10">Return Home</span>
                
                {/* Button shine effect */}
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Corner decorations */}
                <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-white/60"></div>
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-white/60"></div>
              </motion.button>
            </Link>
            
            {/* Refresh button */}
            <motion.button
              className="group inline-flex items-center gap-2 rounded-full border border-blue-500/50 bg-transparent px-6 py-3 text-blue-400 backdrop-blur-sm transition"
              whileHover={{ borderColor: "rgba(139, 92, 246, 0.5)", color: "#a78bfa" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-5 w-5" />
              <span>Refresh</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Code Elements */}
      <div className="absolute top-10 left-6 z-20 opacity-50">
        <motion.div 
          className="font-mono text-xs text-blue-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2 }}
        >
          <motion.div 
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            &lt;!-- Error: 404 --&gt;
          </motion.div>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.7, x: 0 }}
              transition={{ delay: 2.2 + (i * 0.1) }}
              className="ml-4"
            >
              {`<div class="not-found-${i}">${i % 2 === 0 ? 'Page' : 'Error'}</div>`}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 right-6 z-20 opacity-50">
        <motion.div 
          className="font-mono text-xs text-pink-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2.5 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.7, x: 0 }}
              transition={{ delay: 2.7 + (i * 0.1) }}
              className="mr-4 text-right"
            >
              {`console.error("Path not found: ${window ? window.location.pathname : '/unknown'}")`}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add custom CSS for glitch effect */}
      <style jsx global>{`
        .glitch-effect {
          position: relative;
          animation: glitch 0.3s linear;
        }
        
        .glitch-effect:before,
        .glitch-effect:after {
          content: "404";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
        
        .glitch-effect:before {
          left: 2px;
          text-shadow: -2px 0 #ff00ea;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          animation: glitch-anim 0.3s infinite linear alternate-reverse;
        }
        
        .glitch-effect:after {
          left: -2px;
          text-shadow: 2px 0 #00fff9;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          animation: glitch-anim2 0.3s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-anim {
          0% { clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); transform: translate(-2px, 2px); }
          100% { clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%); transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-anim2 {
          0% { clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%); transform: translate(2px, -2px); }
          100% { clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); transform: translate(-2px, 2px); }
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(3px, -3px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  )
}