import FadeIn from "../FadeIn";
import { PROJECTS, STATUS_COLORS } from "../../constants/data";
import styles from "./Projects.module.css";

function MockupCard({ project }) {
  return (
    <div
      className={styles.mockup}
      style={{ background: project.mockupBg, "--accent": project.color }}
    >
      <div className={styles.mockupGrid} />
      <span className={styles.mockupIcon} aria-hidden="true">{project.mockupIcon}</span>
      <span className={styles.mockupLabel}>{project.title}</span>
    </div>
  );
}

function ProjectCard({ project }) {
  const featured = project.id === "lanka-microjob";
  return (
    <div className={styles.card}>
      <MockupCard project={project} />

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <div>
            <h3 className={styles.title}>{project.title}</h3>
            {featured && <p className={styles.subtitle}>Cloud-Deployed Microservices Platform</p>}
          </div>
          <span
            className={styles.status}
            style={{
              color: STATUS_COLORS[project.status],
              borderColor: `${STATUS_COLORS[project.status]}40`,
            }}
          >
            {project.status}
          </span>
        </div>

        <p className={`${styles.desc} ${featured ? styles.featuredDesc : ""}`}>{project.description}</p>
        <p className={styles.contribution}>
          <span>What I built</span>
          {project.contribution}
        </p>

        <div className={styles.tags}>
          {project.tags.map((t) => (
            <span
              key={t}
              className={styles.tag}
              style={{ color: project.color, borderColor: `${project.color}40` }}
            >
              {t}
            </span>
          ))}
        </div>

        {featured && (
          <>
            <div className={styles.performance} aria-label="k6 mixed API workload results">
              <span className={styles.performanceLabel}>Load-tested with up to 100 concurrent virtual users · mixed API workload (k6)</span>
              <div className={styles.performanceStats}>
                <span><strong>100 VUs</strong> peak load</span>
                <span><strong>0%</strong> failures</span>
                <span><strong>~480 ms</strong> p95</span>
              </div>
            </div>
            <details className={styles.details}>
              <summary>Deployment details</summary>
              <div className={styles.detailContent}>
                <p><strong>Architecture</strong> {project.architecture.join(" → ")}</p>
                <p><strong>CI/CD</strong> {project.pipeline.join(" → ")}</p>
                <p><strong>Also used</strong> {project.moreTags.join(" · ")}</p>
              </div>
            </details>
          </>
        )}

        {(project.demo || project.github || project.caseStudy) && <div className={styles.links}>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.demoLink}
            >
              ↗ Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              GitHub ↗
            </a>
          )}
          {project.caseStudy && (
            <a href={project.caseStudy} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
              Case Study ↗
            </a>
          )}
        </div>}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className="section-inner">
        <FadeIn><p className="section-label">Projects</p></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title">Selected Work</h2></FadeIn>
        <FadeIn delay={0.15}>
          <p className="section-description">
            Cloud and backend systems, with machine learning projects alongside them.
          </p>
        </FadeIn>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.id} delay={0.05 * i}>
              <ProjectCard project={p} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
