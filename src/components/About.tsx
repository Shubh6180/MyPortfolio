import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, BookOpen, Sparkles, Cpu, Layers, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { sound } from '../utils/audio';

export const About: React.FC = () => {
  const [activeDossierTab, setActiveDossierTab] = useState<'profile' | 'mindset' | 'focus'>('profile');

  const handleTabChange = (tab: 'profile' | 'mindset' | 'focus') => {
    sound.switch();
    setActiveDossierTab(tab);
  };

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with Monospace Index */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="font-mono text-sm text-[var(--color-pink)] font-bold">01 //</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
          ABOUT & ORIGIN STORY
        </h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-[var(--color-turquoise)]/40 via-[var(--border-subtle)] to-transparent" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Editorial Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--badge-bg)] border border-[var(--badge-border)] rounded-full text-xs font-mono text-[var(--badge-text)] font-semibold shadow-sm">
            <Compass size={13} className="text-[var(--color-pink)]" />
            <span>THE CURIOUS BUILDER ETHOS</span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)] leading-snug tracking-tight">
            Turning abstract curiosity into{' '}
            <span className="text-[var(--color-turquoise)]">functional software</span>, one experiment at a time.
          </h3>

          <div className="space-y-4 font-sans text-base text-[var(--text-secondary)] leading-relaxed">
            <p>
              I'm <strong className="text-[var(--text-primary)] font-semibold">Shubh Srivastava</strong>, a BTech student at{' '}
              <span className="text-[var(--color-turquoise)] font-medium">Newton School of Technology</span> in Pune.
            </p>

            <p>
              My interest in technology started early. Through WhiteHat Jr's Mobile App Development and Game Development courses, I got my first taste of what it felt like to control logic, animate sprites, and build applications with code. That early spark wasn't just about playing games—it was about understanding the invisible systems running underneath them.
            </p>

            <p>
              That curiosity has since grown into a much wider exploration of software engineering, AI, machine learning, and the systems that power modern digital products. Whether it's drafting conceptual sensor pipelines like UrbanPulse AI or prototyping hostel utility tools like Hostlur, I find joy in moving from problem discovery to interactive implementation.
            </p>

            <p>
              I am early in my engineering journey, which is exactly why every week is an adventure. Every project gives me something new to deconstruct, an edge case to debug, and another compelling reason to keep building.
            </p>
          </div>

          {/* Philosophy Spotlight Card */}
          <SpotlightCard
            spotlightColor="rgba(234, 82, 111, 0.14)"
            className="p-6 bg-[var(--bg-surface)] border border-[var(--border-accent)] rounded-2xl mt-6 shadow-xl"
          >
            <div className="flex items-start gap-4">
              <Sparkles size={20} className="text-[var(--color-pink)] flex-shrink-0 mt-1" />
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-turquoise)] block mb-1 font-semibold">
                  Guiding Engineering Philosophy
                </span>
                <p className="font-sans text-sm sm:text-base italic text-[var(--text-primary)] leading-relaxed">
                  "{PERSONAL_INFO.philosophy}"
                </p>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Right Column: Interactive Technical Dossier */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="lg:col-span-5"
        >
          <SpotlightCard
            spotlightColor="rgba(35, 181, 211, 0.14)"
            className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-7 shadow-2xl"
          >
            {/* Dossier Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-5">
              <div className="flex items-center gap-2">
                <Terminal size={15} className="text-[var(--color-turquoise)]" />
                <span className="font-mono text-xs text-[var(--text-primary)] font-semibold tracking-wider">
                  SYSTEM_DOSSIER // SHUBH.DAT
                </span>
              </div>
              <span className="font-mono text-[10px] text-[var(--color-pink)] bg-[var(--color-pink)]/10 px-2.5 py-0.5 rounded-full border border-[var(--color-pink)]/25 font-semibold">
                VERIFIED_STUDENT
              </span>
            </div>

            {/* Interactive Dossier Nav Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded-xl mb-5">
              <button
                onClick={() => handleTabChange('profile')}
                onMouseEnter={() => sound.hover()}
                className={`py-1.5 font-mono text-[11px] uppercase tracking-wider rounded-lg transition-colors font-semibold ${
                  activeDossierTab === 'profile'
                    ? 'bg-[var(--color-turquoise)] text-white shadow'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => handleTabChange('focus')}
                onMouseEnter={() => sound.hover()}
                className={`py-1.5 font-mono text-[11px] uppercase tracking-wider rounded-lg transition-colors font-semibold ${
                  activeDossierTab === 'focus'
                    ? 'bg-[var(--color-pink)] text-white shadow'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Focus
              </button>
              <button
                onClick={() => handleTabChange('mindset')}
                onMouseEnter={() => sound.hover()}
                className={`py-1.5 font-mono text-[11px] uppercase tracking-wider rounded-lg transition-colors font-semibold ${
                  activeDossierTab === 'mindset'
                    ? 'bg-[var(--color-blue)] text-white shadow'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Mindset
              </button>
            </div>

            {/* Tab 1: Profile */}
            {activeDossierTab === 'profile' && (
              <div className="space-y-4">
                <div className="p-3.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-turquoise)] mb-1 font-semibold">
                    <BookOpen size={13} />
                    <span>EDUCATION</span>
                  </div>
                  <p className="font-display text-sm font-bold text-[var(--text-primary)]">
                    {PERSONAL_INFO.education.degree}
                  </p>
                  <p className="font-sans text-xs text-[var(--text-secondary)] mt-0.5">
                    {PERSONAL_INFO.education.institution} • {PERSONAL_INFO.education.location}
                  </p>
                  <span className="inline-block mt-2 font-mono text-[10px] text-[var(--color-turquoise)] bg-[var(--color-turquoise)]/10 px-2 py-0.5 rounded-full font-medium">
                    {PERSONAL_INFO.education.status}
                  </span>
                </div>

                <div className="p-3.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-pink)] mb-1 font-semibold">
                    <Layers size={13} />
                    <span>EARLY CERTIFICATIONS</span>
                  </div>
                  <ul className="space-y-1.5 text-xs font-sans text-[var(--text-secondary)]">
                    {PERSONAL_INFO.earlyBackground.map((cert) => (
                      <li key={cert} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-pink)]" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Focus */}
            {activeDossierTab === 'focus' && (
              <div className="space-y-3">
                <div className="p-3.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded-xl">
                  <span className="font-mono text-xs text-[var(--color-pink)] block mb-1.5 font-bold">// ACTIVE EXPLORATION</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Python Scripting', 'React Frontends', 'Java Fundamentals', 'AI & ML Concepts', 'Game Mechanics', 'Competitive Problem Solving'].map((item) => (
                      <span key={item} className="px-2.5 py-0.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-md text-[11px] font-mono text-[var(--text-primary)] font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded-xl">
                  <span className="font-mono text-xs text-[var(--color-turquoise)] block mb-1 font-bold">// POSITIONING NOTE</span>
                  <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
                    Honest early-career builder. Continuously studying how systems work behind the scenes and transforming curiosity into working prototypes.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Mindset */}
            {activeDossierTab === 'mindset' && (
              <div className="space-y-3">
                <div className="p-3.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-blue)] font-bold">
                    <Cpu size={13} />
                    <span>CORE PILLARS</span>
                  </div>
                  <div className="space-y-2 text-xs font-sans text-[var(--text-secondary)]">
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[var(--color-pink)] font-bold">01.</span>
                      <span><strong className="text-[var(--text-primary)]">Build to Understand:</strong> Theory clicks fastest when wired into code.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[var(--color-turquoise)] font-bold">02.</span>
                      <span><strong className="text-[var(--text-primary)]">Experiment Fearlessly:</strong> Break things in sandbox to learn edge cases.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[var(--color-blue)] font-bold">03.</span>
                      <span><strong className="text-[var(--text-primary)]">Respect the Craft:</strong> Care about interface clarity, structure, and design.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Dossier Footer Stats */}
            <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
              <span>STATUS: ADAPTIVE LEARNER</span>
              <span className="text-[var(--color-turquoise)] font-semibold">PING: 100% DISCOVERY</span>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};
