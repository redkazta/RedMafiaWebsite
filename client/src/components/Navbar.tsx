import { useState } from 'react';
import { Link } from 'wouter';
import MobileMenu from './MobileMenu';

// Componente para elementos de la navegación
function NavItem({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link 
        href={href} 
        className="px-3 py-2.5 rounded-md text-[#F5F5F5] hover:text-[#FF0000] hover:bg-[#1E1E1E] transition-all relative flex items-center font-medium group"
      >
        <span className="relative z-10">{text}</span>
        <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#950101] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
      </Link>
    </li>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-black border-b border-[#950101] sticky top-0 left-0 right-0 z-50 shadow-lg shadow-black/40">
      <nav className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center mb-6 md:mb-0 group">
          <div className="h-20 md:h-24 w-auto overflow-hidden">
            <img 
              src="/images/logo-red-mafia.png" 
              alt="Red Mafia" 
              className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" 
            />
          </div>
          <div className="ml-4">
            <h1 className="red-mafia-title text-4xl tracking-wider group-hover:text-white transition-colors duration-300">RED MAFIA</h1>
            <p className="text-sm text-[#F5F5F5]/70 italic border-l-2 border-[#FF0000]/60 pl-2 mt-1">HACIENDO ALGO NUEVO WEY, ALGO BIEN</p>
          </div>
        </Link>
        
        {/* Menú de navegación para móvil */}
        <div className="md:hidden w-full mb-3">
          <button 
            className="w-full bg-gradient-to-r from-[#950101] to-[#FF0000] py-3 rounded-md font-medium text-white flex items-center justify-center red-mafia-glow"
            onClick={toggleMobileMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Menú
          </button>
          
          <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </div>
        
        {/* Menú de navegación para desktop */}
        <div className="hidden md:block">
          <ul className="flex space-x-2 items-center">
            <NavItem href="/" text="Inicio" />
            <NavItem href="/nosotros" text="Nosotros" />
            <NavItem href="/lanzamientos" text="Música" />
            <NavItem href="/conciertos" text="Conciertos" />
            <NavItem href="/noticias" text="Noticias" />
            <NavItem href="/galeria" text="Galería" />
            <NavItem href="/tienda" text="Tienda" />
            <NavItem href="/media-kit" text="Media Kit" />
            <li>
              <Link 
                href="/contacto" 
                className="bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#D10000] transition-all duration-300 px-5 py-2.5 rounded-md text-white font-medium red-mafia-glow flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
