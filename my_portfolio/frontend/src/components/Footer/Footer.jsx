import { OWNER } from "../../constants/data";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.logo}>
          N<span className={styles.dot}>.</span>
        </span>

        <span className={styles.copy}>
          © {new Date().getFullYear()} {OWNER.name} — Designed &amp; built with care
        </span>

        <div className={styles.links}>
          {[
            { label: "GitHub",   href: OWNER.github },
            { label: "LinkedIn", href: OWNER.linkedin },
            { label: "Email",    href: `mailto:${OWNER.email}` },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
