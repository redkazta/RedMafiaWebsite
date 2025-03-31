import { Link } from "wouter";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="mt-3 bg-[#1E1E1E] border border-[#950101] rounded-lg shadow-lg py-2">
      <Link href="/" onClick={onClose} className="block px-4 py-2 hover:bg-[#2D0000]">Inicio</Link>
      <Link href="/lanzamientos" onClick={onClose} className="block px-4 py-2 hover:bg-[#2D0000]">Lanzamientos</Link>
      <Link href="/conciertos" onClick={onClose} className="block px-4 py-2 hover:bg-[#2D0000]">Presentaciones</Link>
      <Link href="/noticias" onClick={onClose} className="block px-4 py-2 hover:bg-[#2D0000]">Noticias</Link>
      <Link href="/galeria" onClick={onClose} className="block px-4 py-2 hover:bg-[#2D0000]">Galería</Link>
      <Link href="/contacto" onClick={onClose} className="block px-4 py-2 hover:bg-[#2D0000]">Contacto</Link>
    </div>
  );
}
