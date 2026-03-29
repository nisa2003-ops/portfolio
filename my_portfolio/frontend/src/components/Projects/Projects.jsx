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
      <span className={styles.mockupIcon}>{project.mockupIcon}</span>
      <span className={styles.mockupLabel}>{project.title}</span>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className={styles.card}>
      <MockupCard project={project} />

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{project.title}</h3>
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

        <p className={styles.desc}>{project.description}</p>

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

        <div className={styles.links}>
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
              ⌥ GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className="section-inner">
        <FadeIn><p className="section-label">03 — Projects</p></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title">Selected Work</h2></FadeIn>

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
