import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const EntranceLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Only show once per session or bypass with query param
    if (window.location.search.includes('noloader')) {
      setIsVisible(false);
      return;
    }

    const hasSeen = sessionStorage.getItem('seen_loader');
    if (hasSeen) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('seen_loader', 'true');
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)] select-none no-print transition-colors"
        >
          {/* Subtle Background Radial */}
          <div className="absolute inset-0 bg-radial from-[var(--color-turquoise)]/10 via-[var(--color-pink)]/05 to-transparent blur-3xl pointer-events-none" />

          {/* Monogram Assembly */}
          <div className="relative z-10 flex flex-col items-center space-y-6">
            <div className="relative w-20 h-20 flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl">
              {/* Corner brackets */}
              <div className="corner-bracket-tl !w-2 !h-2" />
              <div className="corner-bracket-tr !w-2 !h-2" />
              <div className="corner-bracket-bl !w-2 !h-2" />
              <div className="corner-bracket-br !w-2 !h-2" />

              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="font-display font-black text-3xl tracking-tighter"
              >
                <span className="text-[var(--color-pink)]">S</span>
                <span className="text-[var(--color-turquoise)]">S</span>
              </motion.div>
            </div>

            {/* Boot Ticker */}
            <div className="space-y-1 text-center font-mono">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-xs text-[var(--text-primary)] font-semibold tracking-widest uppercase"
              >
                SHUBH SRIVASTAVA
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-[10px] text-[var(--color-turquoise)] tracking-wider"
              >
                // SYSTEM_BOOT: READY // 3D_ENGINE: ONLINE
              </motion.div>
            </div>

            {/* Glowing Loading Bar */}
            <div className="w-32 h-[2px] bg-[var(--bg-surface-elevated)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-[var(--color-pink)] via-[var(--color-turquoise)] to-[var(--color-blue)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

