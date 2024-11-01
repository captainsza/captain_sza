/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Send, Linkedin, Github, Mail, ExternalLink, Phone, MapPin } from 'lucide-react';


// Types
type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
};

const FuturisticContact = () => {
  // Enhanced state management
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [showHologram, setShowHologram] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [typingEffect, setTypingEffect] = useState('');
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const hologramRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  
  // Color palette
  const colors = {
    primary: '#6366f1', // Indigo
    secondary: '#d946ef', // Fuchsia
    accent: '#0ea5e9', // Light blue
    glow: '#60a5fa', // Blue glow
    text: '#ffffff',
    dark: '#0f172a', // Dark background
  };

  // Typing effect for welcome message
  useEffect(() => {
    const message = "Ready to connect? Send me a message...";
    let index = 0;
    
    const interval = setInterval(() => {
      setTypingEffect(message.substring(0, index));
      index++;
      
      if (index > message.length) {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  // Initialize component
  useEffect(() => {
    setIsMounted(true);
    initParticles();
    initHologram();
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCursorPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        updateParticlesWithCursor(e.clientX - rect.left, e.clientY - rect.top);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Enhanced particle system
  const initParticles = () => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3,
      color: [colors.primary, colors.secondary, colors.accent][Math.floor(Math.random() * 3)],
      alpha: Math.random() * 0.5 + 0.2
    });
    
    const particles: Particle[] = Array(70).fill(null).map(createParticle);
    setParticles(particles);
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Draw connecting lines
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `${colors.accent}${Math.floor((1 - distance / 100) * 255).toString(16).padStart(2, '0')}`;
            ctx.stroke();
          }
        });
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };

  // Holographic effect
  const initHologram = () => {
    const canvas = hologramRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let time = 0;
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create holographic grid effect
      const gridSize = 20;
      ctx.strokeStyle = `${colors.accent}33`;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const distortion = Math.sin(time + x * 0.1) * 5;
          
          ctx.beginPath();
          ctx.moveTo(x, y + distortion);
          ctx.lineTo(x + gridSize, y + distortion);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(x + distortion, y);
          ctx.lineTo(x + distortion, y + gridSize);
          ctx.stroke();
        }
      }
      
      time += 0.02;
      requestAnimationFrame(animate);
    };
    
    animate();
  };

  // Update particles based on cursor position
  const updateParticlesWithCursor = (x: number, y: number) => {
    setParticles(prevParticles => 
      prevParticles.map(particle => {
        const dx = x - particle.x;
        const dy = y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx -= (dx / distance) * force * 0.5;
          particle.vy -= (dy / distance) * force * 0.5;
        }
        
        return particle;
      })
    );
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Create success particles
      const successParticles = Array(20).fill(null).map(() => ({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        size: Math.random() * 4 + 2,
        color: colors.accent,
        alpha: 1
      }));
      
      setParticles(prev => [...prev, ...successParticles]);
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Focus handlers for animation effects
  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
    setShowHologram(true);
  };

  const handleBlur = () => {
    setActiveField(null);
    setShowHologram(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden px-4 py-16"
    >
      {/* Particle canvas background */}
      <canvas
        ref={particlesRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        width={1920}
        height={1080}
      />
      
      {/* Holographic grid effect */}
      <canvas
        ref={hologramRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        width={1920}
        height={1080}
      />
      
      {/* Main content container */}
      <div className={`
        max-w-7xl mx-auto relative z-10
        bg-gray-900/40 backdrop-blur-xl rounded-3xl p-4
        border border-purple-500/20
        transform transition-all duration-1000 ease-out
        ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        hover:shadow-2xl hover:shadow-purple-500/10
        group
        md:flex
      `}>
        {/* Left side */}
        <div className="md:w-1/2">
          <div className="max-w-md mx-auto">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />
            
            {/* Heading and subtitle */}
            <div className="text-center mb-6">
              <h1 className={`
                text-4xl font-bold mb-2
                bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400
                text-transparent bg-clip-text
                animate-pulse
                relative
              `}>
                Contact Me
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 blur-lg rounded-lg" />
              </h1>
              <p className="text-blue-300 text-base">
                {typingEffect}<span className="animate-pulse">|</span>
              </p>
            </div>
      
            {/* Contact form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Grid for name and email */}
              <div className="grid grid-cols-1 gap-4">
                {/* Name input */}
                <div className="space-y-1 relative group">
                  <label className="block text-blue-300 text-sm font-medium transition-colors group-hover:text-blue-200">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className={`
                      w-full px-3 py-2 rounded-lg
                      bg-gray-800/50 border border-purple-500/30
                      text-white placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-purple-500
                      transform transition-all duration-300
                      ${errors.name ? 'border-red-500' : ''}
                      group-hover:border-purple-400
                      backdrop-blur-lg
                    `}
                    placeholder="Your name"
                  />
                  {activeField === 'name' && (
                    <div className="absolute inset-0 -z-10 bg-purple-500/10 blur-lg rounded-lg animate-pulse" />
                  )}
                  {errors.name && (
                    <p className="text-red-400 text-sm absolute -bottom-5">{errors.name}</p>
                  )}
                </div>
      
                {/* Email input */}
                <div className="space-y-1 relative group">
                  <label className="block text-blue-300 text-sm font-medium transition-colors group-hover:text-blue-200">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className={`
                      w-full px-3 py-2 rounded-lg
                      bg-gray-800/50 border border-purple-500/30
                      text-white placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-purple-500
                      transform transition-all duration-300
                      ${errors.email ? 'border-red-500' : ''}
                      group-hover:border-purple-400
                      backdrop-blur-lg
                    `}
                    placeholder="your.email@example.com"
                  />
                  {activeField === 'email' && (
                    <div className="absolute inset-0 -z-10 bg-blue-500/10 blur-lg rounded-lg animate-pulse" />
                  )}
                  {errors.email && (
                    <p className="text-red-400 text-sm absolute -bottom-5">{errors.email}</p>
                  )}
                </div>
              </div>
      
              {/* Subject input */}
              <div className="space-y-1 relative group">
                <label className="block text-blue-300 text-sm font-medium transition-colors group-hover:text-blue-200">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={handleBlur}
                  className={`
                    w-full px-3 py-2 rounded-lg
                    bg-gray-800/50 border border-purple-500/30
                    text-white placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-purple-500
                    transform transition-all duration-300
                    ${errors.subject ? 'border-red-500' : ''}
                    group-hover:border-purple-400
                    backdrop-blur-lg
                  `}
                  placeholder="What would you like to discuss?"
                />
                {activeField === 'subject' && (
                  <div className="absolute inset-0 -z-10 bg-pink-500/10 blur-lg rounded-lg animate-pulse" />
                )}
                {errors.subject && (
                  <p className="text-red-400 text-sm absolute -bottom-5">{errors.subject}</p>
                )}
              </div>
      
              {/* Message textarea with character counter */}
              <div className="space-y-1 relative group">
                <label className="block text-blue-300 text-sm font-medium transition-colors group-hover:text-blue-200">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    rows={4}
                    maxLength={500}
                    className={`
                      w-full px-3 py-2 rounded-lg
                      bg-gray-800/50 border border-purple-500/30
                      text-white placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-purple-500
                      transform transition-all duration-300
                      ${errors.message ? 'border-red-500' : ''}
                      group-hover:border-purple-400
                      backdrop-blur-lg
                      resize-none
                    `}
                    placeholder="Write your message here..."
                  />
                  {activeField === 'message' && (
                    <div className="absolute inset-0 -z-10 bg-purple-500/10 blur-lg rounded-lg animate-pulse" />
                  )}
                  {/* Character counter */}
                  <div className="absolute bottom-2 right-2 text-sm text-gray-400">
                    {formData.message.length}/500
                  </div>
                </div>
                {errors.message && (
                  <p className="text-red-400 text-sm">{errors.message}</p>
                )}
              </div>
      
              {/* Submit button with advanced animations */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full py-3 px-4 rounded-lg
                  bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600
                  hover:from-purple-500 hover:via-pink-500 hover:to-blue-500
                  text-white font-medium text-base
                  transform transition-all duration-300
                  hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25
                  disabled:opacity-50 disabled:cursor-not-allowed
                  relative overflow-hidden
                  group
                `}
              >
                {/* Button background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Button content */}
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:animate-bounce" />
                    </>
                  )}
                </span>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </form>
      
           
      
            {/* Social links */}
            <div className="mt-4 flex justify-center space-x-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/zaid-ahmad-186665229/"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-lg rounded-full transition-opacity duration-300" />
                <Linkedin className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transform transition-all duration-300 group-hover:scale-110" />
              </a>
              
              {/* GitHub */}
              <a
                href="https://github.com/captainsza"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-lg rounded-full transition-opacity duration-300" />
                <Github className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transform transition-all duration-300 group-hover:scale-110" />
              </a>
              
              {/* External Link */}
              <a
                href="#"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-lg rounded-full transition-opacity duration-300" />
                <ExternalLink className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transform transition-all duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="md:w-1/2 flex items-center justify-center">
          {/* <DemoComputer/> */}
        </div>
      
        {/* Success message toast */}
        {isSuccess && (
          <div className={`
            fixed top-4 right-4 
            bg-gradient-to-r from-green-500/90 to-emerald-500/90 
            text-white px-6 py-3 rounded-lg
            transform transition-all duration-500
            flex items-center gap-2
            animate-in slide-in-from-top-4
            backdrop-blur-sm
          `}>
            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            Message sent successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default FuturisticContact;
