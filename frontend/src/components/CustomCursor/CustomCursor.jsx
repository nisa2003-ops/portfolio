import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./CustomCursor.module.css";

/**
 * CustomCursor - Option 1: Fluid Aurora Dot & Trailing Halo
 * - Central precision dot (zero latency, exact viewport tracking)
 * - Fluid spring-trailing halo (Apple & Linear inspired)
 * - Scale & aurora sheen expansion on interactive element hover
 * - Tactile scale-down response on click / pointerdown
 * - Direct DOM transforms via requestAnimationFrame (120fps smooth)
 * - Rendered directly to document.body via createPortal to remain fixed across all scroll sections
 * - Strictly excluded on touch & mobile screens (pointer: coarse)
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const haloRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only activate if device has a fine pointer (desktop mouse / trackpad)
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setMounted(true);

    let targetX = -100;
    let targetY = -100;
    let haloX = -100;
    let haloY = -100;
    let isVisible = false;
    let isHovering = false;
    let isClicking = false;
    let rafId = null;

    document.body.classList.add("custom-cursor-active");

    const updateClasses = () => {
      if (!haloRef.current) return;
      if (isHovering) {
        haloRef.current.classList.add(styles.isHovering);
      } else {
        haloRef.current.classList.remove(styles.isHovering);
      }

      if (isClicking) {
        haloRef.current.classList.add(styles.isClicking);
      } else {
        haloRef.current.classList.remove(styles.isClicking);
      }
    };

    const render = () => {
      // Fluid trailing interpolation (spring ease)
      haloX += (targetX - haloX) * 0.18;
      haloY += (targetY - haloY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
        dotRef.current.style.opacity = isVisible ? "1" : "0";
      }

      if (haloRef.current) {
        const scale = isClicking ? 0.85 : isHovering ? 1.55 : 1;
        haloRef.current.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) scale(${scale})`;
        haloRef.current.style.opacity = isVisible ? "1" : "0";
      }

      rafId = requestAnimationFrame(render);
    };

    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) isVisible = true;

      // Check if cursor is over an interactive element
      const target = e.target;
      const interactive = target && target.closest(
        'a, button, [role="button"], [role="tab"], input, select, textarea, summary, [data-spotlight="true"], label'
      );

      const nextHover = Boolean(interactive);
      if (nextHover !== isHovering) {
        isHovering = nextHover;
        updateClasses();
      }
    };

    const onPointerDown = () => {
      isClicking = true;
      updateClasses();
    };

    const onPointerUp = () => {
      isClicking = false;
      updateClasses();
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    const onMouseEnter = () => {
      isVisible = true;
    };

    const onScroll = () => {
      if (!isVisible) return;
      const elem = document.elementFromPoint(targetX, targetY);
      const interactive = elem && elem.closest(
        'a, button, [role="button"], [role="tab"], input, select, textarea, summary, [data-spotlight="true"], label'
      );
      const nextHover = Boolean(interactive);
      if (nextHover !== isHovering) {
        isHovering = nextHover;
        updateClasses();
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    rafId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <>
      <div ref={dotRef} className={styles.cursorDot} aria-hidden="true" />
      <div ref={haloRef} className={styles.cursorHalo} aria-hidden="true" />
    </>,
    document.body
  );
}
