import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { StoryJourney } from './components/StoryJourney';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Journey } from './components/Journey';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollTelemetry } from './components/ScrollTelemetry';
import { EntranceLoader } from './components/EntranceLoader';
import { ChromaticDepthTransition } from './components/ChromaticDepthTransition';
import { GlobalSpatialParticles } from './components/GlobalSpatialParticles';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Initialize Lenis Momentum Smooth Scroll (Apple/Awwwards grade)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    (window as any).__lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Section scroll-spy
  useEffect(() => {
    const sections = ['hero', 'about', 'curiosity', 'projects', 'skills', 'journey', 'resume', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--color-pink)] selection:text-white transition-colors duration-300 overflow-x-clip">
      {/* Persistent Full-Page 3D Spatial Celestial Particle Constellation */}
      <GlobalSpatialParticles />

      {/* Background Technical Pattern Layers */}
      <div className="fixed inset-0 bg-tech-dots pointer-events-none opacity-30 z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-[var(--bg-primary)]/40 via-transparent to-[var(--bg-primary)]/80 pointer-events-none z-0" />

      {/* Brief Elegant Entrance Loader */}
      <EntranceLoader />

      {/* Chromatic Depth Navigation Transition System */}
      <ChromaticDepthTransition />

      {/* Top Precision Scroll Progress Telemetry */}
      <ScrollTelemetry activeSection={activeSection} />

      {/* Bespoke Interactive Desktop Cursor */}
      <CustomCursor />

      {/* Fixed Technical Glassmorphism Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <StoryJourney />
        <Projects />
        <Skills />
        <Journey />
        <Resume />
        <Contact />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
};

export default App;
