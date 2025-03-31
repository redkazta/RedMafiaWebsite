import { useState, useEffect } from 'react';
import { Sun, Moon, Flame, ChevronDown } from 'lucide-react';

type ThemeType = 'dark' | 'darker' | 'fire';

interface ThemeToggleProps {
  className?: string;
  onChange?: (theme: ThemeType) => void;
}

export default function ThemeToggle({ className = '', onChange }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [isOpen, setIsOpen] = useState(false);
  
  // Efectos de partículas para el tema "Fuego"
  const [showParticles, setShowParticles] = useState(false);
  
  // Aplicar tema cuando cambia
  useEffect(() => {
    // Eliminar clases de tema anteriores
    document.documentElement.classList.remove('theme-dark', 'theme-darker', 'theme-fire');
    
    // Añadir clase del tema seleccionado
    document.documentElement.classList.add(`theme-${theme}`);
    
    // Mostrar partículas solo en tema "Fuego"
    setShowParticles(theme === 'fire');
    
    // Guardar preferencia en localStorage
    localStorage.setItem('redmafia-theme', theme);
  }, [theme]);
  
  // Cargar tema guardado
  useEffect(() => {
    const savedTheme = localStorage.getItem('redmafia-theme') as ThemeType;
    if (savedTheme) {
      setTheme(savedTheme);
      
      // Notificar el tema cargado
      if (onChange) {
        onChange(savedTheme);
      }
    }
  }, [onChange]);
  
  // Cambiar entre temas
  const toggleTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    setIsOpen(false);
    
    // Llamar al callback onChange si existe
    if (onChange) {
      onChange(newTheme);
    }
  };
  
  // Información y etiquetas de los temas
  const themes = {
    dark: {
      icon: <Moon size={18} />,
      label: 'Oscuro',
      color: 'bg-[#333333]'
    },
    darker: {
      icon: <Moon size={18} className="text-[#950101]" />,
      label: 'Oscuro Extremo',
      color: 'bg-[#121212]'
    },
    fire: {
      icon: <Flame size={18} className="text-[#FF0000]" />,
      label: 'Fuego',
      color: 'bg-gradient-to-r from-[#950101] to-[#FF0000]'
    }
  };
  
  return (
    <div className={`relative ${className}`}>
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#2A1010] text-[#F5F5F5] rounded-md py-2 px-3 transition-colors duration-300"
      >
        <div className="flex items-center gap-1.5">
          {themes[theme].icon}
          <span className="text-sm hidden sm:inline">{themes[theme].label}</span>
        </div>
        <ChevronDown size={14} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#121212] border border-[#2D0000] rounded-md shadow-lg z-50 overflow-hidden">
          <div className="p-1">
            {Object.entries(themes).map(([key, { icon, label, color }]) => (
              <button
                key={key}
                onClick={() => toggleTheme(key as ThemeType)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-[#F5F5F5] hover:bg-[#950101]/20 transition-colors rounded ${
                  theme === key ? 'bg-[#950101]/20' : ''
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${color}`}>
                  {icon}
                </div>
                <span>{label}</span>
                {theme === key && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-[#FF0000]"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Overlay para cerrar el menú al hacer clic fuera */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      {/* Partículas de fuego (solo en tema "Fuego") */}
      {showParticles && (
        <div className="fixed bottom-0 left-0 w-screen h-24 pointer-events-none z-10">
          {Array.from({ length: 25 }).map((_, index) => (
            <div
              key={index}
              className="absolute bottom-0 rounded-full bg-gradient-to-t from-[#FF0000] to-[#FF9900] opacity-70 animate-float"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 60 + 20}px`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 1}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}