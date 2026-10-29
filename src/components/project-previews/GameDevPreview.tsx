import React, { useRef, useEffect, useState } from 'react';
import { Gamepad2, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

export const GameDevPreview: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    const height = (canvas.height = 190);
    const cx = width / 2;
    const cy = height / 2;

    let shieldAngle = 0;
    const shieldRadius = 45;
    const shieldArc = Math.PI * 0.45; // ~80 degrees

    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      speed: number;
      radius: number;
      color: string;
    }

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }

    let sparks: Spark[] = [];
    let explosionParticles: Particle[] = [];
    let currentScore = 0;
    let isAlive = true;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - cx;
      const my = e.clientY - rect.top - cy;
      shieldAngle = Math.atan2(my, mx);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const mx = e.touches[0].clientX - rect.left - cx;
        const my = e.touches[0].clientY - rect.top - cy;
        shieldAngle = Math.atan2(my, mx);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    const spawnSpark = () => {
      if (!isAlive) return;
      const spawnAngle = Math.random() * Math.PI * 2;
      const dist = Math.max(width, height) * 0.65;
      const sx = cx + Math.cos(spawnAngle) * dist;
      const sy = cy + Math.sin(spawnAngle) * dist;

      const angleToCore = Math.atan2(cy - sy, cx - sx);
      const speed = Math.random() * 1.2 + 1.2;

      sparks.push({
        x: sx,
        y: sy,
        vx: Math.cos(angleToCore) * speed,
        vy: Math.sin(angleToCore) * speed,
        speed,
        radius: 3.5,
        color: Math.random() > 0.4 ? '#EA526F' : '#279AF1',
      });
    };

    let spawnTimer = setInterval(spawnSpark, 850);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background Grid
      ctx.strokeStyle = 'rgba(247, 247, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += 25) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 25) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Center Core
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = isAlive ? '#23B5D3' : '#EA526F';
      ctx.fill();
      ctx.strokeStyle = '#F7F7FF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Shield Orbit Guide
      ctx.beginPath();
      ctx.arc(cx, cy, shieldRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(35, 181, 211, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Interactive Shield Arc
      if (isAlive) {
        ctx.beginPath();
        ctx.arc(cx, cy, shieldRadius, shieldAngle - shieldArc / 2, shieldAngle + shieldArc / 2);
        ctx.strokeStyle = '#23B5D3';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#23B5D3';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Update and Draw Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;

        // Draw Spark
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Check Collision with Shield
        const distFromCenter = Math.hypot(s.x - cx, s.y - cy);
        if (Math.abs(distFromCenter - shieldRadius) < 7) {
          const sparkAngle = Math.atan2(s.y - cy, s.x - cx);
          let diff = Math.abs(sparkAngle - shieldAngle);
          while (diff > Math.PI) diff = Math.abs(diff - Math.PI * 2);

          if (diff < shieldArc / 2) {
            // Deflected!
            sound.click();
            currentScore += 10;
            setScore(currentScore);

            // Spawn deflection sparks
            for (let p = 0; p < 8; p++) {
              explosionParticles.push({
                x: s.x,
                y: s.y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                alpha: 1,
                color: '#23B5D3',
              });
            }

            sparks.splice(i, 1);
            continue;
          }
        }

        // Check Core Collision (Game Over)
        if (distFromCenter < 16) {
          isAlive = false;
          setGameOver(true);
          sound.playTone(220, 'sawtooth', 0.15, 0.08);

          // Explode core
          for (let p = 0; p < 20; p++) {
            explosionParticles.push({
              x: cx,
              y: cy,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              alpha: 1,
              color: '#EA526F',
            });
          }
          sparks.splice(i, 1);
        }
      }

      // Render explosion particles
      for (let p = explosionParticles.length - 1; p >= 0; p--) {
        const pt = explosionParticles[p];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.04;
        if (pt.alpha <= 0) {
          explosionParticles.splice(p, 1);
        } else {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = pt.alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      clearInterval(spawnTimer);
      cancelAnimationFrame(animId);
    };
  }, [gameStarted]);

  const restartGame = () => {
    sound.switch();
    setScore(0);
    setGameOver(false);
    setGameStarted((prev) => !prev);
  };

  return (
    <div className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl overflow-hidden text-xs font-mono shadow-2xl">
      {/* Header Bar */}
      <div className="bg-[var(--bg-surface-elevated)] px-3 py-2 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gamepad2 size={14} className="text-[var(--color-turquoise)]" />
          <span className="font-display font-bold text-[var(--text-primary)]">ORBIT DEFLECTOR // 2D CANVAS ENGINE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[var(--color-pink)] font-bold">
            <Trophy size={12} /> {score} PTS
          </span>
          <button
            onClick={restartGame}
            className="flex items-center gap-1 px-2 py-0.5 bg-[var(--color-turquoise)]/20 hover:bg-[var(--color-turquoise)]/30 text-[var(--color-turquoise)] rounded text-[10px] transition-colors font-semibold"
          >
            <RotateCcw size={10} /> Reset
          </button>
        </div>
      </div>

      {/* Playable Canvas */}
      <div className="relative h-[190px] bg-[var(--bg-primary)] cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Hover Guide Instructions */}
        <div className="absolute top-2 left-2 pointer-events-none text-[10px] text-[var(--text-muted)] bg-[var(--bg-surface)]/85 px-2 py-0.5 rounded border border-[var(--border-subtle)] shadow-sm">
          <span>MOVE MOUSE OR TOUCH TO ROTATE DEFLECTOR SHIELD</span>
        </div>

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-[var(--bg-primary)]/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
            <span className="text-[var(--color-pink)] font-bold text-sm mb-1">CORE BREACH DETECTED</span>
            <p className="text-[var(--text-secondary)] text-[11px] mb-3">Collision threshold exceeded. Score: {score}</p>
            <button
              onClick={restartGame}
              className="px-3 py-1.5 bg-[var(--color-pink)] hover:opacity-95 text-white font-bold text-xs rounded transition-colors"
            >
              Restart Engine Loop
            </button>
          </div>
        )}
      </div>

      {/* Footer Notes */}
      <div className="px-3 py-1.5 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] flex items-center justify-between text-[9px] text-[var(--text-muted)]">
        <span className="flex items-center gap-1">
          <Sparkles size={10} className="text-[var(--color-turquoise)]" /> WHITEHAT JR FOUNDATIONS: 2D MATRICES & TICK LOOPS
        </span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">FPS: 60 (SYNCHRONIZED)</span>
      </div>
    </div>
  );
};

