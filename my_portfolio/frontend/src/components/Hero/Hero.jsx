import { OWNER } from "../../constants/data";
import styles from "./Hero.module.css";
import { useState, useEffect } from "react";

const FIRST = OWNER.name.split(" ")[0];
const LAST = OWNER.name.split(" ")[1];

function TypeWriter({ text, delay = 0, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) { setDone(true); return; }
    const t = setTimeout(
      () => setDisplayed(text.slice(0, displayed.length + 1)),
      85
    );
    return () => clearTimeout(t);
  }, [started, displayed, text]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className={styles.cursor}>|</span>}
    </span>
  );
}

export default function Hero() {
  const handleResume = () => {
    const a = document.createElement("a");
    a.href = OWNER.resumeUrl;
    a.download = "Nisadu_Nimsitha_Resume.pdf";
    a.click();
  };

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.tag}>
          {OWNER.title} · {OWNER.university}
        </p>

        <h1 className={styles.name}>
          <TypeWriter text={FIRST} delay={300} />
          <br />
          <span className={styles.gold}>
            <TypeWriter text={LAST} delay={300 + FIRST.length * 85 + 200} />
          </span>
        </h1>

        <p className={styles.sub}>
          Building polished, purposeful software from AI powered mobile apps
          to full stack web experiences.
        </p>

        <div className={styles.ctas}>
          <button className={styles.ctaPrimary} onClick={() => scrollTo("projects")}>
            View Projects
          </button>
        </div>

        <div className={styles.socials}>
          {[
            { icon: "⌥", label: "GitHub", href: OWNER.github },
            { icon: "◈", label: "LinkedIn", href: OWNER.linkedin },
            { icon: "✉", label: "Email", href: `mailto:${OWNER.email}` },
          ].map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <span>{icon}</span> {label}
            </a>
          ))}
        </div>
      </div>

      {/* Avatar */}
      <div className={styles.avatarWrap}>
        <div className={styles.ring1} />
        <div className={styles.ring2} />

        <div className={styles.avatar}>
          {<img src="/Nisadu.jpeg" alt={OWNER.name} className={styles.avatarImg} />}
        </div>

        <div className={styles.badge}>{OWNER.location}</div>
      </div>
    </section>
  );
}
