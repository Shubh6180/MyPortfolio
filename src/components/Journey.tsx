import React from 'react';
import { motion } from 'framer-motion';
import { Milestone, Sparkles, BookOpen, Trophy, Compass } from 'lucide-react';
import { JOURNEY_MILESTONES } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { sound } from '../utils/audio';

export const Journey: React.FC = () => {
  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'early-spark':
        return <Sparkles size={16} className="text-[var(--color-pink)]" />;
      case 'education':
        return <BookOpen size={16} className="text-[var(--color-turquoise)]" />;
      case 'hackathon':
        return <Trophy size={16} className="text-[var(--color-blue)]" />;
      case 'expansion':
        return <Compass size={16} className="text-[var(--color-pink)]" />;
      default:
        return <Milestone size={16} className="text-[var(--color-turquoise)]" />;
    }
  };

  return (
    <section id="journey" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-4"
      >
        <span className="font-mono text-sm text-[var(--color-pink)] font-bold">04 //</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
          CHRONOLOGICAL JOURNEY
        </h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-[var(--color-turquoise)]/40 via-[var(--border-subtle)] to-transparent" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-sans text-base text-[var(--text-secondary)] max-w-3xl mb-14"
      >
        From my first game logic certifications at WhiteHat Jr to pursuing a BTech in Computer Science at Newton School of Technology. A trajectory grounded in persistent experimentation and hands-on building.
      </motion.p>

      {/* Vertical Animated Timeline */}
      <div className="relative border-l-2 border-[var(--border-subtle)] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {/* Glowing Progress Accent along line */}
        <div className="absolute top-0 bottom-0 left-[-2px] w-[2px] bg-gradient-to-b from-[var(--color-pink)] via-[var(--color-turquoise)] to-transparent pointer-events-none opacity-60" />

        {JOURNEY_MILESTONES.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            onMouseEnter={() => sound.hover()}
            className="relative group transition-all duration-300"
          >
            {/* Pulsing Timeline Node */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-8 h-8 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--color-turquoise)] flex items-center justify-center shadow-[0_0_15px_rgba(35,181,211,0.35)] group-hover:border-[var(--color-pink)] group-hover:scale-110 transition-all">
              {getMilestoneIcon(item.type)}
            </div>

            {/* Timeline Content Card with 3D Spotlight */}
            <SpotlightCard
              spotlightColor="rgba(35, 181, 211, 0.14)"
              className="p-6 sm:p-7 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl group-hover:border-[var(--color-turquoise)]/50 transition-colors shadow-xl"
            >
              {/* Top Meta Line */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--color-pink)] font-bold">STAGE 0{index + 1}</span>
                  <span className="text-[var(--text-muted)]">//</span>
                  <span className="text-[var(--color-turquoise)] tracking-wider uppercase font-semibold">{item.phaseLabel}</span>
                </div>
                <span className="px-2.5 py-0.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] rounded-full text-[10px] font-medium">
                  {item.era}
                </span>
              </div>

              {/* Title & Institution */}
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[var(--text-primary)] tracking-tight">
                {item.title}
              </h3>
              <p className="font-mono text-xs text-[var(--color-blue)] mt-0.5 mb-3 font-semibold">
                {item.institutionOrContext}
              </p>

              {/* Narrative */}
              <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Key Takeaway Callout */}
              <div className="p-3.5 bg-[var(--bg-surface-elevated)] border-l-2 border-[var(--color-pink)] rounded-r-xl text-xs font-sans text-[var(--text-primary)] italic mb-4">
                <span className="font-mono text-[10px] text-[var(--color-pink)] not-italic font-bold block uppercase tracking-wider mb-0.5">
                  Core Insight & Takeaway:
                </span>
                "{item.keyTakeaway}"
              </div>

              {/* Associated Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-mono text-[10px] rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
