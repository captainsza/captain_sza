/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState, useEffect, useRef, FC } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from './data';
import { Cover } from '../ui/cover';
import Avatar from './avatar';
import { IconType } from 'react-icons';
import { FaArrowRight, FaLightbulb } from 'react-icons/fa';
import { BiRocket, BiCodeAlt } from 'react-icons/bi';
import FloatingElements from './FloatingElements';

// Neural Network Background Animation
const NeuralNetworkBackground: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const connections: { a: number; b: number }[] = [];
    let animationFrame: number;
    
    const initNodes = () => {
      // More density on smaller screens, less on larger screens
      const nodeCount = Math.floor(Math.min(window.innerWidth / 40, 40));
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4
        });
      }
      
      // Create smarter connections - more connections for closer nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx*dx + dy*dy);
          
          if (distance < canvas.width / 5) {
            connections.push({ a: i, b: j });
          }
        }
      }
    };
    
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });
      
      // Draw connections
      connections.forEach(({ a, b }) => {
        const nodeA = nodes[a];
        const nodeB = nodes[b];
        const distance = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);
        
        if (distance < canvas.width / 4) {
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          
          // Create gradient color based on distance
          const opacity = 1 - distance / (canvas.width / 4);
          ctx.strokeStyle = `rgba(64, 169, 255, ${opacity * 0.8})`;
          ctx.lineWidth = opacity * 1.5;
          ctx.stroke();
        }
      });
      
      // Draw nodes with variable size
      nodes.forEach((node, i) => {
        const size = 1 + Math.sin(Date.now() * 0.003 + i) * 0.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        const hue = (Date.now() * 0.02 + i * 20) % 360;
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.8)`;
        ctx.fill();
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes.length = 0;
      connections.length = 0;
      initNodes();
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] opacity-40"
    />
  );
};

// New component: Futuristic Section Header
const SectionHeader: FC<{title: string; subtitle?: string; icon?: React.ReactNode}> = ({title, subtitle, icon}) => {
  return (
    <div className="relative z-10 flex flex-col items-center mb-8">
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-blue-500/70 to-transparent mb-3"></div>
      <div className="flex items-center space-x-2 mb-1">
        {icon && <div className="text-blue-400">{icon}</div>}
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {title}
          </span>
        </h2>
      </div>
      
      {subtitle && (
        <motion.div 
          className="flex items-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span className="text-sm text-gray-400 font-mono">[</span>
          <span className="text-xs text-gray-500 mx-2 tracking-wider font-mono">{subtitle}</span>
          <span className="text-sm text-gray-400 font-mono">]</span>
        </motion.div>
      )}
    </div>
  );
};

// New component: Key Interest Item
const InterestItem: FC<{interest: string; index: number}> = ({interest, index}) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors = [
    'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400',
    'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400',
    'from-pink-500/20 to-pink-600/20 border-pink-500/30 text-pink-400'
  ];
  const colorClass = colors[index % colors.length];
  
  return (
    <motion.div
      className={`px-4 py-2 rounded-lg bg-gradient-to-br ${colorClass} border backdrop-blur-sm
                 flex items-center justify-center relative overflow-hidden group`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Circuit-like background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0  0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M10,30 Q30,5 50,30 T90,30 M10,50 Q30,25 50,50 T90,50 M10,70 Q30,45 50,70 T90,70" 
            fill="none" 
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      
      {/* Animated glow */}
      <motion.div 
        className="absolute inset-0 opacity-0 bg-current"
        animate={{ opacity: isHovered ? 0.15 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <span className="font-medium z-10">{interest}</span>
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-1 h-1 border-t border-l"></div>
      <div className="absolute top-0 right-0 w-1 h-1 border-t border-r"></div>
      <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l"></div>
      <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r"></div>
      
      {/* Scan line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[1px] bg-current opacity-30"
        animate={{ y: ['0%', '400%'] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.div>
  );
};

interface Skill {
  id: string;
  icon: IconType;
  name: string;
  description: string;
  proficiency: number;
  category?: string;
}

const SkillCard: FC<Skill & { index: number }> = ({
  icon: Icon,
  name,
  description,
  proficiency,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      controls.start("hover");
    } else {
      controls.start("initial");
    }
  }, [isHovered, controls]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 15;
    const y = (e.clientY - rect.top - rect.height / 2) / 15;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }} // Faster stagger
      className="group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`
        relative h-full p-3 sm:p-4
        rounded-lg backdrop-blur-sm
        border border-white/10
        bg-gradient-to-br from-gray-900/90 to-gray-800/90
        transition-all duration-300 ease-out
        transform-gpu will-change-transform
        hover:border-blue-500/50
        ${isHovered ? 'shadow-lg shadow-blue-500/20' : ''}
      `}>
        {/* Tech Grid Pattern Background */}
        <div className="absolute inset-0 bg-[url('/tech-grid.png')] bg-repeat opacity-10 mix-blend-overlay rounded-lg overflow-hidden"></div>
        
        {/* Animated Scanner Line */}
        <motion.div 
          className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          initial={{ y: 0 }}
          animate={{ y: isHovered ? 100 : 0 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
        
        {/* Skill Header - Compact Design */}
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            className="relative flex-shrink-0 p-1"
            animate={{
              rotateY: isHovered ? 180 : 0
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <Icon className="w-5 h-5 text-blue-400" />
            </div>
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate leading-tight flex items-center gap-1">
              {name}
              <motion.span 
                className="ml-1 text-xs font-bold text-blue-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {proficiency}%
              </motion.span>
            </h3>
            <p className="text-xs text-gray-400">{description}</p>
          </div>
        </div>

        {/* Progress Bar with Cyberpunk/Retro Look */}
        <div className="mt-1 relative">
          <div className="h-1.5 relative rounded-full overflow-hidden bg-gray-800/70 border border-gray-700/50">
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, rgba(59,130,246,0.7) 0%, rgba(147,51,234,0.7) 50%, rgba(236,72,153,0.7) 100%)",
                backgroundSize: "200% 100%"
              }}
              initial={{ width: 0, backgroundPosition: "0% 0%" }}
              animate={{ 
                width: `${proficiency}%`,
                backgroundPosition: isHovered ? "100% 0%" : "0% 0%" 
              }}
              transition={{ 
                width: { duration: 0.8, delay: 0.1 },
                backgroundPosition: { duration: 2, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }
              }}
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
            </motion.div>
          </div>
          
          {/* Progress line markers - retro/tech look */}
          <div className="absolute top-0 left-0 w-full h-full flex justify-between px-[1px] pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`h-2 w-[1px] bg-gray-600/30 transform translate-y-[-2px] ${i === 4 ? 'opacity-0' : ''}`}
                style={{ left: `${i * 25}%` }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Interactive Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/40 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-purple-500/40 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-pink-500/40 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/40 rounded-br-lg"></div>
        
        {/* Optional: Hover indicator dot */}
        <motion.div
          className="absolute bottom-1 right-1.5 w-1 h-1 rounded-full bg-blue-500"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: isHovered ? 0.8 : 0.3 }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

// Main component
const AboutMeComponent: FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  // Use separate refs for different sections for better trigger control
  const [headerRef, headerInView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });
  
  const [bioRef, bioInView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });
  
  const [interestsRef, interestsInView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900 pb-16">
      {/* Dynamic Background */}
      <NeuralNetworkBackground />
      
      {/* Add Floating Elements for extra futuristic look */}
      <FloatingElements density="medium" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/80 to-gray-900" />
      
      {/* Futuristic Grid Lines */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(66, 153, 225, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(66, 153, 225, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px]"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
        {/* Page Title with Animation */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={{
            visible: { 
              opacity: 1,
              transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
              }
            },
            hidden: { 
              opacity: 0 
            }
          }}
          className="mb-16 text-center"
        >
          {/* Digital interface decorations */}
          <motion.div className="flex justify-center mb-1 space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-blue-500"
                variants={{
                  visible: { 
                    opacity: [0.3, 1, 0.3], 
                    y: [0, -5, 0],
                    transition: { 
                      repeat: Infinity,
                      duration: 2,
                      delay: i * 0.2
                    }
                  },
                  hidden: { opacity: 0 }
                }}
              />
            ))}
          </motion.div>
          
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-2"
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 }
            }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
              About Me
            </span>
          </motion.h1>
          
          <motion.div 
            className="h-[2px] w-24 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-2"
            variants={{
              visible: { width: "6rem", opacity: 1 },
              hidden: { width: 0, opacity: 0 }
            }}
          />
          
          <motion.div
            className="flex items-center justify-center text-gray-400 text-sm"
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 }
            }}
          >
            <div className="w-5 h-[1px] bg-gray-500/50 mr-2" />
            <span className="font-mono tracking-wider uppercase">Profile Interface</span>
            <div className="w-5 h-[1px] bg-gray-500/50 ml-2" />
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-12">
          {/* Left Column - Avatar */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: -100 }
            }}
            className="lg:col-span-2 relative"
          >
            <div className="relative z-10 w-full flex justify-center lg:justify-end">
              <Avatar
                imageUrl={personalInfo.avatarUrl}
                size="lg"
                glowColor="from-blue-500 via-purple-500 to-pink-500"
                highlights={{
                  title: "Profile Highlights",
                  items: [
                    { label: "Role", value: "Full-Stack Developer" },
                    { label: "Experience", value: `${personalInfo.experienceYears}+ years` },
                    { label: "Specialty", value: "Next.js & TypeScript" }
                  ]
                }}
              />
            </div>            

            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl opacity-70" />
            
            {/* Decorative elements */}
            {/* Futuristic tech decorative element */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1/2 h-[1px] bg-blue-500/30"></div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            ref={bioRef}
            initial="hidden"
            animate={bioInView ? "visible" : "hidden"}
            variants={{
              visible: { 
                opacity: 1, 
                x: 0,
                transition: {
                  staggerChildren: 0.15
                }
              },
              hidden: { opacity: 0, x: 100 }
            }}
            className="lg:col-span-3 space-y-8 relative"
          >
            {/* Digital frame background */}
            <div className="absolute -inset-5 border border-blue-500/10 rounded-lg -z-10">
              {/* Corner decorations - futuristic style */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-400/30"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-purple-400/30"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-pink-400/30"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-400/30"></div>
            </div>
            
            {/* Animated circuit lines */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <motion.div 
                className="absolute top-0 right-8 w-1/3 h-[1px] bg-blue-500/20"
                animate={{
                  x: [0, 50, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity
                }}
              />
              <motion.div 
                className="absolute left-12 bottom-8 w-[1px] h-1/4 bg-purple-500/20"
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity
                }}
              />
            </div>

            {/* Header Section */}
            <motion.div
              className="space-y-3"
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 }
              }}
            >
              <div className="flex items-center">
                <div className="h-[1px] w-6 bg-blue-500/50 mr-2"></div>
                <motion.h2
                  className="text-2xl md:text-3xl font-bold text-gray-100"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {personalInfo.name}
                </motion.h2>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-300 pl-6 border-l border-blue-500/20">
                <motion.h3
                  className="text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300"
                  variants={{
                    visible: { opacity: 1 },
                    hidden: { opacity: 0 }
                  }}
                >
                  <Cover>{personalInfo.title}</Cover>
                </motion.h3>
                
                {/* Animated separator */}
                <motion.div 
                  className="hidden sm:block h-[3px] w-[3px] rounded-full bg-blue-400/70"
                  animate={{ 
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.2, 0.8] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity 
                  }}
                />
                
                {/* Experience badge */}
                <motion.div 
                  className="inline-flex items-center px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="mr-1 font-mono">{personalInfo.experienceYears}+</span> Years Experience
                </motion.div>
              </div>
            </motion.div>

            {/* Summary Section with typing effect */}
            <motion.div
              className="relative border-l-2 border-blue-500/20 pl-6 text-gray-300"
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 }
              }}
            >
              <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-blue-500"></div>
              
              <p className="text-lg leading-relaxed">
                {personalInfo.summary}
              </p>
              
              {/* Digital cursor */}
              <motion.span
                className="inline-block w-2 h-4 ml-1 bg-blue-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>

            {/* Interests Section */}
            <motion.div
              ref={interestsRef}
              initial="hidden"
              animate={interestsInView ? "visible" : "hidden"}
              variants={{
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    when: "beforeChildren",
                    staggerChildren: 0.1
                  } 
                },
                hidden: { opacity: 0, y: 20 }
              }}
              className="space-y-4"
            >
              <div className="flex items-center">
                <div className="h-[1px] w-6 bg-blue-500/50 mr-2"></div>
                <h4 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                  <FaLightbulb className="text-yellow-400 text-sm" />
                  Interests
                </h4>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pl-8">
                {personalInfo.interests.map((interest, index) => (
                  <InterestItem key={interest} interest={interest} index={index} />
                ))}
              </div>
            </motion.div>
            
            {/* Connect button - futuristic style */}
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg 
                        bg-gradient-to-r from-blue-600/80 to-purple-600/80 
                        text-white font-medium mt-4 relative overflow-hidden group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 }
              }}
            >
              <span className="relative z-10 flex items-center">
                Connect With Me
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              
              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0"
                whileHover={{ opacity: 1 }}
              />
              
              {/* Techno corners */}
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-blue-300"></div>
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-blue-300"></div>
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-blue-300"></div>
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-blue-300"></div>
            </motion.a>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          className="mt-20 sm:mt-32 px-4 sm:px-0"
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, staggerChildren: 0.05 }
            },
            hidden: { opacity: 0, y: 30 }
          }}
        >
          <SectionHeader 
            title="Technical Expertise" 
            subtitle="SKILL MATRIX"
            icon={<BiCodeAlt size={22} />}
          />
          
          {/* Fix: Use the SkillCard component to properly render skills */}
          <div className="relative">
            {/* Background Decorations for Skills Section */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-10 left-1/2 w-48 h-48 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
              <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>
            
            {/* Properly render skill cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {personalInfo.skills.map((skill, index) => (
                <SkillCard 
                  key={skill.id}
                  {...skill}
                  index={index}
                />
              ))}
            </div>
            
            {/* Bottom Decorative Element */}
            <div className="mt-8 flex justify-center">
              <div className="h-[3px] w-16 rounded-full bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMeComponent;