// src/pages/Proyectos.jsx
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import '../styles/Proyects.css';

function Proyectos() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedProject, setSelectedProject] = useState(null);
  const projectsRef = useRef(null);
  const titleRef = useRef(null);
  const filtersRef = useRef(null);
  const gridRef = useRef(null);
  const location = useLocation();

  // Datos de los proyectos
  const projects = [
    {
      id: 1,
      title: "E-commerce Moderno",
      description: "Tienda online completa con React, Node.js, MongoDB y Stripe para pagos. Incluye panel de administración y gestión de inventario.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      category: "fullstack",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      githubUrl: "https://github.com/usuario/ecommerce",
      liveUrl: "https://ecommerce-demo.com",
      featured: true
    },
    {
      id: 2,
      title: "Dashboard Analytics",
      description: "Panel de control interactivo para análisis de datos con gráficos dinámicos, filtros avanzados y exportación de reportes.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      category: "frontend",
      technologies: ["React", "Chart.js", "D3.js", "TypeScript", "Material-UI"],
      githubUrl: "https://github.com/usuario/dashboard",
      liveUrl: "https://dashboard-demo.com",
      featured: true
    },
    {
      id: 3,
      title: "API REST Avanzada",
      description: "API robusta con autenticación JWT, validación de datos, rate limiting y documentación automática con Swagger.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      category: "backend",
      technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "Swagger"],
      githubUrl: "https://github.com/usuario/api-rest",
      liveUrl: null,
      featured: false
    },
    {
      id: 4,
      title: "App de Tareas Colaborativa",
      description: "Aplicación de gestión de tareas en tiempo real con chat integrado, notificaciones push y sincronización offline.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      category: "fullstack",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "PWA"],
      githubUrl: "https://github.com/usuario/task-app",
      liveUrl: "https://task-app-demo.com",
      featured: true
    },
    {
      id: 5,
      title: "Landing Page Creativa",
      description: "Sitio web moderno con animaciones avanzadas, diseño responsivo y optimización SEO. Carga ultra-rápida.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      category: "frontend",
      technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "Webpack"],
      githubUrl: "https://github.com/usuario/landing",
      liveUrl: "https://landing-demo.com",
      featured: false
    },
    {
      id: 6,
      title: "Sistema de Autenticación",
      description: "Sistema completo de autenticación con OAuth, 2FA, recuperación de contraseña y gestión de roles.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
      category: "backend",
      technologies: ["Node.js", "Passport.js", "Redis", "SendGrid", "bcrypt"],
      githubUrl: "https://github.com/usuario/auth-system",
      liveUrl: null,
      featured: false
    },
    {
      id: 7,
      title: "Chat en Tiempo Real",
      description: "Aplicación de chat con salas privadas, compartir archivos, emojis personalizados y historial de mensajes.",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=600&fit=crop",
      category: "fullstack",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Cloudinary"],
      githubUrl: "https://github.com/usuario/chat-app",
      liveUrl: "https://chat-demo.com",
      featured: false
    },
    {
      id: 8,
      title: "Portfolio Interactivo",
      description: "Portfolio personal con animaciones 3D, transiciones suaves y diseño minimalista. Totalmente responsive.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      category: "frontend",
      technologies: ["React", "Three.js", "GSAP", "Framer Motion", "Styled Components"],
      githubUrl: "https://github.com/usuario/portfolio",
      liveUrl: "https://mi-portfolio.com",
      featured: true
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' }
  ];

  // Filtrar proyectos según la categoría seleccionada
  const filteredProjects = selectedCategory === 'todos' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  useEffect(() => {
    // Scroll automático si viene de navegación
    if (location.state?.scrollToSection === 'proyectos-section') {
      setTimeout(() => {
        const element = document.getElementById('proyectos-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }

    // Animaciones de entrada
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(filtersRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(gridRef.current.children,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "power3.out" 
      },
      "-=0.4"
    );
  }, [location]);

  // Animación al cambiar filtros
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children,
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.4, 
          stagger: 0.05,
          ease: "power2.out" 
        }
      );
    }
  }, [selectedCategory]);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    // Animar la apertura del modal
    gsap.fromTo('.project-modal',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
    );
  };

  const closeProjectModal = () => {
    // Animar el cierre del modal
    gsap.to('.project-modal',
      { 
        opacity: 0, 
        scale: 0.8, 
        duration: 0.2, 
        ease: "power2.in",
        onComplete: () => setSelectedProject(null)
      }
    );
  };

  return (
    <div className="proyectos-page">
      <section id="proyectos-section" ref={projectsRef} className="proyectos-section">
        <div className="container">
          <div className="proyectos-header">
            <h1 ref={titleRef} className="proyectos-title">
              Mis <span className="gradient-text">Proyectos</span>
            </h1>
            <p className="proyectos-subtitle">
              Una colección de mis trabajos más destacados, desde aplicaciones web completas 
              hasta APIs robustas y interfaces de usuario innovadoras.
            </p>
          </div>

          {/* Filtros */}
          <div ref={filtersRef} className="proyecto-filters">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Grid de proyectos */}
          <div ref={gridRef} className="proyectos-grid">
            {filteredProjects.map(project => (
              <div 
                key={project.id} 
                className="proyecto-card"
                onClick={() => openProjectModal(project)}
              >
                <div className="proyecto-image">
                  <img src={project.image} alt={project.title} />
                  <div className="proyecto-overlay">
                    <div className="proyecto-overlay-content">
                      <h3>{project.title}</h3>
                      <p>Ver detalles</p>
                    </div>
                  </div>
                  {project.featured && (
                    <div className="featured-badge">Destacado</div>
                  )}
                </div>
                <div className="proyecto-content">
                  <h3 className="proyecto-title">{project.title}</h3>
                  <p className="proyecto-description">{project.description}</p>
                  <div className="proyecto-tech">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-tag more">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de proyecto */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeProjectModal}>
          <div className="project-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProjectModal}>×</button>
            
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedProject.image} alt={selectedProject.title} />
                {selectedProject.featured && (
                  <div className="featured-badge">Destacado</div>
                )}
              </div>
              
              <div className="modal-info">
                <h2 className="modal-title">{selectedProject.title}</h2>
                <p className="modal-description">{selectedProject.description}</p>
                
                <div className="modal-tech">
                  <h4>Tecnologías utilizadas:</h4>
                  <div className="tech-list">
                    {selectedProject.technologies.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-actions">
                  {selectedProject.githubUrl && (
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      Ver código
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Ver proyecto
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Proyectos;