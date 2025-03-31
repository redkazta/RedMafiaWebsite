interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClose();
  };

  return (
    <div className="mt-3 bg-[#1E1E1E] border border-[#950101] rounded-lg shadow-lg py-2">
      <a href="#inicio" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-[#2D0000]">Inicio</a>
      <a href="#lanzamientos" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-[#2D0000]">Lanzamientos</a>
      <a href="#presentaciones" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-[#2D0000]">Presentaciones</a>
      <a href="#noticias" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-[#2D0000]">Noticias</a>
      <a href="#galeria" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-[#2D0000]">Galería</a>
      <a href="#contacto" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-[#2D0000]">Contacto</a>
    </div>
  );
}
