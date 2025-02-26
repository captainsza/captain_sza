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
import { FaArrowRight } from 'react-icons/fa';

// Enhanced TypeScript interfaces
interface Skill {
  id: string;
  icon: IconType;
  name: string;
  description: string;
  proficiency: number;
  category?: string;
}


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
      const nodeCount = Math.floor(window.innerWidth / 50);
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
      
      // Create connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.random() < 0.1) {
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
        
        if (distance < 200) {
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.strokeStyle = `rgba(64, 169, 255, ${1 - distance / 200})`;
          ctx.stroke();
        }
      });
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(64, 169, 255, 0.8)';
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

interface Skill {
  id: string;
  icon: IconType;
  name: string;
  description: string;
  proficiency: number;
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

// Add this to your existing CSS or create a new styles file
const styles = `
  @keyframes gradient-xy {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 100%;
    }
  }

  @keyframes shine {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(100%);
    }
  }

  .animate-gradient-xy {
    animation: gradient-xy 15s ease infinite;
    background-size: 400% 400%;
  }

  .animate-shine {
    animation: shine 2s infinite;
  }

  .perspective-1000 {
    perspective: 1000px;
  }
`;

// Main About Component
const AboutMeComponent: FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Background Elements */}
      <NeuralNetworkBackground />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Avatar */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: -100 }
            }}
            className="relative"
          >
                        <div className="relative z-10 w-full flex justify-end">
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

            {/* Decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: 100 }
            }}
            className="space-y-8"
          >
            {/* Header Section */}
            <div className="space-y-4">
              <motion.h1
                className="text-5xl md:text-6xl font-bold"
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 50 }
                }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  About Me
                </span>
              </motion.h1>

              <motion.h2
                className="text-2xl md:text-3xl text-gray-200 font-semibold"
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 30 }
                }}
              >
                {personalInfo.name}
              </motion.h2>

              <motion.h3
                className="text-xl text-gray-400"
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 20 }
                }}
              >
                <Cover>{personalInfo.title}</Cover>
              </motion.h3>
            </div>

            {/* Summary Section */}
            <motion.p
              className="text-gray-300 text-lg leading-relaxed"
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 }
              }}
            >
              {personalInfo.summary}
            </motion.p>

            {/* Interests Section */}
            <motion.div
              className="space-y-4"
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 }
              }}
            >
              <h4 className="text-xl font-semibold text-gray-200">Interests</h4>
              <div className="flex flex-wrap gap-3">
                {personalInfo.interests.map((interest, index) => (
                  <motion.span
                    key={interest}
                    className="px-4 py-2 bg-blue-500/10 rounded-full text-blue-400 border border-blue-500/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Section */}
                <motion.div
          className="mt-12 sm:mt-16 px-4 sm:px-0"
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
          <div className="relative">
            {/* Section Title with Retro-Futuristic Decoration */}
            <div className="relative z-10 flex flex-col items-center mb-8">
              <div className="flex items-center mb-2">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-blue-500/70 mr-3"></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    Technical Expertise
                  </span>
                </h2>
                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-purple-500/70 ml-3"></div>
              </div>
              
              <motion.div 
                className="flex items-center"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-sm text-gray-400 font-mono">[</span>
                <span className="text-xs text-gray-500 mx-2 tracking-wider font-mono">SKILL MATRIX</span>
                <span className="text-sm text-gray-400 font-mono">]</span>
              </motion.div>
            </div>
            
            {/* Background Decorations for Skills Section */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-10 left-1/2 w-48 h-48 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
              <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>
            
            {/* Skill Cards with CSS Grid for better responsiveness */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3">
              {personalInfo.skills.map((skill, index) => (
                <SkillCard key={skill.id} {...skill} index={index} />
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
