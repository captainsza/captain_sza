/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  GithubIcon, ExternalLinkIcon, ChevronDown, Settings2, 
  Code2, Monitor, Cpu, Laptop, Smartphone, Globe, 
  Star, Activity, Plus, Minus, ArrowRight, Eye
} from 'lucide-react';
import { Project, projects } from './data';

// Futuristic backdrop component with animated particles
const FuturisticBackdrop = () => {
  const particleCount = 50;
  const particles = Array.from({ length: particleCount });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59,130,246,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59,130,246,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Animated particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: 0
          }}
          animate={{
            x: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%'
            ],
            y: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%'
            ],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0),rgba(0,0,0,0.8))]" />
    </div>
  );
};

// Enhanced loading bar with glowing effect
const EnhancedLoadingBar = ({ progress }: { progress: number }) => (
  <div className="relative h-1.5 w-full bg-gray-800/50 rounded-full overflow-hidden">
    <motion.div
      className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
    </motion.div>
    
    {/* Glow effect */}
    <div className="absolute inset-0 blur-sm bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />
  </div>
);

// Holographic card effect
const HolographicCard = ({ children, isHovered }: { children: React.ReactNode; isHovered: boolean }) => (
  <div className="relative group">
    {/* Holographic background */}
    <motion.div
      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      animate={{
        background: isHovered
          ? "radial-gradient(circle at var(--x) var(--y), rgba(59,130,246,0.1), transparent 100%)"
          : "none"
      }}
    />
    
    {/* Main content */}
    {children}
    
    {/* Border gradient */}
    <div className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 -z-10" />
  </div>
);

// Tech badge with hover effect
const TechBadge = ({ tech }: { tech: string }) => (
  <motion.span
    className="px-3 py-1 text-xs rounded-full bg-gray-800/80 text-gray-300 border border-gray-700/50
              hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors duration-300"
    whileHover={{ scale: 1.05, y: -2 }}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {tech}
  </motion.span>
);

// Project preview modal
const ProjectPreviewModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden"
      onClick={e => e.stopPropagation()}
    >
      <video
        autoPlay
        loop
        muted
        className="w-full aspect-video object-cover"
        src={project.previewVideo}
      />
      
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        <p className="text-gray-400">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// Updated ProjectCard component with consistent sizing
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="h-full" // Ensure full height
    >
      <div className="relative h-full flex flex-col bg-gray-900/90 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50">
        {/* Image Container - Fixed height */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
          
          {/* Preview button */}
          <motion.button
            onClick={() => setShowPreview(true)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-gray-900/80 text-white/80
                      hover:bg-blue-500/80 hover:text-white transition-colors duration-300
                      border border-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-4 h-4" />
          </motion.button>

          {/* Project type badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gray-900/80 backdrop-blur-sm
                        border border-gray-700/50 text-xs text-gray-300">
            {project.type}
          </div>
        </div>

        {/* Content Container - Flexible height with consistent padding */}
        <div className="flex flex-col flex-grow p-6 space-y-4">
          {/* Header Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold text-white truncate">{project.title}</h3>
              <div className="flex-shrink-0 w-24">
                <EnhancedLoadingBar progress={project.progress} />
              </div>
            </div>
            <p className="text-sm text-gray-400 line-clamp-2 min-h-[2.5rem]">
              {project.description}
            </p>
          </div>

          {/* Tech Stack - Fixed height container with scroll */}
          <div className="h-12 overflow-x-auto flex items-center gap-2 pb-2 no-scrollbar">
            {project.technologies.map(tech => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-800/50">
            {Object.entries(project.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-bold text-blue-400">{value}</div>
                <div className="text-xs text-gray-500 capitalize">{key}</div>
              </div>
            ))}
          </div>

          {/* Actions Footer */}
          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="flex gap-3">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white
                          hover:bg-blue-500/20 transition-colors duration-300 border border-gray-700/50"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <GithubIcon className="w-4 h-4" />
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white
                          hover:bg-blue-500/20 transition-colors duration-300 border border-gray-700/50"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <ExternalLinkIcon className="w-4 h-4" />
                </motion.a>
              )}
            </div>

            <motion.button
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50
                      text-sm text-gray-400 hover:text-white border border-gray-700/50
                      hover:bg-blue-500/20 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <span>Details</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                     bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
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

// Main component
export default function FuturisticProjects() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Project['category'][number]>('all');
  
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
    <div className="relative min-h-screen bg-gray-950 py-20 overflow-hidden">
      <FuturisticBackdrop />

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
              <ProjectCard 
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