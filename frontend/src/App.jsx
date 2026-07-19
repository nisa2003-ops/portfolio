import "./index.css";
import { useTheme } from "./hooks/useTheme";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Education from "./components/Education/Education";
import Certifications from "./components/Certifications/Certifications";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

export default function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      {/* Aurora orbs — CLEAR version - more defined, less blur */}
      <div
        style={{
          position: "fixed",
          top: "-100px",
          left: "-80px",
          width: "560px",
          height: "560px",
          background:
            theme === "dark"
              ? "radial-gradient(circle at 35% 35%, rgba(139,92,246,0.38), rgba(124,58,237,0.18) 40%, transparent 68%)"
              : "radial-gradient(circle,rgba(139,92,246,0.14),transparent 65%)",
          filter: "blur(22px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "6%",
          right: "-100px",
          width: "640px",
          height: "640px",
          background:
            theme === "dark"
              ? "radial-gradient(circle at 40% 40%, rgba(59,130,246,0.36), rgba(6,182,214,0.14) 45%, transparent 70%)"
              : "radial-gradient(circle,rgba(59,130,246,0.12),transparent 65%)",
          filter: "blur(24px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-80px",
          left: "28%",
          width: "720px",
          height: "520px",
          background:
            theme === "dark"
              ? "radial-gradient(ellipse at 50% 0%, rgba(6,182,214,0.20), rgba(168,85,247,0.12) 50%, transparent 72%)"
              : "radial-gradient(circle,rgba(6,182,214,0.08),transparent 70%)",
          filter: "blur(26px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Education />
        <Certifications />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
