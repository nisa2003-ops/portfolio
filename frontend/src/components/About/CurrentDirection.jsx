import { useHaptics } from "../../hooks/useHaptics";
import styles from "./CurrentDirection.module.css";

export default function CurrentDirection() {
  const { triggerTapHaptic } = useHaptics();

  return (
    <div className={styles.wrapper}>
      {/* Top Row: Left Header Block + Right Primary Focus Hero Card */}
      <div className={styles.topRow}>
        {/* Left: Heading with Current Direction accent */}
        <div className={styles.headerBlock}>
          <div className={styles.tagRow}>
            <span className={styles.categoryTag}>CURRENT DIRECTION</span>
            <div className={styles.accentLine} aria-hidden="true" />
          </div>

          <h3 className={styles.heading}>
            Building my future <br />
            <span className={styles.accentText}>in technology.</span>
          </h3>

          <div className={styles.cursorBar} aria-hidden="true" />
        </div>

        {/* Right: Primary Focus Hero Card */}
        <div
          className={`${styles.card} ${styles.primaryCard}`}
          data-spotlight="true"
        >
          {/* Atmospheric cloud background art */}
          <div className={styles.cloudArtWrap} aria-hidden="true">
            <img
              src="/direction-clouds.png"
              alt=""
              className={styles.cloudImg}
            />
          </div>

          <div className={styles.cardContent}>
            {/* Cloud Icon Squircle */}
            <div className={`${styles.iconBox} ${styles.cloudIconBox}`}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
            </div>

            <span className={styles.cardLabel}>PRIMARY FOCUS</span>
            <h4 className={styles.cardTitle}>Cloud &amp; DevOps</h4>
            <p className={styles.cardDesc}>
              Building, deploying, and managing modern applications.
            </p>

            <div className={styles.pillsRow}>
              {["Docker", "Kubernetes", "CI/CD", "Cloud"].map((tag) => (
                <span
                  key={tag}
                  className={styles.tagPill}
                  onClick={triggerTapHaptic}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Also Exploring & Alongside cards */}
      <div className={styles.bottomRow}>
        {/* Card 2: Also Exploring - Networking & Cybersecurity */}
        <div
          className={`${styles.card} ${styles.subCard} ${styles.networkCard}`}
          data-spotlight="true"
        >
          {/* Cyber wave artwork */}
          <div className={styles.cyberWaveArtWrap} aria-hidden="true">
            <img
              src="/direction-cyber-wave.png"
              alt=""
              className={styles.cyberWaveImg}
            />
          </div>

          <div className={styles.cardContent}>
            {/* Network Nodes Hub Icon Squircle matching the reference image */}
            <div className={`${styles.iconBox} ${styles.networkIconBox}`}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="2.2" />
                <circle cx="12" cy="5" r="2.2" />
                <circle cx="5.5" cy="17.5" r="2.2" />
                <circle cx="18.5" cy="17.5" r="2.2" />
                <line x1="12" y1="7.2" x2="12" y2="9.8" />
                <line x1="10.3" y1="13.3" x2="7.2" y2="15.8" />
                <line x1="13.7" y1="13.3" x2="16.8" y2="15.8" />
              </svg>
            </div>

            <span className={styles.cardLabel}>ALSO EXPLORING</span>
            <h4 className={styles.cardTitle}>Networking &amp; Cybersecurity</h4>
            <p className={styles.cardDesc}>Networks, protocols &amp; secure systems.</p>
          </div>
        </div>

        {/* Card 3: Alongside - Machine Learning & AI */}
        <div
          className={`${styles.card} ${styles.subCard} ${styles.aiCard}`}
          data-spotlight="true"
        >
          {/* AI Nebula Particle Artwork */}
          <div className={styles.aiNebulaArtWrap} aria-hidden="true">
            <img
              src="/direction-ai-nebula.png"
              alt=""
              className={styles.aiNebulaImg}
            />
          </div>

          <div className={styles.cardContent}>
            {/* Brain/Neural AI Icon Squircle */}
            <div className={`${styles.iconBox} ${styles.aiIconBox}`}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
              </svg>
            </div>

            <span className={`${styles.cardLabel} ${styles.aiLabel}`}>ALONGSIDE</span>
            <h4 className={styles.cardTitle}>Machine Learning &amp; AI</h4>
            <p className={styles.cardDesc}>Intelligent applications &amp; data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
