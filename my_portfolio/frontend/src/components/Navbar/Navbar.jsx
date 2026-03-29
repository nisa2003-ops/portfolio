import { useState, useEffect } from "react";
import { NAV_LINKS, OWNER } from "../../constants/data";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [active, setActive]     = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((n) =>
      document.getElementById(n.toLowerCase())
    );
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleResume = () => {
    const a = document.createElement("a");
    a.href = OWNER.resumeUrl;
    a.download = "Nisadu_Nimsitha_Resume.pdf";
    a.click();
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <span
          className={styles.logo}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          N<span className={styles.dot}>.</span>
        </span>

        {/* Desktop */}
        <div className={styles.links}>
          {NAV_LINKS.map((n) => (
            <button
              key={n}
              className={`${styles.link} ${active === n.toLowerCase() ? styles.linkActive : ""}`}
              onClick={() => scrollTo(n.toLowerCase())}
            >
              {n}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.bar1Open : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barHide : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.bar3Open : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((n) => (
            <button
              key={n}
              className={styles.mobileLink}
              onClick={() => scrollTo(n.toLowerCase())}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
