import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export default function PageTransition({ 
  children, 
  className = '',
  duration = 300
}: PageTransitionProps) {
  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState<React.ReactNode>(children);
  
  // Manejar cambios de ubicación
  useEffect(() => {
    setIsTransitioning(true);
    
    const timer = setTimeout(() => {
      setCurrentPage(children);
      setIsTransitioning(false);
    }, duration / 2);
    
    return () => clearTimeout(timer);
  }, [location, children, duration]);
  
  return (
    <div 
      className={`relative overflow-hidden transition-opacity ease-in-out ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      } ${className}`}
      style={{ transitionDuration: `${duration / 2}ms` }}
    >
      {currentPage}
    </div>
  );
}

export function RedMafiaPageTransition({ 
  children, 
  className = '',
  duration = 300
}: PageTransitionProps) {
  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousChildren, setPreviousChildren] = useState<React.ReactNode>(null);
  const [currentChildren, setCurrentChildren] = useState<React.ReactNode>(children);
  
  // Manejar cambios de ubicación
  useEffect(() => {
    if (location) {
      // Guardar el contenido actual
      setPreviousChildren(currentChildren);
      
      // Iniciar transición
      setIsTransitioning(true);
      
      // Después de un pequeño retraso, actualizar el contenido
      const timer = setTimeout(() => {
        setCurrentChildren(children);
        setIsTransitioning(false);
      }, duration / 2); // Mitad del tiempo para que coincida con la animación CSS
      
      return () => clearTimeout(timer);
    }
  }, [location, children, duration]);
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Capa de transición */}
      <div
        className={`fixed inset-0 bg-black z-50 transform transition-transform pointer-events-none ${
          isTransitioning 
            ? 'translate-y-0' 
            : 'translate-y-full'
        }`}
        style={{ transitionDuration: `${duration}ms`, transitionTimingFunction: 'cubic-bezier(0.7, 0, 0.3, 1)' }}
      >
        {/* Efecto de sangre para la transición */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-[#950101]"></div>
      </div>
      
      {/* Contenido de la página */}
      <div 
        className={`transition-opacity ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ transitionDuration: `${duration / 2}ms`, transitionDelay: isTransitioning ? '0ms' : `${duration / 2}ms` }}
      >
        {currentChildren}
      </div>
    </div>
  );
}