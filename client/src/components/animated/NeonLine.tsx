import React from 'react';

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
  height = '2px',
  color = 'var(--color-primary)',
  orientation = 'horizontal',
  pulse = true,
  zIndex = 0,
}: NeonLineProps) {
  const isHorizontal = orientation === 'horizontal';
  
  return (
    <div
      className={`relative overflow-hidden ${className} ${pulse ? 'animate-neon' : ''}`}
      style={{
        width: isHorizontal ? width : height,
        height: isHorizontal ? height : width,
        zIndex,
      }}
    >
      <div
        style={{
          background: color,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          boxShadow: `0 0 5px ${color}, 0 0 10px ${color}`,
        }}
      />
    </div>
  );
}

// Componente de línea decorativa con efecto de "encendido"
export function AnimatedNeonLine({
  className = '',
  width = '100%',
  height = '2px',
  color = 'var(--color-primary)',
  orientation = 'horizontal',
  duration = 3000,
  delay = 0,
  zIndex = 0,
}: NeonLineProps & { duration?: number; delay?: number }) {
  const isHorizontal = orientation === 'horizontal';
  
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: isHorizontal ? width : height,
        height: isHorizontal ? height : width,
        zIndex,
      }}
    >
      <div
        style={{
          background: color,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          boxShadow: `0 0 5px ${color}, 0 0 10px ${color}`,
          animation: `light-line ${duration}ms infinite ease-in-out`,
          animationDelay: `${delay}ms`,
        }}
      />
    </div>
  );
}