import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-[#121212] border-t border-[#2D0000] py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="h-14 w-auto overflow-hidden red-mafia-glow bg-[#ff0000]/10 p-1 rounded-md border border-[#ff0000]/20 shadow-lg">
                <img 
                  src="/red-mafia-logo.png" 
                  alt="Red Mafia" 
                  className="h-full w-auto object-contain drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]" 
                />
              </div>
              <div className="ml-3">
                <h4 className="red-mafia-title text-2xl">RED MAFIA</h4>
                <p className="text-xs text-[#F5F5F5]/70 uppercase">Haciendo algo nuevo wey, algo bien</p>
              </div>
            </div>
            <p className="text-[#F5F5F5]/70 text-sm mb-6">
              RED MAFIA es una banda de rock alternativo formada en 2015. Con su estilo único y letras profundas, ha conquistado a miles de fanáticos en todo México.
            </p>
            <p className="text-[#F5F5F5]/70 text-sm">
              &copy; {new Date().getFullYear()} Red Mafia. Todos los derechos reservados.
            </p>
          </div>
          
          <div>
            <h4 className="red-mafia-title text-xl mb-6">ENLACES RÁPIDOS</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Inicio</Link></li>
              <li><Link href="/nosotros" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Nosotros</Link></li>
              <li><Link href="/lanzamientos" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Música</Link></li>
              <li><Link href="/conciertos" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Conciertos</Link></li>
              <li><Link href="/noticias" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Noticias</Link></li>
              <li><Link href="/galeria" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Galería</Link></li>
              <li><Link href="/tienda" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Tienda</Link></li>
              <li><Link href="/media-kit" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Media Kit</Link></li>
              <li><Link href="/contacto" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Contacto</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="red-mafia-title text-xl mb-6">TIENDA OFICIAL</h4>
            <ul className="space-y-3">
              <li><Link href="/tienda" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Todos los Productos</Link></li>
              <li><Link href="/tienda#productos" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Música</Link></li>
              <li><Link href="/tienda#productos" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Camisetas</Link></li>
              <li><Link href="/tienda#productos" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Accesorios</Link></li>
              <li><Link href="/tienda#productos" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Ediciones Especiales</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="red-mafia-title text-xl mb-6">NEWSLETTER</h4>
            <p className="text-[#F5F5F5]/70 text-sm mb-4">
              Suscríbete para recibir noticias exclusivas, fechas de conciertos y contenido especial.
            </p>
            <form action="#" method="POST" className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="w-full bg-[#1E1E1E] border border-[#FF0000]/30 focus:border-[#FF0000] rounded py-2 px-3 text-[#F5F5F5] focus:outline-none"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#950101] hover:bg-[#FF0000] text-[#F5F5F5] py-2 rounded font-medium transition-colors"
              >
                SUSCRIBIRSE
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#1E1E1E] flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#F5F5F5]/60 text-sm mb-4 md:mb-0">
            Diseñado con pasión para RED MAFIA
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-[#F5F5F5]/60 hover:text-[#FF0000] transition-colors text-sm">Política de privacidad</a>
            <a href="#" className="text-[#F5F5F5]/60 hover:text-[#FF0000] transition-colors text-sm">Términos y condiciones</a>
            <a href="#" className="text-[#F5F5F5]/60 hover:text-[#FF0000] transition-colors text-sm">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
