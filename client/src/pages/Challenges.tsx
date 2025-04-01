import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import { BloodCorner, NeonLine, FireParticles } from '@/components/animated';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Interfaces para los datos
interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  prize: string | null;
  status: string;
  createdAt: string;
}

interface ChallengeEntry {
  id: number;
  challengeId: number;
  userId: number;
  title: string;
  description: string | null;
  mediaUrl: string;
  votes: number;
  status: string;
  createdAt: string;
}

interface User {
  id: number;
  username: string;
}

// Esquema para validación del formulario
const entrySchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres").max(100),
  description: z.string().optional(),
  mediaUrl: z.string().url("Ingresa una URL válida para el contenido multimedia"),
});

type EntryFormValues = z.infer<typeof entrySchema>;

// Componente para mostrar el tiempo restante
function TimeRemaining({ endDate }: { endDate: string }) {
  const [timeLeft, setTimeLeft] = useState<string>("Calculando...");
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endDate).getTime();
      const now = new Date().getTime();
      const difference = end - now;
      
      if (difference <= 0) {
        setTimeLeft("Finalizado");
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days > 0) {
        setTimeLeft(`${days} día${days > 1 ? 's' : ''} ${hours} h`);
      } else if (hours > 0) {
        setTimeLeft(`${hours} hora${hours > 1 ? 's' : ''} ${minutes} min`);
      } else {
        setTimeLeft(`${minutes} minuto${minutes > 1 ? 's' : ''}`);
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Actualizar cada minuto
    
    return () => clearInterval(timer);
  }, [endDate]);
  
  return <span>{timeLeft}</span>;
}

export default function Challenges() {
  const { toast } = useToast();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail' | 'form'>('list');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('active');
  
  // Verificar si el usuario está autenticado
  const { data: user, isLoading: isLoadingUser } = useQuery<User, Error>({
    queryKey: ['/api/user'],
    retry: false
  });
  
  // Obtener todos los desafíos
  const { data: challenges, isLoading: isLoadingChallenges } = useQuery<Challenge[], Error>({
    queryKey: ['/api/challenges', categoryFilter, statusFilter],
    queryFn: async () => {
      let url = '/api/challenges?';
      if (categoryFilter) url += `category=${categoryFilter}&`;
      if (statusFilter) url += `status=${statusFilter}`;
      
      const response = await apiRequest('GET', url);
      return response.json();
    }
  });
  
  // Obtener entradas del desafío seleccionado
  const { data: entries, isLoading: isLoadingEntries } = useQuery<ChallengeEntry[], Error>({
    queryKey: ['/api/challenges', selectedChallenge?.id, 'entries'],
    queryFn: async () => {
      if (!selectedChallenge) return [];
      const response = await apiRequest('GET', `/api/challenges/${selectedChallenge.id}/entries`);
      return response.json();
    },
    enabled: !!selectedChallenge
  });
  
  // Obtener entradas del usuario
  const { data: userEntries, isLoading: isLoadingUserEntries } = useQuery<ChallengeEntry[], Error>({
    queryKey: ['/api/challenge-entries/user/me'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/challenge-entries/user/me');
      return response.json();
    },
    enabled: !!user,
    retry: 1
  });
  
  // Obtener las entradas por las que el usuario ha votado
  const { data: votedEntries, isLoading: isLoadingVotes } = useQuery<number[], Error>({
    queryKey: ['/api/challenge-entries/votes/me'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/challenge-entries/votes/me');
      return response.json();
    },
    enabled: !!user,
    retry: 1
  });
  
  // Formulario para crear una nueva entrada
  const form = useForm<EntryFormValues>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: '',
      description: '',
      mediaUrl: ''
    }
  });
  
  // Mutación para crear una nueva entrada
  const createEntryMutation = useMutation({
    mutationFn: async (data: EntryFormValues) => {
      if (!selectedChallenge) throw new Error("No hay un desafío seleccionado");
      
      const response = await apiRequest('POST', `/api/challenges/${selectedChallenge.id}/entries`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Entrada enviada correctamente!",
        description: "Tu participación ha sido recibida y está pendiente de aprobación.",
        variant: "success"
      });
      
      // Resetear formulario y volver al detalle del desafío
      form.reset();
      setViewMode('detail');
      
      // Actualizar datos
      queryClient.invalidateQueries({ queryKey: ['/api/challenges', selectedChallenge?.id, 'entries'] });
      queryClient.invalidateQueries({ queryKey: ['/api/challenge-entries/user/me'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al enviar la entrada",
        description: error.message || "Ocurrió un error al procesar tu solicitud.",
        variant: "destructive"
      });
    }
  });
  
  // Mutación para votar por una entrada
  const voteEntryMutation = useMutation({
    mutationFn: async (entryId: number) => {
      const response = await apiRequest('POST', `/api/challenge-entries/${entryId}/vote`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Voto registrado!",
        description: "Has votado exitosamente por esta entrada.",
        variant: "success"
      });
      
      // Actualizar datos
      queryClient.invalidateQueries({ queryKey: ['/api/challenges', selectedChallenge?.id, 'entries'] });
      queryClient.invalidateQueries({ queryKey: ['/api/challenge-entries/votes/me'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al votar",
        description: error.message || "Ocurrió un error al procesar tu voto.",
        variant: "destructive"
      });
    }
  });
  
  // Verificar si el usuario ha votado por una entrada específica
  const hasVoted = (entryId: number) => {
    return votedEntries?.includes(entryId) || false;
  };
  
  // Verificar si el usuario ya ha participado en el desafío seleccionado
  const hasUserParticipated = () => {
    if (!userEntries || !selectedChallenge) return false;
    return userEntries.some(entry => entry.challengeId === selectedChallenge.id);
  };
  
  // Resetear formulario al cambiar de desafío
  useEffect(() => {
    form.reset();
  }, [selectedChallenge, form]);
  
  // Manejar envío del formulario
  const onSubmit = (data: EntryFormValues) => {
    if (!user) {
      toast({
        title: "Necesitas iniciar sesión",
        description: "Por favor, inicia sesión o regístrate para participar en los desafíos.",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedChallenge) {
      toast({
        title: "Error",
        description: "No hay un desafío seleccionado para participar.",
        variant: "destructive"
      });
      return;
    }
    
    createEntryMutation.mutate(data);
  };
  
  // Manejar el voto por una entrada
  const handleVote = (entryId: number) => {
    if (!user) {
      toast({
        title: "Necesitas iniciar sesión",
        description: "Por favor, inicia sesión o regístrate para votar por las entradas.",
        variant: "destructive"
      });
      return;
    }
    
    voteEntryMutation.mutate(entryId);
  };
  
  // Formatear fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  // Formateo de etiquetas según el estado del desafío
  const getChallengeStatusTag = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <span className="bg-blue-900/60 text-blue-100 px-2 py-1 rounded-full text-xs">Próximamente</span>;
      case 'active':
        return <span className="bg-green-900/60 text-green-100 px-2 py-1 rounded-full text-xs">Activo</span>;
      case 'voting':
        return <span className="bg-yellow-900/60 text-yellow-100 px-2 py-1 rounded-full text-xs">Votación</span>;
      case 'closed':
        return <span className="bg-gray-900/60 text-gray-100 px-2 py-1 rounded-full text-xs">Cerrado</span>;
      default:
        return <span className="bg-gray-900/60 text-gray-100 px-2 py-1 rounded-full text-xs">{status}</span>;
    }
  };
  
  // Formateo de etiquetas según la categoría del desafío
  const getChallengeCategoryTag = (category: string) => {
    switch (category) {
      case 'cover':
        return <span className="bg-purple-900/60 text-purple-100 px-2 py-1 rounded-full text-xs">Cover</span>;
      case 'fanart':
        return <span className="bg-pink-900/60 text-pink-100 px-2 py-1 rounded-full text-xs">Fan Art</span>;
      case 'cosplay':
        return <span className="bg-indigo-900/60 text-indigo-100 px-2 py-1 rounded-full text-xs">Cosplay</span>;
      case 'remix':
        return <span className="bg-blue-900/60 text-blue-100 px-2 py-1 rounded-full text-xs">Remix</span>;
      case 'other':
        return <span className="bg-gray-900/60 text-gray-100 px-2 py-1 rounded-full text-xs">Otro</span>;
      default:
        return <span className="bg-gray-900/60 text-gray-100 px-2 py-1 rounded-full text-xs">{category}</span>;
    }
  };
  
  // Vista principal
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-[#1c0000] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <BloodCorner />
      <FireParticles density={20} />
      
      <div className="max-w-6xl mx-auto">
        <h1 className="red-mafia-title text-4xl sm:text-5xl md:text-6xl text-center mb-4 md:mb-8 relative">
          RED CHALLENGES
          <NeonLine className="w-full md:w-1/2 mx-auto mt-2" />
        </h1>
        
        <div className="text-center mb-10">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Participa en desafíos creativos, comparte tu talento y gana premios exclusivos.
            Los mejores trabajos son reconocidos por la comunidad y la banda.
          </p>
        </div>
        
        {/* Filtros y navegación */}
        {viewMode === 'list' && (
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <button
                onClick={() => setStatusFilter('active')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'active' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
                }`}
              >
                Activos
              </button>
              
              <button
                onClick={() => setStatusFilter('voting')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'voting' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
                }`}
              >
                En votación
              </button>
              
              <button
                onClick={() => setStatusFilter('upcoming')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'upcoming' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
                }`}
              >
                Próximos
              </button>
              
              <button
                onClick={() => setStatusFilter('closed')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'closed' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
                }`}
              >
                Finalizados
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setCategoryFilter('')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  categoryFilter === '' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
                }`}
              >
                Todos
              </button>
              
              <button
                onClick={() => setCategoryFilter('cover')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  categoryFilter === 'cover' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
                }`}
              >
                Covers
              </button>
              
              <button
                onClick={() => setCategoryFilter('fanart')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  categoryFilter === 'fanart' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
                }`}
              >
                Fan Art
              </button>
              
              <button
                onClick={() => setCategoryFilter('cosplay')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  categoryFilter === 'cosplay' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
                }`}
              >
                Cosplay
              </button>
              
              <button
                onClick={() => setCategoryFilter('remix')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  categoryFilter === 'remix' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
                }`}
              >
                Remix
              </button>
              
              <button
                onClick={() => setCategoryFilter('other')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  categoryFilter === 'other' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
                }`}
              >
                Otros
              </button>
            </div>
          </div>
        )}
        
        {/* Navegación para volver */}
        {viewMode !== 'list' && (
          <div className="mb-6">
            <button
              onClick={() => {
                if (viewMode === 'form') {
                  setViewMode('detail');
                } else {
                  setViewMode('list');
                  setSelectedChallenge(null);
                }
              }}
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {viewMode === 'form' ? 'Volver al desafío' : 'Volver a la lista'}
            </button>
          </div>
        )}
        
        {/* Vista de lista de desafíos */}
        {viewMode === 'list' && (
          <div>
            {/* Mensaje cuando no hay desafíos */}
            {!isLoadingChallenges && challenges && challenges.length === 0 && (
              <div className="text-center p-8 bg-black/30 rounded-lg border border-red-900/30">
                <p className="text-gray-400 italic">
                  No hay desafíos disponibles con los filtros seleccionados.
                </p>
              </div>
            )}
            
            {/* Lista de desafíos */}
            {!isLoadingChallenges && challenges && challenges.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.map((challenge) => (
                  <div 
                    key={challenge.id} 
                    className="bg-black/50 backdrop-blur-sm rounded-lg border border-red-900/30 overflow-hidden transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] group"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-y-1">
                          {getChallengeCategoryTag(challenge.category)}
                          {getChallengeStatusTag(challenge.status)}
                        </div>
                        
                        {challenge.prize && (
                          <div className="bg-black/60 rounded-full px-3 py-1 text-xs text-yellow-400 font-semibold flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            Premio
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3">{challenge.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-4">{challenge.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
                        <div>
                          <div>Inicio: {formatDate(challenge.startDate)}</div>
                          <div>Fin: {formatDate(challenge.endDate)}</div>
                        </div>
                        
                        {challenge.status === 'active' && (
                          <div className="text-right">
                            <div className="text-red-500 font-medium">Tiempo restante:</div>
                            <div><TimeRemaining endDate={challenge.endDate} /></div>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => {
                          setSelectedChallenge(challenge);
                          setViewMode('detail');
                        }}
                        className="w-full bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#D10000] transition-all duration-300 py-2.5 rounded-md text-white font-medium relative overflow-hidden group"
                      >
                        <span className="absolute inset-0 w-full h-full flex justify-center">
                          <span className="w-1/3 h-full bg-white/10 skew-x-12 transform -translate-x-full group-hover:animate-shimmer"></span>
                        </span>
                        <span className="relative z-10">Ver detalles</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Estado de carga */}
            {isLoadingChallenges && (
              <div className="flex justify-center py-12">
                <div className="animate-spin w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
        )}
        
        {/* Vista de detalle de desafío */}
        {viewMode === 'detail' && selectedChallenge && (
          <div>
            <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-red-900/30 overflow-hidden mb-8">
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {getChallengeCategoryTag(selectedChallenge.category)}
                      {getChallengeStatusTag(selectedChallenge.status)}
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedChallenge.title}</h2>
                  </div>
                  
                  {selectedChallenge.prize && (
                    <div className="bg-gradient-to-r from-yellow-900/60 to-yellow-700/60 rounded-lg px-4 py-2 text-yellow-200">
                      <div className="text-xs uppercase font-semibold mb-1">Premio</div>
                      <div className="text-sm font-medium">{selectedChallenge.prize}</div>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-300 mb-6">{selectedChallenge.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-black/40 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Fecha de inicio</div>
                    <div className="text-white">{formatDate(selectedChallenge.startDate)}</div>
                  </div>
                  
                  <div className="bg-black/40 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Fecha límite</div>
                    <div className="text-white">{formatDate(selectedChallenge.endDate)}</div>
                  </div>
                  
                  <div className="bg-black/40 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Estado</div>
                    <div className="flex items-center">
                      {selectedChallenge.status === 'active' && (
                        <>
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                          <span className="text-white mr-2">Abierto</span>
                          <span className="text-gray-400 text-sm">
                            (<TimeRemaining endDate={selectedChallenge.endDate} /> restante)
                          </span>
                        </>
                      )}
                      
                      {selectedChallenge.status === 'voting' && (
                        <>
                          <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                          <span className="text-white">En fase de votación</span>
                        </>
                      )}
                      
                      {selectedChallenge.status === 'upcoming' && (
                        <>
                          <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                          <span className="text-white">Próximamente</span>
                        </>
                      )}
                      
                      {selectedChallenge.status === 'closed' && (
                        <>
                          <span className="w-2 h-2 rounded-full bg-gray-500 mr-2"></span>
                          <span className="text-white">Finalizado</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Botón para participar */}
                {selectedChallenge.status === 'active' && (
                  <div className="flex justify-center">
                    {!user ? (
                      <Link href="/auth">
                        <a className="bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#D10000] px-6 py-3 rounded-md text-white font-bold transition-all duration-300 inline-flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                          </svg>
                          Inicia sesión para participar
                        </a>
                      </Link>
                    ) : hasUserParticipated() ? (
                      <div className="text-gray-400 bg-black/50 px-6 py-3 rounded-md inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Ya has participado en este desafío
                      </div>
                    ) : (
                      <button 
                        onClick={() => setViewMode('form')}
                        className="bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#D10000] px-6 py-3 rounded-md text-white font-bold transition-all duration-300 inline-flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Participar en este desafío
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Entradas del desafío */}
            <div>
              <h3 className="text-2xl font-bold text-red-500 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Participaciones
              </h3>
              
              {/* Mensaje cuando no hay entradas */}
              {!isLoadingEntries && entries && entries.length === 0 && (
                <div className="text-center p-8 bg-black/30 rounded-lg border border-red-900/30">
                  <p className="text-gray-400 italic">
                    No hay participaciones en este desafío todavía. 
                    {selectedChallenge.status === 'active' && !user && (
                      <> ¡<Link href="/auth"><a className="text-red-500 hover:text-red-400 underline">Inicia sesión</a></Link> y sé el primero en participar!</>
                    )}
                    {selectedChallenge.status === 'active' && user && !hasUserParticipated() && (
                      <> ¡<button onClick={() => setViewMode('form')} className="text-red-500 hover:text-red-400 underline">Participa ahora</button> y sé el primero!</>
                    )}
                  </p>
                </div>
              )}
              
              {/* Grid de entradas */}
              {!isLoadingEntries && entries && entries.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {entries
                    .filter(entry => selectedChallenge.status === 'voting' ? entry.status === 'approved' : true)
                    .map((entry) => (
                    <div 
                      key={entry.id} 
                      className="bg-black/40 rounded-lg border border-red-900/20 overflow-hidden"
                    >
                      {/* Vista previa del contenido */}
                      <div className="aspect-video bg-black/60 relative">
                        {entry.mediaUrl.includes('youtube.com') || entry.mediaUrl.includes('youtu.be') ? (
                          // Contenido de YouTube (vista previa de thumbnail)
                          <div className="w-full h-full bg-black flex items-center justify-center relative">
                            <img 
                              src={`https://img.youtube.com/vi/${entry.mediaUrl.split('v=')[1]?.split('&')[0] || entry.mediaUrl.split('/').pop()}/hqdefault.jpg`} 
                              alt={entry.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 bg-red-700/80 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ) : entry.mediaUrl.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                          // Contenido de imagen
                          <img 
                            src={entry.mediaUrl} 
                            alt={entry.title}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          // Otro tipo de contenido (mostrar un ícono genérico)
                          <div className="w-full h-full bg-black flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                            </svg>
                          </div>
                        )}
                        
                        {/* Estado de la entrada */}
                        {entry.status === 'pending' && (
                          <div className="absolute top-2 left-2 bg-yellow-700/80 text-yellow-100 text-xs px-2 py-1 rounded">
                            Pendiente de aprobación
                          </div>
                        )}
                        
                        {entry.status === 'winner' && (
                          <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold text-xs px-3 py-1 rounded-full flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            GANADOR
                          </div>
                        )}
                      </div>
                      
                      {/* Detalles de la entrada */}
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-white mb-1">{entry.title}</h4>
                        
                        {entry.description && (
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{entry.description}</p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          {/* Usuario y fecha */}
                          <div className="text-xs text-gray-500">
                            Enviado el {new Date(entry.createdAt).toLocaleDateString('es-ES')}
                          </div>
                          
                          {/* Votos (solo para desafíos en fase de votación) */}
                          {selectedChallenge.status === 'voting' && entry.status === 'approved' && (
                            <div className="flex items-center">
                              <button
                                onClick={() => handleVote(entry.id)}
                                disabled={!user || hasVoted(entry.id) || voteEntryMutation.isPending}
                                className={`inline-flex items-center px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
                                  !user 
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    : hasVoted(entry.id)
                                      ? 'bg-red-900/50 text-white cursor-default'
                                      : 'bg-gradient-to-r from-[#950101] to-[#FF0000] text-white hover:shadow-[0_0_10px_rgba(255,0,0,0.5)]'
                                }`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${hasVoted(entry.id) ? 'text-red-400' : 'text-white'} mr-1`} fill={hasVoted(entry.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span>{entry.votes}</span>
                              </button>
                            </div>
                          )}
                          
                          {/* Ícono para entradas ganadoras de desafíos cerrados */}
                          {selectedChallenge.status === 'closed' && entry.status === 'winner' && (
                            <div className="text-yellow-400 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                              </svg>
                              <span className="font-bold">Ganador</span>
                            </div>
                          )}
                          
                          {/* Contador de votos para desafíos cerrados */}
                          {selectedChallenge.status === 'closed' && entry.status !== 'winner' && entry.votes > 0 && (
                            <div className="text-gray-400 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              <span>{entry.votes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Estado de carga */}
              {isLoadingEntries && (
                <div className="flex justify-center py-12">
                  <div className="animate-spin w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Vista de formulario para participar */}
        {viewMode === 'form' && selectedChallenge && user && (
          <div>
            <h2 className="text-2xl font-bold text-red-500 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Participar en: {selectedChallenge.title}
            </h2>
            
            <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg border border-red-900/30">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-6">
                  {/* Título */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                      Título de tu participación*
                    </label>
                    <input
                      id="title"
                      type="text"
                      {...form.register('title')}
                      className={`w-full px-4 py-2 rounded-md bg-black/60 border ${form.formState.errors.title ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-red-500/50`}
                      placeholder="Ej: Mi versión de 'Puño de Hierro'"
                    />
                    {form.formState.errors.title && (
                      <p className="mt-1 text-sm text-red-500">{form.formState.errors.title.message}</p>
                    )}
                  </div>
                  
                  {/* Descripción */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                      Descripción (opcional)
                    </label>
                    <textarea
                      id="description"
                      {...form.register('description')}
                      rows={4}
                      className={`w-full px-4 py-2 rounded-md bg-black/60 border ${form.formState.errors.description ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-red-500/50`}
                      placeholder="Cuenta algo sobre tu participación, inspiración, proceso creativo, etc."
                    ></textarea>
                    {form.formState.errors.description && (
                      <p className="mt-1 text-sm text-red-500">{form.formState.errors.description.message}</p>
                    )}
                  </div>
                  
                  {/* URL del contenido */}
                  <div>
                    <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-300 mb-1">
                      URL del contenido*
                    </label>
                    <input
                      id="mediaUrl"
                      type="url"
                      {...form.register('mediaUrl')}
                      className={`w-full px-4 py-2 rounded-md bg-black/60 border ${form.formState.errors.mediaUrl ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-red-500/50`}
                      placeholder="https://ejemplo.com/tu-contenido"
                    />
                    {form.formState.errors.mediaUrl && (
                      <p className="mt-1 text-sm text-red-500">{form.formState.errors.mediaUrl.message}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Sube tu contenido a plataformas como YouTube, Instagram, SoundCloud o Imgur y comparte el enlace aquí.
                    </p>
                  </div>
                  
                  {/* Vista previa */}
                  {form.watch('mediaUrl') && form.watch('mediaUrl').includes('youtube.com') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Vista previa (YouTube)
                      </label>
                      <div className="aspect-video rounded-md overflow-hidden">
                        <iframe
                          src={`https://www.youtube.com/embed/${form.watch('mediaUrl').split('v=')[1]?.split('&')[0]}`}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    </div>
                  )}
                  
                  {/* Imagen de vista previa para URLs de imagen */}
                  {form.watch('mediaUrl') && form.watch('mediaUrl').match(/\.(jpeg|jpg|gif|png)$/i) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Vista previa (Imagen)
                      </label>
                      <div className="rounded-md overflow-hidden border border-gray-700 p-2 bg-black/50">
                        <img 
                          src={form.watch('mediaUrl')} 
                          alt="Vista previa" 
                          className="max-h-96 mx-auto"
                          onError={(e) => {
                            // Manejar error de carga de imagen
                            e.currentTarget.src = "https://via.placeholder.com/400x400?text=Error+de+imagen";
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Pie de página y botones */}
                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-xs text-gray-500 mb-4 sm:mb-0">
                    * Campos obligatorios. Tu participación será revisada antes de ser publicada.
                  </p>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setViewMode('detail')}
                      className="px-6 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-black/30 transition-colors"
                    >
                      Cancelar
                    </button>
                    
                    <button
                      type="submit"
                      disabled={createEntryMutation.isPending}
                      className="bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#D10000] px-6 py-2 rounded-md text-white font-medium transition-all duration-300 flex items-center"
                    >
                      {createEntryMutation.isPending ? (
                        <>
                          <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        'Enviar Participación'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Información adicional */}
        {viewMode === 'list' && (
          <div className="mt-12 text-center max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-red-500 mb-4">¿Cómo funcionan los desafíos?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-black/30 p-5 rounded-lg border border-red-900/20">
                <div className="text-red-500 text-3xl font-bold mb-2">01</div>
                <h4 className="text-white font-bold mb-2">Participa</h4>
                <p className="text-gray-400 text-sm">
                  Encuentra un desafío activo que te interese y envía tu creación. Puede ser una cover, artwork, remix, o cualquier expresión artística relacionada con RED MAFIA.
                </p>
              </div>
              <div className="bg-black/30 p-5 rounded-lg border border-red-900/20">
                <div className="text-red-500 text-3xl font-bold mb-2">02</div>
                <h4 className="text-white font-bold mb-2">Vota</h4>
                <p className="text-gray-400 text-sm">
                  Cuando el período de participación termine, comienza la fase de votación. Los fans eligen sus creaciones favoritas.
                </p>
              </div>
              <div className="bg-black/30 p-5 rounded-lg border border-red-900/20">
                <div className="text-red-500 text-3xl font-bold mb-2">03</div>
                <h4 className="text-white font-bold mb-2">Gana</h4>
                <p className="text-gray-400 text-sm">
                  Las entradas más votadas ganan premios exclusivos, reconocimiento y la posibilidad de colaborar con la banda.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}