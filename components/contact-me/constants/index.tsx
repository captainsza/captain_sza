import { Github, Linkedin, Globe, Mail } from 'lucide-react';
import { SocialLink } from '../types';

export const PROMPT = 'visitor@contact-terminal:~$';

export const BOOT_MESSAGES = [
  'Initializing terminal subsystems...',
  'Loading communication protocols...',
  'Establishing secure connection...',
  'Mounting contact interface...',
  'Starting neural network...',
  'Calibrating quantum entanglement...',
  'Terminal ready.',
];

export const SOCIAL_LINKS: SocialLink[] = [
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
    url: 'mailto:captainempire786@gmail.com',
    color: 'hover:text-pink-400',
  },
];

export const TERMINAL_COMMANDS = {
  HELP: `
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
  `,
  ABOUT: `
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
`,
  SKILLS: `
Technical Skills
---------------
Languages: TypeScript, Python, JavaScript, Solidity
Frontend: React, Next.js, TailwindCSS, Three.js
Backend: Node.js, Express, Django, Prisma
Database: MongoDB, MySQL, SQLite
Cloud: Google Cloud, Ubuntu
AI/ML: TensorFlow, PyTorch, Scikit-learn
`,
  PROJECTS: `
Featured Projects
----------------
🍕 CapPizza - Real-time pizza delivery app with order tracking and Stripe integration
🌍 AiroMap - Real-time air quality monitoring with GPS-based AQI display
📊 FlexeereLedger - Invoice and expense tracking for businesses with multi-company support
🖥️ ADVPS - E-commerce platform for virtual private servers with admin and customer panels
🏫 School Management System - Digital platform for student records and academic management
📞 Telecaller Management System - CRM for telecaller performance and engagement tracking
📸 BeingTrendz - AI-powered content generation platform with trendy captions and image analysis
`,
};
