import React, { useEffect } from 'react';

interface SpotifyPlayerProps {
  playlistId?: string;
  trackId?: string;
  albumId?: string;
  artistId?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  mini?: boolean; // Added mini prop
}

export default function SpotifyPlayer({
  playlistId,
  trackId,
  albumId,
  artistId,
  width = '100%',
  height = 352,
  className = '',
  mini = false, // Added mini prop
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

  useEffect(() => {
    if (trackId || albumId || playlistId) {
      // Dispatch event when track changes
      const event = new CustomEvent('trackChange', { 
        detail: { 
          trackId,
          albumId,
          playlistId,
          isPlaying: true,
          title: "ALV Las Fresas",
          artist: "RED MAFIA",
          audioSrc: "https://open.spotify.com/intl-es/album/0LgauOCJwpPugwBRZhumCj",
          coverImage: "https://i.scdn.co/image/ab67616d0000b273d8601e7e6ede248c1bf8c662",
          guadalajaraReference: "Trap duro desde Guadalajara"
        } 
      });
      window.dispatchEvent(event);
    }
  }, [trackId, albumId, playlistId]);

  return (
    <div className={`spotify-player-container ${className}`}>
      <iframe 
        src={`${url}${mini ? '?view=minimal' : ''}`}
        width={typeof width === 'number' ? width : '100%'} 
        height={typeof height === 'number' ? height : 352} 
        frameBorder="0" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
        className={`rounded-lg ${mini ? 'mini-player' : ''}`}
      ></iframe>
    </div>
  );
}