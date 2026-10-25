import FadeIn from "../FadeIn";
import { OWNER } from "../../constants/data";
import CurrentDirection from "./CurrentDirection";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="section-inner">
        <FadeIn>
          <p className="section-label">About</p>
        </FadeIn>

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
            </div>
          </FadeIn>
        </div>

        {/* Current Direction - Primary Focus, Networking & AI showcase */}
        <FadeIn delay={0.25}>
          <CurrentDirection />
        </FadeIn>
      </div>
    </section>
  );
}
