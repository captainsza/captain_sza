/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiTypescript, SiKubernetes, SiFlutter, SiMongodb, SiPrisma } from 'react-icons/si';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { RiTailwindCssFill } from "react-icons/ri";

export const personalInfo: PersonalInfo = {
        name: 'Zaid Ahmad',
        title: 'Full Stack Developer & AI Enthusiast',
        summary: `Dedicated software engineer with a focus on developing efficient, futuristic web and mobile applications. Skilled in combining deep technical expertise with creativity, my work spans across full-stack development, cloud solutions, and AI integration. Passionate about building impactful, user-centered solutions and pushing the boundaries of technology.`,
        skills: [
          {
            id: 'nextjs',
            icon: FaReact, // assuming a placeholder icon, since there’s no Next.js icon in FaReact
            name: 'Next.js',
            description: 'Full-Stack Framework',
            proficiency: 90,
          },
          {
            id: 'typescript',
            icon: SiTypescript,
            name: 'TypeScript',
            description: 'Type-Safe Development',
            proficiency: 85,
          },
          {
            id: 'python',
            icon: FaPython,
            name: 'Python',
            description: 'Scripting & AI',
            proficiency: 75,
          },
          {
            id: 'nodejs',
            icon: FaNodeJs,
            name: 'Node.js',
            description: 'Backend Development',
            proficiency: 80,
          },
          {
            id: 'flutter',
            icon: SiFlutter,
            name: 'Flutter',
            description: 'Cross-Platform Development',
            proficiency: 75,
          },
          {
            id: 'mongodb',
            icon: SiMongodb,
            name: 'MongoDB',
            description: 'NoSQL Database',
            proficiency: 80,
          },
          {
            id: 'prisma',
            icon: SiPrisma,
            name: 'Prisma',
            description: 'ORM & Database Management',
            proficiency: 85,
          },
          {
            id: 'Tailwind CSS',
            icon: RiTailwindCssFill,
            name: 'Prisma',
            description: ' CSS framework',
            proficiency: 85,
          },
        ],
        interests: ['Quantum Computing', 'Sci-Fi Projects', 'AI Evolution'],
        experienceYears: 1,
        avatarUrl: '/me.jpg',
    };
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
      