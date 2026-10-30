import { useState } from "react";
import "./index.css";
import { useTheme } from "./hooks/useTheme";
import { useSpotlight } from "./hooks/useSpotlight";

import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Education from "./components/Education/Education";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Certifications from "./components/Certifications/Certifications";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ResumeModal from "./components/ResumeModal/ResumeModal";

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  useSpotlight();

  const handleOpenResume = () => setIsResumeOpen(true);
  const handleCloseResume = () => setIsResumeOpen(false);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} onOpenResume={handleOpenResume} />
      <main>
        <Hero onOpenResume={handleOpenResume} />
        <About />
        <Education />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Contact onOpenResume={handleOpenResume} />
      </main>
      <Footer />
      <ResumeModal isOpen={isResumeOpen} onClose={handleCloseResume} />
    </>
  );
}
