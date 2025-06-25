// src/components/Contact.jsx
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '../styles/Contact.css'; // Asegúrate de tener este archivo con los estilos necesarios

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const socialRef = useRef(null);
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    // Manejar scroll automático cuando se navega desde otra página
    if (location.state?.scrollToSection === 'contacto-section') {
      setTimeout(() => {
        const element = document.getElementById('contacto-section');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }

    // Animación inicial del hero
    gsap.fromTo(heroRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );

    // Animaciones de las secciones con ScrollTrigger
    const sections = [formRef, infoRef, socialRef];
    
    sections.forEach((section, index) => {
      if (section.current) {
        gsap.fromTo(section.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Animación de los campos del formulario
    const formFields = formRef.current?.querySelectorAll('.form-group');
    formFields?.forEach((field, index) => {
      gsap.fromTo(field,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animación de las tarjetas de información
    const infoCards = infoRef.current?.querySelectorAll('.info-card');
    infoCards?.forEach((card, index) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animación de los iconos sociales
    const socialIcons = socialRef.current?.querySelectorAll('.social-icon');
    socialIcons?.forEach((icon, index) => {
      gsap.fromTo(icon,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Animación en el input cuando se escribe
    gsap.to(e.target, {
      scale: 1.02,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Animación del botón durante envío
    const submitBtn = e.target.querySelector('.submit-btn');
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    // Simular envío (aquí conectarías con tu backend)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Resetear estado después de 3 segundos
      setTimeout(() => setSubmitStatus(''), 3000);
    }, 2000);
  };

  return (
    <div className="contact-container">
      
      {/* Hero Section */}
      <section id="contacto-section" ref={heroRef} className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Hablemos de tu
              <span className="gradient-text"> próximo proyecto</span>
            </h1>
            <p className="hero-subtitle">
              ¿Tienes una idea genial? ¡Me encantaría escucharla! 
              Estoy aquí para ayudarte a convertir tus ideas en realidad.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="main-contact-section">
        <div className="container">
          <div className="contact-grid">
            
            {/* Contact Form */}
            <div ref={formRef} className="contact-form-container">
              <h2>Envíame un mensaje</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Asunto</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="¿De qué quieres hablar?"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Cuéntame sobre tu proyecto..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Enviando...
                    </>
                  ) : (
                    'Enviar mensaje'
                  )}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="success-message">
                    ¡Mensaje enviado! Te responderé pronto 🚀
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div ref={infoRef} className="contact-info">
              <h2>Información de contacto</h2>
              <div className="info-cards">
                <div className="info-card">
                  <div className="info-icon">📧</div>
                  <div className="info-content">
                    <h3>Email</h3>
                    <p>tu@email.com</p>
                    <a href="mailto:tu@email.com">Enviar email</a>
                  </div>
                </div>
                
                <div className="info-card">
                  <div className="info-icon">📱</div>
                  <div className="info-content">
                    <h3>Teléfono</h3>
                    <p>+52 123 456 7890</p>
                    <a href="tel:+521234567890">Llamar ahora</a>
                  </div>
                </div>
                
              
                
                <div className="info-card">
                  <div className="info-icon">⏰</div>
                  <div className="info-content">
                    <h3>Horario</h3>
                    <p>Lun - Vie: 9:00 - 18:00</p>
                    <p>Respuesta en 24h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section ref={socialRef} className="social-section">
        <div className="container">
          <h2 className="section-title">Sígueme en redes</h2>
          <div className="social-grid">
            <a href="#" className="social-icon github">
              <span className="icon">🐙</span>
              <div className="social-info">
                <h3>GitHub</h3>
                <p>Revisa mi código</p>
              </div>
            </a>
            
            <a href="#" className="social-icon linkedin">
              <span className="icon">💼</span>
              <div className="social-info">
                <h3>LinkedIn</h3>
                <p>Conectemos profesionalmente</p>
              </div>
            </a>
            
            <a href="#" className="social-icon twitter">
              <span className="icon">🐦</span>
              <div className="social-info">
                <h3>Twitter</h3>
                <p>Sígueme para tips de desarrollo</p>
              </div>
            </a>
            
            <a href="#" className="social-icon instagram">
              <span className="icon">📷</span>
              <div className="social-info">
                <h3>Instagram</h3>
                <p>Detrás de escenas</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Background Elements */}
      <div className="bg-elements">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>
    </div>
  );
}

export default Contact;