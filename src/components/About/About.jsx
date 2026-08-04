import FadeIn from "../FadeIn";
import { OWNER } from "../../constants/data";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="section-inner">
        <FadeIn><p className="section-label">01 — About</p></FadeIn>

        <div className={styles.grid}>
          <FadeIn delay={0.1}>
            <h2 className="section-title">
              Crafting experiences<br />with intention.
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className={styles.body}>
              {OWNER.bio.map((para, i) => (
                <p key={i} className={styles.para}>{para}</p>
              ))}

              <div className={styles.stats}>
                {OWNER.stats.map(({ value, label }) => (
                  <div key={label} className={styles.stat}>
                    <span className={styles.statValue}>{value}</span>
                    <span className={styles.statLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
