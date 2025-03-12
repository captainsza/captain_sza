/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  color: string;
  duration: number;
  delay: number;
}

// Enhanced floating tech particles with improved performance
const TechParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Calculate appropriate number of particles based on screen size
  const getParticleCount = () => {
    const width = window.innerWidth;
    if (width < 640) return 12; // Mobile
    if (width < 1024) return 15; // Tablet
    return 20; // Desktop
  };

  // Colors for particles
  const particleColors = [
    'rgba(59, 130, 246, 0.5)', // Blue
    'rgba(139, 92, 246, 0.5)',  // Purple
    'rgba(236, 72, 153, 0.5)'   // Pink
  ];
  
  // Generate particles on component mount and window resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      
      // Generate new particles based on screen size
      const particleCount = getParticleCount();
      const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: particleColors[i % particleColors.length],
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5
      }));
      
      setParticles(newParticles);
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {particles.map((particle) => {
        // Calculate shadow based on particle color
        const shadowColor = particle.color.replace('0.5', '0.7');
        
        return (
          <motion.div 
            key={particle.id}
            className="absolute rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: particle.delay * 0.2, duration: 0.5 }}
            style={{ 
              left: `${particle.x}%`, 
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.color,
              boxShadow: `0 0 5px ${shadowColor}` 
            }}
          >
            <motion.div
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
                scale: [1, particle.id % 2 === 0 ? 1.5 : 0.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="w-full h-full rounded-full"
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default TechParticles;
