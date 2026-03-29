import { Router }   from "express";
import rateLimit    from "express-rate-limit";
import nodemailer   from "nodemailer";

const router = Router();

// Stricter rate-limit for contact submissions: 5 per hour per IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: "Too many messages sent. Please try again in an hour." },
});

// ── Nodemailer transporter ──────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ── Validation helper ───────────────────────────────────────
function validate({ name, email, message }) {
  const errors = [];
  if (!name    || name.trim().length    < 2)   errors.push("Name must be at least 2 characters.");
  if (!email   || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("A valid email is required.");
  if (!message || message.trim().length < 10)  errors.push("Message must be at least 10 characters.");
  return errors;
}

// ── POST /api/contact ───────────────────────────────────────
router.post("/", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;

  const errors = validate({ name, email, message });
  if (errors.length) {
    return res.status(422).json({ errors });
  }

  const mailOptions = {
    from:    `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to:      process.env.CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `New message from ${name.trim()} via portfolio`,
    text: `
Name:    ${name.trim()}
Email:   ${email.trim()}
Message:
${message.trim()}
    `.trim(),
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;color:#1a1a1a">
        <h2 style="border-bottom:2px solid #c9a96e;padding-bottom:0.5rem;color:#0f0e0c">
          New Portfolio Message
        </h2>
        <p><strong>From:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>
        <hr style="border:none;border-top:1px solid #ddd;margin:1rem 0" />
        <p style="white-space:pre-wrap">${message.trim()}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Message sent successfully." });
  } catch (err) {
    console.error("Mail error:", err.message);
    return res.status(500).json({ error: "Failed to send email. Please try again later." });
  }
});

export default router;
