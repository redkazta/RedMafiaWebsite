
import React, { useEffect } from 'react';
import { usePlayerStore } from '@/store/player';

interface SpotifyPlayerProps {
  trackId?: string;
  albumId?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  theme?: string;
  view?: 'minimal' | 'compact' | 'standard';
  autoPlay?: boolean;
}

export default function SpotifyPlayer({
  trackId: propTrackId,
  albumId,
  width = '100%',
  height = 352,
  className = '',
  theme = '0',
  view = 'standard',
  autoPlay = false
}: SpotifyPlayerProps) {
  const { currentTrackId, setTrack } = usePlayerStore();
  
  // Si se proporciona un trackId como prop, actualizar el estado global
  useEffect(() => {
    if (propTrackId && propTrackId !== currentTrackId) {
      setTrack(propTrackId);
    }
  }, [propTrackId]);

  // Usar el trackId del estado global si no se proporciona uno como prop
  const contentId = propTrackId || currentTrackId || albumId;
  const contentType = albumId ? 'album' : 'track';

  if (!contentId) return null;

  const url = `https://open.spotify.com/embed/${contentType}/${contentId}?utm_source=generator&theme=${theme}${view !== 'standard' ? '&view=' + view : ''}${autoPlay ? '&autoplay=1' : ''}&referrer=spotify`;

  return (
    <iframe 
      src={url}
      width={width} 
      height={height} 
      frameBorder="0" 
      allowFullScreen 
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
      loading="lazy"
      className={className}
    />
  );
}
