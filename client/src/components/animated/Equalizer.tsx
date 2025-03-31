import React, { useEffect, useState } from 'react';

interface EqualizerProps {
  className?: string;
  barCount?: number;
  active?: boolean;
  color?: string;
  height?: number;
  width?: number;
}

export default function Equalizer({
  className = '',
  barCount = 5,
  active = true,
  color = 'var(--color-primary)',
  height = 20,
  width = 30,
}: EqualizerProps) {
  const [bars, setBars] = useState<number[]>([]);

  // Crear barras con retardos aleatorios
  useEffect(() => {
    const newBars = Array.from({ length: barCount }, (_, i) => {
      return Math.floor(Math.random() * 100);
    });
    setBars(newBars);
  }, [barCount]);

  return (
    <div 
      className={`flex items-end justify-center space-x-1 ${className}`}
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      {bars.map((value, index) => (
        <div
          key={index}
          className={`w-1 rounded-t-sm ${active ? 'animate-soundwave' : ''}`}
          style={{
            backgroundColor: color,
            opacity: active ? 0.8 : 0.4,
            height: '30%',
            animationDelay: `${index * 100}ms`,
            animationDuration: `${600 + Math.random() * 400}ms`,
          }}
        />
      ))}
    </div>
  );
}