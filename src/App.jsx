import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Github, Linkedin } from "lucide-react";
import "./assets/css/index.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      <nav className="navbar ">
        <div className="nav-container">
          <div className="nav-logo">Marco della Vecchia</div>
          <ul className="nav-links">
            <li>
              <a href="#hero">Home</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Progetti</a>
            </li>
            <li>
              <a href="#contact">Contatti</a>
            </li>
          </ul>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </nav>

      <main className={`container ${darkMode ? "dark" : "light"}`}>
        <section id="hero" className="hero-section">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Costruisco soluzioni web su misura, dal frontend al backend.
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Sono Marco, full stack developer in formazione, appassionato di
            tecnologia e soluzioni digitali.
          </motion.p>
          {/* <a href="#contact" className="btn-primary">
            Contattami
          </a> */}
          <motion.a
            href="#contact"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contattami
          </motion.a>
        </section>

        <section id="skills" className="skills-section">
          <h2>Competenze Tecniche</h2>
          <div className="skill-bar">
            <span>HTML & CSS</span>
            <div className="progress">
              <div style={{ width: "90%" }}></div>
            </div>
          </div>
          <div className="skill-bar">
            <span>JavaScript & React</span>
            <div className="progress">
              <div style={{ width: "85%" }}></div>
            </div>
          </div>
          <div className="skill-bar">
            <span>Node.js & Express</span>
            <div className="progress">
              <div style={{ width: "75%" }}></div>
            </div>
          </div>
          <div className="skill-bar">
            <span>MySQL & Firebase</span>
            <div className="progress">
              <div style={{ width: "70%" }}></div>
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <h2>Progetti</h2>
          <div className="project-card">
            <h3>E-commerce Tech</h3>
            <p>
              Sito e-commerce per prodotti tecnologici, con frontend in React,
              backend in Express e database MySQL.
            </p>
            <p>
              <strong>Tecnologie:</strong> React, Node.js, Express, MySQL, Axios
            </p>
            <p>
              <strong>Funzionalità:</strong> Catalogo prodotti, carrello, pagina
              prodotto, CRUD
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/Marcodellavecchia95/e-commerce-project-work"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                Frontend
              </a>{" "}
              |{" "}
              <a
                href="https://github.com/Marcodellavecchia95/backend-e-commerce"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                Backend
              </a>
            </p>
          </div>
          <div className="project-card">
            <h3>Inventario Firebase</h3>
            <p>
              Sito inventario per prodotti per la casa, con frontend in React,
              backend in Express e Firebase Realtime Database.
            </p>
            <p>
              <strong>Tecnologie:</strong> React, Node.js, Express, Firebase
            </p>
            <p>
              <strong>Funzionalità:</strong> Visualizzazione del catalogo, CRUD
              completa (aggiunta, modifica e rimozione di prodotti e quantità),
              aggiornamento in tempo reale.
              <br />
              <strong>Stato:</strong> In corso
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/Marcodellavecchia95/inventario-frontend"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                Frontend
              </a>{" "}
              |{" "}
              <a
                href="https://github.com/Marcodellavecchia95/backend-inventario"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                Backend
              </a>
            </p>
          </div>
          <div className="project-card">
            <h3>Amazon Monitor Bot</h3>
            <p>
              Bot che monitora prezzi e disponibilità di uno o più prodotti
              Amazon
            </p>
            <p>
              <strong>Tecnologie:</strong> Javascript
            </p>
            <p>
              <strong>Funzionalità:</strong> SetInterval, inserimento a proprio
              piacere dell'ASIN cosi da poter funzionare per chiunque voglia e
              per qualsiasi prodotto
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/Marcodellavecchia95/inventario-frontend"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                Link al codice
              </a>{" "}
            </p>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h2>Contatti</h2>
          <p>📞 3927266095</p>
          <p>
            📧{" "}
            <a href="mailto:mdellavecchia95@gmail.com" className="link">
              mdellavecchia95@gmail.com
            </a>
          </p>
          <div className="social-links">
            <a
              href="https://github.com/Marcodellavecchia95"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/marco-della-vecchia-840b7a96/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin />
            </a>
          </div>
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} Marco della Vecchia — Full Stack Web
          Developer
        </footer>
      </main>
    </>
  );
}
