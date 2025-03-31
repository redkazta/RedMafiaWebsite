import { GalleryItem } from '@shared/schema';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  // Si no tenemos datos aún, mostramos datos de ejemplo
  const galleryData = gallery.length > 0 ? gallery : [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Concierto Auditorio Nacional"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Backstage - Gira 2022"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Sesión de grabación - Nuevo álbum"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Fans en Festival Rock en Rojo"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Escenario - Tour Sangre y Fuego"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1614153733626-ed28a8b73cb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Ensayo previo a gira"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Sesión fotográfica - Prensa"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      title: "Entrevista para Canal Music+"
    }
  ];

  return (
    <section id="galeria" className="py-16 px-4 bg-gradient-to-b from-[#1E1E1E] to-[#121212]">
      <div className="container mx-auto">
        <h2 className="font-['Bebas_Neue',cursive] text-4xl md:text-5xl text-[#F5F5F5] mb-2 tracking-wider">GALERÍA <span className="text-[#FF0000]">MULTIMEDIA</span></h2>
        <div className="h-1 w-24 bg-[#FF0000] mb-12"></div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryData.map((item) => (
            <div key={item.id} className="relative overflow-hidden rounded-lg group">
              <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-[#F5F5F5] text-sm font-medium">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a href="#" className="inline-block bg-[#950101] hover:bg-[#FF0000] text-[#F5F5F5] px-8 py-3 rounded-md font-medium transition-colors shadow-lg">
            VER GALERÍA COMPLETA
          </a>
        </div>
      </div>
    </section>
  );
}
