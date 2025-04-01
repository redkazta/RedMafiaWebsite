import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Release, News, Concert, GalleryItem } from "@shared/schema";
import { ChevronRight, Calendar, MapPin, Music, Camera, Newspaper, Mail, Info, Play, Disc, Flame } from "lucide-react";

// Componentes importados
import SpotifyPlayer from "@/components/SpotifyPlayer";

// Componentes animados
import { FireParticles, Equalizer, NeonLine, BloodCorner } from "@/components/animated";

export default function Home() {
  // Referencias para animaciones y efectos
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeAudio, setActiveAudio] = useState<boolean>(false);
  const [animateFireParticles, setAnimateFireParticles] = useState<boolean>(true);

  // Ajustar reproductor cuando se hace scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 400; // Umbral para activar efectos de sonido

      if (scrollY > threshold && !activeAudio) {
        setActiveAudio(true);
      } else if (scrollY < threshold && activeAudio) {
        setActiveAudio(false);
      }

      // Reducir las partículas en scroll para mejor rendimiento
      setAnimateFireParticles(scrollY < 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeAudio]);

  // Datos de la API
  const { data: releases } = useQuery<Release[]>({
    queryKey: ['/api/releases'],
  });

  const { data: concerts } = useQuery<Concert[]>({
    queryKey: ['/api/concerts'],
  });

  const { data: news } = useQuery<News[]>({
    queryKey: ['/api/news'],
  });

  const { data: gallery } = useQuery<GalleryItem[]>({
    queryKey: ['/api/gallery'],
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      {/* Efectos visuales */}
      {animateFireParticles && (
        <FireParticles 
          className="fixed left-0 bottom-0 h-[400px] w-screen" 
          intensity={5}
          particleCount={30}
          active={true}
          width={window.innerWidth}
          height={400}
        />
      )}

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-black text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-40"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" 
          }}
        ></div>
        <div className="absolute inset-0 bg-black/70 z-5"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>

        {/* Elementos decorativos para añadir estilo */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#FF0000]/10 rounded-full filter blur-3xl z-5"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#FF0000]/5 rounded-full filter blur-3xl z-5"></div>

        {/* Efecto de líneas rojas */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF0000] to-transparent z-10"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1 bg-gradient-to-l from-[#FF0000] to-transparent z-10"></div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl red-mafia-title mb-4 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
              RED MAFIA
            </h1>
            <div className="border-l-4 border-[#FF0000] pl-4 mb-8 bg-black/30 p-4 backdrop-blur-sm rounded-r-md red-mafia-glow">
              <p className="text-xl md:text-2xl text-[#F5F5F5] font-bold uppercase">
                HACIENDO ALGO NUEVO WEY, ALGO BIEN
              </p>
              <p className="text-lg md:text-xl text-[#F5F5F5]/80 italic">
                Guadalajara, México | La nueva evolución
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/lanzamientos" className="bg-[#950101] hover:bg-[#FF0000] transition-colors px-6 py-3 rounded-md text-[#F5F5F5] inline-flex items-center font-medium red-mafia-glow">
                <Music size={18} className="mr-2" />
                Nuestra Música
              </Link>
              <Link href="/conciertos" className="relative group bg-transparent border-2 border-[#950101] hover:border-[#FF0000] hover:text-[#FF0000] transition-all duration-300 px-6 py-3 rounded-md text-[#F5F5F5] inline-flex items-center font-medium overflow-hidden">
                <span className="absolute top-0 left-0 w-0 h-full bg-[#950101]/20 group-hover:w-full transition-all duration-700 -z-10"></span>
                <Calendar size={18} className="mr-2 transform group-hover:scale-110 transition-transform duration-300" />
                Próximos Shows
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Release Section */}
      <section className="py-16 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl red-mafia-title">
              ÚLTIMO LANZAMIENTO
            </h2>
            <Link href="/lanzamientos" className="text-[#F5F5F5] hover:text-[#FF0000] transition-colors inline-flex items-center">
              Ver todos <ChevronRight size={18} />
            </Link>
          </div>

          {releases && releases.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
              {/* Album art with animated glow effect */}
              <div className="relative group p-4">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/0 via-[#FF0000]/10 to-[#FF0000]/0 animate-pulse"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF0000]/10 -z-10 blur-3xl rounded-full animate-pulse"></div>

                <div className="relative overflow-hidden rounded-lg transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(255,0,0,0.3)] transform group-hover:scale-[1.02]">
                  <img 
                    src={releases[0].coverImage} 
                    alt={releases[0].title}
                    className="w-full h-auto rounded-lg shadow-lg transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 flex items-center space-x-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Play size={20} className="text-[#FF0000] ml-0.5" />
                      </div>
                      <span className="text-white font-medium">Reproducir</span>
                    </div>
                  </div>

                  {/* Vinyl decoration */}
                  <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-40 h-40 bg-black rounded-full transition-transform duration-700 group-hover:translate-x-[calc(-100%+60px)]">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#555] rounded-full">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#333] rounded-full"></div>
                    </div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-[#333]/20 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 text-[#F5F5F5]/50 text-sm mb-2">
                    <Music size={14} />
                    <span>ÚLTIMO LANZAMIENTO</span>
                  </div>
                  <h3 className="text-5xl font-bold text-[#FF0000] mb-4 red-mafia-title">ALV LAS FRESAS</h3>
                  <div className="flex items-center gap-4 text-[#F5F5F5]/70 mb-6 text-sm">
                    <span className="bg-[#2A0A0A] px-3 py-1 rounded-full">Sencillo</span>
                    <span>•</span>
                    <span>2024</span>
                    <span>•</span>
                    <span>1 pista</span>
                  </div>
                  <p className="text-[#F5F5F5] text-lg leading-relaxed mb-8 border-l-2 border-[#950101] pl-4">
                    El nuevo sencillo de Zackly - ALV LAS FRESAS, disponible ahora en todas las plataformas.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link 
                    href={`/lanzamientos/${releases[0].id}`} 
                    className="group bg-[#950101] hover:bg-[#FF0000] transition-all duration-300 px-6 py-3 rounded-md text-[#F5F5F5] inline-flex items-center font-medium red-mafia-glow"
                  >
                    <Play size={18} className="mr-2 transform group-hover:scale-110 transition-transform" />
                    Escuchar Ahora
                  </Link>

                  <Link 
                    href="/lanzamientos" 
                    className="group bg-transparent border border-[#950101] hover:border-[#FF0000] transition-all duration-300 px-6 py-3 rounded-md text-[#F5F5F5] hover:text-[#FF0000] inline-flex items-center font-medium"
                  >
                    <Disc size={18} className="mr-2 transform group-hover:rotate-45 transition-transform duration-700" />
                    Ver Discografía
                  </Link>
                </div>

                {/* Sound wave decoration */}
                <div className="h-10 flex items-end space-x-1 opacity-40">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <div 
                      key={index} 
                      className="w-1 bg-[#FF0000] rounded-t-md"
                      style={{ 
                        height: `${Math.sin(index * 0.5) * 50 + 50}%`,
                        animationName: 'soundwave',
                        animationDuration: `${1 + Math.random() * 2}s`,
                        animationDelay: `${Math.random() * 0.5}s`,
                        animationIterationCount: 'infinite'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Spotify Player Section */}
      <section className="py-16 bg-[#0A0A0A] relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF0000]/50 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1 bg-gradient-to-l from-[#FF0000]/50 to-transparent"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#FF0000]/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-[#FF0000]/5 rounded-full filter blur-3xl"></div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <div className="flex items-center gap-2 text-[#F5F5F5]/50 text-sm mb-2">
                <Music size={14} />
                <span>ESCÚCHANOS</span>
              </div>
              <h2 className="text-4xl red-mafia-title mb-2">NUESTRA PLAYLIST OFICIAL</h2>
              <p className="text-[#F5F5F5]/70 max-w-2xl">
                Disfruta de nuestra selección de éxitos, canciones favoritas y lanzamientos más recientes. 
                Añádela a tus favoritos para no perderte nada.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <div className="w-full max-w-4xl mx-auto mt-8">
                <SpotifyPlayer
                  trackId="CHANTE2ID"
                  height={80}
                  className="mb-4"
                />
                <div className="grid gap-4">
                  {["ALV LAS FRESAS - Zackly", "CHANTE 2 - Red Lean", "Gargut - Sangre", "Red Lean - Flow Violento"].map((song, index) => (
                    <div key={index} 
                      className="bg-[#950101]/10 p-4 rounded-lg border border-[#950101]/30 hover:border-[#950101] transition-all group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#950101]/0 via-[#950101]/5 to-[#950101]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#950101]/20 rounded-full flex items-center justify-center">
                          <Music className="w-6 h-6 text-[#950101]" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold">{song}</h3>
                          <p className="text-[#F5F5F5]/70 text-sm">RED MAFIA</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <a 
                href="https://open.spotify.com/playlist/3ojUCBn2gpPULJ9U6FjQIB" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-[#1DB954] hover:bg-[#1ED760] transition-all duration-300 px-5 py-2.5 rounded-md text-white inline-flex items-center font-medium mt-6"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.2.317-.667.434-1.021.217-2.799-1.7-6.313-2.082-10.449-1.14-.398.092-.8-.16-.892-.559-.92-.398.16-.8.559-.892 4.54-1.037 8.42-.594 11.586 1.354.353.215.471.691.217 1.02zm1.225-2.726c-.242.391-.775.535-1.166.293-3.209-1.97-8.093-2.538-11.882-1.389-.491.154-1.012-.12-1.166-.611-.153-.491.12-1.013.611-1.166 4.343-1.318 9.745-.682 13.479 1.583.391.241.533.773.293 1.165l-.169.125zm.11-2.835c-.202.331-.65.492-.98.29-.38-.202-.492-.65-.29-.98.2-.331.649-.493.979-.29.38.202.494.649.291.98z" />
                </svg>
                Abrir en Spotify
              </a>
            </div>
          </div>

          <div className="bg-[#0F0F0F] border border-[#950101]/30 rounded-lg shadow-lg p-6 red-mafia-glow">
            <SpotifyPlayer
              playlistId="3ojUCBn2gpPULJ9U6FjQIB"
              height={380}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Upcoming Concerts Section */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl red-mafia-title">
              PRÓXIMAS PRESENTACIONES
            </h2>
            <Link href="/conciertos" className="text-[#F5F5F5] hover:text-[#FF0000] transition-colors inline-flex items-center">
              Ver todas <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concerts?.slice(0, 3).map((concert) => (
              <Link 
                href={`/conciertos#concert-${concert.id}`}
                key={concert.id}
                className="bg-[#1E1E1E] border border-[#950101] hover:border-[#FF0000] rounded-lg overflow-hidden shadow-lg p-6 group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(255,0,0,0.15)]"
              >
                <div className="flex items-center">
                  <div className="bg-[#2D0000] group-hover:bg-[#950101] p-4 rounded-lg text-center mr-4 transition-colors duration-300">
                    <div className="text-3xl font-bold text-[#FF0000] group-hover:text-white transition-colors duration-300">{concert.date}</div>
                    <div className="text-sm text-[#F5F5F5]">{concert.month}</div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#FF0000] mb-1 group-hover:translate-x-1 transition-transform duration-300">{concert.title}</h3>
                    <div className="flex items-center text-[#F5F5F5]/70 text-sm mb-1">
                      <MapPin size={14} className="mr-1 group-hover:text-[#FF0000] transition-colors duration-300" />
                      {concert.venue}
                    </div>
                    <div className="flex items-center text-[#F5F5F5]/70 text-sm">
                      <Calendar size={14} className="mr-1 group-hover:text-[#FF0000] transition-colors duration-300" />
                      Puertas: {concert.doors} | Inicio: {concert.start}
                    </div>
                  </div>
                </div>
                <div className="mt-4 w-full h-[1px] bg-gradient-to-r from-transparent via-[#950101] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex justify-end mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[#F5F5F5]/70 text-xs inline-flex items-center">
                    Ver más <ChevronRight size={12} className="ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl red-mafia-title">
              ÚLTIMAS NOTICIAS
            </h2>
            <Link href="/noticias" className="text-[#F5F5F5] hover:text-[#FF0000] transition-colors inline-flex items-center">
              Ver todas <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news?.slice(0, 3).map((item) => (
              <Link href={`/noticias/${item.id}`} key={item.id} className="group">
                <article className="bg-[#1E1E1E] border border-[#950101] hover:border-[#FF0000] rounded-lg overflow-hidden shadow-lg h-full flex flex-col hover:translate-y-[-5px] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(255,0,0,0.15)]">
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent opacity-50"></div>
                    <div className="absolute top-3 right-3 bg-[#950101] group-hover:bg-[#FF0000] text-white px-3 py-1 text-sm transition-colors duration-300 rounded shadow-md">
                      {item.category}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white/90 text-sm px-2 py-1 rounded backdrop-blur-sm font-medium">
                      {item.date}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-[#FF0000] mb-2 line-clamp-2 group-hover:translate-x-1 transition-transform duration-300">{item.title}</h3>
                    <p className="text-[#F5F5F5]/70 text-sm mb-4 line-clamp-3 flex-grow">{item.content}</p>
                    <div className="flex justify-end">
                      <span className="text-[#F5F5F5]/70 text-xs inline-flex items-center group-hover:text-[#FF0000] transition-colors duration-300">
                        Leer más <ChevronRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl red-mafia-title">
              GALERÍA
            </h2>
            <Link href="/galeria" className="text-[#F5F5F5] hover:text-[#FF0000] transition-colors inline-flex items-center">
              Ver todas <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gallery?.slice(0, 4).map((item, index) => (
              <Link href="/galeria" key={item.id} className={`relative block group overflow-hidden rounded-lg transform transition-all duration-500 ${index % 3 === 0 ? 'md:row-span-2 hover:z-10' : ''}`}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${index % 3 === 0 ? 'h-full' : 'h-56'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-[#FF0000]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-100 scale-150">
                  <div className="bg-black/50 backdrop-blur-sm p-3 rounded-full red-mafia-glow">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-black/70 backdrop-blur-sm p-2 rounded-md">
                    <h3 className="text-white text-sm truncate font-medium">{item.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link 
              href="/galeria" 
              className="relative group border-2 border-[#950101] hover:border-[#FF0000] text-[#F5F5F5] hover:text-[#FF0000] px-6 py-3 rounded-md font-medium overflow-hidden transition-all duration-300 inline-flex items-center"
            >
              <span className="absolute top-0 left-0 w-0 h-full bg-[#950101]/10 group-hover:w-full transition-all duration-700 -z-10"></span>
              <Camera size={18} className="mr-2 transition-transform duration-300 group-hover:scale-110" />
              Explora Nuestra Galería Completa
              <ChevronRight size={18} className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-28 bg-gradient-to-r from-[#950101] to-[#FF0000] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485579149621-3123dd979885?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20 mix-blend-multiply"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-36 h-36 bg-black opacity-10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-black opacity-10 rounded-full transform translate-x-1/3 translate-y-1/3"></div>

        {/* Sound wave decoration */}
        <div className="absolute left-0 right-0 bottom-0 h-20 flex items-end justify-center space-x-1 opacity-20">
          {Array.from({ length: 40 }).map((_, index) => (
            <div 
              key={index} 
              className="w-1 bg-white rounded-t-md animate-pulse"
              style={{ 
                height: `${Math.sin(index * 0.5) * 30 + 40}%`,
                animationDuration: `${1 + Math.random() * 2}s`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="mb-12 flex justify-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full">
              <span className="text-white/90 font-medium tracking-wide">RED MAFIA • COMUNIDAD • CONTACTO</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] red-mafia-title">
            ¿QUIERES CONTACTARNOS?
          </h2>

          <div className="max-w-2xl mx-auto pb-10 mb-10">
            <p className="text-white/90 text-xl mx-auto">
              Para contrataciones, colaboraciones o simplemente para compartir tu experiencia con nuestra música. Estamos siempre abiertos a escuchar a nuestros fans.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/contacto" 
              className="bg-white hover:bg-[#F5F5F5] transition-colors px-8 py-4 rounded-md text-[#FF0000] inline-flex items-center font-bold text-lg shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.4)] transform hover:-translate-y-1 transition-all duration-300"
            >
              <Mail size={20} className="mr-2" />
              Contáctanos Ahora
            </Link>

            <Link 
              href="/sobre-nosotros" 
              className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 rounded-md text-white inline-flex items-center font-bold text-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <Info size={20} className="mr-2" />
              Conoce Más
            </Link>
          </div>
        </div>
      </section>

      {/* Ecualizador en la sección inferior */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className="bg-black/70 p-2 rounded-full flex items-center gap-2 backdrop-blur-sm red-mafia-border">
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#950101] text-white">
            <Flame size={14} />
          </div>
          <Equalizer active={activeAudio} width={50} height={20} barCount={6} />
        </div>
      </div>

      {/* Líneas de neón decorativas */}
      <NeonLine 
        className="fixed top-0 left-0 w-full" 
        height="2px" 
        color="rgba(255, 0, 0, 0.7)"
        pulse={true}
        zIndex={10}
      />
      <NeonLine 
        className="fixed bottom-0 left-0 w-full" 
        height="2px" 
        color="rgba(255, 0, 0, 0.5)"
        pulse={true}
        zIndex={10}
      />
    </div>
  );
}