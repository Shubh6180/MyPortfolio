import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Sparkles } from 'lucide-react';
import { SKILLS } from '../data/portfolioData';
import { Skill, SkillStage, SkillCategory } from '../types';
import { SpotlightCard } from './SpotlightCard';
import { sound } from '../utils/audio';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('All');
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS[0]);

  const categories: SkillCategory[] = ['All', 'Languages', 'Web & Frontend', 'Core CS & AI', 'Developer Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.category === selectedCategory);

  const getStageColor = (stage: SkillStage) => {
    switch (stage) {
      case 'Building With':
        return {
          badge: 'bg-[var(--color-pink)]/15 text-[var(--color-pink)] border-[var(--color-pink)]/30',
          dot: 'bg-[var(--color-pink)]',
        };
      case 'Exploring & Learning':
        return {
          badge: 'bg-[var(--color-turquoise)]/15 text-[var(--color-turquoise)] border-[var(--color-turquoise)]/30',
          dot: 'bg-[var(--color-turquoise)]',
        };
      case 'Foundational':
        return {
          badge: 'bg-[var(--color-blue)]/15 text-[var(--color-blue)] border-[var(--color-blue)]/30',
          dot: 'bg-[var(--color-blue)]',
        };
    }
  };

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-4"
      >
        <span className="font-mono text-sm text-[var(--color-pink)] font-bold">03 //</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
          TECHNICAL STACK & LEARNING MAP
        </h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-[var(--color-turquoise)]/40 via-[var(--border-subtle)] to-transparent" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-sans text-base text-[var(--text-secondary)] max-w-3xl mb-8"
      >
        An honest, transparent view of the technologies I am actively writing code with, exploring in coursework, and cultivating for future software engineering. Categorized by authentic application stage without fabricated proficiency percentages.
      </motion.p>

      {/* Stage Legend Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center gap-4 p-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl mb-8 text-xs font-mono shadow-sm"
      >
        <span className="text-[var(--text-muted)] uppercase tracking-wider">Stages //</span>
        
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-pink)]" />
          <span className="text-[var(--text-primary)] font-medium">Building With</span>
          <span className="text-[var(--text-muted)] text-[10px]">(Actively used in projects)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-turquoise)]" />
          <span className="text-[var(--text-primary)] font-medium">Exploring & Learning</span>
          <span className="text-[var(--text-muted)] text-[10px]">(Coursework & hands-on study)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-blue)]" />
          <span className="text-[var(--text-primary)] font-medium">Foundational</span>
          <span className="text-[var(--text-muted)] text-[10px]">(Bedrock logic & principles)</span>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.switch();
              setSelectedCategory(cat);
            }}
            onMouseEnter={() => sound.hover()}
            className={`px-3.5 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
              selectedCategory === cat
                ? 'bg-[var(--color-turquoise)] text-white font-bold shadow-md'
                : 'bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Grid & Detail Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Skill Tiles with Spotlight */}
        <motion.div layout className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill.id === skill.id;
              const stageStyle = getStageColor(skill.stage);
              return (
                <motion.div
                  layout
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                >
                  <SpotlightCard
                    spotlightColor="rgba(35, 181, 211, 0.16)"
                    onClick={() => {
                      sound.click();
                      setSelectedSkill(skill);
                    }}
                    onMouseEnter={() => sound.hover()}
                    className={`p-4 rounded-xl bg-[var(--bg-surface)] border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-[var(--color-pink)] shadow-[0_0_20px_rgba(234,82,111,0.2)] bg-[var(--bg-surface-elevated)]'
                        : 'border-[var(--border-subtle)] hover:border-[var(--color-turquoise)]/50 hover:bg-[var(--bg-surface-elevated)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-display font-bold text-base text-[var(--text-primary)]">
                        {skill.name}
                      </h4>
                      <span className={`inline-flex items-center gap-1.5 font-mono text-[9px] px-2 py-0.5 rounded-full border ${stageStyle.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${stageStyle.dot}`} />
                        {skill.stage}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                      {skill.relevance}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-[var(--color-turquoise)]">
                      <span>{skill.category}</span>
                      <span className="text-[var(--text-muted)] flex items-center gap-1 font-medium">
                        {isSelected ? 'ACTIVE SELECTION' : 'INSPECT DETAILS →'}
                      </span>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Right Column: Deep-Dive Inspection Telemetry Card */}
        <div className="lg:col-span-5 sticky top-28">
          <SpotlightCard
            spotlightColor="rgba(234, 82, 111, 0.14)"
            className="p-6 sm:p-7 bg-[var(--bg-surface)] border border-[var(--border-medium)] rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[var(--color-pink)]" />
                <span className="font-mono text-xs text-[var(--color-turquoise)] tracking-wider uppercase font-semibold">
                  TECHNOLOGY DOSSIER
                </span>
              </div>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">
                NODE // {selectedSkill.id.toUpperCase()}
              </span>
            </div>

            {/* Skill Name & Stage */}
            <div className="mb-4">
              <h3 className="font-display font-extrabold text-2xl text-[var(--text-primary)]">
                {selectedSkill.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-0.5 rounded-full border ${getStageColor(selectedSkill.stage).badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${getStageColor(selectedSkill.stage).dot}`} />
                  {selectedSkill.stage}
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)]">•</span>
                <span className="font-mono text-xs text-[var(--color-blue)]">{selectedSkill.category}</span>
              </div>
            </div>

            {/* In-Depth Explanation */}
            <div className="space-y-4 text-xs font-sans">
              <div className="p-3.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded-xl">
                <span className="font-mono text-[10px] text-[var(--color-pink)] uppercase tracking-wider block mb-1 font-bold">
                  Relevance to My Engineering Journey
                </span>
                <p className="text-[var(--text-primary)] leading-relaxed">
                  {selectedSkill.relevance}
                </p>
              </div>

              <div className="p-3.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded-xl">
                <span className="font-mono text-[10px] text-[var(--color-turquoise)] uppercase tracking-wider block mb-1 font-bold">
                  How I Apply It In Practice
                </span>
                <p className="text-[var(--text-primary)] leading-relaxed">
                  {selectedSkill.application}
                </p>
              </div>

              {/* Integrity Metric */}
              <div className="p-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl flex items-start gap-2.5 text-[11px] font-mono text-[var(--text-secondary)]">
                <Sparkles size={13} className="text-[var(--color-turquoise)] flex-shrink-0 mt-0.5" />
                <span>
                  Honest metric: Learning through code execution, projects, and coursework. No arbitrarily assigned "95% mastery" badges.
                </span>
              </div>
            </div>

            {/* Telemetry Footer */}
            <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
              <span>STATUS: LEARNING & ADAPTING</span>
              <span className="text-[var(--color-pink)] font-semibold">VERIFIED INVENTORY</span>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
