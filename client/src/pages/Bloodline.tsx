import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BloodCorner, NeonLine, FireParticles } from '@/components/animated';
import { apiRequest } from '@/lib/queryClient';

// Interfaces para los datos
interface Influencer {
  id: number;
  name: string;
  genre: string;
  bio?: string;
  imageUrl?: string;
  era?: string;
  externalUrl?: string;
}

interface SongInfluence {
  id: number;
  songId: number;
  influencerId: number;
  description?: string;
  sampleUrl?: string;
}

// Datos de canciones (hardcoded por ahora ya que no tenemos una tabla de canciones)
const songs = [
  { id: 1, title: "Puño de Hierro", album: "SANGRE Y FUEGO", year: "2023" },
  { id: 2, title: "Noches Sangrientas", album: "SANGRE Y FUEGO", year: "2023" },
  { id: 3, title: "Fuego en las Calles", album: "SANGRE Y FUEGO", year: "2023" },
  { id: 4, title: "Noche Eterna", album: "NOCHE ETERNA", year: "2023" },
  { id: 5, title: "Origen", album: "RAÍCES", year: "2022" },
  { id: 6, title: "Primera Sangre", album: "RAÍCES", year: "2022" },
  { id: 7, title: "La Caída", album: "RAÍCES", year: "2022" },
];

export default function Bloodline() {
  const [selectedSong, setSelectedSong] = useState<number | null>(null);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  
  // Obtener todos los influencers
  const { data: influencers, isLoading: isLoadingInfluencers } = useQuery<Influencer[], Error>({
    queryKey: ['/api/influencers'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/influencers');
      return response.json();
    }
  });
  
  // Obtener influencias para una canción específica
  const { data: songInfluences, isLoading: isLoadingSongInfluences } = useQuery<SongInfluence[], Error>({
    queryKey: ['/api/songs', selectedSong, 'influences'],
    queryFn: async () => {
      if (!selectedSong) return [];
      const response = await apiRequest('GET', `/api/songs/${selectedSong}/influences`);
      return response.json();
    },
    enabled: !!selectedSong
  });
  
  // Detener el audio si cambia la canción seleccionada
  useEffect(() => {
    if (activeAudio) {
      activeAudio.pause();
      setActiveAudio(null);
    }
  }, [selectedSong]);
  
  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (activeAudio) {
        activeAudio.pause();
      }
    };
  }, [activeAudio]);
  
  // Seleccionar la primera canción por defecto si no hay ninguna seleccionada
  useEffect(() => {
    if (!selectedSong && songs.length > 0) {
      setSelectedSong(songs[0].id);
    }
  }, [selectedSong]);
  
  // Función para reproducir un sample de audio
  const playSample = (url: string) => {
    if (activeAudio) {
      activeAudio.pause();
    }
    
    const audio = new Audio(url);
    audio.play();
    setActiveAudio(audio);
    
    // Añadir eventos para gestionar la reproducción
    audio.addEventListener('ended', () => {
      setActiveAudio(null);
    });
  };
  
  // Función para pausar el audio actual
  const pauseAudio = () => {
    if (activeAudio) {
      activeAudio.pause();
      setActiveAudio(null);
    }
  };
  
  // Obtener datos del influencer seleccionado
  const getInfluencerById = (id: number) => {
    return influencers?.find(inf => inf.id === id) || null;
  };
  
  // Obtener la canción seleccionada
  const getSelectedSongData = () => {
    return songs.find(song => song.id === selectedSong) || null;
  };
  
  // Comprobar si una canción tiene influencias asociadas
  const songHasInfluences = (songId: number) => {
    if (!songInfluences) return false;
    return songInfluences.some(inf => inf.songId === songId);
  };
  
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-[#1c0000] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <BloodCorner />
      <FireParticles density={15} />
      
      <div className="max-w-6xl mx-auto">
        <h1 className="red-mafia-title text-4xl sm:text-5xl md:text-6xl text-center mb-4 md:mb-8 relative">
          BLOODLINE
          <NeonLine className="w-full md:w-1/2 mx-auto mt-2" />
        </h1>
        
        <div className="text-center mb-8">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explora las influencias musicales que han forjado el sonido de RED MAFIA. Descubre 
            qué artistas y canciones han inspirado nuestras creaciones.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Panel izquierdo: Selector de canciones */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-red-500 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Nuestras Canciones
            </h2>
            
            <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-red-900/40 overflow-hidden">
              <ul className="space-y-2">
                {songs.map((song) => (
                  <li key={song.id}>
                    <button
                      onClick={() => setSelectedSong(song.id)}
                      className={`w-full text-left px-3 py-2 rounded transition-all duration-300 flex items-center justify-between ${
                        selectedSong === song.id 
                          ? 'bg-gradient-to-r from-red-900 to-red-700 text-white font-medium shadow-[0_0_10px_rgba(255,0,0,0.3)]' 
                          : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-gray-300'
                      }`}
                    >
                      <div>
                        <div className="text-sm">{song.title}</div>
                        <div className="text-xs opacity-70">{song.album} ({song.year})</div>
                      </div>
                      
                      {/* Indicador de influencias disponibles */}
                      {songHasInfluences(song.id) && (
                        <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_rgba(255,0,0,0.7)]"></span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Canción seleccionada */}
            {selectedSong && (
              <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-red-900/40 overflow-hidden">
                <h3 className="text-lg font-bold text-white mb-2">
                  {getSelectedSongData()?.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  Álbum: <span className="text-red-400">{getSelectedSongData()?.album}</span> ({getSelectedSongData()?.year})
                </p>
                <p className="text-sm text-gray-400">
                  {!isLoadingSongInfluences && songInfluences && songInfluences.length > 0 ? (
                    <>Esta canción tiene <span className="text-red-400">{songInfluences.length}</span> influencias documentadas.</>
                  ) : (
                    <>Aún no hay influencias documentadas para esta canción.</>
                  )}
                </p>
              </div>
            )}
          </div>
          
          {/* Panel central: Red de influencias */}
          <div className="min-h-[500px] bg-black/40 backdrop-blur-sm rounded-lg border border-red-900/40 overflow-hidden relative flex items-center justify-center" ref={networkRef}>
            {!isLoadingInfluencers && !isLoadingSongInfluences && selectedSong && songInfluences && songInfluences.length > 0 ? (
              // Visualización de la red de influencias
              <div className="w-full h-full p-4 relative">
                {/* Nodo central: Nuestra canción */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-900 to-red-600 flex items-center justify-center shadow-[0_0_15px_rgba(255,0,0,0.5)] z-20 relative">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                      <span className="text-xs text-white font-bold mt-1 block">RED MAFIA</span>
                    </div>
                  </div>
                </div>
                
                {/* Nodos de influencias */}
                {songInfluences.map((influence, index) => {
                  const influencer = getInfluencerById(influence.influencerId);
                  if (!influencer) return null;
                  
                  // Cálculo de posición en círculo alrededor del nodo central
                  const angleStep = (2 * Math.PI) / songInfluences.length;
                  const angle = angleStep * index;
                  const radius = 130; // Distancia desde el centro
                  
                  const xPos = 50 + 45 * Math.cos(angle); // 50% + desplazamiento
                  const yPos = 50 + 45 * Math.sin(angle); // 50% + desplazamiento
                  
                  return (
                    <div key={influence.id}>
                      {/* Línea de conexión */}
                      <div 
                        className="absolute top-1/2 left-1/2 origin-center h-px bg-gradient-to-r from-red-900/70 to-red-600/40 z-10"
                        style={{
                          width: `${radius}px`,
                          transform: `translate(-50%, -50%) rotate(${angle}rad) translateX(${radius/2}px)`,
                        }}
                      ></div>
                      
                      {/* Nodo de influencer */}
                      <div 
                        className="absolute w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 z-20" 
                        style={{
                          top: `${yPos}%`,
                          left: `${xPos}%`,
                        }}
                      >
                        <button
                          onClick={() => setSelectedInfluencer(influencer)}
                          className="w-full h-full rounded-full bg-black/80 border-2 border-gray-800 hover:border-red-600 p-0.5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,0,0,0.4)] flex items-center justify-center group relative"
                        >
                          {influencer.imageUrl ? (
                            <img 
                              src={influencer.imageUrl} 
                              alt={influencer.name} 
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <div className="text-center">
                              <span className="text-xs text-gray-400 group-hover:text-white transition-colors duration-300">{influencer.name}</span>
                            </div>
                          )}
                          
                          {/* Etiqueta flotante al hacer hover */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-32 bg-black/90 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-center">
                            <p className="font-bold text-red-400">{influencer.name}</p>
                            <p className="text-gray-400">{influencer.genre}</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Estado de carga o mensaje cuando no hay influencias
              <div className="text-center p-4">
                {isLoadingInfluencers || isLoadingSongInfluences ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full mb-3"></div>
                    <p className="text-gray-400">Cargando influencias...</p>
                  </div>
                ) : (
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                    <p className="text-gray-500 mt-3">No hay influencias documentadas para esta canción.</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Panel derecho: Detalles del influencer seleccionado */}
          <div>
            <h2 className="text-xl font-bold text-red-500 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Detalles de Influencia
            </h2>
            
            {selectedInfluencer ? (
              <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-red-900/40 overflow-hidden relative">
                {/* Imagen de cabecera */}
                {selectedInfluencer.imageUrl && (
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src={selectedInfluencer.imageUrl} 
                      alt={selectedInfluencer.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 w-full p-4">
                      <h3 className="text-xl font-bold text-white">{selectedInfluencer.name}</h3>
                      <div className="flex items-center text-sm">
                        <span className="text-red-400 mr-2">{selectedInfluencer.genre}</span>
                        {selectedInfluencer.era && (
                          <span className="text-gray-400">Era: {selectedInfluencer.era}</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Si no hay imagen, mostrar encabezado alternativo */}
                {!selectedInfluencer.imageUrl && (
                  <div className="p-4 border-b border-red-900/30">
                    <h3 className="text-xl font-bold text-white">{selectedInfluencer.name}</h3>
                    <div className="flex items-center text-sm">
                      <span className="text-red-400 mr-2">{selectedInfluencer.genre}</span>
                      {selectedInfluencer.era && (
                        <span className="text-gray-400">Era: {selectedInfluencer.era}</span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Contenido principal */}
                <div className="p-4">
                  {/* Biografía */}
                  {selectedInfluencer.bio && (
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-red-400 mb-1">Acerca de</h4>
                      <p className="text-sm text-gray-300">{selectedInfluencer.bio}</p>
                    </div>
                  )}
                  
                  {/* Conexión con la canción seleccionada */}
                  {selectedSong && songInfluences && (
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-red-400 mb-1">Influencia en {getSelectedSongData()?.title}</h4>
                      
                      {songInfluences.filter(inf => inf.influencerId === selectedInfluencer.id).map(influence => (
                        <div key={influence.id} className="mb-2">
                          {influence.description && (
                            <p className="text-sm text-gray-300 mb-2">{influence.description}</p>
                          )}
                          
                          {influence.sampleUrl && (
                            <div className="flex items-center mt-2">
                              {activeAudio ? (
                                <button 
                                  onClick={pauseAudio}
                                  className="bg-red-700 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </button>
                              ) : (
                                <button 
                                  onClick={() => playSample(influence.sampleUrl as string)}
                                  className="bg-red-700 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </button>
                              )}
                              
                              <span className="ml-2 text-xs text-gray-400">
                                {activeAudio ? "Reproduciendo sample..." : "Escuchar sample"}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Enlaces externos */}
                  {selectedInfluencer.externalUrl && (
                    <div>
                      <a 
                        href={selectedInfluencer.externalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-red-500 hover:text-red-400 text-sm inline-flex items-center transition-colors"
                      >
                        <span>Más información</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Mensaje cuando no hay influencer seleccionado
              <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-red-900/40 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-400">
                  Selecciona una influencia de la red para ver más detalles.
                </p>
              </div>
            )}
            
            {/* Información sobre la funcionalidad */}
            <div className="mt-6 bg-black/30 rounded-lg p-4 border border-red-900/20">
              <h3 className="text-sm font-bold text-red-400 mb-2">¿Qué es Bloodline?</h3>
              <p className="text-xs text-gray-400">
                Bloodline es nuestro mapa de ADN musical. Aquí mapeamos las influencias 
                directas en nuestras canciones, mostrando qué artistas inspiraron cada 
                tema y cómo su legado vive a través de nuestro sonido.
              </p>
            </div>
          </div>
        </div>
        
        {/* Sección informativa */}
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-bold text-red-500 mb-4">Nuestras Raíces</h3>
          <p className="text-gray-300 mb-8">
            RED MAFIA ha sido formado por una rica tradición musical que atraviesa géneros y décadas. 
            Desde el punk hardcore hasta el metal industrial, desde el hip-hop experimental hasta 
            la música tradicional latina, nuestro sonido es un testimonio de nuestras diversas influencias.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/30 p-3 rounded-lg border border-red-900/20">
              <h4 className="text-white font-bold mb-1">Metal</h4>
              <p className="text-gray-400 text-xs">Intensidad, potencia y riffs brutales.</p>
            </div>
            <div className="bg-black/30 p-3 rounded-lg border border-red-900/20">
              <h4 className="text-white font-bold mb-1">Punk Hardcore</h4>
              <p className="text-gray-400 text-xs">Actitud, energía y mensaje directo.</p>
            </div>
            <div className="bg-black/30 p-3 rounded-lg border border-red-900/20">
              <h4 className="text-white font-bold mb-1">Hip-Hop Experimental</h4>
              <p className="text-gray-400 text-xs">Ritmos innovadores y letras crudas.</p>
            </div>
            <div className="bg-black/30 p-3 rounded-lg border border-red-900/20">
              <h4 className="text-white font-bold mb-1">Latino Tradicional</h4>
              <p className="text-gray-400 text-xs">Raíces culturales y sonidos ancestrales.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}