"use client";

// Web Audio API Synthesizer - Zero external dependencies, 100% reliable & royalty-free
class SoundController {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (enabled) {
      this.initCtx();
    }
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  public toggle(): boolean {
    this.setEnabled(!this.isEnabled);
    return this.isEnabled;
  }

  // Realistic Katana Blade Swing Whoosh
  public playWhoosh() {
    if (!this.isEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // White noise buffer for wind/air friction
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.22);
      filter.Q.setValueAtTime(4, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.25);
    } catch {
      // Audio context failure gracefully ignored
    }
  }

  // Crisp Katana Slice & Metallic Ring
  public playSlash() {
    if (!this.isEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Part 1: High metallic blade slice transient
      const sliceOsc = this.ctx.createOscillator();
      sliceOsc.type = "sawtooth";
      sliceOsc.frequency.setValueAtTime(2400, now);
      sliceOsc.frequency.exponentialRampToValueAtTime(450, now + 0.15);

      const sliceGain = this.ctx.createGain();
      sliceGain.gain.setValueAtTime(0.25, now);
      sliceGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      sliceOsc.connect(sliceGain);
      sliceGain.connect(this.ctx.destination);
      sliceOsc.start(now);
      sliceOsc.stop(now + 0.18);

      // Part 2: Metallic harmonic resonance (Steel ring)
      const ringOsc = this.ctx.createOscillator();
      ringOsc.type = "sine";
      ringOsc.frequency.setValueAtTime(1850, now);
      ringOsc.frequency.exponentialRampToValueAtTime(1750, now + 0.45);

      const ringGain = this.ctx.createGain();
      ringGain.gain.setValueAtTime(0.12, now);
      ringGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.45);

      ringOsc.connect(ringGain);
      ringGain.connect(this.ctx.destination);
      ringOsc.start(now);
      ringOsc.stop(now + 0.45);

      // Part 3: Air slice impact noise
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = "highpass";
      noiseFilter.frequency.setValueAtTime(1200, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.12);
    } catch {
      // Audio context failure gracefully ignored
    }
  }

  // Soft Japanese Zen Sakura Chime on State Shift
  public playSakuraChime() {
    if (!this.isEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Traditional Japanese Insen pentatonic frequencies
      const frequencies = [880, 1056, 1174, 1320, 1584];
      const freq = frequencies[Math.floor(Math.random() * frequencies.length)];

      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    } catch {
      // Audio context failure gracefully ignored
    }
  }
}

export const soundFX = new SoundController();
