import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { OWNER } from "../../constants/data";
import { useHaptics } from "../../hooks/useHaptics";
import styles from "./ResumeModal.module.css";

export default function ResumeModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("interactive"); // "interactive" | "pdf"
  const [paperTheme, setPaperTheme] = useState("paper"); // "paper" | "dark"
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { triggerTapHaptic, triggerSuccessHaptic } = useHaptics();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        triggerTapHaptic();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, triggerTapHaptic]);

  if (!isOpen) return null;

  const handleClose = () => {
    triggerTapHaptic();
    onClose();
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(OWNER.email).then(() => {
      triggerSuccessHaptic();
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  const handleDownload = () => {
    triggerSuccessHaptic();
    const a = document.createElement("a");
    a.href = OWNER.resumeUrl;
    a.download = "Nisadu_Nimsitha_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenExternal = () => {
    triggerTapHaptic();
    window.open(OWNER.resumeUrl, "_blank", "noopener,noreferrer");
  };

  const handlePrint = () => {
    triggerTapHaptic();
    window.open("/Nisadu_Nimsitha_CV.html", "_blank", "noopener,noreferrer");
  };

  const handleZoomIn = () => {
    triggerTapHaptic();
    setZoomLevel((prev) => Math.min(Number((prev + 0.1).toFixed(2)), 1.25));
  };

  const handleZoomOut = () => {
    triggerTapHaptic();
    setZoomLevel((prev) => Math.max(Number((prev - 0.1).toFixed(2)), 0.8));
  };

  const handleResetZoom = () => {
    triggerTapHaptic();
    setZoomLevel(1);
  };

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div className={styles.modal}>
        {/* Subtle Ambient Aura */}
        <div className={styles.ambientGlow} />

        {/* ── Top Header Bar ── */}
        <header className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.badgeRow}>
              <span className={styles.cvBadge}>
                <span className={styles.pulseDot} />
                Curriculum Vitae
              </span>
              <span className={styles.versionBadge}>Official PDF Replica</span>
            </div>
            <h2 id="resume-modal-title" className={styles.title}>
              Nisadu Nimsitha – CV
            </h2>
          </div>

          {/* Action Toolbar */}
          <div className={styles.headerRight}>
            <button
              type="button"
              className={styles.actionBtnSecondary}
              onClick={handlePrint}
              title="Open Printable Version"
              aria-label="Print CV"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              <span className={styles.btnText}>Print</span>
            </button>

            <button
              type="button"
              className={styles.actionBtnSecondary}
              onClick={handleOpenExternal}
              title="Open PDF in new tab"
              aria-label="Open PDF in new tab"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span className={styles.btnText}>Raw PDF</span>
            </button>

            <button
              type="button"
              className={styles.actionBtnPrimary}
              onClick={handleDownload}
              title="Download PDF to your computer"
              aria-label="Download PDF"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className={styles.btnText}>Download</span>
            </button>

            <button
              type="button"
              className={styles.closeBtn}
              onClick={handleClose}
              aria-label="Close resume preview"
            >
              ✕
            </button>
          </div>
        </header>

        {/* ── Secondary View Mode Bar ── */}
        <div className={styles.viewModeBar}>
          <div className={styles.tabGroup} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "interactive"}
              className={`${styles.tabBtn} ${activeTab === "interactive" ? styles.tabBtnActive : ""}`}
              onClick={() => {
                triggerTapHaptic();
                setActiveTab("interactive");
              }}
            >
              <span className={styles.tabIcon}>📄</span>
              <span>Interactive</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "pdf"}
              className={`${styles.tabBtn} ${activeTab === "pdf" ? styles.tabBtnActive : ""}`}
              onClick={() => {
                triggerTapHaptic();
                setActiveTab("pdf");
              }}
            >
              <span className={styles.tabIcon}>📑</span>
              <span>PDF Embed</span>
            </button>
          </div>

          {activeTab === "interactive" && (
            <div className={styles.viewControls}>
              {/* Zoom Controls (hidden on very small mobile to prevent clutter) */}
              <div className={styles.zoomControlGroup}>
                <button
                  type="button"
                  className={styles.zoomBtn}
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  −
                </button>
                <button
                  type="button"
                  className={styles.zoomResetBtn}
                  onClick={handleResetZoom}
                  title="Reset Zoom"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  type="button"
                  className={styles.zoomBtn}
                  onClick={handleZoomIn}
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  +
                </button>
              </div>

              {/* Theme Selector */}
              <div className={styles.themeToggleGroup}>
                <button
                  type="button"
                  className={`${styles.themePill} ${paperTheme === "paper" ? styles.themePillActive : ""}`}
                  onClick={() => setPaperTheme("paper")}
                  title="White Paper style"
                >
                  ☀️ Paper
                </button>
                <button
                  type="button"
                  className={`${styles.themePill} ${paperTheme === "dark" ? styles.themePillActive : ""}`}
                  onClick={() => setPaperTheme("dark")}
                  title="Dark theme style"
                >
                  🌙 Dark
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Modal Content Area ── */}
        <div className={styles.modalBody}>
          {/* TAB 1: INTERACTIVE VIEW — 1:1 REPLICA OF Nisadu_Nimsitha_CV.pdf */}
          {activeTab === "interactive" && (
            <div className={`${styles.paperWrap} ${paperTheme === "dark" ? styles.darkPaper : styles.lightPaper}`}>
              <article
                className={styles.pdfExactSheet}
                style={{
                  transform: zoomLevel !== 1 ? `scale(${zoomLevel})` : undefined,
                  transformOrigin: "top center",
                }}
              >
                {/* ── HEADER ── */}
                <header className={styles.docHeader}>
                  <h1 className={styles.docTitle}>Nisadu Nimsitha – CV</h1>
                  <p className={styles.docSubtitle}>
                    Cloud &amp; DevOps Engineer | Backend &amp; Distributed Systems | Computer Science Undergraduate
                  </p>
                  <p className={styles.docContactLine}>
                    <span>Colombo, Sri Lanka</span>
                    <span className={styles.sep}>|</span>
                    <button type="button" className={styles.emailBtn} onClick={handleCopyEmail} title="Click to copy email">
                      {copiedEmail ? "nisadu2003@gmail.com (Copied ✓)" : "nisadu2003@gmail.com"}
                    </button>
                    <span className={styles.sep}>|</span>
                    <a href="https://www.linkedin.com/in/nisadu-nimsitha-512a24348" target="_blank" rel="noopener noreferrer">
                      linkedin.com/in/nisadu-nimsitha-512a24348
                    </a>
                    <span className={styles.sep}>|</span>
                    <a href="https://github.com/nisa2003-ops" target="_blank" rel="noopener noreferrer">
                      github.com/nisa2003-ops
                    </a>
                    <span className={styles.sep}>|</span>
                    <a href="https://nisadu-nimsitha.vercel.app" target="_blank" rel="noopener noreferrer">
                      nisadu-nimsitha.vercel.app
                    </a>
                  </p>
                </header>

                {/* ── PROFESSIONAL SUMMARY ── */}
                <section className={styles.docSection}>
                  <h2 className={styles.sectionHeader}>Professional Summary</h2>
                  <p className={styles.sectionParagraph}>
                    Computer Science undergraduate at the University of Sri Jayewardenepura (GPA 3.31/4.00) focused on cloud infrastructure, DevOps
                    automation and distributed backend systems. Deployed six Spring Boot microservices on AWS EC2 with k3s, Amazon RDS PostgreSQL
                    and AWS CodePipeline CI/CD, load-tested with k6 at 100 concurrent users and 0% failures. Hands-on with Terraform, GitHub Actions
                    (OIDC, Trivy), Prometheus and Grafana.
                  </p>
                </section>

                {/* ── TECHNICAL SKILLS ── */}
                <section className={styles.docSection}>
                  <h2 className={styles.sectionHeader}>Technical Skills</h2>
                  <ul className={styles.bulletList}>
                    <li>
                      <strong>Cloud &amp; Infrastructure:</strong> AWS (EC2, VPC, ECR, RDS PostgreSQL, CodePipeline, CodeBuild, IAM, S3, KMS), Kubernetes (k3s),
                      Docker, Docker Compose, Linux (Ubuntu, Bash, systemd, SSH)
                    </li>
                    <li>
                      <strong>DevOps &amp; CI/CD:</strong> Terraform, GitHub Actions (OIDC, Trivy), AWS CodePipeline, AWS CodeBuild, Jenkins, Maven, Git
                    </li>
                    <li>
                      <strong>Backend:</strong> Java, Spring Boot (Spring Security, Spring Data JPA), Python, FastAPI, Node.js, Express, REST APIs, Microservices,
                      JWT Authentication
                    </li>
                    <li>
                      <strong>Observability &amp; Testing:</strong> Prometheus, Grafana, k6, pytest, Postman
                    </li>
                    <li>
                      <strong>Databases:</strong> PostgreSQL, MySQL, Database Design &amp; ER Modeling
                    </li>
                    <li>
                      <strong>Machine Learning &amp; MLOps:</strong> Scikit-learn, XGBoost, MLflow
                    </li>
                    <li>
                      <strong>Frontend:</strong> React, Next.js, Vite, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
                    </li>
                    <li>
                      <strong>Networking &amp; Security:</strong> TCP/IP, Subnetting (VLSM), OSI Model, Cisco Packet Tracer, VPC Security Groups &amp; NACLs
                    </li>
                  </ul>
                </section>

                {/* ── EDUCATION ── */}
                <section className={styles.docSection}>
                  <h2 className={styles.sectionHeader}>Education</h2>
                  <div className={styles.entryLine}>
                    University of Sri Jayewardenepura, Colombo, Sri Lanka | 2024 – Expected 2026
                  </div>
                  <div className={styles.entryLine}>
                    Bachelor of Science (Honours) in Computer Science (Statistics &amp; Mathematics) | GPA: 3.31 / 4.00
                  </div>
                  <ul className={styles.bulletList} style={{ marginTop: "4px" }}>
                    <li>
                      <strong>Coursework:</strong> Service-Oriented Computing, Data Structures &amp; Algorithms, Computer Security, Machine Learning, Database
                      Design &amp; ER Modeling, Net-Centric Computing, Software Quality Assurance, Object-Oriented Programming, Regression
                      Analysis, Inference Statistics
                    </li>
                  </ul>
                </section>

                {/* ── PROJECTS ── */}
                <section className={styles.docSection}>
                  <h2 className={styles.sectionHeader}>Projects</h2>

                  {/* Project 1 */}
                  <div className={styles.projectBlock}>
                    <div className={styles.projectTitle}>
                      Lanka MicroJob – Distributed Cloud Microservices Platform
                    </div>
                    <div className={styles.projectMetaLine}>
                      <span>Spring Boot, React, AWS EC2, k3s, Amazon ECR, AWS CodePipeline, Amazon RDS, k6</span>
                      <span className={styles.metaSep}>|</span>
                      <a href="https://github.com/nisa2003-ops/Lanka-Microjob-V1" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                      <span className={styles.metaSep}>|</span>
                      <a href="https://medium.com/@nisadu2003/from-docker-compose-to-kubernetes-on-aws-deploying-lanka-microjob-with-ci-cd-rds-and-load-6bfe6eea0be4" target="_blank" rel="noopener noreferrer">
                        Architecture case study
                      </a>
                      <span className={styles.metaSep}>|</span>
                      <a href="https://lanka-microjob.vercel.app/" target="_blank" rel="noopener noreferrer">
                        Live demo
                      </a>
                    </div>
                    <ul className={styles.bulletList}>
                      <li>
                        Engineered six Spring Boot microservices (API Gateway, User, Job, Matching, Broker, Notification) covering authentication, job
                        placement, commission logic and audit trails
                      </li>
                      <li>
                        Containerized the services with Docker and deployed them to a single-node k3s cluster on AWS EC2 using YAML manifests,
                        ClusterIP services, NodePort ingress and an Elastic IP
                      </li>
                      <li>
                        Built an AWS CodePipeline and CodeBuild workflow, triggered by GitHub webhooks, that runs Maven tests, builds Docker
                        images, pushes to Amazon ECR and performs rolling updates
                      </li>
                      <li>
                        Integrated Amazon RDS PostgreSQL in an isolated VPC subnet with connection pooling; k6 tests sustained 100 peak virtual
                        users with 0% failures and about 480 ms P95 latency
                      </li>
                      <li>
                        Resolved CORS preflight issues and JWT propagation through the API Gateway; added health endpoints for Kubernetes
                        liveness and readiness probes
                      </li>
                    </ul>
                  </div>

                  {/* Project 2 */}
                  <div className={styles.projectBlock}>
                    <div className={styles.projectTitle}>
                      CloudOps – Automated Cloud Deployment &amp; Reliability Platform
                    </div>
                    <div className={styles.projectMetaLine}>
                      <span>Terraform, AWS (VPC, IAM, EC2, ECR), Docker, GitHub Actions, Prometheus, Grafana, FastAPI, Python</span>
                    </div>
                    <ul className={styles.bulletList}>
                      <li>
                        Wrote modular Terraform to provision reproducible AWS infrastructure: custom VPCs, public and private subnets, internet
                        gateways, route tables, security groups and Amazon ECR repositories
                      </li>
                      <li>
                        Designed a GitHub Actions pipeline using AWS OIDC federation to remove long-lived IAM credentials, with Trivy scans that
                        gate releases on container vulnerabilities
                      </li>
                      <li>
                        Instrumented a FastAPI service with Prometheus RED metrics (rate, errors, duration) and latency histograms, and built
                        Grafana dashboards for latency and error tracking
                      </li>
                      <li>
                        Added pytest suites to the pre-merge CI workflow and wrote rollback runbooks for deployment regressions
                      </li>
                    </ul>
                  </div>

                  {/* Project 3 */}
                  <div className={styles.projectBlock}>
                    <div className={styles.projectTitle}>
                      Dengue Outbreak Risk Classifier &amp; MLOps Pipeline
                    </div>
                    <div className={styles.projectMetaLine}>
                      <span>Python, Scikit-learn, XGBoost, MLflow, FastAPI, GitHub Actions</span>
                      <span className={styles.metaSep}>|</span>
                      <a href="https://github.com/nisa2003-ops/Dengue-Risk-MLOps-1" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </div>
                    <ul className={styles.bulletList}>
                      <li>
                        Built an end-to-end outbreak risk classifier on historical case counts and weather data, splitting 13,150 training and 2,800
                        validation records chronologically to prevent target leakage
                      </li>
                      <li>
                        Engineered rolling lag features and weather moving averages; compared Logistic Regression, Random Forest and XGBoost,
                        reaching a validation macro F1 of 0.7888 and 0.8437 recall on the high-risk class
                      </li>
                      <li>
                        Tracked experiments with MLflow and served the champion model through an asynchronous FastAPI endpoint with
                        automated GitHub Actions tests
                      </li>
                    </ul>
                  </div>

                  {/* Project 4 */}
                  <div className={styles.projectBlock}>
                    <div className={styles.projectTitle}>
                      Lanka Travel Planner – AI-Powered Travel Engine
                    </div>
                    <div className={styles.projectMetaLine}>
                      <span>React, Node.js, Express, Google Gemini API, Leaflet, OpenStreetMap</span>
                      <span className={styles.metaSep}>|</span>
                      <a href="https://github.com/nisa2003-ops/Lanka-Travel-Planner" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </div>
                    <ul className={styles.bulletList}>
                      <li>
                        Built a full-stack planner that generates multi-day Sri Lankan itineraries from destination preferences, budget and traveler
                        profile, with Gemini-generated cost breakdowns and daily schedules
                      </li>
                      <li>
                        Rendered interactive route maps with Leaflet and OpenStreetMap, including waypoints and location popups
                      </li>
                    </ul>
                  </div>
                </section>

                {/* ── EXPERIENCE & LEADERSHIP ── */}
                <section className={styles.docSection}>
                  <h2 className={styles.sectionHeader}>Experience &amp; Leadership</h2>

                  <div className={styles.projectBlock}>
                    <div className={styles.projectTitle}>
                      Web Developer &amp; Lead Graphic Designer, CODEXIA 2026
                    </div>
                    <div className={styles.projectMetaLine}>
                      <span>Computer Science Association (CSA), University of Sri Jayewardenepura | 2026</span>
                      <span className={styles.metaSep}>|</span>
                      <a href="https://codexia-csa.vercel.app/" target="_blank" rel="noopener noreferrer">
                        Event platform
                      </a>
                    </div>
                    <ul className={styles.bulletList}>
                      <li>
                        Co-developed the event platform with Next.js, React and Tailwind CSS, including a canvas starfield and mobile-responsive
                        layouts
                      </li>
                      <li>
                        Produced the official media kit: promotional campaigns, formal invitations and participant and winner certificates
                      </li>
                      <li>
                        Worked with the CSA committee on competition logistics, problem guidelines and technical infrastructure
                      </li>
                    </ul>
                  </div>

                  <div className={styles.projectBlock}>
                    <div className={styles.projectTitle}>
                      Web Development Team Member, Sathsara Dahana 2026
                    </div>
                    <div className={styles.projectMetaLine}>
                      <span>Faculty of Applied Sciences, University of Sri Jayewardenepura | 2026</span>
                      <span className={styles.metaSep}>|</span>
                      <a href="https://www.sathsaradahana.live/" target="_blank" rel="noopener noreferrer">
                        Event platform
                      </a>
                    </div>
                    <ul className={styles.bulletList}>
                      <li>
                        Built the official portal for the faculty's annual cultural festival with Next.js, React and Tailwind CSS
                      </li>
                      <li>
                        Implemented an audition verification system that lets candidates check selection results by index number, plus an HTML5
                        canvas terminal bootloader and live countdowns
                      </li>
                    </ul>
                  </div>

                  <div className={styles.projectBlock}>
                    <div className={styles.projectTitle}>
                      Customer Care Executive, Startek
                    </div>
                    <div className={styles.projectMetaLine}>
                      <span>Colombo, Sri Lanka</span>
                    </div>
                    <ul className={styles.bulletList}>
                      <li>
                        Resolved tier-1 technical and customer issues for global enterprise accounts under strict SLAs, using structured root-cause
                        troubleshooting
                      </li>
                    </ul>
                  </div>
                </section>

                {/* ── CERTIFICATIONS ── */}
                <section className={styles.docSection}>
                  <h2 className={styles.sectionHeader}>Certifications</h2>
                  <ul className={styles.bulletList}>
                    <li>
                      <strong>AWS Academy Graduate:</strong>{" "}
                      <a href="https://www.credly.com/badges/acd4df5d-898e-49c9-8609-7b883f855d70/linked_in_profile" target="_blank" rel="noopener noreferrer">
                        Cloud Foundations (May 2026)
                      </a>
                      ,{" "}
                      <a href="https://www.credly.com/badges/0837b3eb-49ed-4e86-a210-a1973df227e6/public_url" target="_blank" rel="noopener noreferrer">
                        Cloud Security Foundations (Jul 2026)
                      </a>
                      ,{" "}
                      <a href="https://www.credly.com/badges/3508f16c-bc97-4ca3-98d1-a0808731e073/public_url" target="_blank" rel="noopener noreferrer">
                        Microservices &amp; CI/CD Pipeline Builder (Aug 2026)
                      </a>
                      ,{" "}
                      <a href="https://www.credly.com/badges/69c7a723-5514-4544-b8e3-d28712da6f91/public_url" target="_blank" rel="noopener noreferrer">
                        Cloud Security Builder (Sep 2026)
                      </a>
                    </li>
                    <li>
                      <strong>Cisco Networking Academy:</strong>{" "}
                      <a href="https://www.credly.com/badges/cf521714-f640-46cc-b75e-948206550a1d/public_url" target="_blank" rel="noopener noreferrer">
                        Networking Basics (Oct 2026)
                      </a>
                      ,{" "}
                      <a href="https://www.credly.com/badges/2d0be4e4-a562-4b2a-a779-1f2313a7a4e9/public_url" target="_blank" rel="noopener noreferrer">
                        Introduction to Packet Tracer (Sep 2026)
                      </a>
                    </li>
                    <li>
                      <strong>KodeKloud:</strong>{" "}
                      <a href="https://learn.kodekloud.com/certificate/8a90819f-6656-4cc5-ba1a-1e0103bd7e66" target="_blank" rel="noopener noreferrer">
                        Kubernetes Crash Course (May 2026)
                      </a>
                      ,{" "}
                      <a href="https://learn.kodekloud.com/certificate/16b70d88-49fa-45b6-87ff-315738e5ee4b" target="_blank" rel="noopener noreferrer">
                        Linux for Absolute Beginners (May 2026)
                      </a>
                    </li>
                    <li>
                      <strong>In progress:</strong> Linux Essentials (Cisco / LPI), GitOps for Platform Engineering (KodeKloud)
                    </li>
                  </ul>
                </section>
              </article>
            </div>
          )}

          {/* TAB 2: PDF DOCUMENT EMBED */}
          {activeTab === "pdf" && (
            <div className={styles.pdfViewerWrap}>
              <div className={styles.pdfNoticeBanner}>
                <span>💡 In-browser PDF preview. Mobile device blocking the PDF? Click below to open directly:</span>
                <button
                  type="button"
                  className={styles.bannerOpenPdfBtn}
                  onClick={handleOpenExternal}
                >
                  Open PDF in New Tab ↗
                </button>
              </div>
              <iframe
                src={`${OWNER.resumeUrl}#toolbar=1&navpanes=0&view=FitH`}
                title="Curriculum Vitae PDF Preview"
                className={styles.pdfIframe}
              />
            </div>
          )}
        </div>

        {/* ── Modal Footer ── */}
        <footer className={styles.modalFooter}>
          <div className={styles.footerInfo}>
            <span className={styles.footerNote}>
              💡 <strong>Tip:</strong> Toggle between <strong>Interactive</strong> (with clickable links) and <strong>PDF Embed</strong> (official document).
            </span>
          </div>
          <div className={styles.footerActions}>
            <button type="button" className={styles.dismissBtn} onClick={handleClose}>
              Close
            </button>
            <button type="button" className={styles.footerDownloadBtn} onClick={handleDownload}>
              ↓ Download PDF
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
}
