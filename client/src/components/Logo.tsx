import { useState, useEffect } from 'react';
import { Link } from 'wouter';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  withText?: boolean;
  onClick?: () => void;
}

export default function Logo({
  className = '',
  size = 'md',
  animated = true,
  withText = true,
  onClick
}: LogoProps) {
  const [loaded, setLoaded] = useState(false);
  
  // Tamaños predefinidos
  const sizes = {
    sm: 'w-8 h-auto',
    md: 'w-12 h-auto',
    lg: 'w-20 h-auto',
    xl: 'w-36 h-auto',
  };
  
  // Efecto para la animación de entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Link href="/">
      <a
        className={`inline-flex items-center transition-all duration-300 ${
          animated && loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        } ${className}`}
        onClick={onClick}
      >
        <div className={`relative ${sizes[size]} transition-transform duration-500 hover:scale-110`}>
          <img
            src="/assets/imagen_1743454510922.png"
            alt="RED MAFIA Logo"
            className="w-full h-auto object-contain drop-shadow-red"
          />
        </div>
        
        {withText && (
          <div className="ml-3 text-white font-bold tracking-wide">
            <span className="text-[#FF0000]">RED</span> MAFIA
          </div>
        )}
      </a>
    </Link>
  );
}