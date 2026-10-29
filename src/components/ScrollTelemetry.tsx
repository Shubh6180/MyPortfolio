import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollTelemetryProps {
  activeSection: string;
}

export const ScrollTelemetry: React.FC<ScrollTelemetryProps> = ({ activeSection }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none no-print">
      {/* Precision Progress Line */}
      <motion.div
        className="h-[2.5px] bg-gradient-to-r from-[var(--color-pink)] via-[var(--color-turquoise)] to-[var(--color-blue)] origin-left shadow-[0_0_10px_rgba(234,82,111,0.6)]"
        style={{ scaleX }}
      />

      {/* Floating Micro Coordinates (Desktop only) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
        <div className="mt-1 px-2.5 py-0.5 rounded bg-[var(--bg-surface)]/85 backdrop-blur-sm border border-[var(--border-subtle)] font-mono text-[9px] text-[var(--text-muted)] hidden lg:flex items-center gap-3 shadow-sm">
          <span className="text-[var(--color-turquoise)] font-bold">POS // {percentage}%</span>
          <span className="text-[var(--border-subtle)]">|</span>
          <span className="text-[var(--color-pink)] uppercase font-semibold">NODE: {activeSection}</span>
        </div>
      </div>
    </div>
  );
};

