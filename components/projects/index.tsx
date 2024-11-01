/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  GithubIcon,
  ExternalLinkIcon,
  ChevronDown,
  Settings2,
  Code2,
  Monitor,
  Cpu,
  Laptop,
  Smartphone,
  Globe,
  Star,
  Activity
} from 'lucide-react';
import { Project, projects } from './data';

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Particle System Component
const ParticleSystem: React.FC = () => {
  const particles = Array.from({ length: 50 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
          animate={{
            x: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`
            ],
            y: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`
            ],
            scale: [0, 1.5, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// 3D Rotating Tech Icon Component
const TechIcon: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        rotateY: isHovered ? 360 : 0,
        scale: isHovered ? 1.2 : 1,
      }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        {icon}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <motion.div
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 px-2 py-1 rounded text-xs whitespace-nowrap"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

// Animated Progress Bar Component
const AnimatedProgressBar: React.FC<{ progress: number; color: string }> = ({ progress, color }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={barRef} className="h-2 bg-gray-800 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: isVisible ? `${progress}%` : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
};

// Holographic Card Effect Component
const HolographicEffect: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          transform: `rotate(${(mousePosition.x - 50) * 0.1}deg) rotateX(${
            (mousePosition.y - 50) * 0.1
          }deg)`,
        }}
      />
    </div>
  );
};

// Enhanced Project Card Component
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: -10
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut"
      }
    }
  };

  const getCategoryIcon = (category: Project['category']) => {
    switch (category) {
      case ['web']:
        return <Globe className="w-5 h-5 text-blue-400" />;
      case ['mobile']:
        return <Smartphone className="w-5 h-5 text-green-400" />;
      case ['ai']:
        return <Cpu className="w-5 h-5 text-purple-400" />;
      case ['blockchain']:
        return <Activity className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative group"
      layoutId={`project-${project.id}`}
    >
      <div
        className={`relative overflow-hidden rounded-xl bg-gray-900/80 backdrop-blur-lg border border-gray-800 transition-all duration-500 ${
          isExpanded ? 'p-8' : 'p-6'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <HolographicEffect />
        
        {/* Project Image/Video with Glitch Effect */}
        <div className="relative h-48 mb-6 overflow-hidden rounded-lg group">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
            animate={{
              opacity: isHovered ? [0, 0.2, 0] : 0,
              x: isHovered ? ['-100%', '100%'] : '0%'
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            {isHovered ? (
              <video
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
                src={project.previewVideo}
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
          
          {/* Tech Stack Icons */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            {project.technologies.slice(0, 4).map((tech, i) => (
              <TechIcon
                key={tech}
                icon={<Code2 className="w-4 h-4 text-blue-400" />}
                label={tech}
              />
            ))}
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <motion.h3
              className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors"
              layoutId={`title-${project.id}`}
            >
              {project.title}
            </motion.h3>
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {getCategoryIcon(project.category)}
              <AnimatedProgressBar
                progress={project.progress}
                color="#3B82F6"
              />
            </motion.div>
          </div>

          <motion.p
            className="text-gray-400"
            layoutId={`description-${project.id}`}
          >
            {project.description}
          </motion.p>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-300">
                    Key Highlights
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center space-x-2 text-sm text-gray-400"
                      >
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {project.stats.commits}
                    </div>
                    <div className="text-sm text-gray-400">Commits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {project.stats.stars}
                    </div>
                    <div className="text-sm text-gray-400">Stars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {project.stats.issues}
                    </div>
                    <div className="text-sm text-gray-400">Issues</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project Links */}
          <motion.div
            className="flex items-center justify-between pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-4">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <GithubIcon className="w-5 h-5" />
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <ExternalLinkIcon className="w-5 h-5" />
                </motion.a>
              )}
            </div>
            <span className="text-sm text-gray-500">
              Completed: {project.completionDate}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Projects Component
const FuturisticProjects: React.FC = () => {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Project['category'] | 'all'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Category options for filter
  const categories = [
    { id: 'all', label: 'All Projects', icon: Globe },
    { id: 'web', label: 'Web Apps', icon: Monitor },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'ai', label: 'AI/ML', icon: Cpu },
    { id: 'blockchain', label: 'Blockchain', icon: Activity }
  ];

  // Animated category filter component
  const CategoryFilter: React.FC = () => (
    <motion.div 
      className="flex flex-wrap justify-center gap-4 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {categories.map(({ id, label, icon: Icon }) => (
        <motion.button
          key={id}
          onClick={() => setSelectedCategory(id as Project['category'] | 'all')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
            selectedCategory === id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </motion.button>
      ))}
    </motion.div>
  );

  // Animated scroll indicator
  const ScrollIndicator: React.FC = () => (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      animate={{
        y: [0, 10, 0],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <ChevronDown className="w-6 h-6 text-blue-400" />
    </motion.div>
  );

  // Interactive background patterns
  const BackgroundPatterns: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl" />
      
      {/* Animated grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, #1f2937 1px, transparent 1px),
                           linear-gradient(to bottom, #1f2937 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gray-950 py-20 overflow-hidden">
      {animationsEnabled && (
        <>
          <BackgroundPatterns />
          <ParticleSystem />
        </>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              rotateX: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Code2 className="w-16 h-16 text-blue-500" />
          </motion.div>
          
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              My Projects
            </span>
          </h1>
          

        </motion.div>

        {/* Animation Toggle & Category Filter */}
        <div className="flex flex-col items-center space-y-8 mb-12">
          <motion.button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings2 className="w-4 h-4" />
            <span>{animationsEnabled ? 'Disable' : 'Enable'} Animations</span>
          </motion.button>
          
          <CategoryFilter />
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ScrollIndicator />
    </div>
  );
};

export default FuturisticProjects;