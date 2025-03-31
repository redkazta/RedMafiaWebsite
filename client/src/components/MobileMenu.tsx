import { Link } from "wouter";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="mt-3 bg-[#0A0A0A]/90 backdrop-blur-sm border border-[#950101] rounded-lg shadow-lg py-2 max-h-[calc(100vh-120px)] overflow-y-auto">
      <Link href="/" onClick={onClose} className="block px-4 py-2 text-[#F5F5F5] hover:bg-[#2D0000] hover:text-[#FF0000] transition-colors">Inicio</Link>
      <Link href="/nosotros" onClick={onClose} className="block px-4 py-2 text-[#F5F5F5] hover:bg-[#2D0000] hover:text-[#FF0000] transition-colors">Nosotros</Link>
      <Link href="/lanzamientos" onClick={onClose} className="block px-4 py-2 text-[#F5F5F5] hover:bg-[#2D0000] hover:text-[#FF0000] transition-colors">Lanzamientos</Link>
      <Link href="/conciertos" onClick={onClose} className="block px-4 py-2 text-[#F5F5F5] hover:bg-[#2D0000] hover:text-[#FF0000] transition-colors">Presentaciones</Link>
      <Link href="/noticias" onClick={onClose} className="block px-4 py-2 text-[#F5F5F5] hover:bg-[#2D0000] hover:text-[#FF0000] transition-colors">Noticias</Link>
      <Link href="/galeria" onClick={onClose} className="block px-4 py-2 text-[#F5F5F5] hover:bg-[#2D0000] hover:text-[#FF0000] transition-colors">Galería</Link>
      <Link href="/tienda" onClick={onClose} className="block px-4 py-2 text-[#F5F5F5] hover:bg-[#2D0000] hover:text-[#FF0000] transition-colors">Tienda</Link>
      <Link href="/media-kit" onClick={onClose} className="block px-4 py-2 text-[#F5F5F5] hover:bg-[#2D0000] hover:text-[#FF0000] transition-colors">Media Kit</Link>
      <Link href="/contacto" onClick={onClose} className="block px-4 py-2 text-[#F5F5F5] font-medium bg-[#950101]/20 hover:bg-[#950101] hover:text-white transition-colors">Contacto</Link>
    </div>
  );
}
