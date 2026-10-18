import { useState } from "react";
import FadeIn from "../FadeIn";
import { PROJECTS, STATUS_COLORS } from "../../constants/data";
import ArchitectureModal from "./ArchitectureModal";
import styles from "./Projects.module.css";

const FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "cloud-devops", label: "Cloud & DevOps" },
  { id: "ml-ai", label: "Machine Learning & AI" },
  { id: "systems", label: "Full Stack & Systems" },
];

const PROJECT_CATEGORIES = {
  "lanka-microjob": ["cloud-devops", "systems"],
  "cloudops": ["cloud-devops"],
  "dengue": ["ml-ai"],
  "Airline Reservation System": ["systems"],
  "travel": ["systems", "ml-ai"],
  "inventory": ["systems"],
};

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

function ProjectCard({ project, onOpenArchModal }) {
  const isLanka = project.id === "lanka-microjob";
  const isCloudOps = project.id === "cloudops";

  return (
    <div className={styles.card} data-spotlight="true">
      <MockupCard project={project} />

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <div>
            <h3 className={styles.title}>{project.title}</h3>
            {isLanka && <p className={styles.subtitle}>Cloud-Deployed Microservices Platform</p>}
            {isCloudOps && <p className={styles.subtitle}>SRE, Infrastructure as Code &amp; Telemetry Platform</p>}
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

        <p className={`${styles.desc} ${isLanka || isCloudOps ? styles.featuredDesc : ""}`}>
          {project.description}
        </p>

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

        {/* Lanka MicroJob Architecture & k6 Showcase */}
        {isLanka && (
          <>
            <div className={styles.performance} aria-label="k6 mixed API workload results">
              <span className={styles.performanceLabel}>
                Load-tested with up to 100 concurrent virtual users · mixed API workload (k6)
              </span>
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

            <button
              type="button"
              className={styles.archBtn}
              onClick={onOpenArchModal}
              aria-label="View system architecture and microservices breakdown"
            >
              <span>📐</span> View System Architecture &amp; Microservices ↗
            </button>
          </>
        )}

        {/* CloudOps SRE Telemetry & IaC Showcase */}
        {isCloudOps && (
          <>
            <div className={styles.telemetryBox} aria-label="CloudOps infrastructure and SRE highlights">
              <span className={styles.telemetryLabel}>
                Zero-trust infrastructure automation &amp; real-time RED telemetry
              </span>
              <div className={styles.telemetryStats}>
                <span className={styles.telemetryBadge}>
                  <strong>Terraform</strong> Modular VPC / IAM / EC2
                </span>
                <span className={styles.telemetryBadge}>
                  <strong>OIDC</strong> Zero-Secret CI/CD
                </span>
                <span className={styles.telemetryBadge}>
                  <strong>Trivy</strong> CVE Security Scanned
                </span>
                <span className={styles.telemetryBadge}>
                  <strong>RED</strong> Prometheus &amp; Grafana
                </span>
              </div>
            </div>
            <details className={styles.details}>
              <summary>Infrastructure &amp; Pipeline Details</summary>
              <div className={styles.detailContent}>
                <p><strong>Infrastructure</strong> Modular Terraform → AWS VPC (Multi-AZ) → IAM Least Privilege → EC2 &amp; ECR</p>
                <p><strong>CI/CD &amp; Security</strong> GitHub Actions → AWS OIDC Role Assumption → Trivy Vulnerability Scan → Automated Push to ECR</p>
                <p><strong>Observability</strong> FastAPI Telemetry → Prometheus (Rate, Errors, Duration) → Grafana Dashboards</p>
              </div>
            </details>
            <div className={styles.cloudopsPillRow}>
              <span className={styles.iacBadge}>
                <span className={styles.statusDot} />
                SRE &amp; Modular IaC Active
              </span>
            </div>
          </>
        )}

        {(project.demo || project.github || project.caseStudy) && (
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
                GitHub ↗
              </a>
            )}
            {project.caseStudy && (
              <a href={project.caseStudy} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
                Case Study ↗
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);

  const filteredProjects = activeFilter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => PROJECT_CATEGORIES[p.id]?.includes(activeFilter));

  const getCardSpan = (index, total) => {
    if (total === 2) return styles.cardWrapSpan6;
    if (total === 3) return styles.cardWrapSpan4;
    if (total === 4) return styles.cardWrapSpan6;
    if (total === 6) {
      if (index === 0 || index === 1) return styles.cardWrapSpan6;
      return styles.cardWrapSpan4;
    }
    return styles.cardWrapSpan6;
  };

  return (
    <section id="projects" className={styles.section}>
      <div className="section-inner">
        <FadeIn><p className="section-label">Projects</p></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title">Selected Work</h2></FadeIn>
        <FadeIn delay={0.15}>
          <p className="section-description">
            Cloud infrastructure and backend systems, with machine learning and automated reliability platforms alongside them.
          </p>
        </FadeIn>

        {/* Category Filter Dock */}
        <FadeIn delay={0.18}>
          <div className={styles.filterDock} role="tablist" aria-label="Project domain filters">
            {FILTERS.map((f) => {
              const count = f.id === "all"
                ? PROJECTS.length
                : PROJECTS.filter((p) => PROJECT_CATEGORIES[p.id]?.includes(f.id)).length;
              const isActive = activeFilter === f.id;

              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.filterPill} ${isActive ? styles.filterPillActive : ""}`}
                  onClick={() => setActiveFilter(f.id)}
                >
                  <span>{f.label}</span>
                  <span className={styles.filterCount}>{count}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        <div className={styles.grid}>
          {filteredProjects.map((p, i) => (
            <FadeIn
              key={p.id}
              delay={0.04 * i}
              className={`${styles.cardWrapper} ${getCardSpan(i, filteredProjects.length)}`}
            >
              <ProjectCard
                project={p}
                onOpenArchModal={() => setIsArchModalOpen(true)}
              />
            </FadeIn>
          ))}
        </div>
      </div>

      <ArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />
    </section>
  );
}
