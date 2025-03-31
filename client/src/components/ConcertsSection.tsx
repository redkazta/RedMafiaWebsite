import { Concert } from '@shared/schema';

interface ConcertsSectionProps {
  concerts: Concert[];
}

export default function ConcertsSection({ concerts }: ConcertsSectionProps) {
  // Si no tenemos datos aún, mostramos datos de ejemplo
  const concertData = concerts.length > 0 ? concerts : [
    {
      id: 1,
      date: "15",
      month: "MAY",
      year: "2023",
      title: "FESTIVAL ROCK EN ROJO",
      venue: "Teatro Metropolitano, Ciudad de México",
      doors: "19:00",
      start: "21:00",
      tags: ["Principal", "Nuevo álbum"]
    },
    {
      id: 2,
      date: "22",
      month: "JUN",
      year: "2023",
      title: "GIRA SANGRE Y FUEGO",
      venue: "Auditorio Nacional, Guadalajara",
      doors: "18:30",
      start: "20:30",
      tags: ["Gira nacional"]
    },
    {
      id: 3,
      date: "05",
      month: "JUL",
      year: "2023",
      title: "RED MAFIA UNPLUGGED",
      venue: "Centro Cultural, Monterrey",
      doors: "19:00",
      start: "20:00",
      tags: ["Acústico", "Especial"]
    }
  ];

  return (
    <section id="presentaciones" className="py-16 px-4 bg-gradient-to-b from-[#121212] to-[#1E1E1E]">
      <div className="container mx-auto">
        <h2 className="font-['Bebas_Neue',cursive] text-4xl md:text-5xl text-[#F5F5F5] mb-2 tracking-wider">PRÓXIMAS <span className="text-[#FF0000]">PRESENTACIONES</span></h2>
        <div className="h-1 w-24 bg-[#FF0000] mb-12"></div>
        
        <div className="space-y-6">
          {concertData.map((concert) => (
            <div key={concert.id} className="concert-item bg-[#121212] border border-[#950101] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_15px_-3px_rgba(149,1,1,0.3)]">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 p-6 flex flex-col justify-center items-center md:items-start bg-[#2D0000]">
                  <span className="font-['Bebas_Neue',cursive] text-4xl text-[#F5F5F5]">{concert.date}</span>
                  <span className="font-medium text-[#F5F5F5]/80">{concert.month} {concert.year}</span>
                </div>
                <div className="md:w-2/4 p-6">
                  <h3 className="font-['Bebas_Neue',cursive] text-2xl text-[#FF0000] mb-2">{concert.title}</h3>
                  <p className="text-[#F5F5F5]/90 mb-2">{concert.venue}</p>
                  <p className="text-[#F5F5F5]/70 text-sm">Apertura de puertas: {concert.doors} | Inicio: {concert.start}</p>
                  <div className="mt-4 flex space-x-2">
                    {concert.tags.map((tag, index) => (
                      <span key={index} className="inline-block bg-[#FF0000]/20 text-[#FF0000] text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/4 p-6 flex items-center justify-center md:justify-end">
                  <a href="#" className="border-2 border-[#FF0000] hover:bg-[#FF0000] text-[#F5F5F5] px-6 py-2 rounded font-medium transition-colors">
                    BOLETOS
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a href="#" className="inline-block bg-[#950101] hover:bg-[#FF0000] text-[#F5F5F5] px-8 py-3 rounded-md font-medium transition-colors shadow-lg">
            VER TODOS LOS EVENTOS
          </a>
        </div>
      </div>
    </section>
  );
}
