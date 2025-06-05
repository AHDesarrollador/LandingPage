// src/utils/ScrollUtils.js

// Hook personalizado para manejar el scroll automático
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useAutoScroll = (sectionRef) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToSection && sectionRef.current) {
      const targetSectionId = location.state.scrollToSection;
      const currentSectionId = sectionRef.current.id;
      
      if (targetSectionId === currentSectionId) {
        setTimeout(() => {
          sectionRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
        
        // Limpiar el state después del scroll
        window.history.replaceState({}, document.title);
      }
    }
  }, [location, sectionRef]);
};

// Función para manejar la navegación con scroll
export const navigateWithScroll = (navigate, location, targetPath, sectionId) => {
  if (location.pathname === targetPath) {
    // Si ya estamos en la página, solo hacer scroll
    scrollToSection(sectionId);
  } else {
    // Navegar a la página y luego hacer scroll
    navigate(targetPath, { state: { scrollToSection: sectionId } });
  }
};

// Función para hacer scroll a una sección específica
export const scrollToSection = (sectionId) => {
  setTimeout(() => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, 100);
};