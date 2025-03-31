import { Release } from '@shared/schema';

interface ReleasesSectionProps {
  releases: Release[];
}

export default function ReleasesSection({ releases }: ReleasesSectionProps) {
  // Si no tenemos datos aún, mostramos datos de ejemplo
  const releaseData = releases.length > 0 ? releases : [
    {
      id: 1,
      title: "SANGRE Y FUEGO",
      type: "Álbum",
      year: "2023",
      tracks: 12,
      description: "Nuestro último lanzamiento explora nuevas dimensiones sonoras mientras mantiene la esencia que nos caracteriza.",
      coverImage: "https://images.unsplash.com/photo-1544656376-ffe19d4b7353?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "NOCHE ETERNA",
      type: "Sencillo",
      year: "2023",
      tracks: 1,
      description: "Un adelanto exclusivo de nuestro próximo proyecto con un sonido más íntimo y personal.",
      coverImage: "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "RAÍCES",
      type: "EP",
      year: "2022",
      tracks: 5,
      description: "Una colección de canciones que rinden homenaje a nuestros orígenes y primeras influencias.",
      coverImage: "https://images.unsplash.com/photo-1504509546545-e000b4a62425?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <section id="lanzamientos" className="py-16 px-4 bg-[#121212]">
      <div className="container mx-auto">
        <h2 className="font-['Bebas_Neue',cursive] text-4xl md:text-5xl text-[#F5F5F5] mb-2 tracking-wider">ÚLTIMOS <span className="text-[#FF0000]">LANZAMIENTOS</span></h2>
        <div className="h-1 w-24 bg-[#FF0000] mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {releaseData.map((release) => (
            <div key={release.id} className="album-card bg-[#1E1E1E] p-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
              <div className="mb-6 overflow-hidden rounded-md">
                <img 
                    src={release.coverImage}
                    alt={`Álbum: ${release.title}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-['Bebas_Neue',cursive] text-2xl text-[#FF0000] mb-2">{release.title}</h3>
              <p className="text-[#F5F5F5]/70 text-sm mb-4">{release.type} · {release.tracks} canciones · {release.year}</p>
              <p className="text-[#F5F5F5]/90 mb-6">{release.description}</p>
              <div className="flex space-x-4">
                <a href="#" className="bg-[#2D0000] hover:bg-[#FF0000] text-[#F5F5F5] px-4 py-2 rounded text-sm font-medium transition-colors">
                  ESCUCHAR
                </a>
                <a href="#" className="text-[#F5F5F5] hover:text-[#FF0000] text-sm font-medium transition-colors flex items-center">
                  VER DETALLES <span className="material-icons ml-1 text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center text-[#F5F5F5] hover:text-[#FF0000] transition-colors font-medium">
            VER DISCOGRAFÍA COMPLETA
            <span className="material-icons ml-2">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
