import { useState } from "react";
import FadeIn from "../FadeIn";
import { CAREER_JOURNEY } from "../../constants/data";
import { useHaptics } from "../../hooks/useHaptics";
import styles from "./Experience.module.css";

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { triggerTapHaptic } = useHaptics();

  const filterTabs = [
    { id: "all", label: "All Journey", count: CAREER_JOURNEY.length },
    {
      id: "industry",
      label: "🏢 Professional Experience",
      count: CAREER_JOURNEY.filter((item) => item.category === "industry").length,
    },
    {
      id: "university",
      label: "🏛️ University Leadership & Web Initiatives",
      count: CAREER_JOURNEY.filter(
        (item) => item.category === "university" || item.category === "campus"
      ).length,
    },
  ];

  const visibleItems =
    activeFilter === "all"
      ? CAREER_JOURNEY
      : CAREER_JOURNEY.filter(
          (item) =>
            item.category === activeFilter ||
            (activeFilter === "university" && item.category === "campus")
        );

  return (
    <section id="experience" className={styles.section}>
      {/* Anchor for legacy or direct links to #leadership */}
      <div id="leadership" className={styles.anchor} aria-hidden="true" />

      <div className="section-inner">
        <FadeIn>
          <p className="section-label">Career Journey</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="section-title">
            Experience &amp; <span className="section-title-gradient">University Leadership</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="section-description">
            A cohesive track record bridging enterprise customer operations with hands-on university web engineering leadership.
          </p>
        </FadeIn>

        {/* Filter Dock */}
        <FadeIn delay={0.18}>
          <div className={styles.filterDock} role="tablist" aria-label="Career Journey Filters">
            {filterTabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                role="tab"
                aria-selected={activeFilter === tab.id}
                className={`${styles.filterPill} ${
                  activeFilter === tab.id ? styles.filterPillActive : ""
                }`}
                onClick={() => {
                  triggerTapHaptic();
                  setActiveFilter(tab.id);
                }}
              >
                <span>{tab.label}</span>
                <span className={styles.filterCount}>{tab.count}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Cards List */}
        <div className={styles.timelineList}>
          {visibleItems.map((item, index) => (
            <FadeIn key={item.id} delay={0.08 * (index + 1)}>
              <article className={styles.card} data-spotlight="true">
                <div className={styles.cardHeaderTop}>
                  <div className={styles.logoAndTitle}>
                    <div className={styles.logoWrap}>
                      <img
                        src={item.logo}
                        alt={`${item.organization} logo`}
                        className={styles.logo}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.titleInfo}>
                      <h3 className={styles.role}>{item.role}</h3>
                      <div className={styles.orgRow}>
                        <span className={styles.org}>{item.organization}</span>
                        {item.subtitle && (
                          <span className={styles.subtitle}> · {item.subtitle}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.metaActions}>
                    {/* Visual Badge Distinction */}
                    {item.category === "industry" ? (
                      <span className={styles.badgeIndustry}>
                        🏢 Professional Experience
                      </span>
                    ) : (
                      <span className={styles.badgeUniversity}>
                        🏛️ University Leadership &amp; Web Initiatives
                      </span>
                    )}

                    <span className={styles.period}>{item.period}</span>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkBtn}
                        aria-label={`Visit ${item.organization} website`}
                      >
                        Visit Platform ↗
                      </a>
                    )}
                  </div>
                </div>

                <p className={styles.description}>{item.description}</p>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className={styles.highlights} aria-label="Key contributions and achievements">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className={styles.highlightItem}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                <div className={styles.skills} aria-label="Skills & tools applied">
                  {item.skills.map((skill) => (
                    <span key={skill} className={styles.skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
