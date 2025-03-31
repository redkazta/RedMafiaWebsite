import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-[#121212] border-t border-[#2D0000] py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-[#FF0000] flex items-center justify-center rounded">
                <span className="font-['Bebas_Neue',cursive] text-xl text-[#F5F5F5]">RM</span>
              </div>
              <h4 className="ml-3 font-['Bebas_Neue',cursive] text-2xl text-[#FF0000]">RED MAFIA</h4>
            </div>
            <p className="text-[#F5F5F5]/70 text-sm mb-6">
              RED MAFIA es una banda de rock alternativo formada en 2015. Con su estilo único y letras profundas, ha conquistado a miles de fanáticos en todo México.
            </p>
            <p className="text-[#F5F5F5]/70 text-sm">
              &copy; {new Date().getFullYear()} Red Mafia. Todos los derechos reservados.
            </p>
          </div>
          
          <div>
            <h4 className="font-['Bebas_Neue',cursive] text-xl text-[#F5F5F5] mb-6">ENLACES RÁPIDOS</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Inicio</Link></li>
              <li><Link href="/lanzamientos" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Música</Link></li>
              <li><Link href="/conciertos" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Conciertos</Link></li>
              <li><Link href="/noticias" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Noticias</Link></li>
              <li><Link href="/galeria" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Galería</Link></li>
              <li><Link href="/contacto" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Contacto</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-['Bebas_Neue',cursive] text-xl text-[#F5F5F5] mb-6">TIENDA OFICIAL</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Música</a></li>
              <li><a href="#" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Merchandising</a></li>
              <li><a href="#" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Ediciones especiales</a></li>
              <li><a href="#" className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors">Envíos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-['Bebas_Neue',cursive] text-xl text-[#F5F5F5] mb-6">NEWSLETTER</h4>
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
