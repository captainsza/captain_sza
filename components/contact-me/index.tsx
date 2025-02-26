/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Linkedin,
  Github,
  Mail,
  ExternalLink,
  Phone,
  MapPin,
  Terminal,
  X,
  Maximize2,
  Minimize2,
  Globe,
  User,
  FileCode2,
  MessageSquare,
  Download,
  ChevronRight,
  ChevronLeft,
  Heart,
  Bookmark,
  Coffee,
} from 'lucide-react';
import MobileFooter from './MobileFooter';
import { FaBookOpen } from 'react-icons/fa';
import { FormErrors, TerminalCommand,FormData } from './types';
import { BOOT_MESSAGES, PROMPT, SOCIAL_LINKS } from './constants';

// Types


const TerminalContact = () => {
  // State management
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<TerminalCommand[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [bootSequence, setBootSequence] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // New state for visibility
  const [isInView, setIsInView] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // Refs
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Quick actions state
  const [quickActions, setQuickActions] = useState({
    likes: 0,
    bookmarks: 0,
  });



  // Boot sequence animation
  useEffect(() => {
    if (bootSequence) {
      const interval = setInterval(() => {
        setBootProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setBootSequence(false), 1000);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [bootSequence]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer to detect if component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);




  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory, showContactForm]);

  // Terminal commands handler
  const handleCommand = (command: string) => {
    const timestamp = new Date().toLocaleTimeString();
    let output = '';
    let isError = false;

    switch (command.toLowerCase()) {
      case 'help':
        output = `
Available commands:
------------------
help     - Show this help message
clear    - Clear terminal history
contact  - Start contact form
about    - Show information about me
skills   - List my technical skills
projects - View my projects
social   - Show social links
exit     - Close terminal
        `;
        break;

      case 'clear':
        setTerminalHistory([]);
        return;

      case 'contact':
        output = 'Initializing contact form...';
        setTerminalHistory((prev) => [
          ...prev,
          { command, output, isError, timestamp },
        ]);
        setCurrentCommand('');
        setTimeout(() => {
          setShowContactForm(true);
        }, 1000);
        return;

      case 'about':
        output = `
███████╗░█████╗░██╗██████╗░  ░█████╗░██╗░░██╗███╗░░░███╗░█████╗░██████╗░
╚════██║██╔══██╗██║██╔══██╗  ██╔══██╗██║░░██║████╗░████║██╔══██╗██╔══██╗
░░███╔═╝███████║██║██║░░██║  ███████║███████║██╔████╔██║███████║██║░░██║
██╔══╝░░██╔══██║██║██║░░██║  ██╔══██║██╔══██║██║╚██╔╝██║██╔══██║██║░░██║
███████╗██║░░██║██║██████╔╝  ██║░░██║██║░░██║██║░╚═╝░██║██║░░██║██████╔╝
╚══════╝╚═╝░░╚═╝╚═╝╚═════╝░  ╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═════╝░

Full-Stack Developer | AI Explorer
----------------------------------------------------------
Location: Lucknow, India
Status: Available for exciting projects
Mission: Creating secure and scalable web solutions
        `;
        break;

      case 'skills':
        output = `
Technical Skills
---------------
Languages: TypeScript, Python, JavaScript, Solidity
Frontend: React, Next.js, TailwindCSS, Three.js
Backend: Node.js, Express, Django, Prisma
Database: MongoDB, MySQL, SQLite
Cloud: Google Cloud, Ubuntu
AI/ML: TensorFlow, PyTorch, Scikit-learn
        `;
        break;

      case 'projects':
        output = `
Featured Projects
----------------
🍕 CapPizza - Real-time pizza delivery app with order tracking and Stripe integration
🌍 AiroMap - Real-time air quality monitoring with GPS-based AQI display
📊 FlexeereLedger - Invoice and expense tracking for businesses with multi-company support
🖥️ ADVPS - E-commerce platform for virtual private servers with admin and customer panels
🏫 School Management System - Digital platform for student records and academic management
📞 Telecaller Management System - CRM for telecaller performance and engagement tracking
📸 BeingTrendz - AI-powered content generation platform with trendy captions and image analysis
        `;
        break;

      case 'social':
        output = `
Connect With Me
--------------
GitHub: https://github.com/captainsza
LinkedIn: https://www.linkedin.com/in/zaid-ahmad-186665229/
Email: captainempire786@gmail.com
        `;
        break;

      case 'exit':
        output = 'Terminating session...';
        setShowContactForm(false);
        setTimeout(() => {
          window.close();
        }, 1000);
        break;

      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`;
        isError = true;
    }

    setTerminalHistory((prev) => [
      ...prev,
      { command, output, isError, timestamp },
    ]);
    setCurrentCommand('');
  };

  // Handle terminal input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      handleCommand(currentCommand.trim());
    }
  };

  // Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Form validation
  const newErrors: FormErrors = {};
  if (!formData.name) newErrors.name = 'Name is required.';
  if (!formData.email) newErrors.email = 'Email is required.';
  if (!formData.subject) newErrors.subject = 'Subject is required.';
  if (!formData.message) newErrors.message = 'Message is required.';
  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    setIsSubmitting(false);
    return;
  }

  // API submission
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      setIsSuccess(true);
      setTerminalHistory((prev) => [
        ...prev,
        {
          command: 'submit_form',
          output: 'Message sent successfully! Thank you for contacting.',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setShowContactForm(false);
      setTimeout(() => setIsSuccess(false), 3000);
    } else {
      throw new Error(result.message || 'Failed to send message.');
    }
  } catch (error) {
    setTerminalHistory((prev) => [
      ...prev,
      {
        command: 'submit_form',
        output: (error instanceof Error ? error.message : 'Error sending message. Please try again.') || 'Error sending message. Please try again.',
        isError: true,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  } finally {
    setIsSubmitting(false);
  }
};


  // Render boot sequence
  if (bootSequence) {
    return (
      <div
        className="min-h-screen bg-gray-900 text-green-500 p-4 font-mono"
        ref={sectionRef}
      >
        <div className="max-w-4xl mx-auto">
          <div className="space-y-2">
            {BOOT_MESSAGES.slice(
              0,
              Math.floor((bootProgress / 100) * BOOT_MESSAGES.length)
            ).map((msg, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="text-blue-400">[INIT]</span>
                <span>{msg}</span>
              </div>
            ))}
            <div className="w-full bg-gray-800 h-2 rounded-full mt-4">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-200"
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            <div className="text-center text-sm">
              System boot: {bootProgress}%
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 relative" ref={sectionRef}>
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 opacity-70"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        
        {/* Added: Hexagon Grid for cyberpunk feel */}
        <div className="absolute inset-0 bg-[url('/hex-grid.png')] bg-repeat opacity-10"></div>
        
        {/* Added: Animated circuit lines */}
        <div className="absolute inset-0 bg-[url('/circuit-lines.png')] bg-cover opacity-5 animate-slow-pulse"></div>
      </div>

      {/* Conditionally render Sidebar */}
      {isInView && (
        <div className="hidden md:block">
          <div
            className={`
      fixed ${isSidebarCollapsed ? 'left-0' : 'left-4'} top-1/2 -translate-y-1/2
      bg-gray-800/90 backdrop-blur-lg rounded-lg
      border border-purple-500/30
      transition-all duration-300 ease-in-out
      ${isSidebarCollapsed ? 'w-16' : 'w-64'}
      z-50
    `}
          >
            {/* Collapse Toggle */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="absolute -right-3 top-1/2 -translate-y-1/2
          bg-gray-800 rounded-full p-1
          border border-purple-500/30
          text-gray-400 hover:text-white
          transition-all duration-200
        "
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>

            <div className="p-4 space-y-6">
              {/* Profile Section */}
              <div className="text-center">
                <User className="w-8 h-8 mx-auto text-purple-400" />
                {!isSidebarCollapsed && (
                  <div className="mt-2">
                    <h3 className="text-white font-semibold">Zaid Ahmad</h3>
                    <p className="text-sm text-gray-400">Full-Stack Developer</p>
                  </div>
                )}
              </div>

              {/* Contact Section */}
              <div className="text-center">
                <MessageSquare className="w-8 h-8 mx-auto text-green-400" />
                {!isSidebarCollapsed && (
                  <div className="mt-2">
                    <h3 className="text-white font-semibold">Contact Me</h3>
                    <p className="text-sm text-gray-400">
                      Get in touch without the terminal
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="space-y-2">
                {/* Contact Button */}
                <button
                  onClick={() => setShowContactForm(true)}
                  className={`
            w-full flex items-center space-x-3 p-2
            text-gray-400 hover:text-green-400
            rounded-lg hover:bg-gray-700/50
            transition-all duration-200
            group relative
          `}
                  onMouseEnter={() => setActiveTooltip('Contact Me')}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <MessageSquare className="w-5 h-5" />
                  {!isSidebarCollapsed && <span>Contact Me</span>}
                  {isSidebarCollapsed && activeTooltip === 'Contact Me' && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded border border-purple-500/30 whitespace-nowrap">
                      Contact Me
                    </div>
                  )}
                </button>

                {/* Social Links */}
                <div className="pt-4">
                  {!isSidebarCollapsed && (
                    <h4 className="text-gray-400 text-sm mb-2">Social Links</h4>
                  )}
                  {SOCIAL_LINKS.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                w-full flex items-center space-x-3 p-2
                text-gray-400 ${link.color}
                rounded-lg hover:bg-gray-700/50
                transition-all duration-200
                group relative
              `}
                      onMouseEnter={() => setActiveTooltip(link.label)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      {link.icon}
                      {!isSidebarCollapsed && <span>{link.label}</span>}
                      {isSidebarCollapsed && activeTooltip === link.label && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded border border-purple-500/30 whitespace-nowrap">
                          {link.label}
                        </div>
                      )}
                    </a>
                  ))}
                </div>

                {/* Buy Me a Coffee Button */}
                <div className="pt-4">
                  <a
                    href="https://www.buymeacoffee.com/captainsza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
              w-full flex items-center space-x-3 p-2
              text-gray-400 hover:text-yellow-400
              rounded-lg hover:bg-gray-700/50
              transition-all duration-200
              group relative
            `}
                    onMouseEnter={() => setActiveTooltip('Buy Me a Coffee')}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <Coffee className="w-5 h-5" />
                    {!isSidebarCollapsed && <span>Buy Me a Coffee</span>}
                    {isSidebarCollapsed && activeTooltip === 'Buy Me a Coffee' && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded border border-purple-500/30 whitespace-nowrap">
                        Buy Me a Coffee
                      </div>
                    )}
                  </a>
                </div>

                {/* Download CV Button */}
                <div className="pt-4">
                  <a
                    href="/resume.pdf"
                    className={`
              w-full flex items-center space-x-3 p-2
              text-gray-400 hover:text-blue-400
              rounded-lg hover:bg-gray-700/50
              transition-all duration-200
              group relative
            `}
                    onMouseEnter={() => setActiveTooltip('Download CV')}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <FaBookOpen  className="w-5 h-5" />
                    {!isSidebarCollapsed && <span>Download CV</span>}
                    {isSidebarCollapsed && activeTooltip === 'Download CV' && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded border border-purple-500/30 whitespace-nowrap">
                        Download CV
                      </div>
                    )}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Main Terminal Container */}
      <div
        ref={containerRef}
        className={`
            max-w-4xl mx-auto
            bg-gray-900/90 rounded-lg overflow-hidden
            border-2 border-purple-500/50
            backdrop-blur-xl shadow-[0_0_15px_rgba(168,85,247,0.4)]
            transition-all duration-300 relative
            ${isMinimized ? 'h-12' : isMaximized ? 'h-screen' : 'h-[600px]'}
            ${isSidebarCollapsed && isInView ? 'md:ml-20' : isInView ? 'md:ml-72' : ''}
            mb-20 sm:mb-0
          `}
      >
        {/* Terminal Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Scanlines Effect */}
          <div className="absolute inset-0 bg-[url('/scanlines.png')] bg-repeat opacity-5 animate-scanlines"></div>
          
          {/* CRT Flicker Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-30 animate-crt-flicker"></div>
          
          {/* Edge Glow */}
          <div className="absolute inset-0 border-4 border-purple-500/20 rounded-lg blur-[2px]"></div>
        </div>

        {/* Enhanced Terminal Header */}
        <div className="bg-gradient-to-r from-gray-800/90 via-gray-800 to-gray-800/90 px-4 py-2 flex items-center justify-between border-b border-purple-500/40 relative">
          {/* System Status Indicators */}
          <div className="absolute left-0 top-0 h-full w-16 overflow-hidden flex items-center justify-center">
            <div className="grid grid-cols-3 gap-1 px-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse animation-delay-300"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse animation-delay-600"></div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-16">
            <Terminal className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-gray-300 text-sm font-semibold group-hover:text-white transition-colors">
              <span className="text-purple-400">SZA</span>::Contact_Terminal <span className="text-green-400">v1.0.0</span>
            </span>
          </div>
          
          {/* System readout */}
          <div className="hidden sm:flex items-center text-xs text-gray-500 space-x-4 mr-24">
            <div className="flex items-center">
              <span className="text-green-400 mr-1">●</span>
              <span className="animate-typing">
                SYS:ONLINE
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 animate-blink mr-1">●</span>
              <span>MEM:OPTIMAL</span>
            </div>
            <div className="flex items-center">
              <span className="text-blue-400 animate-ping opacity-75 mr-1">●</span>
              <span>NET:SECURE</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 group">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-gray-700 rounded-full group transition-all duration-200 hover:scale-110"
            >
              <Minimize2 className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:bg-gray-700 rounded-full transition-all duration-200 hover:scale-110"
            >
              <Maximize2 className="w-4 h-4 text-gray-400 hover:text-white" />
            </button>
            <button
              onClick={() => window.close()}
              className="p-1 hover:bg-red-500/20 rounded-full group transition-all duration-200 hover:scale-110"
            >
              <X className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
            </button>
          </div>
        </div>
        
        {/* Enhanced Terminal Body with Retro-Futuristic UI */}
        <div className="relative h-full">
          {/* Terminal Side Decoration */}
          <div className="absolute left-0 top-0 h-full w-4 bg-gradient-to-b from-purple-500/20 via-blue-500/10 to-purple-500/20"></div>
          <div className="absolute right-0 top-0 h-full w-4 bg-gradient-to-b from-purple-500/20 via-blue-500/10 to-purple-500/20"></div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className={`
              h-full overflow-y-auto p-4 pl-6 space-y-2
              font-mono text-sm
              scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-gray-800/30
              bg-[radial-gradient(ellipse_at_center,rgba(59,73,111,0.15)_0%,rgba(17,24,39,0)_70%)]
            `}
          >
            {/* Terminal Welcome UI */}
            <div className="text-green-400 mb-6 border-l-2 border-green-500/50 pl-3 py-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-lg font-bold tracking-wider">WELCOME TO CONTACT TERMINAL v1.0.0</span>
              </div>
              <div className="mt-2 text-xs text-green-300/80">
                <span className="inline-block animate-blink">█</span> Type <span className="bg-green-500/20 px-1 rounded text-white">&apos;help&apos;</span> for available commands.
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="border border-green-500/30 bg-green-500/5 p-2 rounded hover:bg-green-500/10 transition-all group">
                  <div className="font-bold text-white group-hover:text-green-400 transition-colors">QUICK COMMAND</div>
                  <div className="text-green-300/80">contact - Start contact form</div>
                </div>
                <div className="border border-blue-500/30 bg-blue-500/5 p-2 rounded hover:bg-blue-500/10 transition-all group">
                  <div className="font-bold text-white group-hover:text-blue-400 transition-colors">ABOUT ME</div>
                  <div className="text-blue-300/80">about - Show information about me</div>
                </div>
              </div>
            </div>

            {/* Terminal History with Enhanced UI */}
            <div className="space-y-4 relative">
              {terminalHistory.map((entry, i) => (
                <div key={i} className="group rounded-md hover:bg-gray-800/50 transition-all p-2 -mx-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400 text-xs md:text-sm">{entry.timestamp}</span>
                    <span className="text-purple-400 group-hover:text-purple-300">{PROMPT}</span>
                    <span className="text-gray-300 font-bold group-hover:text-white">{entry.command}</span>
                  </div>
                  <pre
                    className={`
                      whitespace-pre-wrap pl-4 mt-1
                      ${entry.isError 
                        ? 'text-red-400 border-l-2 border-red-500/50 pl-2' 
                        : 'text-green-400 border-l-2 border-green-500/50 pl-2'}
                      rounded bg-opacity-20 py-1
                    `}
                  >
                    {entry.output}
                  </pre>
                  {/* Decorative line connecting command blocks */}
                  {i < terminalHistory.length - 1 && (
                    <div className="absolute left-[12px] h-4 w-0.5 bg-gray-700/50 -bottom-4"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Form with Enhanced UI */}
            {showContactForm && (
              <div className="mt-4 p-6 bg-gray-800/80 backdrop-blur-sm rounded-lg border-2 border-purple-500/40 animate-fade-in relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-lg"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-lg"></div>
                
                {/* Header with tech decoration */}
                <div className="flex items-center mb-6">
                  <div className="w-1 h-6 bg-green-400 mr-3 rounded animate-pulse"></div>
                  <h2 className="text-green-400 text-xl font-bold tracking-wider">CONTACT ME</h2>
                  <div className="ml-auto flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                    <span className="text-xs text-blue-400">SECURE TRANSMISSION</span>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-gray-300 mb-1 group-hover:text-white transition-colors">
                        <span className="inline-flex items-center">
                          <User className="w-3 h-3 mr-1 text-purple-400" />
                          NAME
                        </span>
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 bg-gray-900/80 border-2 border-gray-700 focus:border-purple-500 rounded-md text-gray-300 transition-all duration-300 focus:ring-2 focus:ring-purple-500/50 outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5 animate-pulse"></span>
                          {errors.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="group">
                      <label className="block text-gray-300 mb-1 group-hover:text-white transition-colors">
                        <span className="inline-flex items-center">
                          <Mail className="w-3 h-3 mr-1 text-purple-400" />
                          EMAIL
                        </span>
                      </label>
                      <input
                        type="email"
                        className="w-full p-3 bg-gray-900/80 border-2 border-gray-700 focus:border-purple-500 rounded-md text-gray-300 transition-all duration-300 focus:ring-2 focus:ring-purple-500/50 outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5 animate-pulse"></span>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-gray-300 mb-1 group-hover:text-white transition-colors">
                      <span className="inline-flex items-center">
                        <FileCode2 className="w-3 h-3 mr-1 text-purple-400" />
                        SUBJECT
                      </span>
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-900/80 border-2 border-gray-700 focus:border-purple-500 rounded-md text-gray-300 transition-all duration-300 focus:ring-2 focus:ring-purple-500/50 outline-none"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5 animate-pulse"></span>
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  
                  <div className="group">
                    <label className="block text-gray-300 mb-1 group-hover:text-white transition-colors">
                      <span className="inline-flex items-center">
                        <MessageSquare className="w-3 h-3 mr-1 text-purple-400" />
                        MESSAGE
                      </span>
                    </label>
                    <textarea
                      className="w-full p-3 bg-gray-900/80 border-2 border-gray-700 focus:border-purple-500 rounded-md text-gray-300 transition-all duration-300 focus:ring-2 focus:ring-purple-500/50 outline-none min-h-[100px]"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5 animate-pulse"></span>
                        {errors.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-md flex items-center space-x-2 transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 relative group overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        {isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-md flex items-center space-x-2 transition-all duration-300 hover:scale-105 relative group overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        <X className="w-4 h-4 mr-2" />
                        CANCEL
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></span>
                    </button>
                  </div>
                  
                  {/* Security indicator */}
                  <div className="absolute bottom-0 right-0 text-xs text-gray-500 flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
                    ENCRYPTED CONNECTION
                  </div>
                </form>
              </div>
            )}

            {/* Enhanced Current Input Line */}
            {!showContactForm && (
              <div className="flex items-center space-x-2 group border-t border-gray-800/50 pt-4 mt-6">
                <span className="text-blue-400 text-xs">{new Date().toLocaleTimeString()}</span>
                <span className="text-purple-400 group-hover:text-purple-300">{PROMPT}</span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-transparent text-gray-300 outline-none group-hover:text-white z-10 relative"
                    spellCheck={false}
                  />
                  {/* Subtle glow effect beneath the input */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                </div>
                <span
                  className={`
                    w-2.5 h-5 bg-gray-300
                    ${showCursor ? 'opacity-100' : 'opacity-0'}
                    transition-opacity duration-100
                  `}
                />
              </div>
            )}
            
            {/* Bottom terminal decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none"></div>
          </div>
        </div>
        
        {/* Terminal footer status bar */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-800/80 border-t border-purple-500/30 flex items-center px-3 text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
              <span>SYSTEM:ACTIVE</span>
            </div>
            <div className="hidden sm:flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 animate-ping opacity-75"></div>
              <span>PING:23MS</span>
            </div>
            <div className="hidden md:flex items-center">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1.5"></div>
              <span>CPU:12%</span>
            </div>
          </div>
          <div className="ml-auto flex items-center">
            {/* Date display */}
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Success message */}
      {isSuccess && (
        <div
          className={`
            fixed bottom-4 right-4
            bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-md
            flex items-center space-x-2
            animate-in slide-in-from-bottom-4 shadow-lg shadow-green-500/20
          `}
        >
          <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          <span>Message sent successfully!</span>
        </div>
      )}

      {/* Quick Access Floating Button (Mobile) */}
      {isInView && (
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={`
              fixed bottom-4 right-4 
              md:hidden
              p-3 rounded-full
              bg-gradient-to-r from-purple-500 to-pink-500
              text-white
              shadow-lg shadow-purple-500/20
              transition-all duration-300
              hover:scale-110
              z-50
            `}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-6 h-6" />
          ) : (
            <ChevronLeft className="w-6 h-6" />
          )}
        </button>
      )}

      {/* Mobile Footer */}
      <MobileFooter
        isVisible={isFooterVisible}
        onContactClick={() => setShowContactForm(true)}
      />
    </div>
  );
};

export default TerminalContact;
