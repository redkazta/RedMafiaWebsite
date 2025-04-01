import { Link } from 'wouter';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
  onClick?: () => void;
}

export default function Logo({
  className = '',
  size = 'md',
  withText = true,
  onClick
}: LogoProps) {
  const sizes = {
    sm: 'w-8 h-auto',
    md: 'w-12 h-auto',
    lg: 'w-20 h-auto',
    xl: 'w-36 h-auto',
  };

  return (
    <Link href="/">
      <a
        className={`inline-flex items-center ${className}`}
        onClick={onClick}
      >
        <div className={`${sizes[size]}`}>
          <img
            src="/logo.jpeg"
            alt="RED MAFIA Logo"
            className="w-full h-auto object-contain"
          />
        </div>

        {withText && (
          <div className="ml-3 text-white font-bold tracking-wide">
            <span className="text-[#FF0000]">RED</span> MAFIA
          </div>
        )}
      </a>
    </Link>
  );
}