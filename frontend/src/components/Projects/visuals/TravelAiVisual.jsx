import styles from "./visuals.module.css";

export default function TravelAiVisual() {
  return (
    <div className={styles.travelVisualCard}>
      {/* Top Header */}
      <div className={styles.travelVisualHeader}>
        <div className={styles.travelTitle}>
          <span className={styles.aiSparkle}>✨</span>
          <span>Gemini 1.5 Flash · Route Engine</span>
        </div>
        <span className={styles.travelWaypointsBadge}>14 GeoJSON Waypoints</span>
      </div>

      {/* AI Prompt Snippet */}
      <div className={styles.promptSnippetBox}>
        <span className={styles.promptLabel}>PROMPT:</span>
        <span className={styles.promptText}>
          &quot;Generate optimized 7-day Sri Lanka scenic route with budget &lt; $45/day&quot;
        </span>
      </div>

      {/* Timeline Itinerary & Route Waypoints */}
      <div className={styles.routeTimeline}>
        <div className={styles.routeStep}>
          <div className={styles.stepBulletCyan} />
          <div className={styles.stepInfo}>
            <div className={styles.stepHead}>
              <span className={styles.stepDay}>Day 1–2</span>
              <span className={styles.stepLocation}>Sigiriya &amp; Dambulla</span>
              <span className={styles.stepBudget}>$35/day</span>
            </div>
            <p className={styles.stepSub}>Ancient rock fortress, cave temples &amp; elephant safari</p>
          </div>
        </div>

        <div className={styles.routeStep}>
          <div className={styles.stepBulletPurple} />
          <div className={styles.stepInfo}>
            <div className={styles.stepHead}>
              <span className={styles.stepDay}>Day 3–4</span>
              <span className={styles.stepLocation}>Kandy &amp; Nuwara Eliya</span>
              <span className={styles.stepBudget}>$42/day</span>
            </div>
            <p className={styles.stepSub}>Tea plantations, highland rail journey &amp; botanical gardens</p>
          </div>
        </div>

        <div className={styles.routeStep}>
          <div className={styles.stepBulletGreen} />
          <div className={styles.stepInfo}>
            <div className={styles.stepHead}>
              <span className={styles.stepDay}>Day 5–7</span>
              <span className={styles.stepLocation}>Ella &amp; Mirissa Coast</span>
              <span className={styles.stepBudget}>$38/day</span>
            </div>
            <p className={styles.stepSub}>Nine Arches bridge, Little Adam&apos;s Peak &amp; beach surf</p>
          </div>
        </div>
      </div>

      {/* Engine Metrics Footer */}
      <div className={styles.travelMetricsRow}>
        <div className={styles.travelMiniMetric}>
          <span className={styles.miniMetricLabel}>LLM Latency</span>
          <span className={styles.miniMetricVal} style={{ color: "#38bdf8" }}>~1.2s</span>
        </div>
        <div className={styles.travelMiniMetric}>
          <span className={styles.miniMetricLabel}>Map Engine</span>
          <span className={styles.miniMetricVal} style={{ color: "#a78bfa" }}>Leaflet OSM</span>
        </div>
        <div className={styles.travelMiniMetric}>
          <span className={styles.miniMetricLabel}>Cost Variance</span>
          <span className={styles.miniMetricVal} style={{ color: "#4ade80" }}>±3.2%</span>
        </div>
      </div>
    </div>
  );
}
