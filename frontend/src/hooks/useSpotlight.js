import { useEffect } from "react";

/**
 * useSpotlight - High-performance mouse spotlight sheen hook
 * Attaches a single passive pointermove listener to window using requestAnimationFrame.
 * Sets --mouse-x and --mouse-y CSS variables on any hovered [data-spotlight="true"] card.
 * Automatically disabled on touch screens to ensure 0% overhead on mobile devices.
 */
export function useSpotlight() {
  useEffect(() => {
    // Disable on touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let frameId = null;

    const handlePointerMove = (e) => {
      if (frameId) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const target = e.target.closest('[data-spotlight="true"]');
        if (!target) return;

        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);
}
