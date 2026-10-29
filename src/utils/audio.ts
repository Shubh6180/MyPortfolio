// Bespoke Web Audio Synthesizer for subtle studio-grade haptic audio feedback
class SoundSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // Default muted for unobtrusive UX

  constructor() {
    // Check saved state
    const saved = localStorage.getItem('sound_muted');
    if (saved !== null) {
      this.isMuted = saved === 'true';
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('sound_muted', String(this.isMuted));
    if (!this.isMuted) {
      this.playTone(520, 'sine', 0.05, 0.08);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.04, volume: number = 0.05) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio failed or blocked by browser policy
    }
  }

  public hover() {
    this.playTone(380, 'sine', 0.03, 0.02);
  }

  public click() {
    this.playTone(640, 'triangle', 0.06, 0.06);
  }

  public switch() {
    this.playTone(880, 'sine', 0.08, 0.04);
  }

  public success() {
    if (this.isMuted) return;
    this.playTone(523.25, 'sine', 0.08, 0.05);
    setTimeout(() => this.playTone(659.25, 'sine', 0.08, 0.05), 80);
    setTimeout(() => this.playTone(783.99, 'sine', 0.12, 0.06), 160);
  }
}

export const sound = new SoundSystem();

