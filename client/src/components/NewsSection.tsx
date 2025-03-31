import { News } from '@shared/schema';

interface NewsSectionProps {
  news: News[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  // Si no tenemos datos aún, mostramos datos de ejemplo
  const newsData = news.length > 0 ? news : [
    {
      id: 1,
      title: "RED MAFIA ANUNCIA GIRA INTERNACIONAL PARA 2024",
      category: "ANUNCIO",
      date: "15 Mayo, 2023",
      content: "La banda mexicana comenzará su primera gira internacional abarcando más de 15 países en Latinoamérica y Europa.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "COLABORACIÓN SORPRESA CON ARTISTA INTERNACIONAL",
      category: "MÚSICA",
      date: "28 Abril, 2023",
      content: "Red Mafia anuncia una colaboración sorpresa que promete revolucionar la escena musical latina.",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "ENTREVISTA EXCLUSIVA: EL PROCESO CREATIVO DE \"SANGRE Y FUEGO\"",
      category: "ENTREVISTA",
      date: "10 Abril, 2023",
      content: "Conversamos con la banda sobre las inspiraciones y desafíos detrás de su nuevo álbum.",
      image: "https://images.unsplash.com/photo-1453738773917-9c3eff1db985?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <section id="noticias" className="py-16 px-4 bg-[#121212]">
      <div className="container mx-auto">
        <h2 className="font-['Bebas_Neue',cursive] text-4xl md:text-5xl text-[#F5F5F5] mb-2 tracking-wider">ÚLTIMAS <span className="text-[#FF0000]">NOTICIAS</span></h2>
        <div className="h-1 w-24 bg-[#FF0000] mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((item) => (
            <article key={item.id} className="news-item bg-[#1E1E1E] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="h-52 overflow-hidden">
                <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-xs text-[#FF0000] font-medium bg-[#FF0000]/10 px-3 py-1 rounded-full">{item.category}</span>
                  <span className="text-xs text-[#F5F5F5]/60 ml-3">{item.date}</span>
                </div>
                <h3 className="font-['Bebas_Neue',cursive] text-xl text-[#F5F5F5] mb-3">{item.title}</h3>
                <p className="text-[#F5F5F5]/70 text-sm mb-4">{item.content}</p>
                <a href="#" className="text-[#FF0000] hover:text-[#D10000] font-medium text-sm flex items-center transition-colors">
                  LEER MÁS <span className="material-icons ml-1 text-sm">arrow_forward</span>
                </a>
              </div>
            </article>
          ))}
        </div>
        
        {/* Sección estilo periódico */}
        <div className="mt-16 bg-[#1E1E1E] p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h3 className="font-['Bebas_Neue',cursive] text-3xl text-[#FF0000] mb-2">LA CRÓNICA ROJA</h3>
            <p className="text-[#F5F5F5]/70 italic">Las últimas noticias sobre Red Mafia y el mundo de la música</p>
          </div>
          
          <div className="news-paper text-[#121212] p-6 rounded bg-[#F5F5F5] bg-[linear-gradient(rgba(200,200,200,0.1)_1px,transparent_1px)] bg-[length:100%_2em]">
            <article className="mb-6 border-b border-gray-300 pb-6">
              <h4 className="font-['Bebas_Neue',cursive] text-2xl text-[#8B0000] mb-2">RED MAFIA ROMPE RÉCORDS DE STREAMING CON NUEVO ÁLBUM</h4>
              <p className="text-sm text-gray-600 mb-4">Por Alejandro Méndez | 2 Mayo, 2023</p>
              <p className="text-gray-800 mb-3">El nuevo álbum "Sangre y Fuego" ha superado todas las expectativas, posicionándose como uno de los lanzamientos más exitosos del año en plataformas digitales, con más de 10 millones de reproducciones en su primera semana.</p>
              <p className="text-gray-800">La crítica especializada destaca la evolución sonora de la banda mientras mantiene su esencia característica, combinando elementos tradicionales con innovadoras propuestas musicales que redefinen el género.</p>
            </article>
            
            <article>
              <h4 className="font-['Bebas_Neue',cursive] text-2xl text-[#8B0000] mb-2">DOCUMENTAL SOBRE LA TRAYECTORIA DE RED MAFIA SE ESTRENARÁ EN FESTIVAL DE CINE</h4>
              <p className="text-sm text-gray-600 mb-4">Por Carmen Rodríguez | 25 Abril, 2023</p>
              <p className="text-gray-800 mb-3">"Sangre, Sudor y Música", el documental que narra la historia de Red Mafia desde sus inicios en pequeños bares hasta llenar estadios, ha sido seleccionado para participar en el prestigioso Festival Internacional de Cine Documental.</p>
              <p className="text-gray-800">"Este documental es un testimonio de perseverancia y pasión por la música", comenta el director, quien tuvo acceso exclusivo a material de archivo nunca antes visto y entrevistas íntimas con todos los miembros de la banda.</p>
            </article>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center text-[#F5F5F5] hover:text-[#FF0000] transition-colors font-medium">
            VER TODAS LAS NOTICIAS
            <span className="material-icons ml-2">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
