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
      transition={{ delay: index * 0.1 }}
      className="group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`
        relative h-full p-4 sm:p-6
        rounded-xl backdrop-blur-sm
        border border-white/10
        bg-gradient-to-br from-gray-900/90 to-gray-800/90
        transition-all duration-300 ease-out
        transform-gpu will-change-transform
        hover:border-blue-500/30
        ${isHovered ? 'shadow-lg shadow-blue-500/20' : ''}
      `}>
        {/* Skill Header */}
        <div className="flex items-start gap-3 mb-3">
          <motion.div
            className="relative flex-shrink-0"
            animate={{
              rotateY: isHovered ? 180 : 0
            }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-2 flex items-center justify-center">
              <Icon className="w-6 h-6 text-blue-400" />
            </div>
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-white truncate">{name}</h3>
            <p className="text-xs text-gray-400 line-clamp-2">{description}</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-300">Mastery</span>
            <motion.span 
              className="text-xs font-bold text-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {proficiency}%
            </motion.span>
          </div>

          <div className="h-1.5 relative rounded-full overflow-hidden bg-gray-700/50">
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${proficiency}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
            </motion.div>
          </div>
        </div>

        {/* Hover Effects */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${isHovered ? '50%' : '0%'} 0%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)`
          }}
        />

        {/* Interactive Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/30 rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-purple-500/30 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-pink-500/30 rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/30 rounded-br-xl" />
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
          className="mt-12 sm:mt-16"
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, staggerChildren: 0.1 }
            },
            hidden: { opacity: 0, y: 30 }
          }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Technical Expertise
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {personalInfo.skills.map((skill, index) => (
              <SkillCard key={skill.id} {...skill} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMeComponent;
