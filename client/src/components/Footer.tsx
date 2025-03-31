import { Link } from 'wouter';
import { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Music, Calendar, Mail, ChevronUp } from 'lucide-react';
import { NeonLine, FireParticles } from './animated';

export default function Footer() {
  const [scrollToTop, setScrollToTop] = useState(false);
  const [isHovering, setIsHovering] = useState({ fb: false, ig: false, tw: false, yt: false });
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="relative bg-[#121212] border-t border-[#2D0000] py-12 px-4 overflow-hidden">
      {/* Efectos decorativos */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF0000]/50 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#FF0000]/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent opacity-40"></div>
      
      {/* Decoración lateral */}
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FF0000]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-0 w-60 h-60 bg-[#FF0000]/3 rounded-full blur-3xl"></div>
      
      {/* Botón flotante para ir arriba */}
      {scrollToTop && (
        <button 
          onClick={handleScrollTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#950101] hover:bg-[#FF0000] text-white flex items-center justify-center z-50 shadow-lg shadow-black/50 transition-all duration-300 hover:transform hover:scale-110 red-mafia-glow group"
        >
          <ChevronUp 
            size={24} 
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 rounded-full bg-[#FF0000]/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      )}
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sección Logo e Info */}
          <div className="relative">
            {/* Decoración superior */}
            <div className="absolute -top-6 -left-6 w-16 h-16">
              <div className="absolute top-0 left-0 w-6 h-1 bg-[#FF0000]"></div>
              <div className="absolute top-0 left-0 w-1 h-6 bg-[#FF0000]"></div>
            </div>
            
            <div className="flex items-center mb-6 relative">
              <div className="h-16 w-auto overflow-hidden red-mafia-glow bg-[#ff0000]/10 p-1 rounded-md border border-[#ff0000]/20 shadow-lg group">
                <img 
                  src="/images/logo-red-mafia.png" 
                  alt="Red Mafia" 
                  className="h-full w-auto object-contain drop-shadow-[0_0_5px_rgba(255,0,0,0.5)] transition-all duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-[#FF0000]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>
              </div>
              <div className="ml-3">
                <h4 className="red-mafia-title text-2xl text-distort">RED MAFIA</h4>
                <p className="text-xs text-[#F5F5F5]/70 uppercase border-l-2 border-[#FF0000]/70 pl-2">Haciendo algo nuevo wey, algo bien</p>
              </div>
            </div>
            
            <p className="text-[#F5F5F5]/70 text-sm mb-6 border-l-2 border-[#FF0000]/20 pl-4 hover:border-[#FF0000]/70 transition-colors duration-300">
              RED MAFIA es una banda de rock alternativo formada en 2015. Con su estilo único y letras profundas, ha conquistado a miles de fanáticos en todo México.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <button 
                className="p-2 bg-[#1A1A1A] hover:bg-[#950101] rounded-full transition-colors duration-300 group relative"
                onMouseEnter={() => setIsHovering({...isHovering, fb: true})}
                onMouseLeave={() => setIsHovering({...isHovering, fb: false})}
              >
                <Facebook size={18} className="text-[#F5F5F5]/70 group-hover:text-white transition-colors" />
                {isHovering.fb && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#950101] text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    Facebook
                  </span>
                )}
              </button>
              
              <button 
                className="p-2 bg-[#1A1A1A] hover:bg-[#950101] rounded-full transition-colors duration-300 group relative"
                onMouseEnter={() => setIsHovering({...isHovering, ig: true})}
                onMouseLeave={() => setIsHovering({...isHovering, ig: false})}
              >
                <Instagram size={18} className="text-[#F5F5F5]/70 group-hover:text-white transition-colors" />
                {isHovering.ig && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#950101] text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    Instagram
                  </span>
                )}
              </button>
              
              <button 
                className="p-2 bg-[#1A1A1A] hover:bg-[#950101] rounded-full transition-colors duration-300 group relative"
                onMouseEnter={() => setIsHovering({...isHovering, tw: true})}
                onMouseLeave={() => setIsHovering({...isHovering, tw: false})}
              >
                <Twitter size={18} className="text-[#F5F5F5]/70 group-hover:text-white transition-colors" />
                {isHovering.tw && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#950101] text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    Twitter
                  </span>
                )}
              </button>
              
              <button 
                className="p-2 bg-[#1A1A1A] hover:bg-[#950101] rounded-full transition-colors duration-300 group relative"
                onMouseEnter={() => setIsHovering({...isHovering, yt: true})}
                onMouseLeave={() => setIsHovering({...isHovering, yt: false})}
              >
                <Youtube size={18} className="text-[#F5F5F5]/70 group-hover:text-white transition-colors" />
                {isHovering.yt && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#950101] text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    YouTube
                  </span>
                )}
              </button>
            </div>
            
            <p className="text-[#F5F5F5]/70 text-sm">
              &copy; {new Date().getFullYear()} Red Mafia. <span className="text-[#FF0000]/80">Todos los derechos reservados.</span>
            </p>
          </div>
          
          {/* Enlaces Rápidos */}
          <div className="relative backdrop-blur-sm rounded-lg p-4 bg-[#0A0A0A]/30">
            <h4 className="red-mafia-title text-xl mb-6 flex items-center">
              <span className="w-6 h-1 bg-[#FF0000] mr-2"></span>
              ENLACES RÁPIDOS
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", text: "Inicio" },
                { href: "/nosotros", text: "Nosotros" },
                { href: "/lanzamientos", text: "Música" },
                { href: "/conciertos", text: "Conciertos" },
                { href: "/noticias", text: "Noticias" },
                { href: "/galeria", text: "Galería" },
                { href: "/tienda", text: "Tienda" },
                { href: "/media-kit", text: "Media Kit" },
                { href: "/contacto", text: "Contacto" }
              ].map((link, index) => (
                <li key={index} className="group">
                  <Link href={link.href} className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors flex items-center">
                    <span className="w-0 h-[1px] bg-[#FF0000] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Tienda Oficial */}
          <div className="relative backdrop-blur-sm rounded-lg p-4 bg-[#0A0A0A]/30">
            <h4 className="red-mafia-title text-xl mb-6 flex items-center">
              <span className="w-6 h-1 bg-[#FF0000] mr-2"></span>
              TIENDA OFICIAL
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/tienda", text: "Todos los Productos" },
                { href: "/tienda#musica", text: "Música" },
                { href: "/tienda#ropa", text: "Camisetas" },
                { href: "/tienda#accesorios", text: "Accesorios" },
                { href: "/tienda#especial", text: "Ediciones Especiales" }
              ].map((link, index) => (
                <li key={index} className="group">
                  <Link href={link.href} className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors flex items-center">
                    <span className="w-0 h-[1px] bg-[#FF0000] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Decoración */}
            <div className="absolute -bottom-3 -right-3 w-16 h-16">
              <div className="absolute bottom-0 right-0 w-6 h-1 bg-[#FF0000]"></div>
              <div className="absolute bottom-0 right-0 w-1 h-6 bg-[#FF0000]"></div>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="relative">
            <h4 className="red-mafia-title text-xl mb-6 flex items-center">
              <span className="w-6 h-1 bg-[#FF0000] mr-2"></span>
              NEWSLETTER
            </h4>
            <p className="text-[#F5F5F5]/70 text-sm mb-4">
              Suscríbete para recibir noticias exclusivas, fechas de conciertos y contenido especial.
            </p>
            <form action="#" method="POST" className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="w-full bg-[#1E1E1E] border border-[#FF0000]/30 focus:border-[#FF0000] rounded py-2 px-3 text-[#F5F5F5] focus:outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(255,0,0,0.3)]"
                />
                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-[calc(100%-10px)] h-[2px] bg-gradient-to-r from-transparent via-[#FF0000]/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#950101] hover:bg-[#FF0000] text-[#F5F5F5] py-2 rounded font-medium transition-all duration-300 relative overflow-hidden group"
              >
                {/* Efecto de onda brillante */}
                <span className="absolute inset-0 w-full h-full flex justify-center">
                  <span className="w-1/3 h-full bg-white/10 skew-x-12 transform -translate-x-full group-hover:animate-shimmer"></span>
                </span>
                <span className="relative z-10 uppercase">Suscribirse</span>
              </button>
            </form>
            
            {/* Bloque de contacto rápido */}
            <div className="mt-8">
              <h5 className="text-[#F5F5F5] mb-4 font-medium">¿Necesitas contactarnos?</h5>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Mail size={16} className="text-[#FF0000] mt-1 mr-2 flex-shrink-0" />
                  <span className="text-[#F5F5F5]/70 text-sm">booking@redmafia.com</span>
                </li>
                <li className="flex items-start">
                  <Music size={16} className="text-[#FF0000] mt-1 mr-2 flex-shrink-0" />
                  <span className="text-[#F5F5F5]/70 text-sm">prensa@redmafia.com</span>
                </li>
                <li className="flex items-start">
                  <Calendar size={16} className="text-[#FF0000] mt-1 mr-2 flex-shrink-0" />
                  <span className="text-[#F5F5F5]/70 text-sm">Guadalajara, México</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Pie del Footer con línea neon */}
        <div className="relative mt-12 pt-8 border-t border-[#1E1E1E] flex flex-col md:flex-row justify-between items-center">
          <NeonLine 
            className="absolute top-0 left-0 w-full" 
            height="1px" 
            color="rgba(255, 0, 0, 0.3)"
            pulse={true}
          />
          
          <p className="text-[#F5F5F5]/60 text-sm mb-4 md:mb-0">
            Diseñado con pasión para <span className="red-mafia-title text-xs animate-pulse">RED MAFIA</span>
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-[#F5F5F5]/60 hover:text-[#FF0000] transition-colors text-sm red-mafia-line">Política de privacidad</a>
            <a href="#" className="text-[#F5F5F5]/60 hover:text-[#FF0000] transition-colors text-sm red-mafia-line">Términos y condiciones</a>
            <a href="#" className="text-[#F5F5F5]/60 hover:text-[#FF0000] transition-colors text-sm red-mafia-line">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
