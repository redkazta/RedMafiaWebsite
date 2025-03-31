import { useState, useEffect, useRef } from 'react';

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
  particleCount = 50,
  active = false,
  intensity = 5,
  width,
  height
}: FireParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const requestRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Crear una partícula nueva
  const createParticle = (id: number): Particle => {
    const containerWidth = width || (containerRef.current?.clientWidth || window.innerWidth);
    const containerHeight = height || (containerRef.current?.clientHeight || window.innerHeight);
    
    // Posición inicial - cerca del fondo
    const x = Math.random() * containerWidth;
    const y = containerHeight - Math.random() * 50;
    
    // Tamaño aleatorio basado en la intensidad
    const size = Math.random() * (2 + intensity/2) + 2;
    
    // Velocidad
    const speedY = -(Math.random() * intensity + 1);
    
    // Vida de la partícula
    const maxLife = 1000 + Math.random() * 2000 * (intensity / 5);
    
    return {
      id,
      x,
      y,
      size,
      speedY,
      opacity: Math.random() * 0.5 + 0.3,
      life: 0,
      maxLife,
    };
  };
  
  // Inicializar partículas
  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }
    
    const initialParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      initialParticles.push(createParticle(i));
    }
    setParticles(initialParticles);
    
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [active, particleCount]);
  
  // Animación de partículas
  useEffect(() => {
    if (!active || particles.length === 0) return;
    
    let animationFrameId: number;
    let lastAddedParticleTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      
      // Añadir nuevas partículas para mantener el conteo estable
      const currentTime = now;
      if (currentTime - lastAddedParticleTime > 100) {
        setParticles(prevParticles => {
          const newParticles = [...prevParticles];
          
          // Encontrar partículas que hayan completado su ciclo de vida
          const deadParticles = newParticles.filter(p => p.life >= p.maxLife);
          
          // Reemplazar partículas muertas
          deadParticles.forEach(deadParticle => {
            const index = newParticles.findIndex(p => p.id === deadParticle.id);
            if (index !== -1) {
              newParticles[index] = createParticle(deadParticle.id);
            }
          });
          
          return newParticles;
        });
        lastAddedParticleTime = currentTime;
      }
      
      // Actualizar posición de partículas
      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          // Mover hacia arriba
          const y = particle.y + particle.speedY;
          
          // Añadir pequeño movimiento horizontal
          const x = particle.x + (Math.random() - 0.5) * 0.5;
          
          // Incrementar tiempo de vida
          const life = particle.life + 16.67; // Aproximadamente en milisegundos para 60fps
          
          // Calcular opacidad en función del ciclo de vida
          const opacityMultiplier = 1 - life / particle.maxLife;
          const opacity = particle.opacity * opacityMultiplier;
          
          return {
            ...particle,
            x,
            y,
            life,
            opacity
          };
        });
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    requestRef.current = animationFrameId;
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      requestRef.current = null;
    };
  }, [active, particles]);
  
  if (!active) return null;
  
  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fire-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size * 2}px`,
            height: `${particle.size * 2}px`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
}