import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/GSAPShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const GSAPShowcase = () => {
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  const morphingRef = useRef(null);
  const particlesRef = useRef(null);
  const infiniteTextRef = useRef(null);
  const splitTextRef = useRef(null);
  const liquidRef = useRef(null);
  const magneticRef = useRef(null);
  const authorRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Inicializar la página visible
    gsap.set(container, { opacity: 1 });

    // Hero Animation - Simple fade in
    if (heroTextRef.current) {
      gsap.fromTo(heroTextRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 0.5 }
      );
    }

    // Morphing shapes animation 
    if (morphingRef.current) {
      const morphShapes = morphingRef.current.querySelectorAll('.morph-shape');
      morphShapes.forEach((shape, index) => {
        gsap.to(shape, {
          scale: index % 2 === 0 ? 1.2 : 0.8,
          rotation: 360,
          duration: 2,
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
          ease: "power2.inOut"
        });
      });
    }

    // Floating particles
    if (particlesRef.current) {
      const createParticles = () => {
        for (let i = 0; i < 30; i++) {
          const particle = document.createElement('div');
          particle.className = 'showcase-particle';
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: linear-gradient(45deg, #88CE02, #4f46e5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
          `;
          particlesRef.current.appendChild(particle);

          gsap.to(particle, {
            x: `+=${Math.random() * 400 - 200}`,
            y: `+=${Math.random() * 400 - 200}`,
            rotation: 360,
            duration: Math.random() * 10 + 5,
            repeat: -1,
            ease: "none"
          });
        }
      };

      createParticles();
    }

    // Infinite scrolling text
    if (infiniteTextRef.current) {
      gsap.to(infiniteTextRef.current, {
        x: "-100%",
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }

    // Split text animation
    if (splitTextRef.current) {
      const splitText = splitTextRef.current;
      const chars = splitText.textContent.split('');
      splitText.innerHTML = chars.map(char => 
        char === ' ' ? ' ' : `<span class="char">${char}</span>`
      ).join('');

      ScrollTrigger.create({
        trigger: splitText,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(splitText.querySelectorAll('.char'), 
            { 
              opacity: 0, 
              y: 50, 
              rotationX: -90 
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.05,
              stagger: 0.02,
              ease: "back.out(1.7)"
            }
          );
        }
      });
    }

    // Liquid distortion effect
    if (liquidRef.current) {
      ScrollTrigger.create({
        trigger: liquidRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const liquidBlob = liquidRef.current.querySelector('.liquid-blob');
          if (liquidBlob) {
            gsap.to(liquidBlob, {
              scaleX: 1 + progress * 0.5,
              scaleY: 1 + Math.sin(progress * Math.PI * 4) * 0.3,
              skewX: Math.cos(progress * Math.PI * 6) * 15,
              rotation: progress * 180,
              duration: 0.1
            });
          }
        }
      });
    }

    // Magnetic effect
    if (magneticRef.current) {
      const magneticElements = magneticRef.current.querySelectorAll('.magnetic');
      magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
          const rect = element.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          
          gsap.to(element, {
            x: x * 20,
            y: y * 20,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        element.addEventListener('mouseleave', () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        });
      });
    }

    // Author name animation
    if (authorRef.current) {
      gsap.fromTo(authorRef.current, 
        { opacity: 0, scale: 0.5, rotation: -45 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0, 
          duration: 1, 
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: authorRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Scroll-triggered animations
    const sections = container.querySelectorAll('.showcase-section');
    sections.forEach((section) => {
      gsap.fromTo(section, 
        { 
          opacity: 0, 
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Agregar efectos adicionales simples
    gsap.to(".gsap-logo-text", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Efecto de pulsación en botones magnéticos
    gsap.to(".magnetic", {
      scale: 1.05,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.2
    });

    // Parallax backgrounds
    const parallaxElements = container.querySelectorAll('.parallax-bg');
    parallaxElements.forEach((element, index) => {
      gsap.to(element, {
        yPercent: -50 * (index + 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="gsap-showcase">
      {/* Back button */}
      <Link to="/" className="back-button">
        ← Volver al inicio
      </Link>

      {/* Hero Section */}
      <section className="showcase-section hero-showcase">
        <div className="parallax-bg bg-1"></div>
        <h1 ref={heroTextRef} className="hero-text">Esto fue hecho con la librería GSAP</h1>
        <div className="gsap-logo">
          <div className="gsap-logo-text">GSAP</div>
        </div>
      </section>

      {/* Morphing Shapes */}
      <section className="showcase-section morphing-section">
        <h2>Morfeo de Formas</h2>
        <div ref={morphingRef} className="morphing-container">
          <svg viewBox="0 0 200 200" className="morph-svg">
            <path className="morph-shape" d="M50,50 Q150,50 150,150 Q50,150 50,50" fill="#88CE02" />
          </svg>
          <svg viewBox="0 0 200 200" className="morph-svg">
            <path className="morph-shape" d="M100,50 L150,150 L50,150 Z" fill="#4f46e5" />
          </svg>
        </div>
      </section>

      {/* Floating Particles */}
      <section className="showcase-section particles-section">
        <h2>Partículas Flotantes</h2>
        <div ref={particlesRef} className="particles-container"></div>
      </section>

      {/* Infinite Scrolling Text */}
      <section className="showcase-section infinite-section">
        <div className="infinite-wrapper">
          <div ref={infiniteTextRef} className="infinite-text">
            GSAP GSAP GSAP GSAP GSAP GSAP GSAP GSAP GSAP GSAP GSAP GSAP 
          </div>
        </div>
      </section>

      {/* Split Text Animation */}
      <section className="showcase-section split-text-section">
        <h2 ref={splitTextRef} className="split-text">
          Animaciones de Texto Increíbles
        </h2>
      </section>

      {/* Liquid Distortion */}
      <section className="showcase-section liquid-section">
        <h2>Distorsión Líquida</h2>
        <div ref={liquidRef} className="liquid-container">
          <svg viewBox="0 0 100 100" className="liquid-svg">
            <path className="liquid-blob" d="M50,50 Q75,25 75,75 Q25,75 50,50" fill="url(#liquidGradient)" />
            <defs>
              <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#88CE02" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Magnetic Elements */}
      <section className="showcase-section magnetic-section">
        <h2>Efectos Magnéticos</h2>
        <div ref={magneticRef} className="magnetic-container">
          <div className="magnetic">Hover me!</div>
          <div className="magnetic">Magnético</div>
          <div className="magnetic">GSAP Power</div>
        </div>
      </section>

      {/* Author Section */}
      <section className="showcase-section author-section">
        <div ref={authorRef} className="author-text">Por Ariel Hernández</div>
        <p className="showcase-description">
          Todos estos efectos fueron creados utilizando la poderosa librería GSAP (GreenSock Animation Platform).
          GSAP permite crear animaciones fluidas, performantes y complejas para la web.
        </p>
      </section>
    </div>
  );
};

export default GSAPShowcase;