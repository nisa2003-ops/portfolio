import FadeIn from "../FadeIn";
import { SKILL_GROUPS } from "../../constants/data";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className="section-inner">
        <FadeIn><p className="section-label">04 — Skills</p></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title">Technical Toolkit</h2></FadeIn>

        <div className={styles.grid}>
          {SKILL_GROUPS.map((group, gi) => (
            <FadeIn key={group.category} delay={0.07 * gi}>
              <div className={styles.card}>
                <p className={styles.category}>{group.category}</p>
                <div className={styles.icons}>
                  {group.icons.map((ic) => (
                    <div key={ic.label} className={styles.iconWrap} title={ic.label}>
                      <i className={`${ic.cls} ${styles.icon}`} />
                      <span className={styles.iconLabel}>{ic.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
