import { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Repeat, 
  Shuffle, 
  ChevronDown, 
  ChevronUp,
  Heart,
  Share2,
  ListMusic,
  Music
} from 'lucide-react';
import { Equalizer, NeonLine } from '@/components/animated';

interface AudioTrack {
  id: string | number;
  title: string;
  artist?: string;
  duration?: number;
  audioSrc: string;
  coverImage?: string;
}

interface AdvancedPlayerProps {
  tracks: AudioTrack[];
  initialTrackIndex?: number;
  className?: string;
  autoPlay?: boolean;
  expanded?: boolean;
  onToggleExpand?: (expanded: boolean) => void;
}

export default function AdvancedPlayer({
  tracks,
  initialTrackIndex = 0,
  className = '',
  autoPlay = false,
  expanded: initialExpanded = false,
  onToggleExpand
}: AdvancedPlayerProps) {
  // Estados
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [expanded, setExpanded] = useState(initialExpanded);
  const [liked, setLiked] = useState<Set<string | number>>(new Set());
  const [activeTrackElement, setActiveTrackElement] = useState<HTMLDivElement | null>(null);
  
  // Referencias
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const volumeBarRef = useRef<HTMLDivElement>(null);
  const trackListRef = useRef<HTMLDivElement>(null);
  
  // Información de la pista actual
  const currentTrack = tracks[currentTrackIndex];
  
  // Reproducir/pausar según el estado
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error('Error al reproducir:', error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);
  
  // Configurar audio cuando cambia la pista
  useEffect(() => {
    if (!audioRef.current) return;
    
    // Resetear tiempo
    setCurrentTime(0);
    
    // Aplicar volumen y mute
    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;
    
    // Iniciar reproducción si estaba reproduciendo
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error('Error al reproducir nueva pista:', error);
        setIsPlaying(false);
      });
    }
    
    // Scroll a la pista activa en la lista
    if (expanded && activeTrackElement) {
      setTimeout(() => {
        activeTrackElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [currentTrackIndex, volume, isMuted, isPlaying, expanded, activeTrackElement]);
  
  // Gestionar eventos de cambio de estado del audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const handleEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play();
      } else if (isShuffling) {
        playRandomTrack();
      } else {
        playNextTrack();
      }
    };
    
    // Agregar event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    
    // Limpiar event listeners
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isLooping, isShuffling]);
  
  // Almacenar en localStorage los tracks favoritos
  useEffect(() => {
    // Cargar favoritos al montar
    const savedLiked = localStorage.getItem('redmafia-liked-tracks');
    if (savedLiked) {
      try {
        const likedArray = JSON.parse(savedLiked);
        setLiked(new Set(likedArray));
      } catch (e) {
        console.error('Error al cargar tracks favoritos:', e);
      }
    }
  }, []);
  
  // Guardar favoritos cuando cambian
  useEffect(() => {
    if (liked.size > 0) {
      const likedArray = Array.from(liked);
      localStorage.setItem('redmafia-liked-tracks', JSON.stringify(likedArray));
    }
  }, [liked]);
  
  // Actualizar estado de expanded para el padre
  useEffect(() => {
    if (onToggleExpand) {
      onToggleExpand(expanded);
    }
  }, [expanded, onToggleExpand]);
  
  // Funciones de control
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const playPreviousTrack = () => {
    setCurrentTrackIndex(prevIndex => {
      if (prevIndex <= 0) {
        return tracks.length - 1;
      }
      return prevIndex - 1;
    });
  };
  
  const playNextTrack = () => {
    setCurrentTrackIndex(prevIndex => {
      if (prevIndex >= tracks.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };
  
  const playRandomTrack = () => {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    setCurrentTrackIndex(randomIndex);
  };
  
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current) return;
    
    const progressRect = progressBarRef.current.getBoundingClientRect();
    const seekPosition = (e.clientX - progressRect.left) / progressRect.width;
    
    if (seekPosition >= 0 && seekPosition <= 1) {
      const seekTime = duration * seekPosition;
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };
  
  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeBarRef.current || !audioRef.current) return;
    
    const volumeRect = volumeBarRef.current.getBoundingClientRect();
    let volumeLevel = (e.clientX - volumeRect.left) / volumeRect.width;
    
    volumeLevel = Math.max(0, Math.min(1, volumeLevel));
    
    setVolume(volumeLevel);
    audioRef.current.volume = volumeLevel;
    
    if (volumeLevel === 0) {
      setIsMuted(true);
      audioRef.current.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  };
  
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };
  
  const toggleLike = (trackId: string | number) => {
    setLiked(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(trackId)) {
        newLiked.delete(trackId);
      } else {
        newLiked.add(trackId);
      }
      return newLiked;
    });
  };
  
  // Formatear tiempo (segundos a MM:SS)
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div 
      className={`bg-gradient-to-b from-[#1A0505] to-[#0A0000] border border-[#950101]/30 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
        expanded ? 'max-h-[600px]' : 'max-h-[180px]'
      } ${className}`}
    >
      {/* Audio element (hidden) */}
      <audio ref={audioRef} src={currentTrack.audioSrc} preload="metadata" />
      
      {/* Cabecera del reproductor (siempre visible) */}
      <div className="p-4 flex flex-col md:flex-row gap-4">
        {/* Portada del álbum */}
        <div className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg overflow-hidden red-mafia-glow">
          {currentTrack.coverImage ? (
            <img 
              src={currentTrack.coverImage} 
              alt={currentTrack.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#2D0000] flex items-center justify-center">
              <Music size={32} className="text-[#950101]" />
            </div>
          )}
          
          {/* Indicador de reproducción */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-1 flex justify-center">
              <Equalizer barCount={5} active={isPlaying} height={12} width={20} />
            </div>
          )}
        </div>
        
        {/* Información y controles */}
        <div className="flex-1 flex flex-col">
          {/* Título y artista */}
          <div className="mb-2">
            <h3 className="text-xl font-bold text-white truncate red-mafia-title">{currentTrack.title}</h3>
            <p className="text-[#F5F5F5]/70 text-sm">{currentTrack.artist || 'RED MAFIA'}</p>
          </div>
          
          {/* Barra de progreso */}
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs text-[#F5F5F5]/70">{formatTime(currentTime)}</span>
            
            <div 
              ref={progressBarRef}
              className="flex-1 h-1.5 bg-[#333] rounded-full overflow-hidden cursor-pointer relative"
              onClick={handleSeek}
            >
              <div 
                className="absolute top-0 left-0 h-full bg-[#950101] rounded-full"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              ></div>
            </div>
            
            <span className="text-xs text-[#F5F5F5]/70">{formatTime(duration)}</span>
          </div>
          
          {/* Controles principales */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Botones de control */}
              <button 
                onClick={() => setIsShuffling(!isShuffling)}
                className={`p-1.5 rounded-full ${isShuffling ? 'text-[#FF0000]' : 'text-[#F5F5F5]/70'} hover:bg-[#950101]/20 transition-colors`}
                title="Reproducción aleatoria"
              >
                <Shuffle size={16} />
              </button>
              
              <button 
                onClick={playPreviousTrack}
                className="p-1.5 rounded-full text-[#F5F5F5]/70 hover:bg-[#950101]/20 transition-colors"
                title="Anterior"
              >
                <SkipBack size={18} />
              </button>
              
              <button 
                onClick={togglePlay}
                className="w-9 h-9 bg-[#950101] hover:bg-[#FF0000] text-white rounded-full flex items-center justify-center transition-colors"
                title={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              
              <button 
                onClick={playNextTrack}
                className="p-1.5 rounded-full text-[#F5F5F5]/70 hover:bg-[#950101]/20 transition-colors"
                title="Siguiente"
              >
                <SkipForward size={18} />
              </button>
              
              <button 
                onClick={() => setIsLooping(!isLooping)}
                className={`p-1.5 rounded-full ${isLooping ? 'text-[#FF0000]' : 'text-[#F5F5F5]/70'} hover:bg-[#950101]/20 transition-colors`}
                title="Repetir"
              >
                <Repeat size={16} />
              </button>
            </div>
            
            {/* Control de volumen */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={toggleMute}
                className="p-1.5 rounded-full text-[#F5F5F5]/70 hover:bg-[#950101]/20 transition-colors"
                title={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              
              <div
                ref={volumeBarRef}
                className="w-16 h-1.5 bg-[#333] rounded-full overflow-hidden cursor-pointer relative hidden sm:block"
                onClick={handleVolumeChange}
              >
                <div 
                  className="absolute top-0 left-0 h-full bg-[#950101]"
                  style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Botones adicionales */}
            <div className="flex items-center gap-1">
              <button 
                onClick={() => toggleLike(currentTrack.id)}
                className={`p-1.5 rounded-full ${liked.has(currentTrack.id) ? 'text-[#FF0000]' : 'text-[#F5F5F5]/70'} hover:bg-[#950101]/20 transition-colors`}
                title="Favorito"
              >
                <Heart size={16} />
              </button>
              
              <button
                onClick={toggleExpanded}
                className="p-1.5 rounded-full text-[#F5F5F5]/70 hover:bg-[#950101]/20 transition-colors"
                title={expanded ? 'Ocultar lista' : 'Mostrar lista'}
              >
                {expanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Panel expandible con lista de canciones */}
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <NeonLine color="#950101" />
        
        <div className="p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ListMusic size={16} className="text-[#950101]" />
            <h4 className="text-[#F5F5F5] font-medium">Lista de reproducción</h4>
          </div>
          <div className="text-[#F5F5F5]/70 text-xs">{tracks.length} canciones</div>
        </div>
        
        <div 
          ref={trackListRef}
          className="px-3 pb-3 overflow-y-auto max-h-[320px] scrollbar-thin scrollbar-thumb-[#950101]/30 scrollbar-track-transparent"
        >
          {tracks.map((track, index) => (
            <div 
              key={track.id}
              ref={el => {
                if (index === currentTrackIndex) {
                  setActiveTrackElement(el);
                }
              }}
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                index === currentTrackIndex 
                  ? 'bg-[#950101]/20 red-mafia-border' 
                  : 'hover:bg-[#950101]/10'
              } mb-1 transition-colors group`}
              onClick={() => selectTrack(index)}
            >
              {/* Miniatura o número */}
              <div className="w-8 h-8 flex-shrink-0 relative">
                {track.coverImage ? (
                  <img 
                    src={track.coverImage} 
                    alt={track.title} 
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-full bg-[#2D0000] flex items-center justify-center rounded">
                    <span className="text-[#F5F5F5]/70 text-xs">{index + 1}</span>
                  </div>
                )}
                
                {/* Overlay de play */}
                <div className={`absolute inset-0 bg-black/50 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                  index === currentTrackIndex && isPlaying ? 'opacity-100' : ''
                }`}>
                  {index === currentTrackIndex && isPlaying ? (
                    <Pause size={14} className="text-white" />
                  ) : (
                    <Play size={14} className="text-white ml-0.5" />
                  )}
                </div>
              </div>
              
              {/* Información de la pista */}
              <div className="flex-1 min-w-0">
                <h5 className="text-[#F5F5F5] font-medium truncate">{track.title}</h5>
                <p className="text-[#F5F5F5]/70 text-xs truncate">{track.artist || 'RED MAFIA'}</p>
              </div>
              
              {/* Duración y acciones */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(track.id);
                  }}
                  className={`p-1 rounded-full ${
                    liked.has(track.id) ? 'text-[#FF0000]' : 'text-[#F5F5F5]/40 hover:text-[#F5F5F5]/70'
                  } transition-colors opacity-0 group-hover:opacity-100 ${
                    liked.has(track.id) ? 'opacity-100' : ''
                  }`}
                >
                  <Heart size={14} />
                </button>
                
                <span className="text-xs text-[#F5F5F5]/50">
                  {track.duration ? formatTime(track.duration) : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}