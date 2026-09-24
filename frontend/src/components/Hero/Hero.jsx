import { OWNER } from "../../constants/data";
import styles from "./Hero.module.css";

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
    <section id="home" className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.tag}>
          Available for internships · {OWNER.university}
        </p>

        <h1 className={styles.name}>
          Nisadu <span className={styles.gold}>Nimsitha</span>
        </h1>

        <p className={styles.role}>{OWNER.title}</p>

        <p className={styles.sub}>
          I build practical software systems across web, mobile, machine learning and cloud infrastructure.
        </p>

        <div className={styles.ctas}>
          <button type="button" className={styles.ctaPrimary} onClick={() => scrollTo("projects")}>
            View Projects
          </button>
          <button type="button" className={styles.ctaSecondary} onClick={() => scrollTo("contact")}>
            Let&apos;s Connect
          </button>
          <button type="button" className={styles.ctaTertiary} onClick={handleResume}>
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
