import { useState, useEffect } from 'react';

// Custom hook for mouse position tracking with performance optimization
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    let rafId: number;
    let lastUpdateTime = 0;
    const throttleTime = 16; // ~60fps
    
    const updateMousePosition = (ev: MouseEvent) => {
      const currentTime = Date.now();
      
      // Throttle updates for performance
      if (currentTime - lastUpdateTime < throttleTime) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
        lastUpdateTime = currentTime;
      });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      cancelAnimationFrame(rafId);
    };
  }, []);
  
  return mousePosition;
};

export default useMousePosition;
