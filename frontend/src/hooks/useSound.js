import { useState, useEffect, useCallback } from "react";
import {
  isSoundEnabled,
  setSoundEnabled,
  playSwitchSound as playSwitch,
  playTapSound as playTap,
  triggerHaptic,
} from "../utils/sound";

const listeners = new Set();

export function useSound() {
  const [enabled, setEnabled] = useState(() => isSoundEnabled());

  useEffect(() => {
    const listener = (val) => setEnabled(val);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  const toggleSound = useCallback(() => {
    const next = !isSoundEnabled();
    setSoundEnabled(next);
    listeners.forEach((fn) => fn(next));
    if (next) {
      playSwitch();
    }
    triggerHaptic(12);
  }, []);

  const playSwitchSound = useCallback(() => {
    playSwitch();
    triggerHaptic(10);
  }, []);

  const playTapSound = useCallback(() => {
    playTap();
    triggerHaptic(8);
  }, []);

  return {
    soundEnabled: enabled,
    toggleSound,
    playSwitchSound,
    playTapSound,
    triggerHaptic,
  };
}
