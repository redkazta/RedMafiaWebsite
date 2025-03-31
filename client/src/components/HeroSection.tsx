export default function HeroSection() {
  return (
    <section id="inicio" className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212] z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
        alt="Red Mafia en concierto" 
        className="w-full h-[60vh] md:h-[70vh] object-cover object-center"
      />
      
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center px-4">
          <h2 className="font-['Bebas_Neue',cursive] text-5xl md:text-7xl lg:text-8xl text-[#F5F5F5] mb-4 tracking-wider drop-shadow-lg">RED MAFIA</h2>
          <p className="text-xl md:text-2xl text-[#F5F5F5]/90 max-w-3xl mx-auto drop-shadow-lg mb-8">
            Nuevo álbum "Sangre y Fuego" disponible ahora
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <a href="#" className="bg-[#FF0000] hover:bg-[#D10000] text-[#F5F5F5] px-8 py-3 rounded-md font-medium transition-colors shadow-lg">
              ESCUCHAR AHORA
            </a>
            <a href="#lanzamientos" className="border-2 border-[#F5F5F5] hover:border-[#FF0000] hover:text-[#FF0000] text-[#F5F5F5] px-8 py-3 rounded-md font-medium transition-colors shadow-lg">
              VER LANZAMIENTOS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
