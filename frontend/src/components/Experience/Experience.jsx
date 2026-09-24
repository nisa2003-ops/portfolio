import FadeIn from "../FadeIn";
import { EXPERIENCE } from "../../constants/data";
import styles from "./Experience.module.css";

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className="section-inner">
        <FadeIn>
          <p className="section-label">Experience</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="section-title">Professional Experience</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="section-description">
            Customer-facing experience that strengthened communication, listening and practical problem solving.
          </p>
        </FadeIn>

        {EXPERIENCE.map((experience) => (
          <FadeIn key={`${experience.company}-${experience.role}`} delay={0.2}>
            <div className={styles.card}>
              <div className={styles.logoWrap}>
                <img
                  src={experience.logo}
                  alt={`${experience.company} company logo`}
                  className={styles.logo}
                />
              </div>
              <div className={styles.details}>
                <h3 className={styles.role}>{experience.role}</h3>
                <p className={styles.company}>{experience.company}</p>
                <p className={styles.description}>{experience.description}</p>
                <div className={styles.skills} aria-label="Skills used in this role">
                  {experience.skills.map((skill) => (
                    <span key={skill} className={styles.skill}>{skill}</span>
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
