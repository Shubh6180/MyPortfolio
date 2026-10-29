import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Terminal, Cpu, Compass } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const StoryJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive device check for optimal initial scale
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // =========================================================================
  // APPLE-STYLE CONTINUOUS SCROLL-DRIVEN SHRINK ARCHITECTURE
  //
  // 1. Initial State (0.00):
  //    - Headline starts GIGANTIC (scale: 2.8x - 3.2x), extending beyond screen edges.
  //    - Perfectly centered vertically (50vh) & horizontally (50vw).
  //    - Stays well below the fixed navbar with ample clearance.
  //
  // 2. Scroll Down (0.00 -> 0.65):
  //    - Headline continuously and proportionally SHRINKS linked to scroll progress.
  //    - Remains centered in viewport during scaling.
  //    - Once it approaches normal size (0.40 -> 0.65), it smoothly eases into
  //      header position (-105px on desktop, -70px on mobile).
  //    - If user stops scrolling: stays at current size.
  //    - If user scrolls up: smoothly grows back to oversized state.
  //
  // 3. Normal-Sized Heading & Layout (0.65 -> 0.85):
  //    - Headline locks at scale 1.0 (normal readable size).
  //    - Eyebrow pill, supporting paragraph, and 3 pillar cards settle into place.
  //
  // 4. Release into Next Section (0.85 -> 1.00):
  //    - Brief reading buffer, then sticky container smoothly unpins.
  //    - #projects enters immediately with ZERO blank void.
  // =========================================================================

  const initialScale = isMobile ? 2.2 : 2.8;
  const headerTargetY = isMobile ? -95 : -135;
  const eyebrowTargetY = isMobile ? -155 : -215;
  const paragraphTargetY = isMobile ? -10 : -25;
  const cardsTargetY = isMobile ? 125 : 145;

  // 1. Scale Transformation: starts oversized (> viewport), shrinks continuously to 1.0
  const headlineScale = useTransform(
    scrollYProgress,
    [0.0, 0.60, 1.0],
    [initialScale, 1.0, 1.0]
  );

  // 2. Y Position: strictly centered (0) while oversized, eases up smoothly as it reaches normal size
  const headlineY = useTransform(
    scrollYProgress,
    [0.0, 0.32, 0.60, 1.0],
    [0, 0, headerTargetY, headerTargetY]
  );

  // 3. Eyebrow Pill: fades in cleanly above the normal-sized heading
  const eyebrowOpacity = useTransform(
    scrollYProgress,
    [0.42, 0.62, 1.0],
    [0, 1, 1]
  );
  const eyebrowY = useTransform(
    scrollYProgress,
    [0.42, 0.62, 1.0],
    [-170, eyebrowTargetY, eyebrowTargetY]
  );

  // 4. Supporting Paragraph: fades in directly underneath the normal heading
  const paragraphOpacity = useTransform(
    scrollYProgress,
    [0.50, 0.68, 1.0],
    [0, 1, 1]
  );
  const paragraphY = useTransform(
    scrollYProgress,
    [0.50, 0.68, 1.0],
    [10, paragraphTargetY, paragraphTargetY]
  );

  // 5. 3 Pillar Spotlight Cards: slide up smoothly in lower half of viewport
  const cardsOpacity = useTransform(
    scrollYProgress,
    [0.58, 0.76, 1.0],
    [0, 1, 1]
  );
  const cardsY = useTransform(
    scrollYProgress,
    [0.58, 0.76, 1.0],
    [210, cardsTargetY, cardsTargetY]
  );
  const cardsPointerEvents = useTransform(
    scrollYProgress,
    (v) => (v > 0.65 ? 'auto' : 'none')
  );

  // 6. Micro Scroll Hint: fades out as user begins scrolling
  const scrollHintOpacity = useTransform(
    scrollYProgress,
    [0, 0.08],
    [1, 0]
  );

  return (
    <section
      id="curiosity"
      ref={containerRef}
      className="relative h-[190vh] bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors"
    >
      {/* Sticky Pinned Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Ambient Radial Glow */}
        <div className="absolute inset-0 bg-radial from-[var(--color-pink)]/06 via-transparent to-transparent pointer-events-none" />

        {/* 
          1. DEDICATED ANCHOR FOR OVERSIZED SCALING HEADLINE
          Anchored to the exact center of the viewport (50vh / 50vw).
          Scales continuously from initialScale down to 1.0, then glides up to header position.
        */}
        <div className="absolute inset-x-0 top-1/2 flex justify-center pointer-events-none z-10 px-4">
          <motion.div
            style={{
              scale: headlineScale,
              y: headlineY,
              transformOrigin: 'center center',
            }}
            className="w-full max-w-4xl flex flex-col items-center justify-center will-change-transform select-none"
          >
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-center w-full">
              <span className="block text-[var(--text-primary)] transition-colors">
                EVERYTHING BEGINS WITH
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-pink)] via-[var(--color-turquoise)] to-[var(--color-blue)]">
                RAW CURIOSITY.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* 
          2. EYEBROW PILL
          Fades in and settles cleanly above the headline.
        */}
        <div className="absolute inset-x-0 top-1/2 flex justify-center pointer-events-none z-20 px-4">
          <motion.div
            style={{
              opacity: eyebrowOpacity,
              y: eyebrowY,
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--bg-surface-elevated)]/90 border border-[var(--border-accent)] rounded-full font-mono text-xs text-[var(--color-turquoise)] shadow-lg backdrop-blur-md whitespace-nowrap"
          >
            <Sparkles size={13} className="text-[var(--color-pink)]" />
            <span className="tracking-widest uppercase font-bold">STAGE 01 // RAW CURIOSITY</span>
          </motion.div>
        </div>

        {/* 
          3. SUPPORTING EDITORIAL PARAGRAPH
          Fades in directly below the normal-sized headline with generous breathing room.
        */}
        <div className="absolute inset-x-0 top-1/2 flex justify-center pointer-events-none z-20 px-4">
          <motion.div
            style={{
              opacity: paragraphOpacity,
              y: paragraphY,
            }}
            className="w-full max-w-2xl text-center"
          >
            <p className="font-sans text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] leading-relaxed">
              Before code, frameworks, or architecture, there is only the persistent urge to look inside the machine and understand how things work.
            </p>
          </motion.div>
        </div>

        {/* 
          4. THREE SPOTLIGHT CARDS
          Slide up smoothly into the lower quadrant of the viewport.
        */}
        <div className="absolute inset-x-0 top-1/2 flex justify-center z-20 px-4">
          <motion.div
            style={{
              opacity: cardsOpacity,
              y: cardsY,
              pointerEvents: cardsPointerEvents,
            }}
            className="w-full max-w-5xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-left">
              {/* Pillar 1 */}
              <SpotlightCard
                spotlightColor="rgba(217, 67, 100, 0.14)"
                className="p-4 sm:p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-pink)] mb-2 font-bold">
                  <Terminal size={14} />
                  <span>01 // DECONSTRUCTING</span>
                </div>
                <h4 className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)] mb-1">
                  Looking Inside the Box
                </h4>
                <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
                  Peeling back framework abstractions to understand runtime memory, compilers, event queues, and underlying network protocols.
                </p>
              </SpotlightCard>

              {/* Pillar 2 */}
              <SpotlightCard
                spotlightColor="rgba(19, 141, 163, 0.14)"
                className="p-4 sm:p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-turquoise)] mb-2 font-bold">
                  <Compass size={14} />
                  <span>02 // EXPERIMENTING</span>
                </div>
                <h4 className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)] mb-1">
                  Fearless Prototyping
                </h4>
                <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
                  Building without being afraid to break things in sandboxes. Gaining true engineering resilience by diagnosing edge cases.
                </p>
              </SpotlightCard>

              {/* Pillar 3 */}
              <SpotlightCard
                spotlightColor="rgba(39, 122, 193, 0.14)"
                className="p-4 sm:p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-blue)] mb-2 font-bold">
                  <Cpu size={14} />
                  <span>03 // SYNTHESIS</span>
                </div>
                <h4 className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)] mb-1">
                  Living Digital Products
                </h4>
                <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
                  Turning abstract computational logic into reliable, human-centered applications and intelligent urban platforms.
                </p>
              </SpotlightCard>
            </div>
          </motion.div>
        </div>

        {/* Micro Scroll Hint */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 font-mono text-[10px] text-[var(--text-muted)] bg-[var(--bg-surface)]/90 px-4 py-1.5 rounded-full border border-[var(--border-subtle)] backdrop-blur-md pointer-events-none shadow-md z-30"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-pink)] animate-ping" />
          <span>SCROLL TO SCALE CONTINUUM</span>
        </motion.div>
      </div>
    </section>
  );
};
