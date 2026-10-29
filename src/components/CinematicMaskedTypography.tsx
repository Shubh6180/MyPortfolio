import React, { useRef, useEffect } from 'react';
import { MotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface CinematicMaskedTypographyProps {
  pointer: { x: number; y: number };
  scrollYProgress: MotionValue<number>;
}

export const CinematicMaskedTypography: React.FC<CinematicMaskedTypographyProps> = ({
  pointer,
  scrollYProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const pointerRef = useRef(pointer);
  pointerRef.current = pointer;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Create persistent offscreen canvas for rendering the liquid metal simulation
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
    }
    const offscreen = offscreenCanvasRef.current;
    const offCtx = offscreen.getContext('2d', { alpha: false });
    if (!offCtx) return;

    let animId: number;
    let time = 0;
    let lastTime = performance.now();

    // 3 lines with Apple-grade editorial composition
    const LINES = ['EVERYTHING', 'BEGINS WITH', 'RAW CURIOSITY.'];

    // Photonic micro-particles streaming inside the liquid metal
    const PARTICLE_COUNT = 44;
    const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.003 + 0.0012,
      vy: (Math.random() - 0.5) * 0.0018,
      radius: Math.random() * 3.2 + 1.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.025 + 0.012,
      colorType: Math.floor(Math.random() * 4),
    }));

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;

      const physicalWidth = Math.floor(width * dpr);
      const physicalHeight = Math.floor(height * dpr);

      canvas.width = physicalWidth;
      canvas.height = physicalHeight;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      offscreen.width = physicalWidth;
      offscreen.height = physicalHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Font ready check
    if (document.fonts) {
      document.fonts.ready.then(() => {
        // Redraw triggers smoothly via RAF
      });
    }

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.08);
      lastTime = now;

      // Scroll speed boost: reads Framer Motion value directly without triggering React re-renders
      const currentScroll = scrollYProgress.get();
      const scrollVelocityBoost = 1 + currentScroll * 1.6;
      time += dt * 0.9 * scrollVelocityBoost;

      const isLight = themeRef.current === 'light';

      const physicalWidth = offscreen.width;
      const physicalHeight = offscreen.height;

      // =========================================================================
      // STEP 1: RENDER LIQUID CHROME & CHROMATIC PLASMA ON OFFSCREEN CANVAS
      // (Using standard source-over so all layers blend richly without being erased!)
      // =========================================================================
      offCtx.save();
      offCtx.scale(dpr, dpr);

      const cx = width / 2;
      const cy = height / 2;

      // 1A. Deep Dynamic Liquid Base Mesh
      const baseAngle = time * 0.35;
      const gradDist = Math.max(width, height) * 0.65;
      const gx1 = cx + Math.cos(baseAngle) * gradDist;
      const gy1 = cy + Math.sin(baseAngle) * gradDist;
      const gx2 = cx - Math.cos(baseAngle) * gradDist;
      const gy2 = cy - Math.sin(baseAngle) * gradDist;

      const baseGrad = offCtx.createLinearGradient(gx1, gy1, gx2, gy2);

      if (isLight) {
        // High-contrast, dense, luxurious jewel-toned liquid enamel for Light Mode
        baseGrad.addColorStop(0.0, '#9E1538'); // Deep Rich Crimson
        baseGrad.addColorStop(0.2, '#D94364'); // Primary Pink Accent
        baseGrad.addColorStop(0.42, '#0D768A'); // Saturated Deep Teal
        baseGrad.addColorStop(0.65, '#1B5EA0'); // Royal Cobalt
        baseGrad.addColorStop(0.85, '#D94364'); // Pink Flare
        baseGrad.addColorStop(1.0, '#1E1B17'); // Midnight Obsidian Bronze
      } else {
        // Futuristic iridescent cyber plasma for Dark Mode
        baseGrad.addColorStop(0.0, '#FF1464'); // Neon Pink
        baseGrad.addColorStop(0.22, '#EA526F'); // Brand Pink
        baseGrad.addColorStop(0.48, '#00F0FF'); // Vivid Cyan
        baseGrad.addColorStop(0.72, '#279AF1'); // Electric Blue
        baseGrad.addColorStop(0.88, '#9B26B6'); // Deep Ultraviolet
        baseGrad.addColorStop(1.0, '#110D26'); // Deep Abyss
      }

      offCtx.fillStyle = baseGrad;
      offCtx.fillRect(0, 0, width, height);

      // 1B. 5-Layer Harmonic Liquid Ribbons with Sinusoidal Turbulences
      const waveCount = 5;
      for (let w = 0; w < waveCount; w++) {
        const waveSpeed = 0.65 + w * 0.32;
        const waveFreq = 0.0032 + w * 0.0016;
        const wavePhase = time * waveSpeed + (w * Math.PI) / 2.3;

        offCtx.beginPath();
        offCtx.moveTo(0, height);

        for (let x = 0; x <= width; x += 12) {
          const y =
            cy +
            Math.sin(x * waveFreq + wavePhase) * (height * 0.26) +
            Math.cos(x * waveFreq * 0.72 - wavePhase * 0.85) * (height * 0.16) +
            (w - 2) * (height * 0.11);
          offCtx.lineTo(x, y);
        }

        offCtx.lineTo(width, height);
        offCtx.closePath();

        const ribbonGrad = offCtx.createLinearGradient(0, 0, width, 0);
        if (isLight) {
          if (w === 0) {
            ribbonGrad.addColorStop(0, 'rgba(217, 67, 100, 0.85)');
            ribbonGrad.addColorStop(0.5, 'rgba(19, 141, 163, 0.85)');
            ribbonGrad.addColorStop(1, 'rgba(39, 122, 193, 0.85)');
          } else if (w === 1) {
            ribbonGrad.addColorStop(0, 'rgba(30, 27, 23, 0.78)');
            ribbonGrad.addColorStop(0.45, 'rgba(217, 67, 100, 0.75)');
            ribbonGrad.addColorStop(1, 'rgba(19, 141, 163, 0.75)');
          } else if (w === 2) {
            ribbonGrad.addColorStop(0, 'rgba(19, 141, 163, 0.75)');
            ribbonGrad.addColorStop(0.5, 'rgba(255, 248, 235, 0.9)');
            ribbonGrad.addColorStop(1, 'rgba(217, 67, 100, 0.75)');
          } else {
            ribbonGrad.addColorStop(0, 'rgba(27, 94, 160, 0.7)');
            ribbonGrad.addColorStop(0.5, 'rgba(217, 67, 100, 0.7)');
            ribbonGrad.addColorStop(1, 'rgba(19, 141, 163, 0.7)');
          }
        } else {
          if (w === 0) {
            ribbonGrad.addColorStop(0, 'rgba(234, 82, 111, 0.88)');
            ribbonGrad.addColorStop(0.5, 'rgba(0, 240, 255, 0.88)');
            ribbonGrad.addColorStop(1, 'rgba(39, 154, 241, 0.88)');
          } else if (w === 1) {
            ribbonGrad.addColorStop(0, 'rgba(39, 154, 241, 0.82)');
            ribbonGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
            ribbonGrad.addColorStop(1, 'rgba(234, 82, 111, 0.82)');
          } else if (w === 2) {
            ribbonGrad.addColorStop(0, 'rgba(155, 38, 182, 0.75)');
            ribbonGrad.addColorStop(0.5, 'rgba(35, 181, 211, 0.75)');
            ribbonGrad.addColorStop(1, 'rgba(255, 255, 255, 0.75)');
          } else {
            ribbonGrad.addColorStop(0, 'rgba(35, 181, 211, 0.7)');
            ribbonGrad.addColorStop(0.5, 'rgba(234, 82, 111, 0.7)');
            ribbonGrad.addColorStop(1, 'rgba(39, 154, 241, 0.7)');
          }
        }

        offCtx.fillStyle = ribbonGrad;
        offCtx.fill();
      }

      // 1C. Apple Signature Metallic Specular Gleam (Sweeping gloss bar)
      const sheenPeriod = 3.6;
      const sheenCycle = (time % sheenPeriod) / sheenPeriod;
      const sheenX = -width * 0.5 + sheenCycle * (width * 2.0);

      const sheenGrad = offCtx.createLinearGradient(
        sheenX,
        0,
        sheenX + width * 0.45,
        height
      );
      if (isLight) {
        sheenGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0)');
        sheenGrad.addColorStop(0.38, 'rgba(255, 255, 255, 0.25)');
        sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
        sheenGrad.addColorStop(0.62, 'rgba(255, 255, 255, 0.25)');
        sheenGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
      } else {
        sheenGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0)');
        sheenGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.35)');
        sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.98)');
        sheenGrad.addColorStop(0.65, 'rgba(255, 255, 255, 0.35)');
        sheenGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
      }
      offCtx.fillStyle = sheenGrad;
      offCtx.fillRect(0, 0, width, height);

      // 1D. Interactive Pointer Spotlight & Specular Flare
      const ptr = pointerRef.current;
      const pointerScreenX = cx + ptr.x * (width * 0.48);
      const pointerScreenY = cy + ptr.y * (height * 0.42);

      const pointerSpotlight = offCtx.createRadialGradient(
        pointerScreenX,
        pointerScreenY,
        0,
        pointerScreenX,
        pointerScreenY,
        Math.max(width * 0.4, 260)
      );
      if (isLight) {
        pointerSpotlight.addColorStop(0.0, 'rgba(255, 255, 255, 0.85)');
        pointerSpotlight.addColorStop(0.35, 'rgba(255, 245, 230, 0.35)');
        pointerSpotlight.addColorStop(1.0, 'rgba(255, 245, 230, 0)');
      } else {
        pointerSpotlight.addColorStop(0.0, 'rgba(255, 255, 255, 0.9)');
        pointerSpotlight.addColorStop(0.32, 'rgba(0, 240, 255, 0.42)');
        pointerSpotlight.addColorStop(0.65, 'rgba(234, 82, 111, 0.22)');
        pointerSpotlight.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      }
      offCtx.fillStyle = pointerSpotlight;
      offCtx.fillRect(0, 0, width, height);

      // 1E. Micro Photonic Particles inside the fluid
      particles.forEach((p) => {
        p.x += p.vx * scrollVelocityBoost;
        p.y += p.vy;
        p.phase += p.speed;

        if (p.x > 1) p.x = 0;
        if (p.x < 0) p.x = 1;
        if (p.y > 1) p.y = 0;
        if (p.y < 0) p.y = 1;

        const px = p.x * width;
        const py = p.y * height + Math.sin(p.phase) * 10;
        const radius = p.radius + Math.sin(p.phase) * 0.8;

        offCtx.beginPath();
        offCtx.arc(px, py, Math.max(0.6, radius), 0, Math.PI * 2);
        if (isLight) {
          offCtx.fillStyle =
            p.colorType === 0
              ? 'rgba(255, 255, 255, 0.98)'
              : p.colorType === 1
              ? 'rgba(217, 67, 100, 0.95)'
              : p.colorType === 2
              ? 'rgba(19, 141, 163, 0.95)'
              : 'rgba(255, 240, 210, 0.95)';
        } else {
          offCtx.fillStyle =
            p.colorType === 0
              ? 'rgba(255, 255, 255, 0.98)'
              : p.colorType === 1
              ? 'rgba(234, 82, 111, 0.98)'
              : p.colorType === 2
              ? 'rgba(0, 240, 255, 0.98)'
              : 'rgba(39, 154, 241, 0.98)';
        }
        offCtx.fill();
      });

      offCtx.restore();

      // =========================================================================
      // STEP 2: DRAW ON THE VISIBLE CANVAS WITH MASKING
      // =========================================================================
      ctx.clearRect(0, 0, physicalWidth, physicalHeight);

      ctx.save();
      ctx.scale(dpr, dpr);

      // 2A. Calculate dynamic monumental typography sizing (~88-90% container width)
      const targetWidth = Math.min(width * 0.90, 1150);
      let fontSize = Math.floor(width / 10.8);
      fontSize = Math.max(32, Math.min(fontSize, 128));

      ctx.font = `900 ${fontSize}px "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

      let maxLineWidth = 0;
      LINES.forEach((line) => {
        const m = ctx.measureText(line).width;
        if (m > maxLineWidth) maxLineWidth = m;
      });

      if (maxLineWidth > 0) {
        fontSize = Math.floor(fontSize * (targetWidth / maxLineWidth));
        fontSize = Math.max(28, Math.min(fontSize, 130));

        const totalHeight = fontSize * 1.02 * 2 + fontSize;
        if (totalHeight > height * 0.92) {
          fontSize = Math.floor(fontSize * (height * 0.92 / totalHeight));
        }
      }

      ctx.font = `900 ${fontSize}px "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const lineSpacing = fontSize * 1.02;
      const startY = height / 2 - lineSpacing;

      // 2B. Draw Physical 3D Drop Shadow / Ambient Elevation Behind Letters
      ctx.save();
      if (isLight) {
        ctx.shadowColor = 'rgba(30, 27, 23, 0.22)';
        ctx.shadowBlur = 24;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;
        ctx.fillStyle = '#1E1B17';
      } else {
        ctx.shadowColor = 'rgba(234, 82, 111, 0.45)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 6;
        ctx.fillStyle = '#000000';
      }

      LINES.forEach((line, idx) => {
        const y = startY + idx * lineSpacing;
        ctx.fillText(line, width / 2, y);
      });
      ctx.restore();

      // 2C. Draw Solid White Letter Shape as Mask
      ctx.fillStyle = '#ffffff';
      LINES.forEach((line, idx) => {
        const y = startY + idx * lineSpacing;
        ctx.fillText(line, width / 2, y);
      });

      // 2D. ONE-SHOT MASKING VIA 'source-in'
      // Stamp the entire offscreen fluid simulation into the letter shapes in a SINGLE call!
      ctx.globalCompositeOperation = 'source-in';
      ctx.drawImage(offscreen, 0, 0, width, height);

      // 2E. Reset Composite to 'source-over'
      ctx.globalCompositeOperation = 'source-over';

      // 2F. Draw Architectural Contour & Specular Bevel Hairline
      ctx.strokeStyle = isLight
        ? 'rgba(26, 23, 19, 0.55)'
        : 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = Math.max(1.0, fontSize * 0.014);

      LINES.forEach((line, idx) => {
        const y = startY + idx * lineSpacing;
        ctx.strokeText(line, width / 2, y);
      });

      // 2G. Subtle Inner Highlight on top edge of letters
      ctx.strokeStyle = isLight
        ? 'rgba(255, 255, 255, 0.65)'
        : 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = Math.max(0.6, fontSize * 0.007);

      LINES.forEach((line, idx) => {
        const y = startY + idx * lineSpacing - 1;
        ctx.strokeText(line, width / 2, y);
      });

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [scrollYProgress]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[420px] lg:h-[500px] xl:h-[540px] flex items-center justify-center pointer-events-none select-none"
    >
      <canvas
        ref={canvasRef}
        className="block max-w-full max-h-full"
      />
      {/* Semantic Accessibility Fallback for screen readers & SEO */}
      <h2 className="sr-only">
        EVERYTHING BEGINS WITH RAW CURIOSITY.
      </h2>
    </div>
  );
};
