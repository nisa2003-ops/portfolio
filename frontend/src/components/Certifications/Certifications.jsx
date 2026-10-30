import { useState } from "react";
import FadeIn from "../FadeIn";
import { CERTIFICATIONS } from "../../constants/data";
import { useHaptics } from "../../hooks/useHaptics";
import CertificateModal from "./CertificateModal";
import styles from "./Certifications.module.css";

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { triggerTapHaptic } = useHaptics();

  // Dynamic Metrics & Counts derived automatically from CERTIFICATIONS
  const totalCount = CERTIFICATIONS.length;
  const awsCount = CERTIFICATIONS.filter((c) => c.category === "aws").length;
  const ciscoCount = CERTIFICATIONS.filter((c) => c.category === "cisco").length;
  const linuxK8sCount = CERTIFICATIONS.filter((c) => c.category === "linux-k8s").length;
  const platformCount = CERTIFICATIONS.filter((c) => c.category === "platform" || c.category === "gitops").length;

  const categories = [
    { id: "all", label: "All Credentials", count: totalCount },
    { id: "aws", label: "☁️ AWS Cloud", count: awsCount },
    { id: "cisco", label: "🌐 Cisco Networking", count: ciscoCount },
    { id: "linux-k8s", label: "🐧 Linux & Kubernetes", count: linuxK8sCount },
    ...(platformCount > 0
      ? [{ id: "platform", label: "⚙️ Platform & GitOps", count: platformCount }]
      : []),
  ];

  const priority = ["cert-8", "cert-5", "cert-7", "cert-2", "cert-3", "cert-1", "cert-6", "cert-4"];
  const rank = (id) => (priority.includes(id) ? priority.indexOf(id) : priority.length);
  const ordered = [...CERTIFICATIONS].sort((a, b) => rank(a.id) - rank(b.id));

  const filteredCerts =
    activeFilter === "all"
      ? ordered
      : ordered.filter((cert) =>
          activeFilter === "platform"
            ? cert.category === "platform" || cert.category === "gitops"
            : cert.category === activeFilter
        );

  const visibleCerts =
    activeFilter === "all" && !showAll
      ? filteredCerts.slice(0, 6)
      : filteredCerts;

  const handleFilterChange = (categoryId) => {
    triggerTapHaptic();
    setActiveFilter(categoryId);
    setShowAll(false);
  };

  const handleOpenModal = (cert) => {
    triggerTapHaptic();
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="certifications" className={styles.section}>
      <div className="section-inner">
        {/* Section Header */}
        <FadeIn>
          <p className="section-label">Credential Vault</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="section-title">Courses &amp; Certifications</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="section-description">
            Verified engineering credentials across Cloud Architecture, CI/CD Delivery Pipelines, Enterprise Networking, and Linux/Kubernetes runtime systems.
          </p>
        </FadeIn>

        {/* ── TOP TELEMETRY STATS BAR (Dynamic Auto-Calculated Counts) ── */}
        <FadeIn delay={0.2}>
          <div className={styles.telemetryStatBar}>
            <div className={`${styles.statChip} ${styles.statChipPrimary}`}>
              <span className={styles.statCount}>{totalCount}</span>
              <span className={styles.statName}>Total Credentials</span>
            </div>
            <div className={styles.statDivider} />
            <div className={`${styles.statChip} ${styles.statChipPrimary}`}>
              <span className={styles.statCountGreen}>
                <span className={styles.pulseGreenDot} /> 100%
              </span>
              <span className={styles.statName}>Registry Verified</span>
            </div>
            <div className={styles.statDivider} />
            <div className={`${styles.statChip} ${styles.statChipVendor}`}>
              <span className={styles.statCountAmber}>{awsCount}x</span>
              <span className={styles.statName}>AWS Badges</span>
            </div>
            <div className={styles.statDivider} />
            <div className={`${styles.statChip} ${styles.statChipVendor}`}>
              <span className={styles.statCountCyan}>{ciscoCount}x</span>
              <span className={styles.statName}>Cisco Certs</span>
            </div>
            <div className={styles.statDivider} />
            <div className={`${styles.statChip} ${styles.statChipVendor}`}>
              <span className={styles.statCountEmerald}>{linuxK8sCount}x</span>
              <span className={styles.statName}>Linux &amp; K8s</span>
            </div>
            {platformCount > 0 && (
              <>
                <div className={styles.statDivider} />
                <div className={`${styles.statChip} ${styles.statChipVendor}`}>
                  <span className={styles.statCountCyan}>{platformCount}x</span>
                  <span className={styles.statName}>GitOps</span>
                </div>
              </>
            )}
          </div>
        </FadeIn>

        {/* ── CATEGORY FILTER TABS ── */}
        <FadeIn delay={0.25}>
          <div className={styles.filterTabsRow} role="tablist" aria-label="Certification categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === cat.id}
                className={`${styles.filterTab} ${activeFilter === cat.id ? styles.filterTabActive : ""}`}
                onClick={() => handleFilterChange(cat.id)}
              >
                <span>{cat.label}</span>
                <span className={styles.filterCountBadge}>{cat.count}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* ── BENTO CREDENTIALS GRID ── */}
        <div className={styles.grid}>
          {visibleCerts.map((cert, i) => (
            <FadeIn key={cert.id} delay={0.05 * i}>
              <article
                className={styles.card}
                data-spotlight="true"
                style={{
                  "--cert-accent": cert.accentColor || "#38bdf8",
                }}
                onClick={() => handleOpenModal(cert)}
              >
                {/* Brand Aura Edge Highlight */}
                <div className={styles.cardGlowBorder} />

                {/* Top Card Bar: Logo + Issuer Tag + Verified Pill */}
                <div className={styles.top}>
                  <div className={styles.logoWrap}>
                    <span
                      className={styles.iconBox}
                      style={{ background: cert.logoBackground || "#ffffff" }}
                    >
                      <img
                        className={styles.logo}
                        src={cert.logo}
                        alt={cert.logoAlt || cert.title}
                        loading="lazy"
                      />
                    </span>
                    <span className={styles.issuerShortTag}>{cert.issuerShort || cert.platform}</span>
                  </div>

                  <span className={styles.verifiedChip}>
                    <span className={styles.pulseGreenDot} />
                    {cert.verificationType?.includes("Credly") ? "Credly" : "KodeKloud"}
                  </span>
                </div>

                {/* Certificate Title */}
                <h3 className={styles.title}>{cert.title}</h3>

                {/* Competency Skill Tags */}
                {cert.skills && (
                  <div className={styles.skillTagsRow}>
                    {cert.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className={styles.skillTagMore}>+{cert.skills.length - 3}</span>
                    )}
                  </div>
                )}

                {/* Bottom Card Bar: Date + Interactive Actions */}
                <div className={styles.bottom}>
                  <span className={styles.date}>{cert.date}</span>

                  <div className={styles.cardActionsRow}>
                    <button
                      type="button"
                      className={styles.inspectBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(cert);
                      }}
                      title="Inspect Credential"
                    >
                      Inspect
                    </button>

                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.directVerifyBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerTapHaptic();
                      }}
                      title="Verify Official Credential in New Tab"
                      aria-label={`Verify ${cert.title}`}
                    >
                      ↗
                    </a>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* ── SHOW ALL / SHOW FEWER TOGGLE (For "All" Section) ── */}
        {activeFilter === "all" && filteredCerts.length > 6 && (
          <FadeIn delay={0.1}>
            <div className={styles.viewAllWrapper}>
              <button
                type="button"
                className={styles.viewAllBtn}
                onClick={() => {
                  triggerTapHaptic();
                  setShowAll((prev) => !prev);
                }}
                aria-expanded={showAll}
              >
                <span>{showAll ? "Show Fewer Certifications" : `View All Certifications (${filteredCerts.length})`}</span>
                <span className={styles.viewAllIcon}>{showAll ? "↑" : "↓"}</span>
              </button>
            </div>
          </FadeIn>
        )}
      </div>

      {/* ── HIGH-FIDELITY CREDENTIAL MODAL (Concept 2 Integration) ── */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
