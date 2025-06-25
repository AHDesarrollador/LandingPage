import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const InteractiveEffects = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Cursor personalizado con efecto magnético
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });
      
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    // Efecto hover en elementos interactivos
    const handleMouseEnter = (e) => {
      if (e.target.matches('button, a, .interactive')) {
        gsap.to(cursor, {
          scale: 1.5,
          backgroundColor: '#ff6b6b',
          duration: 0.2
        });
        gsap.to(follower, {
          scale: 2,
          duration: 0.2
        });
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.matches('button, a, .interactive')) {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: '#4f46e5',
          duration: 0.2
        });
        gsap.to(follower, {
          scale: 1,
          duration: 0.2
        });
      }
    };

    // Crear partículas flotantes
    const createParticles = () => {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
          position: fixed;
          width: ${Math.random() * 4 + 2}px;
          height: ${Math.random() * 4 + 2}px;
          background: linear-gradient(45deg, #4f46e5, #7c3aed);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          left: ${Math.random() * window.innerWidth}px;
          top: ${Math.random() * window.innerHeight}px;
          opacity: ${Math.random() * 0.5 + 0.2};
        `;
        
        document.body.appendChild(particle);
        particlesRef.current.push(particle);

        // Animación flotante
        gsap.to(particle, {
          y: -window.innerHeight - 100,
          x: `+=${Math.random() * 200 - 100}`,
          rotation: 360,
          duration: Math.random() * 10 + 10,
          repeat: -1,
          ease: "none",
          delay: Math.random() * 2
        });
      }
    };

    // Efecto de ondas al hacer clic
    const createRipple = (e) => {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, transparent 70%);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
        left: ${e.clientX - 50}px;
        top: ${e.clientY - 50}px;
        width: 100px;
        height: 100px;
      `;

      document.body.appendChild(ripple);
      
      setTimeout(() => {
        document.body.removeChild(ripple);
      }, 600);
    };

    // Event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('click', createRipple);

    createParticles();

    // Agregar CSS para el efecto ripple
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .floating-particle {
          will-change: transform;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('click', createRipple);
      
      // Limpiar partículas
      particlesRef.current.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      particlesRef.current = [];
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          backgroundColor: '#4f46e5',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'background-color 0.2s ease',
          mixBlendMode: 'difference'
        }}
      />
      <div 
        ref={followerRef}
        className="cursor-follower"
        style={{
          position: 'fixed',
          width: '20px',
          height: '20px',
          border: '2px solid rgba(79, 70, 229, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default InteractiveEffects;