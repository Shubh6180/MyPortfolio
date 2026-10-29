import React, { useRef, useEffect } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export const HeroVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    // Mouse coordinates with smoothing
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / height - 0.5) * 2;
      mouse.targetX = nx * 0.8;
      mouse.targetY = ny * 0.8;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Generate 3D Icosahedron Vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVertices: Point3D[] = [
      { x: -1, y: phi, z: 0 },
      { x: 1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi },
      { x: 0, y: 1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 },
      { x: phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
    ].map((p) => {
      const length = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
      const scale = Math.min(width, height) * 0.22;
      return {
        x: (p.x / length) * scale,
        y: (p.y / length) * scale,
        z: (p.z / length) * scale,
      };
    });

    // Edges connecting vertices with distance threshold
    const edges: [number, number][] = [];
    for (let i = 0; i < baseVertices.length; i++) {
      for (let j = i + 1; j < baseVertices.length; j++) {
        const dx = baseVertices[i].x - baseVertices[j].x;
        const dy = baseVertices[i].y - baseVertices[j].y;
        const dz = baseVertices[i].z - baseVertices[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        // Normalized icosahedron edge distance is ~2 / sqrt(1 + phi^2) ~= 1.05 * scale
        if (dist < Math.min(width, height) * 0.26) {
          edges.push([i, j]);
        }
      }
    }

    // Ambient floating particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: (Math.random() - 0.5) * width * 0.9,
      y: (Math.random() - 0.5) * height * 0.9,
      z: (Math.random() - 0.5) * 300,
      size: Math.random() * 1.8 + 0.8,
      speed: Math.random() * 0.005 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }));

    let angleX = 0;
    let angleY = 0;
    let ringAngle = 0;

    // Render loop
    const render = () => {
      // Smooth interpolation for mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      angleY += 0.006 + mouse.x * 0.01;
      angleX += 0.004 + mouse.y * 0.01;
      ringAngle += 0.008;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 3D rotation matrix calculation
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const project = (p: Point3D): { x: number; y: number; z: number; scale: number } => {
        // Rotate around Y
        const x1 = p.x * cosY + p.z * sinY;
        const y1 = p.y;
        const z1 = -p.x * sinY + p.z * cosY;

        // Rotate around X
        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        const fov = 480;
        const scale = fov / (fov + z2);
        return {
          x: cx + x2 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale,
        };
      };

      // 1. Draw Subtle Concentric Technical Grid Rings
      ctx.save();
      ctx.translate(cx, cy);

      // Outer Ring
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width, height) * 0.42, Math.min(width, height) * 0.28, ringAngle * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(35, 181, 211, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.stroke();

      // Secondary Counter-Rotating Ring
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width, height) * 0.36, Math.min(width, height) * 0.22, -ringAngle * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(39, 154, 241, 0.18)';
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 8]);
      ctx.stroke();
      ctx.restore();

      // 2. Project Base 3D Vertices
      const projected = baseVertices.map(project);

      // 3. Draw Wireframe Edges
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.12, Math.min(0.85, (avgZ + 160) / 320));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(35, 181, 211, ${alpha * 0.75})`;
        ctx.lineWidth = 1.2 * ((p1.scale + p2.scale) / 2);
        ctx.setLineDash([]);
        ctx.stroke();
      });

      // 4. Draw Core Inner Octahedral Glow Lines (Pink Accents)
      ctx.beginPath();
      for (let i = 0; i < projected.length; i += 2) {
        const next = (i + 3) % projected.length;
        ctx.moveTo(projected[i].x, projected[i].y);
        ctx.lineTo(projected[next].x, projected[next].y);
      }
      ctx.strokeStyle = 'rgba(234, 82, 111, 0.22)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // 5. Draw Glowing Vertices
      projected.forEach((p, idx) => {
        const isPink = idx % 3 === 0;
        const color = isPink ? '#EA526F' : '#23B5D3';
        const radius = isPink ? 3.8 * p.scale : 2.8 * p.scale;

        // Soft radial glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3.5);
        grad.addColorStop(0, isPink ? 'rgba(234, 82, 111, 0.8)' : 'rgba(35, 181, 211, 0.8)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Node center
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      // 6. Draw Ambient Particles
      particles.forEach((pt) => {
        pt.phase += pt.speed;
        const px = cx + pt.x + Math.sin(pt.phase) * 20;
        const py = cy + pt.y + Math.cos(pt.phase) * 15;
        const alpha = Math.max(0.15, Math.sin(pt.phase * 2) * 0.5 + 0.5);

        ctx.beginPath();
        ctx.arc(px, py, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(247, 247, 255, ${alpha * 0.4})`;
        ctx.fill();
      });

      // 7. Center Telemetry Crosshairs
      ctx.save();
      ctx.strokeStyle = 'rgba(247, 247, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 14, cy);
      ctx.lineTo(cx + 14, cy);
      ctx.moveTo(cx, cy - 14);
      ctx.lineTo(cx, cy + 14);
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] flex items-center justify-center">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-radial from-[#23B5D3]/10 via-[#EA526F]/05 to-transparent blur-3xl pointer-events-none" />

      {/* Primary 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
        title="Interactive 3D Geometric Matrix - Move cursor or touch to rotate"
      />

      {/* Floating HUD Badges & Annotations */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none hidden sm:flex flex-col gap-1 font-mono text-[10px] text-[#23B5D3]/75 bg-[#070600]/70 backdrop-blur-sm border border-[#23B5D3]/20 px-2.5 py-1.5 rounded">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EA526F] animate-pulse" />
          POLYHEDRON: ICOSAHEDRON // 12V 30E
        </span>
        <span className="text-[#F7F7FF]/50 text-[9px]">INTERACTIVE POINTER PARALLAX</span>
      </div>

      <div className="absolute bottom-4 right-4 z-20 pointer-events-none hidden sm:flex flex-col items-end gap-1 font-mono text-[10px] text-[#F7F7FF]/70 bg-[#070600]/70 backdrop-blur-sm border border-[#F7F7FF]/15 px-2.5 py-1.5 rounded">
        <span className="text-[#279AF1]">SYS_COORD: 18.5204° N, 73.8567° E</span>
        <span className="text-[#EA526F] text-[9px]">ENGINEERING MATRIX: ONLINE</span>
      </div>
    </div>
  );
};
