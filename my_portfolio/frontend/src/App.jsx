import "./index.css";

import Navbar    from "./components/Navbar/Navbar";
import Hero      from "./components/Hero/Hero";
import About     from "./components/About/About";
import Education from "./components/Education/Education";
import Projects  from "./components/Projects/Projects";
import Skills    from "./components/Skills/Skills";
import Contact   from "./components/Contact/Contact";
import Footer    from "./components/Footer/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
