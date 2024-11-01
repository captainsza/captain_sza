/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/Home.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HeroSectionComponent } from "@/components/hero-section";
import { EnhancedFloatingDock } from "@/components/ui/floating-dock";
import { GrProjects } from "react-icons/gr";
import { GiNinjaHeroicStance } from "react-icons/gi";
import { SiAboutdotme } from "react-icons/si";
import { ImStatsDots } from "react-icons/im";
import { MdContactEmergency } from "react-icons/md";
import AboutMeComponent from "@/components/AboutMe";
import FuturisticStats from "@/components/stats";
import FuturisticProjects from "@/components/projects";
import FuturisticContact from "@/components/contact-me";
import AnimatedSection from '@/components/animatedsection';
import MusicPlayerButton from '@/components/music';

interface NavLink {
  title: string;
  icon: React.ReactNode;
  href: string;
  className?: string;
}

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900" />
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};

const Home: React.FC = () => {
  // Add isClient state to handle hydration
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  
  const links: NavLink[] = [
    {
      title: "Home",
      icon: (
        <GiNinjaHeroicStance className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#home",
    },
    {
      title: "About Me",
      icon: (
        <SiAboutdotme className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#about",
    },
    {
      title: "Stats",
      icon: (
        <ImStatsDots className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#stats",
    },
    {
      title: "Projects",
      icon: (
        <GrProjects className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#projects",
    },
    {
      title: "Contact Me",
      icon: (
        <MdContactEmergency className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#contact-me",
    },
  ];

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only add scroll listener if we're in the browser
    if (typeof window === 'undefined') return;

    const handleScroll = (): void => {
      const sections = document.querySelectorAll('section');
      let currentSection = '';
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = section.id;
        }
      });
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Early return during SSR
  if (!isClient) {
    return (
      <PageWrapper>
        <div className="relative">
          <section id="home">
            <HeroSectionComponent />
          </section>
          {/* Render static content without interactive elements */}
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: {
            duration: 1,
            ease: "easeOut"
          }
        }}
        className="relative"
      >
        <EnhancedFloatingDock
          desktopClassName="bg-transparent backdrop-blur-sm"
          mobileClassName="bg-transparent backdrop-blur-sm"
          items={links.map(link => ({
            ...link,
            className: activeSection === link.href.slice(1) ? 'scale-110 text-primary' : ''
          }))}
        />
        <MusicPlayerButton />

        <section id="home">
          <HeroSectionComponent />
        </section>

        <AnimatedSection id="about" index={1}>
          <AboutMeComponent />
        </AnimatedSection>

        <section id="stats">
          <FuturisticStats />
        </section>

        <AnimatedSection id="projects" index={3}>
          <FuturisticProjects />
        </AnimatedSection>

        <section id="contact-me">
          <FuturisticContact />
        </section>
      </motion.div>
    </PageWrapper>
  );
};

export default Home;