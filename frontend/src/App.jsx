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
      {/* Aurora orbs — decorative — theme aware */}
      <div
        style={{
          position: "fixed",
          top: "-120px",
          left: "-80px",
          width: "520px",
          height: "520px",
          background:
            theme === "dark"
              ? "radial-gradient(circle,rgba(139,92,246,0.22),transparent 65%)"
              : "radial-gradient(circle,rgba(139,92,246,0.10),transparent 65%)",
          filter: "blur(32px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "8%",
          right: "-120px",
          width: "600px",
          height: "600px",
          background:
            theme === "dark"
              ? "radial-gradient(circle,rgba(59,130,246,0.20),transparent 65%)"
              : "radial-gradient(circle,rgba(59,130,246,0.08),transparent 65%)",
          filter: "blur(36px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-100px",
          left: "30%",
          width: "700px",
          height: "500px",
          background:
            theme === "dark"
              ? "radial-gradient(circle,rgba(6,182,214,0.12),transparent 70%)"
              : "radial-gradient(circle,rgba(6,182,214,0.06),transparent 70%)",
          filter: "blur(40px)",
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
