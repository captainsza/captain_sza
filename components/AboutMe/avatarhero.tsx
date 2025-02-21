import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface WelcomeAvatarProps {
  imageUrl: string;
  videoUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glowColor?: string;
  welcomeMessage?: string;
  additionalInfo?: {
    title: string;
    items: { label: string; value: string }[];
  };
  className?: string;
}

export const WelcomeAvatar: React.FC<WelcomeAvatarProps> = ({
  imageUrl,
  videoUrl = '/me_files/0.mp4',
  size = 'lg',
  glowColor = 'from-blue-500 via-purple-500 to-pink-500',
  welcomeMessage = "Welcome to my universe!",
  additionalInfo,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bowingAnimation, setBowingAnimation] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoopCompleted, setVideoLoopCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Size mapping for responsive design
  const sizeClasses = {
    sm: 'w-24 h-24', // Smaller size for mobile
    md: 'w-64 h-64',
    lg: 'w-80 h-80',
    xl: 'w-96 h-96'
  };

  // Trigger bowing animation on mount
  useEffect(() => {
    const bowingSequence = async () => {
      setBowingAnimation(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBowingAnimation(false);
      // Start video after bowing animation
      setShowVideo(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    };

    bowingSequence();
    return () => setShowVideo(false);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    const x = (clientX - left - width / 2);
    const y = (clientY - top - height / 2);
    
    setRotation({
      x: -(y / height) * 15,
      y: (x / width) * 15,
      z: bowingAnimation ? 15 : 0
    });

    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0, z: bowingAnimation ? 15 : 0 });
    setIsHovered(false);
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    setVideoLoopCompleted(true);
  };

  return (
    <div className="relative" style={{ perspective: '2000px' }}>
      <div className={`p-2 sm:p-12 relative ${isHovered ? 'z-50' : 'z-0'}`}>
        <motion.div
          className={`relative ${sizeClasses[size]} ${className} cursor-pointer`}
          animate={{
            rotateX: rotation.x,
            rotateY: rotation.y,
            rotateZ: bowingAnimation ? 15 : 0,
            scale: isHovered ? 1.1 : 1,
            z: isHovered ? 50 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: bowingAnimation ? 10 : 30
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Welcome message with glowing effect */}
          <AnimatePresence>
            {(isHovered || bowingAnimation) && (
              <motion.div
                className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900/90 rounded-full px-6 py-2 whitespace-nowrap"
                initial={{ opacity: 0, y: -20, z: 30 }}
                animate={{ opacity: 1, y: 0, z: 30 }}
                exit={{ opacity: 0, y: -20, z: 30 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.span
                  className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  {welcomeMessage}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dynamic background effect */}
          <motion.div
            className="absolute rounded-full"
            animate={{
              scale: isHovered ? 1.15 : 1,
              opacity: isHovered ? 1 : 0
            }}
            style={{
              inset: -20,
              background: `radial-gradient(circle at ${50 + (mousePosition.x / 100)}% ${50 + (mousePosition.y / 100)}%, 
                rgba(59, 130, 246, 0.3), 
                rgba(139, 92, 246, 0.2), 
                rgba(0, 0, 0, 0))`
            }}
          />

          {/* Orbital rings with welcomeFects */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute inset-0 rounded-full border border-blue-500/30"
              animate={{
                rotateZ: [0, 360],
                scale: isHovered ? 1 + (index * 0.05) : 1,
                z: isHovered ? index * 20 : 0
              }}
              transition={{
                rotateZ: {
                  repeat: Infinity,
                  duration: 8 - index,
                  ease: "linear"
                },
                scale: {
                  duration: 0.4
                }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
          ))}

          {/* Main avatar container with bow animation */}
          <motion.div
            className="relative w-full h-full rounded-full overflow-hidden"
            animate={{
              rotateX: bowingAnimation ? 30 : 0,
              translateY: bowingAnimation ? 20 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            <motion.div
              className="w-full h-full"
              animate={{
                x: !videoLoopCompleted && isHovered ? mousePosition.x * 0.1 : 0,
                y: !videoLoopCompleted && isHovered ? mousePosition.y * 0.1 : 0,
                scale: bowingAnimation ? 1.1 : 1
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <AnimatePresence>
                {(!showVideo || videoLoopCompleted) && (
                  <motion.img
                    src={imageUrl}
                    alt="Welcome Avatar"
                    className="w-full h-full object-cover absolute inset-0"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>
              
              <motion.div 
                className="w-full h-full absolute inset-0 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: showVideo ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  loop={false}
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Additional info panel */}
          <AnimatePresence>
            {isHovered && additionalInfo && (
              <motion.div
                className="absolute -right-1/4 top-1/4 bg-gray-900/90 rounded-lg p-4 text-white"
                initial={{ opacity: 0, x: 50, z: -20 }}
                animate={{ opacity: 1, x: 0, z: 40 }}
                exit={{ opacity: 0, x: 50, z: -20 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <h3 className="text-lg font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {additionalInfo.title}
                </h3>
                {additionalInfo.items.map((item, index) => (
                  <div key={index} className="mb-1">
                    <span className="text-blue-300">{item.label}:</span>
                    <span className="ml-2 text-gray-300">{item.value}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glowing effect */}
          <motion.div
            className={`absolute -inset-4 rounded-full bg-gradient-to-r ${glowColor} opacity-0 blur-xl`}
            animate={{
              opacity: isHovered ? 0.5 : 0,
              scale: isHovered ? 1.2 : 1
            }}
            style={{
              transform: `translate3d(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px, 50px)`
            }}
          />

          {/* Welcome particles */}
          <AnimatePresence>
            {(isHovered || bowingAnimation) && (
              <>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-blue-400/50"
                    initial={{
                      scale: 0,
                      x: 0,
                      y: 0,
                      z: 0
                    }}
                    animate={{
                      scale: [1, 0],
                      x: Math.cos(i * (Math.PI / 6)) * 120,
                      y: Math.sin(i * (Math.PI / 6)) * 120,
                      z: 50
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

const HeroWelcomeSection: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      >
        <source src="/videos/coool.mp4" type="video/mp4" />
      </video>

      {/* Content container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto w-full">
          {/* Welcome Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-end"
          >
            <WelcomeAvatar
              imageUrl="/2.png"
              size="xl"
              welcomeMessage="Welcome to My Digital Universe!"
              additionalInfo={{
                title: "Quick Intro",
                items: [
                  { label: "Role", value: "Full-Stack Developer" },
                  { label: "Specialty", value: "Next.js & TypeScript" },
                  { label: "Mission", value: "Creating Digital Magic" }
                ]
              }}
            />
          </motion.div>

          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Welcome to My Portfolio
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Exploring the intersection of creativity and technology
            </p>
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold text-lg"
            >
              Explore My Work
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroWelcomeSection;