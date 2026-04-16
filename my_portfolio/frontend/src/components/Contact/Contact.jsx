import { useState } from "react";
import emailjs from "@emailjs/browser";
import FadeIn from "../FadeIn";
import { OWNER } from "../../constants/data";
import styles from "./Contact.module.css";

const SERVICE_ID  = "service_hbg2b1q";
const TEMPLATE_ID = "template_2enulx6";
const PUBLIC_KEY  = "jewkLNoRoysScc5nu";

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
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
        },
        PUBLIC_KEY
      );
      setStatus("success");
      setForm(INITIAL);
    } catch (err) {
      console.error("EmailJS error:", err);
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
    a.download = "Nisadu_Nimsitha_Resume.pdf";
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
                  { label: "Email",    content: OWNER.email,                    copy: true },
                  { label: "GitHub",   content: "github.com/nisa2003-ops",      href: OWNER.github },
                  { label: "LinkedIn", content: "linkedin.com/in/nisadu",       href: OWNER.linkedin },
                  { label: "Location", content: OWNER.location },
                ].map((row, i, arr) => (
                  <div key={row.label}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>{row.label}</span>
                      <div className={styles.infoValue}>
                        {row.href ? (
                          <a href={row.href} target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                            {row.content}
                          </a>
                        ) : (
                          <span>{row.content}</span>
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

                <button className={styles.resumeBtn} onClick={handleResume}>
                  ↓ Download Full Resume / CV
                </button>
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
                    Something went wrong. Please email me directly.
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
