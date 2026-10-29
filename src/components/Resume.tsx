import React, { useState } from 'react';
import { Printer, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const Resume: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    sound.click();
    window.print();
  };

  const copyMarkdownResume = () => {
    sound.click();
    const md = `# SHUBH SRIVASTAVA
BTech Student in Computer Science | Newton School of Technology, Pune
Location: Pune, India | GitHub: https://github.com/Shubh6180 | LinkedIn: https://www.linkedin.com/in/shubh-srivastava-75081530b/

---

## PROFESSIONAL SUMMARY
Curious and disciplined engineering student pursuing a BTech in Computer Science at Newton School of Technology. Experienced with Python, JavaScript, and modern web development, with foundational certifications in mobile application and game development from WhiteHat Jr. Passionate about software systems, algorithmic problem-solving, and AI applications.

---

## EDUCATION
**Bachelor of Technology (BTech) in Computer Science**
Newton School of Technology, Pune, India
- Status: Currently Pursuing (Early Engineering Journey)
- Focus: Data Structures, Computer Science Fundamentals, Software Engineering

---

## TECHNICAL SKILLS
- **Languages:** Python 3, JavaScript (ES6+), Java (Fundamentals), HTML5, CSS3
- **Web & Frameworks:** React & TypeScript (Exploring), Responsive Web Design, Client-Side State Management
- **Developer Tools:** Git, GitHub, VS Code, Linux / Terminal Environments
- **Core Concepts:** Object-Oriented Programming, Algorithm Analysis (Big-O), 2D Game Loops, UI/UX Wireframing

---

## PROJECTS

### 1. Hostlur — Student Hostel Management Web Prototype
*Hackathon Prototype | Technologies: HTML5, CSS3, JavaScript*
- Developed an interactive prototype addressing student communication and hostel service management during a hackathon.
- Built responsive user interfaces and client-side logic for maintenance request logging, room notices, and utility tracking.

### 2. UrbanPulse AI — Mobile Road Sensing & Infrastructure Concept
*System Architecture Exploration | Technologies: Edge AI Concept, Computer Vision, GPS Telemetry*
- Conceptualized a low-cost municipal road hazard monitoring platform using city transit vehicles as mobile sensors.
- Architected the technical dataflow for edge defect detection (potholes/cracks), GPS tagging, and municipal triage prioritization.

### 3. Computational & Algorithmic Lab
*Active Exploration | Technologies: Python 3, Data Structures, Algorithms*
- Implemented modular Python programs solving algorithmic challenges, recursion puzzles, and data parsing utilities.

---

## CERTIFICATIONS & EARLY FOUNDATIONS
- **WhiteHat Jr Mobile App Development Certification**
- **WhiteHat Jr Game Development Certification**
`;

    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      sound.success();
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="resume" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header (Screen only) */}
      <div className="no-print flex items-center gap-4 mb-4">
        <span className="font-mono text-sm text-[var(--color-pink)] font-bold">05 //</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
          CURRICULUM VITAE
        </h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-[var(--color-turquoise)]/40 via-[var(--border-subtle)] to-transparent" />
      </div>

      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <p className="font-sans text-sm text-[var(--text-secondary)] max-w-xl">
          A verified summary of my academic background, technical proficiencies, project milestones, and early programming certifications.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            onMouseEnter={() => sound.hover()}
            className="flex items-center gap-1.5 px-4 py-2 bg-[var(--color-pink)] hover:opacity-95 text-white font-mono text-xs uppercase tracking-wider font-bold rounded transition-colors shadow-[0_0_15px_rgba(234,82,111,0.3)]"
          >
            <Printer size={13} />
            <span>Print / Save PDF</span>
          </button>

          <button
            onClick={copyMarkdownResume}
            onMouseEnter={() => sound.hover()}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--color-turquoise)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-wider rounded transition-colors"
            title="Copy plain Markdown formatted CV"
          >
            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy MD'}</span>
          </button>
        </div>
      </div>

      {/* Styled CV Sheet (Screen & Print Optimized) */}
      <div className="relative bg-[var(--bg-surface)] print:bg-white text-[var(--text-primary)] print:text-black border border-[var(--border-subtle)] print:border-none rounded-2xl p-8 sm:p-12 shadow-2xl overflow-hidden transition-colors">
        {/* Decorative corner brackets (screen only) */}
        <div className="corner-bracket-tl no-print" />
        <div className="corner-bracket-tr no-print" />
        <div className="corner-bracket-bl no-print" />
        <div className="corner-bracket-br no-print" />

        {/* Resume Header */}
        <header className="border-b border-[var(--border-subtle)] print:border-neutral-300 pb-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)] print:text-black">
                {PERSONAL_INFO.name}
              </h1>
              <p className="font-mono text-xs sm:text-sm text-[var(--color-turquoise)] print:text-neutral-700 mt-1 font-semibold">
                BTech Student // Computer Science & Engineering
              </p>
            </div>

            <div className="font-mono text-xs text-[var(--text-secondary)] print:text-neutral-600 space-y-1 sm:text-right">
              <div>{PERSONAL_INFO.education.location}</div>
              <div className="text-[var(--color-pink)] print:text-neutral-800 font-semibold">Newton School of Technology</div>
              <div className="text-[11px] text-[var(--color-blue)] print:text-neutral-600">github.com/Shubh6180</div>
            </div>
          </div>
        </header>

        {/* Statement */}
        <section className="mb-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-pink)] print:text-neutral-900 font-bold mb-2">
            01 // PROFILE SUMMARY
          </h2>
          <p className="font-sans text-sm text-[var(--text-secondary)] print:text-neutral-800 leading-relaxed">
            Curious and motivated BTech Computer Science student at Newton School of Technology with an active focus on software development, Python scripting, and full-stack web architectures. Background rooted in early mobile app and game development certifications. Guided by the belief that software intuition is forged through continuous experimentation and hands-on building.
          </p>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-turquoise)] print:text-neutral-900 font-bold mb-3">
            02 // EDUCATION
          </h2>
          <div className="bg-[var(--bg-surface-elevated)] print:bg-neutral-50 p-4 rounded-xl border border-[var(--border-subtle)] print:border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <span className="font-display font-bold text-base text-[var(--text-primary)] print:text-black">
                {PERSONAL_INFO.education.degree}
              </span>
              <span className="font-mono text-xs text-[var(--color-pink)] print:text-neutral-600 font-semibold">
                {PERSONAL_INFO.education.status}
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] print:text-neutral-700">
              {PERSONAL_INFO.education.institution} • {PERSONAL_INFO.education.location}
            </p>
            <p className="font-sans text-xs text-[var(--text-muted)] print:text-neutral-600 mt-2">
              Coursework & Exploration: Data Structures, Object-Oriented Principles, Algorithmic Analysis, Web Architecture.
            </p>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-blue)] print:text-neutral-900 font-bold mb-3">
            03 // TECHNICAL SKILLS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
            <div className="p-3 bg-[var(--bg-surface-elevated)] print:bg-neutral-50 rounded-xl border border-[var(--border-subtle)] print:border-neutral-200">
              <span className="font-mono text-[10px] text-[var(--color-pink)] uppercase font-bold block mb-1">
                Languages & Core
              </span>
              <span className="text-[var(--text-primary)] print:text-black">
                Python 3, JavaScript (ES6+), Java (Fundamentals), HTML5, CSS3
              </span>
            </div>

            <div className="p-3 bg-[var(--bg-surface-elevated)] print:bg-neutral-50 rounded-xl border border-[var(--border-subtle)] print:border-neutral-200">
              <span className="font-mono text-[10px] text-[var(--color-turquoise)] uppercase font-bold block mb-1">
                Web & Prototyping
              </span>
              <span className="text-[var(--text-primary)] print:text-black">
                React, TypeScript (Exploring), Responsive Design, DOM Mechanics, UI Wireframing
              </span>
            </div>

            <div className="p-3 bg-[var(--bg-surface-elevated)] print:bg-neutral-50 rounded-xl border border-[var(--border-subtle)] print:border-neutral-200">
              <span className="font-mono text-[10px] text-[var(--color-blue)] uppercase font-bold block mb-1">
                Developer Tooling
              </span>
              <span className="text-[var(--text-primary)] print:text-black">
                Git, GitHub, VS Code, Linux Shell Basics, Terminal Workflow
              </span>
            </div>

            <div className="p-3 bg-[var(--bg-surface-elevated)] print:bg-neutral-50 rounded-xl border border-[var(--border-subtle)] print:border-neutral-200">
              <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 print:text-emerald-800 uppercase font-bold block mb-1">
                Systems & AI Concepts
              </span>
              <span className="text-[var(--text-primary)] print:text-black">
                Algorithm Analysis (Big-O), Computer Vision Pipelines (Conceptual), 2D Event Loops
              </span>
            </div>
          </div>
        </section>

        {/* Selected Projects */}
        <section className="mb-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-pink)] print:text-neutral-900 font-bold mb-3">
            04 // FEATURED PROJECTS
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-[var(--bg-surface-elevated)] print:bg-neutral-50 rounded-xl border border-[var(--border-subtle)] print:border-neutral-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <span className="font-display font-bold text-sm text-[var(--text-primary)] print:text-black">
                  Hostlur — Student Hostel Management Web Prototype
                </span>
                <span className="font-mono text-[10px] text-[var(--color-turquoise)] print:text-neutral-600 font-semibold">
                  Hackathon Prototype
                </span>
              </div>
              <p className="font-sans text-xs text-[var(--text-secondary)] print:text-neutral-700 leading-relaxed mb-2">
                Engineered a unified student hostel portal prototype during a hackathon to centralize maintenance logging and campus announcements with responsive frontend architecture and state management.
              </p>
              <div className="font-mono text-[10px] text-[var(--color-pink)] print:text-neutral-600 font-semibold">
                Tech: HTML5, CSS3, JavaScript, UI/UX Wireframing
              </div>
            </div>

            <div className="p-4 bg-[var(--bg-surface-elevated)] print:bg-neutral-50 rounded-xl border border-[var(--border-subtle)] print:border-neutral-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <span className="font-display font-bold text-sm text-[var(--text-primary)] print:text-black">
                  UrbanPulse AI — Mobile Road Sensing & Infrastructure Concept
                </span>
                <span className="font-mono text-[10px] text-[var(--color-blue)] print:text-neutral-600 font-semibold">
                  Proposed Architecture
                </span>
              </div>
              <p className="font-sans text-xs text-[var(--text-secondary)] print:text-neutral-700 leading-relaxed mb-2">
                Conceptualized a proactive municipal road inspection framework utilizing transit buses as mobile computer-vision sensing nodes with GPS-tagged severity classification for pavement hazard triage.
              </p>
              <div className="font-mono text-[10px] text-[var(--color-turquoise)] print:text-neutral-600 font-semibold">
                Tech: Computer Vision Concept, Edge AI Pipelines, GPS Telemetry, System Architecture
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-turquoise)] print:text-neutral-900 font-bold mb-3">
            05 // EARLY CERTIFICATIONS & MILESTONES
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
            {PERSONAL_INFO.earlyBackground.map((cert) => (
              <div
                key={cert}
                className="p-3 bg-[var(--bg-surface-elevated)] print:bg-neutral-50 rounded-xl border border-[var(--border-subtle)] print:border-neutral-200 flex items-center gap-2"
              >
                <Sparkles size={14} className="text-[var(--color-pink)] flex-shrink-0" />
                <span className="text-[var(--text-primary)] print:text-black font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Integrity Tag (Screen only) */}
        <div className="no-print mt-8 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <AlertCircle size={12} className="text-[var(--color-turquoise)]" />
            AUTHENTIC RECRUITER SHEET // ZERO INVENTED CLAIMS
          </span>
          <span className="text-[var(--color-pink)] font-semibold">CURRENTLY PURSUING BTECH</span>
        </div>
      </div>
    </section>
  );
};
