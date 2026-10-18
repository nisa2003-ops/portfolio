/**
 * Web Audio API Sound Synthesizer & Micro-Haptics
 * 0kb audio bundle - all sounds generated procedurally via browser AudioContext.
 * Zero network requests, 0ms playback latency, beautifully tuned gain envelopes.
 */

const STORAGE_KEY = "portfolio_sound_enabled";

let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

export function isSoundEnabled() {
  if (typeof window === "undefined") return true;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === null ? true : saved !== "false";
  } catch {
    return true;
  }
}

export function setSoundEnabled(enabled) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");
  } catch {
    // Ignore localStorage errors
  }
}

export function triggerHaptic(duration = 8) {
  if (typeof window === "undefined") return;
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    try {
      navigator.vibrate(duration);
    } catch {
      // Haptics not allowed or not supported
    }
  }
}

/**
 * Premium mechanical switch click (dual micro-transients)
 * Used for theme switch and sound toggle
 */
export function playSwitchSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Transient 1: Initial mechanical snap
  try {
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const filter1 = ctx.createBiquadFilter();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1150, now);
    osc1.frequency.exponentialRampToValueAtTime(260, now + 0.02);

    filter1.type = "lowpass";
    filter1.frequency.setValueAtTime(2400, now);

    gain1.gain.setValueAtTime(0.065, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);

    osc1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.025);
  } catch {
    // Safely ignore audio glitch
  }

  // Transient 2: Follow-up tactile switch tick (7ms later)
  try {
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    const filter2 = ctx.createBiquadFilter();

    const t2 = now + 0.008;
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(800, t2);
    osc2.frequency.exponentialRampToValueAtTime(180, t2 + 0.018);

    filter2.type = "lowpass";
    filter2.frequency.setValueAtTime(1900, t2);

    gain2.gain.setValueAtTime(0.045, t2);
    gain2.gain.exponentialRampToValueAtTime(0.0001, t2 + 0.022);

    osc2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(t2);
    osc2.stop(t2 + 0.024);
  } catch {
    // Safely ignore audio glitch
  }
}

/**
 * Subtle acoustic tactile tap
 * Used for filter tabs, category pills, and navigation buttons
 */
export function playTapSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.022);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1600, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.026);
  } catch {
    // Safely ignore audio glitch
  }
}
