import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Release, News, Concert, GalleryItem } from "@shared/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Calendar, MapPin, Music, Camera, Newspaper } from "lucide-react";

export default function Home() {
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
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-50"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" 
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-['Bebas_Neue',sans-serif] text-[#FF0000] mb-4">
              RED MAFIA
            </h1>
            <p className="text-xl md:text-2xl text-[#F5F5F5] mb-8">
              Rockea con nosotros en nuestra gira "SANGRE Y FUEGO" 2023
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/lanzamientos" className="bg-[#950101] hover:bg-[#FF0000] transition-colors px-6 py-3 rounded-md text-[#F5F5F5] inline-flex items-center font-medium">
                <Music size={18} className="mr-2" />
                Nuestra Música
              </Link>
              <Link href="/conciertos" className="bg-transparent border-2 border-[#950101] hover:border-[#FF0000] hover:text-[#FF0000] transition-colors px-6 py-3 rounded-md text-[#F5F5F5] inline-flex items-center font-medium">
                <Calendar size={18} className="mr-2" />
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
            <h2 className="text-3xl font-['Bebas_Neue',sans-serif] text-[#FF0000]">
              ÚLTIMO LANZAMIENTO
            </h2>
            <Link href="/lanzamientos" className="text-[#F5F5F5] hover:text-[#FF0000] transition-colors inline-flex items-center">
              Ver todos <ChevronRight size={18} />
            </Link>
          </div>
          
          {releases && releases.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src={releases[0].coverImage} 
                  alt={releases[0].title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-bold text-[#FF0000] mb-2">{releases[0].title}</h3>
                  <div className="flex items-center gap-4 text-[#F5F5F5]/70 mb-4">
                    <span>{releases[0].type}</span>
                    <span>•</span>
                    <span>{releases[0].year}</span>
                    <span>•</span>
                    <span>{releases[0].tracks} pistas</span>
                  </div>
                  <p className="text-[#F5F5F5] text-lg leading-relaxed mb-8">
                    {releases[0].description}
                  </p>
                </div>
                
                <Link 
                  href={`/lanzamientos/${releases[0].id}`} 
                  className="bg-[#950101] hover:bg-[#FF0000] transition-colors px-6 py-3 rounded-md text-[#F5F5F5] inline-flex items-center font-medium"
                >
                  <Music size={18} className="mr-2" />
                  Escuchar Ahora
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Upcoming Concerts Section */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-['Bebas_Neue',sans-serif] text-[#FF0000]">
              PRÓXIMAS PRESENTACIONES
            </h2>
            <Link href="/conciertos" className="text-[#F5F5F5] hover:text-[#FF0000] transition-colors inline-flex items-center">
              Ver todas <ChevronRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concerts?.slice(0, 3).map((concert) => (
              <div 
                key={concert.id}
                className="bg-[#1E1E1E] border border-[#950101] rounded-lg overflow-hidden shadow-lg p-6"
              >
                <div className="flex items-center">
                  <div className="bg-[#2D0000] p-4 rounded-lg text-center mr-4">
                    <div className="text-3xl font-bold text-[#FF0000]">{concert.date}</div>
                    <div className="text-sm text-[#F5F5F5]">{concert.month}</div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-[#FF0000] mb-1">{concert.title}</h3>
                    <div className="flex items-center text-[#F5F5F5]/70 text-sm mb-1">
                      <MapPin size={14} className="mr-1" />
                      {concert.venue}
                    </div>
                    <div className="flex items-center text-[#F5F5F5]/70 text-sm">
                      <Calendar size={14} className="mr-1" />
                      Puertas: {concert.doors} | Inicio: {concert.start}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Latest News */}
      <section className="py-16 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-['Bebas_Neue',sans-serif] text-[#FF0000]">
              ÚLTIMAS NOTICIAS
            </h2>
            <Link href="/noticias" className="text-[#F5F5F5] hover:text-[#FF0000] transition-colors inline-flex items-center">
              Ver todas <ChevronRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news?.slice(0, 3).map((item) => (
              <Link href={`/noticias/${item.id}`} key={item.id}>
                <article className="bg-[#1E1E1E] border border-[#950101] rounded-lg overflow-hidden shadow-lg h-full flex flex-col hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-[#950101] text-white px-3 py-1 text-sm">
                      {item.category}
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-[#FF0000] mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-[#F5F5F5]/70 text-sm mb-4 line-clamp-3 flex-grow">{item.content}</p>
                    <div className="text-[#F5F5F5]/50 text-xs">{item.date}</div>
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
            <h2 className="text-3xl font-['Bebas_Neue',sans-serif] text-[#FF0000]">
              GALERÍA
            </h2>
            <Link href="/galeria" className="text-[#F5F5F5] hover:text-[#FF0000] transition-colors inline-flex items-center">
              Ver todas <ChevronRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gallery?.slice(0, 4).map((item) => (
              <Link href="/galeria" key={item.id} className="relative block group overflow-hidden rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Camera size={24} className="text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 bg-[#FF0000] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485579149621-3123dd979885?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿QUIERES CONTACTARNOS?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Para contrataciones, colaboraciones o simplemente para compartir tu experiencia con nuestra música.
          </p>
          <Link 
            href="/contacto" 
            className="bg-white hover:bg-[#F5F5F5] transition-colors px-8 py-4 rounded-md text-[#FF0000] inline-flex items-center font-bold text-lg"
          >
            Contáctanos Ahora
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}