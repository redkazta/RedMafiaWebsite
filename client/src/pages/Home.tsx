import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ReleasesSection from '@/components/ReleasesSection';
import ConcertsSection from '@/components/ConcertsSection';
import NewsSection from '@/components/NewsSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  // Fetch content from backend
  const { data: concerts } = useQuery({
    queryKey: ['/api/concerts'],
  });

  const { data: releases } = useQuery({
    queryKey: ['/api/releases'],
  });

  const { data: news } = useQuery({
    queryKey: ['/api/news'],
  });

  const { data: gallery } = useQuery({
    queryKey: ['/api/gallery'],
  });

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5] font-['Montserrat',sans-serif]">
      <Navbar />
      <main>
        <HeroSection />
        <ReleasesSection releases={releases || []} />
        <ConcertsSection concerts={concerts || []} />
        <NewsSection news={news || []} />
        <GallerySection gallery={gallery || []} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
