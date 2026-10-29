import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { transitionManager } from '../utils/transitionManager';
import { sound } from '../utils/audio';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Curiosity', href: '#curiosity' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Journey', href: '#journey' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string, label: string) => {
    setMobileMenuOpen(false);
    transitionManager.navigate(href, label);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 no-print ${
        isScrolled
          ? 'bg-[var(--bg-surface)]/85 backdrop-blur-md border-b border-[var(--border-subtle)] py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram */}
        <button
          onClick={() => handleNavClick('#hero', 'HOME')}
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-turquoise)] rounded-md px-1 py-0.5 text-left"
          aria-label="Shubh Srivastava - Return to top"
        >
          <div className="relative w-10 h-10 flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-medium)] group-hover:border-[var(--color-pink)] transition-colors duration-200 rounded">
            {/* Corner highlights */}
            <div className="corner-bracket-tl !w-1.5 !h-1.5" />
            <div className="corner-bracket-br !w-1.5 !h-1.5" />
            
            <span className="font-display font-black text-lg tracking-tighter">
              <span className="text-[var(--color-pink)] group-hover:text-[var(--text-primary)] transition-colors">S</span>
              <span className="text-[var(--color-turquoise)] group-hover:text-[var(--color-pink)] transition-colors">S</span>
            </span>
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="font-display font-bold text-sm tracking-wide text-[var(--text-primary)]">
              SHUBH SRIVASTAVA
            </span>
            <span className="font-mono text-[10px] text-[var(--color-turquoise)] tracking-widest uppercase">
              BTECH // NEWTON SCHOOL OF TECH
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href, link.label)}
                onMouseEnter={() => sound.hover()}
                className={`relative px-3 py-1.5 font-mono text-xs tracking-wider uppercase transition-all duration-200 rounded-sm ${
                  isActive
                    ? 'text-[var(--text-primary)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--color-turquoise)]'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-[var(--color-pink)]/10 border-b-2 border-[var(--color-pink)] rounded-t-sm" />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[var(--color-pink)]' : 'bg-transparent'}`} />
                  {link.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Theme Toggle + Sound Synthesizer + Status Pill + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status Indicator Pill (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded-full text-[11px] font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-turquoise)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-turquoise)]"></span>
            </span>
            <span className="text-[var(--text-secondary)]">Open to Collaboration</span>
          </div>

          {/* Theme Mode Toggle (Sun / Moon) */}
          <ThemeToggle />

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => sound.hover()}
            className="p-2 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--color-turquoise)] text-[var(--text-secondary)] hover:text-[var(--color-turquoise)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-turquoise)]"
            title={isMuted ? "Enable subtle audio feedback" : "Mute audio feedback"}
            aria-label={isMuted ? "Enable subtle audio feedback" : "Mute audio feedback"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-[var(--color-pink)]" />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => {
              sound.click();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--color-pink)] transition-colors"
            aria-label="Toggle mobile navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 backdrop-blur-xl px-5 pt-4 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] text-xs font-mono text-[var(--color-turquoise)]">
            <span>// NAVIGATION TERMINAL</span>
            <span className="flex items-center gap-1 text-[var(--color-pink)]">
              <Sparkles size={12} /> SHUBH.DEV
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href, link.label)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded font-mono text-xs uppercase tracking-wider transition-colors text-left ${
                    isActive
                      ? 'bg-[var(--color-pink)]/15 border border-[var(--color-pink)] text-[var(--text-primary)] font-semibold'
                      : 'bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--color-turquoise)]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[var(--color-pink)]' : 'bg-[var(--color-turquoise)]'}`} />
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
            <span>LOCATION: PUNE, INDIA</span>
            <span className="text-[var(--color-turquoise)]">BTECH CSE</span>
          </div>
        </div>
      )}
    </header>
  );
};
