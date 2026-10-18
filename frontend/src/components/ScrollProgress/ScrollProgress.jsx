import { useState, useEffect } from "react";
import styles from "./ScrollProgress.module.css";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = (window.scrollY / scrollHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.progressContainer} aria-hidden="true">
      <div
        className={styles.progressBar}
        style={{ width: `${scrollProgress}%` }}
      />
      {scrollProgress > 0 && scrollProgress < 100 && (
        <div
          className={styles.leadingGlow}
          style={{ left: `${scrollProgress}%` }}
        />
      )}
    </div>
  );
}
