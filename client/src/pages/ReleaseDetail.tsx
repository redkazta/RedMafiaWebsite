import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Release } from "@shared/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { ChevronLeft, Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function ReleaseDetail() {
  const { id } = useParams();
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const { data: release, isLoading, error } = useQuery<Release>({
    queryKey: ['release', id],
    queryFn: async () => {
      const response = await fetch(`/api/releases/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });

  const togglePlayPause = (index: number) => {
    const audioElements = document.querySelectorAll('audio');
    
    // Si ya está reproduciendo y se hace clic en la misma pista
    if (isPlaying && currentTrack === index) {
      audioElements[index].pause();
      setIsPlaying(false);
    } 
    // Si no se está reproduciendo o se hace clic en una pista diferente
    else {
      // Pausar cualquier pista en reproducción
      audioElements.forEach(audio => audio.pause());
      
      // Reproducir la nueva pista
      audioElements[index].play();
      setCurrentTrack(index);
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.muted = !isMuted;
    });
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <Link href="/lanzamientos" className="inline-flex items-center text-[#F5F5F5] hover:text-[#FF0000] mb-6 transition-colors">
            <ChevronLeft size={20} />
            <span>Volver a Lanzamientos</span>
          </Link>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF0000]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">
              Error al cargar los detalles del lanzamiento
            </div>
          ) : release ? (
            <div className="bg-[#1E1E1E] border border-[#950101] rounded-lg overflow-hidden shadow-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <img 
                    src={release.coverImage} 
                    alt={release.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <div className="flex justify-between items-start mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#FF0000]">
                      {release.title}
                    </h1>
                    <span className="text-sm text-[#F5F5F5] bg-[#950101] px-3 py-1 rounded-full">
                      {release.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-[#F5F5F5]/60 text-sm mb-6">
                    <span className="mr-4">{release.year}</span>
                    <span>{release.tracks} pistas</span>
                  </div>
                  
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-[#F5F5F5] mb-3">Descripción</h2>
                    <p className="text-[#F5F5F5]/80 leading-relaxed">
                      {release.description}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-[#F5F5F5]">Lista de pistas</h2>
                      <button 
                        onClick={toggleMute} 
                        className="flex items-center text-[#F5F5F5]/80 hover:text-[#FF0000] transition-colors"
                      >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        <span className="ml-1 text-sm">{isMuted ? 'Activar sonido' : 'Silenciar'}</span>
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {release.trackTitles?.map((title, index) => (
                        <div key={index} className="bg-[#2D0000] p-3 rounded-lg flex justify-between items-center">
                          <span className="text-[#F5F5F5]">{title}</span>
                          
                          <div className="flex items-center">
                            <button
                              onClick={() => togglePlayPause(index)}
                              className="p-2 rounded-full bg-[#950101] hover:bg-[#FF0000] transition-colors text-white"
                            >
                              {isPlaying && currentTrack === index ? <Pause size={16} /> : <Play size={16} />}
                            </button>
                            
                            {/* Audio oculto */}
                            <audio 
                              src={release.audioFiles?.[index] || ''} 
                              className="hidden" 
                              onEnded={() => setIsPlaying(false)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-[#F5F5F5] py-10">
              No se encontró el lanzamiento
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}