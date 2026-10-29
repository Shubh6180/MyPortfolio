import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
        setIsHovered(!!interactive);

        const labeledElement = target.closest('[data-cursor-label]') as HTMLElement | null;
        if (labeledElement) {
          setCursorLabel(labeledElement.getAttribute('data-cursor-label'));
        } else {
          setCursorLabel(null);
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Smooth lerp for trailing cursor
  useEffect(() => {
    if (isTouch) return;
    let animId: number;
    const lerp = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [pos, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden no-print">
      {/* Primary Precision Dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[var(--color-pink)] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out shadow-[0_0_10px_var(--color-pink)]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isHovered ? 0.4 : 1})`,
        }}
      />

      {/* Trailing Ring with Contextual Label */}
      <div
        className={`fixed top-0 left-0 rounded-full border -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-150 ease-out flex items-center justify-center ${
          cursorLabel
            ? 'w-24 h-7 bg-[var(--bg-surface)]/95 border-[var(--color-pink)] rounded-full shadow-[0_0_15px_rgba(234,82,111,0.4)]'
            : isHovered
            ? 'w-10 h-10 bg-[var(--color-turquoise)]/15 border-[var(--color-pink)] shadow-[0_0_15px_rgba(35,181,211,0.4)]'
            : 'w-6 h-6 border-[var(--color-turquoise)]/70'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {cursorLabel && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-primary)] font-bold px-1 whitespace-nowrap">
            {cursorLabel}
          </span>
        )}
      </div>
    </div>
  );
};
