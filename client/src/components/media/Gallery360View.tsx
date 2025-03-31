import { useState, useEffect, useRef, MouseEvent } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  RotateCcw, 
  Info, 
  Share2 
} from 'lucide-react';

interface Gallery360ViewProps {
  images: {
    id: string | number;
    src: string;
    alt?: string;
    info?: string;
  }[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export default function Gallery360View({
  images,
  isOpen,
  onClose,
  initialIndex = 0
}: Gallery360ViewProps) {
  // Estados para el control de la galería
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [showInfo, setShowInfo] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  
  // Referencias
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const autoRotateTimerRef = useRef<number | null>(null);
  
  // Obtener la imagen actual
  const currentImage = images[currentIndex];
  
  // Efectos
  useEffect(() => {
    // Reiniciar estados cuando cambia la imagen
    setRotation(0);
    setZoom(1);
    setImagePosition({ x: 0, y: 0 });
    setShowInfo(false);
    
    // Detener autorotación
    if (autoRotateTimerRef.current) {
      window.clearInterval(autoRotateTimerRef.current);
      autoRotateTimerRef.current = null;
    }
    
    // Reiniciar autorotación si estaba activa
    if (isAutoRotating) {
      startAutoRotate();
    }
  }, [currentIndex]);
  
  // Efecto para gestionar las teclas de navegación
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          navigateToPrev();
          break;
        case 'ArrowRight':
          navigateToNext();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      
      // Limpiar autorotación al desmontar
      if (autoRotateTimerRef.current) {
        window.clearInterval(autoRotateTimerRef.current);
        autoRotateTimerRef.current = null;
      }
    };
  }, [isOpen, currentIndex]);
  
  // Efecto para gestionar el bloqueo del scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Funciones de navegación
  const navigateToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const navigateToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  // Funciones de rotación
  const rotateClockwise = () => {
    setRotation((prev) => prev + 90);
  };
  
  const rotateCounterClockwise = () => {
    setRotation((prev) => prev - 90);
  };
  
  // Funciones de zoom
  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };
  
  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };
  
  // Funciones para arrastrar la imagen
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      setImagePosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Compartir imagen
  const shareImage = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: currentImage.alt || 'Imagen de RED MAFIA',
          text: currentImage.info || 'Mira esta imagen de RED MAFIA',
          url: window.location.href,
        });
      } else {
        // Fallback para navegadores que no soportan Web Share API
        navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles');
      }
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };
  
  // Auto-rotación
  const toggleAutoRotate = () => {
    if (isAutoRotating) {
      if (autoRotateTimerRef.current) {
        window.clearInterval(autoRotateTimerRef.current);
        autoRotateTimerRef.current = null;
      }
      setIsAutoRotating(false);
    } else {
      startAutoRotate();
      setIsAutoRotating(true);
    }
  };
  
  const startAutoRotate = () => {
    if (autoRotateTimerRef.current) {
      window.clearInterval(autoRotateTimerRef.current);
    }
    
    autoRotateTimerRef.current = window.setInterval(() => {
      setRotation((prev) => prev + 5);
    }, 100);
  };
  
  // Aplicar estilos a la imagen
  const imageStyles = {
    transform: `rotate(${rotation}deg) scale(${zoom})`,
    transition: isDragging ? 'none' : 'transform 0.3s ease',
    transformOrigin: 'center center',
    cursor: zoom > 1 ? 'grab' : 'auto',
    translate: `${imagePosition.x}px ${imagePosition.y}px`,
  };
  
  // Si no está abierto, no renderizar nada
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* Contenedor principal */}
      <div
        ref={containerRef}
        className="relative w-full h-full flex flex-col items-center justify-center"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Barra superior con controles */}
        <div className="absolute top-0 left-0 right-0 bg-[#1A0A0A]/80 backdrop-blur-md p-4 flex justify-between items-center z-10">
          <h3 className="text-white font-bold text-xl truncate flex-1">
            {currentImage.alt || `Imagen ${currentIndex + 1} de ${images.length}`}
          </h3>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleAutoRotate}
              className={`p-2 rounded-full ${isAutoRotating ? 'bg-[#950101] text-white' : 'text-white/70 hover:bg-[#950101]/30'} transition-colors`}
              title={isAutoRotating ? "Detener rotación" : "Iniciar rotación automática"}
            >
              {isAutoRotating ? <RotateCw /> : <RotateCw />}
            </button>
            
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={`p-2 rounded-full ${showInfo ? 'bg-[#950101] text-white' : 'text-white/70 hover:bg-[#950101]/30'} transition-colors`}
              title="Mostrar información"
            >
              <Info />
            </button>
            
            <button
              onClick={shareImage}
              className="p-2 rounded-full text-white/70 hover:bg-[#950101]/30 transition-colors"
              title="Compartir"
            >
              <Share2 />
            </button>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full text-white/70 hover:bg-[#950101] hover:text-white transition-colors"
              title="Cerrar"
            >
              <X />
            </button>
          </div>
        </div>
        
        {/* Área de la imagen */}
        <div className="relative h-[calc(100%-160px)] w-full flex items-center justify-center overflow-hidden">
          <img
            ref={imageRef}
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-h-full max-w-full object-contain"
            style={imageStyles}
            draggable={false}
          />
        </div>
        
        {/* Controles de navegación laterales */}
        <button
          onClick={navigateToPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#950101]/40 hover:bg-[#950101] text-white w-10 h-20 rounded-full flex items-center justify-center transition-colors"
        >
          ❮
        </button>
        
        <button
          onClick={navigateToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#950101]/40 hover:bg-[#950101] text-white w-10 h-20 rounded-full flex items-center justify-center transition-colors"
        >
          ❯
        </button>
        
        {/* Controles inferiores */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#1A0A0A]/80 backdrop-blur-md p-4 flex justify-between items-center">
          {/* Controles de zoom y rotación */}
          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              className="p-2 rounded-full text-white/70 hover:bg-[#950101]/30 transition-colors"
              title="Alejar"
              disabled={zoom <= 0.5}
            >
              <ZoomOut />
            </button>
            
            <span className="text-white/70 text-sm min-w-[40px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            
            <button
              onClick={zoomIn}
              className="p-2 rounded-full text-white/70 hover:bg-[#950101]/30 transition-colors"
              title="Acercar"
              disabled={zoom >= 3}
            >
              <ZoomIn />
            </button>
            
            <div className="mx-2 h-8 border-l border-white/20"></div>
            
            <button
              onClick={rotateCounterClockwise}
              className="p-2 rounded-full text-white/70 hover:bg-[#950101]/30 transition-colors"
              title="Rotar hacia la izquierda"
            >
              <RotateCcw />
            </button>
            
            <button
              onClick={rotateClockwise}
              className="p-2 rounded-full text-white/70 hover:bg-[#950101]/30 transition-colors"
              title="Rotar hacia la derecha"
            >
              <RotateCw />
            </button>
          </div>
          
          {/* Indicador de imagen actual */}
          <div className="text-white/70">
            {currentIndex + 1} / {images.length}
          </div>
          
          {/* Miniaturas (opcional para conjuntos pequeños de imágenes) */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto max-w-[300px]">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-12 h-12 rounded-md overflow-hidden border-2 ${
                  index === currentIndex ? 'border-[#FF0000]' : 'border-transparent'
                }`}
              >
                <img
                  src={image.src}
                  alt={`Miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Panel de información (condicional) */}
        {showInfo && currentImage.info && (
          <div className="absolute bottom-24 right-0 w-80 bg-[#1A0A0A]/90 backdrop-blur-md p-4 text-white/90 rounded-l-md border-l-2 border-[#950101] shadow-lg">
            <h4 className="font-bold mb-2 red-mafia-title text-lg">Información</h4>
            <p className="text-sm">{currentImage.info}</p>
          </div>
        )}
      </div>
    </div>
  );
}