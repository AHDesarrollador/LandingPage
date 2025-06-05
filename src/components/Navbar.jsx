// src/components/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import '../styles/Navbar.css'; 

function Navbar() {
  const navRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Animación inicial de la navbar
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    // Animación del contenido hero
    const tl = gsap.timeline({ delay: 0.8 });
    
    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    // Animación del indicador de scroll
    gsap.fromTo(scrollIndicatorRef.current,
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        delay: 2,
        ease: "power2.out"
      }
    );

    // Animación flotante del indicador
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 2.5
    });

    // Hover effects para los links de navegación
    const navLinks = navRef.current.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { scale: 1.1, duration: 0.3, ease: "power2.out" });
      });
      
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });

    // Cleanup
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('mouseenter', () => {});
        link.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  // Función para manejar la navegación con scroll automático
  const handleNavigationClick = (path, sectionId) => {
    if (location.pathname === path) {
      // Si ya estamos en la página, solo hacer scroll
      scrollToSection(sectionId);
    } else {
      // Navegar a la página y luego hacer scroll
      navigate(path, { state: { scrollToSection: sectionId } });
    }
  };

  // Función para hacer scroll a una sección específica
  const scrollToSection = (sectionId) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  return (
    <div className="home-section">
      {/* Navbar */}
      <nav ref={navRef} className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">Mi Portfolio</Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li>
              <button 
                onClick={() => handleNavigationClick('/about', 'about-section')}
                className="nav-link-button"
              >
                Sobre mí
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigationClick('/proyectos', 'proyectos-section')}
                className="nav-link-button"
              >
                Proyectos
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigationClick('/contacto', 'contacto-section')}
                className="nav-link-button"
              >
                Contacto
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="hero-section">
        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title">
            Desarrollador
            <span className="gradient-text"> Full Stack</span>
          </h1>
          <p ref={subtitleRef} className="hero-subtitle">
            Creando experiencias digitales excepcionales con tecnologías modernas.
            Especializado en React, Node.js y diseño responsivo.
          </p>
          <div ref={ctaRef} className="hero-cta">
            <button 
              onClick={() => handleNavigationClick('/proyectos', 'proyectos-section')}
              className="btn-primary"
            >
              Ver mis proyectos
            </button>
            <button 
              onClick={() => handleNavigationClick('/contacto', 'contacto-section')}
              className="btn-secondary"
            >
              Contactar
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="scroll-indicator">
          <div className="scroll-text">Scroll</div>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Background Elements */}
      <div className="bg-elements">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-gradient"></div>
      </div>
    </div>
  );
}

export default Navbar;