import FadeIn from "../FadeIn";
import { LEADERSHIP } from "../../constants/data";
import styles from "./Leadership.module.css";

export default function Leadership() {
  return (
    <section id="leadership" className={styles.section}>
      <div className="section-inner">
        <FadeIn>
          <p className="section-label">Leadership &amp; Volunteering</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="section-title">Leadership &amp; Volunteering</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="section-description">
            Contributing to university initiatives, community leadership, and impactful web platforms.
          </p>
        </FadeIn>

        {LEADERSHIP.map((item) => (
          <FadeIn key={`${item.organization}-${item.role}`} delay={0.2}>
            <div className={styles.card}>
              <div className={styles.logoWrap}>
                <img
                  src={item.logo}
                  alt={`${item.organization} logo`}
                  className={styles.logo}
                  loading="lazy"
                />
              </div>

              <div className={styles.details}>
                <div className={styles.headerRow}>
                  <div>
                    <h3 className={styles.role}>{item.role}</h3>
                    <div className={styles.orgGroup}>
                      <span className={styles.org}>{item.organization}</span>
                      {item.subtitle && (
                        <span className={styles.subtitle}>{item.subtitle}</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.headerActions}>
                    <span className={styles.period}>{item.period}</span>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkBtn}
                        aria-label={`Visit ${item.organization} website`}
                      >
                        Visit Website ↗
                      </a>
                    )}
                  </div>
                </div>

                <p className={styles.description}>{item.description}</p>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className={styles.highlights}>
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className={styles.highlightItem}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                <div className={styles.skills} aria-label="Skills & technologies used">
                  {item.skills.map((skill) => (
                    <span key={skill} className={styles.skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
