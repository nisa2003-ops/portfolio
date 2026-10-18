import { useState, useEffect } from "react";
import { OWNER } from "../../constants/data";
import { useSound } from "../../hooks/useSound";
import styles from "./Hero.module.css";

export default function Hero() {
  const [colomboTime, setColomboTime] = useState("");
  const { playTapSound } = useSound();

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Colombo",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setColomboTime(now);
      } catch (err) {
        setColomboTime("08:00 AM");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleResume = () => {
    playTapSound();
    const a = document.createElement("a");
    a.href = OWNER.resumeUrl;
    a.download = "Nisadu_Nimsitha_Resume.pdf";
    a.click();
  };

  const scrollTo = (id) => {
    playTapSound();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.content} data-spotlight="true">
        <div className={styles.tagRow}>
          <p className={styles.tag}>
            Available for internships · {OWNER.university}
          </p>
          <span className={styles.timeTag}>
            📍 Colombo, LK {colomboTime ? `· ${colomboTime}` : "· UTC+5:30"}
          </span>
        </div>

        <h1 className={styles.name}>
          Nisadu <span className={styles.gold}>Nimsitha</span>
        </h1>

        <p className={styles.role}>{OWNER.title}</p>

        <p className={styles.sub}>
          I build practical backend and cloud systems, with machine learning projects alongside them.
        </p>

        <div className={styles.ctas}>
          <button type="button" className={styles.ctaPrimary} onClick={() => scrollTo("projects")}>
            View Projects
          </button>
          <button type="button" className={styles.ctaSecondary} onClick={() => scrollTo("contact")}>
            Contact Me
          </button>
          <button type="button" className={styles.ctaTertiary} onClick={handleResume}>
            ↓ Download CV
          </button>
        </div>

        {/* 4 Impact Metrics Counter */}
        <div className={styles.metricsGrid} aria-label="Key engineering achievements and production proof">
          <div className={styles.metricCard} data-spotlight="true">
            <span className={styles.metricVal}>100 <span className={styles.metricUnit}>VUs</span></span>
            <span className={styles.metricLabel}>Peak Load Tested (0% Errors)</span>
          </div>

          <div className={styles.metricCard} data-spotlight="true">
            <span className={styles.metricVal}>6+ <span className={styles.metricUnit}>Services</span></span>
            <span className={styles.metricLabel}>Microservices (k3s on EC2)</span>
          </div>

          <div className={styles.metricCard} data-spotlight="true">
            <span className={styles.metricVal}>7+ <span className={styles.metricUnit}>Certs</span></span>
            <span className={styles.metricLabel}>AWS, Cisco &amp; KodeKloud</span>
          </div>

          <div className={styles.metricCard} data-spotlight="true">
            <span className={styles.metricVal}>100% <span className={styles.metricUnit}>CI/CD</span></span>
            <span className={styles.metricLabel}>Zero-Secret OIDC &amp; Trivy</span>
          </div>
        </div>

        <div className={styles.socials}>
          {[
            { icon: "↗", label: "GitHub", href: OWNER.github },
            { icon: "↗", label: "LinkedIn", href: OWNER.linkedin },
            { icon: "✉", label: "Email", href: `mailto:${OWNER.email}` },
          ].map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              {label} {icon}
            </a>
          ))}
        </div>
      </div>

      <div className={styles.avatarWrap}>
        <div className={styles.ring1} />
        <div className={styles.ring2} />

        <div className={styles.avatar}>
          <img
            src="/Nisadu.jpeg"
            alt={OWNER.name}
            className={styles.avatarImg}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div className={styles.monogram} style={{ display: "none", position: "absolute" }}>
            N
          </div>
        </div>

        <div className={styles.badge}>Colombo, LK · CS Student</div>
      </div>
    </section>
  );
}
