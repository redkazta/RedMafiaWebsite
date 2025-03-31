import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { News } from "@shared/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronLeft, Calendar, Tag } from "lucide-react";

export default function NewsDetail() {
  const { id } = useParams();

  const { data: newsItem, isLoading, error } = useQuery<News>({
    queryKey: [`/api/news/${id}`],
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <Link href="/noticias" className="inline-flex items-center text-[#F5F5F5] hover:text-[#FF0000] mb-6 transition-colors">
            <ChevronLeft size={20} />
            <span>Volver a Noticias</span>
          </Link>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF0000]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">
              Error al cargar la noticia
            </div>
          ) : newsItem ? (
            <article className="bg-[#1E1E1E] border border-[#950101] rounded-lg overflow-hidden shadow-xl max-w-4xl mx-auto">
              <div className="relative">
                <img 
                  src={newsItem.image} 
                  alt={newsItem.title}
                  className="w-full max-h-[400px] object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {newsItem.title}
                  </h1>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap items-center space-x-6 mb-8 text-[#F5F5F5]/80">
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-2" />
                    <span>{newsItem.date}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Tag size={18} className="mr-2" />
                    <span className="bg-[#950101] text-white px-2 py-1 rounded-full text-sm">
                      {newsItem.category}
                    </span>
                  </div>
                </div>
                
                <div className="prose prose-invert prose-red max-w-none">
                  <div className="text-[#F5F5F5] leading-relaxed text-lg">
                    {/* Dividir el contenido en párrafos para mejor visualización */}
                    {newsItem.content.split('. ').map((paragraph, index) => (
                      <p key={index}>{paragraph}.</p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ) : (
            <div className="text-center text-[#F5F5F5] py-10">
              No se encontró la noticia
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}