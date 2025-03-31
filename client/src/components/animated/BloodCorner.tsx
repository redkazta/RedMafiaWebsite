import { useState, useEffect, useRef } from 'react';

interface BloodCornerProps {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  opacity?: number;
  animate?: boolean;
}

export default function BloodCorner({
  className = '',
  position = 'top-left',
  size = 100,
  opacity = 0.7,
  animate = true
}: BloodCornerProps) {
  const [drips, setDrips] = useState<{ id: number; height: number; delay: number; position: number }[]>([]);
  const cornerRef = useRef<HTMLDivElement>(null);
  
  // Generar drips aleatorios
  useEffect(() => {
    if (!animate) return;
    
    const numDrips = Math.floor(size / 15);
    const newDrips = [];
    
    for (let i = 0; i < numDrips; i++) {
      newDrips.push({
        id: i,
        height: Math.random() * (size / 2) + (size / 4),
        delay: Math.random() * 3,
        position: Math.random() * size
      });
    }
    
    setDrips(newDrips);
  }, [size, animate]);
  
  // Seleccionar la rotación según la posición
  const getRotation = () => {
    switch (position) {
      case 'top-right': return 'rotate(90deg)';
      case 'bottom-right': return 'rotate(180deg)';
      case 'bottom-left': return 'rotate(270deg)';
      default: return 'rotate(0deg)';
    }
  };
  
  // Seleccionar la posición CSS
  const getPosition = () => {
    switch (position) {
      case 'top-right': return 'top-0 right-0';
      case 'bottom-right': return 'bottom-0 right-0';
      case 'bottom-left': return 'bottom-0 left-0';
      default: return 'top-0 left-0';
    }
  };
  
  // Estilos para el contenedor principal
  const containerStyle = {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    pointerEvents: 'none',
    zIndex: 0,
    transform: getRotation(),
    opacity: opacity
  } as React.CSSProperties;
  
  return (
    <div 
      ref={cornerRef}
      className={`${getPosition()} ${className}`}
      style={containerStyle}
    >
      {/* Forma principal de la esquina */}
      <div 
        className="absolute top-0 left-0"
        style={{
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at top left, rgba(255, 0, 0, ${opacity}), transparent ${size}%)`,
          filter: 'blur(5px)'
        }}
      ></div>
      
      {/* Triángulo en la esquina */}
      <div 
        className="absolute top-0 left-0"
        style={{
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: `${size / 2}px ${size / 2}px 0 0`,
          borderColor: `rgba(255, 0, 0, ${opacity * 0.5}) transparent transparent transparent`,
          filter: 'blur(3px)'
        }}
      ></div>
      
      {/* Gotas de sangre */}
      {animate && drips.map(drip => (
        <div 
          key={drip.id}
          className="absolute bg-[#950101] rounded-b-full animate-drip"
          style={{
            left: `${drip.position}px`,
            top: 0,
            width: `${2 + Math.random() * 3}px`,
            height: `${drip.height}px`,
            animationDelay: `${drip.delay}s`,
            animationDuration: `${3 + Math.random() * 5}s`,
            opacity: 0.6 + Math.random() * 0.4,
            transformOrigin: 'top center',
            filter: 'blur(1px)'
          }}
        ></div>
      ))}
    </div>
  );
}