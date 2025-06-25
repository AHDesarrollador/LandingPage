import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/JSStackedCards.css';

gsap.registerPlugin(ScrollTrigger);

function JSStackedCards() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const location = useLocation();

  const cards = [
    {
      id: 1,
      title: "Ariel Hernandez",
      subtitle: "Desarrollador FullStack",
      description: "Especializado en crear experiencias web interactivas y modernas con las últimas tecnologías.",
      icon: "👨‍💻",
      color: "#667eea"
    },
    {
      id: 2,
      title: "JavaScript Puro",
      subtitle: "Construido con Vanilla JS",
      description: "Esta sección demuestra el poder de JavaScript nativo combinado con GSAP para crear animaciones fluidas.",
      icon: "⚡",
      color: "#764ba2"
    },
    {
      id: 3,
      title: "Animaciones GSAP",
      subtitle: "Transiciones Suaves",
      description: "Utilizando GSAP y ScrollTrigger para crear efectos visuales que mejoran la experiencia del usuario.",
      icon: "🎨",
      color: "#f093fb"
    },
    {
      id: 4,
      title: "Diseño Responsive",
      subtitle: "Para Todos los Dispositivos",
      description: "Optimizado para funcionar perfectamente en dispositivos móviles, tablets y escritorio.",
      icon: "📱",
      color: "#4facfe"
    },
    {
      id: 5,
      title: "Experiencia Única",
      subtitle: "Interacción Intuitiva",
      description: "Cada tarjeta cuenta una historia, creando una narrativa visual que mantiene al usuario comprometido.",
      icon: "✨",
      color: "#43e97b"
    }
  ];

  const handleCardClick = (clickedIndex) => {
    if (clickedIndex !== currentCardIndex) return;
    
    const cards = cardsRef.current;
    const clickedCard = cards[clickedIndex];
    
    // Animar la tarjeta clickeada para que se mueva fuera de la pila
    gsap.to(clickedCard, {
      x: window.innerWidth > 768 ? 600 : 300,
      y: -100,
      rotation: 15,
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        // Ocultar completamente la tarjeta
        gsap.set(clickedCard, { display: 'none' });
      }
    });

    // Mover las tarjetas restantes hacia arriba en la pila
    cards.forEach((card, index) => {
      if (index > clickedIndex) {
        gsap.to(card, {
          y: (index - 1) * 15,
          z: -(index - 1) * 30,
          rotationX: (index - 1) * 1.5,
          scale: 1 - (index - 1) * 0.02,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2
        });
      }
    });

    // Actualizar el índice de la tarjeta actual
    const newIndex = clickedIndex + 1;
    setCurrentCardIndex(newIndex);
    
    // Si es la última tarjeta, reiniciar automáticamente después de un delay
    if (newIndex >= cards.length) {
      setTimeout(() => {
        resetCards();
      }, 2000);
    }
  };

  const resetCards = () => {
    const cards = cardsRef.current;
    
    // Mostrar todas las tarjetas de nuevo
    cards.forEach(card => {
      gsap.set(card, { display: 'block' });
    });

    // Reiniciar posiciones
    gsap.set(cards, {
      x: 0,
      y: (i) => i * 15,
      z: (i) => -i * 30,
      rotation: 0,
      rotationX: (i) => i * 1.5,
      scale: (i) => 1 - i * 0.02,
      opacity: 1,
      transformOrigin: "center center"
    });

    // Animación de entrada
    gsap.fromTo(cards,
      { 
        scale: 0.8,
        opacity: 0,
        y: (i) => 100 + (i * 15)
      },
      { 
        scale: (i) => 1 - i * 0.02,
        opacity: 1,
        y: (i) => i * 15,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }
    );

    setCurrentCardIndex(0);
  };

  useEffect(() => {
    // Manejar scroll desde navegación
    if (location.state?.scrollToSection) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollToSection);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 500);
    } else {
      // Scroll al inicio de la página por defecto
      window.scrollTo(0, 0);
    }
    
    const cards = cardsRef.current;
    
    // Animación inicial del título
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Configurar posición inicial de las tarjetas (pila apilada)
    gsap.set(cards, {
      y: (i) => i * 15,
      z: (i) => -i * 30,
      rotationX: (i) => i * 1.5,
      scale: (i) => 1 - i * 0.02,
      transformOrigin: "center center"
    });

    // Animación de entrada de las tarjetas
    gsap.fromTo(cards,
      { 
        opacity: 0,
        scale: 0.8,
        y: (i) => 100 + (i * 15)
      },
      { 
        opacity: 1,
        scale: (i) => 1 - i * 0.02,
        y: (i) => i * 15,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5
      }
    );

    // Efecto hover solo para la tarjeta activa
    const handleMouseEnter = (e, index) => {
      if (index === currentCardIndex) {
        gsap.to(e.currentTarget, {
          scale: (1 - index * 0.02) * 1.05,
          rotationY: 3,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = (e, index) => {
      if (index === currentCardIndex) {
        gsap.to(e.currentTarget, {
          scale: 1 - index * 0.02,
          rotationY: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    // Agregar event listeners
    cards.forEach((card, index) => {
      if (card) {
        const mouseEnter = (e) => handleMouseEnter(e, index);
        const mouseLeave = (e) => handleMouseLeave(e, index);
        
        card.addEventListener('mouseenter', mouseEnter);
        card.addEventListener('mouseleave', mouseLeave);
        
        card._mouseEnter = mouseEnter;
        card._mouseLeave = mouseLeave;
      }
    });

    // Cleanup
    return () => {
      cards.forEach(card => {
        if (card && card._mouseEnter && card._mouseLeave) {
          card.removeEventListener('mouseenter', card._mouseEnter);
          card.removeEventListener('mouseleave', card._mouseLeave);
        }
      });
    };
  }, [currentCardIndex]);

  return (
    <div className="js-stacked-cards-page">
      <section id="javascript-section" className="hero-section">
        <div className="container">
          <h1 ref={titleRef} className="hero-title">
            <span className="gradient-text">JavaScript</span> Stack
          </h1>
          <p className="hero-subtitle">
            Tarjetas apiladas con animaciones suaves y efectos interactivos
          </p>
        </div>
      </section>

      <section ref={containerRef} className="stacked-section">
        <div className="container">
          <div className="cards-stack">
            {cards.map((card, index) => (
              <div
                key={card.id}
                ref={el => cardsRef.current[index] = el}
                className={`stack-card ${index === currentCardIndex ? 'active' : ''}`}
                style={{ 
                  '--card-color': card.color,
                  zIndex: cards.length - index
                }}
                onClick={() => handleCardClick(index)}
              >
                <div className="card-content">
                  <div className="card-icon">{card.icon}</div>
                  <h2 className="card-title">{card.title}</h2>
                  <h3 className="card-subtitle">{card.subtitle}</h3>
                  <p className="card-description">{card.description}</p>
                  <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
                  {index === currentCardIndex && (
                    <div className="click-indicator">
                      <span>Haz clic para continuar</span>
                    </div>
                  )}
                </div>
                <div className="card-background"></div>
              </div>
            ))}
          </div>
          
          <div className="stack-controls">
            <button 
              className="reset-btn"
              onClick={resetCards}
              disabled={currentCardIndex === 0}
            >
              Reiniciar pila
            </button>
            <div className="progress-indicator">
              <span>
                {currentCardIndex >= cards.length 
                  ? "¡Completado! Reiniciando..." 
                  : `${currentCardIndex + 1} / ${cards.length}`
                }
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <h3>Tecnología</h3>
              <p>JavaScript + GSAP + ScrollTrigger</p>
            </div>
            <div className="info-card">
              <h3>Características</h3>
              <p>Animaciones fluidas y efectos 3D</p>
            </div>
            <div className="info-card">
              <h3>Compatibilidad</h3>
              <p>Todos los navegadores modernos</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JSStackedCards;