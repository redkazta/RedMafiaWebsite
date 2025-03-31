import { useState, useEffect, useRef } from 'react';
import { Share2, Heart, Volume2, VolumeX, Copy } from 'lucide-react';

interface LyricLine {
  text: string;
  time: number; // Tiempo en segundos cuando esta línea debe destacarse
  endTime?: number; // Tiempo opcional cuando finaliza esta línea
  type?: 'verse' | 'chorus' | 'bridge' | 'intro' | 'outro'; // Tipo de sección
}

interface AnimatedLyricsProps {
  title: string;
  artist: string;
  lyrics: LyricLine[];
  audioSrc: string;
  coverImage?: string;
  background?: string;
  autoScroll?: boolean;
  onShare?: (selectedText?: string) => void;
}

export default function AnimatedLyrics({
  title,
  artist,
  lyrics,
  audioSrc,
  coverImage,
  background,
  autoScroll = true,
  onShare
}: AnimatedLyricsProps) {
  // Estados
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [selectedText, setSelectedText] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [liked, setLiked] = useState(false);
  
  // Referencias
  const audioRef = useRef<HTMLAudioElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  
  // Inicializar referencias a las líneas
  useEffect(() => {
    lineRefs.current = lineRefs.current.slice(0, lyrics.length);
  }, [lyrics]);
  
  // Efecto para la configuración inicial del audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Configurar volumen
    audio.volume = volume;
    audio.muted = isMuted;
    
    // Eventos de audio
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      
      // Encontrar la línea actual basada en el tiempo
      const index = lyrics.findIndex(
        (line, i) => {
          const nextLine = lyrics[i + 1];
          const lineEndTime = line.endTime || (nextLine ? nextLine.time : Infinity);
          return audio.currentTime >= line.time && audio.currentTime < lineEndTime;
        }
      );
      
      if (index !== -1 && index !== currentLineIndex) {
        setCurrentLineIndex(index);
        
        // Auto-scroll a la línea actual si está habilitado
        if (autoScroll && lineRefs.current[index]) {
          lineRefs.current[index]?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }
    };
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentLineIndex(-1);
      if (audio) {
        audio.currentTime = 0;
      }
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    
    // Limpieza
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentLineIndex, lyrics, autoScroll, volume, isMuted]);
  
  // Efecto para la selección de texto
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString()) {
        setSelectedText(selection.toString());
        setIsTextSelected(true);
      } else {
        setIsTextSelected(false);
      }
    };
    
    document.addEventListener('selectionchange', handleSelection);
    
    return () => {
      document.removeEventListener('selectionchange', handleSelection);
    };
  }, []);
  
  // Controles de audio
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const seekTime = parseFloat(e.target.value);
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };
  
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
      audio.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      audio.muted = false;
    }
  };
  
  const jumpToLine = (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = lyrics[index].time;
    setCurrentLineIndex(index);
    
    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
    }
  };
  
  // Compartir letra seleccionada
  const handleShare = () => {
    if (onShare) {
      onShare(selectedText || undefined);
    } else {
      // Comportamiento predeterminado: copiar al portapapeles
      navigator.clipboard.writeText(selectedText || `${title} - ${artist}`);
      alert('Texto copiado al portapapeles');
    }
  };
  
  // Copiar texto seleccionado
  const copySelected = () => {
    if (selectedText) {
      navigator.clipboard.writeText(selectedText);
      alert('Texto copiado al portapapeles');
    }
  };
  
  // Formatear tiempo (segundos a MM:SS)
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const getLineClass = (line: LyricLine, index: number) => {
    let classes = 'py-2 px-4 transition-all duration-300 rounded-md ';
    
    // Aplicar estilo según tipo de sección
    switch (line.type) {
      case 'chorus':
        classes += 'font-bold italic ';
        break;
      case 'bridge':
        classes += 'text-[#FF0000]/80 ';
        break;
      default:
        classes += '';
    }
    
    // Línea actual
    if (index === currentLineIndex) {
      classes += 'bg-[#950101]/20 scale-105 text-white animate-pulse-slow ';
    } else {
      classes += 'text-[#F5F5F5]/70 hover:text-white hover:bg-[#950101]/10 ';
    }
    
    return classes.trim();
  };
  
  // Estilo de fondo dinámico
  const backgroundStyle = {
    backgroundImage: background
      ? `linear-gradient(rgba(10, 0, 0, 0.85), rgba(10, 0, 0, 0.9)), url(${background})`
      : coverImage
      ? `linear-gradient(rgba(10, 0, 0, 0.85), rgba(10, 0, 0, 0.9)), url(${coverImage})`
      : 'linear-gradient(to bottom, #0A0000, #1A0505)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  
  return (
    <div className="w-full min-h-screen flex flex-col" style={backgroundStyle}>
      {/* Audio (oculto) */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      {/* Encabezado con título, artista e imagen de portada */}
      <div className="relative p-6 flex items-center gap-6 border-b border-[#950101]/30">
        {/* Efectos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#950101]/5 backdrop-blur-sm -z-10"></div>
        
        {coverImage && (
          <div className="relative w-24 h-24 rounded-md overflow-hidden red-mafia-glow">
            <img 
              src={coverImage} 
              alt={`${title} cover`} 
              className="w-full h-full object-cover"
            />
            
            {/* Indicador de reproducción */}
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-8 h-8 flex space-x-1 items-end">
                  {[1, 2, 3].map((i) => (
                    <span 
                      key={i} 
                      className="w-1 bg-white rounded-t-sm" 
                      style={{
                        height: `${20 + Math.random() * 20}%`,
                        animationName: 'soundwave',
                        animationDuration: '1.2s',
                        animationDelay: `${i * 0.2}s`,
                        animationIterationCount: 'infinite'
                      }}
                    ></span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="flex-1">
          <h1 className="red-mafia-title text-2xl md:text-3xl mb-1">{title}</h1>
          <p className="text-[#F5F5F5]/80 text-lg">{artist}</p>
        </div>
        
        {/* Botones de acción */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLiked(!liked)}
            className={`p-2 rounded-full ${
              liked ? 'text-[#FF0000]' : 'text-[#F5F5F5]/70'
            } hover:bg-[#950101]/20 transition-colors`}
            title={liked ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          >
            <Heart />
          </button>
          
          <button 
            onClick={handleShare}
            className="p-2 rounded-full text-[#F5F5F5]/70 hover:bg-[#950101]/20 transition-colors"
            title="Compartir canción"
          >
            <Share2 />
          </button>
        </div>
      </div>
      
      {/* Letras */}
      <div 
        ref={lyricsContainerRef} 
        className="flex-1 overflow-y-auto py-8 px-4 md:px-8 relative"
      >
        <div className="max-w-2xl mx-auto">
          {lyrics.map((line, index) => (
            <div key={index} className="mb-1">
              <p
                ref={el => lineRefs.current[index] = el}
                className={getLineClass(line, index)}
                onClick={() => jumpToLine(index)}
              >
                {line.text}
              </p>
            </div>
          ))}
        </div>
        
        {/* Herramienta de selección de texto */}
        {isTextSelected && (
          <div className="fixed bottom-24 right-4 bg-[#1A0A0A] shadow-lg red-mafia-border p-2 rounded-md flex gap-2">
            <button
              onClick={copySelected}
              className="p-2 rounded-full text-[#F5F5F5]/70 hover:bg-[#950101]/20 transition-colors"
              title="Copiar seleccionado"
            >
              <Copy size={16} />
            </button>
            
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-[#F5F5F5]/70 hover:bg-[#950101]/20 transition-colors"
              title="Compartir seleccionado"
            >
              <Share2 size={16} />
            </button>
          </div>
        )}
      </div>
      
      {/* Reproductor en la parte inferior */}
      <div className="bg-[#1A0A0A]/90 backdrop-blur-md p-4 border-t border-[#950101]/30 sticky bottom-0 left-0 right-0">
        {/* Barra de progreso */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs text-[#F5F5F5]/70">{formatTime(currentTime)}</span>
          
          <div className="relative flex-1 h-1 bg-[#333] rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-[#FF0000]"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
            <input 
              type="range" 
              min="0" 
              max={duration || 0} 
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          
          <span className="text-xs text-[#F5F5F5]/70">{formatTime(duration)}</span>
        </div>
        
        {/* Controles de audio */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              onClick={togglePlay}
              className="w-10 h-10 bg-[#950101] hover:bg-[#FF0000] text-white rounded-full flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-[#F5F5F5] text-sm truncate max-w-[150px] md:max-w-[300px] mx-auto">
              {currentLineIndex >= 0 && lyrics[currentLineIndex]?.text}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleMute}
              className="p-2 rounded-full text-[#F5F5F5]/70 hover:bg-[#950101]/20 transition-colors"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-[#333] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF0000]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}