import { useRef, useEffect, useState } from 'react';

interface NeonLineProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
  orientation?: 'horizontal' | 'vertical';
  pulse?: boolean;
  zIndex?: number;
}

export default function NeonLine({
  className = '',
  width = '100%',
  height = 2,
  color = '#FF0000',
  orientation = 'horizontal',
  pulse = false,
  zIndex = 1
}: NeonLineProps) {
  const isHorizontal = orientation === 'horizontal';
  
  // Estilos calculados
  const neonStyles = {
    width: isHorizontal 
      ? typeof width === 'number' ? `${width}px` : width 
      : typeof height === 'number' ? `${height}px` : height,
    height: isHorizontal 
      ? typeof height === 'number' ? `${height}px` : height 
      : typeof width === 'number' ? `${width}px` : width,
    backgroundColor: color,
    boxShadow: `0 0 5px ${color}, 0 0 10px ${color}`,
    zIndex
  };
  
  return (
    <div 
      className={`${className} ${pulse ? 'animate-pulse-slow' : ''}`}
      style={neonStyles}
    ></div>
  );
}

export function AnimatedNeonLine({
  color = '#FF0000',
  height = 2,
  orientation = 'horizontal',
  className = '',
  zIndex = 1
}: NeonLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const isHorizontal = orientation === 'horizontal';
  
  // Observar cambios en el tamaño del contenedor
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      if (containerRef.current) {
        if (isHorizontal) {
          setWidth(containerRef.current.offsetWidth);
        } else {
          setWidth(containerRef.current.offsetHeight);
        }
      }
    };
    
    // Observador de redimensión
    const resizeObserver = new ResizeObserver(updateSize);
    
    // Actualizar tamaño inicial y observar cambios
    updateSize();
    resizeObserver.observe(containerRef.current);
    
    // Limpiar observador
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [isHorizontal]);
  
  // Estilos base para el contenedor
  const containerStyles = {
    position: 'relative',
    width: isHorizontal ? '100%' : `${height}px`,
    height: isHorizontal ? `${height}px` : '100%',
    overflow: 'hidden',
    zIndex
  } as React.CSSProperties;
  
  return (
    <div
      ref={containerRef}
      className={className}
      style={containerStyles}
    >
      {/* Línea base */}
      <div 
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          backgroundColor: color,
          opacity: 0.5,
        }}
      />
      
      {/* Efecto brillante que se mueve */}
      <div 
        style={{
          position: 'absolute',
          width: isHorizontal ? '50px' : '100%',
          height: isHorizontal ? '100%' : '50px',
          background: isHorizontal 
            ? `linear-gradient(90deg, transparent, ${color}, transparent)` 
            : `linear-gradient(180deg, transparent, ${color}, transparent)`,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
          top: 0,
          left: 0,
          animation: `shimmer ${width / 100}s infinite linear`,
          transform: isHorizontal 
            ? `translateX(-50px)` 
            : `translateY(-50px)`,
        }}
      />
    </div>
  );
}