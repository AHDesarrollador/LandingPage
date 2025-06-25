import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/CSSDocumentation.css';

gsap.registerPlugin(ScrollTrigger);

function CSSDocumentation() {
  const sectionRefs = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    // Animación del título principal
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Animaciones de las secciones
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(section,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.1
          }
        );
      }
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const cssFiles = [
    {
      name: "index.css",
      path: "src/index.css",
      description: "Archivo CSS principal que contiene estilos globales y variables CSS raíz",
      purpose: "Configuración global del proyecto, reset de estilos, variables de colores y efectos de cursor personalizado",
      keyFeatures: [
        "Variables CSS root con esquema de colores dark/light",
        "Reset de márgenes y padding para elementos base",
        "Configuración de fuentes del sistema",
        "Efectos de cursor personalizado (cursor: none)",
        "Animaciones de escritura (.typing-effect)",
        "Efectos hover interactivos (.interactive)",
        "Keyframes para parpadeo y efectos de brillo",
        "Media queries para modo claro"
      ],
      sections: [
        ":root - Variables globales",
        "Elementos base (a, body, h1, button)",
        "Efectos de escritura y cursor",
        "Animaciones de hover",
        "Media queries responsive"
      ]
    },
    {
      name: "App.css", 
      path: "src/App.css",
      description: "Reset completo CSS y configuración de viewport para eliminar espacios en blanco",
      purpose: "Asegurar que no haya espacios en blanco no deseados y que el layout ocupe el 100% del viewport",
      keyFeatures: [
        "Reset universal con * selector",
        "Box-sizing: border-box global",
        "Overflow-x: hidden para prevenir scroll horizontal",
        "Configuración de 100vw y 100vh",
        "Reset de márgenes y padding en html, body y #root"
      ],
      sections: [
        "Reset universal",
        "Configuración de viewport",
        "Prevención de scroll horizontal"
      ]
    },
    {
      name: "Home.css",
      path: "src/styles/Home.css", 
      description: "Estilos principales para la página de inicio con secciones hero, proyectos destacados, skills y contacto",
      purpose: "Crear una experiencia visual atractiva con gradientes, animaciones y efectos de hover para la página principal",
      keyFeatures: [
        "Layout de secciones full-width (100vw)",
        "Gradientes complejos para backgrounds",
        "Sistema de grid responsive para proyectos destacados",
        "Cards con efectos de hover y transformaciones 3D",
        "Animaciones de texto con gradiente",
        "Sistema de badges para tecnologías",
        "Botones con efectos de hover avanzados",
        "Elementos de background decorativos",
        "Sistema completo responsive"
      ],
      sections: [
        "Contenedor principal y secciones generales",
        "Featured Projects - Grid de proyectos destacados", 
        "Skills Section - Grid de habilidades técnicas",
        "Contact CTA - Llamada a la acción",
        "Sistema de botones con estilos graduados",
        "Elementos decorativos de fondo",
        "Media queries responsive completas"
      ]
    },
    {
      name: "Navbar.css",
      path: "src/styles/Navbar.css",
      description: "Navegación fija con efectos de blur y hero section con animaciones",
      purpose: "Crear una navegación elegante y una sección hero impactante con efectos parallax y animaciones",
      keyFeatures: [
        "Navbar fijo con backdrop-filter blur",
        "Logo con texto en gradiente",
        "Enlaces con efectos de underline animados",
        "Hero section con layout flexbox centrado",
        "Título con efectos de typing animado",
        "Botones CTA con estilos graduados",
        "Indicador de scroll con animaciones",
        "Elementos de background con efectos parallax",
        "Sistema responsive completo"
      ],
      sections: [
        "Reset global y configuración base",
        "Navbar - Navegación fija",
        "Hero Section - Sección principal",
        "Efectos de gradiente en texto",
        "Indicador de scroll",
        "Elementos de background decorativos",
        "Media queries responsive"
      ]
    },
    {
      name: "Contact.css",
      path: "src/styles/Contact.css",
      description: "Página de contacto completa con formulario, información de contacto y redes sociales",
      purpose: "Crear una experiencia de contacto profesional con formulario funcional y diseño moderno",
      keyFeatures: [
        "Hero section con gradientes",
        "Formulario de contacto con validación visual",
        "Grid layout para contenido dual",
        "Cards de información con efectos hover",
        "Formulario con estados focus animados",
        "Spinner de carga para envío",
        "Mensajes de éxito animados",
        "Sección de redes sociales",
        "Partículas flotantes decorativas"
      ],
      sections: [
        "Hero de contacto",
        "Formulario principal con validación",
        "Cards de información de contacto",
        "Sección de redes sociales",
        "Elementos decorativos y partículas",
        "Estados de carga y éxito",
        "Sistema responsive completo"
      ]
    },
    {
      name: "Proyects.css",
      path: "src/styles/Proyects.css", 
      description: "Galería de proyectos con filtros, modal y efectos interactivos",
      purpose: "Mostrar proyectos de manera organizada con filtros funcionales y detalles en modal",
      keyFeatures: [
        "Sistema de filtros con botones animados",
        "Grid responsive de proyectos",
        "Cards con overlay de hover",
        "Modal de detalles con información completa",
        "Badges para tecnologías",
        "Efectos de hover con transformaciones",
        "Sistema de categorías con colores",
        "Backdrop filter para efectos de cristal"
      ],
      sections: [
        "Header y filtros de proyectos",
        "Grid de proyectos con cards",
        "Efectos de hover y overlays",
        "Modal de detalles del proyecto",
        "Sistema de badges y categorías",
        "Media queries responsive"
      ]
    },
    {
      name: "GSAPShowcase.css",
      path: "src/styles/GSAPShowcase.css",
      description: "Showcase de animaciones GSAP con efectos avanzados y demostraciones",
      purpose: "Demostrar capacidades de GSAP con animaciones complejas y efectos visuales",
      keyFeatures: [
        "Secciones de showcase con parallax",
        "Morphing de formas SVG",
        "Sistema de partículas animadas",
        "Texto infinito con scroll",
        "Efectos de liquid distortion",
        "Elementos magnéticos interactivos",
        "Animaciones de texto split",
        "Backgrounds con gradientes complejos"
      ],
      sections: [
        "Hero con texto animado",
        "Morphing shapes section",
        "Particles showcase",
        "Infinite scrolling text",
        "Split text animations",
        "Liquid distortion effects",
        "Magnetic elements",
        "Author section"
      ]
    },
    {
      name: "JSStackedCards.css",
      path: "src/styles/JSStackedCards.css",
      description: "Demostración de cards apiladas con JavaScript y efectos 3D",
      purpose: "Mostrar interacciones complejas con JavaScript y animaciones de cards en 3D",
      keyFeatures: [
        "Cards apiladas con efectos 3D",
        "Sistema de activación secuencial",
        "Efectos de perspective y transform-style",
        "Indicadores de progreso",
        "Botón de reset con estados",
        "Efectos de brillo en hover",
        "Grid de información complementaria",
        "Animaciones floating sutiles"
      ],
      sections: [
        "Hero section con gradientes",
        "Stack de cards con 3D",
        "Sistema de controles",
        "Indicadores visuales",
        "Sección informativa",
        "Efectos de luz y brillo"
      ]
    },
    {
      name: "LenisShowcase.css",
      path: "src/styles/LenisShowcase.css",
      description: "Showcase de Lenis smooth scrolling con efectos parallax y pinning",
      purpose: "Demostrar las capacidades de Lenis para scroll suave y efectos de parallax",
      keyFeatures: [
        "Hero con texto animado character por character",
        "Indicador de scroll personalizado",
        "Secciones con efectos parallax",
        "Pin effects para elementos",
        "Grid de features con cards",
        "Elementos flotantes animados",
        "Bloques de código destacados",
        "Footer con enlaces de documentación"
      ],
      sections: [
        "Hero con animaciones de texto",
        "Features grid",
        "Demo de smooth scrolling",
        "Pin section effects",
        "Parallax elements",
        "Code documentation",
        "Footer con recursos"
      ]
    },
    {
      name: "NodejsAPI.css",
      path: "src/styles/NodejsAPI.css",
      description: "Interfaz para demostración de API Node.js con CRUD de eventos",
      purpose: "Crear una interfaz funcional para interactuar con una API de eventos usando Node.js",
      keyFeatures: [
        "Indicador de estado de API en tiempo real",
        "Sistema de filtros para eventos",
        "Modal para crear/editar eventos",
        "Grid de eventos con categorías",
        "Estados de carga y feedback visual",
        "Formularios con validación",
        "Sistema de badges por categoría",
        "Cards informativas sobre la API"
      ],
      sections: [
        "Hero con estado de API",
        "Controles y filtros",
        "Modal de formulario",
        "Grid de eventos",
        "Sistema de categorías",
        "Información de API"
      ]
    },
    {
      name: "MongoDBDocs.css", 
      path: "src/styles/MongoDBDocs.css",
      description: "Documentación completa de MongoDB con estilos de documentación técnica",
      purpose: "Proporcionar una experiencia de lectura clara para documentación técnica de MongoDB",
      keyFeatures: [
        "Tabla de contenidos interactiva",
        "Secciones de documentación estructuradas",
        "Bloques de código con syntax highlighting",
        "Cajas de información y advertencias",
        "Enlaces externos estilizados",
        "Grid de recursos y enlaces",
        "Navegación suave entre secciones",
        "Typography optimizada para lectura"
      ],
      sections: [
        "Hero de documentación",
        "Tabla de contenidos",
        "Secciones de documentación",
        "Bloques de código",
        "Cajas informativas",
        "Grid de enlaces y recursos"
      ]
    },
    {
      name: "About.css",
      path: "src/styles/About.css",
      description: "Página sobre mí con elementos visuales interactivos y estadísticas",
      purpose: "Presentar información personal de manera atractiva con elementos visuales dinámicos",
      keyFeatures: [
        "Layout dual con texto y visuales",
        "Elementos flotantes animados",
        "Code snippet con syntax highlighting",
        "Formas geométricas decorativas",
        "Grid de estadísticas",
        "Barras de progreso para skills",
        "Call to action destacado",
        "Efectos hover en elementos interactivos"
      ],
      sections: [
        "Header y contenido principal",
        "Elementos visuales flotantes",
        "Code snippet personalizado",
        "Estadísticas en grid",
        "Skills con barras de progreso",
        "Call to action final"
      ]
    }
  ];

  return (
    <div className="css-documentation-page">
      {/* Header */}
      <section className="documentation-hero">
        <div className="container">
          <h1 ref={titleRef} className="documentation-title">
            Documentación <span className="gradient-text">CSS</span>
          </h1>
          <p className="documentation-subtitle">
            Análisis detallado de todos los archivos CSS de la aplicación web, 
            explicando su propósito, características y implementación.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section ref={addToRefs} className="table-of-contents-section">
        <div className="container">
          <div className="toc-card">
            <h2>Índice de Archivos CSS</h2>
            <div className="toc-grid">
              {cssFiles.map((file, index) => (
                <a key={index} href={`#${file.name.replace('.', '-')}`} className="toc-item">
                  <span className="file-icon">📄</span>
                  <div className="toc-content">
                    <h3>{file.name}</h3>
                    <p>{file.path}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CSS Files Documentation */}
      <section className="files-documentation">
        <div className="container">
          {cssFiles.map((file, index) => (
            <div 
              key={index} 
              id={file.name.replace('.', '-')} 
              ref={addToRefs}
              className="file-section"
            >
              <div className="file-header">
                <div className="file-info">
                  <h2 className="file-name">{file.name}</h2>
                  <span className="file-path">{file.path}</span>
                </div>
                <div className="file-badge">
                  CSS
                </div>
              </div>

              <div className="file-content">
                <div className="description-card">
                  <h3>Descripción</h3>
                  <p>{file.description}</p>
                </div>

                <div className="purpose-card">
                  <h3>Propósito</h3>
                  <p>{file.purpose}</p>
                </div>

                <div className="features-card">
                  <h3>Características Principales</h3>
                  <ul className="features-list">
                    {file.keyFeatures.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="sections-card">
                  <h3>Secciones del Archivo</h3>
                  <div className="sections-grid">
                    {file.sections.map((section, idx) => (
                      <div key={idx} className="section-item">
                        <span className="section-icon">🎨</span>
                        <span className="section-name">{section}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section ref={addToRefs} className="documentation-footer">
        <div className="container">
          <div className="footer-content">
            <h2>Resumen de la Arquitectura CSS</h2>
            <p>
              Esta aplicación utiliza una arquitectura CSS modular donde cada página/componente 
              tiene su propio archivo de estilos. Se utilizan variables CSS, gradientes avanzados, 
              animaciones GSAP, efectos de hover sofisticados y un sistema responsive completo.
            </p>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">Archivos CSS</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Componentes Estilizados</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Animaciones CSS</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">25+</span>
                <span className="stat-label">Media Queries</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CSSDocumentation;