import styles from "./visuals.module.css";

export default function CloudOpsBlueprintVisual() {
  return (
    <div className={styles.blueprintCard}>
      {/* Top Header */}
      <div className={styles.blueprintHeader}>
        <div className={styles.blueprintTitle}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>Terraform IaC Blueprint</span>
        </div>
        <div className={styles.wipBadge}>
          <span className={styles.pulseAmber} />
          <span>Active Sprint · In Progress</span>
        </div>
      </div>

      {/* Terraform Resource Hierarchy */}
      <div className={styles.treeContainer}>
        <div className={styles.treeItem}>
          <span className={styles.treeIcon}>├──</span>
          <span className={styles.treeResource}>module.vpc</span>
          <span className={styles.treeComment}># 10.0.0.0/16, Multi-AZ subnets, IGW</span>
        </div>
        <div className={styles.treeItem}>
          <span className={styles.treeIcon}>├──</span>
          <span className={styles.treeResource}>module.iam_oidc</span>
          <span className={styles.treeComment}># Zero-trust GitHub Actions federation</span>
        </div>
        <div className={styles.treeItem}>
          <span className={styles.treeIcon}>├──</span>
          <span className={styles.treeResource}>module.ecr_repo</span>
          <span className={styles.treeComment}># Trivy vulnerability container scanning</span>
        </div>
        <div className={styles.treeItem}>
          <span className={styles.treeIcon}>├──</span>
          <span className={styles.treeResource}>module.ec2_sre</span>
          <span className={styles.treeComment}># Systemd Docker host &amp; security groups</span>
        </div>
        <div className={styles.treeItem}>
          <span className={styles.treeIcon}>└──</span>
          <span className={styles.treeResource}>module.telemetry</span>
          <span className={styles.treeComment}># Prometheus RED &amp; Grafana dashboards</span>
        </div>
      </div>

      {/* Engineering Roadmap Tracker */}
      <div className={styles.roadmapBox}>
        <div className={styles.milestoneRow}>
          <span className={`${styles.phaseTag} ${styles.phaseDone}`}>✓ Done</span>
          <span className={styles.milestoneDesc}>Modular Terraform AWS VPC &amp; IAM Role Provisioning</span>
        </div>
        <div className={styles.milestoneRow}>
          <span className={`${styles.phaseTag} ${styles.phaseDone}`}>✓ Done</span>
          <span className={styles.milestoneDesc}>Zero-Secret GitHub Actions CI/CD with AWS OIDC</span>
        </div>
        <div className={styles.milestoneRow}>
          <span className={`${styles.phaseTag} ${styles.phaseActive}`}>⟳ Current</span>
          <span className={styles.milestoneDesc}>Prometheus RED Metrics &amp; Grafana Observability Dashboards</span>
        </div>
      </div>
    </div>
  );
}
