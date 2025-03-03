/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Image from 'next/image';

interface AvatarProps {
  imageUrl: string;
  size?: 'sm' | 'md' | 'lg';
  glowColor?: string;
  highlights?: {
    title: string;
    items: { label: string; value: string }[];
  };
}

const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  size = 'md',
  glowColor = 'from-blue-500 via-purple-500 to-pink-500',
  highlights
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const hologramAnimation = useAnimation();

  // Size mapping with expanded hover sizes
  const sizeClasses = {
    sm: 'w-40 h-40 md:w-48 md:h-48',
    md: 'w-52 h-52 md:w-64 md:h-64',
    lg: 'w-60 h-60 md:w-80 md:h-80'
  };

  useEffect(() => {
    // Start hologram flicker effect
    hologramAnimation.start({
      opacity: [0.7, 0.9, 0.7, 0.85, 0.7],
      transition: { 
        duration: 5, 
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut" 
      }
    });
  }, [hologramAnimation]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate relative mouse position
    const x = (clientX - left - width / 2);
    const y = (clientY - top - height / 2);
    
    // Update rotation based on mouse position
    setRotation({
      x: -(y / height) * 25, // Increased rotation effect
      y: (x / width) * 25
    });

    // Update mouse position for parallax effect
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="relative" style={{ perspective: '2000px' }}>
      {/* Futuristic frame */}
      <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl animate-pulse z-0"></div>
      
      {/* Main avatar container */}
      <div className={`p-6 sm:p-12 relative ${isHovered ? 'z-50' : 'z-10'}`}>
        <motion.div
          ref={containerRef}
          className={`relative ${sizeClasses[size]} cursor-pointer`}
          animate={{
            rotateX: rotation.x,
            rotateY: rotation.y,
            scale: isHovered ? 1.1 : 1,
            z: isHovered ? 50 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Holographic frame effect */}
          <motion.div
            className="absolute -inset-5 rounded-full"
            animate={hologramAnimation}
            style={{
              background: `radial-gradient(circle at ${50 + (mousePosition.x / 100)}% ${50 + (mousePosition.y / 100)}%, 
                rgba(59, 130, 246, 0.4), 
                rgba(139, 92, 246, 0.3), 
                rgba(0, 0, 0, 0))`,
              boxShadow: '0 0 40px rgba(66, 153, 225, 0.5) inset',
              transform: 'translateZ(-10px)'
            }}
          />

          {/* 3D orbital rings */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 rounded-full border ${index % 2 === 0 ? 'border-blue-500/30' : 'border-purple-500/30'}`}
              animate={{
                rotateZ: [0, 360],
                rotateX: [index * 15, -index * 15],
                rotateY: [index * 10, -index * 10],
                scale: isHovered ? 1 + (index * 0.15) : 1,
                z: isHovered ? index * 30 : 0
              }}
              transition={{
                rotateZ: {
                  repeat: Infinity,
                  duration: 20 - index * 5,
                  ease: "linear"
                },
                rotateX: {
                  repeat: Infinity,
                  duration: 15 - index * 3,
                  ease: "linear"
                },
                rotateY: {
                  repeat: Infinity,
                  duration: 25 - index * 7,
                  ease: "linear"
                },
                scale: {
                  duration: 0.6
                }
              }}
              style={{
                transformStyle: 'preserve-3d'
              }}
            />
          ))}

          {/* Digital interference lines */}
          <motion.div 
            className="absolute inset-0 overflow-hidden rounded-full pointer-events-none mix-blend-overlay opacity-20"
            style={{ transform: 'translateZ(20px)' }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute h-[1px] w-full bg-cyan-400"
                animate={{
                  y: ['-100%', '200%'],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2 + i,
                  delay: i * 0.2,
                  ease: "linear"
                }}
                style={{
                  top: `${i * 20}%`,
                }}
              />
            ))}
          </motion.div>

          {/* Main avatar image with parallax effect */}
          <motion.div
            className="relative w-full h-full rounded-full overflow-hidden shadow-inner"
            animate={{
              scale: isHovered ? 1.2 : 1,
              z: isHovered ? 30 : 0
            }}
            style={{ 
              transformStyle: 'preserve-3d',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3) inset' 
            }}
          >
            {/* Dynamic mask overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent mix-blend-overlay z-10" />
            
            <motion.div
              className="w-full h-full"
              animate={{
                x: isHovered ? mousePosition.x * 0.1 : 0,
                y: isHovered ? mousePosition.y * 0.1 : 0
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <Image 
                src={imageUrl} 
                alt="Avatar" 
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            
            {/* Scan line effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent h-[20%]"
              animate={{
                y: ['-100%', '200%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "linear"
              }}
            />
          </motion.div>

          {/* Futuristic data panels */}
          <AnimatePresence>
            {isHovered && highlights && (
              <motion.div
                className="absolute -right-4 sm:-right-1/4 top-1/4 bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 text-white border border-blue-500/20"
                initial={{ opacity: 0, x: 50, z: -20 }}
                animate={{ opacity: 1, x: 0, z: 40 }}
                exit={{ opacity: 0, x: 50, z: -20 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <h3 className="text-lg font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 flex items-center">
                  <span className="mr-1 text-xs opacity-70">[</span>
                  {highlights.title}
                  <span className="ml-1 text-xs opacity-70">]</span>
                </h3>
                
                <div className="space-y-2">
                  {highlights.items.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex flex-col"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-xs text-blue-300 font-mono">{item.label}</span>
                        <span className="ml-2 text-sm text-gray-300 font-light">{item.value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Interactive dot indicators */}
                <div className="absolute top-1 right-1 flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-blue-400' : i === 1 ? 'bg-purple-400' : 'bg-pink-400'}`}
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ 
                        duration: 2, 
                        delay: i * 0.3,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dynamic glow effect */}
          <motion.div
            className={`absolute -inset-4 rounded-full bg-gradient-to-r ${glowColor} opacity-0 blur-xl`}
            animate={{
              opacity: isHovered ? 0.5 : 0,
              scale: isHovered ? 1.2 : 1
            }}
            style={{
              transform: `translate3d(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px, 50px)`
            }}
          />

          {/* Particle effects */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/70"
                    initial={{
                      scale: 0,
                      x: 0,
                      y: 0,
                      z: 0
                    }}
                    animate={{
                      scale: [1, 0],
                      x: Math.cos(i * (Math.PI / 6)) * 120,
                      y: Math.sin(i * (Math.PI / 6)) * 120,
                      z: 50
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.15
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Avatar;
