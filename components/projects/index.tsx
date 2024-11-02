/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  GithubIcon, ExternalLinkIcon, ChevronDown, Settings2, 
  Code2, Monitor, Cpu, Laptop, Smartphone, Globe, 
  Star, Activity, Plus, Minus, ArrowRight
} from 'lucide-react';
import { Project, projects } from './data';

// Futuristic Loading Bar Component
const LoadingBar = ({ progress }: { progress: number }) => (
  <div className="relative h-1 w-full bg-gray-800 rounded-full overflow-hidden">
    <motion.div
      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
    <div className="absolute top-0 left-0 h-full w-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)]" />
  </div>
);

// Holographic Glow Effect
const HolographicGlow = () => (
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
  </div>
);

// Tech Badge Component
const TechBadge = ({ tech }: { tech: string }) => (
  <motion.span
    className="px-3 py-1 text-xs rounded-full bg-gray-800/80 text-gray-300 border border-gray-700"
    whileHover={{ scale: 1.05, y: -2 }}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {tech}
  </motion.span>
);

// Project Stats Component
const ProjectStats = ({ stats }: { stats: Project['stats'] }) => (
  <div className="grid grid-cols-3 gap-4">
    {Object.entries(stats).map(([key, value]) => (
      <motion.div
        key={key}
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          {value}
        </span>
        <span className="text-xs text-gray-400 capitalize">{key}</span>
      </motion.div>
    ))}
  </div>
);

// Enhanced Project Card Component
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const cardRef = useRef<HTMLDivElement>(null);

  const slideVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateX: -10,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={slideVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      layoutId={`project-${project.id}`}
      className="w-full"
    >
      <div 
        ref={cardRef}
        className={`
          relative group 
          bg-gray-900/70 backdrop-blur-xl
          border border-gray-800/50
          rounded-2xl overflow-hidden
          transition-all duration-500 ease-out
          hover:border-gray-700/50
          hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]
          ${isExpanded ? 'min-h-[600px]' : 'min-h-[400px]'}
        `}
      >
        <HolographicGlow />

        {/* Project Image Section */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
        </div>

        {/* Content Container */}
        <div className="relative p-6 space-y-4">
          {/* Project Title & Category */}
          <div className="flex items-center justify-between">
            <motion.h3 
              className="text-2xl font-bold text-white"
              layoutId={`title-${project.id}`}
            >
              {project.title}
            </motion.h3>
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <LoadingBar progress={project.progress} />
            </motion.div>
          </div>

          {/* Project Description */}
          <motion.p 
            className="text-gray-400 line-clamp-2"
            layoutId={`desc-${project.id}`}
          >
            {project.description}
          </motion.p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 pt-4"
              >
                {/* Highlights */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">Key Highlights</h4>
                  <div className="grid gap-3">
                    {project.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center space-x-3 text-gray-300"
                      >
                        <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <ProjectStats stats={project.stats} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Section */}
          <div className="flex items-center justify-between pt-4">
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
            
            {/* Expand/Collapse Button */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? (
                <Minus className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Projects Grid Component
export default function FuturisticProjects() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Project['category'][number]>('all');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

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
    <div className="min-h-screen bg-gray-950 py-20">
      {/* Background Effects */}
      {animationsEnabled && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(59,130,246,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              My Projects
            </span>
          </h1>
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

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
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