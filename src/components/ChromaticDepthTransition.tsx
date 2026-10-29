import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { transitionManager } from '../utils/transitionManager';
import { sound } from '../utils/audio';

export const ChromaticDepthTransition: React.FC = () => {
  const [transitionState, setTransitionState] = useState<{
    isActive: boolean;
    targetId: string;
    label: string;
  }>({
    isActive: false,
    targetId: '',
    label: '',
  });

  useEffect(() => {
    const unsubscribe = transitionManager.subscribe((targetId, label) => {
      // Check reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      // Start Chromatic Depth Transition
      sound.switch();
      setTransitionState({
        isActive: true,
        targetId,
        label: label.toUpperCase(),
      });

      // Halfway through (at 340ms), perform the scroll while obscured
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'auto' });
        }
      }, 340);

      // Conclude transition and retract
      setTimeout(() => {
        setTransitionState((prev) => ({ ...prev, isActive: false }));
      }, 820);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="no-print">
      <AnimatePresence>
        {transitionState.isActive && (
          <div className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center overflow-hidden">
            {/* Chromatic Layer 1: Electric Blue Sweeper */}
            <motion.div
              initial={{ scaleY: 0, transformOrigin: 'top' }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, transformOrigin: 'bottom' }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-[var(--color-blue)]/25 border-b-2 border-[var(--color-blue)]"
            />

            {/* Chromatic Layer 2: Interactive Turquoise Sweeper */}
            <motion.div
              initial={{ scaleY: 0, transformOrigin: 'top' }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, transformOrigin: 'bottom' }}
              transition={{ duration: 0.38, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-[var(--color-turquoise)]/20 border-b-2 border-[var(--color-turquoise)]"
            />

            {/* Chromatic Layer 3: Primary Pink Sweeper */}
            <motion.div
              initial={{ scaleY: 0, transformOrigin: 'top' }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, transformOrigin: 'bottom' }}
              transition={{ duration: 0.42, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-[var(--color-pink)]/25 border-b-2 border-[var(--color-pink)]"
            />

            {/* Chromatic Layer 4: Deep Background Main Curtain */}
            <motion.div
              initial={{ scaleY: 0, transformOrigin: 'top' }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, transformOrigin: 'bottom' }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-[var(--bg-primary)] flex flex-col items-center justify-center transition-colors"
            >
              {/* Scanline Texture Overlay */}
              <div className="absolute inset-0 opacity-15 bg-tech-grid pointer-events-none" />

              {/* Central Floating Geometric Monogram HUD */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -15 }}
                transition={{ duration: 0.3, delay: 0.18 }}
                className="relative z-10 flex flex-col items-center gap-4 text-center px-6"
              >
                {/* Monogram Badge */}
                <div className="relative w-16 h-16 flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-accent)] rounded-2xl shadow-2xl">
                  <span className="font-display font-black text-2xl tracking-tighter">
                    <span className="text-[var(--color-pink)]">S</span>
                    <span className="text-[var(--color-turquoise)]">S</span>
                  </span>
                </div>

                {/* Telemetry Target Label */}
                <div className="space-y-1 font-mono">
                  <span className="text-[10px] text-[var(--color-pink)] tracking-widest uppercase block font-semibold">
                    TRANSITION SEQUENCE
                  </span>
                  <span className="text-sm text-[var(--text-primary)] font-bold tracking-wider block">
                    DESTINATION // {transitionState.label || transitionState.targetId.toUpperCase()}
                  </span>
                  <span className="text-[9px] text-[var(--color-turquoise)] tracking-widest block font-medium">
                    COORDINATES: PUNE_IN // SYSTEM ACTIVE
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
