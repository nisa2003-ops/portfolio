import FadeIn from "../FadeIn";
import { SKILL_GROUPS } from "../../constants/data";
import styles from "./Skills.module.css";

const CATEGORY_META = {
  "Cloud & DevOps": {
    icon: "☁️",
    desc: "Cloud infrastructure, containerization & automated deployment pipelines",
    gridClass: styles.cardHero,
    pillGridClass: styles.heroPillGrid,
    isHero: true,
  },
  "Backend": {
    icon: "⚙️",
    desc: "RESTful microservices, business logic & distributed system design",
    gridClass: styles.cardBackend,
  },
  "Databases": {
    icon: "🗄️",
    desc: "Relational modeling, NoSQL storage & managed database platforms",
    gridClass: styles.cardDatabase,
  },
  "Machine Learning & AI": {
    icon: "🤖",
    desc: "Predictive modeling, data engineering & experiment tracking workflows",
    gridClass: styles.cardMl,
  },
  "Frontend": {
    icon: "⚡",
    desc: "Responsive web experiences & modern component-driven interfaces",
    gridClass: styles.cardFrontend,
  },
  "Languages": {
    icon: "💻",
    desc: "Core programming languages & scripting runtimes across stacks",
    gridClass: styles.cardLanguages,
    pillGridClass: styles.widePillGrid,
  },
  "Tools": {
    icon: "🛠️",
    desc: "Version control, IDE environments, API testing & UI design systems",
    gridClass: styles.cardTools,
    pillGridClass: styles.widePillGrid,
  },
};

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className="section-inner">
        <FadeIn><p className="section-label">Skills</p></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title">Technical Toolkit</h2></FadeIn>
        <FadeIn delay={0.15}>
          <p className="section-description">
            A specialized toolkit spanning cloud infrastructure, CI/CD automation, backend systems, and machine learning pipelines.
          </p>
        </FadeIn>

        <div className={styles.grid}>
          {SKILL_GROUPS.map((group, gi) => {
            const meta = CATEGORY_META[group.category] || {};
            const isHero = meta.isHero;

            return (
              <FadeIn
                key={group.category}
                delay={0.05 * gi}
                className={`${styles.cardWrapper} ${meta.gridClass || ""}`}
              >
                <div
                  className={`${styles.card} ${isHero ? styles.cardHeroInner : ""}`}
                  data-spotlight="true"
                >
                  {isHero && <div className={styles.heroGlow} aria-hidden="true" />}

                  <div className={styles.cardHeader}>
                    <div className={styles.headerLeft}>
                      <span className={styles.categoryIcon} aria-hidden="true">
                        {meta.icon || "◈"}
                      </span>
                      <div>
                        <h3 className={styles.categoryTitle}>{group.category}</h3>
                        {meta.desc && (
                          <p className={styles.categoryDesc}>{meta.desc}</p>
                        )}
                      </div>
                    </div>

                    {isHero ? (
                      <span className={styles.heroBadge}>
                        <span className={styles.pulseDot} />
                        Primary Focus
                      </span>
                    ) : (
                      <span className={styles.countBadge}>
                        {group.icons.length} tools
                      </span>
                    )}
                  </div>

                  <div className={`${styles.pillGrid} ${meta.pillGridClass || ""}`}>
                    {group.icons.map((ic) => (
                      <div key={ic.label} className={styles.skillPill}>
                        <div className={styles.iconBox}>
                          {ic.cls ? (
                            <i className={`${ic.cls} ${styles.icon}`} aria-hidden="true" />
                          ) : (
                            <span className={styles.iconMark} aria-hidden="true">{ic.mark}</span>
                          )}
                        </div>
                        <span className={styles.iconLabel}>{ic.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
