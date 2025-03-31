import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { News as NewsType } from "@shared/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User, Tag } from "lucide-react";

export default function News() {
  const { data: newsItems, isLoading, error } = useQuery<NewsType[]>({
    queryKey: ['/api/news'],
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#FF0000] mb-8 text-center border-b-2 border-[#950101] pb-4">
            NOTICIAS
          </h1>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF0000]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">
              Error al cargar las noticias
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems?.map((newsItem) => (
                <Link 
                  href={`/noticias/${newsItem.id}`} 
                  key={newsItem.id}
                  className="block group"
                >
                  <article className="bg-[#1E1E1E] border border-[#950101] rounded-lg overflow-hidden shadow-lg h-full flex flex-col transform transition-transform duration-300 hover:-translate-y-2">
                    <div className="relative">
                      <img 
                        src={newsItem.image} 
                        alt={newsItem.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-[#950101] text-white px-3 py-1 text-sm">
                        {newsItem.category}
                      </div>
                    </div>
                    
                    <div className="p-4 flex-grow flex flex-col">
                      <h2 className="text-xl font-bold text-[#FF0000] mb-2">{newsItem.title}</h2>
                      
                      <p className="text-[#F5F5F5]/80 text-sm mb-4 line-clamp-3 flex-grow">
                        {newsItem.content}
                      </p>
                      
                      <div className="flex items-center text-[#F5F5F5]/60 text-sm">
                        <Calendar size={14} className="mr-1" />
                        <span>{newsItem.date}</span>
                      </div>
                    </div>
                    
                    <div className="px-4 py-3 bg-[#2D0000] text-center text-[#F5F5F5] text-sm font-medium">
                      Leer más
                    </div>
                  </article>
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