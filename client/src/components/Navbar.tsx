import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import MobileMenu from './MobileMenu';
import { Equalizer, NeonLine } from './animated';

// Componente para elementos de la navegación
function NavItem({ href, text }: { href: string; text: string }) {
  // Comprobar si el enlace está activo
  const [location] = useLocation();
  const isActive = location === href;
  
  return (
    <li>
      <Link 
        href={href} 
        className={`
          px-3 py-2.5 rounded-md text-[#F5F5F5] transition-all relative flex items-center font-medium group overflow-hidden
          ${isActive ? 'text-white bg-[#950101]/20' : 'hover:text-[#FF0000] hover:bg-[#1E1E1E]'}
        `}
      >
        {/* Línea animada inferior */}
        <span className="relative z-10">{text}</span>
        
        {/* Efecto de subrayado */}
        <span 
          className={`
            absolute bottom-1 left-3 right-3 h-0.5 bg-[#950101] transform transition-transform duration-300
            ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
          `}
        />
        
        {/* Efecto de brillo al hacer hover */}
        <span className="absolute inset-0 bg-[#FF0000]/0 group-hover:bg-[#FF0000]/5 transition-colors duration-500"></span>
        
        {/* Efecto de partículas/destellos - visible solo al hacer hover */}
        {Array.from({ length: 3 }).map((_, index) => (
          <span 
            key={index}
            className="absolute w-1 h-1 rounded-full bg-[#FF0000] opacity-0 group-hover:opacity-100 group-hover:animate-ping"
            style={{ 
              left: `${15 + index * 25}%`, 
              top: `${20 + Math.random() * 60}%`,
              animationDuration: `${0.7 + Math.random() * 1}s`,
              animationDelay: `${index * 0.1}s`
            }}
          />
        ))}
      </Link>
    </li>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto para simular actividad de audio (solo visual)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAudioActive(prev => !prev);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`
      relative bg-black sticky top-0 left-0 right-0 z-50 transition-all duration-500
      ${scrolled ? 'shadow-lg shadow-black/70 border-b border-[#950101]' : 'shadow-md shadow-black/30'}
    `}>
      {/* Efecto de línea superior */}
      <NeonLine 
        className="absolute top-0 left-0 w-full" 
        height="1px" 
        color="rgba(255, 0, 0, 0.7)"
        pulse={true}
      />

      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A0A0A] to-black opacity-70"></div>
      
      {/* Iluminación lateral */}
      <div className={`
        absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-[#950101]/5 to-transparent 
        ${scrolled ? 'opacity-30' : 'opacity-0'} transition-opacity duration-700
      `}></div>
      <div className={`
        absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-[#950101]/5 to-transparent 
        ${scrolled ? 'opacity-30' : 'opacity-0'} transition-opacity duration-700
      `}></div>
      
      <nav className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Logo con efectos mejorados */}
        <Link href="/" className="flex items-center mb-6 md:mb-0 group relative">
          {/* Aureola del logo */}
          <div className="absolute -inset-4 bg-[#FF0000]/5 blur-xl rounded-full group-hover:bg-[#FF0000]/10 transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
          
          <div className="h-16 md:h-20 w-auto overflow-hidden relative">
            <div className="absolute inset-0 bg-[#FF0000]/10 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
            <img 
              src="/assets/logo-red-mafia.png" 
              alt="Red Mafia" 
              className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" 
            />
          </div>
          
          <div className="ml-4 relative">
            {/* Efecto de brillo detrás del texto */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#FF0000]/5 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <h1 className="red-mafia-title text-3xl md:text-4xl tracking-wider group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_2px_rgba(255,0,0,0.5)]">RED MAFIA</h1>
            <div className="flex items-center">
              <p className="text-xs md:text-sm text-[#F5F5F5]/70 italic border-l-2 border-[#FF0000]/60 pl-2 mt-1">HACIENDO ALGO NUEVO WEY, ALGO BIEN</p>
              
              {/* Indicador de audio activo */}
              <div className="ml-2 mt-1 hidden md:block">
                <Equalizer active={isAudioActive} width={30} height={12} barCount={4} />
              </div>
            </div>
          </div>
        </Link>
        
        {/* Menú de navegación para móvil */}
        <div className="md:hidden w-full mb-3">
          <button 
            className="w-full bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#D10000] py-3 rounded-md font-medium text-white flex items-center justify-center red-mafia-glow relative overflow-hidden group"
            onClick={toggleMobileMenu}
          >
            {/* Efecto de onda al hacer click */}
            <span className="absolute inset-0 w-full h-full flex justify-center">
              <span className="w-1/3 h-full bg-white/10 skew-x-12 transform -translate-x-full group-hover:animate-shimmer"></span>
            </span>
            
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="relative z-10">Menú</span>
          </button>
          
          <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </div>
        
        {/* Menú de navegación para desktop */}
        <div className="hidden md:block relative">
          {/* Efecto de brillo en el fondo del menú */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#FF0000]/0 via-[#FF0000]/5 to-[#FF0000]/0 blur-lg opacity-30 rounded-full"></div>
          
          {/* Contenedor del menú con efecto de vidrio */}
          <div className={`
            p-1 rounded-lg backdrop-blur-sm transition-all duration-300
            ${scrolled ? 'bg-black/30' : 'bg-transparent'}
          `}>
            <ul className="flex space-x-1 items-center">
              <NavItem href="/" text="Inicio" />
              <NavItem href="/nosotros" text="Nosotros" />
              <NavItem href="/lanzamientos" text="Música" />
              <NavItem href="/conciertos" text="Conciertos" />
              <NavItem href="/noticias" text="Noticias" />
              <NavItem href="/galeria" text="Galería" />
              <NavItem href="/tienda" text="Tienda" />
              <NavItem href="/media-kit" text="Media Kit" />
              
              {/* Menú desplegable para Comunidad */}
              <li className="relative group">
                <button className="px-3 py-2.5 rounded-md text-[#F5F5F5] transition-all relative flex items-center font-medium group overflow-hidden hover:text-[#FF0000] hover:bg-[#1E1E1E]">
                  <span className="relative z-10 flex items-center">
                    Comunidad
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:rotate-180" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  
                  {/* Efecto de subrayado */}
                  <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#950101] transform transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
                  
                  {/* Efecto de brillo al hacer hover */}
                  <span className="absolute inset-0 bg-[#FF0000]/0 group-hover:bg-[#FF0000]/5 transition-colors duration-500"></span>
                </button>
                
                {/* Menú desplegable */}
                <div className="absolute left-0 top-full mt-1 w-48 bg-black/95 backdrop-blur-sm border border-[#950101]/60 shadow-xl rounded-md overflow-hidden transform scale-y-0 opacity-0 origin-top group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-300 z-50">
                  <ul className="py-1 divide-y divide-[#950101]/20">
                    <li>
                      <Link 
                        href="/familia" 
                        className="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-[#950101]/50 transition-colors duration-300"
                      >
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          La Familia
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/disena-merch" 
                        className="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-[#950101]/50 transition-colors duration-300"
                      >
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Diseña Merch
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/bloodline" 
                        className="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-[#950101]/50 transition-colors duration-300"
                      >
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          Bloodline
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/challenges" 
                        className="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-[#950101]/50 transition-colors duration-300"
                      >
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                          </svg>
                          Red Challenges
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link 
                  href="/contacto" 
                  className="relative bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#D10000] transition-all duration-300 px-5 py-2.5 rounded-md text-white font-medium red-mafia-glow flex items-center overflow-hidden group"
                >
                  {/* Efecto de partículas dentro del botón */}
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i}
                      className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100"
                      style={{ 
                        top: `${Math.random() * 100}%`, 
                        left: `${Math.random() * 100}%`,
                        boxShadow: '0 0 3px 1px rgba(255,255,255,0.5)',
                        animation: `sparkle ${1 + Math.random() * 2}s linear infinite`
                      }}
                    />
                  ))}
                  
                  {/* Onda animada */}
                  <span className="absolute inset-0 w-full h-full flex justify-center">
                    <span className="w-1/3 h-full bg-white/10 skew-x-12 transform -translate-x-full group-hover:animate-shimmer"></span>
                  </span>
                  
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="relative z-10">Contacto</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
