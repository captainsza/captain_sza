/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  GithubIcon, ExternalLinkIcon, ChevronDown, Settings2, 
  Code2, Monitor, Cpu, Laptop, Smartphone, Globe, 
  Star, Activity, Plus, Minus, ArrowRight, Eye, 
  TerminalSquare, Zap, Lock, ChevronRight, Layers, X
} from 'lucide-react';
import { Project, projects } from './data';

// Cyberpunk backdrop with enhanced particle system
const RetroFuturisticBackdrop = () => {
  const particleCount = 80; // Increased particle count
  const particles = Array.from({ length: particleCount });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59,130,246,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59,130,246,0.1) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(147,51,234,0.05) 0%, transparent 50%)
          `,
          backgroundSize: '40px 40px, 40px 40px, 100% 100%'
        }}
      />

      {/* Scanlines */}
      <div className="absolute inset-0 bg-[url('/scanlines.png')] bg-repeat opacity-5 pointer-events-none mix-blend-overlay"></div>

      {/* Enhanced Animated Particles */}
      {particles.map((_, i) => {
        const size = Math.random() * 2 + 0.5;
        const opacity = Math.random() * 0.4 + 0.1;
        const duration = Math.random() * 30 + 15;
        
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              Math.random() > 0.7 ? 'bg-blue-400' : Math.random() > 0.5 ? 'bg-purple-400' : 'bg-pink-400'
            }`}
            style={{
              width: size,
              height: size,
              opacity: opacity,
              boxShadow: `0 0 ${size * 2}px ${size}px ${
                Math.random() > 0.7 ? 'rgb(59 130 246 / 30%)' : 
                Math.random() > 0.5 ? 'rgb(147 51 234 / 30%)' : 'rgb(236 72 153 / 30%)'
              }`
            }}
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: 0
            }}
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
              scale: [0, 1, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        );
      })}

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0),rgba(0,0,0,0.8))]" />
    </div>
  );
};

// Enhanced loading bar with glitch effect
const CyberpunkLoadingBar = ({ progress }: { progress: number }) => (
  <div className="relative h-1.5 w-full bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
    {/* Pulsing background for more retro effect */}
    <div className="absolute inset-0 opacity-30 animate-pulse bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-pink-900/50 rounded-full"></div>
    
    <motion.div
      className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
      
      {/* Glitch effect */}
      <AnimatePresence>
        {progress > 30 && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: [0, 1, 0], x: ['100%', '200%', '300%'] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              repeatDelay: 3 + Math.random() * 5
            }}
            className="absolute inset-0 bg-white/50"
            style={{ width: Math.random() * 20 + 10 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
    
    {/* Progress markers */}
    <div className="absolute inset-y-0 left-0 w-full flex justify-between px-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div 
          key={i} 
          className={`w-[1px] h-full ${progress >= (i + 1) * 20 ? 'bg-white/30' : 'bg-gray-700/30'}`}
          style={{ left: `${i * 20}%` }}
        />
      ))}
    </div>
  </div>
);

// Futuristic tag component
const FuturisticTag = ({ tech, index }: { tech: string; index: number }) => (
  <motion.div
    className="px-2.5 py-1 text-2xs sm:text-xs rounded bg-gray-800/80 text-gray-300 border border-gray-700/50
              hover:border-cyan-500/50 hover:bg-cyan-900/20 transition-colors duration-300
              relative overflow-hidden group"
    whileHover={{ scale: 1.05, y: -1 }}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <span className="relative z-10">{tech}</span>
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
      initial={{ x: '-100%' }}
      whileHover={{ x: '100%' }}
      transition={{ duration: 1 }}
    />
    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

// Project preview modal with enhanced UI
const ProjectPreviewModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [tab, setTab] = useState<'details'>('details');
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-gray-900/90 rounded-xl overflow-hidden border border-gray-700/50"
        onClick={e => e.stopPropagation()}
      >
        {/* Terminal-style header */}
        <div className="bg-gray-800/90 px-4 py-2 flex items-center justify-between border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <h3 className="text-sm font-mono text-gray-300">
              <span className="text-cyan-400">project</span>::<span className="text-purple-400">{project.title.toLowerCase().replace(/\s+/g, '_')}</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700/70 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        {/* Tab navigation */}
        <div className="flex border-b border-gray-700/50">
     
          <button 
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === 'details' ? 'text-cyan-400 border-b-2 border-cyan-500' : 'text-gray-400'
            }`}
            onClick={() => setTab('details')}
          >
            Details
          </button>
        </div>
        
        
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="text-gray-400 leading-relaxed">{project.description}</p>
            </div>
            
            {/* Key features */}
            <div className="space-y-3">
              <h4 className="text-sm uppercase tracking-wider text-gray-500 font-semibold">Key Features</h4>
              <ul className="space-y-2">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-3 border-t border-gray-800">
              <h4 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <FuturisticTag key={tech} tech={tech} index={i} />
                ))}
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-800 flex flex-wrap gap-x-8 gap-y-3">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-1">Project Type</h4>
                <div className="flex items-center space-x-2">
                  {project.type === 'fullstack' && <Layers className="w-4 h-4 text-purple-400" />}
                  {project.type === 'frontend' && <Monitor className="w-4 h-4 text-blue-400" />}
                  {project.type === 'backend' && <TerminalSquare className="w-4 h-4 text-green-400" />}
                  {project.type === 'mobile' && <Smartphone className="w-4 h-4 text-pink-400" />}
                  <span className="text-gray-300 capitalize">{project.type}</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-1">Completion Date</h4>
                <div className="text-gray-300">{new Date(project.completionDate).toLocaleDateString()}</div>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-1">Project Status</h4>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${project.progress === 100 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <span className="text-gray-300">{project.progress === 100 ? 'Completed' : 'In Progress'}</span>
                </div>
              </div>
            </div>
          </div>
       
        
        {/* Action buttons */}
        <div className="bg-gray-800/70 px-6 py-3 flex items-center justify-between">
          <div className="flex space-x-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-sm flex items-center space-x-1.5 bg-gray-700/50 hover:bg-gray-700 
                           text-gray-300 rounded-md transition-colors border border-gray-600/50"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-sm flex items-center space-x-1.5 bg-cyan-900/20 hover:bg-cyan-900/30 
                           text-cyan-300 rounded-md transition-colors border border-cyan-800/50"
              >
                <ExternalLinkIcon className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {project.stats.commits} commits · {project.stats.stars} stars
          </div>
        </div>
        
        {/* Decorative scanner line */}
        <motion.div
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          initial={{ y: 0, opacity: 0.7 }}
          animate={{ 
            y: ['0%', '100%'], 
            opacity: [0.7, 0.3, 0.7]  
          }}
          transition={{ 
            y: { duration: 2, repeat: Infinity, repeatType: 'reverse' },
            opacity: { duration: 2, repeat: Infinity, repeatType: 'reverse' }
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Enhanced Project Card with retro-futuristic design
const RetroFuturisticProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const controls = useAnimation();
  
  // Handle mouse move effect for card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Update custom properties for the gradient effect
    cardRef.current.style.setProperty('--x', `${x * 100}%`);
    cardRef.current.style.setProperty('--y', `${y * 100}%`);
  };
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={`group flex flex-col h-full relative cyberpunk-card`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: index * 0.1
          } 
        }
      }}
    >
      {/* Main Card */}
      <div
        ref={cardRef}
        className="relative h-full flex flex-col bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden 
                  border border-gray-800/70 transition-all duration-300
                  hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          '--x': '50%',
          '--y': '50%'
        } as React.CSSProperties}
      >
        {/* Scanlines overlay for retro effect */}
        <div className="absolute inset-0 bg-scanlines opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        
        {/* Hover spotlight effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at var(--x) var(--y), rgba(34,211,238,0.1), transparent 80%)'
          }}
        ></div>
        
        {/* Image Container with data corruption effect */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={isHovered ? {
              clipPath: [
                'inset(0% 0% 100% 0%)',
                'inset(0% 0% 0% 0%)',
                'inset(0% 0% 100% 0%)'
              ]
            } : {}}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          />
          
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          
          {/* Glitch effect overlay */}
          {isHovered && (
            <AnimatePresence>
              <motion.div
                className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.3, 0],
                  x: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 0.2,
                  repeat: 3,
                  repeatType: "reverse",
                  delay: 1,
                  repeatDelay: 3
                }}
              />
            </AnimatePresence>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
          
          {/* Enhanced preview button */}
          <motion.button
            onClick={() => setShowPreview(true)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/70 text-white/70
                      hover:bg-cyan-900/80 hover:text-white transition-all duration-300
                      border border-white/10 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-4 h-4" />
          </motion.button>

          {/* Project type badge */}
          <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-gray-900/70 backdrop-blur-sm
                         border border-gray-700/50 text-xs text-gray-300 flex items-center">
            {project.type === 'fullstack' && <Layers className="w-3 h-3 mr-1.5 text-purple-400" />}
            {project.type === 'frontend' && <Monitor className="w-3 h-3 mr-1.5 text-blue-400" />}
            {project.type === 'backend' && <TerminalSquare className="w-3 h-3 mr-1.5 text-green-400" />}
            {project.type === 'mobile' && <Smartphone className="w-3 h-3 mr-1.5 text-pink-400" />}
            <span className="capitalize">{project.type}</span>
          </div>
        </div>

        {/* Content Container with compact design */}
        <div className="flex flex-col flex-grow p-5 space-y-3">
          {/* Header with progress */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white truncate">{project.title}</h3>
              <div className="flex-shrink-0 w-20">
                <CyberpunkLoadingBar progress={project.progress} />
              </div>
            </div>
            <p className="text-xs text-gray-400 line-clamp-2 min-h-[2.5rem]">
              {project.description}
            </p>
          </div>

          {/* Tech Stack - Scrollable row */}
          <div className="flex-none h-8 overflow-x-auto flex items-center gap-1.5 pb-1 no-scrollbar">
            {project.technologies.slice(0, 6).map((tech, i) => (
              <FuturisticTag key={tech} tech={tech} index={i} />
            ))}
            {project.technologies.length > 6 && (
              <span className="text-xs text-cyan-500">+{project.technologies.length - 6} more</span>
            )}
          </div>

          {/* Stats Section - More compact */}
          <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-800/50 text-center">
            {Object.entries(project.stats).map(([key, value]) => (
              <div key={key} className="flex flex-col justify-center">
                <div className="text-sm font-bold text-cyan-400">{value}</div>
                <div className="text-2xs text-gray-500 capitalize">{key}</div>
              </div>
            ))}
          </div>

          {/* Actions Footer */}
          <div className="flex items-center justify-between pt-1 mt-auto">
            <div className="flex gap-2">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white
                           hover:bg-gray-700 transition-colors duration-300 border border-gray-700/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <GithubIcon className="w-4 h-4" />
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-gray-800/50 text-gray-400 hover:text-cyan-400
                           hover:bg-cyan-900/20 transition-colors duration-300 border border-gray-700/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <ExternalLinkIcon className="w-4 h-4" />
                </motion.a>
              )}
            </div>

            <motion.button
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-800/80
                       text-xs text-gray-300 hover:text-cyan-300 border border-gray-700/50
                       hover:border-cyan-500/30 hover:bg-gray-800 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </motion.button>
          </div>
        </div>

        {/* Interactive corners - cyberpunk style */}
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-xl"></div>
        
        {/* Animated scan line */}
        <motion.div 
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          initial={{ y: '0%' }}
          animate={{ y: isHovered ? '100%' : '0%' }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, repeatType: 'reverse' }}
        />
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <ProjectPreviewModal project={project} onClose={() => setShowPreview(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main Projects Component
export default function RetroFuturisticProjects() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Project['category'][number]>('all');
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category.includes(selectedCategory));

  const categories = [
    { id: 'all', label: 'All Projects', icon: Globe },
    { id: 'web', label: 'Web Apps', icon: Monitor },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'ai', label: 'AI/ML', icon: Cpu },
    { id: 'blockchain', label: 'Blockchain', icon: Activity }
  ];

  return (
    <div className="relative min-h-screen bg-gray-950 py-16">
      <RetroFuturisticBackdrop />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-4"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              My Projects
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Exploring the intersection of design and technology through innovative solutions
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {categories.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              onClick={() => setSelectedCategory(id as typeof selectedCategory)}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-full
                transition-all duration-300 backdrop-blur-lg
                ${selectedCategory === id
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700/30 hover:bg-gray-700/50'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Updated grid layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <RetroFuturisticProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// Add this to your global CSS
const styles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;