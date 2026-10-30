import { useState } from "react";
import FadeIn from "../FadeIn";
import { PROJECTS } from "../../constants/data";
import { useHaptics } from "../../hooks/useHaptics";
import ArchitectureModal from "./ArchitectureModal";
import LankaTopologyVisual from "./visuals/LankaTopologyVisual";
import CloudOpsBlueprintVisual from "./visuals/CloudOpsBlueprintVisual";
import DengueMlopsVisual from "./visuals/DengueMlopsVisual";
import TravelAiVisual from "./visuals/TravelAiVisual";
import styles from "./Projects.module.css";

const FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "cloud-devops", label: "☁️ Cloud & DevOps" },
  { id: "ml-ai", label: "🧠 Machine Learning & AI" },
  { id: "systems", label: "⚡ Full Stack & Systems" },
];

const PROJECT_CATEGORIES = {
  "lanka-microjob": ["cloud-devops", "systems"],
  "cloudops": ["cloud-devops"],
  "dengue": ["ml-ai"],
  "travel": ["systems", "ml-ai"],
  "Airline Reservation System": ["systems"],
  "inventory": ["systems"],
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);
  const { triggerTapHaptic } = useHaptics();

  const filteredProjects = activeFilter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => PROJECT_CATEGORIES[p.id]?.includes(activeFilter));

  const isLankaVisible = filteredProjects.some((p) => p.id === "lanka-microjob");
  const isCloudOpsVisible = filteredProjects.some((p) => p.id === "cloudops");
  const isDengueVisible = filteredProjects.some((p) => p.id === "dengue");
  const isOnlyMlAi = activeFilter === "ml-ai";

  // When ML & AI is active, Travel Planner is elevated into a 6-col Bento card with TravelAiVisual
  // Otherwise, it sits in standardProjects as a 4-col card
  const standardProjects = filteredProjects.filter(
    (p) =>
      p.id !== "lanka-microjob" &&
      p.id !== "cloudops" &&
      p.id !== "dengue" &&
      (!isOnlyMlAi || p.id !== "travel")
  );

  return (
    <section id="projects" className={styles.section}>
      <div className="section-inner">
        <FadeIn><p className="section-label">Projects</p></FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="section-title">
            Selected Work &amp; <span className="section-title-gradient">System Architectures</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="section-description">
            Production-deployed cloud infrastructure, microservices, and automated platforms, load-tested and engineered for reliability.
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
                  onClick={() => {
                    triggerTapHaptic();
                    setActiveFilter(f.id);
                  }}
                >
                  <span>{f.label}</span>
                  <span className={styles.filterCount}>{count}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* ── BENTO SHOWCASE GRID ── */}
        <div className={styles.bentoGrid}>

          {/* 1. HERO BENTO CARD: Lanka MicroJob (Panoramic 12-Columns) */}
          {isLankaVisible && (
            <FadeIn delay={0.1} className={styles.heroSpan12}>
              <article className={`${styles.bentoCard} ${styles.heroBentoCard}`} data-spotlight="true">
                {/* Status Bar */}
                <div className={styles.cardStatusBar}>
                  <div className={styles.statusChipsLeft}>
                    <span className={styles.chipProduction}>
                      <span className={styles.pulseDotGreen} />
                      Production: AWS EC2
                    </span>
                    <span className={styles.chipTech}>k3s Kubernetes v1.28</span>
                    <span className={styles.chipPerf}>100 VUs Peak Load</span>
                    <span className={styles.chipPerf}>0% HTTP Failures</span>
                  </div>
                  <span className={styles.clusterId}>Target: ap-southeast-1</span>
                </div>

                {/* 2-Column Bento Interior */}
                <div className={styles.heroInterior}>
                  {/* Left Column: Context, Problem, & Tech Specs */}
                  <div className={styles.heroContentLeft}>
                    <div>
                      <p className={styles.heroCategory}>Cloud-Deployed Microservices Platform</p>
                      <h3 className={styles.heroTitle}>Lanka MicroJob</h3>
                      <p className={styles.heroDesc}>
                        A microservices-based job marketplace built with Spring Boot and React, containerized with Docker and deployed on AWS EC2 using Kubernetes (k3s), Amazon ECR, AWS CodePipeline, CodeBuild, and Amazon RDS PostgreSQL.
                      </p>
                    </div>

                    <div className={styles.contributionBox}>
                      <span className={styles.contributionLabel}>What I Built</span>
                      <p className={styles.contributionText}>
                        Engineered the React frontend and Spring Boot microservices for role-based access, job matching, applications, placements, notifications, and administrative approvals.
                      </p>
                    </div>

                    {/* Grouped Stack Chips */}
                    <div className={styles.groupedTags}>
                      <div className={styles.tagGroup}>
                        <span className={styles.tagGroupLabel}>Cloud &amp; K8s:</span>
                        <div className={styles.tagPillsRow}>
                          <span className={styles.tagPill}>AWS EC2</span>
                          <span className={styles.tagPill}>k3s</span>
                          <span className={styles.tagPill}>Amazon ECR</span>
                          <span className={styles.tagPill}>RDS PostgreSQL</span>
                          <span className={styles.tagPill}>CodePipeline</span>
                        </div>
                      </div>
                      <div className={styles.tagGroup}>
                        <span className={styles.tagGroupLabel}>Backend:</span>
                        <div className={styles.tagPillsRow}>
                          <span className={styles.tagPill}>Spring Boot</span>
                          <span className={styles.tagPill}>Docker</span>
                          <span className={styles.tagPill}>REST APIs</span>
                          <span className={styles.tagPill}>k6 Testing</span>
                        </div>
                      </div>
                    </div>

                    {/* Hero Action Buttons Bar */}
                    <div className={styles.heroActionsBar}>
                      <a
                        href="https://lanka-microjob.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.primaryActionBtn}
                        onClick={triggerTapHaptic}
                      >
                        Visit Live Platform ↗
                      </a>

                      <button
                        type="button"
                        className={styles.secondaryActionBtn}
                        onClick={() => {
                          triggerTapHaptic();
                          setIsArchModalOpen(true);
                        }}
                      >
                        View Architecture ↗
                      </button>

                      <div className={styles.heroSubActionsRow}>
                        <a
                          href="https://medium.com/@nisadu2003/from-docker-compose-to-kubernetes-on-aws-deploying-lanka-microjob-with-ci-cd-rds-and-load-6bfe6eea0be4"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.tertiaryActionBtn}
                          onClick={triggerTapHaptic}
                        >
                          Medium Case Study ↗
                        </a>

                        <a
                          href="https://github.com/nisa2003-ops/Lanka-Microjob-V1"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.iconActionBtn}
                          aria-label="GitHub Repository"
                          onClick={triggerTapHaptic}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Interactive SRE & Kubernetes Terminal */}
                  <div className={styles.heroVisualRight}>
                    <LankaTopologyVisual />
                  </div>
                </div>
              </article>
            </FadeIn>
          )}

          {/* 2. BENTO CARD #2: CloudOps Platform (Option B: Terraform IaC Blueprint) */}
          {isCloudOpsVisible && (
            <FadeIn delay={0.15} className={activeFilter === "cloud-devops" ? styles.heroSpan12 : styles.span6}>
              <article className={`${styles.bentoCard} ${styles.subBentoCard}`} data-spotlight="true">
                <div className={styles.cardStatusBar}>
                  <div className={styles.statusChipsLeft}>
                    <span className={styles.chipWip}>
                      <span className={styles.pulseDotAmber} />
                      In Active Development
                    </span>
                    <span className={styles.chipTech}>Terraform IaC</span>
                    <span className={styles.chipTech}>Zero-Trust OIDC</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div>
                    <p className={styles.cardCategory}>SRE &amp; Infrastructure as Code</p>
                    <h3 className={styles.cardTitle}>CloudOps Platform</h3>
                    <p className={styles.cardDesc}>
                      A cloud deployment, observability, and Site Reliability Engineering (SRE) platform featuring automated infrastructure provisioning, zero-secret CI/CD, and real-time telemetry.
                    </p>
                  </div>

                  {/* Option B: Terraform Blueprint & Roadmap Visualizer */}
                  <div className={styles.visualHolder}>
                    <CloudOpsBlueprintVisual />
                  </div>

                  <div className={styles.tagPillsRow}>
                    {["AWS", "Terraform", "GitHub Actions", "Docker", "Prometheus", "Grafana", "Python"].map((t) => (
                      <span key={t} className={styles.tagPill}>{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            </FadeIn>
          )}

          {/* 3. BENTO CARD #3: Dengue Risk MLOps (Completed & Evaluated) */}
          {isDengueVisible && (
            <FadeIn delay={0.2} className={styles.span6}>
              <article className={`${styles.bentoCard} ${styles.subBentoCard}`} data-spotlight="true">
                <div className={styles.cardStatusBar}>
                  <div className={styles.statusChipsLeft}>
                    <span className={styles.chipCompleted}>
                      <span className={styles.pulseDotGreen} />
                      Completed &amp; Evaluated
                    </span>
                    <span className={styles.chipTech}>MLflow Registry</span>
                    <span className={styles.chipTech}>FastAPI Serving</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div>
                    <p className={styles.cardCategory}>Machine Learning Engineering &amp; MLOps</p>
                    <h3 className={styles.cardTitle}>Dengue Risk MLOps</h3>
                    <p className={styles.cardDesc}>
                      An automated machine learning system that predicts dengue outbreak risk using historical case and climate data, featuring automated training pipelines, MLflow experiment tracking, and low-latency FastAPI inference.
                    </p>
                  </div>

                  {/* MLOps Visualizer */}
                  <div className={styles.visualHolder}>
                    <DengueMlopsVisual />
                  </div>

                  <div className={styles.cardFooterRow}>
                    <div className={styles.tagPillsRow}>
                      {["Python", "Scikit-learn", "MLflow", "FastAPI", "Docker", "CI/CD"].map((t) => (
                        <span key={t} className={styles.tagPill}>{t}</span>
                      ))}
                    </div>

                    <a
                      href="https://github.com/nisa2003-ops/Dengue-Risk-MLOps-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.secondaryActionBtn}
                    >
                      GitHub Repo ↗
                    </a>
                  </div>
                </div>
              </article>
            </FadeIn>
          )}

          {/* 4. IN ML & AI MODE: Lanka Travel Planner is Elevated to 6-col Bento Card */}
          {isOnlyMlAi && (
            <FadeIn delay={0.25} className={styles.span6}>
              <article className={`${styles.bentoCard} ${styles.subBentoCard}`} data-spotlight="true">
                <div className={styles.cardStatusBar}>
                  <div className={styles.statusChipsLeft}>
                    <span className={styles.chipCompleted}>
                      <span className={styles.pulseDotGreen} />
                      Completed Platform
                    </span>
                    <span className={styles.chipTech}>Gemini 1.5 Flash</span>
                    <span className={styles.chipTech}>Leaflet OSM</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div>
                    <p className={styles.cardCategory}>Generative AI &amp; Geospatial System</p>
                    <h3 className={styles.cardTitle}>Lanka Travel Planner</h3>
                    <p className={styles.cardDesc}>
                      An AI-powered trip planning platform for personalized Sri Lankan itineraries, interactive Leaflet geospatial route mapping, and automated budget estimation powered by the Gemini API.
                    </p>
                  </div>

                  {/* GenAI Itinerary Visualizer */}
                  <div className={styles.visualHolder}>
                    <TravelAiVisual />
                  </div>

                  <div className={styles.cardFooterRow}>
                    <div className={styles.tagPillsRow}>
                      {["React", "Node.js", "Leaflet", "Gemini API", "GeoJSON"].map((t) => (
                        <span key={t} className={styles.tagPill}>{t}</span>
                      ))}
                    </div>

                    <a
                      href="https://github.com/nisa2003-ops/Lanka-Travel-Planner"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.secondaryActionBtn}
                    >
                      GitHub Source ↗
                    </a>
                  </div>
                </div>
              </article>
            </FadeIn>
          )}

          {/* 5. SECONDARY CARDS ROW (Compact Bento Cards for standard projects) */}
          {standardProjects.map((project, idx) => (
            <FadeIn key={project.id} delay={0.15 + 0.05 * idx} className={styles.span4}>
              <article className={`${styles.bentoCard} ${styles.compactBentoCard}`} data-spotlight="true">
                <div className={styles.compactHeader}>
                  <div className={styles.compactCategoryRow}>
                    <span className={styles.compactDomainTag}>
                      {project.id === "travel" ? "🧠 GenAI & Leaflet Maps" : project.id === "Airline Reservation System" ? "✈️ JavaFX Desktop System" : "📦 Enterprise CRUD System"}
                    </span>
                    <span className={styles.chipCompletedSimple}>Completed</span>
                  </div>
                  <h4 className={styles.compactTitle}>{project.title}</h4>
                  <p className={styles.compactDesc}>{project.description}</p>
                </div>

                <div className={styles.compactContribution}>
                  <span className={styles.compactContribLabel}>Architecture &amp; Features:</span>
                  <p className={styles.compactContribText}>{project.contribution}</p>
                </div>

                <div className={styles.compactFooter}>
                  <div className={styles.tagPillsRow}>
                    {project.tags.map((t) => (
                      <span key={t} className={styles.tagPill}>{t}</span>
                    ))}
                  </div>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.compactLinkBtn}
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      GitHub Source ↗
                    </a>
                  )}
                </div>
              </article>
            </FadeIn>
          ))}

        </div>
      </div>

      {/* Deep-Dive Architecture Modal */}
      <ArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />
    </section>
  );
}
