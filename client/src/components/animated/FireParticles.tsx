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
  density?: number; // Alias para particleCount para compatibilidad
}

export default function FireParticles({
  className = '',
  particleCount = 50,
  active = true,
  intensity = 5,
  width = 300,
  height = 200,
  density
}: FireParticlesProps) {
  // Usar density como alias para particleCount si está definido
  const actualParticleCount = density !== undefined ? density : particleCount;
  const [particles, setParticles] = useState<Particle[]>([]);
  const requestRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  
  // Crear una nueva partícula
  const createParticle = (id: number): Particle => {
    const particleIntensity = intensity / 10; // Normalizar a 0-1
    
    return {
      id,
      x: Math.random() * width,
      y: height + Math.random() * 20,
      size: 2 + Math.random() * 3 * particleIntensity,
      speedY: 1 + Math.random() * 3 * particleIntensity,
      opacity: 0.4 + Math.random() * 0.6,
      life: 0,
      maxLife: 100 + Math.random() * 50
    };
  };
  
  // Inicializar partículas
  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }
    
    // Crear partículas iniciales
    const initialParticles: Particle[] = [];
    for (let i = 0; i < actualParticleCount; i++) {
      initialParticles.push(createParticle(i));
    }
    
    setParticles(initialParticles);
    
    // Inicializar el canvas
    if (canvasRef.current) {
      contextRef.current = canvasRef.current.getContext('2d');
    }
  }, [active, actualParticleCount, width, height, intensity]);
  
  // Animar partículas
  useEffect(() => {
    if (!active || !contextRef.current) return;
    
    const animate = () => {
      if (!contextRef.current || !canvasRef.current) return;
      
      // Limpiar canvas
      contextRef.current.clearRect(0, 0, width, height);
      
      // Actualizar y dibujar partículas
      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          // Actualizar posición y vida
          const newY = particle.y - particle.speedY;
          const newLife = particle.life + 1;
          
          // Dibujar partícula
          if (contextRef.current) {
            const ctx = contextRef.current;
            const lifeRatio = newLife / particle.maxLife;
            const opacityMultiplier = lifeRatio < 0.5 ? lifeRatio * 2 : (1 - lifeRatio) * 2;
            
            // Color degradado basado en intensidad y ciclo de vida
            const r = 255;
            const g = Math.floor(100 + (155 * (1 - lifeRatio)) * (intensity / 10));
            const b = Math.floor(50 * (1 - lifeRatio) * (intensity / 10));
            
            ctx.beginPath();
            const gradient = ctx.createRadialGradient(
              particle.x, newY, 0,
              particle.x, newY, particle.size
            );
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${particle.opacity * opacityMultiplier})`);
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.arc(particle.x, newY, particle.size, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Regenerar partícula si llega al final de su vida útil
          if (newLife >= particle.maxLife || newY < -particle.size) {
            return createParticle(particle.id);
          }
          
          // Actualizar partícula
          return {
            ...particle,
            y: newY,
            life: newLife
          };
        });
      });
      
      // Continuar la animación
      requestRef.current = requestAnimationFrame(animate);
    };
    
    // Iniciar animación
    animate();
    
    // Limpiar al desmontar
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [active, width, height, intensity]);
  
  return (
    <div 
      className={`absolute bottom-0 left-0 w-full ${className}`}
      style={{ width, height }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-full"
      />
    </div>
  );
}