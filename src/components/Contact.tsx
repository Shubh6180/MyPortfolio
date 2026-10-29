import React, { useState } from 'react';
import { Github, Linkedin, Instagram, Send, Copy, Check, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    senderEmail: '',
    subject: '',
    message: '',
  });
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMailtoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.click();

    // Trigger celebratory particle confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#EA526F', '#23B5D3', '#279AF1', '#F7F7FF'],
      });
    } catch {
      // Confetti fallback
    }

    const emailSubject = encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name || 'Collaborator'}`);
    const emailBody = encodeURIComponent(
      `Hello Shubh,\n\n${formData.message}\n\n---\nFrom: ${formData.name}\nContact: ${formData.senderEmail}`
    );

    // Direct mailto link to placeholder or user client
    const mailtoUrl = `mailto:${PERSONAL_INFO.contactPlaceholder}?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoUrl;

    setStatusMessage('Preparing direct email in your default client...');
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const copyDraft = () => {
    sound.click();
    const text = `To: Shubh Srivastava\nSubject: ${formData.subject || 'Portfolio Inquiry'}\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.senderEmail})`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      sound.success();
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-gradient-to-t from-[var(--color-pink)]/08 via-[var(--color-turquoise)]/06 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-sm text-[var(--color-pink)] font-bold">06 //</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
          CONNECT & COLLABORATE
        </h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-[var(--color-turquoise)]/40 via-[var(--border-subtle)] to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Editorial Headline & Direct Verified Channels */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="font-display font-black text-4xl sm:text-5xl text-[var(--text-primary)] leading-[1.08] tracking-tight">
            HAVE AN IDEA?
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-pink)] via-[var(--color-turquoise)] to-[var(--color-blue)]">
              LET'S BUILD SOMETHING.
            </span>
          </h3>

          <p className="font-sans text-base text-[var(--text-secondary)] leading-relaxed max-w-lg">
            I'm always interested in learning, building useful things, discussing system ideas, and connecting with people who care about technology and craft.
          </p>

          {/* Verified Social Connect Cards */}
          <div className="space-y-3 pt-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-turquoise)] block font-semibold">
              Verified Social Channels //
            </span>

            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              onMouseEnter={() => sound.hover()}
              className="flex items-center justify-between p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--color-pink)] rounded-xl transition-all duration-200 group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-[var(--bg-surface-elevated)] text-[var(--color-pink)] group-hover:bg-[var(--color-pink)] group-hover:text-white transition-colors">
                  <Github size={18} />
                </div>
                <div>
                  <span className="font-display font-bold text-sm text-[var(--text-primary)] block">
                    GitHub Profile
                  </span>
                  <span className="font-mono text-xs text-[var(--text-secondary)]">@Shubh6180</span>
                </div>
              </div>
              <span className="font-mono text-xs text-[var(--color-pink)] group-hover:translate-x-1 transition-transform font-bold">
                Visit →
              </span>
            </a>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              onMouseEnter={() => sound.hover()}
              className="flex items-center justify-between p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--color-turquoise)] rounded-xl transition-all duration-200 group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-[var(--bg-surface-elevated)] text-[var(--color-turquoise)] group-hover:bg-[var(--color-turquoise)] group-hover:text-white transition-colors">
                  <Linkedin size={18} />
                </div>
                <div>
                  <span className="font-display font-bold text-sm text-[var(--text-primary)] block">
                    LinkedIn Network
                  </span>
                  <span className="font-mono text-xs text-[var(--text-secondary)]">shubh-srivastava</span>
                </div>
              </div>
              <span className="font-mono text-xs text-[var(--color-turquoise)] group-hover:translate-x-1 transition-transform font-bold">
                Connect →
              </span>
            </a>

            {/* Instagram Card */}
            <a
              href={PERSONAL_INFO.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              onMouseEnter={() => sound.hover()}
              className="flex items-center justify-between p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--color-blue)] rounded-xl transition-all duration-200 group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-[var(--bg-surface-elevated)] text-[var(--color-blue)] group-hover:bg-[var(--color-blue)] group-hover:text-white transition-colors">
                  <Instagram size={18} />
                </div>
                <div>
                  <span className="font-display font-bold text-sm text-[var(--text-primary)] block">
                    Instagram Space
                  </span>
                  <span className="font-mono text-xs text-[var(--text-secondary)]">@shubhrealm</span>
                </div>
              </div>
              <span className="font-mono text-xs text-[var(--color-blue)] group-hover:translate-x-1 transition-transform font-bold">
                Follow →
              </span>
            </a>
          </div>
        </div>

        {/* Right Column: Direct Message Composer */}
        <div className="lg:col-span-6">
          <div className="relative p-6 sm:p-8 bg-[var(--bg-surface)] border border-[var(--border-medium)] rounded-2xl shadow-2xl overflow-hidden">
            <div className="corner-bracket-tl" />
            <div className="corner-bracket-tr" />
            <div className="corner-bracket-bl" />
            <div className="corner-bracket-br" />

            {/* Composer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-6">
              <div className="flex items-center gap-2">
                <Terminal size={15} className="text-[var(--color-pink)]" />
                <span className="font-mono text-xs text-[var(--text-primary)] font-semibold tracking-wider">
                  DIRECT DISPATCH COMPOSER
                </span>
              </div>
              <span className="font-mono text-[10px] text-[var(--color-turquoise)] bg-[var(--color-turquoise)]/10 px-2 py-0.5 rounded border border-[var(--color-turquoise)]/20 font-semibold">
                CLIENT-SIDE ONLY
              </span>
            </div>

            <form onSubmit={handleMailtoSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-mono text-[11px] text-[var(--text-secondary)] mb-1 uppercase font-semibold">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Chen"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] focus:border-[var(--color-turquoise)] rounded-lg text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="senderEmail" className="block font-mono text-[11px] text-[var(--text-secondary)] mb-1 uppercase font-semibold">
                    Your Email or Handle
                  </label>
                  <input
                    id="senderEmail"
                    name="senderEmail"
                    type="text"
                    required
                    placeholder="e.g. alex@example.com"
                    value={formData.senderEmail}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] focus:border-[var(--color-turquoise)] rounded-lg text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block font-mono text-[11px] text-[var(--text-secondary)] mb-1 uppercase font-semibold">
                  Subject / Topic
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="e.g. Student collaboration / Hackathon chat"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] focus:border-[var(--color-turquoise)] rounded-lg text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-[11px] text-[var(--text-secondary)] mb-1 uppercase font-semibold">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Share what you are building or ideas you'd like to bounce..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] focus:border-[var(--color-turquoise)] rounded-lg text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="submit"
                  onMouseEnter={() => sound.hover()}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-pink)] hover:opacity-95 text-white font-mono text-xs uppercase font-bold tracking-wider rounded transition-all shadow-[0_0_15px_rgba(234,82,111,0.35)]"
                >
                  <Send size={13} />
                  <span>Send via Email Client</span>
                </button>

                <button
                  type="button"
                  onClick={copyDraft}
                  onMouseEnter={() => sound.hover()}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--color-turquoise)] text-[var(--text-primary)] font-mono text-xs uppercase rounded transition-colors"
                >
                  {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy Message'}</span>
                </button>
              </div>

              {statusMessage && (
                <div className="p-2.5 bg-[var(--color-turquoise)]/15 border border-[var(--color-turquoise)]/30 rounded-lg text-xs font-mono text-[var(--color-turquoise)] font-semibold">
                  {statusMessage}
                </div>
              )}

              {/* Disclaimer */}
              <p className="text-[10px] font-mono text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
                TRANSPARENCY NOTE: No hidden tracking or unconfigured backend endpoints. Generates a pre-filled direct mailto request or copies to your clipboard.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
