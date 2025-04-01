import React from 'react';

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
  trackId,
  albumId,
  width = '100%',
  height = 352,
  className = '',
  theme = '0',
  view = 'standard',
  autoPlay = false
}: SpotifyPlayerProps) {
  const contentId = trackId || albumId;
  const contentType = albumId ? 'album' : 'track';

  if (!contentId) return null;

  const url = `https://open.spotify.com/embed/${contentType}/${contentId}?utm_source=generator&theme=${theme}${view !== 'standard' ? '&view=' + view : ''}${autoPlay ? '&autoplay=1' : ''}`;

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