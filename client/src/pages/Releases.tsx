import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Release } from "@shared/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Releases() {
  const { data: releases, isLoading, error } = useQuery<Release[]>({
    queryKey: ['/api/releases'],
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#FF0000] mb-8 text-center border-b-2 border-[#950101] pb-4">
            LANZAMIENTOS
          </h1>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF0000]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">
              Error al cargar los lanzamientos
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {releases?.map((release) => (
                <Link 
                  href={`/lanzamientos/${release.id}`} 
                  key={release.id}
                  className="block group"
                >
                  <div className="bg-[#1E1E1E] border border-[#950101] rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
                    <div className="relative">
                      <img 
                        src={release.coverImage} 
                        alt={release.title}
                        className="w-full h-60 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <span className="text-white text-lg font-semibold px-4 py-2 rounded-full border-2 border-white">
                          Ver Detalles
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-bold text-[#FF0000]">{release.title}</h2>
                        <span className="text-sm text-[#F5F5F5] bg-[#950101] px-2 py-1 rounded">
                          {release.type}
                        </span>
                      </div>
                      <p className="text-[#F5F5F5]/80 text-sm mb-3 line-clamp-2">
                        {release.description}
                      </p>
                      <div className="flex justify-between items-center text-[#F5F5F5]/60 text-sm">
                        <span>{release.year}</span>
                        <span>{release.tracks} pistas</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}