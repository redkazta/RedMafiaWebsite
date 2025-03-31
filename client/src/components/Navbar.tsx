import { useState } from 'react';
import { Link } from 'wouter';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-[#1E1E1E] border-b border-[#950101]">
      <nav className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center mb-4 md:mb-0 group">
          <div className="h-16 w-auto overflow-hidden">
            <img 
              src="/red-mafia-logo.png" 
              alt="Red Mafia" 
              className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </div>
          <div className="ml-3">
            <h1 className="font-['Bebas_Neue',cursive] text-3xl text-[#FF0000] tracking-wider group-hover:text-white transition-colors duration-300">RED MAFIA</h1>
            <p className="text-xs text-[#F5F5F5]/70 italic">Del barrio para el mundo | Guadalajara, MX</p>
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
            <Link href="/contacto" className="bg-[#950101] hover:bg-[#FF0000] transition-colors px-4 py-2 rounded-md text-[#F5F5F5]">
              Contacto
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
