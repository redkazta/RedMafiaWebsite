import { useState, useEffect, useRef } from 'react';

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
  active = false,
  color = 'white',
  height = 20,
  width = 30
}: EqualizerProps) {
  const [bars, setBars] = useState<{ id: number; maxHeight: number; animationDuration: string }[]>([]);
  const animationRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);
  
  // Generar barras aleatorias
  useEffect(() => {
    const newBars = Array.from({ length: barCount }, (_, i) => ({
      id: i,
      maxHeight: active ? Math.random() * (height * 0.7) + (height * 0.3) : 2,
      animationDuration: `${0.4 + Math.random() * 0.4}s`
    }));
    
    setBars(newBars);
  }, [barCount, active, height]);
  
  // Actualizar la altura de las barras en un intervalo
  useEffect(() => {
    if (!active) return;
    
    const updateBars = () => {
      setBars(prev => 
        prev.map(bar => ({
          ...bar,
          maxHeight: Math.random() * (height * 0.7) + (height * 0.3)
        }))
      );
      
      animationRef.current = window.setTimeout(updateBars, 500);
    };
    
    updateBars();
    
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [active, height]);
  
  return (
    <div 
      className={`flex items-end justify-center gap-[2px] ${className}`}
      style={{ 
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      {bars.map(bar => (
        <div
          key={bar.id}
          className="w-[2px] rounded-t-sm transition-all"
          style={{
            height: active ? `${bar.maxHeight}px` : '2px',
            backgroundColor: color,
            transitionDuration: bar.animationDuration
          }}
        />
      ))}
    </div>
  );
}