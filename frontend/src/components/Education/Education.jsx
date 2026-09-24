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
            Computer Science studies supported by a strong mathematics and science foundation.
          </p>
        </FadeIn>

        {EDUCATION.map((ed, i) => (
          <FadeIn key={i} delay={0.18}>
            <div className={styles.card}>
              <div className={`${styles.logoWrap} ${ed.logoStyle === "portrait" ? styles.logoWrapPortrait : ""}`}>
                <img
                  src={ed.logo}
                  alt={ed.logoAlt}
                  className={styles.logo}
                  loading="lazy"
                />
              </div>
              <div className={styles.main}>
                <h3 className={styles.degree}>{ed.degree}</h3>
                <p className={styles.institution}>{ed.institution}</p>
                <p className={styles.location}>{ed.location}</p>
                <div className={styles.tags}>
                  {ed.highlights.map((h) => (
                    <span key={h} className={styles.tag}>{h}</span>
                  ))}
                </div>
              </div>
              <span className={styles.period}>{ed.period}</span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
