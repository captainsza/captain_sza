import React, { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { CircuitBoard, Cpu, Code, Database, Wifi, Server, Zap } from 'lucide-react'

interface FloatingCubeProps {
  mousePosition: { x: number; y: number }
}

const FloatingCube: React.FC<FloatingCubeProps> = ({ mousePosition }) => {
  const cubeAnimation = useAnimation();
  const [isHovered, setIsHovered] = useState(false);


  // Dynamic responsive sizing for all screens
  const cubeSize = {
    base: "h-20 w-20", // XS screens
    sm: "sm:h-24 sm:w-24",
    md: "md:h-32 md:w-32",
    lg: "lg:h-40 lg:w-40",
    xl: "xl:h-48 xl:w-48"
  };

  // Icon components for each face with their respective animations
  const faceIcons = [
    {
      icon: CircuitBoard,
      animation: { rotate: [0, 360] },
      transition: { duration: 10, repeat: Infinity, ease: "linear" }
    },
    {
      icon: Cpu,
      animation: { scale: [1, 1.2, 1] },
      transition: { duration: 3, repeat: Infinity }
    },
    {
      icon: Code,
      animation: { opacity: [0.5, 1, 0.5] },
      transition: { duration: 2, repeat: Infinity }
    },
    {
      icon: Database,
      animation: { rotateZ: [0, -360] },
      transition: { duration: 12, repeat: Infinity, ease: "linear" }
    },
    {
      icon: Wifi,
      animation: { scale: [1, 0.8, 1] },
      transition: { duration: 4, repeat: Infinity }
    },
    {
      icon: Server,
      animation: { opacity: [0.7, 1, 0.7] },
      transition: { duration: 3, repeat: Infinity }
    }
  ];

  // Advanced animation sequence when not hovered
  useEffect(() => {
    if (!isHovered) {
      cubeAnimation.start({
        rotateX: [0, 15, 30, 15, 0],
        rotateY: [0, 15, 30, 45, 60, 45, 30, 15, 0],
        transition: {
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }
      });
    }
  }, [isHovered, cubeAnimation]);
  
  return (
    <motion.div 
      className={`absolute top-5 right-5 ${cubeSize.base} ${cubeSize.sm} ${cubeSize.md} ${cubeSize.lg} ${cubeSize.xl} transform-style-3d perspective-1000 z-10`}
      initial={{ opacity: 0, scale: 0.5, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.5, type: "spring" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="h-full w-full"
        animate={isHovered ? {
          rotateX: mousePosition.y / 15,
          rotateY: mousePosition.x / 15,
          scale: 1.05
        } : cubeAnimation}
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Cube faces with enhanced holographic effects */}
        <div className="absolute h-full w-full transform bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center" style={{ transform: 'translateZ(20px)' }}>
          <motion.div 
            className="text-blue-400/70 w-1/2 h-1/2 flex items-center justify-center"
            animate={faceIcons[0].animation}
            transition={faceIcons[0].transition}
          >
            {React.createElement(faceIcons[0].icon, { className: "w-full h-full" })}
          </motion.div>
        </div>
        <div className="absolute h-full w-full transform bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center" style={{ transform: 'rotateY(180deg) translateZ(20px)' }}>
          <motion.div 
            className="text-purple-400/70 w-1/2 h-1/2 flex items-center justify-center"
            animate={faceIcons[1].animation}
            transition={faceIcons[1].transition}
          >
            {React.createElement(faceIcons[1].icon, { className: "w-full h-full" })}
          </motion.div>
        </div>
        <div className="absolute h-full w-full transform bg-pink-500/20 backdrop-blur-sm border border-pink-500/30 flex items-center justify-center" style={{ transform: 'rotateY(-90deg) translateZ(20px)' }}>
          <motion.div 
            className="text-pink-400/70 w-1/2 h-1/2 flex items-center justify-center"
            animate={faceIcons[2].animation}
            transition={faceIcons[2].transition}
          >
            {React.createElement(faceIcons[2].icon, { className: "w-full h-full" })}
          </motion.div>
        </div>
        <div className="absolute h-full w-full transform bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center" style={{ transform: 'rotateY(90deg) translateZ(20px)' }}>
          <motion.div 
            className="text-blue-400/70 w-1/2 h-1/2 flex items-center justify-center"
            animate={faceIcons[3].animation}
            transition={faceIcons[3].transition}
          >
            {React.createElement(faceIcons[3].icon, { className: "w-full h-full" })}
          </motion.div>
        </div>
        <div className="absolute h-full w-full transform bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center" style={{ transform: 'rotateX(90deg) translateZ(20px)' }}>
          <motion.div 
            className="text-purple-400/70 w-1/2 h-1/2 flex items-center justify-center"
            animate={faceIcons[4].animation}
            transition={faceIcons[4].transition}
          >
            {React.createElement(faceIcons[4].icon, { className: "w-full h-full" })}
          </motion.div>
        </div>
        <div className="absolute h-full w-full transform bg-pink-500/20 backdrop-blur-sm border border-pink-500/30 flex items-center justify-center" style={{ transform: 'rotateX(-90deg) translateZ(20px)' }}>
          <motion.div 
            className="text-pink-400/70 w-1/2 h-1/2 flex items-center justify-center"
            animate={faceIcons[5].animation}
            transition={faceIcons[5].transition}
          >
            {React.createElement(faceIcons[5].icon, { className: "w-full h-full" })}
          </motion.div>
        </div>
        
        {/* Core energy orb */}
        <motion.div 
          className="absolute inset-0 m-auto w-3 h-3 bg-blue-500 rounded-full"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0px)'
          }}
          animate={{ 
            scale: [1, 1.5, 1],
            boxShadow: [
              '0 0 0px rgba(59, 130, 246, 0)', 
              '0 0 10px rgba(59, 130, 246, 0.8)', 
              '0 0 0px rgba(59, 130, 246, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Enhanced light effect with pulse */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/20 to-pink-400/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Enhanced orbital rings with varying rotation speeds and angles */}
      {[0, 1, 2].map((index) => (
        <motion.div 
          key={index}
          className={`absolute inset-[-${4 + index * 3}px] border border-blue-500/20 rounded-full`}
          animate={{
            rotateZ: index % 2 === 0 ? 360 : -360,
            rotateX: index * 40,
            rotateY: index * 30,
          }}
          transition={{
            duration: 20 - index * 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformStyle: 'preserve-3d' }}
        />
      ))}
      
      {/* Animated power connector */}
      <motion.div 
        className="absolute top-1/2 right-[-30px] h-[2px] bg-gradient-to-r from-blue-500 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: 30 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      
      {/* Energy point with dynamic effect */}
      <motion.div 
        className="absolute top-1/2 right-[-40px] transform -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0)",
              "0 0 0 4px rgba(59, 130, 246, 0.4)",
              "0 0 0 0 rgba(59, 130, 246, 0)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-3 h-3 rounded-full bg-blue-500"
        >
          <Zap className="absolute -top-1 -left-1 w-5 h-5 text-blue-300" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default FloatingCube;
