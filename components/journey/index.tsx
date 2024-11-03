/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useAnimation } from 'framer-motion';
import { Play, Linkedin, Star, Trophy, ChevronRight, ChevronLeft } from 'lucide-react';

interface Hackathon {
        title: string;
        date: string;
        description: string;
        technologies: string[];
        achievements: string[];
        videoUrl?: string;
        imageUrl: string | string[]; // Allow both single and multiple images
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
const ImageSlider: React.FC<{ images: string[] }> = ({ images }) => {
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
          // Add more hackathons as needed...
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
            <motion.h2
              className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Hackathon Journey
            </motion.h2>
    
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
              {hackathons.map((hackathon, index) => (
                <FuturisticCard
                  key={hackathon.title}
                  className="bg-gray-800/50 p-6 rounded-xl border border-blue-500/30 backdrop-blur-sm"
                >
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
    
                    {Array.isArray(hackathon.imageUrl) ? (
                        <ImageSlider images={hackathon.imageUrl} />
                        ) : (
                        <img
                        src={hackathon.imageUrl}
                        alt={hackathon.title}
                        className="w-full h-56 object-cover rounded-lg mb-4"
                        />
                        )}


    
                    <motion.h3 
                      className="text-2xl font-bold text-blue-400 mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      {hackathon.title}
                    </motion.h3>
    
                    <motion.p 
                      className="text-gray-400 mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {hackathon.date}
                    </motion.p>
    
                    <motion.p 
                      className="text-gray-300 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {hackathon.description}
                    </motion.p>
    
                    <motion.div 
                      className="flex flex-wrap gap-2 mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ staggerChildren: 0.1 }}
                    >
                      {hackathon.technologies.map((tech, i) => (
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
    
                    <div className="space-y-2 mb-4">
                      {hackathon.achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                          <span className="text-gray-300">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
    
                    {hackathon.videoUrl && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <GlowingButton
                          onClick={() => {
                            setCurrentVideo(hackathon.videoUrl || '');
                            setIsVideoModalOpen(true);
                          }}
                        >
                          <span className="flex items-center space-x-2">
                            <Play className="w-4 h-4" />
                            <span>Watch Video</span>
                          </span>
                        </GlowingButton>
                      </motion.div>
                    )}
                  </motion.div>
                </FuturisticCard>
              ))}
            </div>
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