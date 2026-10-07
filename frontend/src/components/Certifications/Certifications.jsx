import { useState } from "react";
import FadeIn from "../FadeIn";
import { CERTIFICATIONS } from "../../constants/data";
import styles from "./Certifications.module.css";

export default function Certifications() {
  const [showAll, setShowAll] = useState(false);
  const priority = ["cert-5", "cert-7", "cert-2", "cert-3", "cert-1", "cert-6", "cert-4"];
  const rank = (id) => priority.includes(id) ? priority.indexOf(id) : priority.length;
  const ordered = [...CERTIFICATIONS].sort((a, b) => rank(a.id) - rank(b.id));
  const visible = showAll ? ordered : ordered.slice(0, 6);

  return (
    <section id="certifications" className={styles.section}>
      <div className="section-inner">
        <FadeIn>
          <p className="section-label">Certifications</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="section-title">Courses &amp; Certifications</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="section-description">
            Focused learning in networking, Linux, cloud, delivery pipelines and Kubernetes.
          </p>
        </FadeIn>

        <div className={styles.grid}>
          {visible.map((cert, i) => (
            <FadeIn key={cert.id} delay={0.07 * i}>
              <div className={styles.card}>

                <div className={styles.top}>
                  <span
                    className={styles.icon}
                    style={{ background: cert.logoBackground }}
                  >
                    <img
                      className={styles.logo}
                      src={cert.logo}
                      alt={cert.logoAlt}
                      loading="lazy"
                    />
                  </span>
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
        {ordered.length > 6 && (
          <button
            type="button"
            className={styles.viewAll}
            onClick={() => setShowAll((current) => !current)}
            aria-expanded={showAll}
          >
            {showAll ? "Show Fewer Certifications" : "View All Certifications"}
          </button>
        )}
      </div>
    </section>
  );
}
