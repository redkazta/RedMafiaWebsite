import { useState } from 'react';
import { Link } from 'wouter';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-[#950101] sticky top-0 left-0 right-0 z-50 shadow-lg shadow-black/40">
      <nav className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center mb-4 md:mb-0 group">
          <div className="h-16 w-auto overflow-hidden bg-[#ff0000]/10 p-1 rounded-md border border-[#ff0000]/20 shadow-lg">
            <img 
              src="/red-mafia-logo.png" 
              alt="Red Mafia" 
              className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]" 
            />
          </div>
          <div className="ml-3">
            <h1 className="red-mafia-title text-3xl tracking-wider group-hover:text-white transition-colors duration-300">RED MAFIA</h1>
            <p className="text-xs text-[#F5F5F5]/70 italic">HACIENDO ALGO NUEVO WEY, ALGO BIEN</p>
          </div>
        </Link>
        
        {/* Menú de navegación para móvil */}
        <div className="md:hidden w-full mb-3">
          <button 
            className="w-full bg-[#2D0000] py-2 rounded font-medium text-[#F5F5F5] flex items-center justify-center"
            onClick={toggleMobileMenu}
          >
            <span className="material-icons mr-2">menu</span> Menú
          </button>
          
          <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </div>
        
        {/* Menú de navegación para desktop */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link href="/" className="nav-link text-[#F5F5F5] hover:text-[#FF0000] transition-colors relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-3px] after:left-0 after:bg-[#D10000] after:transition-[width] after:duration-300 hover:after:w-full">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/lanzamientos" className="nav-link text-[#F5F5F5] hover:text-[#FF0000] transition-colors relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-3px] after:left-0 after:bg-[#D10000] after:transition-[width] after:duration-300 hover:after:w-full">
              Lanzamientos
            </Link>
          </li>
          <li>
            <Link href="/conciertos" className="nav-link text-[#F5F5F5] hover:text-[#FF0000] transition-colors relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-3px] after:left-0 after:bg-[#D10000] after:transition-[width] after:duration-300 hover:after:w-full">
              Presentaciones
            </Link>
          </li>
          <li>
            <Link href="/noticias" className="nav-link text-[#F5F5F5] hover:text-[#FF0000] transition-colors relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-3px] after:left-0 after:bg-[#D10000] after:transition-[width] after:duration-300 hover:after:w-full">
              Noticias
            </Link>
          </li>
          <li>
            <Link href="/galeria" className="nav-link text-[#F5F5F5] hover:text-[#FF0000] transition-colors relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-3px] after:left-0 after:bg-[#D10000] after:transition-[width] after:duration-300 hover:after:w-full">
              Galería
            </Link>
          </li>
          <li>
            <Link href="/contacto" className="bg-[#950101] hover:bg-[#FF0000] transition-colors px-4 py-2 rounded-md text-[#F5F5F5] red-mafia-glow">
              Contacto
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
