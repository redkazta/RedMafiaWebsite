
import { useState, useEffect } from "react";
import { Link } from "wouter";
import HeroSection from "@/components/HeroSection";
import { usePlayerStore } from "@/store/player";
import ReleasesSection from "@/components/ReleasesSection";
import NewsSection from "@/components/NewsSection";
import ConcertsSection from "@/components/ConcertsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { currentTrackId } = usePlayerStore();

  const { data: releases = [], isLoading: releasesLoading } = useQuery({
    queryKey: ['releases'],
    queryFn: async () => {
      const response = await fetch('/api/releases');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });

  const { data: news = [], isLoading: newsLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const response = await fetch('/api/news');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });

  const { data: concerts = [], isLoading: concertsLoading } = useQuery({
    queryKey: ['concerts'],
    queryFn: async () => {
      const response = await fetch('/api/concerts');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });

  const { data: gallery = [], isLoading: galleryLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const response = await fetch('/api/gallery');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <main>
        <div className="container mx-auto px-4">
          <section className="py-12">
            <h2 className="text-3xl font-bold text-red-600 mb-8">Últimos Lanzamientos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 bg-[#1E1E1E] p-6 rounded-lg">
                <h3 className="text-white text-xl mb-4">ALV Las Fresas - Último Lanzamiento</h3>
                <SpotifyPlayer 
                  trackId="2f1888daa2c9fb0e0f795974a458d0ae1d21df54"
                  className="w-full"
                  height={380}
                />
              </div>

              <div className="space-y-6">
                <div className="bg-[#1E1E1E] p-4 rounded-lg">
                  <h3 className="text-white text-lg mb-3">Red Mafia Hits</h3>
                  <SpotifyPlayer 
                    trackId="2f1888daa2c9fb0e0f795974a458d0ae1d21df54"
                    className="w-full"
                    height={180}
                    view="compact"
                  />
                </div>

                <div className="bg-[#1E1E1E] p-4 rounded-lg">
                  <h3 className="text-white text-lg mb-3">Red Mafia Trap Collection</h3>
                  <SpotifyPlayer 
                    trackId="9c11c16e4907b9c9ee31c8d70a702d4b92748de4"
                    className="w-full"
                    height={180}
                    view="compact"
                  />
                </div>

                <div className="bg-[#1E1E1E] p-4 rounded-lg">
                  <h3 className="text-white text-lg mb-3">Red Mafia Esenciales</h3>
                  <SpotifyPlayer 
                    trackId="df2b5f123d4624a7f62c1765e59d1cd8435a3477"
                    className="w-full"
                    height={180}
                    view="compact"
                  />
                </div>
              </div>
            </div>
          </section>

          {releasesLoading ? (
            <div>Cargando lanzamientos...</div>
          ) : releases.length > 0 ? (
            <ReleasesSection releases={releases} />
          ) : null}

          {newsLoading ? (
            <div>Cargando noticias...</div>
          ) : news.length > 0 ? (
            <NewsSection news={news} />
          ) : null}

          {concertsLoading ? (
            <div>Cargando conciertos...</div>
          ) : concerts.length > 0 ? (
            <ConcertsSection concerts={concerts} />
          ) : null}

          {!galleryLoading && gallery.length > 0 && <GallerySection gallery={gallery} />}
          <ContactSection />

          {/* Mini Player */}
          <div className="fixed bottom-4 left-4 z-50">
            <SpotifyPlayer 
              width={300}
              height={80}
              className="rounded-lg shadow-xl bg-black/90"
              view="minimal"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
