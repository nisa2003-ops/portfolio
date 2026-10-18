import { useCallback } from "react";
import { triggerHaptic } from "../utils/haptics";

/**
 * useHaptics - Clean hook for subtle tactile feedback
 * Provides micro-pulses for taps (8ms) and toggles (12ms) on mobile/touch screens.
 */
export function useHaptics() {
  const triggerTapHaptic = useCallback(() => {
    triggerHaptic(8);
  }, []);

  const triggerSwitchHaptic = useCallback(() => {
    triggerHaptic(12);
  }, []);

  return {
    triggerHaptic,
    triggerTapHaptic,
    triggerSwitchHaptic,
  };
}
