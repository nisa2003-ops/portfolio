import FadeIn from "../FadeIn";
import { EDUCATION } from "../../constants/data";
import styles from "./Education.module.css";

export default function Education() {
  return (
    <section id="education" className={styles.section}>
      <div className="section-inner">
        <FadeIn><p className="section-label">Education</p></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title">Academic Background</h2></FadeIn>
        <FadeIn delay={0.15}>
          <p className="section-description">
            Education and milestones that shaped my technical foundation.
          </p>
        </FadeIn>

        <ol className={styles.timeline} role="list" aria-label="Education milestones">
          {EDUCATION.map((ed, i) => (
            <li key={`${ed.institution}-${ed.degree}`} className={`${styles.milestone} ${i === 0 ? styles.featuredMilestone : ""}`}>
              <span className={styles.node} aria-hidden="true" />
              <FadeIn delay={0.08 * i}>
                <article className={`${styles.card} ${i === 0 ? styles.featured : ""}`}>
                  <div className={styles.header}>
                    <div className={`${styles.logoWrap} ${ed.logoStyle === "portrait" ? styles.logoWrapPortrait : ""}`}>
                      <img
                        src={ed.logo}
                        alt={ed.logoAlt}
                        className={styles.logo}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className={styles.main}>
                      <h3 className={styles.degree}>{ed.degree}</h3>
                      <p className={styles.institution}>{ed.institution}</p>
                      {i === 0 && <p className={styles.studyAreas}>Computer Science · Statistics · Mathematics</p>}
                    </div>
                  </div>

                  <div className={styles.metadata}>
                    <p className={styles.location}>{ed.location}</p>
                    <span className={styles.period}>{ed.period}</span>
                  </div>

                  <div className={styles.details}>
                    <p className={styles.detailLabel}>{i === 0 ? "Current modules" : "Results"}</p>
                    <ul className={styles.tags}>
                      {ed.highlights.map((h) => (
                        <li key={h} className={styles.tag}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
