import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/audio';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => {
        sound.click();
        toggleTheme();
      }}
      onMouseEnter={() => sound.hover()}
      className={`relative inline-flex items-center justify-between p-1 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-medium)] hover:border-[var(--color-pink)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-turquoise)] ${className}`}
      title={isDark ? "Switch to Editorial Warm Beige Light Mode" : "Switch to Cinematic Futuristic Dark Mode"}
      aria-label={isDark ? "Switch to Editorial Warm Beige Light Mode" : "Switch to Cinematic Futuristic Dark Mode"}
    >
      {/* Sliding Active Pill */}
      <motion.div
        className="absolute top-1 bottom-1 w-6 h-6 rounded-full bg-gradient-to-tr from-[var(--color-pink)] to-[var(--color-turquoise)] shadow-sm"
        animate={{
          left: isDark ? '4px' : 'calc(100% - 28px)',
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 28 }}
      />

      {/* Moon Icon (Dark Mode side) */}
      <span className="relative z-10 w-6 h-6 flex items-center justify-center text-xs">
        <Moon
          size={13}
          className={`transition-colors duration-200 ${
            isDark ? 'text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
        />
      </span>

      {/* Sun Icon (Light Mode side) */}
      <span className="relative z-10 w-6 h-6 flex items-center justify-center text-xs">
        <Sun
          size={13}
          className={`transition-colors duration-200 ${
            !isDark ? 'text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
        />
      </span>
    </button>
  );
};
