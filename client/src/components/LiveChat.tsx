import { useState, useEffect, useRef } from 'react';
import { Send, X, User, Smile, Flag, Camera, PlusCircle } from 'lucide-react';
import { BloodCorner } from './animated';

// Tipos de datos para el chat
interface ChatMessage {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  text: string;
  timestamp: number;
  isSystem?: boolean;
  reaction?: string;
}

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away';
}

interface LiveChatProps {
  eventName?: string;
  description?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onSendMessage?: (message: string) => void;
}

export default function LiveChat({
  eventName = 'Chat de Fans',
  description = 'Conéctate con otros fans de RED MAFIA',
  isOpen = false,
  onClose,
  onSendMessage
}: LiveChatProps) {
  // Estados
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState('');
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  // Referencias
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const websocketRef = useRef<WebSocket | null>(null);
  
  // Mock datos para demostración
  const demoEmojis = ['❤️', '🔥', '👏', '🎸', '🤘', '😎', '🎵', '👍', '🚀', '💯'];
  
  // Generar ID único
  const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };
  
  // Cargar mensajes y simular conexión al montar
  useEffect(() => {
    // Sistema de mensajes de demostración - en una implementación real, esto sería un WebSocket
    if (isOpen && username && !showUsernamePrompt) {
      // Simular conexión WebSocket
      const connectToWebSocket = () => {
        // En una implementación real, conectar a un WebSocket
        // const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        // const wsUrl = `${protocol}//${window.location.host}/ws`;
        // websocketRef.current = new WebSocket(wsUrl);
        
        // Demo: simular conexión exitosa
        setTimeout(() => {
          setIsConnected(true);
          
          // Mensaje de sistema para bienvenida
          addSystemMessage(`¡Bienvenido al chat, ${username}! Estás conectado.`);
          
          // Usuarios demo
          setUsers([
            { id: 'system', name: 'RED MAFIA Oficial', avatar: '/images/logo-red-mafia.png', status: 'online' },
            { id: 'user1', name: 'Fan_Metalero', status: 'online' },
            { id: 'user2', name: 'RockeraGDL', avatar: 'https://i.pravatar.cc/150?img=5', status: 'online' },
            { id: 'user3', name: 'BateristaLoco', status: 'away' },
            { id: 'user4', name: 'GuitarraElectrica', avatar: 'https://i.pravatar.cc/150?img=8', status: 'online' },
            { id: generateId(), name: username, status: 'online' },
          ]);
          
          // Historial demo
          setMessages([
            {
              id: 'm1',
              user: { id: 'user1', name: 'Fan_Metalero' },
              text: '¿Alguien sabe a qué hora empieza el show?',
              timestamp: Date.now() - 300000,
            },
            {
              id: 'm2',
              user: { id: 'user2', name: 'RockeraGDL', avatar: 'https://i.pravatar.cc/150?img=5' },
              text: 'Según el programa a las 9pm, pero ya sabes que siempre se atrasan un poco 🤘',
              timestamp: Date.now() - 240000,
            },
            {
              id: 'm3',
              user: { id: 'system', name: 'RED MAFIA Oficial', avatar: '/images/logo-red-mafia.png' },
              text: '¡El show comienza en 15 minutos! Prepárense para rockear 🔥🎸',
              timestamp: Date.now() - 180000,
              isSystem: true,
            },
            {
              id: 'm4',
              user: { id: 'user4', name: 'GuitarraElectrica', avatar: 'https://i.pravatar.cc/150?img=8' },
              text: '¡No puedo creer que vayan a tocar Sangre y Fuego! Es mi canción favorita',
              timestamp: Date.now() - 120000,
            },
          ]);
        }, 1000);
      };
      
      connectToWebSocket();
      
      // Limpieza
      return () => {
        if (websocketRef.current) {
          websocketRef.current.close();
        }
      };
    }
  }, [isOpen, username, showUsernamePrompt]);
  
  // Hacer scroll automático cuando hay nuevos mensajes
  useEffect(() => {
    if (chatBoxRef.current && !minimized) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    } else if (minimized) {
      setUnreadCount(prev => prev + 1);
    }
  }, [messages, minimized]);
  
  // Resetear contador de no leídos al maximizar
  useEffect(() => {
    if (!minimized) {
      setUnreadCount(0);
    }
  }, [minimized]);
  
  // Agregar mensaje al sistema
  const addSystemMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: generateId(),
      user: { id: 'system', name: 'RED MAFIA Oficial', avatar: '/images/logo-red-mafia.png' },
      text,
      timestamp: Date.now(),
      isSystem: true,
    };
    
    setMessages(prev => [...prev, newMessage]);
  };
  
  // Enviar mensaje
  const sendMessage = () => {
    if (!currentMessage.trim() || !isConnected) return;
    
    // Crear mensaje
    const newMessage: ChatMessage = {
      id: generateId(),
      user: { id: generateId(), name: username },
      text: currentMessage.trim(),
      timestamp: Date.now(),
    };
    
    // Agregar a la lista
    setMessages(prev => [...prev, newMessage]);
    
    // Limpiar input
    setCurrentMessage('');
    
    // Callback opcional
    if (onSendMessage) {
      onSendMessage(currentMessage.trim());
    }
    
    // En una implementación real, enviar por WebSocket
    // if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
    //   websocketRef.current.send(JSON.stringify({
    //     type: 'message',
    //     content: currentMessage.trim(),
    //     username
    //   }));
    // }
    
    // Demo: simular respuestas aleatorias después de enviar mensaje
    const shouldReply = Math.random() > 0.5;
    
    if (shouldReply) {
      const randomUser = users[Math.floor(Math.random() * (users.length - 1))];
      if (randomUser.id !== 'system') {
        setTimeout(() => {
          const demoReplies = [
            '¡Totalmente de acuerdo! 🔥',
            '¿Alguien más emocionado por escuchar las nuevas canciones?',
            'Este concierto está siendo ÉPICO',
            'RED MAFIA siempre entregando lo mejor',
            'Mi canción favorita es "Sangre y Fuego", ¿cuál es la tuya?',
            '¡La energía está a tope! 🤘',
            '¿Alguien va al concierto en Guadalajara el próximo mes?'
          ];
          
          const replyMessage: ChatMessage = {
            id: generateId(),
            user: randomUser,
            text: demoReplies[Math.floor(Math.random() * demoReplies.length)],
            timestamp: Date.now(),
          };
          
          setMessages(prev => [...prev, replyMessage]);
        }, 2000 + Math.random() * 3000);
      }
    }
  };
  
  // Formatear hora
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Confirmar nombre de usuario
  const confirmUsername = () => {
    if (!username.trim()) return;
    setShowUsernamePrompt(false);
  };
  
  // Añadir emoji al mensaje
  const addEmoji = (emoji: string) => {
    setCurrentMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };
  
  // Manejar intro en el input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  // Si está minimizado, mostrar solo un botón
  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button 
          onClick={() => setMinimized(false)}
          className="bg-[#950101] hover:bg-[#FF0000] text-white p-4 rounded-full shadow-lg flex items-center justify-center relative red-mafia-glow"
        >
          <User size={24} />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#FF0000] text-xs text-white rounded-full w-6 h-6 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-0 right-0 sm:bottom-4 sm:right-4 z-40 w-full sm:w-[350px] h-[500px] bg-[#121212] border border-[#2D0000] rounded-t-lg sm:rounded-lg shadow-2xl overflow-hidden flex flex-col red-mafia-glass">
      {/* Decoración */}
      <BloodCorner position="top-left" size={60} />
      <BloodCorner position="bottom-right" size={60} />
      
      {/* Prompt para ingresar nombre de usuario */}
      {showUsernamePrompt && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-10 flex items-center justify-center p-6">
          <div className="bg-[#1A1A1A] border border-[#950101] rounded-lg p-6 w-full max-w-sm shadow-2xl">
            <h3 className="red-mafia-title text-2xl mb-4 text-center">UNIRSE AL CHAT</h3>
            <p className="text-[#F5F5F5]/70 mb-6 text-center">Ingresa tu nombre para chatear con otros fans de RED MAFIA</p>
            
            <div className="mb-4">
              <label htmlFor="username" className="text-[#F5F5F5] text-sm mb-1 block">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tu nombre"
                className="w-full bg-[#252525] border border-[#950101]/50 rounded px-4 py-2 text-white focus:outline-none focus:border-[#FF0000]"
                onKeyDown={(e) => e.key === 'Enter' && confirmUsername()}
              />
            </div>
            
            <button
              onClick={confirmUsername}
              disabled={!username.trim()}
              className={`w-full py-2 rounded font-medium ${
                username.trim() 
                  ? 'bg-[#950101] hover:bg-[#FF0000] text-white cursor-pointer' 
                  : 'bg-[#2D2D2D] text-[#F5F5F5]/50 cursor-not-allowed'
              } transition-colors`}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
      
      {/* Encabezado */}
      <div className="bg-[#1A0A0A] p-3 flex items-center justify-between border-b border-[#2D0000]">
        <div>
          <h3 className="font-bold text-[#FF0000] text-lg">{eventName}</h3>
          <p className="text-[#F5F5F5]/70 text-xs">{description}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMinimized(true)}
            className="text-[#F5F5F5]/70 hover:text-white p-1.5 rounded-md hover:bg-[#950101]/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
          
          {onClose && (
            <button
              onClick={onClose}
              className="text-[#F5F5F5]/70 hover:text-white p-1.5 rounded-md hover:bg-[#950101]/20 transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
      
      {/* Contador de usuarios */}
      <div className="bg-[#0F0F0F] px-3 py-1.5 text-xs text-[#F5F5F5]/70 border-b border-[#2D0000] flex items-center justify-between">
        <span>{users.length} usuarios en línea</span>
        <span className={`flex items-center ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
          <span className={`w-2 h-2 rounded-full mr-1.5 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          {isConnected ? 'Conectado' : 'Conectando...'}
        </span>
      </div>
      
      {/* Contenido principal del chat */}
      <div className="flex flex-1 overflow-hidden">
        {/* Lista de mensajes */}
        <div
          ref={chatBoxRef}
          className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#0A0A0A]/80"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isSystem ? 'justify-center' : 'items-start'}`}
            >
              {!message.isSystem && (
                <div className="flex-shrink-0 mr-2">
                  {message.user.avatar ? (
                    <img
                      src={message.user.avatar}
                      alt={message.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#950101] flex items-center justify-center text-white font-bold">
                      {message.user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              )}
              
              <div 
                className={`
                  ${message.isSystem 
                    ? 'bg-[#950101]/20 border border-[#950101]/40 text-[#F5F5F5] py-1.5 px-3 rounded-md inline-block' 
                    : 'flex-1'
                  }
                `}
              >
                {!message.isSystem && (
                  <div className="flex items-baseline mb-1">
                    <span className="font-bold text-[#FF0000] text-sm">{message.user.name}</span>
                    <span className="text-[#F5F5F5]/50 text-xs ml-2">{formatTime(message.timestamp)}</span>
                  </div>
                )}
                
                <div className={`${message.isSystem ? 'text-center text-sm' : 'text-[#F5F5F5] break-words'}`}>
                  {message.text}
                </div>
                
                {!message.isSystem && (
                  <div className="flex items-center mt-1">
                    {message.reaction && (
                      <span className="text-xs bg-[#2D0000] rounded-full px-2 py-0.5 text-[#F5F5F5]/80">
                        {message.reaction}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Área para escribir mensajes */}
      <div className="bg-[#1A1A1A] p-3 border-t border-[#2D0000]">
        <div className="flex items-end gap-2">
          <div className="relative flex-1">
            <textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Escribe un mensaje..."
              className="w-full bg-[#252525] border border-[#950101]/50 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#FF0000] resize-none max-h-32 min-h-[38px]"
              rows={1}
            />
            
            <div className="absolute bottom-2 right-2 flex items-center space-x-1.5">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-[#F5F5F5]/50 hover:text-[#F5F5F5] transition-colors"
              >
                <Smile size={16} />
              </button>
              <button
                className="text-[#F5F5F5]/50 hover:text-[#F5F5F5] transition-colors"
              >
                <Camera size={16} />
              </button>
            </div>
            
            {/* Selector de emojis */}
            {showEmojiPicker && (
              <div className="absolute bottom-full mb-2 right-0 bg-[#1A1A1A] border border-[#2D0000] rounded-md p-2 shadow-lg w-[200px]">
                <div className="grid grid-cols-5 gap-2">
                  {demoEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => addEmoji(emoji)}
                      className="text-lg hover:bg-[#950101]/20 rounded p-1 transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={sendMessage}
            disabled={!currentMessage.trim() || !isConnected}
            className={`p-2 rounded-md ${
              currentMessage.trim() && isConnected
                ? 'bg-[#950101] hover:bg-[#FF0000] text-white cursor-pointer' 
                : 'bg-[#2D2D2D] text-[#F5F5F5]/50 cursor-not-allowed'
            } transition-colors`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}