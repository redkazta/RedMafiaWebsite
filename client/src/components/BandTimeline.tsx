import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Music, Users, Award, Calendar } from "lucide-react";

export interface TimelineEvent {
  id: string | number;
  date: string; // Fecha en formato "YYYY-MM-DD" o "YYYY"
  title: string;
  description: string;
  category: "album" | "member" | "award" | "concert" | "milestone" | "other";
  image?: string;
  link?: {
    url: string;
    label: string;
  };
  location?: string;
}

interface BandTimelineProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
}

export default function BandTimeline({
  events,
  title = "NUESTRA HISTORIA",
  subtitle = "Desde nuestros inicios hasta hoy"
}: BandTimelineProps) {
  // Estados
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [expandedEvents, setExpandedEvents] = useState<Set<string | number>>(new Set());
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<TimelineEvent[]>(events);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Referencias
  const timelineRef = useRef<HTMLDivElement>(null);
  const eventRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());
  
  // Ordenar eventos por fecha
  useEffect(() => {
    const sortedEvents = [...events].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    setFilteredEvents(sortedEvents);
  }, [events]);
  
  // Aplicar filtros
  useEffect(() => {
    if (!activeFilter) {
      setFilteredEvents([...events].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }));
    } else {
      const filtered = events.filter(event => event.category === activeFilter);
      setFilteredEvents([...filtered].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }));
    }
  }, [activeFilter, events]);
  
  // Efecto de desplazamiento para que los eventos aparezcan
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      
      const timelineElement = timelineRef.current;
      if (!timelineElement) return;
      
      const timelineRect = timelineElement.getBoundingClientRect();
      const timelineTop = timelineRect.top;
      const timelineBottom = timelineRect.bottom;
      const windowHeight = window.innerHeight;
      
      // Verificar si la línea de tiempo está en la ventana
      if (timelineTop < windowHeight && timelineBottom > 0) {
        eventRefs.current.forEach((eventElement, id) => {
          const rect = eventElement.getBoundingClientRect();
          if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
            eventElement.classList.add("animate-fadeIn");
            eventElement.classList.add("opacity-100");
          }
        });
      }
      
      // Reiniciar el estado de desplazamiento después de un retraso
      setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };
    
    window.addEventListener("scroll", handleScroll);
    // Llamar una vez al montar para verificar los elementos visibles inicialmente
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Manejar clic en un evento
  const toggleEventExpansion = (eventId: string | number) => {
    setExpandedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };
  
  // Manejar clic en filtro
  const handleFilterClick = (filter: string) => {
    setActiveFilter(prev => (prev === filter ? null : filter));
  };
  
  // Función para obtener el año de una fecha
  const getYear = (dateString: string) => {
    return dateString.split("-")[0];
  };
  
  // Agrupar eventos por año
  const groupEventsByYear = (events: TimelineEvent[]) => {
    const groupedEvents: { [year: string]: TimelineEvent[] } = {};
    
    events.forEach(event => {
      const year = getYear(event.date);
      if (!groupedEvents[year]) {
        groupedEvents[year] = [];
      }
      groupedEvents[year].push(event);
    });
    
    return groupedEvents;
  };
  
  const eventsByYear = groupEventsByYear(filteredEvents);
  const years = Object.keys(eventsByYear).sort();
  
  // Obtener el icono para cada categoría
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "album":
        return <Music className="text-[#FF0000]" />;
      case "member":
        return <Users className="text-[#950101]" />;
      case "award":
        return <Award className="text-amber-500" />;
      case "concert":
        return <Calendar className="text-[#FF3333]" />;
      default:
        return <Calendar className="text-[#F5F5F5]" />;
    }
  };
  
  // Obtener el texto de la categoría
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "album":
        return "Álbum";
      case "member":
        return "Miembro";
      case "award":
        return "Premio";
      case "concert":
        return "Concierto";
      case "milestone":
        return "Hito";
      default:
        return "Evento";
    }
  };
  
  // Formatear fecha para mostrar
  const formatDate = (dateString: string) => {
    if (dateString.length === 4) return dateString; // Solo año
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  };
  
  return (
    <div className="w-full py-12 px-4 md:px-8 bg-[#0A0A0A]">
      {/* Encabezado de la línea de tiempo */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h2 className="red-mafia-title text-4xl md:text-5xl mb-4">{title}</h2>
        <p className="text-[#F5F5F5]/70 text-lg md:text-xl">{subtitle}</p>
        
        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeFilter
                ? "bg-[#950101] text-white"
                : "bg-[#1A1A1A] text-[#F5F5F5]/70 hover:bg-[#2A1010]"
            }`}
          >
            Todos
          </button>
          {["album", "member", "award", "concert", "milestone"].map(category => (
            <button
              key={category}
              onClick={() => handleFilterClick(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                activeFilter === category
                  ? "bg-[#950101] text-white"
                  : "bg-[#1A1A1A] text-[#F5F5F5]/70 hover:bg-[#2A1010]"
              }`}
            >
              {getCategoryIcon(category)}
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Línea de tiempo */}
      <div ref={timelineRef} className="max-w-6xl mx-auto relative">
        {/* Línea central vertical */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#950101]/70 via-[#FF0000]/50 to-[#950101]/30"></div>
        
        {/* Eventos por año */}
        {years.map((year, yearIndex) => (
          <div key={year} className="mb-16">
            {/* Marcador de año */}
            <div className="relative flex justify-center items-center mb-8">
              <div className="absolute left-6 md:left-1/2 w-8 h-8 bg-[#950101] rounded-full transform -translate-x-1/2 md:-translate-x-4 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(255,0,0,0.3)]">
                <span className="text-white font-bold text-xs">{year}</span>
              </div>
              <h3 className="text-3xl red-mafia-title ml-12 md:ml-0 text-center">{year}</h3>
            </div>
            
            {/* Eventos del año */}
            {eventsByYear[year].map((event, eventIndex) => {
              const isExpanded = expandedEvents.has(event.id);
              const isEven = eventIndex % 2 === 0;
              
              return (
                <div
                  key={event.id}
                  ref={el => {
                    if (el) eventRefs.current.set(event.id, el);
                  }}
                  className={`relative mb-12 opacity-0 transition-all duration-500 ${
                    isEven ? "md:ml-[50%]" : "md:mr-[50%] md:text-right"
                  }`}
                >
                  {/* Línea horizontal y punto */}
                  <div className={`hidden md:block absolute top-6 ${
                    isEven ? "left-0" : "right-0"
                  } w-[calc(50px)] h-0.5 bg-[#950101]/50`}></div>
                  
                  <div className={`absolute top-5 ${
                    isEven ? "left-[-12px] md:left-[-12px]" : "left-[0px] md:right-[-12px]"
                  } w-6 h-6 rounded-full border-2 border-[#950101] bg-[#1E1E1E] z-10`}></div>
                  
                  {/* Contenido del evento */}
                  <div
                    className={`ml-10 md:ml-0 p-4 bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#2D0000] rounded-lg shadow-lg hover:shadow-[0_4px_20px_rgba(255,0,0,0.15)] transition-all duration-300 ${
                      isExpanded ? "transform md:scale-105" : ""
                    }`}
                  >
                    {/* Contenido principal */}
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleEventExpansion(event.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`flex items-center gap-2 ${isEven ? "" : "md:flex-row-reverse"}`}>
                          <span className="px-2 py-0.5 text-xs font-medium rounded bg-[#2D0000] text-[#F5F5F5]/80">
                            {formatDate(event.date)}
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${
                            event.category === "album" ? "bg-[#950101]/30 text-[#FF0000]" :
                            event.category === "award" ? "bg-amber-900/30 text-amber-500" :
                            event.category === "concert" ? "bg-[#2D0000] text-[#FF3333]" :
                            "bg-[#2D0000] text-[#F5F5F5]/80"
                          }`}>
                            {getCategoryIcon(event.category)}
                            <span className="ml-1">{getCategoryLabel(event.category)}</span>
                          </span>
                        </div>
                        
                        <button
                          className="text-[#F5F5F5]/70 hover:text-[#FF0000] transition-colors"
                          aria-label={isExpanded ? "Colapsar" : "Expandir"}
                        >
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                      </div>
                      
                      <h4 className="text-xl font-bold text-[#FF0000] mb-2">{event.title}</h4>
                      
                      {/* Previsualización de la descripción (visible siempre) */}
                      <p className="text-[#F5F5F5]/80 line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                    
                    {/* Contenido expandido */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-[#2D0000] animate-fadeIn">
                        {event.image && (
                          <div className="mb-4 rounded-md overflow-hidden shadow-md">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}
                        
                        <p className="text-[#F5F5F5] mb-4">{event.description}</p>
                        
                        {event.location && (
                          <p className="text-[#F5F5F5]/70 mb-2">
                            <strong>Ubicación:</strong> {event.location}
                          </p>
                        )}
                        
                        {event.link && (
                          <a
                            href={event.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#950101] hover:bg-[#FF0000] text-white px-4 py-2 rounded-md transition-colors mt-2"
                          >
                            {event.link.label}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Indicador de inicio */}
        <div className="absolute left-6 md:left-1/2 top-[-20px] w-8 h-8 bg-[#950101] rounded-full transform -translate-x-1/2 md:-translate-x-4 flex items-center justify-center shadow-[0_0_15px_rgba(255,0,0,0.4)]">
          <span className="text-white font-bold">•</span>
        </div>
        
        {/* Indicador de fin (presente) */}
        <div className="absolute left-6 md:left-1/2 bottom-[-40px] transform -translate-x-1/2 md:-translate-x-4 text-center">
          <div className="w-10 h-10 bg-[#FF0000] rounded-full mx-auto flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(255,0,0,0.4)]">
            <span className="text-white font-bold text-xs">HOY</span>
          </div>
          <p className="text-[#F5F5F5]/70 text-sm">Presente</p>
        </div>
      </div>
    </div>
  );
}