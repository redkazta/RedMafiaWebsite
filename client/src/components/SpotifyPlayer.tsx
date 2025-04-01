import React from 'react';

interface SpotifyPlayerProps {
  playlistId?: string;
  trackId?: string;
  albumId?: string;
  artistId?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function SpotifyPlayer({
  playlistId,
  trackId,
  albumId,
  artistId,
  width = '100%',
  height = 352,
  className = ''
}: SpotifyPlayerProps) {
  // Construir la URL basada en el tipo de contenido
  let url = '';
  
  if (playlistId) {
    url = `https://open.spotify.com/embed/playlist/${playlistId}`;
  } else if (trackId) {
    url = `https://open.spotify.com/embed/track/${trackId}`;
  } else if (albumId) {
    url = `https://open.spotify.com/embed/album/${albumId}`;
  } else if (artistId) {
    url = `https://open.spotify.com/embed/artist/${artistId}`;
  }
  
  if (!url) return null;
  
  return (
    <div className={`spotify-player-container ${className}`}>
      <iframe 
        src={url} 
        width={typeof width === 'number' ? width : '100%'} 
        height={typeof height === 'number' ? height : 352} 
        frameBorder="0" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
        className="rounded-lg"
      ></iframe>
    </div>
  );
}