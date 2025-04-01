
import { useState } from "react";
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
        
        {/* ÚLTIMO SINGLE */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">ÚLTIMO SINGLE</h3>
          <div className="w-full max-w-3xl mx-auto">
            <SpotifyPlayer 
              albumId="0LgauOCJwpPugwBRZhumCj"
              className="w-full"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Álbum Principal */}
          <div className="spotify-container">
            <h3 className="text-white text-xl mb-4">Último Álbum</h3>
            <Link to="/lanzamientos/1">
              <SpotifyPlayer 
                playlistId="3ojUCBn2gpPULJ9U6FjQIB"
                className="w-full"
              />
            </Link>
          </div>
          
          {/* Playlist de la Banda */}
          <div className="spotify-container">
            <h3 className="text-white text-xl mb-4">Playlist Oficial</h3>
            <Link to="/lanzamientos">
              <SpotifyPlayer 
                playlistId="3ojUCBn2gpPULJ9U6FjQIB"
                className="w-full"
              />
            </Link>
          </div>
          
          {/* Single Destacado */}
          <div className="spotify-container">
            <h3 className="text-white text-xl mb-4">Single Destacado</h3>
            <Link to="/lanzamientos/2">
              <SpotifyPlayer 
                playlistId="3ojUCBn2gpPULJ9U6FjQIB"
                className="w-full"
              />
            </Link>
          </div>
        </div>
      </div>

      {releasesLoading ? (
        <div>Cargando lanzamientos...</div>
      ) : (
        <ReleasesSection releases={releases} />
      )}
      
      {newsLoading ? (
        <div>Cargando noticias...</div>
      ) : (
        <NewsSection news={news} />
      )}
      
      {concertsLoading ? (
        <div>Cargando conciertos...</div>
      ) : (
        <ConcertsSection concerts={concerts} />
      )}
      
      {galleryLoading ? (
        <div>Cargando galería...</div>
      ) : (
        <GallerySection gallery={gallery} />
      )}
      <ContactSection />
    </div>
  );
}
