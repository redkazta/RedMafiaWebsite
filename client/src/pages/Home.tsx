import { useState, useEffect } from "react";
import { Link } from "wouter";
import HeroSection from "@/components/HeroSection";
import ReleasesSection from "@/components/ReleasesSection";
import NewsSection from "@/components/NewsSection";
import ConcertsSection from "@/components/ConcertsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data: releases, isLoading: releasesLoading } = useQuery({
    queryKey: ['releases'],
    queryFn: async () => {
      const response = await fetch('/api/releases');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });

  const { data: news, isLoading: newsLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const response = await fetch('/api/news');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });

  const { data: concerts, isLoading: concertsLoading } = useQuery({
    queryKey: ['concerts'],
    queryFn: async () => {
      const response = await fetch('/api/concerts');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });

  const { data: gallery, isLoading: galleryLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const response = await fetch('/api/gallery');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1c0000]">
      <HeroSection />

      {/* Sección de Spotify Players */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-red-600 mb-8">Nuestra Música</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ALV Las Fresas */}
          <div className="spotify-container md:col-span-2">
            <h3 className="text-white text-xl mb-4">ALV Las Fresas - Último Lanzamiento</h3>
            <SpotifyPlayer 
              trackId="0LgauOCJwpPugwBRZhumCj"
              className="w-full"
              height={380}
            />
          </div>

          {/* Playlists */}
          <div className="spotify-container space-y-8">
            <div>
              <h3 className="text-white text-xl mb-4">Playlist Oficial</h3>
              <SpotifyPlayer 
                playlistId="3ojUCBn2gpPULJ9U6FjQIB"
                className="w-full"
                height={180}
              />
            </div>

            <div>
              <h3 className="text-white text-xl mb-4">Red Mafia Hits</h3>
              <SpotifyPlayer 
                playlistId="3ojUCBn2gpPULJ9U6FjQIB"
                className="w-full"
                height={180}
              />
            </div>
          </div>
        </div>
      </div>

      {releasesLoading ? (
        <div>Cargando lanzamientos...</div>
      ) : releases ? (
        <ReleasesSection releases={releases} />
      ) : null}
      
      {newsLoading ? (
        <div>Cargando noticias...</div>
      ) : news ? (
        <NewsSection news={news} />
      ) : null}
      
      {concertsLoading ? (
        <div>Cargando conciertos...</div>
      ) : concerts ? (
        <ConcertsSection concerts={concerts} />
      ) : null}
      
      {gallery && <GallerySection gallery={gallery} />}
      <ContactSection />
      
      {/* Spotify Mini Player */}
      <div className="fixed bottom-4 left-4 z-50">
        <iframe 
          src="https://open.spotify.com/embed/track/0LgauOCJwpPugwBRZhumCj?utm_source=generator&theme=0" 
          width="300" 
          height="80" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          className="rounded-lg shadow-xl bg-black/90"
        />
      </div>
    </div>
  );
}