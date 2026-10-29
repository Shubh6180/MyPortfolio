import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronRight, X, CheckCircle2, AlertCircle, Radio } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { HostlurPreview } from './project-previews/HostlurPreview';
import { UrbanPulsePreview } from './project-previews/UrbanPulsePreview';
import { PythonLabPreview } from './project-previews/PythonLabPreview';
import { GameDevPreview } from './project-previews/GameDevPreview';
import { SpotlightCard } from './SpotlightCard';
import { MagneticButton } from './MagneticButton';
import { sound } from '../utils/audio';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openStarDetail = (project: Project) => {
    sound.click();
    setSelectedProject(project);
  };

  const closeStarDetail = () => {
    sound.hover();
    setSelectedProject(null);
  };

  // Keyboard Escape listener and scroll lock for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const hostlur = PROJECTS.find((p) => p.id === 'hostlur') || PROJECTS[0];
  const urbanPulse = PROJECTS.find((p) => p.id === 'urbanpulse-ai') || PROJECTS[1];
  const pythonLab = PROJECTS.find((p) => p.id === 'python-experiments') || PROJECTS[2];
  const gameDev = PROJECTS.find((p) => p.id === 'foundational-game-dev') || PROJECTS[3];

  return (
    <section id="projects" className="relative pt-12 pb-24 sm:pt-16 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-4"
      >
        <span className="font-mono text-sm text-[var(--color-pink)] font-bold">02 //</span>
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-[var(--text-primary)] tracking-tight">
          CASE STUDY EXHIBITION
        </h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-[var(--color-turquoise)]/40 via-[var(--border-subtle)] to-transparent" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="font-sans text-base sm:text-lg text-[var(--text-secondary)] max-w-3xl mb-12 leading-relaxed"
      >
        An interactive gallery of systems, prototypes, and algorithmic experiments. Every project is documented with authentic early-career milestones, truthful qualitative learnings, and the{' '}
        <span className="text-[var(--color-turquoise)] font-semibold">STAR framework</span>.
      </motion.p>

      {/* CASE STUDY EXHIBITS */}
      <div className="space-y-16">
        {/* CASE STUDY 01: HOSTLUR */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <SpotlightCard
            spotlightColor="rgba(35, 181, 211, 0.14)"
            className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--color-turquoise)]/50 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-pink)]/15 border border-[var(--color-pink)]/30 text-[var(--color-pink)] font-bold">
                    EXHIBIT 01
                  </span>
                  <span className="text-[var(--color-turquoise)] font-mono text-[11px] uppercase tracking-wider font-semibold">
                    {hostlur.category}
                  </span>
                </div>

                <h3 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
                  {hostlur.title}
                </h3>
                <p className="font-sans text-sm text-[var(--color-turquoise)] font-medium">
                  {hostlur.tagline}
                </p>

                <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {hostlur.summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {hostlur.technologies.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-primary)] rounded-md font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <MagneticButton>
                    <button
                      onClick={() => openStarDetail(hostlur)}
                      data-cursor-label="INSPECT STAR"
                      className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-pink)] hover:opacity-95 text-white font-mono text-xs uppercase tracking-wider font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(234,82,111,0.3)]"
                    >
                      <span>Read STAR Breakdown</span>
                      <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </MagneticButton>

                  <a
                    href={hostlur.verifiedLinks?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    aria-label="View Hostlur on GitHub (opens in new tab)"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--color-turquoise)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-wider rounded-xl transition-colors font-medium"
                  >
                    <Github size={14} className="text-[var(--color-turquoise)]" />
                    <span>GitHub Profile</span>
                    <ExternalLink size={12} className="text-[var(--text-muted)]" />
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Hostlur Simulator */}
              <div className="lg:col-span-7" data-cursor-label="CLICK TICKETS">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-pink)]/10 via-[var(--color-turquoise)]/10 to-[var(--color-blue)]/10 rounded-2xl blur-lg opacity-75" />
                  <HostlurPreview />
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* CASE STUDY 02: URBANPULSE AI */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <SpotlightCard
            spotlightColor="rgba(39, 154, 241, 0.14)"
            className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--color-blue)]/50 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Interactive Telemetry Viewport */}
              <div className="lg:col-span-7 order-2 lg:order-1" data-cursor-label="INSPECT SCAN">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-turquoise)]/10 via-[var(--color-blue)]/10 to-[var(--color-pink)]/10 rounded-2xl blur-lg opacity-75" />
                  <UrbanPulsePreview />
                </div>
              </div>

              {/* Right Column: Architectural Narrative */}
              <div className="lg:col-span-5 order-1 lg:order-2 space-y-5">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-blue)]/15 border border-[var(--color-blue)]/30 text-[var(--color-blue)] font-bold">
                    EXHIBIT 02
                  </span>
                  <span className="text-[var(--color-turquoise)] font-mono text-[11px] uppercase tracking-wider font-semibold">
                    {urbanPulse.category}
                  </span>
                </div>

                <h3 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
                  {urbanPulse.title}
                </h3>
                <p className="font-sans text-sm text-[var(--color-blue)] font-medium">
                  {urbanPulse.tagline}
                </p>

                <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {urbanPulse.summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {urbanPulse.technologies.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-primary)] rounded-md font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <MagneticButton>
                    <button
                      onClick={() => openStarDetail(urbanPulse)}
                      data-cursor-label="INSPECT STAR"
                      className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-turquoise)] hover:opacity-95 text-white font-mono text-xs uppercase tracking-wider font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(35,181,211,0.3)]"
                    >
                      <span>Read System Blueprint</span>
                      <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </MagneticButton>

                  <a
                    href={urbanPulse.verifiedLinks?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    aria-label="View UrbanPulse AI on GitHub (opens in new tab)"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--color-blue)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-wider rounded-xl transition-colors font-medium"
                  >
                    <Radio size={14} className="text-[var(--color-blue)]" />
                    <span>System Repo</span>
                    <ExternalLink size={12} className="text-[var(--text-muted)]" />
                  </a>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* CASE STUDY 03 & 04: SPLIT ASYMMETRIC GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Python Algorithmic Lab */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard
              spotlightColor="rgba(234, 82, 111, 0.12)"
              className="h-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[var(--color-pink)] font-bold">EXHIBIT 03 //</span>
                  <span className="text-[10px] text-[var(--color-turquoise)] bg-[var(--color-turquoise)]/10 px-2 py-0.5 rounded-full font-semibold">
                    PYTHON LAB
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl text-[var(--text-primary)] tracking-tight">
                  {pythonLab.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {pythonLab.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {pythonLab.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-secondary)] rounded-md font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div data-cursor-label="RUN REPL">
                <PythonLabPreview />
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <button
                  onClick={() => openStarDetail(pythonLab)}
                  className="font-mono text-xs text-[var(--color-pink)] hover:underline flex items-center gap-1 font-semibold"
                >
                  Inspect Methodology →
                </button>
                <span className="font-mono text-[10px] text-[var(--text-muted)]">PYTHON 3.12 REPL</span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Foundational Game Development */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <SpotlightCard
              spotlightColor="rgba(35, 181, 211, 0.12)"
              className="h-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[var(--color-turquoise)] font-bold">EXHIBIT 04 //</span>
                  <span className="text-[10px] text-[var(--color-pink)] bg-[var(--color-pink)]/10 px-2 py-0.5 rounded-full font-semibold">
                    FOUNDATIONAL SYSTEM
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl text-[var(--text-primary)] tracking-tight">
                  {gameDev.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {gameDev.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {gameDev.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-secondary)] rounded-md font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div data-cursor-label="PLAY GAME">
                <GameDevPreview />
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <button
                  onClick={() => openStarDetail(gameDev)}
                  className="font-mono text-xs text-[var(--color-turquoise)] hover:underline flex items-center gap-1 font-semibold"
                >
                  Inspect Methodology →
                </button>
                <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">PLAYABLE 60 FPS</span>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>

      {/* STAR Methodology Modal / Drawer with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeStarDetail}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--bg-primary)]/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 25, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 240 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--bg-surface)] border border-[var(--border-medium)] rounded-2xl p-6 sm:p-8 shadow-2xl text-[var(--text-primary)]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-[var(--border-subtle)] mb-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-pink)] mb-1">
                    <span>PROJECT {selectedProject.number}</span>
                    <span>//</span>
                    <span className="text-[var(--color-turquoise)] font-semibold">{selectedProject.category}</span>
                  </div>
                  <h3 id="modal-title" className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)]">
                    {selectedProject.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                    {selectedProject.tagline}
                  </p>
                </div>

                <button
                  onClick={closeStarDetail}
                  className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--color-pink)] transition-colors"
                  aria-label="Close project details (or press Escape)"
                >
                  <X size={18} />
                </button>
              </div>

              {/* STAR Breakdown Grid */}
              <div className="space-y-5">
                {/* Situation */}
                <div className="p-4 bg-[var(--bg-surface-elevated)] border-l-4 border-[var(--color-pink)] rounded-r-xl">
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-pink)] font-bold block mb-1">
                    [S] SITUATION — Problem Context
                  </span>
                  <p className="font-sans text-sm text-[var(--text-primary)] leading-relaxed">
                    {selectedProject.star.situation}
                  </p>
                </div>

                {/* Task */}
                <div className="p-4 bg-[var(--bg-surface-elevated)] border-l-4 border-[var(--color-turquoise)] rounded-r-xl">
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-turquoise)] font-bold block mb-1">
                    [T] TASK — Objective & Scope
                  </span>
                  <p className="font-sans text-sm text-[var(--text-primary)] leading-relaxed">
                    {selectedProject.star.task}
                  </p>
                </div>

                {/* Action */}
                <div className="p-4 bg-[var(--bg-surface-elevated)] border-l-4 border-[var(--color-blue)] rounded-r-xl">
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-blue)] font-bold block mb-1">
                    [A] ACTION — Implementation & Contribution
                  </span>
                  <p className="font-sans text-sm text-[var(--text-primary)] leading-relaxed">
                    {selectedProject.star.action}
                  </p>
                </div>

                {/* Result */}
                <div className="p-4 bg-[var(--bg-surface-elevated)] border-l-4 border-emerald-500 rounded-r-xl">
                  <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold block mb-1">
                    [R] RESULT — Qualitative Learnings & Validation
                  </span>
                  <p className="font-sans text-sm text-[var(--text-primary)] leading-relaxed">
                    {selectedProject.star.result}
                  </p>
                </div>

                {/* Key Learnings List */}
                <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl">
                  <span className="font-mono text-xs text-[var(--color-turquoise)] uppercase tracking-wider block mb-2 font-semibold">
                    Key Technical Takeaways
                  </span>
                  <ul className="space-y-1.5 text-xs font-sans text-[var(--text-secondary)]">
                    {selectedProject.keyLearnings.map((learning, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-[var(--color-pink)] flex-shrink-0 mt-0.5" />
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Verification & Integrity Footer Note */}
                <div className="flex items-center gap-2 p-3 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded-xl text-[11px] font-mono text-[var(--text-muted)]">
                  <AlertCircle size={14} className="text-[var(--color-turquoise)] flex-shrink-0" />
                  <span>
                    INTEGRITY NOTE: Documented with verified early-career status. No fabricated metrics, testimonials, or commercial claims.
                  </span>
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-end">
                <button
                  onClick={closeStarDetail}
                  className="px-5 py-2 bg-[var(--color-turquoise)] hover:opacity-95 text-white font-mono text-xs uppercase font-bold rounded-lg transition-colors"
                >
                  Done Reading
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
