import { useState } from "react";
import { useHaptics } from "../../../hooks/useHaptics";
import styles from "./visuals.module.css";

const TABS = [
  { id: "iac", label: "Terraform IaC" },
  { id: "cicd", label: "OIDC CI/CD" },
  { id: "chaos", label: "Chaos & Alerts" },
];

export default function CloudOpsBlueprintVisual() {
  const [activeTab, setActiveTab] = useState("iac");
  const { triggerTapHaptic } = useHaptics();

  const handleTabChange = (tabId) => {
    triggerTapHaptic();
    setActiveTab(tabId);
  };

  return (
    <div className={styles.blueprintCard}>
      {/* Top Header */}
      <div className={styles.blueprintHeader}>
        <div className={styles.blueprintTitle}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>CloudOps · SRE Stack</span>
        </div>

        <div className={styles.cloudopsHeaderRight}>
          <div className={styles.cloudopsTabs} role="tablist" aria-label="CloudOps architecture views">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`${styles.cloudopsTabBtn} ${activeTab === tab.id ? styles.cloudopsTabBtnActive : ""}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TAB 1: MODULAR TERRAFORM & COST/SECURITY HARDENING */}
      {activeTab === "iac" && (
        <div className={styles.cloudopsPanel}>
          <div className={styles.treeContainer}>
            <div className={styles.treeItem}>
              <span className={styles.treeIcon}>├──</span>
              <span className={styles.treeResource}>module.vpc</span>
              <span className={styles.treeComment}># Zero-NAT dev VPC (~$32/mo saved)</span>
            </div>
            <div className={styles.treeItem}>
              <span className={styles.treeIcon}>├──</span>
              <span className={styles.treeResource}>module.security_groups</span>
              <span className={styles.treeComment}># Port 22 closed · SSM-only access</span>
            </div>
            <div className={styles.treeItem}>
              <span className={styles.treeIcon}>├──</span>
              <span className={styles.treeResource}>module.iam</span>
              <span className={styles.treeComment}># OIDC + SSMCore + ECRReadOnly</span>
            </div>
            <div className={styles.treeItem}>
              <span className={styles.treeIcon}>├──</span>
              <span className={styles.treeResource}>module.ecr &amp; ec2</span>
              <span className={styles.treeComment}># Two-stage slim · UID 10001 non-root</span>
            </div>
            <div className={styles.treeItem}>
              <span className={styles.treeIcon}>└──</span>
              <span className={styles.treeResource}>bootstrap/state</span>
              <span className={styles.treeComment}># Optional S3 + DynamoDB state lock</span>
            </div>
          </div>

          <div className={styles.cloudopsMetricsRow}>
            <div className={styles.cloudopsMiniTile}>
              <span className={styles.miniMetricLabel}>Container User</span>
              <span className={styles.miniMetricVal} style={{ color: "#38bdf8" }}>UID 10001</span>
            </div>
            <div className={styles.cloudopsMiniTile}>
              <span className={styles.miniMetricLabel}>SSH Port 22</span>
              <span className={styles.miniMetricVal} style={{ color: "#4ade80" }}>Closed (SSM)</span>
            </div>
            <div className={styles.cloudopsMiniTile}>
              <span className={styles.miniMetricLabel}>Dev VPC Cost</span>
              <span className={styles.miniMetricVal} style={{ color: "#a78bfa" }}>~$32/mo Saved</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ZERO-SECRET OIDC CI/CD & AUTO ROLLBACK */}
      {activeTab === "cicd" && (
        <div className={styles.cloudopsPanel}>
          <div className={styles.cloudopsFlowGroup}>
            <div className={styles.cloudopsFlowBlock}>
              <span className={styles.cloudopsFlowLabel}>CI · Push &amp; PR Gate</span>
              <div className={styles.cloudopsSteps}>
                <span className={styles.cloudopsStep}>Flake8 Lint</span>
                <span className={styles.cloudopsArrow}>→</span>
                <span className={styles.cloudopsStep}>Pytest Suite</span>
                <span className={styles.cloudopsArrow}>→</span>
                <span className={styles.cloudopsStep}>2-Stage Build</span>
                <span className={styles.cloudopsArrow}>→</span>
                <span className={styles.cloudopsStepWarn}>Trivy Scan</span>
              </div>
            </div>

            <div className={styles.cloudopsFlowBlock}>
              <span className={styles.cloudopsFlowLabel}>CD · Zero-Secret OIDC Deploy</span>
              <div className={styles.cloudopsSteps}>
                <span className={styles.cloudopsStep}>AWS OIDC STS</span>
                <span className={styles.cloudopsArrow}>→</span>
                <span className={styles.cloudopsStep}>ECR :sha</span>
                <span className={styles.cloudopsArrow}>→</span>
                <span className={styles.cloudopsStep}>SSM RunCmd</span>
                <span className={styles.cloudopsArrow}>→</span>
                <span className={styles.cloudopsStepOk}>/health Check</span>
              </div>
            </div>
          </div>

          <div className={styles.cloudopsNoteBox}>
            <span className={`${styles.phaseTag} ${styles.phaseDone}`}>Auto-Rollback</span>
            <span className={styles.milestoneDesc}>
              Reverts EC2 container to <code>:previous</code> if <code>/health</code> fails; <code>/ready</code> returns <code>503</code> when unready.
            </span>
          </div>
        </div>
      )}

      {/* TAB 3: PROMETHEUS RED TELEMETRY & CHAOS DRILLS */}
      {activeTab === "chaos" && (
        <div className={styles.cloudopsPanel}>
          <div className={styles.cloudopsAlertsGrid}>
            <div className={styles.cloudopsAlertRow}>
              <span className={styles.alertRuleName}>ServiceDown</span>
              <code className={styles.alertEndpoint}>/chaos/toggle-readiness</code>
              <span className={`${styles.phaseTag} ${styles.phaseDone}`}>503 Probe</span>
            </div>
            <div className={styles.cloudopsAlertRow}>
              <span className={styles.alertRuleName}>HighHttpErrorRate</span>
              <code className={styles.alertEndpoint}>/chaos/error</code>
              <span className={`${styles.phaseTag} ${styles.phaseActive}`}>&gt;5% 5xx</span>
            </div>
            <div className={styles.cloudopsAlertRow}>
              <span className={styles.alertRuleName}>HighRequestLatencyP95</span>
              <code className={styles.alertEndpoint}>/chaos/inject-latency</code>
              <span className={`${styles.phaseTag} ${styles.phaseActive}`}>P95 &gt;500ms</span>
            </div>
          </div>

          <div className={styles.cloudopsNoteBox}>
            <span className={`${styles.phaseTag} ${styles.phaseDone}`}>RED Telemetry</span>
            <span className={styles.milestoneDesc}>
              <code>compose.yaml</code> + <code>simulate_traffic.py</code> + <code>health_check.py</code> validate Prometheus alerts &amp; Grafana (excluding <code>/metrics</code> scrapes).
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
