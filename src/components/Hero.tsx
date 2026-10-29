import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowDownRight, Terminal, Github, Linkedin, Instagram, Sparkles, MessageSquare, FileText, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { MagneticButton } from './MagneticButton';
import { transitionManager } from '../utils/transitionManager';
import { sound } from '../utils/audio';

export const Hero: React.FC = () => {
  const scrollTo = (selector: string, label: string = 'SECTION') => {
    transitionManager.navigate(selector, label);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Ambience Radial Beam */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[var(--color-pink)]/08 via-[var(--color-turquoise)]/06 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Top Telemetry / Status Line */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--text-secondary)] pb-6 border-b border-[var(--border-subtle)]"
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-pink)] animate-ping" />
          <span className="text-[var(--text-primary)] font-semibold tracking-wider">SHUBH SRIVASTAVA</span>
          <span className="text-[var(--color-turquoise)] font-medium">// BTECH COMPUTER SCIENCE</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-[var(--color-turquoise)]">
            <Terminal size={13} /> PUNE, INDIA
          </span>
          <span className="text-[var(--border-subtle)]">|</span>
          <span className="text-[var(--text-secondary)]">NEWTON SCHOOL OF TECHNOLOGY</span>
        </div>
      </motion.div>

      {/* Main Grid: Editorial Typography Left, Interactive 3D WebGL Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-8">
        {/* Left Column: Oversized Editorial Typography */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center space-y-6 z-10"
        >
          {/* Eyebrow badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] w-fit shadow-sm">
            <Sparkles size={13} className="text-[var(--color-pink)]" />
            <span className="font-mono text-xs text-[var(--badge-text)] tracking-wider uppercase font-semibold">
              Aspiring Software Engineer & Builder
            </span>
          </motion.div>

          {/* Headline with dramatic scale and tight leading */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.98] text-[var(--text-primary)]"
          >
            CURIOUS MIND.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-pink)] via-[var(--color-turquoise)] to-[var(--color-blue)]">
              BUILDING WHAT'S NEXT.
            </span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base sm:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed"
          >
            I'm <strong className="text-[var(--text-primary)] font-semibold">Shubh</strong> — a Computer Science student at{' '}
            <span className="text-[var(--color-turquoise)] font-medium">Newton School of Technology</span>, exploring software engineering, AI, and turning ideas into clean, functional digital products.
          </motion.p>

          {/* Action CTAs with Magnetic Buttons */}
          <motion.div variants={itemVariants} className="pt-2 flex flex-wrap items-center gap-3.5">
            {/* Primary CTA (Magnetic) */}
            <MagneticButton>
              <button
                onClick={() => scrollTo('#projects', 'PROJECTS')}
                onMouseEnter={() => sound.hover()}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 bg-[var(--color-pink)] hover:opacity-95 text-white font-mono text-xs uppercase tracking-wider font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(234,82,111,0.35)] hover:shadow-[0_0_30px_rgba(234,82,111,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-turquoise)]"
              >
                <span>Explore Case Studies</span>
                <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
            </MagneticButton>

            {/* Secondary CTA (Magnetic) */}
            <MagneticButton>
              <button
                onClick={() => scrollTo('#contact', 'CONTACT')}
                onMouseEnter={() => sound.hover()}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--color-turquoise)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-wider font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-turquoise)]"
              >
                <MessageSquare size={14} className="text-[var(--color-turquoise)]" />
                <span>Start Conversation</span>
              </button>
            </MagneticButton>

            {/* View Resume Shortcut */}
            <button
              onClick={() => scrollTo('#resume', 'RESUME')}
              onMouseEnter={() => sound.hover()}
              className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--color-turquoise)] transition-colors"
            >
              <FileText size={13} />
              <span>Resume / CV →</span>
            </button>
          </motion.div>

          {/* Social Links Bar */}
          <motion.div variants={itemVariants} className="pt-2 flex items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
            <span className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider">Networks //</span>
            
            <a
              href={PERSONAL_INFO.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.hover()}
              onClick={() => sound.click()}
              className="flex items-center gap-1.5 hover:text-[var(--color-pink)] transition-colors p-1"
              aria-label="GitHub Profile (opens in new tab)"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>

            <a
              href={PERSONAL_INFO.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.hover()}
              onClick={() => sound.click()}
              className="flex items-center gap-1.5 hover:text-[var(--color-turquoise)] transition-colors p-1"
              aria-label="LinkedIn Profile (opens in new tab)"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>

            <a
              href={PERSONAL_INFO.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.hover()}
              onClick={() => sound.click()}
              className="flex items-center gap-1.5 hover:text-[var(--color-blue)] transition-colors p-1"
              aria-label="Instagram Profile (opens in new tab)"
            >
              <Instagram size={14} />
              <span>Instagram</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Custom Three.js 3D WebGL Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative w-full flex items-center justify-center"
        >
          <ThreeHeroCanvas />
        </motion.div>
      </div>

      {/* Bottom Telemetry Bar & Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]"
      >
        <div className="flex items-center gap-4">
          <span className="text-[var(--color-turquoise)]">STATUS: 3D WEBGL ENGINE ACTIVE</span>
          <span className="hidden md:inline text-[var(--border-subtle)]">|</span>
          <span className="hidden md:inline">THREE.JS PBR SHADERS</span>
        </div>

        <button
          onClick={() => scrollTo('#about', 'ABOUT')}
          onMouseEnter={() => sound.hover()}
          className="group flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--color-pink)] transition-colors"
          aria-label="Scroll down to About section"
        >
          <span className="tracking-widest uppercase text-[11px]">SCROLL TO DISCOVER</span>
          <ChevronDown size={14} className="animate-bounce text-[var(--color-pink)]" />
        </button>
      </motion.div>
    </section>
  );
};
