import FadeIn from "../FadeIn";
import { CERTIFICATIONS } from "../../constants/data";
import styles from "./Certifications.module.css";

export default function Certifications() {
  return (
    <section id="certifications" className={styles.section}>
      <div className="section-inner">
        <FadeIn>
          <p className="section-label">03 — Certifications</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="section-title">Online Courses & Certificates</h2>
        </FadeIn>

        <div className={styles.grid}>
          {CERTIFICATIONS.map((cert, i) => (
            <FadeIn key={cert.id} delay={0.07 * i}>
              <div className={styles.card}>

                <div className={styles.top}>
                  <span className={styles.icon}>{cert.icon}</span>
                  <span
                    className={styles.platform}
                    style={{
                      color: cert.color,
                      borderColor: cert.color + "40",
                    }}
                  >
                    {cert.platform}
                  </span>
                </div>

                <h3 className={styles.title}>{cert.title}</h3>

                <div className={styles.bottom}>
                  <span className={styles.date}>{cert.date}</span>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.credentialBtn}
                    style={{
                      color: cert.color,
                      borderColor: cert.color + "40",
                    }}
                  >
                    View Credential ↗
                  </a>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}