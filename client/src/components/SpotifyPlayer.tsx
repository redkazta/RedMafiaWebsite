
import React from 'react';

interface SpotifyPlayerProps {
  trackId?: string;
  albumId?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  theme?: string;
  view?: 'compact' | 'basic' | 'list';
  autoPlay?: boolean;
}

export default function SpotifyPlayer({
  trackId,
  albumId,
  width = '100%',
  height = 352,
  className = '',
  theme = 'dark',
  view = 'list',
  autoPlay = false
}: SpotifyPlayerProps) {
  const contentId = trackId || albumId;
  const contentType = albumId ? 'album' : 'playlist';
  
  if (!contentId) return null;

  // Use the official Spotify embed format
  const embedUrl = `https://open.spotify.com/embed/${contentType}/${contentId}`;

  // Emit event for player synchronization
  const handleLoad = () => {
    window.dispatchEvent(new CustomEvent('spotifyPlayerChange', { 
      detail: { 
        contentId,
        contentType,
        isPlaying: true 
      } 
    }));
  };
  
  return (
    <iframe
      style={{ borderRadius: '12px' }}
      src={embedUrl}
      width={width}
      height={height}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className={className}
      onLoad={handleLoad}
    />
  );
}
