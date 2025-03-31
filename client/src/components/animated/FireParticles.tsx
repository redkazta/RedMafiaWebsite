import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface FireParticlesProps {
  className?: string;
  particleCount?: number;
  active?: boolean;
  intensity?: number; // 1-10
  width?: number;
  height?: number;
}

export default function FireParticles({
  className = '',
  particleCount = 20,
  active = true,
  intensity = 5,
  width = 300,
  height = 200,
}: FireParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  
  // Normalizar la intensidad
  const normalizedIntensity = Math.max(1, Math.min(10, intensity)) / 10;
  
  // Inicializar partículas
  useEffect(() => {
    if (!active) return;
    
    // Crear partículas iniciales
    const initialParticles = Array.from({ length: particleCount }, (_, i) => createParticle(i));
    setParticles(initialParticles);
    
    // Configurar animación
    const animate = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Limpiar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Actualizar y dibujar partículas
      setParticles(prevParticles => {
        const updatedParticles = prevParticles.map(particle => {
          // Actualizar posición
          particle.y -= particle.speedY;
          
          // Disminuir vida
          particle.life -= 1;
          
          // Actualizar opacidad basada en vida
          particle.opacity = (particle.life / particle.maxLife) * normalizedIntensity;
          
          // Dibujar partícula
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size
          );
          
          gradient.addColorStop(0, `rgba(255, ${100 + Math.random() * 155}, 0, ${particle.opacity})`);
          gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          return particle;
        });
        
        // Reemplazar partículas muertas
        const newParticles = updatedParticles
          .filter(p => p.life > 0)
          .concat(
            Array.from(
              { length: particleCount - updatedParticles.filter(p => p.life > 0).length },
              (_, i) => createParticle(Date.now() + i)
            )
          );
        
        return newParticles;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [active, particleCount, normalizedIntensity]);
  
  // Crear una nueva partícula
  const createParticle = (id: number): Particle => {
    const size = 5 + Math.random() * 15 * normalizedIntensity;
    const maxLife = 80 + Math.random() * 120;
    
    return {
      id,
      x: Math.random() * width,
      y: height + size,
      size,
      speedY: 0.5 + Math.random() * 2 * normalizedIntensity,
      opacity: Math.random() * normalizedIntensity,
      life: maxLife,
      maxLife,
    };
  };
  
  if (!active) return null;
  
  return (
    <div className={`absolute overflow-hidden pointer-events-none z-0 ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="opacity-70"
      />
    </div>
  );
}