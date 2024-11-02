/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Size mapping with expanded hover sizes
  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-64 h-64',
    lg: 'w-80 h-80'
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate relative mouse position
    const x = (clientX - left - width / 2);
    const y = (clientY - top - height / 2);
    
    // Update rotation based on mouse position
    setRotation({
      x: -(y / height) * 20,
      y: (x / width) * 20
    });

    // Update mouse position for parallax effect
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="relative" style={{ perspective: '1500px' }}>
      {/* Outer container with padding for overflow */}
      <div className={`p-12 relative ${isHovered ? 'z-50' : 'z-0'}`}>
        {/* Main avatar container */}
        <motion.div
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
          {/* Expanding background effect */}
          <motion.div
            className="absolute rounded-full"
            animate={{
              scale: isHovered ? 1.15 : 1,
              opacity: isHovered ? 1 : 0
            }}
            style={{
              inset: -20,
              background: `radial-gradient(circle at ${50 + (mousePosition.x / 100)}% ${50 + (mousePosition.y / 100)}%, 
                rgba(59, 130, 246, 0.3), 
                rgba(139, 92, 246, 0.2), 
                rgba(0, 0, 0, 0))`
            }}
          />

          {/* Protruding orbital rings */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute inset-0 rounded-full border border-blue-500/30"
              animate={{
                rotateZ: [0, 360],
                scale: isHovered ? 1 + (index * 0.05) : 1,
                z: isHovered ? index * 20 : 0
              }}
              transition={{
                rotateZ: {
                  repeat: Infinity,
                  duration: 8 - index,
                  ease: "linear"
                },
                scale: {
                  duration: 0.4
                }
              }}
              style={{
                transformStyle: 'preserve-3d'
              }}
            />
          ))}

          {/* Main avatar image with parallax effect */}
          <motion.div
            className="relative w-full h-full rounded-full overflow-visible" // Allow overflow
            animate={{
              scale: isHovered ? 1.2 : 1, // Increase scale on hover
              z: isHovered ? 30 : 0
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.img
              src={imageUrl}
              alt="Avatar"
              className="w-full h-full object-cover"
              animate={{
                x: isHovered ? mousePosition.x * 0.1 : 0,
                y: isHovered ? mousePosition.y * 0.1 : 0
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            />
          </motion.div>

          {/* Floating highlight elements */}
          <AnimatePresence>
            {isHovered && highlights && (
              <motion.div
                className="absolute -right-1/4 top-1/4 bg-gray-900/90 rounded-lg p-4 text-white"
                initial={{ opacity: 0, x: 50, z: -20 }}
                animate={{ opacity: 1, x: 0, z: 40 }}
                exit={{ opacity: 0, x: 50, z: -20 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <h3 className="text-lg font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {highlights.title}
                </h3>
                {highlights.items.map((item, index) => (
                  <div key={index} className="mb-1">
                    <span className="text-blue-300">{item.label}:</span>
                    <span className="ml-2 text-gray-300">{item.value}</span>
                  </div>
                ))}
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

          {/* Protruding particles */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-blue-400/50"
                    initial={{
                      scale: 0,
                      x: 0,
                      y: 0,
                      z: 0
                    }}
                    animate={{
                      scale: [1, 0],
                      x: Math.cos(i * (Math.PI / 4)) * 100,
                      y: Math.sin(i * (Math.PI / 4)) * 100,
                      z: 50
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
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
