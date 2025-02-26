/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, Linkedin, Star, Trophy, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';

interface Hackathon {
        title: string;
        date: string;
        description: string;
        technologies: string[];
        achievements: string[];
        videoUrl?: string;
        imageUrl: string | string[]; // Allow both single and multiple images
        features?: { icon: string; label: string }[];
        status?: string;
      }
      

interface JobExperience {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  videoUrl?: string;
  logo: string;
}

// Enhanced GlowingButton Component
const GlowingButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}> = ({ children, onClick, className = '', type = 'button' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const glowAnimation = useAnimation();

  useEffect(() => {
    if (isHovered) {
      glowAnimation.start({
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
        transition: { duration: 2, repeat: Infinity }
      });
    } else {
      glowAnimation.stop();
    }
  }, [isHovered, glowAnimation]);

  return (
    <motion.button
      type={type}
      className={`relative px-8 py-3 bg-transparent border border-blue-400 rounded-full overflow-hidden group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 0.8 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 bg-blue-400"
        animate={glowAnimation}
        style={{ filter: 'blur(20px)' }}
      />
      <span className="relative z-10 text-blue-400 group-hover:text-white transition-colors duration-300">
        {children}
      </span>
    </motion.button>
  );
};

// Enhanced VideoModal Component
const VideoModal: React.FC<{
  videoUrl: string;
  isOpen: boolean;
  onClose: () => void;
}> = ({ videoUrl, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateX: -20 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotateX: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="relative bg-gray-900 p-6 rounded-2xl max-w-4xl w-full mx-4 border border-blue-500/30"
            onClick={e => e.stopPropagation()}
          >
            <motion.button
              className="absolute -top-4 -right-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
            >
              ×
            </motion.button>
            <div className="relative pt-[56.25%]">
              <iframe
                src={videoUrl}
                title="Video"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Enhanced Card Component
const FuturisticCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.2) 0%, transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
};
const ImageSlider: React.FC<{ images: string[], autoPlay?: boolean }> = ({ images, autoPlay = false }) => {
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
      
        const handleNextImage = () => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        };
      
        const handlePrevImage = () => {
          setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + images.length) % images.length
          );
        };
      
        return (
          <div className="relative">
            <img
              src={images[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-1"
                >
                  &lt;
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-1"
                >
                  &gt;
                </button>
              </>
            )}
          </div>
        );
      };
      
// Enhanced Hackathon Card Component
const HackathonCard: React.FC<{ hackathon: Hackathon; index: number }> = ({ hackathon, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const controls = useAnimation();
  
  // Staggered animations for child elements
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Handle mouse move effect for 3D card tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            type: "spring",
            stiffness: 40,
            damping: 15,
            delay: index * 0.15
          } 
        }
      }}
      className="relative group"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 
                  rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      <div
        ref={cardRef}
        className="relative bg-gray-900/80 border border-gray-700/50 hover:border-cyan-500/30 rounded-2xl 
                  overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-cyan-500/10
                  transition-all duration-300 will-change-transform h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {/* Scanline effect overlay */}
        <div className="absolute inset-0 bg-[url('/scanlines.png')] bg-repeat opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        
        {/* Animated scanner line */}
        <motion.div 
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          initial={{ y: -10 }}
          animate={{ y: isHovered ? [0, 500, 0] : -10 }}
          transition={{ 
            duration: 4, 
            repeat: isHovered ? Infinity : 0, 
            ease: "linear" 
          }}
        />
        
        <div className="p-5 flex flex-col h-full">
          {/* Enhanced Header */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <motion.h3 
                className="text-xl font-bold text-transparent bg-clip-text 
                          bg-gradient-to-r from-cyan-400 to-blue-400"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                {hackathon.title}
              </motion.h3>
              
              {hackathon.status && (
                <motion.div 
                  className="flex items-center space-x-2 px-2.5 py-1 rounded-full 
                           bg-cyan-900/20 text-cyan-400 text-xs border border-cyan-500/30"
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
                  <span>{hackathon.status}</span>
                </motion.div>
              )}
            </div>
            
            <motion.div 
              className="flex items-center space-x-2 text-xs text-gray-400"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
            >
              <span className="inline-block w-3.5 h-3.5 bg-gray-800 rounded-full border border-gray-700 
                            flex items-center justify-center text-[8px]">
                <span className="text-cyan-400">T</span>
              </span>
              <span>{hackathon.date}</span>
            </motion.div>
          </div>

          {/* Enhanced Image Carousel */}
          <div className="relative rounded-lg overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 0.6 }
              }}
            />
            
            <motion.div
              className="absolute top-0 left-0 w-full h-1 z-20"
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1 }
              }}
              transition={{ duration: 1.5 }}
            >
              <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 w-full"></div>
            </motion.div>
            
            <div className="absolute top-2 left-2 z-20">
              <div className="px-2 py-1 bg-black/50 backdrop-blur-md rounded text-xs text-cyan-400 border border-cyan-800/30">
                {Array.isArray(hackathon.imageUrl) ? 
                  `${hackathon.imageUrl.length} images` : 'Preview'}
              </div>
            </div>
            
            <CyberpunkImageSlider 
              images={Array.isArray(hackathon.imageUrl) ? hackathon.imageUrl : [hackathon.imageUrl]}
            />
          </div>

          {/* Content with cyberpunk style scrollbars */}
          <div className="mt-5 flex-grow">
            <div className={`space-y-4 prose-sm ${!isExpanded && 'max-h-[150px] overflow-hidden relative'}`}>
              {/* Description with terminal style typing animation */}
              <motion.p 
                className="text-gray-300 relative pl-3 text-sm"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
              >
                <span className="absolute left-0 top-0 text-cyan-500 font-mono">&gt;</span>
                {hackathon.description}
              </motion.p>
              
              {/* Terminal-style divider */}
              <div className="border-t border-dashed border-gray-700/50 my-3 relative">
                <div className="absolute -top-1 left-0 bg-gray-900 px-2 text-xs text-gray-500 font-mono">
                  &lt;tech-stack&gt;
                </div>
              </div>
              
              {/* Technologies */}
              <motion.div 
                className="flex flex-wrap gap-1.5"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { staggerChildren: 0.05 }
                  }
                }}
              >
                {hackathon.technologies.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="px-2 py-1 text-xs rounded bg-gray-800/80 text-gray-300 
                             border border-gray-700/50 hover:border-cyan-500/30 
                             hover:bg-cyan-900/20 hover:text-cyan-400 
                             transition-colors duration-300 inline-flex items-center gap-1.5"
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-500/50"></span>
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              {/* Fade gradient for overflow */}
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
              )}
              
              {/* Features Grid - Enhanced with icons */}
              {hackathon.features && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {hackathon.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 p-1.5 rounded bg-gray-800/50 border border-gray-700/30
                              hover:border-cyan-500/20 hover:bg-cyan-900/10 transition-colors duration-300"
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-cyan-400">{feature.icon}</span>
                      <span className="text-xs text-gray-300">{feature.label}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Achievements - Enhanced with animation */}
              <div className="space-y-2 pt-2">
                <div className="text-xs uppercase tracking-wider text-gray-500 font-mono">Achievements</div>
                {hackathon.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-2 relative pl-4 group"
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex items-center justify-center">
                      <div className="absolute inset-0 bg-yellow-400/50 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Enhanced Expand/Collapse Button */}
            {hackathon.description.length > 100 && (
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-3 text-xs font-mono text-cyan-400 hover:text-cyan-300 
                          flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-transparent
                          hover:border-cyan-500/30 hover:bg-cyan-900/10 transition-colors duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>{isExpanded ? 'collapse_data' : 'expand_data'}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="opacity-70"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.div>
              </motion.button>
            )}
          </div>
        </div>
        
        {/* Interactive corners */}
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500/30 rounded-bl"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500/30 rounded-tr"></div>
        
        {/* Circuit board pattern overlay */}
        <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] bg-repeat opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

// Enhanced cyberpunk image slider
const CyberpunkImageSlider: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Auto rotation
  useEffect(() => {
    if (images.length > 1 && !isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [images.length, isHovered]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <motion.div 
      className="relative aspect-video w-full overflow-hidden rounded-lg"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-0 right-0 z-30 flex justify-center space-x-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentImageIndex 
                  ? 'bg-cyan-400 w-3' 
                  : 'bg-gray-400/40 hover:bg-gray-400/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Animated image slider with glitch effect */}
      <div className="relative w-full h-full">
        {images.map((image, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: i === currentImageIndex ? 1 : 0,
              filter: i === currentImageIndex ? 'none' : 'blur(10px)'
            }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={image}
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Glitch effect on transition */}
            {i === currentImageIndex && (
              <motion.div
                className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.2, 0],
                  x: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 0.2,
                  times: [0, 0.2, 0.5, 1],
                  repeat: 1,
                  repeatDelay: 3
                }}
              />
            )}
          </motion.div>
        ))}
        
        {/* Cyberpunk Interface Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner bracket decorations */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cyan-500/50"></div>
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-cyan-500/50"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-cyan-500/50"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-cyan-500/50"></div>
          
          {/* Data readout */}
          <div className="absolute top-2 right-10 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-cyan-400 border border-cyan-500/20">
            <span className="opacity-70">IMG_</span>{currentImageIndex + 1}
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      {images.length > 1 && isHovered && (
        <>
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 0.7, x: 0 }}
            whileHover={{ opacity: 1 }}
            onClick={handlePrevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white 
                     rounded-full p-1.5 backdrop-blur-md border border-white/10 z-20"
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.7, x: 0 }}
            whileHover={{ opacity: 1 }}
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white 
                     rounded-full p-1.5 backdrop-blur-md border border-white/10 z-20"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </>
      )}
    </motion.div>
  );
};

// Main FuturisticJourney Component
const FuturisticJourney: React.FC = () => {
        const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
        const [currentVideo, setCurrentVideo] = useState('');
      
        // Sample data
        const titles = ['Innovator', 'Full Stack Developer', 'AI Enthusiast', 'Problem Solver'];
        const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
      
        const hackathons: Hackathon[] = [
          {
            title: 'HACK-A-RUN',
            date: 'November 2023',
            description: 'AI-powered document interpretation system',
            technologies: ['Python', 'TensorFlow', 'React'],
            achievements: ['1st Runner-up', 'Best Technical Implementation'],
            videoUrl: '/journey/vid1.mp4',
            imageUrl: 'journey/h7.jpg',
          },
          {
            title: 'Novathon Hackathon',
            date: 'October 2023',
            description: 'Developed an advanced web app for data visualization',
            technologies: ['React', 'Firebase', 'Node.js'],
            achievements: ['2nd Runner-up', 'Innovative UI Award'],

            imageUrl:  ['/journey/h1.jpg','/journey/h2.jpg','/journey/h3.png',],
          },
          {
            title: 'Web-a-thon (IIT Kharagpur)',
            date: 'January 2023',
            description: 'Collaborated on a team project to create a hackathon event website',
            technologies: ['JavaScript', 'Bootstrap', 'MongoDB'],
            achievements: ['Team Collaboration Recognition'],
            imageUrl: ['/journey/h5.jpg','/journey/h4.jpg','/journey/h6.png'],
          },
          {
            title: 'AI Bot Detection System - IIT Kanpur',
            date: 'February 15-18, 2025',
            description: 'Developed an advanced AI system for detecting bot accounts using hybrid ML approaches and modern frontend technologies.',
            technologies: ['Next.js', 'Python', 'XGBoost', 'BERT', 'Neural Networks', 'TailwindCSS'],
            achievements: [
              'Finalist at IIT Kanpur and Best Technical Implementation',
            ],
            imageUrl: ['/journey/k1.jpg', '/journey/k2.jpg', '/journey/k3.jpg'],
            
            status: 'Qualified through all rounds'
          },
        ];
      
        const experiences: JobExperience[] = [
          {
            role: 'Intern',
            company: 'Oasis',
            period: 'October 2023',
            description:
              'Developed a React-based pizza ordering application, integrating user authentication and the Razorpay payment system. Enhanced user experience with real-time dashboard updates.',
            achievements: [
              'Built a functional e-commerce feature',
              'Implemented real-time updates for user-admin interaction',
              'Integrated secure payment system',
            ],
            technologies: ['React', 'Razorpay', 'Firebase'],
  
            logo: '/Journey/1.jpg',
          },
          {
            role: 'Full Stack Developer',
            company: 'Digilabs',
            period: 'January 2024 - March 2024',
            description:
              'Managed multiple projects independently, led client meetings, and showcased strong problem-solving abilities. Received recognition for excellent project management and client communication.',
            achievements: [
              'Delivered projects on time with exceptional quality',
              'Recognized for outstanding performance',
              'Enhanced team communication and project workflow',
            ],
            technologies: ['Next.js', 'TypeScript', 'Stripe',"Prisma"],
   
            logo: '/journey/3.jpg',
          },
          {
            role: 'Software Engineer',
            company: 'Flexeere',
            period: 'April 2024 - Present',
            description:
              'Contributing to the entire software development cycle, focusing on high-tech projects from conceptualization to deployment and continuous maintenance.',
            achievements: [
              'Implemented scalable software solutions',
              'Enhanced system performance through optimized development practices',
              'Led innovative, technology-forward initiatives',
            ],
            technologies: ['Next.js', 'TypeScript','Flutter' ,'Stripe',"Prisma", 'Cloud'],

            logo: '/journey/2.png',
          },
        ];
      
        useEffect(() => {
          const interval = setInterval(() => {
            setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
          }, 3000);
          return () => clearInterval(interval);
        }, []);
      


  return (
        <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
          {/* Improved background elements */}
      <div className="fixed inset-0 -z-10">
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
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0),rgba(0,0,0,0.8))]" />
      </div>
         
          {/* Experience Section */}
          <section id="experience" className="py-20 px-4 md:px-8 relative">
            <motion.h2
              className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Professional Journey
            </motion.h2>
    
            <div className="max-w-6xl mx-auto">
              {experiences.map((experience, index) => (
                <FuturisticCard
                  key={index}
                  className="mb-20 last:mb-0 bg-gray-800/50 rounded-xl border border-blue-500/30 backdrop-blur-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6">
                    <div className={`md:col-span-5 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                      <motion.div
                        className="relative group"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
    
                        <motion.img
                          src={experience.logo}
                          alt={experience.company}
                          className="w-40 h-20 rounded-lg mb-4 object-cover"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                        />
    
                        <motion.h3 
                          className="text-xl font-bold text-blue-400 mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                        >
                          {experience.role}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-purple-300 mb-1"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          {experience.company}
                        </motion.p>
                        
                        <motion.p 
                          className="text-gray-400 mb-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {experience.period}
                        </motion.p>
    
                        <div className="space-y-2">
                          {experience.achievements.map((achievement, i) => (
                            <motion.div
                              key={i}
                              className="flex items-center space-x-2"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <Trophy className="w-4 h-4 text-blue-400 flex-shrink-0" />
                              <span className="text-gray-300">{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
    
                    <div className={`md:col-span-7 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                      <div className="h-full flex flex-col justify-center">
                        <motion.p 
                          className="text-gray-300 mb-6"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                        >
                          {experience.description}
                        </motion.p>
    
                        <motion.div 
                          className="flex flex-wrap gap-2 mb-6"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ staggerChildren: 0.1 }}
                        >
                          {experience.technologies.map((tech, i) => (
                            <motion.span
                              key={tech}
                              className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </motion.div>
    
                        {experience.videoUrl && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <GlowingButton
                              onClick={() => {
                                setCurrentVideo(experience.videoUrl || '');
                                setIsVideoModalOpen(true);
                              }}
                              className="self-start"
                            >
                              <span className="flex items-center space-x-2">
                                <Play className="w-4 h-4" />
                                <span>Watch Video</span>
                              </span>
                            </GlowingButton>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </FuturisticCard>
              ))}
            </div>
          </section>
    
          {/* Hackathon Section */}
          <section id="hackathons" className="py-20 px-4 md:px-8 relative">
        {/* Section Header with Retro-Futuristic Design */}
        <div className="max-w-7xl mx-auto mb-16">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Animated decorative element */}
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-8"
              animate={{ 
                scaleX: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Hackathon Journey
            </h2>
            
            <div className="mt-4 flex items-center gap-1 font-mono text-xs text-gray-500">
              <span>{'['}</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-cyan-500"
              >
                ■
              </motion.span>
              <span>SYSTEM.INITIALIZE</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="text-cyan-500"
              >
                ■
              </motion.span>
              <span>{']'}</span>
            </div>
            
            <p className="mt-6 text-gray-400 text-center max-w-2xl">
              My journey through competitive programming challenges and hackathons, 
              building innovative solutions under pressure
            </p>
          </motion.div>
        </div>

        {/* Enhanced responsive grid layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 xl:gap-8">
          {hackathons.map((hackathon, index) => (
            <HackathonCard
              key={hackathon.title}
              hackathon={hackathon}
              index={index}
            />
          ))}
        </div>
        
        {/* Bottom decorative element */}
        <motion.div 
          className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-16"
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
        />
      </section>
    
          {/* Video Modal */}
          <VideoModal
            videoUrl={currentVideo}
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
          />
    
        
        </div>
      );
};

export default FuturisticJourney;