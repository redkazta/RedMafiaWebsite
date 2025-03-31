import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, insertConcertSchema, insertGallerySchema, insertNewsSchema, insertReleaseSchema } from "@shared/schema";
import { z, ZodError } from "zod";
import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';

// Interfaces para mensajes de WebSocket
interface WsUser {
  id: string;
  username: string;
  ws: WebSocket;
  isAdmin?: boolean;
}

interface WsMessage {
  type: 'message' | 'join' | 'leave' | 'system' | 'reaction';
  userId: string;
  username: string; 
  content?: string;
  timestamp: number;
  messageId?: string;
  reaction?: string;
  isAdmin?: boolean;
}

// Almacenamiento temporal de usuarios conectados
const connectedUsers: Map<string, WsUser> = new Map();

export async function registerRoutes(app: Express): Promise<Server> {
  // Rutas API para Red Mafia
  
  // Obtener todos los lanzamientos
  app.get("/api/releases", async (req, res) => {
    try {
      const releases = await storage.getReleases();
      res.json(releases);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener lanzamientos" });
    }
  });
  
  // Obtener un lanzamiento por ID
  app.get("/api/releases/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }
      
      const release = await storage.getRelease(id);
      if (!release) {
        return res.status(404).json({ message: "Lanzamiento no encontrado" });
      }
      
      res.json(release);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el lanzamiento" });
    }
  });
  
  // Crear un nuevo lanzamiento
  app.post("/api/releases", async (req, res) => {
    try {
      const releaseData = insertReleaseSchema.parse(req.body);
      const newRelease = await storage.createRelease(releaseData);
      res.status(201).json(newRelease);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: (error as z.ZodError).errors });
      }
      res.status(500).json({ message: "Error al crear el lanzamiento" });
    }
  });
  
  // Obtener todos los conciertos
  app.get("/api/concerts", async (req, res) => {
    try {
      const concerts = await storage.getConcerts();
      res.json(concerts);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener conciertos" });
    }
  });
  
  // Obtener un concierto por ID
  app.get("/api/concerts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }
      
      const concert = await storage.getConcert(id);
      if (!concert) {
        return res.status(404).json({ message: "Concierto no encontrado" });
      }
      
      res.json(concert);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el concierto" });
    }
  });
  
  // Crear un nuevo concierto
  app.post("/api/concerts", async (req, res) => {
    try {
      const concertData = insertConcertSchema.parse(req.body);
      const newConcert = await storage.createConcert(concertData);
      res.status(201).json(newConcert);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: (error as z.ZodError).errors });
      }
      res.status(500).json({ message: "Error al crear el concierto" });
    }
  });
  
  // Obtener todas las noticias
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener noticias" });
    }
  });
  
  // Obtener una noticia por ID
  app.get("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }
      
      const newsItem = await storage.getNewsItem(id);
      if (!newsItem) {
        return res.status(404).json({ message: "Noticia no encontrada" });
      }
      
      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la noticia" });
    }
  });
  
  // Crear una nueva noticia
  app.post("/api/news", async (req, res) => {
    try {
      const newsData = insertNewsSchema.parse(req.body);
      const newNews = await storage.createNewsItem(newsData);
      res.status(201).json(newNews);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: (error as z.ZodError).errors });
      }
      res.status(500).json({ message: "Error al crear la noticia" });
    }
  });
  
  // Obtener todos los elementos de la galería
  app.get("/api/gallery", async (req, res) => {
    try {
      const galleryItems = await storage.getGalleryItems();
      res.json(galleryItems);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la galería" });
    }
  });
  
  // Obtener un elemento de la galería por ID
  app.get("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }
      
      const galleryItem = await storage.getGalleryItem(id);
      if (!galleryItem) {
        return res.status(404).json({ message: "Elemento de galería no encontrado" });
      }
      
      res.json(galleryItem);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el elemento de galería" });
    }
  });
  
  // Crear un nuevo elemento de galería
  app.post("/api/gallery", async (req, res) => {
    try {
      const galleryData = insertGallerySchema.parse(req.body);
      const newGalleryItem = await storage.createGalleryItem(galleryData);
      res.status(201).json(newGalleryItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: (error as z.ZodError).errors });
      }
      res.status(500).json({ message: "Error al crear el elemento de galería" });
    }
  });
  
  // Enviar mensaje de contacto
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = contactSchema.parse(req.body);
      const newContact = await storage.createContactMessage(contactData);
      res.status(201).json({ 
        success: true, 
        message: "Mensaje enviado correctamente",
        id: newContact.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: (error as z.ZodError).errors });
      }
      res.status(500).json({ message: "Error al enviar el mensaje" });
    }
  });

  const httpServer = createServer(app);
  
  // Configuración de WebSocket
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Función para transmitir mensajes a todos los usuarios conectados
  function broadcastMessage(message: WsMessage): void {
    const messageString = JSON.stringify(message);
    
    connectedUsers.forEach(user => {
      if (user.ws.readyState === WebSocket.OPEN) {
        user.ws.send(messageString);
      }
    });
  }
  
  // Manejar conexiones de WebSocket
  wss.on('connection', (ws: WebSocket) => {
    const userId = uuidv4();
    let username = '';
    
    // Evento cuando se recibe un mensaje
    ws.on('message', (data: string) => {
      try {
        const message = JSON.parse(data);
        
        // Manejar diferentes tipos de mensajes
        switch (message.type) {
          case 'join':
            // Usuario se une al chat
            username = message.username || `Usuario_${userId.substring(0, 5)}`;
            
            // Almacenar información del usuario
            connectedUsers.set(userId, {
              id: userId,
              username,
              ws,
              isAdmin: message.isAdmin || false
            });
            
            // Notificar a todos que un nuevo usuario se unió
            broadcastMessage({
              type: 'join',
              userId,
              username,
              timestamp: Date.now(),
              isAdmin: message.isAdmin || false
            });
            
            // Enviar mensaje de sistema de bienvenida solo al usuario que se unió
            ws.send(JSON.stringify({
              type: 'system',
              userId: 'system',
              username: 'RED MAFIA',
              content: `¡Bienvenido al chat, ${username}!`,
              timestamp: Date.now(),
              isAdmin: true
            }));
            break;
            
          case 'message':
            // Verificar que el usuario esté registrado
            if (!username) {
              ws.send(JSON.stringify({
                type: 'system',
                userId: 'system',
                username: 'Sistema',
                content: 'Por favor, únete al chat primero',
                timestamp: Date.now()
              }));
              return;
            }
            
            // Transmitir mensaje a todos
            broadcastMessage({
              type: 'message',
              userId,
              username,
              content: message.content,
              timestamp: Date.now(),
              messageId: uuidv4(),
              isAdmin: connectedUsers.get(userId)?.isAdmin || false
            });
            break;
            
          case 'reaction':
            // Agregar reacción a un mensaje
            broadcastMessage({
              type: 'reaction',
              userId,
              username,
              messageId: message.messageId,
              reaction: message.reaction,
              timestamp: Date.now()
            });
            break;
        }
      } catch (error) {
        console.error('Error al procesar mensaje de WebSocket:', error);
      }
    });
    
    // Evento de desconexión
    ws.on('close', () => {
      if (username && connectedUsers.has(userId)) {
        // Notificar a todos que el usuario se fue
        broadcastMessage({
          type: 'leave',
          userId,
          username,
          timestamp: Date.now()
        });
        
        // Eliminar usuario de la lista
        connectedUsers.delete(userId);
      }
    });
    
    // Enviar datos iniciales de conexión
    ws.send(JSON.stringify({
      type: 'system',
      userId: 'system',
      username: 'Sistema',
      content: 'Conectado al chat. Por favor, establece tu nombre de usuario.',
      timestamp: Date.now()
    }));
  });
  
  // API para obtener información sobre el chat
  app.get("/api/chat/users", (req, res) => {
    const users = Array.from(connectedUsers.values()).map(user => ({
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin || false
    }));
    
    res.json(users);
  });
  
  return httpServer;
}
