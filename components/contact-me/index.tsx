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

type TerminalCommand = {
  command: string;
  output: string;
  isError?: boolean;
  timestamp: string;
};

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

  // Terminal configuration
  const PROMPT = 'visitor@contact-terminal:~$';
  const BOOT_MESSAGES = [
    'Initializing terminal subsystems...',
    'Loading communication protocols...',
    'Establishing secure connection...',
    'Mounting contact interface...',
    'Starting neural network...',
    'Calibrating quantum entanglement...',
    'Terminal ready.',
  ];

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

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      url: 'https://github.com/captainsza',
      color: 'hover:text-purple-400',
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/zaid-ahmad-186665229/',
      color: 'hover:text-blue-400',
    },
    {
      icon: <Globe className="w-5 h-5" />,
      label: 'Portfolio',
      url: '#',
      color: 'hover:text-cyan-400',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      url: 'mailto:zaidahmad.work@gmail.com',
      color: 'hover:text-pink-400',
    },
  ];

  // Quick action sections
  const quickActionSections = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'Contact Me',
      command: 'contact',
      color: 'hover:text-green-400',
    },
  ];

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
Email: zaidahmad.work@gmail.com
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

    // Simulated form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
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
    } catch (error) {
      setTerminalHistory((prev) => [
        ...prev,
        {
          command: 'submit_form',
          output: 'Error sending message. Please try again.',
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
    <div
      className="min-h-screen bg-gray-900 p-4 relative"
      ref={sectionRef}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 opacity-70"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Conditionally render Sidebar */}
      {/* Conditionally render Sidebar */}
{isInView && (
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
          {socialLinks.map((link, index) => (
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
            download
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
            <Download className="w-5 h-5" />
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
)}

      {/* Main Terminal Container */}
      <div
        ref={containerRef}
        className={`
            max-w-4xl mx-auto
            bg-gray-900/95 rounded-lg overflow-hidden
            border border-purple-500/30
            backdrop-blur-xl
            transition-all duration-300
            ${isMinimized ? 'h-12' : isMaximized ? 'h-screen' : 'h-[600px]'}
            ${isSidebarCollapsed && isInView ? 'ml-20' : isInView ? 'ml-72' : ''}
          `}
      >
        {/* Terminal header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-purple-500/30">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-gray-300 text-sm font-semibold">
              Contact Terminal v1.0.0
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <Minimize2 className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <Maximize2 className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => window.close()}
              className="p-1 hover:bg-red-500/20 rounded group"
            >
              <X className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
            </button>
          </div>
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className={`
                h-full overflow-y-auto p-4 space-y-2
                font-mono text-sm
                scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-gray-800/30
              `}
        >
          {/* Welcome message */}
          <div className="text-green-400 mb-4 animate-pulse">
            Welcome to Contact Terminal v1.0.0
            <br />
            Type &apos;help&apos; for available commands.
          </div>

          {/* Terminal history */}
          {terminalHistory.map((entry, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">{entry.timestamp}</span>
                <span className="text-purple-400">{PROMPT}</span>
                <span className="text-gray-300">{entry.command}</span>
              </div>
              <pre
                className={`
                      whitespace-pre-wrap pl-4
                      ${entry.isError ? 'text-red-400' : 'text-green-400'}
                    `}
              >
                {entry.output}
              </pre>
            </div>
          ))}

          {/* Contact Form */}
          {showContactForm && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-purple-500/30 animate-fade-in">
              <h2 className="text-green-400 text-xl mb-4">Contact Me</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-300"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-300"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300">Subject</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-300"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm">{errors.subject}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300">Message</label>
                  <textarea
                    className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-300"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm">{errors.message}</p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Current input line */}
          {!showContactForm && (
            <div className="flex items-center space-x-2">
              <span className="text-blue-400">
                {new Date().toLocaleTimeString()}
              </span>
              <span className="text-purple-400">{PROMPT}</span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent text-gray-300 outline-none"
                spellCheck={false}
              />
              <span
                className={`
                      w-2 h-5 bg-gray-300
                      ${showCursor ? 'opacity-100' : 'opacity-0'}
                      transition-opacity duration-100
                    `}
              />
            </div>
          )}
        </div>

        {/* Success message */}
        {isSuccess && (
          <div
            className={`
                fixed bottom-4 right-4
                bg-green-500/90 text-white px-4 py-2 rounded
                flex items-center space-x-2
                animate-in slide-in-from-bottom-4
              `}
          >
            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            <span>Message sent successfully!</span>
          </div>
        )}
      </div>

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
    </div>
  );
};

export default TerminalContact;
