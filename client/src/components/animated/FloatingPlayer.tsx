import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, ChevronUp, Music } from 'lucide-react';
import { Equalizer } from '.';

interface FloatingPlayerProps {
  className?: string;
  track?: {
    title: string;
    artist?: string;
    audioSrc: string;
    coverImage?: string;
    guadalajaraReference?: string; // Added field for Guadalajara reference
  };
  autoPlay?: boolean;
}

export default function FloatingPlayer({
  className = '',
  track,
  autoPlay = false
}: FloatingPlayerProps) {
  // Estados
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Referencias
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Comprobar si hay una pista disponible
  if (!track) return null;

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
  }, [isPlaying]);

  // Manejar eventos de cambio de estado del audio
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
      setIsPlaying(false);
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
  }, []);

  // Funciones de control
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
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

  // Formatear tiempo (segundos a MM:SS)
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isHidden) return null;

  // Versión minimizada (solo botón flotante)
  if (isMinimized) {
    return (
      <div className={`fixed bottom-4 left-4 z-30 ${className}`}>
        <button
          onClick={() => setIsMinimized(false)}
          className="relative w-12 h-12 rounded-full bg-[#950101] hover:bg-[#FF0000] text-white flex items-center justify-center shadow-lg group transition-colors"
        >
          {isPlaying ? (
            <Equalizer active={true} barCount={3} width={16} height={12} />
          ) : (
            <Music size={20} />
          )}

          {/* Tooltip con el título */}
          <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-[#1A1A1A] text-white text-xs py-1 px-2 rounded shadow-lg w-max max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
            {track.title} - Por: Emiliano Garcia Gutierrez
          </div>
        </button>
      </div>
    );
  }

  // Versión completa (reproductor flotante)
  return (
    <div className={`fixed bottom-4 left-4 z-30 ${className}`}>
      <div className="flex items-center bg-[#1A0505] text-white rounded-full shadow-lg border border-[#950101]/30 p-2 w-auto max-w-[320px] min-w-[240px]">
        {/* Audio oculto */}
        <audio ref={audioRef} src={track.audioSrc} preload="metadata" />

        {/* Portada o icono */}
        <div className="relative flex-shrink-0 w-8 h-8 rounded-full overflow-hidden mr-2">
          {track.coverImage ? (
            <img
              src={track.coverImage}
              alt={track.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#2D0000] flex items-center justify-center">
              <Music size={14} className="text-[#950101]" />
            </div>
          )}

          {/* Indicador de reproducción */}
          {isPlaying && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Equalizer barCount={3} active={isPlaying} width={15} height={10} />
            </div>
          )}
        </div>

        {/* Información y controles */}
        <div className="flex-1 min-w-0">
          {/* Título */}
          <div className="text-xs font-medium truncate">{track.title} - {track.guadalajaraReference || "Inspirada en Guadalajara"}</div>

          {/* Barra de progreso */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[9px] text-[#F5F5F5]/70">{formatTime(currentTime)}</span>

            <div
              ref={progressBarRef}
              className="flex-1 h-1 bg-[#333] rounded-full overflow-hidden cursor-pointer relative"
              onClick={handleSeek}
            >
              <div
                className="absolute top-0 left-0 h-full bg-[#950101]"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              ></div>
            </div>

            <span className="text-[9px] text-[#F5F5F5]/70">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Botones de control */}
        <div className="flex items-center ml-2 gap-1">
          <button
            onClick={togglePlay}
            className="w-7 h-7 bg-[#950101] hover:bg-[#FF0000] rounded-full flex items-center justify-center transition-colors"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </button>

          <button
            onClick={toggleMute}
            className="p-1 rounded-full text-[#F5F5F5]/70 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded-full text-[#F5F5F5]/70 hover:text-white transition-colors"
            title="Minimizar"
          >
            <ChevronUp size={14} />
          </button>

          <button
            onClick={() => setIsHidden(true)}
            className="p-1 rounded-full text-[#F5F5F5]/70 hover:text-white transition-colors"
            title="Cerrar"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}