import { useState } from "react";
import { useHaptics } from "../../../hooks/useHaptics";
import styles from "./visuals.module.css";

const REAL_PODS = [
  { name: "api-gateway-775448cd76-mtdlv", ready: "1/1", status: "Running", restarts: "0", age: "5m27s", port: ":9000:30900" },
  { name: "user-service-86f699c989-vb5ql", ready: "1/1", status: "Running", restarts: "0", age: "5m22s", port: ":9001" },
  { name: "job-service-5c58964cbd-nzq4j", ready: "1/1", status: "Running", restarts: "2 (19m ago)", age: "136m", port: ":9002" },
  { name: "matching-service-694dd56fcb-8lb54", ready: "1/1", status: "Running", restarts: "1 (19m ago)", age: "136m", port: ":9003" },
  { name: "broker-service-755d56dd4-hpkl4", ready: "1/1", status: "Running", restarts: "1 (19m ago)", age: "136m", port: ":9004" },
  { name: "notification-service-6f7d5695d4-v279s", ready: "1/1", status: "Running", restarts: "2 (19m ago)", age: "136m", port: ":9005" },
  { name: "postgres-788d665cd9-8m78h", ready: "1/1", status: "Running", restarts: "2 (19m ago)", age: "136m", port: ":5432" },
  { name: "frontend-8688cf4f7d-km7f4", ready: "1/1", status: "Running", restarts: "1 (19m ago)", age: "135m", port: ":80:30300" },
];

const REAL_SERVICES = [
  { name: "api-gateway", type: "NodePort", clusterIp: "10.43.57.81", ports: "9000:30900/TCP", age: "135m" },
  { name: "user-service", type: "ClusterIP", clusterIp: "10.43.222.127", ports: "9001/TCP", age: "136m" },
  { name: "job-service", type: "ClusterIP", clusterIp: "10.43.200.132", ports: "9002/TCP", age: "136m" },
  { name: "matching-service", type: "ClusterIP", clusterIp: "10.43.96.184", ports: "9003/TCP", age: "136m" },
  { name: "broker-service", type: "ClusterIP", clusterIp: "10.43.77.201", ports: "9004/TCP", age: "136m" },
  { name: "notification-service", type: "ClusterIP", clusterIp: "10.43.10.249", ports: "9005/TCP", age: "136m" },
  { name: "postgres", type: "ClusterIP", clusterIp: "10.43.200.231", ports: "5432/TCP", age: "136m" },
  { name: "frontend", type: "NodePort", clusterIp: "10.43.204.0", ports: "80:30300/TCP", age: "135m" },
];

export default function LankaTopologyVisual() {
  const [activeTab, setActiveTab] = useState("jenkins");
  const [k8sSubView, setK8sSubView] = useState("pods");
  const [cicdMode, setCicdMode] = useState("jenkins"); // 'jenkins' | 'codepipeline'
  const [selectedStage, setSelectedStage] = useState(null);
  const { triggerTapHaptic } = useHaptics();

  const handleTabChange = (tab) => {
    triggerTapHaptic();
    setActiveTab(tab);
  };

  const handleSubViewChange = (sub) => {
    triggerTapHaptic();
    setK8sSubView(sub);
  };

  const handleCicdModeChange = (mode) => {
    triggerTapHaptic();
    setCicdMode(mode);
  };

  const handleStageSelect = (id, name, cmd) => {
    triggerTapHaptic();
    setSelectedStage((prev) => (prev?.id === id ? null : { id, name, cmd }));
  };

  return (
    <div className={styles.terminalCard}>
      {/* Terminal Title Bar & Interactive Tabs */}
      <div className={styles.terminalHeader}>
        <div className={styles.windowControls}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
          <span className={styles.terminalTitle}>lanka-microjob · Production SRE</span>
        </div>

        {/* Tab Navigation */}
        <div className={styles.terminalTabs} role="tablist" aria-label="Terminal views">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "jenkins"}
            className={`${styles.tabBtn} ${activeTab === "jenkins" ? styles.tabBtnActive : ""}`}
            onClick={() => handleTabChange("jenkins")}
          >
            CI/CD Pipeline
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "pods"}
            className={`${styles.tabBtn} ${activeTab === "pods" ? styles.tabBtnActive : ""}`}
            onClick={() => handleTabChange("pods")}
          >
            kubectl k8s
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "k6"}
            className={`${styles.tabBtn} ${activeTab === "k6" ? styles.tabBtnActive : ""}`}
            onClick={() => handleTabChange("k6")}
          >
            k6 load test
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div className={styles.terminalBody}>

        {/* TAB 1: ANIMATED SERPENTINE JENKINS PIPELINE & AWS CODEPIPELINE */}
        {activeTab === "jenkins" && (
          <div className={styles.terminalScreen}>
            {/* CI/CD Header with Sub-toggle between Serpentine Jenkins & AWS CodePipeline */}
            <div className={styles.screenTopRow}>
              <div className={styles.cmdPromptRow}>
                <span className={styles.promptUser}>jenkins@ci-runner</span>
                <span className={styles.promptSep}>:</span>
                <span className={styles.promptPath}>~#</span>
                <span className={styles.promptCmd}>
                  {cicdMode === "jenkins" ? "pipeline #42 · S-Curve Stage Execution (PASSED)" : "aws codepipeline lanka-microjob-pipeline"}
                </span>
              </div>

              <div className={styles.k8sToggleGroup}>
                <button
                  type="button"
                  className={`${styles.subPill} ${cicdMode === "jenkins" ? styles.subPillActive : ""}`}
                  onClick={() => handleCicdModeChange("jenkins")}
                >
                  ⚡ Animated S-Pipeline
                </button>
                <button
                  type="button"
                  className={`${styles.subPill} ${cicdMode === "codepipeline" ? styles.subPillActive : ""}`}
                  onClick={() => handleCicdModeChange("codepipeline")}
                >
                  ☁️ AWS Console
                </button>
              </div>
            </div>

            {cicdMode === "jenkins" ? (
              /* Serpentine 3-Tier S-Curve Jenkins Pipeline */
              <div className={styles.serpentineWrapper}>
                {/* S-CURVE PIPELINE CANVAS (Desktop: Serpentine 3-tier; Mobile: Linear Clean Flow) */}
                <div className={`${styles.serpentineCanvas} ${styles.serpentineCanvasDesktop}`}>

                  {/* ── ROW 1: Left to Right (Stages 1 -> 2 -> 3 Parallel -> 4) ── */}
                  <div className={styles.snakeRow1}>
                    {/* Stage 1: Tool Install */}
                    <div
                      className={`${styles.snakeNode} ${selectedStage?.id === "tool_install" ? styles.nodeActive : ""}`}
                      onClick={() => handleStageSelect("tool_install", "Tool Install", "setup JDK 17, Maven 3.9, Node.js 18, Docker CLI")}
                    >
                      <span className={styles.nodeIcon}>✓</span>
                      <div className={styles.nodeTextCol}>
                        <span className={styles.nodeTitle}>Tool Install</span>
                      </div>
                    </div>

                    <div className={styles.snakeLineRight} />

                    {/* Stage 2: Checkout Source Code */}
                    <div
                      className={`${styles.snakeNode} ${selectedStage?.id === "checkout" ? styles.nodeActive : ""}`}
                      onClick={() => handleStageSelect("checkout", "Checkout Source Code", "git clone & checkout main @ commit 7b2adf49")}
                    >
                      <span className={styles.nodeIcon}>✓</span>
                      <div className={styles.nodeTextCol}>
                        <span className={styles.nodeTitle}>Checkout Source</span>
                      </div>
                    </div>

                    <div className={styles.snakeLineRight} />

                    {/* Stage 3: Parallel Tracks (Build Backend & Build Frontend) */}
                    <div className={styles.snakeParallelBox}>
                      <span className={styles.snakeParallelTag}>Parallel</span>
                      <div className={styles.parallelTracksCol}>
                        <div
                          className={`${styles.parallelItem} ${selectedStage?.id === "build_backend" ? styles.nodeActive : ""}`}
                          onClick={() => handleStageSelect("build_backend", "Build Backend", "mvn clean package -DskipTests=false (Spring Boot)")}
                        >
                          <span className={styles.nodeIcon}>✓</span>
                          <span className={styles.parallelTitle}>Build Backend</span>
                        </div>
                        <div
                          className={`${styles.parallelItem} ${selectedStage?.id === "build_frontend" ? styles.nodeActive : ""}`}
                          onClick={() => handleStageSelect("build_frontend", "Build Frontend", "npm run build (React / Vite production)")}
                        >
                          <span className={styles.nodeIcon}>✓</span>
                          <span className={styles.parallelTitle}>Build Frontend</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.snakeLineRight} />

                    {/* Stage 4: SonarQube Analysis */}
                    <div
                      className={`${styles.snakeNode} ${selectedStage?.id === "sonarqube" ? styles.nodeActive : ""}`}
                      onClick={() => handleStageSelect("sonarqube", "SonarQube Analysis", "sonar-scanner: 0 Bugs, 0 Vulnerabilities · Quality Gate: PASSED")}
                    >
                      <span className={styles.nodeIcon}>✓</span>
                      <div className={styles.nodeTextCol}>
                        <span className={styles.nodeTitle}>SonarQube</span>
                      </div>
                    </div>
                  </div>

                  {/* ── RIGHT S-CURVE CONNECTOR (Row 1 to Row 2) ── */}
                  <div className={styles.curveRightWrapper}>
                    <svg width="40" height="38" viewBox="0 0 40 38" fill="none" className={styles.curveSvg}>
                      <path
                        d="M 6 4 C 34 4, 34 34, 6 34"
                        stroke="#34d399"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                        className={styles.animatedStroke}
                      />
                    </svg>
                  </div>

                  {/* ── ROW 2: Right to Left (Stages 5 -> 6 -> 7) ── */}
                  {/* Visual flow: Stage 4 -> Stage 5 -> Stage 6 -> Stage 7 */}
                  <div className={styles.snakeRow2}>
                    {/* Stage 7: Deploy to Kubernetes */}
                    <div
                      className={`${styles.snakeNode} ${selectedStage?.id === "deploy_k8s" ? styles.nodeActive : ""}`}
                      onClick={() => handleStageSelect("deploy_k8s", "Deploy to Kubernetes", "kubectl apply -f k8s/ (k3s manifest rollout)")}
                    >
                      <span className={styles.nodeIcon}>✓</span>
                      <div className={styles.nodeTextCol}>
                        <span className={styles.nodeTitle}>Deploy to K8s</span>
                      </div>
                    </div>

                    <div className={styles.snakeLineLeft} />

                    {/* Stage 6: Push Docker Images */}
                    <div
                      className={`${styles.snakeNode} ${selectedStage?.id === "push_docker" ? styles.nodeActive : ""}`}
                      onClick={() => handleStageSelect("push_docker", "Push Docker Images", "docker push to Amazon ECR (sha256:7c9e81b)")}
                    >
                      <span className={styles.nodeIcon}>✓</span>
                      <div className={styles.nodeTextCol}>
                        <span className={styles.nodeTitle}>Push ECR Images</span>
                      </div>
                    </div>

                    <div className={styles.snakeLineLeft} />

                    {/* Stage 5: Build Docker Images */}
                    <div
                      className={`${styles.snakeNode} ${selectedStage?.id === "build_docker" ? styles.nodeActive : ""}`}
                      onClick={() => handleStageSelect("build_docker", "Build Docker Images", "docker build -t lanka/api-gateway -t lanka/user-service ...")}
                    >
                      <span className={styles.nodeIcon}>✓</span>
                      <div className={styles.nodeTextCol}>
                        <span className={styles.nodeTitle}>Build Docker</span>
                      </div>
                    </div>
                  </div>

                  {/* ── LEFT S-CURVE CONNECTOR (Row 2 to Row 3) ── */}
                  <div className={styles.curveLeftWrapper}>
                    <svg width="40" height="38" viewBox="0 0 40 38" fill="none" className={styles.curveSvg}>
                      <path
                        d="M 34 4 C 6 4, 6 34, 34 34"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                        className={styles.animatedStroke}
                      />
                    </svg>
                  </div>

                  {/* ── ROW 3: Left to Right (Stages 8 -> 9 -> 10) ── */}
                  <div className={styles.snakeRow3}>
                    {/* Stage 8: Restart Kubernetes Deployments */}
                    <div
                      className={`${styles.snakeNode} ${selectedStage?.id === "restart_k8s" ? styles.nodeActive : ""}`}
                      onClick={() => handleStageSelect("restart_k8s", "Restart Kubernetes Deployments", "kubectl rollout restart deployment -n default (0 downtime)")}
                    >
                      <span className={styles.nodeIcon}>✓</span>
                      <div className={styles.nodeTextCol}>
                        <span className={styles.nodeTitle}>Restart K8s Deploy</span>
                      </div>
                    </div>

                    <div className={styles.snakeLineRight} />

                    {/* Stage 9: Verify Kubernetes Deployment */}
                    <div
                      className={`${styles.snakeNode} ${selectedStage?.id === "verify_k8s" ? styles.nodeActive : ""}`}
                      onClick={() => handleStageSelect("verify_k8s", "Verify Kubernetes Deployment", "kubectl rollout status (8/8 pods Running & Healthy)")}
                    >
                      <span className={styles.nodeIcon}>✓</span>
                      <div className={styles.nodeTextCol}>
                        <span className={styles.nodeTitle}>Verify K8s Deploy</span>
                      </div>
                    </div>

                    <div className={styles.snakeLineRight} />

                    {/* Stage 10: Post Actions */}
                    <div
                      className={`${styles.snakeNode} ${selectedStage?.id === "post_actions" ? styles.nodeActive : ""}`}
                      onClick={() => handleStageSelect("post_actions", "Post Actions", "workspace cleanup & webhook deployment notification dispatched")}
                    >
                      <span className={styles.nodeIcon}>✓</span>
                      <div className={styles.nodeTextCol}>
                        <span className={styles.nodeTitle}>Post Actions</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* ── MOBILE VERTICAL PIPELINE (Clean, 100% width, No horizontal overflow) ── */}
                <div className={styles.mobilePipelineCanvas}>
                  {/* Stage 1: Tool Install */}
                  <div
                    className={`${styles.mobileStageNode} ${selectedStage?.id === "tool_install" ? styles.nodeActive : ""}`}
                    onClick={() => handleStageSelect("tool_install", "Tool Install", "setup JDK 17, Maven 3.9, Node.js 18, Docker CLI")}
                  >
                    <div className={styles.mobileStageHeader}>
                      <span className={styles.nodeIcon}>✓</span>
                      <span className={styles.mobileStageIndex}>01</span>
                      <span className={styles.mobileStageTitle}>Tool Install</span>
                    </div>
                  </div>

                  <div className={styles.mobileVConnector} />

                  {/* Stage 2: Checkout Source Code */}
                  <div
                    className={`${styles.mobileStageNode} ${selectedStage?.id === "checkout" ? styles.nodeActive : ""}`}
                    onClick={() => handleStageSelect("checkout", "Checkout Source Code", "git clone & checkout main @ commit 7b2adf49")}
                  >
                    <div className={styles.mobileStageHeader}>
                      <span className={styles.nodeIcon}>✓</span>
                      <span className={styles.mobileStageIndex}>02</span>
                      <span className={styles.mobileStageTitle}>Checkout Source Code</span>
                    </div>
                  </div>

                  <div className={styles.mobileVConnector} />

                  {/* Stage 3: Parallel Tracks */}
                  <div className={styles.mobileParallelBlock}>
                    <div className={styles.mobileParallelHeader}>
                      <span className={styles.snakeParallelTag}>⚡ Parallel Execution</span>
                      <span className={styles.mobileParallelSub}>Stage 03 · 2 Tracks</span>
                    </div>
                    <div className={styles.mobileParallelRow}>
                      <div
                        className={`${styles.mobileParallelCard} ${selectedStage?.id === "build_backend" ? styles.nodeActive : ""}`}
                        onClick={() => handleStageSelect("build_backend", "Build Backend", "mvn clean package -DskipTests=false (Spring Boot)")}
                      >
                        <div className={styles.mobileStageHeader}>
                          <span className={styles.nodeIcon}>✓</span>
                          <span className={styles.mobileStageTitle}>Build Backend</span>
                        </div>
                      </div>
                      <div
                        className={`${styles.mobileParallelCard} ${selectedStage?.id === "build_frontend" ? styles.nodeActive : ""}`}
                        onClick={() => handleStageSelect("build_frontend", "Build Frontend", "npm run build (React / Vite production)")}
                      >
                        <div className={styles.mobileStageHeader}>
                          <span className={styles.nodeIcon}>✓</span>
                          <span className={styles.mobileStageTitle}>Build Frontend</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.mobileVConnector} />

                  {/* Stage 4: SonarQube */}
                  <div
                    className={`${styles.mobileStageNode} ${selectedStage?.id === "sonarqube" ? styles.nodeActive : ""}`}
                    onClick={() => handleStageSelect("sonarqube", "SonarQube Analysis", "sonar-scanner: 0 Bugs, 0 Vulnerabilities · Quality Gate: PASSED")}
                  >
                    <div className={styles.mobileStageHeader}>
                      <span className={styles.nodeIcon}>✓</span>
                      <span className={styles.mobileStageIndex}>04</span>
                      <span className={styles.mobileStageTitle}>SonarQube Quality Gate</span>
                    </div>
                  </div>

                  <div className={styles.mobileVConnector} />

                  {/* Stage 5: Build Docker Images */}
                  <div
                    className={`${styles.mobileStageNode} ${selectedStage?.id === "build_docker" ? styles.nodeActive : ""}`}
                    onClick={() => handleStageSelect("build_docker", "Build Docker Images", "docker build -t lanka/api-gateway -t lanka/user-service ...")}
                  >
                    <div className={styles.mobileStageHeader}>
                      <span className={styles.nodeIcon}>✓</span>
                      <span className={styles.mobileStageIndex}>05</span>
                      <span className={styles.mobileStageTitle}>Build Docker Images</span>
                    </div>
                  </div>

                  <div className={styles.mobileVConnector} />

                  {/* Stage 6: Push Docker Images */}
                  <div
                    className={`${styles.mobileStageNode} ${selectedStage?.id === "push_docker" ? styles.nodeActive : ""}`}
                    onClick={() => handleStageSelect("push_docker", "Push Docker Images", "docker push to Amazon ECR (sha256:7c9e81b)")}
                  >
                    <div className={styles.mobileStageHeader}>
                      <span className={styles.nodeIcon}>✓</span>
                      <span className={styles.mobileStageIndex}>06</span>
                      <span className={styles.mobileStageTitle}>Push ECR Images</span>
                    </div>
                  </div>

                  <div className={styles.mobileVConnector} />

                  {/* Stage 7: Deploy to Kubernetes */}
                  <div
                    className={`${styles.mobileStageNode} ${selectedStage?.id === "deploy_k8s" ? styles.nodeActive : ""}`}
                    onClick={() => handleStageSelect("deploy_k8s", "Deploy to Kubernetes", "kubectl apply -f k8s/ (k3s manifest rollout)")}
                  >
                    <div className={styles.mobileStageHeader}>
                      <span className={styles.nodeIcon}>✓</span>
                      <span className={styles.mobileStageIndex}>07</span>
                      <span className={styles.mobileStageTitle}>Deploy to Kubernetes</span>
                    </div>
                  </div>

                  <div className={styles.mobileVConnector} />

                  {/* Stage 8: Restart Kubernetes Deployments */}
                  <div
                    className={`${styles.mobileStageNode} ${selectedStage?.id === "restart_k8s" ? styles.nodeActive : ""}`}
                    onClick={() => handleStageSelect("restart_k8s", "Restart Kubernetes Deployments", "kubectl rollout restart deployment -n default (0 downtime)")}
                  >
                    <div className={styles.mobileStageHeader}>
                      <span className={styles.nodeIcon}>✓</span>
                      <span className={styles.mobileStageIndex}>08</span>
                      <span className={styles.mobileStageTitle}>Restart K8s Deployments</span>
                    </div>
                  </div>

                  <div className={styles.mobileVConnector} />

                  {/* Stage 9: Verify Kubernetes Deployment */}
                  <div
                    className={`${styles.mobileStageNode} ${selectedStage?.id === "verify_k8s" ? styles.nodeActive : ""}`}
                    onClick={() => handleStageSelect("verify_k8s", "Verify Kubernetes Deployment", "kubectl rollout status (8/8 pods Running & Healthy)")}
                  >
                    <div className={styles.mobileStageHeader}>
                      <span className={styles.nodeIcon}>✓</span>
                      <span className={styles.mobileStageIndex}>09</span>
                      <span className={styles.mobileStageTitle}>Verify K8s Health (8/8)</span>
                    </div>
                  </div>

                  <div className={styles.mobileVConnector} />

                  {/* Stage 10: Post Actions */}
                  <div
                    className={`${styles.mobileStageNode} ${selectedStage?.id === "post_actions" ? styles.nodeActive : ""}`}
                    onClick={() => handleStageSelect("post_actions", "Post Actions", "workspace cleanup & webhook deployment notification dispatched")}
                  >
                    <div className={styles.mobileStageHeader}>
                      <span className={styles.nodeIcon}>✓</span>
                      <span className={styles.mobileStageIndex}>10</span>
                      <span className={styles.mobileStageTitle}>Post Actions &amp; Notify</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Stage Inspector Bar */}
                <div className={styles.stageInspectorBox}>
                  <span className={styles.inspectorLabel}>
                    STAGE LOG:
                  </span>
                  <span className={styles.inspectorCmd}>
                    {selectedStage ? `${selectedStage.name} ➔ ${selectedStage.cmd}` : "Click any stage node to inspect automated command & verify rollout"}
                  </span>
                </div>
              </div>
            ) : (
              /* AWS Console View (Picture 2 from User) */
              <div className={styles.awsConsoleWrapper}>
                <div className={styles.awsPipelineHeader}>
                  <div className={styles.awsPipelineTitleRow}>
                    <span className={styles.awsLogoIcon}>☁️</span>
                    <span className={styles.awsPipelineName}>lanka-microjob-pipeline</span>
                    <span className={styles.awsStatusSuccessPill}>● Succeeded</span>
                  </div>
                  <div className={styles.awsExecIdRow}>
                    <span>Exec ID: <strong>c93c95d7-5920-4b92-ab55-b6d2671309b5</strong></span>
                    <span>Commit: <strong className={styles.commitCode}>7b2adf49</strong> (Update buildspec.yml)</span>
                  </div>
                </div>

                <div className={styles.pipelineFlowGrid}>
                  <div className={styles.pipelineStageCard}>
                    <div className={styles.stageCardHeader}>
                      <span className={styles.stageCheckIcon}>✓</span>
                      <span className={styles.stageName}>Source</span>
                    </div>
                    <div className={styles.stageActionBox}>
                      <div className={styles.stageActionProvider}>GitHub (via GitHub App)</div>
                      <div className={styles.stageActionCommit}>7b2adf49 · Update buildspec.yml</div>
                      <div className={styles.stageActionStatus}>Succeeded</div>
                    </div>
                  </div>

                  <div className={styles.stageConnector}>➔</div>
                  <div className={styles.stageConnectorVertical}>↓</div>

                  <div className={styles.pipelineStageCard}>
                    <div className={styles.stageCardHeader}>
                      <span className={styles.stageCheckIcon}>✓</span>
                      <span className={styles.stageName}>Build</span>
                    </div>
                    <div className={styles.stageActionBox}>
                      <div className={styles.stageActionProvider}>AWS CodeBuild</div>
                      <div className={styles.stageActionCommit}>Docker image compilation</div>
                      <div className={styles.stageActionStatus}>Succeeded</div>
                    </div>
                  </div>

                  <div className={styles.stageConnector}>➔</div>
                  <div className={styles.stageConnectorVertical}>↓</div>

                  <div className={styles.pipelineStageCard}>
                    <div className={styles.stageCardHeader}>
                      <span className={styles.stageCheckIcon}>✓</span>
                      <span className={styles.stageName}>Deploy</span>
                    </div>
                    <div className={styles.stageActionBox}>
                      <div className={styles.stageActionProvider}>Amazon EC2</div>
                      <div className={styles.stageActionCommit}>k3s Rolling Deployment</div>
                      <div className={styles.stageActionStatus}>Succeeded · Just now</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REAL KUBERNETES PODS & SERVICES */}
        {activeTab === "pods" && (
          <div className={styles.terminalScreen}>
            <div className={styles.screenTopRow}>
              <div className={styles.cmdPromptRow}>
                <span className={styles.promptUser}>nisadu@aws-ec2</span>
                <span className={styles.promptSep}>:</span>
                <span className={styles.promptPath}>~#</span>
                <span className={styles.promptCmd}>
                  {k8sSubView === "pods" ? "kubectl get pods -n default" : "kubectl get svc -n default"}
                </span>
              </div>

              <div className={styles.k8sToggleGroup}>
                <button
                  type="button"
                  className={`${styles.subPill} ${k8sSubView === "pods" ? styles.subPillActive : ""}`}
                  onClick={() => handleSubViewChange("pods")}
                >
                  Pods (8/8)
                </button>
                <button
                  type="button"
                  className={`${styles.subPill} ${k8sSubView === "services" ? styles.subPillActive : ""}`}
                  onClick={() => handleSubViewChange("services")}
                >
                  Services
                </button>
              </div>
            </div>

            {k8sSubView === "pods" ? (
              <div className={styles.terminalTableWrap}>
                <table className={styles.terminalTable}>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>READY</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REAL_PODS.map((pod) => (
                      <tr key={pod.name}>
                        <td className={styles.podName}>{pod.name}</td>
                        <td>{pod.ready}</td>
                        <td className={styles.statusRunning}>{pod.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={styles.terminalTableWrap}>
                <table className={styles.terminalTable}>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>TYPE</th>
                      <th>CLUSTER-IP</th>
                      <th>PORT(S)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REAL_SERVICES.map((svc) => (
                      <tr key={svc.name}>
                        <td className={styles.podName}>{svc.name}</td>
                        <td>
                          <span className={svc.type === "NodePort" ? styles.typeNodePort : styles.typeClusterIp}>
                            {svc.type}
                          </span>
                        </td>
                        <td className={styles.dimText}>{svc.clusterIp}</td>
                        <td className={styles.portText}>{svc.ports}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className={styles.terminalSubBar}>
              <span className={styles.subBarItem}>
                <span className={styles.pulseDotGreen} /> 8/8 Pods Running
              </span>
              <span className={styles.subBarItem}>ClusterIPs: 10.43.x.x</span>
              <span className={styles.subBarItem}>NodePorts: 30900, 30300</span>
              <span className={styles.subBarItem}>k3s on AWS EC2</span>
            </div>
          </div>
        )}

        {/* TAB 3: K6 LOAD TEST BENCHMARK */}
        {activeTab === "k6" && (
          <div className={styles.terminalScreen}>
            <div className={styles.cmdPromptRow}>
              <span className={styles.promptUser}>nisadu@aws-ec2</span>
              <span className={styles.promptSep}>:</span>
              <span className={styles.promptPath}>~#</span>
              <span className={styles.promptCmd}>k6 run --vus 100 --duration 10m stress_test.js</span>
            </div>

            <div className={styles.k6LogBox}>
              <div className={styles.k6AssertRow}>
                <span className={styles.k6CheckGreen}>✓</span>
                <span className={styles.k6CheckText}>HTTP response status is 200</span>
                <span className={styles.k6CheckVal}>100.00% (48,210 reqs)</span>
              </div>
              <div className={styles.k6AssertRow}>
                <span className={styles.k6CheckGreen}>✓</span>
                <span className={styles.k6CheckText}>P95 response latency &lt; 500ms</span>
                <span className={styles.k6CheckVal}>~480ms (Target Met)</span>
              </div>

              <div className={styles.k6MetricsGrid}>
                <div className={styles.k6MetricItem}>
                  <span className={styles.k6MetricKey}>target:</span>
                  <span className={styles.k6MetricValCyan}>api-gateway:30900</span>
                </div>
                <div className={styles.k6MetricItem}>
                  <span className={styles.k6MetricKey}>checks:</span>
                  <span className={styles.k6MetricValGreen}>100.00% ✓ 48210 ✗ 0</span>
                </div>
                <div className={styles.k6MetricItem}>
                  <span className={styles.k6MetricKey}>http_req_failed:</span>
                  <span className={styles.k6MetricValGreen}>0.00% (0 errors)</span>
                </div>
                <div className={styles.k6MetricItem}>
                  <span className={styles.k6MetricKey}>concurrent_load:</span>
                  <span className={styles.k6MetricValCyan}>100 VUs Peak</span>
                </div>
              </div>
            </div>

            <div className={styles.terminalSubBar}>
              <span className={styles.subBarItem}>
                <span className={styles.pulseDotGreen} /> Stress Test Verified
              </span>
              <span className={styles.subBarItem}>Mixed API Workload</span>
              <span className={styles.subBarItem}>0 Failures</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Telemetry Performance Stats */}
      <div className={styles.topologyFooter}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Peak k6 Load</span>
          <span className={styles.statValue}>100 VUs</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>HTTP Error Rate</span>
          <span className={styles.statValue} style={{ color: "#4ade80" }}>0.00%</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>P95 Latency</span>
          <span className={styles.statValue} style={{ color: "#38bdf8" }}>~480ms</span>
        </div>
      </div>
    </div>
  );
}
