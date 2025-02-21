import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Coffee, Download, Github, Linkedin, Globe, Mail } from 'lucide-react';

interface MobileFooterProps {
  isVisible: boolean;
  onContactClick: () => void;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ isVisible, onContactClick }) => {
  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      url: 'https://github.com/captainsza',
      color: 'text-purple-400'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/zaid-ahmad-186665229/',
      color: 'text-blue-400'
    },
    {
      icon: <Globe className="w-5 h-5" />,
      label: 'Portfolio',
      url: '#',
      color: 'text-cyan-400'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      url: 'mailto:zaidahmad.work@gmail.com',
      color: 'text-pink-400'
    }
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md" />

      {/* Content */}
      <div className="relative px-4 py-3">
        {/* Main actions */}
        <div className="flex justify-around mb-2">
          <button
            onClick={onContactClick}
            className="flex flex-col items-center space-y-1"
          >
            <div className="p-2 rounded-full bg-gray-800/80 text-green-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-300">Contact</span>
          </button>

          <a
            href="https://www.buymeacoffee.com/captainsza"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center space-y-1"
          >
            <div className="p-2 rounded-full bg-gray-800/80 text-yellow-400">
              <Coffee className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-300">Coffee</span>
          </a>

          <a
            href="/resume.pdf"
            download
            className="flex flex-col items-center space-y-1"
          >
            <div className="p-2 rounded-full bg-gray-800/80 text-blue-400">
              <Download className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-300">CV</span>
          </a>
        </div>

        {/* Social links */}
        <div className="flex justify-around pt-2 border-t border-gray-700/50">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center space-y-1"
            >
              <div className={`p-2 rounded-full bg-gray-800/80 ${link.color}`}>
                {link.icon}
              </div>
              <span className="text-xs text-gray-300">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MobileFooter;
