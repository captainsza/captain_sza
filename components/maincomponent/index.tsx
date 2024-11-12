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
import AboutMeComponent from '../AboutMe';
import FuturisticStats from '../stats';
import FuturisticProjects from '../projects';
import { GiJourney } from "react-icons/gi";
import CircularProgress from '../CircularProgress';
import TerminalContact from '../contact-me';
import FuturisticJourney from '../journey';
import { TransitionWrapper } from '../animatedsection';

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
    title: "My Journey",
    icon: <GiJourney className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "#my-journey",
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
  const [nextSection, setNextSection] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = (): void => {
      if (typeof window === 'undefined') return;

      const sections = document.querySelectorAll('section');
      let currentSection = '';
      let nextSectionId = '';

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = section.id;
          nextSectionId = sections[index + 1]?.id || '';
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
        setNextSection(nextSectionId);
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
            <CircularProgress/>
            
          </>
        )}

        <TransitionWrapper 
          sectionId="home" 
          activeSection={activeSection}
          nextSection={nextSection}
        >
          <section id="home">
            <HeroSectionComponent />
          
          </section>
        </TransitionWrapper>
        
        <TransitionWrapper 
          sectionId="about"
          activeSection={activeSection}
          nextSection={nextSection}
        >
          <section id="about">
            <AboutMeComponent />
          </section>
        </TransitionWrapper>

        <TransitionWrapper 
          sectionId="stats"
          activeSection={activeSection}
          nextSection={nextSection}
        >
          <section id="stats">
            <FuturisticStats />
          </section>
        </TransitionWrapper>

        <TransitionWrapper 
          sectionId="projects"
          activeSection={activeSection}
          nextSection={nextSection}
        >
          <section id="projects">
            <FuturisticProjects />
          </section>
        </TransitionWrapper>

        <TransitionWrapper 
          sectionId="my-journey"
          activeSection={activeSection}
          nextSection={nextSection}
        >
          <section id="my-journey">
            <FuturisticJourney />
          </section>
        </TransitionWrapper>

        <TransitionWrapper 
          sectionId="contact-me"
          activeSection={activeSection}
          nextSection={nextSection}
        >
          <section id="contact-me">
            <TerminalContact />
          </section>
        </TransitionWrapper>
      </motion.div>
    </PageWrapper>
  );
};