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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        className="group w-full h-36 bg-gray-800/90 rounded-lg border border-blue-500/20 p-4"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02, y: -2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/10 rounded-md">
            <Icon className="text-xl text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-medium text-white">{name}</h3>
            <p className="text-xs text-gray-400">{description}</p>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Proficiency</span>
            <span>{proficiency}%</span>
          </div>
          <div className="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
              initial={{ width: 0 }}
              animate={{ width: `${proficiency}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

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
          className="mt-16" // Reduced top margin
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                staggerChildren: 0.1
              }
            },
            hidden: { opacity: 0, y: 30 } // Reduced y offset
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8"> {/* Reduced text size and margin */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Technical Expertise
            </span>
          </h2>
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Reduced gap, removed xl breakpoint */}
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
