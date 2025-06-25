import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/LenisShowcase.css';

gsap.registerPlugin(ScrollTrigger);

function LenisShowcase() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const parallaxRef = useRef(null);
  const scrollElementsRef = useRef([]);
  const smoothScrollRef = useRef(null);
  const pinSectionRef = useRef(null);

  useEffect(() => {
    // Animaciones de entrada
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title-char',
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out"
      }
    )
    .fromTo('.hero-subtitle',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    // Animaciones de scroll paralelo
    gsap.to('.parallax-bg', {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: parallaxRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Animación de las características
    gsap.fromTo('.feature-card',
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Scroll smoothness demo
    const scrollElements = scrollElementsRef.current;
    scrollElements.forEach((element, index) => {
      gsap.fromTo(element,
        { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Pin section animation
    ScrollTrigger.create({
      trigger: pinSectionRef.current,
      start: "top 20%",
      end: "bottom 80%",
      pin: ".pin-content",
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to('.pin-element', {
          rotation: progress * 360,
          scale: 1 + progress * 0.5,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToScrollRefs = (el) => {
    if (el && !scrollElementsRef.current.includes(el)) {
      scrollElementsRef.current.push(el);
    }
  };

  return (
    <div className="lenis-showcase">
      {/* Hero Section */}
      <section ref={heroRef} className="lenis-hero">
        <div className="container">
          <h1 className="hero-title">
            {'LENIS'.split('').map((char, index) => (
              <span key={index} className="hero-title-char">{char}</span>
            ))}
          </h1>
          <p className="hero-subtitle">
            Scroll suave y natural para experiencias web excepcionales
          </p>
          <div className="hero-description">
            <p>
              Lenis es una biblioteca de scroll suave que proporciona una experiencia 
              de navegación fluida y natural en aplicaciones web modernas.
            </p>
          </div>
          
          <div className="scroll-indicator">
            <div className="scroll-line"></div>
            <span>Scroll para explorar</span>
          </div>
        </div>
        
        <div className="parallax-bg"></div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="features-section">
        <div className="container">
          <h2 className="section-title">Características Principales</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌊</div>
              <h3>Scroll Suave</h3>
              <p>Interpolación fluida que hace que el scroll se sienta natural y responsivo en cualquier dispositivo.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Alto Rendimiento</h3>
              <p>Optimizado para 60fps con técnicas avanzadas de optimización y requestAnimationFrame.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Fácil Integración</h3>
              <p>API simple y directa que se integra perfectamente con cualquier framework o biblioteca.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive</h3>
              <p>Funciona perfectamente en dispositivos móviles y desktop con detección automática de touch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Smooth Scroll Demo */}
      <section ref={smoothScrollRef} className="smooth-demo-section">
        <div className="container">
          <h2 className="section-title">Demostración de Scroll Suave</h2>
          
          <div className="demo-content">
            {[1, 2, 3, 4, 5].map((item) => (
              <div 
                key={item}
                ref={addToScrollRefs}
                className="demo-item"
              >
                <div className="demo-number">{item.toString().padStart(2, '0')}</div>
                <div className="demo-text">
                  <h3>Elemento {item}</h3>
                  <p>
                    Este elemento aparece suavemente mientras haces scroll, 
                    demostrando la fluidez y naturalidad de Lenis en acción.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pin Section */}
      <section ref={pinSectionRef} className="pin-section">
        <div className="container">
          <div className="pin-content">
            <div className="pin-element">
              <div className="pin-circle">
                <span>LENIS</span>
              </div>
            </div>
            <h2>Scroll Pin Effect</h2>
            <p>Este elemento se mantiene fijo mientras haces scroll, rotando y escalando dinámicamente.</p>
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section ref={parallaxRef} className="parallax-section">
        <div className="parallax-bg"></div>
        <div className="container">
          <div className="parallax-content">
            <h2>Efectos Parallax</h2>
            <p>
              Lenis permite crear efectos parallax suaves y naturales que mejoran 
              la profundidad visual y la experiencia del usuario.
            </p>
            
            <div className="parallax-elements">
              <div className="parallax-element element-1"></div>
              <div className="parallax-element element-2"></div>
              <div className="parallax-element element-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="code-section">
        <div className="container">
          <h2 className="section-title">Implementación</h2>
          
          <div className="code-block">
            <div className="code-header">
              <span className="code-lang">JavaScript</span>
            </div>
            <pre className="code-content">
{`import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)`}
            </pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="lenis-footer">
        <div className="container">
          <div className="footer-content">
            <h2>Experiencia de Scroll Superior</h2>
            <p>
              Lenis transforma la manera en que los usuarios interactúan con tu contenido, 
              creando una experiencia suave, natural e inmersiva.
            </p>
            
            <div className="footer-links">
              <a href="https://lenis.studiofreight.com/" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Documentación Oficial
              </a>
              <a href="https://github.com/studio-freight/lenis" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Ver en GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LenisShowcase;