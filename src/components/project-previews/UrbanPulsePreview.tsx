import React, { useState, useEffect } from 'react';
import { Radio, AlertTriangle, Cpu, Navigation2, RefreshCw } from 'lucide-react';
import { sound } from '../../utils/audio';

export const UrbanPulsePreview: React.FC = () => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const telemetryFrames = [
    {
      coords: "18.5204° N, 73.8567° E",
      busId: "FLEET_PUNE_BUS_42",
      defectType: "POTHOLE DEEP DEPRESSION",
      severity: 8.6,
      status: "CRITICAL",
      actionNeeded: "Urgent Pavement Triage",
      bbox: { x: 48, y: 55, w: 28, h: 22 }
    },
    {
      coords: "18.5289° N, 73.8612° E",
      busId: "FLEET_PUNE_BUS_19",
      defectType: "LONGITUDINAL SURFACE CRACK",
      severity: 4.1,
      status: "MODERATE",
      actionNeeded: "Scheduled Sealing",
      bbox: { x: 25, y: 45, w: 35, h: 18 }
    },
    {
      coords: "18.5350° N, 73.8700° E",
      busId: "FLEET_PUNE_BUS_07",
      defectType: "MANHOLE ELEVATION OFFSET",
      severity: 6.9,
      status: "HIGH",
      actionNeeded: "Leveling Alignment",
      bbox: { x: 60, y: 62, w: 24, h: 20 }
    }
  ];

  const currentFrame = telemetryFrames[frameIndex];

  const triggerNextScan = () => {
    sound.click();
    setIsScanning(true);
    setTimeout(() => {
      setFrameIndex((prev) => (prev + 1) % telemetryFrames.length);
      setIsScanning(false);
      sound.hover();
    }, 400);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % telemetryFrames.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [telemetryFrames.length]);

  return (
    <div className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl overflow-hidden text-xs font-mono shadow-2xl">
      {/* Telemetry Header */}
      <div className="bg-[var(--bg-surface-elevated)] px-3 py-2 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio size={14} className="text-[var(--color-pink)] animate-pulse" />
          <span className="font-display font-bold text-[var(--text-primary)]">URBANPULSE AI // TELEMETRY HUB</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--color-turquoise)] bg-[var(--color-turquoise)]/10 px-2 py-0.5 rounded border border-[var(--color-turquoise)]/20">
            PROPOSED SYSTEM ARCHITECTURE
          </span>
          <button
            onClick={triggerNextScan}
            className="p-1 hover:text-[var(--color-pink)] transition-colors"
            title="Simulate next telemetry feed"
            aria-label="Simulate next telemetry feed"
          >
            <RefreshCw size={12} className={isScanning ? 'animate-spin text-[var(--color-pink)]' : ''} />
          </button>
        </div>
      </div>

      {/* Simulated Road Viewport with Perspective Wireframe */}
      <div className="relative h-44 bg-[var(--bg-primary)] overflow-hidden flex items-center justify-center border-b border-[var(--border-subtle)]">
        {/* Synthetic Vanishing Grid */}
        <div className="absolute inset-0 opacity-20 bg-tech-grid" />
        
        {/* Road Perspective Lines */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <line x1="15%" y1="100%" x2="45%" y2="20%" stroke="var(--color-turquoise)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <line x1="85%" y1="100%" x2="55%" y2="20%" stroke="var(--color-turquoise)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <line x1="50%" y1="100%" x2="50%" y2="20%" stroke="var(--color-pink)" strokeWidth="1.5" strokeDasharray="8 12" opacity="0.7" />
        </svg>

        {/* Dynamic AI Detection Bounding Box */}
        <div
          className={`absolute transition-all duration-300 border-2 rounded ${
            currentFrame.status === 'CRITICAL'
              ? 'border-[var(--color-pink)] bg-[var(--color-pink)]/15 shadow-[0_0_15px_rgba(234,82,111,0.4)]'
              : 'border-[var(--color-turquoise)] bg-[var(--color-turquoise)]/15 shadow-[0_0_15px_rgba(35,181,211,0.4)]'
          }`}
          style={{
            left: `${currentFrame.bbox.x}%`,
            top: `${currentFrame.bbox.y}%`,
            width: `${currentFrame.bbox.w}%`,
            height: `${currentFrame.bbox.h}%`,
          }}
        >
          {/* Target Corner Indicators */}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-current" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-current" />

          {/* AI Tag Overlay */}
          <div className="absolute -top-5 left-0 whitespace-nowrap bg-[var(--bg-surface)]/95 border border-[var(--border-subtle)] px-1.5 py-0.5 rounded text-[9px] shadow-sm">
            <span className={currentFrame.status === 'CRITICAL' ? 'text-[var(--color-pink)] font-bold' : 'text-[var(--color-turquoise)] font-bold'}>
              {currentFrame.defectType} ({currentFrame.severity}/10)
            </span>
          </div>
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-turquoise)]/08 to-transparent pointer-events-none animate-scanline" />

        {/* Live HUD Overlay */}
        <div className="absolute top-2 left-2 flex items-center gap-2 text-[10px] bg-[var(--bg-surface)]/90 px-2 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-sm">
          <Navigation2 size={11} className="text-[var(--color-turquoise)]" />
          <span>{currentFrame.coords}</span>
        </div>

        <div className="absolute top-2 right-2 text-[10px] bg-[var(--bg-surface)]/90 px-2 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--color-blue)] shadow-sm font-semibold">
          NODE: {currentFrame.busId}
        </div>
      </div>

      {/* Telemetry Tele-stats Bar */}
      <div className="p-3 bg-[var(--bg-surface)] grid grid-cols-3 gap-2 text-[10px]">
        <div className="p-1.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded">
          <span className="text-[var(--text-muted)] block text-[9px]">AI INFERENCE</span>
          <span className="text-[var(--color-turquoise)] font-bold flex items-center gap-1">
            <Cpu size={11} /> YOLO-Edge
          </span>
        </div>

        <div className="p-1.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded">
          <span className="text-[var(--text-muted)] block text-[9px]">SEVERITY INDEX</span>
          <span className={`font-bold flex items-center gap-1 ${currentFrame.status === 'CRITICAL' ? 'text-[var(--color-pink)]' : 'text-amber-500'}`}>
            <AlertTriangle size={11} /> {currentFrame.severity}/10
          </span>
        </div>

        <div className="p-1.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded">
          <span className="text-[var(--text-muted)] block text-[9px]">DISPATCH</span>
          <span className="text-[var(--text-primary)] font-medium truncate block">{currentFrame.actionNeeded}</span>
        </div>
      </div>

      <div className="px-3 py-1.5 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] flex items-center justify-between text-[9px] text-[var(--text-muted)]">
        <span>PROPOSED SENSING PIPELINE: EDGE CAMERA + GPS + TRIAGE</span>
        <span className="text-[var(--color-pink)] font-bold">CONCEPT SPECIFICATION</span>
      </div>
    </div>
  );
};

