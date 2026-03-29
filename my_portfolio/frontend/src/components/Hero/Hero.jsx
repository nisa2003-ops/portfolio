import { OWNER } from "../../constants/data";
import styles from "./Hero.module.css";

export default function Hero() {
  const handleResume = () => {
    const a = document.createElement("a");
    a.href = OWNER.resumeUrl;
    a.download = "Nisadu_Perera_Resume.pdf";
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
          {OWNER.name.split(" ")[0]}
          <br />
          <span className={styles.gold}>{OWNER.name.split(" ")[1]}</span>
        </h1>

        <p className={styles.sub}>
          Building polished, purposeful software — from AI-powered mobile apps
          to full-stack web experiences.
        </p>

        <div className={styles.ctas}>
          <button className={styles.ctaPrimary} onClick={() => scrollTo("projects")}>
            View Projects
          </button>
        </div>

        <div className={styles.socials}>
          {[
            { icon: "⌥", label: "GitHub",   href: OWNER.github },
            { icon: "◈", label: "LinkedIn", href: OWNER.linkedin },
            { icon: "✉", label: "Email",    href: `mailto:${OWNER.email}` },
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
          {<img src="/public/Nisadu.jpeg" alt={OWNER.name} className={styles.avatarImg} /> }
        </div>

        <div className={styles.badge}>{OWNER.location}</div>
      </div>
    </section>
  );
}
