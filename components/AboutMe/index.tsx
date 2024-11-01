/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState, useEffect, useRef, FC } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from './data';
import { Cover } from '../ui/cover';

// Types for Skill and Personal Info
interface Skill {
  id: string;
  icon: React.ElementType;
  name: string;
  description: string;
  proficiency: number;
}

interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  skills: Skill[];
  interests: string[];
  experienceYears: number;
  avatarUrl: string;
}

// Particle Background Component
const ParticleBackground: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      z: number;
      o: number;
    }[] = [];

    const initParticles = () => {
      for (let i = 0; i < 150; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * width,
          o: Math.random() * 0.5 + 0.5,
        });
      }
    };

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      particles.forEach(particle => {
        particle.z -= 2;
        if (particle.z <= 0) {
          particle.z = width;
        }

        const k = 128.0 / particle.z;
        const px = particle.x * k + width / 2;
        const py = particle.y * k + height / 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - particle.z / width) * 3;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.o})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] opacity-30"
    />
  );
};

// Video Background Component
const VideoBackground: FC = () => (
  <video
    autoPlay
    loop
    muted
    playsInline
    className="fixed inset-0 w-full h-full object-cover z-[-2]"
  >
    <source src="/videos/bg2.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
);

// Skill Icon Component
const SkillIcon: FC<Skill> = ({
  icon: Icon,
  name,
  description,
  proficiency,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-24 h-24 md:w-32 md:h-32 perspective-1000"
      whileHover={{ scale: 1.1 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className={`absolute w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full bg-gray-800/60 rounded-xl flex items-center justify-center [backface-visibility:hidden] backdrop-blur-sm border border-blue-500/30 shadow-lg">
          <Icon className="text-4xl md:text-5xl text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.7)]" />
        </div>

        {/* Back Side */}
        <div
          className={`absolute w-full h-full bg-gray-900/90 rounded-xl flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] p-2 text-center ${
            isFlipped ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-sm md:text-base font-bold text-blue-300">
            {name}
          </p>
          <div className="w-full bg-gray-700 h-2 mt-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full"
              style={{ width: `${proficiency}%` }}
            />
          </div>
          <p className="text-xs md:text-sm mt-1 text-gray-300">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Avatar Section Component
const AvatarSection: FC<{ personalInfo: PersonalInfo }> = ({ personalInfo }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-64 h-64 md:w-80 md:h-80 mx-auto group perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className={`absolute w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front Side: Avatar */}
        <div
          className="absolute w-full h-full bg-cover bg-center rounded-full shadow-xl [backface-visibility:hidden]"
          style={{
            backgroundImage: `url(${personalInfo.avatarUrl})`,
          }}
        />

        {/* Back Side: Highlights */}
        <div
          className="absolute w-full h-full bg-gray-900/90 rounded-full flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] p-6 text-center"
        >
          <h3 className="text-xl md:text-2xl font-bold text-blue-400">
            Quick Facts
          </h3>
          <p className="mt-4 text-sm md:text-base text-gray-300">
            <strong>Experience:</strong> {personalInfo.experienceYears} years
          </p>
          <p className="mt-2 text-sm md:text-base text-gray-300">
            <strong>Interests:</strong> {personalInfo.interests.join(', ')}
          </p>
        </div>
      </motion.div>

      {/* Hover Glow Effect */}
      <div
        className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-lg group-hover:opacity-75 transition-all duration-500"
      />
    </motion.div>
  );
};

// Main About Me Component
const AboutMeComponent: FC = () => {
 

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Video Background */}
      <VideoBackground />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Main Container */}
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 relative z-10">
        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
          transition={{ duration: 0.7 }}
          ref={ref}
        >
          <AvatarSection personalInfo={personalInfo} />
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
          transition={{ duration: 0.7 }}
        >
          {/* Dynamic Header */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 mb-4">
            {personalInfo.name}
          </h2>
          <h3 className="text-xl relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700  ">
          <Cover>{personalInfo.title}</Cover>
            
          </h3>

          {/* Summary with Scroll Animations */}
          <motion.p
            className="text-gray-400 mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {personalInfo.summary}
          </motion.p>

          {/* Skills Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {personalInfo.skills.map(skill => (
              <SkillIcon key={skill.id} {...skill} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Add any additional ambient particle effects here */}
      </div>
    </div>
  );
};

export default AboutMeComponent;
