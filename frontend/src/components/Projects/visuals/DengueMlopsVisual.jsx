import styles from "./visuals.module.css";

export default function DengueMlopsVisual() {
  return (
    <div className={styles.mlopsCard}>
      {/* Header */}
      <div className={styles.mlopsHeader}>
        <div className={styles.mlopsTitle}>
          <span className={styles.pulseDotGreen} />
          <span>Selected Model: XGBoost</span>
        </div>
        <span className={styles.registryBadge}>v20260926T-8605deab</span>
      </div>

      {/* Body: High-Risk Outbreak Recall + F1 Score Matrix */}
      <div className={styles.mlopsBody}>
        {/* Metric Bar Chart: High Recall & F1 Benchmarks */}
        <div className={styles.rocChartBox}>
          <span className={styles.chartLabel}>Model Evaluation Benchmark</span>
          
          <div className={styles.benchmarkBarGroup}>
            <div className={styles.benchmarkItem}>
              <div className={styles.benchmarkHeader}>
                <span className={styles.benchmarkName}>HIGH-Risk Recall</span>
                <span className={styles.benchmarkValHighlight}>84.37%</span>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFillGreen} style={{ width: "84.37%" }} />
              </div>
            </div>

            <div className={styles.benchmarkItem}>
              <div className={styles.benchmarkHeader}>
                <span className={styles.benchmarkName}>Test Macro F1</span>
                <span className={styles.benchmarkVal}>0.7888</span>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFillCyan} style={{ width: "78.88%" }} />
              </div>
            </div>

            <div className={styles.benchmarkItem}>
              <div className={styles.benchmarkHeader}>
                <span className={styles.benchmarkName}>Validation Macro F1</span>
                <span className={styles.benchmarkVal}>0.7612</span>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFillPurple} style={{ width: "76.12%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Model Provenance & Methodology Stats */}
        <div className={styles.mlopsMetricsGrid}>
          <div className={styles.metricTile}>
            <span className={styles.metricTileLabel}>High-Risk Sensitivity</span>
            <span className={styles.metricTileVal} style={{ color: "#34d399" }}>0.8437</span>
          </div>
          <div className={styles.metricTile}>
            <span className={styles.metricTileLabel}>Final Test Macro F1</span>
            <span className={styles.metricTileVal} style={{ color: "#38bdf8" }}>0.7888</span>
          </div>
          <div className={styles.metricTile}>
            <span className={styles.metricTileLabel}>Provenance File</span>
            <span className={styles.metricTileVal} style={{ color: "#a78bfa", fontSize: "0.72rem", wordBreak: "break-all" }}>
              best_model_test.json
            </span>
          </div>
        </div>
      </div>

      {/* Methodology Disclaimer Note */}
      <div className={styles.mlopsMethodologyNote}>
        <strong>⚖️ Methodology:</strong> Fitted on training period only · Frozen decision thresholds · Complete-weather filtering
      </div>
    </div>
  );
}
