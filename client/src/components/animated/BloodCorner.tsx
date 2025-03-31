import React, { useMemo } from 'react';

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
  opacity = 0.6,
  animate = true,
}: BloodCornerProps) {
  // Determinar la posición CSS y transformación
  const positionStyles = useMemo(() => {
    switch (position) {
      case 'top-left':
        return { top: 0, left: 0, transform: 'rotate(0deg)' };
      case 'top-right':
        return { top: 0, right: 0, transform: 'rotate(90deg)' };
      case 'bottom-left':
        return { bottom: 0, left: 0, transform: 'rotate(270deg)' };
      case 'bottom-right':
        return { bottom: 0, right: 0, transform: 'rotate(180deg)' };
    }
  }, [position]);

  // Generar paths SVG aleatorios para el efecto de sangre
  const bloodPaths = useMemo(() => {
    const paths = [];
    const baseSize = size * 0.8;
    
    // Crear 3-5 trazos de sangre
    const pathCount = 3 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < pathCount; i++) {
      const drip = 30 + Math.random() * 70; // Longitud de la gota
      const width = 15 + Math.random() * 30; // Ancho de la gota
      const xOffset = 10 + Math.random() * (baseSize - 20); // Posición X
      
      paths.push(
        <path 
          key={i}
          d={`M ${xOffset} 0 
              C ${xOffset - width/3} ${drip/3}, ${xOffset + width/3} ${drip/2}, ${xOffset} ${drip}
              C ${xOffset - width/4} ${drip*0.8}, ${xOffset + width/4} ${drip*0.8}, ${xOffset - width/2} ${drip*0.6}`}
          fill="none"
          stroke="#950101"
          strokeWidth={3 + Math.random() * 3}
          opacity={0.4 + Math.random() * 0.6}
          style={{
            filter: 'drop-shadow(0 0 2px rgba(255,0,0,0.5))',
            animation: animate ? `blood-drip ${2 + Math.random() * 3}s ${Math.random() * 2}s infinite` : 'none',
            animationTimingFunction: 'ease-in-out'
          }}
        />
      );
    }
    
    // Mancha principal
    paths.push(
      <ellipse
        key="stain"
        cx={baseSize / 2}
        cy={20}
        rx={baseSize / 2 - 10}
        ry={30}
        fill="#950101"
        opacity={opacity * 0.8}
        style={{
          filter: 'drop-shadow(0 0 3px rgba(255,0,0,0.4))'
        }}
      />
    );
    
    return paths;
  }, [size, opacity, animate]);

  return (
    <div 
      className={`absolute z-0 overflow-visible pointer-events-none ${className}`}
      style={{
        ...positionStyles,
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          position: 'absolute',
          filter: 'blur(0.5px)',
          ...positionStyles,
        }}
      >
        {bloodPaths}
      </svg>
    </div>
  );
}