import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface SpatialNode {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
  colorIndex: number;
  pulseSpeed: number;
  pulsePhase: number;
  // Dynamic projected values computed per frame
  px: number;
  py: number;
  pz: number;
  pRadius: number;
  alpha: number;
}

export const GlobalSpatialParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  // Spatial cursor tracking with smooth inertia damping (zero React re-renders)
  const mouseRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    screenX: -9999,
    screenY: -9999,
    active: false,
  });

  // Track scroll velocity for realistic 3D depth slip
  const scrollRef = useRef({
    lastY: 0,
    velocity: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (clientY / innerHeight - 0.5) * 2;
      mouseRef.current.screenX = clientX;
      mouseRef.current.screenY = clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.active = false;
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - scrollRef.current.lastY;
      scrollRef.current.velocity = delta;
      scrollRef.current.lastY = currentY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    // Handle visibility change to save CPU when tab is hidden
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Responsive node count: 85 on desktop, 45 on mobile for 60/120fps performance
    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 44 : 84;

    const particles: SpatialNode[] = Array.from({ length: NODE_COUNT }).map(() => ({
      x: (Math.random() - 0.5) * (width * 1.35),
      y: (Math.random() - 0.5) * (height * 1.35),
      z: (Math.random() - 0.5) * 580, // Rich 3D depth from -290 to +290
      vx: (Math.random() - 0.5) * 0.18, // Slow celestial drift
      vy: (Math.random() - 0.5) * 0.18,
      vz: (Math.random() - 0.5) * 0.2,
      baseRadius: Math.random() * 2.2 + 1.3,
      colorIndex: Math.floor(Math.random() * 4), // 0: pink, 1: turquoise, 2: blue, 3: specular
      pulseSpeed: Math.random() * 0.014 + 0.007,
      pulsePhase: Math.random() * Math.PI * 2,
      px: 0,
      py: 0,
      pz: 0,
      pRadius: 0,
      alpha: 0,
    }));

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const isLight = themeRef.current === 'light';

      // Buttery smooth spatial mouse damping (luxury weighted inertia)
      const m = mouseRef.current;
      m.currentX += (m.targetX - m.currentX) * 0.045;
      m.currentY += (m.targetY - m.currentY) * 0.045;

      // Decay scroll velocity smoothly
      const s = scrollRef.current;
      s.velocity *= 0.92;

      // 3D Spatial Orbit Angles
      const yaw = m.currentX * 0.32; // Horizontal tilt in radians (~18deg max)
      const pitch = -m.currentY * 0.24; // Vertical tilt in radians (~14deg max)
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const focalLength = 520;

      const boundX = width * 0.72;
      const boundY = height * 0.72;
      const boundZ = 300;

      // 1. UPDATE & PROJECT PARTICLES INTO 3D PERSPECTIVE
      particles.forEach((p) => {
        // Continuous slow celestial drift + subtle scroll slip
        p.x += p.vx;
        p.y += p.vy - s.velocity * 0.06;
        p.z += p.vz;
        p.pulsePhase += p.pulseSpeed;

        // Toroidal 3D boundary wrap for continuous flow across whole page
        if (p.x > boundX) p.x = -boundX;
        if (p.x < -boundX) p.x = boundX;
        if (p.y > boundY) p.y = -boundY;
        if (p.y < -boundY) p.y = boundY;
        if (p.z > boundZ) p.z = -boundZ;
        if (p.z < -boundZ) p.z = boundZ;

        // 3D Rotation Transform (Yaw + Pitch)
        const rx = p.x * cosY + p.z * sinY;
        const rz = -p.x * sinY + p.z * cosY;
        const ry = p.y * cosP - rz * sinP;
        const finalZ = p.y * sinP + rz * cosP;

        // Perspective Division
        const depthScale = focalLength / (focalLength + finalZ + 290);
        let screenX = cx + rx * depthScale;
        let screenY = cy + ry * depthScale;

        // Fluid Viscous Parting from Cursor (Soft quadratic wake, ZERO mosquito jitter)
        if (m.active && m.screenX > 0) {
          const dx = screenX - m.screenX;
          const dy = screenY - m.screenY;
          const dist = Math.hypot(dx, dy);
          if (dist < 165 && dist > 1) {
            const falloff = Math.pow(1 - dist / 165, 2);
            const push = falloff * 28 * depthScale;
            screenX += (dx / dist) * push;
            screenY += (dy / dist) * push;
          }
        }

        p.px = screenX;
        p.py = screenY;
        p.pz = finalZ;
        p.pRadius = Math.max(0.85, p.baseRadius * depthScale);

        // Atmospheric depth fog & gentle breathing pulse
        const zNorm = (finalZ + boundZ) / (boundZ * 2); // 0 (far) to 1 (near)
        const pulse = 0.88 + Math.sin(p.pulsePhase) * 0.12;
        p.alpha = Math.max(0.18, Math.min(0.95, (0.28 + zNorm * 0.65) * pulse));
      });

      // 2. DEPTH SORT (Background to foreground for realistic optical occlusion)
      particles.sort((a, b) => a.pz - b.pz);

      // 3. DRAW 3D SPATIAL CONSTELLATION FILAMENTS (Only between neighboring nodes in 3D volume)
      const connectThreshold = 135;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist3D = Math.hypot(dx, dy, dz);

          if (dist3D < connectThreshold) {
            const lineAlpha =
              (1 - dist3D / connectThreshold) *
              Math.min(p1.alpha, p2.alpha) *
              (isLight ? 0.22 : 0.32);

            if (lineAlpha > 0.02) {
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
              ctx.strokeStyle = isLight
                ? `rgba(19, 141, 163, ${lineAlpha})`
                : `rgba(35, 181, 211, ${lineAlpha})`;
              ctx.lineWidth = Math.max(0.4, 0.65 * ((p1.pRadius + p2.pRadius) / 4));
              ctx.stroke();
            }
          }
        }
      }

      // 4. DRAW VOLUMETRIC LUMINOUS CELESTIAL NODES (With soft spherical light dissipation)
      particles.forEach((p) => {
        const glowRadius = p.pRadius * 2.8;
        const grad = ctx.createRadialGradient(
          p.px,
          p.py,
          0,
          p.px,
          p.py,
          glowRadius
        );

        let coreRgb = '247, 247, 255';
        let auraRgb = '35, 181, 211';

        if (isLight) {
          if (p.colorIndex === 0) {
            coreRgb = '217, 67, 100'; // Ruby Pink
            auraRgb = '217, 67, 100';
          } else if (p.colorIndex === 1) {
            coreRgb = '19, 141, 163'; // Deep Teal
            auraRgb = '19, 141, 163';
          } else if (p.colorIndex === 2) {
            coreRgb = '39, 122, 193'; // Royal Cobalt
            auraRgb = '39, 122, 193';
          } else {
            coreRgb = '90, 77, 62'; // Warm Bronze
            auraRgb = '90, 77, 62';
          }
        } else {
          if (p.colorIndex === 0) {
            coreRgb = '255, 190, 205';
            auraRgb = '234, 82, 111'; // Electric Pink
          } else if (p.colorIndex === 1) {
            coreRgb = '195, 248, 255';
            auraRgb = '35, 181, 211'; // Cyber Turquoise
          } else if (p.colorIndex === 2) {
            coreRgb = '200, 230, 255';
            auraRgb = '39, 154, 241'; // Electric Blue
          } else {
            coreRgb = '255, 255, 255';
            auraRgb = '247, 247, 255'; // Specular White
          }
        }

        grad.addColorStop(0, `rgba(${coreRgb}, ${p.alpha})`);
        grad.addColorStop(0.38, `rgba(${auraRgb}, ${p.alpha * 0.7})`);
        grad.addColorStop(1, `rgba(${auraRgb}, 0)`);

        ctx.beginPath();
        ctx.arc(p.px, p.py, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // High-precision sharp photon core for midground & foreground nodes
        if (p.pz > -120) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, Math.max(0.6, p.pRadius * 0.42), 0, Math.PI * 2);
          ctx.fillStyle = isLight
            ? `rgba(36, 33, 29, ${p.alpha})`
            : `rgba(255, 255, 255, ${p.alpha})`;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-80 transition-opacity duration-500">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

