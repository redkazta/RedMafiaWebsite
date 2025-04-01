import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import { NeonLine, FireParticles } from '@/components/animated';
import { apiRequest } from '@/lib/queryClient';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Interfaces para los datos
interface MerchDesign {
  id: number;
  userId: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  status: string;
  votes: number;
  createdAt: string;
}

interface User {
  id: number;
  username: string;
}

// Esquema para validación del formulario
const designSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres").max(100),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres").max(500),
  imageUrl: z.string().url("Ingresa una URL válida para la imagen"),
  category: z.enum(["camiseta", "sudadera", "gorra", "accesorio", "otro"], {
    errorMap: () => ({ message: "Selecciona una categoría válida" })
  })
});

type DesignFormValues = z.infer<typeof designSchema>;

export default function MerchDesign() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<'gallery' | 'myDesigns' | 'form'>('gallery');
  const [selectedDesign, setSelectedDesign] = useState<MerchDesign | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  
  // Verificar si el usuario está autenticado
  const { data: user, isLoading: isLoadingUser } = useQuery<User, Error>({
    queryKey: ['/api/user'],
    retry: false
  });
  
  // Obtener todos los diseños aprobados
  const { data: designs, isLoading: isLoadingDesigns } = useQuery<MerchDesign[], Error>({
    queryKey: ['/api/merch-designs', categoryFilter],
    queryFn: async () => {
      let url = '/api/merch-designs';
      if (categoryFilter) {
        url += `?category=${categoryFilter}&status=approved`;
      } else {
        url += '?status=approved';
      }
      const response = await apiRequest('GET', url);
      return response.json();
    }
  });
  
  // Obtener diseños del usuario actual
  const { data: myDesigns, isLoading: isLoadingMyDesigns } = useQuery<MerchDesign[], Error>({
    queryKey: ['/api/merch-designs/user/me'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/merch-designs/user/me');
      return response.json();
    },
    enabled: !!user,
    retry: 1
  });
  
  // Obtener los diseños por los que el usuario ha votado
  const { data: votedDesigns, isLoading: isLoadingVotes } = useQuery<number[], Error>({
    queryKey: ['/api/merch-designs/votes/me'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/merch-designs/votes/me');
      return response.json();
    },
    enabled: !!user,
    retry: 1
  });
  
  // Formulario para crear un nuevo diseño
  const form = useForm<DesignFormValues>({
    resolver: zodResolver(designSchema),
    defaultValues: {
      title: '',
      description: '',
      imageUrl: '',
      category: 'camiseta'
    }
  });
  
  // Mutación para crear un nuevo diseño
  const createDesignMutation = useMutation({
    mutationFn: async (data: DesignFormValues) => {
      const response = await apiRequest('POST', '/api/merch-designs', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Diseño enviado correctamente!",
        description: "Tu diseño ha sido recibido y está pendiente de aprobación.",
        variant: "success"
      });
      
      // Resetear formulario y volver a la galería
      form.reset();
      setViewMode('myDesigns');
      
      // Actualizar datos
      queryClient.invalidateQueries({ queryKey: ['/api/merch-designs/user/me'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al enviar el diseño",
        description: error.message || "Ocurrió un error al procesar tu solicitud.",
        variant: "destructive"
      });
    }
  });
  
  // Mutación para votar por un diseño
  const voteDesignMutation = useMutation({
    mutationFn: async (designId: number) => {
      const response = await apiRequest('POST', `/api/merch-designs/${designId}/vote`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Voto registrado!",
        description: "Has votado exitosamente por este diseño.",
        variant: "success"
      });
      
      // Actualizar datos
      queryClient.invalidateQueries({ queryKey: ['/api/merch-designs'] });
      queryClient.invalidateQueries({ queryKey: ['/api/merch-designs/votes/me'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al votar",
        description: error.message || "Ocurrió un error al procesar tu voto.",
        variant: "destructive"
      });
    }
  });
  
  // Manejar envío del formulario
  const onSubmit = (data: DesignFormValues) => {
    if (!user) {
      toast({
        title: "Necesitas iniciar sesión",
        description: "Por favor, inicia sesión o regístrate para enviar un diseño.",
        variant: "destructive"
      });
      return;
    }
    
    createDesignMutation.mutate(data);
  };
  
  // Manejar el voto por un diseño
  const handleVote = (designId: number) => {
    if (!user) {
      toast({
        title: "Necesitas iniciar sesión",
        description: "Por favor, inicia sesión o regístrate para votar por los diseños.",
        variant: "destructive"
      });
      return;
    }
    
    voteDesignMutation.mutate(designId);
  };
  
  // Verificar si el usuario ha votado por un diseño específico
  const hasVoted = (designId: number) => {
    return votedDesigns?.includes(designId) || false;
  };
  
  // Si el usuario no está autenticado y quiere ver sus diseños o crear uno nuevo
  useEffect(() => {
    if (!isLoadingUser && !user && (viewMode === 'myDesigns' || viewMode === 'form')) {
      setViewMode('gallery');
    }
  }, [user, isLoadingUser, viewMode]);
  
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-[#1c0000] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">

      <FireParticles density={20} />
      
      <div className="max-w-6xl mx-auto">
        <h1 className="red-mafia-title text-4xl sm:text-5xl md:text-6xl text-center mb-8 relative">
          DISEÑA MERCH
          <NeonLine className="w-full md:w-3/4 mx-auto mt-2" />
        </h1>
        
        <div className="text-center mb-8">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Crea y vota por los diseños que quieres ver en nuestra próxima colección de merchandise. 
            Los diseños más populares podrían convertirse en productos reales.
          </p>
        </div>
        
        {/* Navegación entre secciones */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => setViewMode('gallery')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
              viewMode === 'gallery' 
                ? 'bg-gradient-to-r from-[#950101] to-[#FF0000] text-white shadow-[0_0_10px_rgba(255,0,0,0.3)]' 
                : 'bg-black/60 text-gray-400 hover:text-white hover:bg-black/80'
            }`}
          >
            Galería de Diseños
          </button>
          
          <button
            onClick={() => setViewMode('myDesigns')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
              viewMode === 'myDesigns' 
                ? 'bg-gradient-to-r from-[#950101] to-[#FF0000] text-white shadow-[0_0_10px_rgba(255,0,0,0.3)]' 
                : 'bg-black/60 text-gray-400 hover:text-white hover:bg-black/80'
            }`}
            disabled={!user}
          >
            Mis Diseños
          </button>
          
          <button
            onClick={() => setViewMode('form')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
              viewMode === 'form' 
                ? 'bg-gradient-to-r from-[#950101] to-[#FF0000] text-white shadow-[0_0_10px_rgba(255,0,0,0.3)]' 
                : 'bg-black/60 text-gray-400 hover:text-white hover:bg-black/80'
            }`}
            disabled={!user}
          >
            Enviar Diseño
          </button>
        </div>
        
        {/* Sección: Galería de diseños */}
        {viewMode === 'gallery' && (
          <div>
            {/* Filtros */}
            <div className="mb-6 flex flex-wrap justify-center gap-3">
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
                onClick={() => setCategoryFilter('camiseta')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  categoryFilter === 'camiseta' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
                }`}
              >
                Camisetas
              </button>
              
              <button
                onClick={() => setCategoryFilter('sudadera')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  categoryFilter === 'sudadera' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
                }`}
              >
                Sudaderas
              </button>
              
              <button
                onClick={() => setCategoryFilter('gorra')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  categoryFilter === 'gorra' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
                }`}
              >
                Gorras
              </button>
              
              <button
                onClick={() => setCategoryFilter('accesorio')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  categoryFilter === 'accesorio' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
                }`}
              >
                Accesorios
              </button>
              
              <button
                onClick={() => setCategoryFilter('otro')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  categoryFilter === 'otro' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
                }`}
              >
                Otros
              </button>
            </div>
            
            {/* Mensaje si no hay diseños aprobados */}
            {!isLoadingDesigns && designs && designs.length === 0 && (
              <div className="text-center p-8 bg-black/30 rounded-lg border border-red-900/30">
                <p className="text-gray-400 italic">
                  No hay diseños aprobados en esta categoría actualmente. 
                  {!user && (
                    <> ¡<Link href="/auth"><a className="text-red-500 hover:text-red-400 underline">Inicia sesión</a></Link> y envía el tuyo!</>
                  )}
                  {user && viewMode !== 'form' && (
                    <> ¡<button onClick={() => setViewMode('form')} className="text-red-500 hover:text-red-400 underline">Envía tu diseño</button> ahora!</>
                  )}
                </p>
              </div>
            )}
            
            {/* Grid de diseños */}
            {!isLoadingDesigns && designs && designs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designs.map((design) => (
                  <div 
                    key={design.id} 
                    className="bg-black/50 backdrop-blur-sm rounded-lg border border-red-900/30 overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] group relative"
                  >
                    {/* Imagen del diseño */}
                    <div className="h-64 overflow-hidden relative">
                      <img 
                        src={design.imageUrl} 
                        alt={design.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                      
                      {/* Categoria (etiqueta) */}
                      <div className="absolute top-3 right-3 bg-red-700 text-white text-xs px-2 py-1 rounded uppercase">
                        {design.category}
                      </div>
                    </div>
                    
                    {/* Detalles del diseño */}
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white mb-1">{design.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">{design.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span className="font-bold">{design.votes || 0}</span>
                        </div>
                        
                        <button
                          onClick={() => handleVote(design.id)}
                          disabled={!user || hasVoted(design.id) || voteDesignMutation.isPending}
                          className={`px-4 py-1.5 rounded text-sm font-medium transition-all duration-300 ${
                            !user 
                              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                              : hasVoted(design.id)
                                ? 'bg-red-900/50 text-gray-300 cursor-default'
                                : 'bg-gradient-to-r from-[#950101] to-[#FF0000] text-white hover:shadow-[0_0_10px_rgba(255,0,0,0.5)]'
                          }`}
                        >
                          {!user 
                            ? 'Inicia sesión para votar' 
                            : hasVoted(design.id) 
                              ? '¡Ya votaste!' 
                              : 'Votar'
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Estado de carga */}
            {isLoadingDesigns && (
              <div className="flex justify-center py-12">
                <div className="animate-spin w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
        )}
        
        {/* Sección: Mis diseños */}
        {viewMode === 'myDesigns' && user && (
          <div>
            <h2 className="text-2xl font-bold text-red-500 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Mis Diseños
            </h2>
            
            {/* Mensaje si no hay diseños del usuario */}
            {!isLoadingMyDesigns && myDesigns && myDesigns.length === 0 && (
              <div className="text-center p-8 bg-black/30 rounded-lg border border-red-900/30">
                <p className="text-gray-400 italic mb-4">
                  No has enviado ningún diseño todavía.
                </p>
                <button
                  onClick={() => setViewMode('form')}
                  className="bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#D10000] px-6 py-2 rounded-md text-white font-medium transition-all duration-300"
                >
                  Enviar mi primer diseño
                </button>
              </div>
            )}
            
            {/* Lista de diseños del usuario */}
            {!isLoadingMyDesigns && myDesigns && myDesigns.length > 0 && (
              <div className="space-y-4">
                {myDesigns.map((design) => (
                  <div 
                    key={design.id} 
                    className="bg-black/50 backdrop-blur-sm rounded-lg border border-red-900/30 overflow-hidden flex flex-col md:flex-row"
                  >
                    {/* Imagen del diseño */}
                    <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                      <img 
                        src={design.imageUrl} 
                        alt={design.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Detalles del diseño */}
                    <div className="w-full md:w-2/3 p-4 md:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-white">{design.title}</h3>
                          <span className={`text-xs px-3 py-1 rounded-full ${
                            design.status === 'pending' ? 'bg-yellow-700/60 text-yellow-200' :
                            design.status === 'approved' ? 'bg-green-700/60 text-green-200' :
                            design.status === 'rejected' ? 'bg-red-700/60 text-red-200' :
                            'bg-gray-700/60 text-gray-200'
                          }`}>
                            {design.status === 'pending' ? 'Pendiente de aprobación' :
                             design.status === 'approved' ? 'Aprobado' :
                             design.status === 'rejected' ? 'Rechazado' :
                             design.status === 'production' ? 'En producción' : design.status}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 mb-3">{design.description}</p>
                        
                        <div className="flex items-center text-sm text-gray-400 mb-4">
                          <span className="mr-4">
                            <span className="font-medium text-gray-300">Categoría:</span> {design.category}
                          </span>
                          
                          {design.status === 'approved' && (
                            <span className="flex items-center">
                              <span className="font-medium text-gray-300 mr-1">Votos:</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                              {design.votes || 0}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Enviado el {new Date(design.createdAt).toLocaleDateString('es-ES')}
                        </span>
                        
                        {design.status === 'pending' && (
                          <button className="text-sm text-red-500 hover:text-red-400 transition-colors">
                            Editar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Estado de carga */}
            {isLoadingMyDesigns && (
              <div className="flex justify-center py-12">
                <div className="animate-spin w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
        )}
        
        {/* Sección: Formulario para enviar diseño */}
        {viewMode === 'form' && user && (
          <div>
            <h2 className="text-2xl font-bold text-red-500 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Enviar Nuevo Diseño
            </h2>
            
            <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg border border-red-900/30">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* Título */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                        Título del Diseño*
                      </label>
                      <input
                        id="title"
                        type="text"
                        {...form.register('title')}
                        className={`w-full px-4 py-2 rounded-md bg-black/60 border ${form.formState.errors.title ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-red-500/50`}
                        placeholder="Ej: Camiseta Blood & Fire Tour"
                      />
                      {form.formState.errors.title && (
                        <p className="mt-1 text-sm text-red-500">{form.formState.errors.title.message}</p>
                      )}
                    </div>
                    
                    {/* URL de imagen */}
                    <div>
                      <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">
                        URL de la Imagen*
                      </label>
                      <input
                        id="imageUrl"
                        type="url"
                        {...form.register('imageUrl')}
                        className={`w-full px-4 py-2 rounded-md bg-black/60 border ${form.formState.errors.imageUrl ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-red-500/50`}
                        placeholder="https://ejemplo.com/tu-imagen.jpg"
                      />
                      {form.formState.errors.imageUrl && (
                        <p className="mt-1 text-sm text-red-500">{form.formState.errors.imageUrl.message}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        Comparte tu diseño en un servicio como Imgur y pega la URL directa de la imagen.
                      </p>
                    </div>
                    
                    {/* Categoría */}
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                        Categoría*
                      </label>
                      <select
                        id="category"
                        {...form.register('category')}
                        className={`w-full px-4 py-2 rounded-md bg-black/60 border ${form.formState.errors.category ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-red-500/50`}
                      >
                        <option value="camiseta">Camiseta</option>
                        <option value="sudadera">Sudadera</option>
                        <option value="gorra">Gorra</option>
                        <option value="accesorio">Accesorio</option>
                        <option value="otro">Otro</option>
                      </select>
                      {form.formState.errors.category && (
                        <p className="mt-1 text-sm text-red-500">{form.formState.errors.category.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    {/* Descripción */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                        Descripción*
                      </label>
                      <textarea
                        id="description"
                        {...form.register('description')}
                        rows={7}
                        className={`w-full px-4 py-2 rounded-md bg-black/60 border ${form.formState.errors.description ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-red-500/50`}
                        placeholder="Describe tu diseño, inspiración, colores, materiales sugeridos, etc."
                      ></textarea>
                      {form.formState.errors.description && (
                        <p className="mt-1 text-sm text-red-500">{form.formState.errors.description.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Vista previa de la imagen */}
                {form.watch('imageUrl') && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Vista Previa
                    </label>
                    <div className="h-64 rounded-md overflow-hidden border border-gray-700">
                      <img 
                        src={form.watch('imageUrl')} 
                        alt="Vista previa" 
                        className="w-full h-full object-contain bg-black/80"
                        onError={(e) => {
                          // Manejar error de carga de imagen
                          e.currentTarget.src = "https://via.placeholder.com/400x400?text=Error+de+imagen";
                        }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Pie de página y botones */}
                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-xs text-gray-500 mb-4 sm:mb-0">
                    * Campos obligatorios. Tu diseño será revisado antes de ser publicado.
                  </p>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setViewMode('gallery')}
                      className="px-6 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-black/30 transition-colors"
                    >
                      Cancelar
                    </button>
                    
                    <button
                      type="submit"
                      disabled={createDesignMutation.isPending}
                      className="bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#D10000] px-6 py-2 rounded-md text-white font-medium transition-all duration-300 flex items-center"
                    >
                      {createDesignMutation.isPending ? (
                        <>
                          <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        'Enviar Diseño'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Mensaje para usuarios no autenticados */}
        {!user && !isLoadingUser && (viewMode === 'myDesigns' || viewMode === 'form') && (
          <div className="text-center p-8 bg-black/30 rounded-lg border border-red-900/30">
            <p className="text-xl text-red-400 font-bold mb-2">Necesitas iniciar sesión</p>
            <p className="text-gray-300 mb-6">
              Para enviar tus diseños o ver tus creaciones, primero debes iniciar sesión o registrarte.
            </p>
            <Link href="/auth">
              <a className="bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#D10000] px-6 py-3 rounded-md text-white font-medium transition-all duration-300 inline-block">
                Iniciar Sesión / Registrarse
              </a>
            </Link>
          </div>
        )}
        
        {/* Información adicional */}
        <div className="mt-12 text-center max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-red-500 mb-4">¿Cómo funciona?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-black/30 p-5 rounded-lg border border-red-900/20">
              <div className="text-red-500 text-3xl font-bold mb-2">01</div>
              <h4 className="text-white font-bold mb-2">Diseña</h4>
              <p className="text-gray-400 text-sm">
                Crea tu diseño para cualquier producto de RED MAFIA: camisetas, sudaderas, gorras o accesorios.
              </p>
            </div>
            <div className="bg-black/30 p-5 rounded-lg border border-red-900/20">
              <div className="text-red-500 text-3xl font-bold mb-2">02</div>
              <h4 className="text-white font-bold mb-2">Comparte</h4>
              <p className="text-gray-400 text-sm">
                Sube tu diseño a la plataforma para que el equipo lo revise y lo apruebe para votación.
              </p>
            </div>
            <div className="bg-black/30 p-5 rounded-lg border border-red-900/20">
              <div className="text-red-500 text-3xl font-bold mb-2">03</div>
              <h4 className="text-white font-bold mb-2">Vota</h4>
              <p className="text-gray-400 text-sm">
                La comunidad vota por sus diseños favoritos. Los más populares podrían hacerse realidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}