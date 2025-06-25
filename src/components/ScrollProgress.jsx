import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentProgress = window.pageYOffset;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        const progress = (currentProgress / scrollHeight) * 100;
        setScrollProgress(progress);
        
        // Actualizar CSS variable para efectos
        document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="scroll-progress-container">
      <div 
        className="scroll-progress-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '3px',
          background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #ec4899)',
          zIndex: 10000,
          transition: 'width 0.1s ease-out',
          boxShadow: '0 0 10px rgba(79, 70, 229, 0.5)'
        }}
      />
      
      {/* Botón de scroll to top */}
      {scrollProgress > 20 && (
        <button
          className="scroll-to-top"
          onClick={() => {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: 0 },
              ease: "power2.out"
            });
          }}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            zIndex: 1000,
            boxShadow: '0 4px 20px rgba(79, 70, 229, 0.3)',
            transition: 'all 0.3s ease',
            animation: 'fadeInUp 0.5s ease-out'
          }}
          onMouseEnter={(e) => {
            gsap.to(e.target, {
              scale: 1.1,
              duration: 0.2
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.target, {
              scale: 1,
              duration: 0.2
            });
          }}
        >
          ↑
        </button>
      )}
      
      {/* Agregar estilos para la animación */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollProgress;