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
import { usePlayerStore } from "@/store/player";

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
          <div className="py-8">
            <div className="mb-8">
              <h3 className="text-white text-xl mb-4">Red Mafia Hits</h3>
              <SpotifyPlayer 
                trackId="0LgauOCJwpPugwBRZhumCj"
                className="w-full"
                height={180}
                view="compact"
              />
            </div>
          </div>
        </div>

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
      </main>
    </div>
  );
}