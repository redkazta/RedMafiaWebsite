import { useQuery } from "@tanstack/react-query";
import { Concert } from "@shared/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";

export default function Concerts() {
  const { data: concerts, isLoading, error } = useQuery<Concert[]>({
    queryKey: ['/api/concerts'],
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#FF0000] mb-8 text-center border-b-2 border-[#950101] pb-4">
            PRESENTACIONES
          </h1>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF0000]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">
              Error al cargar las presentaciones
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
              {concerts?.map((concert) => (
                <div 
                  key={concert.id}
                  className="bg-[#1E1E1E] border border-[#950101] rounded-lg overflow-hidden shadow-lg p-6 transform transition-transform duration-300 hover:-translate-x-2"
                >
                  <div className="md:flex">
                    <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6 flex flex-col items-center justify-center bg-[#2D0000] p-4 rounded-lg">
                      <span className="text-3xl font-bold text-[#FF0000]">{concert.date}</span>
                      <span className="text-xl text-[#F5F5F5]">{concert.month}</span>
                      <span className="text-sm text-[#F5F5F5]/70">{concert.year}</span>
                    </div>
                    
                    <div className="md:w-3/4">
                      <h2 className="text-2xl font-bold text-[#FF0000] mb-3">{concert.title}</h2>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-start">
                          <MapPin size={18} className="text-[#F5F5F5]/60 mr-2 mt-0.5" />
                          <span className="text-[#F5F5F5]">{concert.venue}</span>
                        </div>
                        
                        <div className="flex items-start">
                          <Clock size={18} className="text-[#F5F5F5]/60 mr-2 mt-0.5" />
                          <div>
                            <p className="text-[#F5F5F5]">
                              Puertas: <span className="text-[#F5F5F5]/70">{concert.doors}</span>
                            </p>
                            <p className="text-[#F5F5F5]">
                              Inicio: <span className="text-[#F5F5F5]/70">{concert.start}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {concert.tags && concert.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {concert.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="bg-[#950101] text-[#F5F5F5] text-xs px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <button className="bg-[#950101] hover:bg-[#FF0000] transition-colors px-4 py-2 rounded-md text-[#F5F5F5] flex items-center">
                        <Ticket size={16} className="mr-2" />
                        Comprar boletos
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}