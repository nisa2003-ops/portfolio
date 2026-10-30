import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useHaptics } from "../../hooks/useHaptics";
import styles from "./CertificateModal.module.css";

export default function CertificateModal({ certificate, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
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

  if (!isOpen || !certificate) return null;

  const handleCopyId = (e) => {
    e.stopPropagation();
    if (!certificate.credentialId) return;
    navigator.clipboard.writeText(certificate.credentialId).then(() => {
      triggerSuccessHaptic();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClose = () => {
    triggerTapHaptic();
    onClose();
  };

  const handleVerifyClick = () => {
    triggerTapHaptic();
  };

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div
        className={styles.modal}
        style={{
          "--cert-theme": certificate.accentColor || "#38bdf8",
        }}
      >
        {/* Glowing Ambient Aura */}
        <div className={styles.ambientGlow} />

        {/* Top Navigation & Status */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.verificationChip}>
              <span className={styles.pulseGreenDot} />
              {certificate.verificationType || "Official Credential"}
            </span>
            <span className={styles.issuerTag}>{certificate.issuerShort || certificate.platform}</span>
          </div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close credential details"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className={styles.modalBody}>
          {/* Badge Medallion Showcase */}
          <div className={styles.badgeShowcase}>
            <div className={styles.medallionFrame}>
              <div
                className={styles.medallionIconBox}
                style={{ background: certificate.logoBackground || "#ffffff" }}
              >
                <img
                  src={certificate.logo}
                  alt={certificate.logoAlt || certificate.title}
                  className={styles.medallionLogo}
                />
              </div>
              <div className={styles.medallionSheen} />
            </div>

            <div className={styles.badgeTitleMeta}>
              <span className={styles.platformLabel}>{certificate.platform}</span>
              <h2 id="cert-modal-title" className={styles.certTitle}>
                {certificate.title}
              </h2>
            </div>
          </div>

          {/* Quick Credential Telemetry Grid */}
          <div className={styles.telemetryGrid}>
            <div className={styles.telemetryCard}>
              <span className={styles.telemetryLabel}>ISSUE DATE</span>
              <span className={styles.telemetryValue}>{certificate.date}</span>
            </div>

            <div className={styles.telemetryCard}>
              <span className={styles.telemetryLabel}>ISSUING AUTHORITY</span>
              <span className={styles.telemetryValue}>{certificate.platform}</span>
            </div>

            <div className={`${styles.telemetryCard} ${styles.telemetryCardSpan2}`}>
              <div className={styles.idRow}>
                <span className={styles.telemetryLabel}>CREDENTIAL ID / VERIFICATION HASH</span>
                <button
                  type="button"
                  className={styles.copyIdBtn}
                  onClick={handleCopyId}
                  title="Copy Credential ID"
                >
                  {copied ? "✓ Copied" : "📋 Copy ID"}
                </button>
              </div>
              <code className={styles.credentialIdCode}>
                {certificate.credentialId || "Verified Registry Record"}
              </code>
            </div>
          </div>

          {/* Learning Scope & Summary */}
          {certificate.summary && (
            <div className={styles.summaryBox}>
              <span className={styles.sectionHeading}>Curriculum &amp; Learning Scope</span>
              <p className={styles.summaryText}>{certificate.summary}</p>
            </div>
          )}

          {/* Competencies & Skills Acquired */}
          {certificate.skills && certificate.skills.length > 0 && (
            <div className={styles.skillsSection}>
              <span className={styles.sectionHeading}>Competencies &amp; Technical Skills</span>
              <div className={styles.skillsPills}>
                {certificate.skills.map((skill) => (
                  <span key={skill} className={styles.skillPill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className={styles.modalFooter}>
          <button
            type="button"
            className={styles.dismissBtn}
            onClick={handleClose}
          >
            Close
          </button>

          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.verifyPrimaryBtn}
            onClick={handleVerifyClick}
          >
            <span>Verify on {certificate.verificationType?.includes("Credly") ? "Credly" : "KodeKloud"}</span>
            <span className={styles.arrowIcon}>↗</span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
