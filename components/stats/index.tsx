/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, useMotionValue, animate } from 'framer-motion';
import { Shield, Code, Brain, Clock, Users, Star, Zap, Award, Target } from 'lucide-react';

// Types
interface Stat {
  id: number;
  title: string;
  value: number;
  suffix: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  additionalData: {
    trend: number;
    history: number[];
    category: string;
  };
}

const stats: Stat[] = [
  {
    id: 1,
    title: "Projects Completed",
    value: 40,
    suffix: "+",
    description: "Successfully delivered projects",
    icon: <Shield className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-300",
    additionalData: {
      trend: 12,
      history: [65, 78, 90, 120, 150],
      category: "Development"
    }
  },
  {
    id: 2,
    title: "Lines of Code",
    value: 20000,
    suffix: "+",
    description: "Clean, efficient code written",
    icon: <Code className="w-6 h-6" />,
    color: "from-purple-500 to-pink-300",
    additionalData: {
      trend: 25,
      history: [1000, 3000, 5000, 10000, 20000],
      category: "Programming"
    }
  },
  {
    id: 3,
    title: "Technical Skills",
    value: 10,
    suffix: "+",
    description: "Technologies mastered",
    icon: <Brain className="w-6 h-6" />,
    color: "from-green-500 to-emerald-300",
    additionalData: {
      trend: 5,
      history: [1, 3, 5, 7, 10],
      category: "Expertise"
    }
  },
  {
    id: 4,
    title: "Years Experience",
    value: 1,
    suffix: "+",
    description: "Professional experience",
    icon: <Clock className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-300",
    additionalData: {
      trend: 1,
      history: [0.1, 0.3, 0.5, 0.7, 1],
      category: "Experience"
    }
  },
  {
    id: 5,
    title: "Happy Clients",
    value: 30,
    suffix: "+",
    description: "Satisfied customers",
    icon: <Users className="w-6 h-6" />,
    color: "from-red-500 to-rose-300",
    additionalData: {
      trend: 15,
      history: [1, 5, 10, 20, 30],
      category: "Client Relations"
    }
  },
  {
    id: 6,
    title: "Awards Won",
    value: 3,
    suffix: "+",
    description: "Industry recognition",
    icon: <Star className="w-6 h-6" />,
    color: "from-indigo-500 to-violet-300",
    additionalData: {
      trend: 3,
      history: [0, 1, 2, 3, 3],
      category: "Achievements"
    }
  },
  {
    id: 7,
    title: "System Uptime",
    value: 99.9,
    suffix: "%",
    description: "Service reliability",
    icon: <Zap className="w-6 h-6" />,
    color: "from-teal-500 to-cyan-300",
    additionalData: {
      trend: 0.1,
      history: [99.5, 99.6, 99.7, 99.8, 99.9],
      category: "Performance"
    }
  },
  {
    id: 8,
    title: "Certifications",
    value: 12,
    suffix: "+",
    description: "Professional certifications",
    icon: <Award className="w-6 h-6" />,
    color: "from-fuchsia-500 to-pink-300",
    additionalData: {
      trend: 2,
      history: [6, 8, 9, 10, 12],
      category: "Qualifications"
    }
  },
  {
    id: 9,
    title: "Success Rate",
    value: 98,
    suffix: "%",
    description: "Project success ratio",
    icon: <Target className="w-6 h-6" />,
    color: "from-amber-500 to-yellow-300",
    additionalData: {
      trend: 1,
      history: [94, 95, 96, 97, 98],
      category: "Performance"
    }
  }
];

// Mini chart component for stat cards
const MiniChart = React.memo(({ data }: { data: number[] }) => {
  const points = data.map((value, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: ((value - Math.min(...data)) / (Math.max(...data) - Math.min(...data))) * 100
  }));

  const pathD = `M ${points.map(p => `${p.x},${100 - p.y}`).join(' L ')}`;

  return (
    <svg className="w-full h-8 mt-2" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path
        d={pathD}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-white opacity-50"
      />
    </svg>
  );
});

// Hexagon background pattern component
const HexagonPattern = React.memo(() => {
  return (
    <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        >
          <svg width="40" height="40" viewBox="0 0 100 100">
            <polygon
              points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25"
              fill="none"
              stroke="currentColor"
              className="text-gray-500"
            />
          </svg>
        </div>
      ))}
    </div>
  );
});

// Cyberpunk-style decorative element
const CyberElement = React.memo(({ className }: { className?: string }) => (
  <div className={`absolute ${className} pointer-events-none`}>
    <svg width="40" height="40" viewBox="0 0 40 40">
      <path
        d="M0 20L20 0L40 20L20 40Z"
        className="stroke-current fill-none"
        strokeWidth="1"
      />
      <circle cx="20" cy="20" r="5" className="fill-current" />
    </svg>
  </div>
));

const FuturisticStats = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Particle system with more variety
  const particleCount = 50;
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    type: 'circle' | 'square' | 'triangle';
    speed: number;
  }>>([]);

  useEffect(() => {
    const types: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];
    const newParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      type: types[Math.floor(Math.random() * types.length)],
      speed: Math.random() * 2 + 1
    }));
    particlesRef.current = newParticles;
  }, []);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          controls.start('visible');
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [controls, hasAnimated]);

  // Category filter effect
  const filteredStats = activeCategory
    ? stats.filter(stat => stat.additionalData.category === activeCategory)
    : stats;

  const uniqueCategories = Array.from(new Set(stats.map(stat => stat.additionalData.category)));

  const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const countRef = useRef<HTMLSpanElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const scale = useMotionValue(1);

    // Enhanced mouse tracking
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXValue = ((y - centerY) / centerY) * 15;
        const rotateYValue = ((x - centerX) / centerX) * 15;

        rotateX.set(rotateXValue);
        rotateY.set(-rotateYValue);
        scale.set(1.05);
      }
    }, [rotateX, rotateY, scale]);

    const handleMouseLeave = useCallback(() => {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
      setIsHovered(false);
    }, [rotateX, rotateY, scale]);

    // Enhanced counter animation
    useEffect(() => {
      if (hasAnimated && countRef.current) {
        const node = countRef.current;
        const controls = animate(0, stat.value, {
          duration: 2.5,
          delay: index * 0.15,
          ease: "easeOut",
          onUpdate(value) {
            node.textContent = stat.value % 1 === 0
              ? Math.floor(value).toString() + stat.suffix
              : value.toFixed(1) + stat.suffix;
          },
        });
        return () => controls.stop();
      }
    }, [hasAnimated, stat.value, stat.suffix, index]);

    // Trend indicator
    const TrendIndicator = ({ trend }: { trend: number }) => (
      <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
      </div>
    );

    return (
      <motion.div
        className="relative"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              delay: index * 0.1,
              ease: "easeOut"
            }
          }
        }}
      >
        <motion.div
          className={`
            relative overflow-hidden rounded-xl p-6
            bg-gradient-to-br from-gray-900/90 to-gray-800/90
            border border-gray-700/50 backdrop-blur-lg
            transform transition-all duration-300
            ${isHovered ? 'shadow-2xl shadow-[#ffffff1a]' : 'shadow-lg'}
          `}
          ref={cardRef}
          style={{
            rotateX,
            rotateY,
            scale,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
        >
          {/* Animated gradient border */}
          <div
            className={`
              absolute inset-0 rounded-xl
              bg-gradient-to-r ${stat.color}
              opacity-0 transition-opacity duration-500
              ${isHovered ? 'opacity-20' : ''}
            `}
          />

          {/* Futuristic corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-blue-400/30" />
          <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-blue-400/30" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-blue-400/30" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-blue-400/30" />

          {/* Icon with enhanced animation */}
          <motion.div
            className={`
              mb-4 inline-flex items-center justify-center
              w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color}
              text-white shadow-lg relative overflow-hidden
            `}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 360 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            {stat.icon}
          </motion.div>

          {/* Main content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-white">
                <span ref={countRef}>0{stat.suffix}</span>
              </h3>
              <TrendIndicator trend={stat.additionalData.trend} />
            </div>

            <h4 className="text-lg font-semibold text-gray-200 mb-1">
              {stat.title}
            </h4>

            <p className="text-gray-400 text-sm">
              {stat.description}
            </p>

            {/* Mini trend chart */}
            <MiniChart data={stat.additionalData.history} />

            {/* Interactive gauge */}
            <motion.div
              className="w-full h-1 bg-gray-700 rounded-full mt-3 overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.2, duration: 1 }}
            >
              <motion.div
                className={`h-full bg-gradient-to-r ${stat.color}`}
                initial={{ width: '0%' }}
                animate={{ width: `${(stat.value / (stat.suffix === '%' ? 100 : stat.value)) * 100}%` }}
                transition={{ delay: index * 0.2, duration: 1.5, ease: "easeOut" }}
              />
            </motion.div>

            {/* Category badge */}
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 text-xs rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50">
                {stat.additionalData.category}
              </span>
            </div>

            {/* Hover details overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 flex items-center justify-center opacity-0 transition-opacity duration-300"
              style={{ opacity: isHovered ? 1 : 0, pointerEvents: isHovered ? 'auto' : 'none' }}
            >
              <div className="text-center p-4">
                <h5 className="text-xl font-bold text-white mb-2">Detailed Stats</h5>
                <div className="space-y-2">
                  <p className="text-gray-300">Growth Rate: {stat.additionalData.trend}%</p>
                  <p className="text-gray-300">Category: {stat.additionalData.category}</p>
                 
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  

  // Loading animation component
  const LoadingAnimation = () => (
    <div className="flex items-center justify-center space-x-2 mb-8">
      <motion.div
        className="w-3 h-3 bg-blue-500 rounded-full"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.div
        className="w-3 h-3 bg-purple-500 rounded-full"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
      />
      <motion.div
        className="w-3 h-3 bg-green-500 rounded-full"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, delay: 0.4, repeat: Infinity }}
      />
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full  overflow-hidden px-4 py-16"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
      >
        <source src="/videos/test.mp4" type="video/mp4" />
      </video>

      {/* Overlay to darken the video */}
      <div className="absolute inset-0 bg-black opacity-50" style={{ zIndex: -1 }} />

      {/* Enhanced particle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlesRef.current.map((particle, index) => (
          <motion.div
            key={index}
            className={`
              absolute 
              ${particle.type === 'circle' ? 'rounded-full' : ''}
              ${particle.type === 'square' ? 'rounded-sm' : ''}
              ${particle.type === 'triangle' ? 'triangle' : ''}
              bg-blue-500 opacity-20
            `}
            animate={{
              x: [
                `${particle.x}%`,
                `${particle.x + (Math.random() * 20 - 10)}%`
              ],
              y: [
                `${particle.y}%`,
                `${particle.y + (Math.random() * 20 - 10)}%`
              ],
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 3 + particle.speed,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            style={{
              width: particle.size,
              height: particle.size
            }}
          />
        ))}
      </div>

      {/* Hexagon pattern background */}
      <HexagonPattern />

      {/* Cyber elements */}
      <CyberElement className="top-10 left-10" />
      <CyberElement className="bottom-10 right-10" />

      {/* Content container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              background: 'linear-gradient(to right, #60A5FA, #8B5CF6, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            My Stats
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            A comprehensive overview of my professional achievements and expertise
          </motion.p>

          {/* Loading animation */}
          <LoadingAnimation />
        </motion.div>

        {/* Stats grid with enhanced layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate={hasAnimated ? 'visible' : 'hidden'}
        >
          {filteredStats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FuturisticStats;
