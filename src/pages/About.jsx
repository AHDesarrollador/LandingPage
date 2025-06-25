import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/About.css'; 

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef([]);
  const skillsRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const stats = statsRef.current;
    const skills = skillsRef.current;

    // Manejar scroll automático cuando se navega desde otra página
    if (location.state?.scrollToSection === 'about-section') {
      setTimeout(() => {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }

    // Animación del título
    gsap.fromTo(title, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
        }
      }
    );

    // Animación del contenido principal
    gsap.fromTo(content.children,
      { opacity: 0, y: 30, stagger: 0.2 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: content,
          start: "top 85%",
        }
      }
    );

    // Animación del diseño visual
    gsap.fromTo(image,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: image,
          start: "top 85%",
        }
      }
    );

    // Animación de elementos flotantes
    const floatingElements = image.querySelectorAll('.element');
    floatingElements.forEach((element, index) => {
      gsap.fromTo(element,
        { opacity: 0, scale: 0, rotation: 0 },
        {
          opacity: 1,
          scale: 1,
          rotation: 360,
          duration: 1,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
          }
        }
      );
    });

    // Animación del código
    const codeLines = image.querySelectorAll('.code-line');
    gsap.fromTo(codeLines,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: image.querySelector('.code-snippet'),
          start: "top 85%",
        }
      }
    );

    // Animación de formas geométricas
    const shapes = image.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
      gsap.fromTo(shape,
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          delay: index * 0.3,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: shape,
            start: "top 85%",
          }
        }
      );
    });

    // Animación de estadísticas
    stats.forEach((stat, index) => {
      gsap.fromTo(stat,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
          }
        }
      );
    });

    // Animación de skills
    skills.forEach((skill, index) => {
      gsap.fromTo(skill,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skill,
            start: "top 95%",
          }
        }
      );
    });

    // Parallax effect para el diseño visual
    gsap.to(image, {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Rotación continua de elementos flotantes
    floatingElements.forEach((element) => {
      gsap.to(element, {
        rotation: "+=360",
        duration: 10 + Math.random() * 10,
        repeat: -1,
        ease: "none"
      });
    });

    // Limpiar location.state después del scroll
    if (location.state?.scrollToSection) {
      window.history.replaceState({}, document.title);
    }

  }, [location]);

  const addToStatsRefs = (el) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current.push(el);
    }
  };

  const addToSkillsRefs = (el) => {
    if (el && !skillsRef.current.includes(el)) {
      skillsRef.current.push(el);
    }
  };

  const stats = [
    { number: "2+", label: "Años de Experiencia" },
    { number: "10+", label: "Proyectos Completados" },
    { number: "100%", label: "Clientes Satisfechos" },
    { number: "24/7", label: "Disponibilidad" }
  ];

  const skills = [
    { name: "Frontend Development", level: 95 },
    { name: "React & Next.js", level: 90 },
    { name: "JavaScript/TypeScript", level: 85 },
    { name: "UI/UX Design", level: 80 },
    { name: "Backend Development", level: 75 },
    { name: "Database Management", level: 70 }
  ];

  return (
    <section ref={sectionRef} id="about-section" className="about-section">
      <div className="about-container">
        
        {/* Header */}
        <div className="about-header">
          <h2 ref={titleRef} className="about-title">
            Sobre Mí
          </h2>
          <div className="about-subtitle">
            Desarrollador Full Stack apasionado por crear experiencias digitales únicas
          </div>
        </div>

        {/* Main Content */}
        <div className="about-content">
          
          {/* Left Column - Text Content */}
          <div ref={contentRef} className="about-text">
            <div className="about-intro">
              <p>
                ¡Hola! Soy un desarrollador web especializado en crear experiencias digitales 
                modernas y funcionales. Mi pasión por la tecnología y el diseño me impulsa a 
                desarrollar soluciones innovadoras que combinan estética y funcionalidad.
              </p>
            </div>

            <div className="about-description">
              <p>
                Con 2 años de experiencia en el desarrollo web, he trabajado con una 
                amplia gama de tecnologías, desde frameworks de frontend como React y Vue.js 
                hasta soluciones de backend con Node.js y bases de datos modernas.
              </p>
              <p>
                Mi enfoque se centra en escribir código limpio, escalable y mantenible, 
                siempre buscando las mejores prácticas y las últimas tendencias en desarrollo web.
              </p>
            </div>

            <div className="about-philosophy">
              <h3>Mi Filosofía</h3>
              <p>
                Creo firmemente en que cada proyecto es una oportunidad para crear algo 
                extraordinario. Mi objetivo es transformar ideas en productos digitales 
                que no solo cumplan con los requisitos técnicos, sino que también brinden 
                una experiencia excepcional al usuario.
              </p>
            </div>
          </div>

          {/* Right Column - Visual Design */}
          <div className="about-visual-container">
            <div ref={imageRef} className="about-visual">
              <div className="floating-elements">
                <div className="element element-1"></div>
                <div className="element element-2"></div>
                <div className="element element-3"></div>
                <div className="element element-4"></div>
                <div className="element element-5"></div>
              </div>
              <div className="code-snippet">
                <div className="code-line">
                  <span className="code-keyword">const</span>
                  <span className="code-variable"> developer</span>
                  <span className="code-operator"> = </span>
                  <span className="code-bracket">{'{'}</span>
                </div>
                <div className="code-line code-indent">
                  <span className="code-property">name:</span>
                  <span className="code-string"> "Tu nombre"</span>
                  <span className="code-comma">,</span>
                </div>
                <div className="code-line code-indent">
                  <span className="code-property">passion:</span>
                  <span className="code-string"> "Frontend"</span>
                  <span className="code-comma">,</span>
                </div>
                <div className="code-line code-indent">
                  <span className="code-property">skills:</span>
                  <span className="code-bracket"> [</span>
                  <span className="code-string">"React"</span>
                  <span className="code-comma">, </span>
                  <span className="code-string">"GSAP"</span>
                   <span className="code-comma">, </span>
                 <span className="code-string">"Raspberry"</span>
                  <span className="code-comma">, </span>
                  <span className="code-string">"Video Juegos"</span>
                  <span className="code-comma">, </span>
                 <span className="code-string">"Entusiasta del Hardware"</span>
                  <span className="code-comma">, </span>
                  <span className="code-string">"Impresion 3D"</span>
                  <span className="code-bracket">]</span>
                </div>
                <div className="code-line">
                  <span className="code-bracket">{'}'}</span>
                </div>
              </div>
              <div className="geometric-shapes">
                <div className="shape shape-circle"></div>
                <div className="shape shape-triangle"></div>
                <div className="shape shape-square"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="about-stats">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              ref={addToStatsRefs}
              className="stat-item"
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="about-skills">
          <h3 className="skills-title">Habilidades Técnicas</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div 
                key={index}
                ref={addToSkillsRefs}
                className="skill-item"
              >
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress"
                    style={{'--skill-width': `${skill.level}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="about-cta">
          <p>¿Listo para crear algo increíble juntos?</p>
          <button className="cta-button">
            Trabajemos Juntos
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;