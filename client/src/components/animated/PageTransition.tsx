import React, { useEffect, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(location);
  
  useEffect(() => {
    // Si la localización cambia, hacer que el contenido se desvanezca
    if (location !== currentLocation) {
      setIsVisible(false);
      
      // Después del tiempo de transición, actualiza la ubicación actual
      const timeout = setTimeout(() => {
        setCurrentLocation(location);
        // Y luego hacer que el nuevo contenido aparezca
        setIsVisible(true);
      }, duration);
      
      return () => clearTimeout(timeout);
    } else {
      // Para la carga inicial, hacer que el contenido aparezca
      setIsVisible(true);
    }
  }, [location, currentLocation, duration]);
  
  return (
    <div
      className={`transition-all overflow-hidden ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 10}px)`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Componente para transición con efecto rojo
export function RedMafiaPageTransition({ 
  children, 
  className = '',
  duration = 300 
}: PageTransitionProps) {
  const [location] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(location);
  
  useEffect(() => {
    if (location !== currentLocation) {
      setIsVisible(false);
      
      const timeout = setTimeout(() => {
        setCurrentLocation(location);
        setIsVisible(true);
      }, duration);
      
      return () => clearTimeout(timeout);
    } else {
      setIsVisible(true);
    }
  }, [location, currentLocation, duration]);
  
  return (
    <div className="relative overflow-hidden w-full min-h-screen">
      {/* Overlay de transición */}
      {!isVisible && (
        <div
          className="absolute inset-0 z-50 bg-black flex items-center justify-center"
          style={{
            animation: `fade-in-up ${duration}ms ease-in-out`,
          }}
        >
          <div className="relative">
            <h1 
              className="text-4xl font-bold red-mafia-title animate-title"
            >
              RED MAFIA
            </h1>
            <div className="mt-2 flex justify-center space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-5 rounded-full bg-red-600 animate-soundwave"
                  style={{ 
                    animationDelay: `${i * 100}ms`,
                    animationDuration: '600ms' 
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Contenido real */}
      <div
        className={`transition-all ${className}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? 0 : 15}px)`,
          transitionDuration: `${duration}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}