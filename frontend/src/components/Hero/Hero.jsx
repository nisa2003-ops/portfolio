import { OWNER } from "../../constants/data";
import styles from "./Hero.module.css";
import { useState, useEffect } from "react";

const FIRST = OWNER.name.split(" ")[0];
const LAST = OWNER.name.split(" ").slice(1).join(" ") || "Nimsitha";

function ContinuousName() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | typingFirst | typingLast | pauseFull | deletingLast | deletingFirst | pauseEmpty
  const [isDeletingLastChar, setIsDeletingLastChar] = useState(false);

  // Tuning
  const TYPE_SPEED = 90;
  const DELETE_SPEED = 45;
  const PAUSE_FULL = 2800; // how long name stays fully visible
  const PAUSE_EMPTY = 900; // pause before retyping
  const START_DELAY = 400;

  useEffect(() => {
    let timeout;

    if (phase === "idle") {
      timeout = setTimeout(() => setPhase("typingFirst"), START_DELAY);
    } else if (phase === "typingFirst") {
      if (first.length < FIRST.length) {
        timeout = setTimeout(() => {
          setFirst(FIRST.slice(0, first.length + 1));
        }, TYPE_SPEED);
      } else {
        setPhase("typingLast");
      }
    } else if (phase === "typingLast") {
      if (last.length < LAST.length) {
        timeout = setTimeout(() => {
          setLast(LAST.slice(0, last.length + 1));
        }, TYPE_SPEED);
      } else {
        setPhase("pauseFull");
      }
    } else if (phase === "pauseFull") {
      timeout = setTimeout(() => setPhase("deletingLast"), PAUSE_FULL);
    } else if (phase === "deletingLast") {
      if (last.length > 0) {
        timeout = setTimeout(() => {
          setLast(LAST.slice(0, last.length - 1));
        }, DELETE_SPEED);
      } else {
        setPhase("deletingFirst");
      }
    } else if (phase === "deletingFirst") {
      if (first.length > 0) {
        timeout = setTimeout(() => {
          setFirst(FIRST.slice(0, first.length - 1));
        }, DELETE_SPEED);
      } else {
        setPhase("pauseEmpty");
      }
    } else if (phase === "pauseEmpty") {
      timeout = setTimeout(() => setPhase("typingFirst"), PAUSE_EMPTY);
    }

    return () => clearTimeout(timeout);
  }, [phase, first, last]);

  // Cursor position: show on whichever line is active, or both when full
  const showCursorFirst = phase === "typingFirst" || (phase === "deletingFirst" && first.length > 0) || (phase === "pauseEmpty");
  const showCursorLast = phase === "typingLast" || phase === "pauseFull" || phase === "deletingLast" || (phase === "deletingFirst" && last.length === 0);

  // When fully typed, show cursor on last line
  const isFull = phase === "pauseFull";

  return (
    <span>
      <span className={styles.nameLine}>
        {first}
        {showCursorFirst && !isFull && <span className={styles.cursor}>|</span>}
        {/* Keep space so line height stays when empty */}
        {first.length === 0 && phase !== "pauseEmpty" && <span className={styles.cursorGhost}>|</span>}
      </span>
      <br />
      <span className={`${styles.gold} ${styles.nameLine}`}>
        {last}
        {(showCursorLast || isFull) && <span className={styles.cursor}>|</span>}
      </span>
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
          Available for work · {OWNER.title} · {OWNER.university}
        </p>

        <h1 className={styles.name}>
          <ContinuousName />
        </h1>

        <p className={styles.sub}>
          Building polished, purposeful software from AI-powered mobile apps and
          full-stack web experiences to DevOps pipelines and Machine Learning solutions.
        </p>

        <div className={styles.ctas}>
          <button className={styles.ctaPrimary} onClick={() => scrollTo("projects")}>
            View my work
          </button>
          <button className={styles.ctaSecondary} onClick={handleResume}>
            ↓ Download CV
          </button>
        </div>

        <div className={styles.socials}>
          {[
            { icon: "↗", label: "GitHub", href: OWNER.github },
            { icon: "↗", label: "LinkedIn", href: OWNER.linkedin },
            { icon: "✉", label: "Email", href: `mailto:${OWNER.email}` },
          ].map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              {label} {icon}
            </a>
          ))}
        </div>
      </div>

      <div className={styles.avatarWrap}>
        <div className={styles.ring1} />
        <div className={styles.ring2} />

        <div className={styles.avatar}>
          <img
            src="/Nisadu.jpeg"
            alt={OWNER.name}
            className={styles.avatarImg}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div className={styles.monogram} style={{ display: "none", position: "absolute" }}>
            N
          </div>
        </div>

        <div className={styles.badge}>Colombo, LK · CS Student</div>
      </div>
    </section>
  );
}