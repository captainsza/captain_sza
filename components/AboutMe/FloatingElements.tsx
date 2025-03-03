import React, { FC } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementsProps {
  density?: 'low' | 'medium' | 'high';
}

const FloatingElements: FC<FloatingElementsProps> = ({ density = 'medium' }) => {
  // Determine number of elements based on density
  const elementCount = {
    low: 5,
    medium: 10,
    high: 15
  }[density];

  // Prepare elements with randomized properties
  const elements = Array.from({ length: elementCount }).map((_, i) => {
    const size = Math.random() * (20 - 5) + 5;
    const duration = Math.random() * (20 - 8) + 8;
    const initialX = Math.random() * 100;
    const initialY = Math.random() * 100;
    
    // Random type of element
    const type = Math.floor(Math.random() * 4);
    
    return {
      id: i,
      size,
      duration,
      initialX,
      initialY,
      type
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map(element => {
        const uniqueAnimationKey = `floating-${element.id}-${element.type}`;
        
        return (
          <motion.div
            key={uniqueAnimationKey}
            className="absolute opacity-20"
            initial={{ 
              x: `${element.initialX}%`, 
              y: `${element.initialY}%`,
              opacity: 0
            }}
            animate={{ 
              x: [`${element.initialX}%`, `${(element.initialX + 20) % 100}%`, `${element.initialX}%`],
              y: [`${element.initialY}%`, `${(element.initialY + 15) % 100}%`, `${element.initialY}%`],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              repeat: Infinity,
              duration: element.duration,
              ease: "easeInOut"
            }}
          >
            {element.type === 0 && (
              // Circuit-like element
              <svg width={element.size * 3} height={element.size * 2} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M5,20 L20,20 L25,10 L35,30 L40,20 L55,20" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  fill="none" 
                  className="text-blue-400"
                />
                <circle cx="5" cy="20" r="2" fill="currentColor" className="text-blue-400" />
                <circle cx="55" cy="20" r="2" fill="currentColor" className="text-blue-400" />
              </svg>
            )}
            
            {element.type === 1 && (
              // Square brackets
              <div className={`border border-purple-400/70 w-${Math.ceil(element.size)}  h-${Math.ceil(element.size)}`}></div>
            )}
            
            {element.type === 2 && (
              // Digital dots
              <div className="flex space-x-1">
                <div className={`w-1 h-1 rounded-full bg-blue-400`}></div>
                <div className={`w-1 h-1 rounded-full bg-purple-400`}></div>
                <div className={`w-1 h-1 rounded-full bg-pink-400`}></div>
              </div>
            )}
            
            {element.type === 3 && (
              // Tech grid
              <div className={`grid grid-cols-3 gap-px`}>
                {[...Array(9)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1 h-1 ${i % 3 === 0 ? 'bg-blue-400' : i % 2 === 0 ? 'bg-purple-400' : 'bg-transparent'}`}
                  ></div>
                ))}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingElements;
