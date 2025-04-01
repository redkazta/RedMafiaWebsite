import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import { BloodCorner, FireParticles, NeonLine } from '@/components/animated';

// Página "La Familia" - Sistema de membresía exclusiva
export default function Familia() {
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Verificar si el usuario está autenticado
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['/api/user'],
    retry: false
  });
  
  // Obtener membresía actual del usuario si existe
  const { data: membership, isLoading: isLoadingMembership } = useQuery({
    queryKey: ['/api/memberships/me'],
    enabled: !!user,
    onError: () => {
      // Silenciar errores 404 (cuando el usuario aún no tiene membresía)
    }
  });
  
  // Mutación para crear una nueva membresía
  const createMembershipMutation = useMutation({
    mutationFn: async (data: { type: string }) => {
      const response = await apiRequest('POST', '/api/memberships', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Bienvenido a La Familia!",
        description: "Te has unido exitosamente a la comunidad exclusiva de RED MAFIA.",
        variant: "success"
      });
      
      // Invalidar la caché para actualizar los datos
      queryClient.invalidateQueries({ queryKey: ['/api/memberships/me'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al unirse a La Familia",
        description: error.message || "Ocurrió un error al procesar tu solicitud.",
        variant: "destructive"
      });
    }
  });
  
  // Gestionar el registro a una membresía
  const handleJoin = async (type: string) => {
    if (!user) {
      toast({
        title: "Necesitas iniciar sesión",
        description: "Por favor, inicia sesión o regístrate para unirte a La Familia.",
        variant: "destructive"
      });
      return;
    }
    
    createMembershipMutation.mutate({ type });
  };
  
  // Si el usuario no está autenticado, mostrar mensaje para iniciar sesión
  if (!isLoadingUser && !user) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-black to-[#1c0000] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <BloodCorner />
        <FireParticles density={20} />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="red-mafia-title text-4xl sm:text-5xl md:text-6xl text-center mb-8 relative">
            LA FAMILIA
            <NeonLine className="w-full md:w-3/4 mx-auto mt-2" />
          </h1>
          
          <div className="bg-black/70 backdrop-blur-md p-8 rounded-lg border border-red-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-900/10 rounded-lg blur-md"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-red-500 mb-4 text-center">Acceso Restringido</h2>
              <p className="text-lg text-gray-200 mb-8 text-center">Para acceder a La Familia, necesitas iniciar sesión o registrarte en tu cuenta.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth">
                  <a className="bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#D10000] transition-all duration-300 red-mafia-glow px-8 py-3 rounded-md text-white font-bold text-lg relative overflow-hidden group">
                    <span className="absolute inset-0 w-full h-full flex justify-center">
                      <span className="w-1/3 h-full bg-white/10 skew-x-12 transform -translate-x-full group-hover:animate-shimmer"></span>
                    </span>
                    <span className="relative z-10">Iniciar Sesión</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Si el usuario ya tiene una membresía, mostrar su información
  if (!isLoadingMembership && membership) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-black to-[#1c0000] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <BloodCorner />
        <FireParticles density={30} />
        
        <div className="max-w-5xl mx-auto">
          <h1 className="red-mafia-title text-4xl sm:text-5xl md:text-6xl text-center mb-8 relative">
            LA FAMILIA
            <NeonLine className="w-full md:w-3/4 mx-auto mt-2" />
          </h1>
          
          <div className="bg-black/70 backdrop-blur-md p-8 rounded-lg border border-red-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-900/10 rounded-lg blur-md"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  <span className="text-[#FF0000]">¡Bienvenido a La Familia,</span> 
                  <span className="text-white italic"> {user?.username}!</span>
                </h2>
                <p className="text-xl text-gray-300 mb-2">Membresía: <span className="text-red-500 font-bold uppercase">{membership.type}</span></p>
                <p className="text-sm text-gray-400">Miembro desde: {new Date(membership.startDate).toLocaleDateString('es-ES', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-black/40 p-6 rounded-lg border border-red-900/30 shadow-[0_0_15px_rgba(150,0,0,0.2)]">
                  <h3 className="text-xl font-bold text-red-400 mb-4">Beneficios Exclusivos</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">&#9830;</span>
                      <span className="text-gray-300">Acceso anticipado a nuevos lanzamientos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">&#9830;</span>
                      <span className="text-gray-300">Contenido exclusivo (demos, ensayos, sesiones acústicas)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">&#9830;</span>
                      <span className="text-gray-300">Pre-venta de boletos para conciertos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">&#9830;</span>
                      <span className="text-gray-300">Merchandise exclusivo de La Familia</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">&#9830;</span>
                      <span className="text-gray-300">Chat privado con miembros de la banda</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-black/40 p-6 rounded-lg border border-red-900/30 shadow-[0_0_15px_rgba(150,0,0,0.2)]">
                  <h3 className="text-xl font-bold text-red-400 mb-4">Próximos Eventos Exclusivos</h3>
                  <ul className="space-y-4">
                    <li>
                      <p className="text-red-300 font-medium">15 Abril, 2025</p>
                      <p className="text-white font-bold">Listening Party - Nuevo Single</p>
                      <p className="text-gray-400 text-sm">Sé de los primeros en escuchar nuestro próximo lanzamiento.</p>
                    </li>
                    <li>
                      <p className="text-red-300 font-medium">22 Mayo, 2025</p>
                      <p className="text-white font-bold">Meet & Greet Virtual</p>
                      <p className="text-gray-400 text-sm">Sesión de preguntas y respuestas con la banda.</p>
                    </li>
                    <li>
                      <p className="text-red-300 font-medium">10 Junio, 2025</p>
                      <p className="text-white font-bold">Ensayo en Vivo (Streaming)</p>
                      <p className="text-gray-400 text-sm">Transmisión exclusiva desde nuestro estudio.</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button 
                  className="bg-gradient-to-r from-red-900 to-red-700 px-6 py-3 rounded-md shadow-md hover:shadow-[0_0_15px_rgba(255,0,0,0.4)] transition-all duration-300 text-white font-medium"
                >
                  Acceder al Contenido Exclusivo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Si el usuario está autenticado pero aún no tiene membresía, mostrar opciones de membresía
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-[#1c0000] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <BloodCorner />
      <FireParticles density={20} />
      
      <div className="max-w-6xl mx-auto">
        <h1 className="red-mafia-title text-4xl sm:text-5xl md:text-6xl text-center mb-4 md:mb-8 relative">
          LA FAMILIA
          <NeonLine className="w-full md:w-3/4 mx-auto mt-2" />
        </h1>
        
        <div className="text-center mb-12">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Únete a nuestro círculo íntimo y obtén acceso a contenido exclusivo, eventos privados y más. 
            Ser parte de La Familia es experimentar RED MAFIA como nunca antes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Membresía Estándar */}
          <div className="bg-black/70 backdrop-blur-md rounded-lg border border-red-900/50 overflow-hidden transition-transform duration-300 hover:translate-y-[-8px] hover:shadow-[0_0_25px_rgba(255,0,0,0.3)] relative">
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 to-transparent"></div>
            
            <div className="p-6 relative">
              <h3 className="text-2xl font-bold text-white mb-2">Estándar</h3>
              <div className="text-3xl font-bold text-red-500 mb-6">$99<span className="text-base text-gray-400">/mes</span></div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">&#10003;</span>
                  <span className="text-gray-300">Acceso anticipado a nuevos lanzamientos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">&#10003;</span>
                  <span className="text-gray-300">Contenido exclusivo mensual</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">&#10003;</span>
                  <span className="text-gray-300">Pre-venta de boletos para conciertos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">&#10007;</span>
                  <span className="text-gray-500">Merchandise exclusivo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">&#10007;</span>
                  <span className="text-gray-500">Chat con la banda</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handleJoin('standard')}
                disabled={createMembershipMutation.isPending}
                className="w-full bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#D10000] transition-all duration-300 py-3 rounded-md text-white font-bold relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full flex justify-center">
                  <span className="w-1/3 h-full bg-white/10 skew-x-12 transform -translate-x-full group-hover:animate-shimmer"></span>
                </span>
                <span className="relative z-10">
                  {createMembershipMutation.isPending ? 'Procesando...' : 'Unirse'}
                </span>
              </button>
            </div>
          </div>
          
          {/* Membresía Premium */}
          <div className="bg-black/70 backdrop-blur-md rounded-lg border-2 border-red-700 overflow-hidden transition-transform duration-300 hover:translate-y-[-8px] hover:shadow-[0_0_30px_rgba(255,0,0,0.5)] relative transform scale-105 z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 to-transparent"></div>
            <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 text-sm font-bold">POPULAR</div>
            
            <div className="p-6 relative">
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <div className="text-3xl font-bold text-red-500 mb-6">$199<span className="text-base text-gray-400">/mes</span></div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">&#10003;</span>
                  <span className="text-gray-300">Acceso anticipado a nuevos lanzamientos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">&#10003;</span>
                  <span className="text-gray-300">Contenido exclusivo semanal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">&#10003;</span>
                  <span className="text-gray-300">Pre-venta de boletos para conciertos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">&#10003;</span>
                  <span className="text-gray-300">Merchandise exclusivo bimestral</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">&#10007;</span>
                  <span className="text-gray-500">Chat con la banda</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handleJoin('premium')}
                disabled={createMembershipMutation.isPending}
                className="w-full bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#D10000] transition-all duration-300 py-3 rounded-md text-white font-bold relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full flex justify-center">
                  <span className="w-1/3 h-full bg-white/10 skew-x-12 transform -translate-x-full group-hover:animate-shimmer"></span>
                </span>
                <span className="relative z-10">
                  {createMembershipMutation.isPending ? 'Procesando...' : 'Unirse'}
                </span>
              </button>
            </div>
          </div>
          
          {/* Membresía VIP */}
          <div className="bg-black/70 backdrop-blur-md rounded-lg border border-red-900/50 overflow-hidden transition-transform duration-300 hover:translate-y-[-8px] hover:shadow-[0_0_25px_rgba(255,0,0,0.3)] relative">
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 to-transparent"></div>
            
            <div className="p-6 relative">
              <h3 className="text-2xl font-bold text-white mb-2">VIP</h3>
              <div className="text-3xl font-bold text-red-500 mb-6">$399<span className="text-base text-gray-400">/mes</span></div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">&#10003;</span>
                  <span className="text-gray-300">Acceso anticipado a nuevos lanzamientos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">&#10003;</span>
                  <span className="text-gray-300">Contenido exclusivo diario</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">&#10003;</span>
                  <span className="text-gray-300">Pre-venta preferencial para conciertos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">&#10003;</span>
                  <span className="text-gray-300">Merchandise exclusivo mensual</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">&#10003;</span>
                  <span className="text-gray-300">Chat privado con la banda</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handleJoin('vip')}
                disabled={createMembershipMutation.isPending}
                className="w-full bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#D10000] transition-all duration-300 py-3 rounded-md text-white font-bold relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full flex justify-center">
                  <span className="w-1/3 h-full bg-white/10 skew-x-12 transform -translate-x-full group-hover:animate-shimmer"></span>
                </span>
                <span className="relative z-10">
                  {createMembershipMutation.isPending ? 'Procesando...' : 'Unirse'}
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-red-500 mb-4">¿Por qué unirse a La Familia?</h3>
          <p className="text-gray-300 mb-6">
            La Familia no es solo un club de fans, es una comunidad exclusiva donde podrás vivir la experiencia RED MAFIA desde adentro. 
            Tendrás acceso a contenido que nadie más puede ver, interacciones directas con nosotros y la oportunidad de formar parte
            de nuestra historia.
          </p>
          <p className="text-gray-400 text-sm italic">
            * Todos los pagos son procesados de forma segura a través de Stripe. Puedes cancelar tu membresía en cualquier momento.
          </p>
        </div>
      </div>
    </div>
  );
}