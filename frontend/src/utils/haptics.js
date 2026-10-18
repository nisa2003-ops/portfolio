/**
 * Pure Tactile Micro-Haptic Feedback
 * Triggers subtle vibration pulses on supported mobile devices.
 * 100% silent, 0 audio dependencies, 0kb bundle.
 */
export function triggerHaptic(duration = 8) {
  if (typeof window === "undefined") return;
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    try {
      navigator.vibrate(duration);
    } catch {
      // Ignore if haptics are disabled or unsupported
    }
  }
}
