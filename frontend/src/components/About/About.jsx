import FadeIn from "../FadeIn";
import { OWNER } from "../../constants/data";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="section-inner">
        <FadeIn><p className="section-label">About</p></FadeIn>

        <div className={styles.grid}>
          <FadeIn delay={0.1}>
            <h2 className="section-title">
              Building where software,<br />data and infrastructure meet.
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className={styles.body}>
              {OWNER.bio.map((para, i) => (
                <p key={i} className={styles.para}>{para}</p>
              ))}

              <div className={styles.direction}>
                <p className={styles.directionLabel}>Current direction</p>
                <div className={styles.directionList}>
                  <span><strong>Primary Focus</strong> DevOps</span>
                  <span><strong>Growing Focus</strong> Machine Learning &amp; AI</span>
                  <span><strong>Foundation</strong> Software Engineering</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
