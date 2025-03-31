import React, { useState, useRef, useEffect } from 'react';
import Equalizer from './Equalizer';

interface FloatingPlayerProps {
  className?: string;
  track?: {
    title: string;
    artist?: string;
    audioSrc: string;
    coverImage?: string;
  };
  autoPlay?: boolean;
}

export default function FloatingPlayer({
  className = '',
  track,
  autoPlay = false,
}: FloatingPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMiniPlayer, setIsMiniPlayer] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reproducir automáticamente si se proporciona
  useEffect(() => {
    if (track && autoPlay && audioRef.current) {
      audioRef.current.play().catch(e => console.error('Error en reproducción automática:', e));
    }
  }, [track, autoPlay]);

  // Manejadores para audio
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error('Error al reproducir:', e));
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration || 0;
    
    // Actualizar progreso
    setProgress((current / total) * 100);
    
    // Actualizar tiempo actual
    const currentMinutes = Math.floor(current / 60);
    const currentSeconds = Math.floor(current % 60);
    setCurrentTime(`${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`);
    
    // Actualizar duración total
    const durationMinutes = Math.floor(total / 60);
    const durationSeconds = Math.floor(total % 60);
    setDuration(`${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    
    const progressBar = e.currentTarget;
    const bounds = progressBar.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percentage = x / width;
    
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  };

  // Si no hay pista, no mostrar nada
  if (!track) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 rounded-lg shadow-lg transition-all duration-300 animate-fade-in ${className} ${
        isMiniPlayer 
          ? 'w-20 h-20 bg-black/70 backdrop-blur-sm hover:w-60' 
          : 'w-80 h-auto bg-black/90 backdrop-blur-md'
      } red-mafia-border overflow-hidden`}
    >
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={track.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Mini player view */}
      {isMiniPlayer && (
        <div className="relative w-full h-full flex items-center overflow-hidden group cursor-pointer" onClick={() => setIsMiniPlayer(false)}>
          {/* Cover image */}
          <div className="w-20 h-20 shrink-0">
            {track.coverImage ? (
              <img
                src={track.coverImage}
                alt={track.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#950101]/50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Expanded content (visible on hover) */}
          <div className="hidden pl-2 flex-1 overflow-hidden whitespace-nowrap group-hover:block">
            <div className="text-sm font-semibold text-white">{track.title}</div>
            {track.artist && <div className="text-xs text-gray-300">{track.artist}</div>}
            
            <div className="mt-2 flex space-x-2 items-center">
              <button
                className="w-8 h-8 rounded-full bg-[#950101] flex items-center justify-center text-white hover:bg-[#FF0000] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
              
              <Equalizer active={isPlaying} width={40} height={16} barCount={4} />
            </div>
          </div>
          
          {/* Animación en miniatura */}
          <div className="absolute bottom-1 right-1 pointer-events-none">
            <Equalizer active={isPlaying} width={16} height={8} barCount={3} />
          </div>
        </div>
      )}

      {/* Full player view */}
      {!isMiniPlayer && (
        <div className="p-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-bold text-white truncate flex-1">{track.title}</h4>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => setIsMiniPlayer(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Album art & info */}
          <div className="flex space-x-3 mb-3">
            <div className="w-16 h-16 shrink-0 rounded overflow-hidden">
              {track.coverImage ? (
                <img
                  src={track.coverImage}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#950101]/50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              {track.artist && <div className="text-sm text-gray-300 mb-1">{track.artist}</div>}
              <div className="flex items-center">
                <Equalizer active={isPlaying} width={50} height={20} barCount={5} />
              </div>
            </div>
          </div>

          {/* Controles y barra de progreso */}
          <div className="mb-2">
            <div 
              className="w-full h-1 bg-gray-700 rounded-full overflow-hidden cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-[#FF0000]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{currentTime}</span>
              <span>{duration}</span>
            </div>
          </div>

          {/* Botones de control */}
          <div className="flex justify-center space-x-4">
            <button className="text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
              </svg>
            </button>
            <button
              className="w-10 h-10 rounded-full bg-[#950101] flex items-center justify-center text-white hover:bg-[#FF0000] transition-colors"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>
            <button className="text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}