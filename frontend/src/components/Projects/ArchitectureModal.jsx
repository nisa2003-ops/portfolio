import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./ArchitectureModal.module.css";

const MICROSERVICES = [
  {
    name: "API Gateway",
    port: ":9000",
    bullets: ["Single Entry Point", "Request Routing", "CORS Handling"],
  },
  {
    name: "User Service",
    port: ":9001",
    bullets: ["User Registration", "JWT Auth Generation", "Admin Approval Flow"],
  },
  {
    name: "Job Service",
    port: ":9002",
    bullets: ["Job Post Management", "Application Lifecycle", "Capacity Locking"],
  },
  {
    name: "Matching Service",
    port: ":9003",
    bullets: ["Skill Coverage Score", "District Compatibility", "Deterministic Engine"],
  },
  {
    name: "Broker Service",
    port: ":9004",
    bullets: ["Offline Worker Management", "Proxy Placements", "Commission Math"],
  },
  {
    name: "Notification Svc",
    port: ":9005",
    bullets: ["Event Audit Logs", "Simulated Providers", "System Notifications"],
  },
];

function SvgDiagramViewer({ src }) {
  const [svgHtml, setSvgHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fitWidth, setFitWidth] = useState(true);
  const [zoom, setZoom] = useState(1);
  const viewportRef = useRef(null);

  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(false);

    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load SVG");
        return res.text();
      })
      .then((data) => {
        if (isMounted) {
          // Adjust SVG styling so it naturally fits container width
          const cleanSvg = data
            .replace(/style="max-width: 2801\.17px;/, 'style="max-width: 100%; width: 100%; height: auto;')
            .replace(
              /<style xmlns="http:\/\/www\.w3\.org\/1999\/xhtml">/,
              '<style xmlns="http://www.w3.org/1999/xhtml">\nsvg { width: 100% !important; height: auto !important; max-width: 100% !important; display: block; }\n'
            );
          setSvgHtml(cleanSvg);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("SVG load error:", err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [src]);

  const handleZoomIn = () => {
    if (fitWidth) {
      setFitWidth(false);
      setZoom(1);
    } else {
      setZoom((z) => Math.min(Number((z + 0.25).toFixed(2)), 2.5));
    }
  };

  const handleZoomOut = () => {
    if (fitWidth) {
      setFitWidth(false);
      setZoom(0.75);
    } else {
      setZoom((z) => Math.max(Number((z - 0.25).toFixed(2)), 0.5));
    }
  };

  const handleFitWidth = () => {
    setFitWidth(true);
    setZoom(1);
    if (viewportRef.current) {
      viewportRef.current.scrollLeft = 0;
      viewportRef.current.scrollTop = 0;
    }
  };

  const handleResetZoom = () => {
    setFitWidth(false);
    setZoom(1);
    if (viewportRef.current) {
      viewportRef.current.scrollLeft = 0;
      viewportRef.current.scrollTop = 0;
    }
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0 || fitWidth) return;
    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: viewportRef.current?.scrollLeft || 0,
      scrollTop: viewportRef.current?.scrollTop || 0,
    };
  };

  const handleMouseMove = (e) => {
    if (!isPanning || !viewportRef.current) return;
    e.preventDefault();
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    viewportRef.current.scrollLeft = panStartRef.current.scrollLeft - dx;
    viewportRef.current.scrollTop = panStartRef.current.scrollTop - dy;
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  return (
    <div className={styles.diagramWrap}>
      <div className={styles.diagramToolbar}>
        <div className={styles.zoomControls}>
          <button
            type="button"
            className={`${styles.fitBtn} ${fitWidth ? styles.fitBtnActive : ""}`}
            onClick={handleFitWidth}
            title="Fit diagram to container width"
          >
            ⤢ Fit to Width
          </button>
          <button
            type="button"
            className={styles.toolBtn}
            onClick={handleZoomOut}
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            −
          </button>
          <button
            type="button"
            className={`${styles.fitBtn} ${!fitWidth && zoom === 1 ? styles.fitBtnActive : ""}`}
            onClick={handleResetZoom}
            title="100% natural resolution"
          >
            {fitWidth ? "Fit" : `${Math.round(zoom * 100)}%`}
          </button>
          <button
            type="button"
            className={styles.toolBtn}
            onClick={handleZoomIn}
            title="Zoom In"
            aria-label="Zoom In"
          >
            +
          </button>
        </div>

        <div className={styles.toolbarRight}>
          <span className={styles.diagramHint}>
            {fitWidth
              ? "Scaled to fit width · Click + or zoom to expand"
              : "Zoomed view · Drag or scroll in any direction to explore"}
          </span>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.openRawBtn}
          >
            Open Raw SVG ↗
          </a>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={`${styles.diagramViewport} ${
          !fitWidth ? styles.diagramViewportCanPan : ""
        } ${isPanning ? styles.diagramViewportPanning : ""}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {loading && (
          <div className={styles.loader}>
            <p>Loading System Architecture Diagram...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorBox}>
            <p>Could not load diagram inline.</p>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.openRawBtn}
            >
              Open Diagram Directly ↗
            </a>
          </div>
        )}

        {!loading && !error && (
          <div
            className={styles.svgScrollCanvas}
            style={
              fitWidth
                ? {
                    width: "100%",
                    maxWidth: "100%",
                    margin: "0 auto",
                    display: "block",
                  }
                : {
                    width: `${Math.round(zoom * 2800)}px`,
                    minWidth: `${Math.round(zoom * 2800)}px`,
                    margin: 0,
                    display: "block",
                  }
            }
            dangerouslySetInnerHTML={{ __html: svgHtml }}
          />
        )}
      </div>
    </div>
  );
}

export default function ArchitectureModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("diagram");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="arch-modal-title"
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <span className={styles.badge}>System Architecture</span>
            <h2 id="arch-modal-title" className={styles.title}>
              Lanka MicroJob — Distributed Cloud Architecture
            </h2>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.tabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "diagram"}
            className={`${styles.tab} ${activeTab === "diagram" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("diagram")}
          >
            📐 Architecture Diagram
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "services"}
            className={`${styles.tab} ${activeTab === "services" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("services")}
          >
            📦 Microservices Breakdown (6 Services)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "cicd"}
            className={`${styles.tab} ${activeTab === "cicd" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("cicd")}
          >
            🚀 CI/CD &amp; Infrastructure Flow
          </button>
        </div>

        {/* Body Content */}
        <div className={styles.body}>
          {activeTab === "diagram" && (
            <SvgDiagramViewer src="/lanka-microjob-architecture.svg" />
          )}

          {activeTab === "services" && (
            <div className={styles.servicesGrid}>
              {MICROSERVICES.map((svc) => (
                <div key={svc.name} className={styles.serviceCard}>
                  <div className={styles.serviceHeader}>
                    <h3 className={styles.serviceTitle}>{svc.name}</h3>
                    <span className={styles.servicePort}>{svc.port}</span>
                  </div>
                  <ul className={styles.serviceBullets}>
                    {svc.bullets.map((b) => (
                      <li key={b} className={styles.serviceBullet}>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === "cicd" && (
            <div className={styles.cicdSection}>
              <div className={styles.pipelineCard}>
                <h3 className={styles.pipelineTitle}>
                  <span>🌐</span> System Architecture Pipeline
                </h3>
                <div className={styles.stepsRow}>
                  <span className={styles.stepPill}>Vercel (React)</span>
                  <span className={styles.stepArrow}>→</span>
                  <span className={styles.stepPill}>Elastic IP</span>
                  <span className={styles.stepArrow}>→</span>
                  <span className={styles.stepPill}>AWS EC2 (Ubuntu)</span>
                  <span className={styles.stepArrow}>→</span>
                  <span className={styles.stepPill}>k3s Kubernetes</span>
                  <span className={styles.stepArrow}>→</span>
                  <span className={styles.stepPill}>API Gateway (:9000)</span>
                  <span className={styles.stepArrow}>→</span>
                  <span className={styles.stepPill}>5 Microservices</span>
                  <span className={styles.stepArrow}>→</span>
                  <span className={styles.stepPill}>Amazon RDS PostgreSQL</span>
                </div>
              </div>

              <div className={styles.pipelineCard}>
                <h3 className={styles.pipelineTitle}>
                  <span>🔄</span> Automated CI/CD Lifecycle
                </h3>
                <div className={styles.stepsRow}>
                  <span className={styles.stepPill}>GitHub (main)</span>
                  <span className={styles.stepArrow}>→</span>
                  <span className={styles.stepPill}>AWS CodePipeline</span>
                  <span className={styles.stepArrow}>→</span>
                  <span className={styles.stepPill}>AWS CodeBuild (buildspec.yml)</span>
                  <span className={styles.stepArrow}>→</span>
                  <span className={styles.stepPill}>Amazon ECR</span>
                  <span className={styles.stepArrow}>→</span>
                  <span className={styles.stepPill}>k3s Zero-Downtime Rollout</span>
                </div>
              </div>

              <div className={styles.k6Box}>
                <div>
                  <h4 className={styles.k6Title}>k6 Mixed API Workload Validation</h4>
                  <p className={styles.diagramHint}>
                    Stress-tested under simulated high traffic with mixed read/write API endpoints
                  </p>
                </div>
                <div className={styles.k6Metrics}>
                  <span className={styles.k6MetricItem}>
                    <strong>100 VUs</strong> peak load
                  </span>
                  <span className={styles.k6MetricItem}>
                    <strong>0%</strong> failures
                  </span>
                  <span className={styles.k6MetricItem}>
                    <strong>~480 ms</strong> p95
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
