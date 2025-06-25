// src/components/Home.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Home.css'; 

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const skillsRef = useRef(null);
  const featuredProjectsRef = useRef(null);
  const contactRef = useRef(null);
  const skillItems = useRef([]);
  const projectCards = useRef([]);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const ctaRef = useRef(null);
  const navigate = useNavigate();

  // Proyectos destacados (del código FeaturedProjects)
  const featuredProjects = [
    {
      id: 1,
      title: "E-commerce Moderno",
      description: "Tienda online completa con React, Node.js y MongoDB. Panel de administración incluido.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      technologies: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "Dashboard Analytics",
      description: "Panel interactivo con gráficos dinámicos y exportación de reportes en tiempo real.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      technologies: ["React", "Chart.js", "TypeScript"]
    },
    {
      id: 4,
      title: "App de Tareas Colaborativa",
      description: "Gestión de tareas en tiempo real con chat integrado y notificaciones push.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      technologies: ["React", "Socket.io", "PWA"]
    }
  ];

  useEffect(() => {
    // Animación para la sección de proyectos destacados
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline();
            
            tl.fromTo(titleRef.current,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            )
            .fromTo(cardsRef.current.children,
              { y: 80, opacity: 0 },
              { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.2,
                ease: "power3.out" 
              },
              "-=0.6"
            )
            .fromTo(ctaRef.current,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
              "-=0.4"
            );
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuredProjectsRef.current) {
      observer.observe(featuredProjectsRef.current);
    }

    // Animaciones de entrada para las otras secciones
    const sections = [skillsRef, contactRef];
    
    sections.forEach((section, index) => {
      if (section.current) {
        gsap.fromTo(section.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Animación de las skills
    skillItems.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(item,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Efecto parallax en elementos de fondo
    gsap.to(".bg-shape", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => observer.disconnect();
  }, []);

  const addToSkillRefs = (el) => {
    if (el && !skillItems.current.includes(el)) {
      skillItems.current.push(el);
    }
  };

  const handleProjectClick = (projectId) => {
    navigate('/proyectos', { 
      state: { 
        scrollToSection: 'proyectos-section',
        highlightProject: projectId 
      } 
    });
  };

  const handleViewAllClick = () => {
    navigate('/proyectos', { 
      state: { scrollToSection: 'proyectos-section' } 
    });
  };

  return (
    <div className="home-container">
      
      {/* Featured Projects Section */}
      <section ref={featuredProjectsRef} className="featured-projects-section">
        <div className="container">
          <div className="section-header">
            <h2 ref={titleRef} className="section-title">
              Proyectos <span className="gradient-text">Destacados</span>
            </h2>
            <p className="section-subtitle">
              Algunos de mis trabajos más recientes que demuestran mis habilidades 
              en desarrollo full-stack y diseño de interfaces modernas.
            </p>
          </div>

          <div ref={cardsRef} className="featured-grid">
            {featuredProjects.map((project) => (
              <div 
                key={project.id}
                className="featured-card interactive"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="featured-image">
                  <img src={project.image} alt={project.title} />
                  <div className="featured-overlay">
                    <div className="featured-overlay-content">
                      <span>Ver proyecto</span>
                    </div>
                  </div>
                </div>
                
                <div className="featured-content">
                  <h3 className="featured-title">{project.title}</h3>
                  <p className="featured-description">{project.description}</p>
                  
                  <div className="featured-tech">
                    {project.technologies.map(tech => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div ref={ctaRef} className="featured-cta">
            <button 
              onClick={handleViewAllClick}
              className="btn-outline interactive"
            >
              Ver todos los proyectos
            </button>
          </div>
        </div>

        {/* Background decorations */}
        <div className="bg-decoration">
          <div className="bg-circle bg-circle-3"></div>
          <div className="bg-circle bg-circle-4"></div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="skills-section section">
        <div className="container">
          <h2 className="section-title">Tecnologías</h2>
          <div className="skills-grid">
            {[
              { name: "JavaScript", color: "#F7DF1E", icon: "🟨", level: 75 },
              { name: "Node.js", color: "#339933", icon: "🟢", level: 80 },
              { name: "CSS3", color: "#1572B6", icon: "🎨", level: 88 },
              { name: "MongoDB", color: "#47A248", icon: "🍃", level: 80 },
              { name: "GSAP", color: "#88CE02", icon: "✨", level: 80 },
              { name: "Lenis", color: "#FF6B6B", icon: "🌊", level: 70 }
            ].map((skill, index) => (
              <div
                key={skill.name}
                ref={addToSkillRefs}
                className="skill-item interactive"
                style={{ 
                  '--skill-color': skill.color,
                  cursor: (skill.name === 'GSAP' || skill.name === 'JavaScript' || skill.name === 'CSS3' || skill.name === 'Lenis' || skill.name === 'Node.js' || skill.name === 'MongoDB') ? 'pointer' : 'default'
                }}
                onClick={() => {
                  if (skill.name === 'GSAP') {
                    navigate('/gsap-showcase');
                  } else if (skill.name === 'JavaScript') {
                    navigate('/js-stacked-cards', { state: { scrollToSection: 'javascript-section' } });
                  } else if (skill.name === 'CSS3') {
                    navigate('/css-documentation');
                  } else if (skill.name === 'Lenis') {
                    navigate('/lenis-showcase');
                  } else if (skill.name === 'Node.js') {
                    navigate('/nodejs-api');
                  } else if (skill.name === 'MongoDB') {
                    navigate('/mongodb-docs');
                  }
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    rotateY: 5,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    rotateY: 0,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
              >
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.name}</h3>
                <div className="skill-level">
                  <div 
                    className="skill-bar"
                    style={{
                      width: '100%',
                      height: '4px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}
                  >
                    <div 
                      className="skill-progress"
                      style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        background: skill.color,
                        borderRadius: '2px',
                        transition: 'width 1s ease-out'
                      }}
                    />
                  </div>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section ref={contactRef} className="contact-cta-section section">
        <div className="container">
          <div className="contact-content">
            <h2 className="section-title">¿Listo para trabajar juntos?</h2>
            <p className="contact-description">
              Estoy siempre abierto a nuevas oportunidades y proyectos interesantes. 
              ¡Hablemos sobre tu próxima idea!
            </p>
            <div className="contact-buttons">
              <Link to="/contacto" className="btn-primary interactive">
                Contactar ahora
              </Link>
              <a href="mailto:tu@email.com" className="btn-secondary interactive">
                Enviar email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Background Shapes */}
      <div className="bg-shapes">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
    </div>
  );
}

export default Home;