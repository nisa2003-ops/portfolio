import { useState } from "react";
import FadeIn from "../FadeIn";
import { OWNER } from "../../constants/data";
import styles from "./Contact.module.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const INITIAL = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm]     = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [copied, setCopied] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(OWNER.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResume = () => {
    const a = document.createElement("a");
    a.href = OWNER.resumeUrl;
    a.download = "Nisadu_Perera_Resume.pdf";
    a.click();
  };

  return (
    <section id="contact" className={styles.section}>
      <div className="section-inner">
        <FadeIn><p className="section-label">05 — Contact</p></FadeIn>

        <div className={styles.wrap}>
          <FadeIn delay={0.1}>
            <h2 className={`section-title ${styles.centreTitle}`}>
              Let's Build Something.
            </h2>
            <p className={styles.sub}>
              Open to internships, collaborations, and interesting conversations.
            </p>
          </FadeIn>

          <div className={styles.cols}>
            {/* ── Info panel ── */}
            <FadeIn delay={0.15}>
              <div className={styles.infoPanel}>
                {[
                  { label: "Email",    value: OWNER.email,    copy: true },
                  { label: "GitHub",   value: "github.com/nisadu",   href: OWNER.github },
                  { label: "LinkedIn", value: "linkedin.com/in/nisadu", href: OWNER.linkedin },
                ].map((row, i, arr) => (
                  <div key={row.label}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>{row.label}</span>
                      <div className={styles.infoValue}>
                        {row.href ? (
                          <a href={row.href} target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                            {row.value}
                          </a>
                        ) : (
                          <span>{row.value}</span>
                        )}
                        {row.copy && (
                          <button className={styles.copyBtn} onClick={handleCopy}>
                            {copied ? "Copied ✓" : "Copy"}
                          </button>
                        )}
                      </div>
                    </div>
                    {i < arr.length - 1 && <hr className={styles.divider} />}
                  </div>
                ))}

              </div>
            </FadeIn>

            {/* ── Contact form ── */}
            <FadeIn delay={0.2}>
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Your name"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="your@email.com"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="What's on your mind?"
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send Message →"}
                </button>

                {status === "success" && (
                  <p className={styles.successMsg}>
                    ✓ Message sent! I'll get back to you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className={styles.errorMsg}>
                    Something went wrong. Please try emailing directly.
                  </p>
                )}
              </form>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
