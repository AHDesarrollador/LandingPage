import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GSAPShowcaseSimple = () => {
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const textAnimRef = useRef(null);
  const authorRef = useRef(null);
  const carouselRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Scroll automático al héroe cuando se viene de navegación
    setTimeout(() => {
      const heroSection = document.getElementById('gsap-hero');
      if (heroSection) {
        heroSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);

    // Animación de entrada del título
    gsap.fromTo(heroTextRef.current, 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );

    // Animación de las cajas
    gsap.fromTo([box1Ref.current, box2Ref.current, box3Ref.current], 
      { opacity: 0, scale: 0 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        stagger: 0.2, 
        ease: "back.out(1.7)",
        delay: 0.5
      }
    );

    // Animación continua de rotación
    gsap.to(box1Ref.current, {
      rotation: 360,
      duration: 4,
      repeat: -1,
      ease: "none"
    });

    gsap.to(box2Ref.current, {
      scale: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    gsap.to(box3Ref.current, {
      y: -20,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Animación del texto con scroll
    gsap.fromTo(textAnimRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: textAnimRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación del autor
    gsap.fromTo(authorRef.current,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: authorRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Carrusel automático con animación continua
    if (carouselRef.current) {
      // Animación de entrada
      gsap.fromTo(carouselRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación automática del carrusel
      const carousel = carouselRef.current;
      const totalWidth = carousel.scrollWidth;
      const containerWidth = carousel.parentElement.offsetWidth;
      
      gsap.set(carousel, { x: containerWidth });
      
      gsap.to(carousel, {
        x: -totalWidth,
        duration: 20,
        repeat: -1,
        ease: "none",
        delay: 1
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} style={{ 
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white',
      paddingTop: '80px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Back button */}
      <Link 
        to="/" 
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          background: '#88CE02',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '50px',
          textDecoration: 'none',
          fontWeight: '600',
          zIndex: 1000
        }}
      >
        ← Volver al inicio
      </Link>

      {/* Hero Section */}
      <section 
        id="gsap-hero"
        style={{ 
          minHeight: '90vh', 
          width: '100%',
          maxWidth: '1200px',
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem'
        }}>
        <h1 
          ref={heroTextRef}
          style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            fontWeight: '800',
            background: 'linear-gradient(45deg, #88CE02, #4f46e5, #ec4899)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '3rem'
          }}
        >
          Esto fue hecho con la librería GSAP
        </h1>

        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div 
            ref={box1Ref}
            style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(45deg, #88CE02, #4f46e5)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}
          >
            ⚡
          </div>
          
          <div 
            ref={box2Ref}
            style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(45deg, #4f46e5, #ec4899)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}
          >
            ✨
          </div>
          
          <div 
            ref={box3Ref}
            style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(45deg, #ec4899, #88CE02)',
              borderRadius: '10px',
              transform: 'rotate(45deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}
          >
            🚀
          </div>
        </div>
      </section>

      {/* Text Animation Section */}
      <section style={{ 
        minHeight: '50vh', 
        width: '100%',
        maxWidth: '1200px',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem'
      }}>
        <h2 
          ref={textAnimRef}
          style={{
            fontSize: 'clamp(1.5rem, 6vw, 3rem)',
            fontWeight: '700',
            textAlign: 'center',
            maxWidth: '800px'
          }}
        >
          Animaciones fluidas y performantes para la web moderna
        </h2>
      </section>

      {/* Carrusel Automático de Tecnologías */}
      <section style={{ 
        minHeight: '50vh', 
        width: '100%',
        maxWidth: '1200px',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3rem 2rem',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '20px',
        margin: '2rem 0'
      }}>
        <h3 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: '600',
          color: '#88CE02',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          ✨ Tecnologías y Conceptos GSAP
        </h3>
        <p style={{
          color: '#b3b3b3',
          fontSize: '1rem',
          marginBottom: '3rem',
          textAlign: 'center',
          maxWidth: '600px'
        }}>
          Carrusel automático que muestra las tecnologías que se pueden animar con GSAP
        </p>
        
        {/* Container del carrusel */}
        <div style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          height: '120px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div 
            ref={carouselRef}
            style={{
              display: 'flex',
              gap: '2rem',
              whiteSpace: 'nowrap',
              height: '100%',
              alignItems: 'center'
            }}
          >
            {[
              'GSAP', 'ANIMACIONES', 'SCROLL', 'TRIGGERS', 'PERFORMANCE', 
              'RESPONSIVE', 'INTERACTIVO', 'FLUIDO', 'MODERNO', 'CREATIVE',
              'WEB', 'DEVELOPMENT', 'JAVASCRIPT', 'CSS', 'HTML',
              'REACT', 'VUE', 'ANGULAR', 'SVELTE', 'NEXT.JS',
              // Duplicar para efecto infinito
              'GSAP', 'ANIMACIONES', 'SCROLL', 'TRIGGERS', 'PERFORMANCE', 
              'RESPONSIVE', 'INTERACTIVO', 'FLUIDO', 'MODERNO', 'CREATIVE'
            ].map((text, index) => (
              <div
                key={index}
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                  fontWeight: '700',
                  color: index % 3 === 0 ? '#88CE02' : index % 3 === 1 ? '#4f46e5' : '#ec4899',
                  textShadow: `0 0 15px ${index % 3 === 0 ? '#88CE02' : index % 3 === 1 ? '#4f46e5' : '#ec4899'}`,
                  userSelect: 'none',
                  padding: '1rem 2rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  border: `2px solid ${index % 3 === 0 ? '#88CE02' : index % 3 === 1 ? '#4f46e5' : '#ec4899'}`,
                  textAlign: 'center',
                  minWidth: '200px',
                  flexShrink: 0,
                  boxShadow: `0 4px 15px ${index % 3 === 0 ? 'rgba(136, 206, 2, 0.2)' : index % 3 === 1 ? 'rgba(79, 70, 229, 0.2)' : 'rgba(236, 72, 153, 0.2)'}`,
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
        
        {/* Indicador de movimiento */}
        <p style={{
          color: '#666',
          fontSize: '0.9rem',
          marginTop: '2rem',
          textAlign: 'center',
          fontStyle: 'italic'
        }}>
          🎠 Carrusel en movimiento automático
        </p>
      </section>

      {/* Author Section */}
      <section style={{ 
        minHeight: '50vh', 
        width: '100%',
        maxWidth: '1200px',
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 2rem'
      }}>
        <div 
          ref={authorRef}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            background: 'linear-gradient(45deg, #88CE02, #ec4899)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '2rem'
          }}
        >
          Por [Tu nombre Aqui]
        </div>
        
        <p style={{
          maxWidth: '600px',
          fontSize: '1.1rem',
          lineHeight: '1.6',
          color: '#b3b3b3'
        }}>
          Todos estos efectos fueron creados utilizando GSAP (GreenSock Animation Platform). 
          Una librería poderosa para crear animaciones fluidas y complejas en la web.
        </p>
      </section>
    </div>
  );
};

export default GSAPShowcaseSimple;