import React from 'react';
import { ArrowUp, Github, Linkedin, Instagram } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { transitionManager } from '../utils/transitionManager';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (href: string, label: string) => {
    transitionManager.navigate(href, label);
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

  return (
    <footer className="relative bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] text-[var(--text-primary)] no-print transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-8 border-b border-[var(--border-subtle)]">
          {/* Brand & Monogram Left */}
          <div className="md:col-span-5 flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('#hero', 'HOME')}
              className="relative w-9 h-9 flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--color-pink)] rounded transition-colors"
              aria-label="Return to top"
            >
              <span className="font-display font-black text-sm tracking-tighter">
                <span className="text-[var(--color-pink)]">S</span>
                <span className="text-[var(--color-turquoise)]">S</span>
              </span>
            </button>
            <div>
              <span className="font-display font-bold text-sm text-[var(--text-primary)] block">
                {PERSONAL_INFO.name}
              </span>
              <span className="font-mono text-[10px] text-[var(--color-turquoise)] tracking-wider uppercase block">
                BTech Student // Newton School of Technology
              </span>
            </div>
          </div>

          {/* Quick Nav Middle */}
          <nav className="md:col-span-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-[var(--text-secondary)]" aria-label="Footer Navigation">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href, link.label)}
                onMouseEnter={() => sound.hover()}
                className="hover:text-[var(--color-turquoise)] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Back to Top Right */}
          <div className="md:col-span-2 flex justify-start md:justify-end">
            <button
              onClick={() => handleLinkClick('#hero', 'TOP')}
              onMouseEnter={() => sound.hover()}
              className="flex items-center gap-1.5 px-3 py-2 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--color-pink)] text-[var(--text-primary)] font-mono text-xs rounded-lg transition-colors shadow-sm"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp size={13} className="text-[var(--color-pink)]" />
            </button>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)]">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>Built with curiosity and a little too much attention to detail.</span>
          </p>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={PERSONAL_INFO.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-pink)] transition-colors"
              aria-label="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href={PERSONAL_INFO.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-turquoise)] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href={PERSONAL_INFO.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-blue)] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={14} />
            </a>
            <span>© {currentYear} Shubh Srivastava</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
