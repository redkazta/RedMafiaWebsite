import { useState } from 'react';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, Music, HeartHandshake, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function About() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  
  const bandMembers = [
    {
      id: 1,
      name: 'Carlos Vega',
      role: 'Vocalista / Guitarrista',
      bio: 'Fundador de RED MAFIA, Carlos es la fuerza creativa detrás de las letras y melodías que definen el sonido único de la banda.',
      image: 'https://images.unsplash.com/photo-1520485552638-f2bddee77e6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      name: 'Miguel Ángel Durán',
      role: 'Baterista',
      bio: 'El pulso rítmico de RED MAFIA, Miguel aporta la energía y precisión que caracteriza a cada presentación en vivo.',
      image: 'https://images.unsplash.com/photo-1514804475078-57f15fcf5852?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      name: 'Lucía Martínez',
      role: 'Bajista',
      bio: 'Con su estilo único y personalidad intensa, Lucía ha revolucionado el concepto del bajo dentro del rock alternativo mexicano.',
      image: 'https://images.unsplash.com/photo-1559516903-0db746318360?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 4,
      name: 'Roberto Sánchez',
      role: 'Guitarrista',
      bio: 'Los riffs distintivos y solos explosivos de Roberto dan a RED MAFIA ese toque único que los destaca en la escena musical.',
      image: 'https://images.unsplash.com/photo-1534385842125-8c9ad0bd123c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ];
  
  const milestones = [
    {
      year: '2015',
      title: 'Formación de RED MAFIA',
      description: 'Nacida en las calles de Guadalajara, RED MAFIA comenzó como un proyecto experimental entre amigos universitarios.'
    },
    {
      year: '2016',
      title: 'Primer EP: "Iniciación"',
      description: 'El lanzamiento que marcó su entrada en la escena underground mexicana, con 5 temas que definieron su estilo inicial.'
    },
    {
      year: '2018',
      title: 'Álbum debut: "SANGRE Y FUEGO"',
      description: 'Su primer álbum completo catapultó a la banda a la fama nacional, destacando sencillos como "Noche Eterna" y "El Ritual".'
    },
    {
      year: '2020',
      title: 'Gira Nacional',
      description: 'RED MAFIA conquistó los principales escenarios de México en una gira de 20 ciudades que consolidó su base de fans.'
    },
    {
      year: '2022',
      title: 'Colaboraciones Internacionales',
      description: 'La banda expandió fronteras colaborando con artistas de Argentina, España y Estados Unidos, fusionando estilos diversos.'
    },
    {
      year: '2023',
      title: 'Nueva Era: "RENACIMIENTO"',
      description: 'El lanzamiento de su segundo álbum marcó una evolución en su sonido, incorporando elementos electrónicos y experimentales.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1471565661762-b9dfae862dbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" 
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF0000] to-transparent z-20"></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl red-mafia-title mb-6">
              SOBRE RED MAFIA
            </h1>
            <div className="h-1 w-20 bg-[#FF0000] mx-auto mb-8"></div>
            <p className="text-[#F5F5F5] text-xl leading-relaxed mb-8">
              Más que una banda, somos un movimiento. Nacida en las calles de Guadalajara en 2015, RED MAFIA fusiona 
              el rock alternativo con elementos de música urbana, creando un estilo único que ha revolucionado 
              la escena musical mexicana. Nuestras letras hablan de experiencias reales, luchas personales, 
              y la realidad social que nos rodea.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/contacto" 
                className="bg-[#950101] hover:bg-[#FF0000] transition-colors px-6 py-3 rounded-md text-[#F5F5F5] inline-flex items-center font-medium red-mafia-glow"
              >
                <HeartHandshake size={18} className="mr-2" />
                Contactar
              </Link>
              <Link 
                href="/conciertos" 
                className="bg-transparent border-2 border-[#950101] hover:border-[#FF0000] hover:text-[#FF0000] transition-colors px-6 py-3 rounded-md text-[#F5F5F5] inline-flex items-center font-medium"
              >
                <MapPin size={18} className="mr-2" />
                Ver Próximos Shows
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Band Members Section */}
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl red-mafia-title mb-4">
              INTEGRANTES
            </h2>
            <div className="h-1 w-20 bg-[#FF0000] mb-8"></div>
            <p className="text-[#F5F5F5]/80 text-lg text-center max-w-3xl">
              Conozca a las mentes creativas detrás de RED MAFIA. Un colectivo de músicos apasionados 
              que desafían los límites y fusionan estilos para crear algo verdaderamente único.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bandMembers.map((member) => (
              <div 
                key={member.id} 
                className="relative overflow-hidden rounded-lg group"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="aspect-square">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-1 relative">
                    {member.name}
                    <span 
                      className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF0000] transition-all duration-500 ease-in-out"
                      style={{
                        width: hoveredMember === member.id ? '100%' : '0'
                      }}
                    ></span>
                  </h3>
                  <p className="text-[#FF0000] font-medium mb-2">{member.role}</p>
                  <p 
                    className="text-[#F5F5F5]/80 text-sm overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: hoveredMember === member.id ? '100px' : '0',
                      opacity: hoveredMember === member.id ? 1 : 0
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Journey Section */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl red-mafia-title mb-4">
              NUESTRA TRAYECTORIA
            </h2>
            <div className="h-1 w-20 bg-[#FF0000] mb-8"></div>
            <p className="text-[#F5F5F5]/80 text-lg text-center max-w-3xl">
              Desde nuestros humildes comienzos en la escena underground hasta conquistar 
              los principales escenarios, este ha sido nuestro camino.
            </p>
          </div>
          
          <div className="relative border-l-2 border-[#FF0000]/30 pl-8 ml-4 md:ml-[calc(50%-2px)] md:pl-0">
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.year} 
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:mr-[calc(50%+2rem)]' : 'md:ml-[calc(50%+2rem)] md:left-[-100%]'
                }`}
              >
                <div 
                  className="absolute top-0 left-0 w-4 h-4 rounded-full bg-[#FF0000] transform -translate-x-[calc(0.5rem+2px)] md:translate-x-[calc(50vw-0.5rem-1px)]"
                ></div>
                <div className="bg-[#1E1E1E] border border-[#950101]/30 rounded-lg p-6 hover:border-[#FF0000] transition-colors duration-300 hover:shadow-md hover:shadow-[#FF0000]/10">
                  <span className="text-[#FF0000] text-lg font-bold">{milestone.year}</span>
                  <h3 className="text-[#F5F5F5] text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-[#F5F5F5]/70">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Philosophy & Vision Section */}
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl red-mafia-title mb-6">
                FILOSOFÍA Y VISIÓN
              </h2>
              <div className="h-1 w-20 bg-[#FF0000] mb-8"></div>
              
              <div className="space-y-6 text-[#F5F5F5]">
                <p className="text-lg leading-relaxed">
                  <span className="text-[#FF0000] font-bold">RED MAFIA</span> no es solo una banda, sino un movimiento cultural que busca 
                  romper barreras y desafiar convenciones.
                </p>
                <p className="text-lg leading-relaxed">
                  Nuestro lema <span className="font-bold italic">"HACIENDO ALGO NUEVO WEY, ALGO BIEN"</span> refleja nuestra 
                  constante búsqueda de innovación y autenticidad en cada nota y letra que creamos.
                </p>
                <p className="text-lg leading-relaxed">
                  Creemos en el poder transformador de la música, en su capacidad para conectar personas y 
                  construir comunidades. Cada canción es una historia, cada concierto una experiencia compartida.
                </p>
                <p className="text-lg leading-relaxed">
                  Mirando hacia el futuro, RED MAFIA seguirá explorando nuevos horizontes musicales, 
                  colaborando con artistas de diferentes géneros y llevando su mensaje a audiencias globales.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#950101]">
                <img 
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                  alt="RED MAFIA en el estudio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 aspect-square rounded-lg overflow-hidden border-2 border-[#950101] z-10">
                <img 
                  src="https://images.unsplash.com/photo-1501981344098-47d40755d473?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="RED MAFIA en concierto"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-3 -left-3 h-full w-full border-2 border-[#FF0000] rounded-lg z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Media Section */}
      <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-[#FF0000]/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF0000]/10 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl red-mafia-title mb-4">
              SÍGUENOS
            </h2>
            <div className="h-1 w-20 bg-[#FF0000] mb-8"></div>
            <p className="text-[#F5F5F5]/80 text-lg text-center max-w-3xl">
              Mantente conectado con nosotros y sé el primero en conocer nuestras novedades, 
              lanzamientos y fechas de conciertos.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <a 
              href="#" 
              className="bg-[#121212] hover:bg-[#950101]/20 border border-[#950101]/30 hover:border-[#FF0000] rounded-lg p-8 flex flex-col items-center justify-center text-center transition-all duration-300 group"
            >
              <Instagram 
                size={48} 
                className="text-[#F5F5F5] group-hover:text-[#FF0000] transition-colors duration-300 mb-4" 
              />
              <span className="text-[#F5F5F5] font-bold">Instagram</span>
              <span className="text-[#F5F5F5]/50 text-sm">@redmafia.oficial</span>
            </a>
            
            <a 
              href="#" 
              className="bg-[#121212] hover:bg-[#950101]/20 border border-[#950101]/30 hover:border-[#FF0000] rounded-lg p-8 flex flex-col items-center justify-center text-center transition-all duration-300 group"
            >
              <Facebook 
                size={48} 
                className="text-[#F5F5F5] group-hover:text-[#FF0000] transition-colors duration-300 mb-4" 
              />
              <span className="text-[#F5F5F5] font-bold">Facebook</span>
              <span className="text-[#F5F5F5]/50 text-sm">/redmafia</span>
            </a>
            
            <a 
              href="#" 
              className="bg-[#121212] hover:bg-[#950101]/20 border border-[#950101]/30 hover:border-[#FF0000] rounded-lg p-8 flex flex-col items-center justify-center text-center transition-all duration-300 group"
            >
              <Twitter 
                size={48} 
                className="text-[#F5F5F5] group-hover:text-[#FF0000] transition-colors duration-300 mb-4" 
              />
              <span className="text-[#F5F5F5] font-bold">Twitter</span>
              <span className="text-[#F5F5F5]/50 text-sm">@redmafia</span>
            </a>
            
            <a 
              href="#" 
              className="bg-[#121212] hover:bg-[#950101]/20 border border-[#950101]/30 hover:border-[#FF0000] rounded-lg p-8 flex flex-col items-center justify-center text-center transition-all duration-300 group"
            >
              <Youtube 
                size={48} 
                className="text-[#F5F5F5] group-hover:text-[#FF0000] transition-colors duration-300 mb-4" 
              />
              <span className="text-[#F5F5F5] font-bold">YouTube</span>
              <span className="text-[#F5F5F5]/50 text-sm">/redmafiaoficial</span>
            </a>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-[#950101] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            ¿QUIERES SER PARTE DE LA MAFIA?
          </h2>
          <p className="text-white/90 text-xl mx-auto max-w-2xl mb-8">
            Únete a nuestro newsletter para recibir contenido exclusivo, acceso anticipado a boletos y mercancía limitada.
          </p>
          <form className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-grow bg-white/10 border border-white/30 text-white placeholder:text-white/50 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="bg-white text-[#950101] hover:bg-[#F5F5F5] px-6 py-3 rounded-md font-bold transition-colors"
            >
              SUSCRIBIRSE
            </button>
          </form>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}