
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ReleasesSection from "@/components/ReleasesSection";
import NewsSection from "@/components/NewsSection";
import ConcertsSection from "@/components/ConcertsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import SpotifyPlayer from "@/components/SpotifyPlayer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1c0000]">
      <HeroSection />
      
      {/* Sección de Spotify Players */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-red-600 mb-8">Nuestra Música</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Álbum Principal */}
          <div className="spotify-container">
            <h3 className="text-white text-xl mb-4">Último Álbum</h3>
            <SpotifyPlayer 
              albumId="1DFixLWuPkv3KT3TnV35m3"
              className="w-full"
            />
          </div>
          
          {/* Playlist de la Banda */}
          <div className="spotify-container">
            <h3 className="text-white text-xl mb-4">Playlist Oficial</h3>
            <SpotifyPlayer 
              playlistId="3ojUCBn2gpPULJ9U6FjQIB"
              className="w-full"
            />
          </div>
          
          {/* Single Destacado */}
          <div className="spotify-container">
            <h3 className="text-white text-xl mb-4">Single Destacado</h3>
            <SpotifyPlayer 
              trackId="0VjIjW4GlUZAMYd2vXMi3b"
              className="w-full"
            />
          </div>
        </div>
      </div>

      <ReleasesSection />
      <NewsSection />
      <ConcertsSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
}
