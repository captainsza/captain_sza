/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GrProjects } from "react-icons/gr";
import { GiNinjaHeroicStance } from "react-icons/gi";
import { SiAboutdotme } from "react-icons/si";
import { ImStatsDots } from "react-icons/im";
import { MdContactEmergency } from "react-icons/md";
import { HeroSectionComponent } from '../hero-section';
import { EnhancedFloatingDock } from '../ui/floating-dock';
import MusicPlayerButton from '../music';
import AnimatedSection from '../animatedsection';
import AboutMeComponent from '../AboutMe';
import FuturisticStats from '../stats';
import FuturisticProjects from '../projects';
import FuturisticContact from '../contact-me';

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

const links: NavLink[] = [
  {
    title: "Home",
    icon: <GiNinjaHeroicStance className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "#home",
  },
  {
    title: "About Me",
    icon: <SiAboutdotme className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "#about",
  },
  {
    title: "Stats",
    icon: <ImStatsDots className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "#stats",
  },
  {
    title: "Projects",
    icon: <GrProjects className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "#projects",
  },
  {
    title: "Contact Me",
    icon: <MdContactEmergency className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "#contact-me",
  },
];

export const HomeComponent: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effects only after mounting
  useEffect(() => {
        if (!mounted) return;
      
        const handleScroll = (): void => {
          if (typeof window === 'undefined') return; // Add this check
      
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
      }, [activeSection, mounted]);
      

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
        {mounted && (
          <>
            <EnhancedFloatingDock
              desktopClassName="bg-transparent backdrop-blur-sm"
              mobileClassName="bg-transparent backdrop-blur-sm"
              items={links.map(link => ({
                ...link,
                className: activeSection === link.href.slice(1) ? 'scale-110 text-primary' : ''
              }))}
            />
            <MusicPlayerButton />
          </>
        )}

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