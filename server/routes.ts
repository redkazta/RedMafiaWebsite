import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactSchema, 
  insertConcertSchema, 
  insertGallerySchema, 
  insertNewsSchema, 
  insertReleaseSchema,
  membershipSchema,
  merchDesignSchema,
  influencerSchema,
  songInfluenceSchema,
  challengeSchema,
  challengeEntrySchema
} from "@shared/schema";
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

  // ===== SISTEMA DE MEMBRESÍA "LA FAMILIA" =====
  
  // Obtener todas las membresías (admin)
  app.get("/api/memberships", async (req, res) => {
    try {
      const memberships = await storage.getMemberships();
      res.json(memberships);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener membresías" });
    }
  });
  
  // Obtener membresía del usuario actual
  app.get("/api/memberships/me", async (req, res) => {
    if (!req.isAuthenticated?.()) {
      return res.status(401).json({ message: "No autenticado" });
    }
    
    try {
      const membership = await storage.getMembershipByUserId(req.user.id);
      if (membership) {
        res.json(membership);
      } else {
        res.status(404).json({ message: "Membresía no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener membresía" });
    }
  });
  
  // Crear membresía
  app.post("/api/memberships", async (req, res) => {
    if (!req.isAuthenticated?.()) {
      return res.status(401).json({ message: "No autenticado" });
    }
    
    try {
      // Verificar si ya existe una membresía para el usuario
      const existingMembership = await storage.getMembershipByUserId(req.user.id);
      if (existingMembership) {
        return res.status(400).json({ message: "Ya tienes una membresía" });
      }
      
      const data = membershipSchema.parse({
        ...req.body,
        userId: req.user.id,
        status: "active" // Por defecto, la membresía nueva está activa
      });
      
      const membership = await storage.createMembership(data);
      res.status(201).json(membership);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: (error as z.ZodError).errors });
      }
      res.status(500).json({ message: "Error al crear membresía" });
    }
  });
  
  // Actualizar membresía
  app.patch("/api/memberships/:id", async (req, res) => {
    if (!req.isAuthenticated?.()) {
      return res.status(401).json({ message: "No autenticado" });
    }
    
    try {
      const id = parseInt(req.params.id);
      
      // Verificar si la membresía existe y pertenece al usuario
      const membership = await storage.getMembershipByUserId(req.user.id);
      if (!membership || membership.id !== id) {
        return res.status(404).json({ message: "Membresía no encontrada" });
      }
      
      const updatedMembership = await storage.updateMembership(id, req.body);
      res.json(updatedMembership);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: (error as z.ZodError).errors });
      }
      res.status(500).json({ message: "Error al actualizar membresía" });
    }
  });
  
  // ===== SISTEMA "DISEÑA EL PRÓXIMO MERCH" =====
  
  // Obtener todos los diseños (con filtro opcional)
  app.get("/api/merch-designs", async (req, res) => {
    try {
      const { category, status } = req.query;
      
      const filter: {category?: string; status?: string} = {};
      if (category) filter.category = category as string;
      if (status) filter.status = status as string;
      
      const designs = await storage.getMerchDesigns(filter);
      res.json(designs);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener diseños" });
    }
  });
  
  // Obtener un diseño específico
  app.get("/api/merch-designs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const design = await storage.getMerchDesign(id);
      
      if (design) {
        res.json(design);
      } else {
        res.status(404).json({ message: "Diseño no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener diseño" });
    }
  });
  
  // Obtener diseños del usuario actual
  app.get("/api/merch-designs/user/me", async (req, res) => {
    if (!req.isAuthenticated?.()) {
      return res.status(401).json({ message: "No autenticado" });
    }
    
    try {
      const designs = await storage.getMerchDesignsByUser(req.user.id);
      res.json(designs);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener diseños" });
    }
  });
  
  // Crear un nuevo diseño
  app.post("/api/merch-designs", async (req, res) => {
    if (!req.isAuthenticated?.()) {
      return res.status(401).json({ message: "No autenticado" });
    }
    
    try {
      const data = merchDesignSchema.parse({
        ...req.body,
        userId: req.user.id,
        status: "pending" // Por defecto, los diseños nuevos están pendientes de aprobación
      });
      
      const design = await storage.createMerchDesign(data);
      res.status(201).json(design);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: (error as z.ZodError).errors });
      }
      res.status(500).json({ message: "Error al crear diseño" });
    }
  });
  
  // Actualizar un diseño
  app.patch("/api/merch-designs/:id", async (req, res) => {
    if (!req.isAuthenticated?.()) {
      return res.status(401).json({ message: "No autenticado" });
    }
    
    try {
      const id = parseInt(req.params.id);
      const design = await storage.getMerchDesign(id);
      
      // Verificar si el diseño existe y pertenece al usuario (a menos que sea admin)
      if (!design || (design.userId !== req.user.id && !req.user.isAdmin)) {
        return res.status(404).json({ message: "Diseño no encontrado o no tienes permiso para editarlo" });
      }
      
      // Los usuarios normales solo pueden editar diseños pendientes
      if (design.userId === req.user.id && design.status !== "pending" && !req.user.isAdmin) {
        return res.status(403).json({ message: "Solo puedes editar diseños que estén en estado pendiente" });
      }
      
      const updatedDesign = await storage.updateMerchDesign(id, req.body);
      res.json(updatedDesign);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: (error as z.ZodError).errors });
      }
      res.status(500).json({ message: "Error al actualizar diseño" });
    }
  });
  
  // Votar por un diseño
  app.post("/api/merch-designs/:id/vote", async (req, res) => {
    if (!req.isAuthenticated?.()) {
      return res.status(401).json({ message: "No autenticado" });
    }
    
    try {
      const designId = parseInt(req.params.id);
      const design = await storage.getMerchDesign(designId);
      
      // Verificar si el diseño existe y está aprobado
      if (!design || design.status !== "approved") {
        return res.status(404).json({ message: "Diseño no encontrado o no disponible para votación" });
      }
      
      // No se puede votar por diseños propios
      if (design.userId === req.user.id) {
        return res.status(403).json({ message: "No puedes votar por tus propios diseños" });
      }
      
      const result = await storage.voteMerchDesign(req.user.id, designId);
      
      if (result) {
        res.json({ success: true, message: "Voto registrado correctamente" });
      } else {
        res.status(400).json({ message: "Ya has votado por este diseño" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al votar por el diseño" });
    }
  });
  
  // Obtener los diseños por los que ha votado el usuario
  app.get("/api/merch-designs/votes/me", async (req, res) => {
    if (!req.isAuthenticated?.()) {
      return res.status(401).json({ message: "No autenticado" });
    }
    
    try {
      const votedDesignIds = await storage.getVotedDesigns(req.user.id);
      res.json(votedDesignIds);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener votos" });
    }
  });
  
  // ===== SISTEMA "BLOODLINE" - ÁRBOL DE INFLUENCIAS MUSICALES =====
  
  // Obtener todos los influencers
  app.get("/api/influencers", async (req, res) => {
    try {
      const influencers = await storage.getInfluencers();
      res.json(influencers);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener influencers" });
    }
  });
  
  // Obtener un influencer específico
  app.get("/api/influencers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const influencer = await storage.getInfluencer(id);
      
      if (influencer) {
        res.json(influencer);
      } else {
        res.status(404).json({ message: "Influencer no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener influencer" });
    }
  });
  
  // Crear un nuevo influencer (solo admin)
  app.post("/api/influencers", async (req, res) => {
    if (!req.isAuthenticated?.() || !req.user.isAdmin) {
      return res.status(403).json({ message: "No autorizado" });
    }
    
    try {
      const data = influencerSchema.parse(req.body);
      const influencer = await storage.createInfluencer(data);
      res.status(201).json(influencer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: (error as z.ZodError).errors });
      }
      res.status(500).json({ message: "Error al crear influencer" });
    }
  });
  
  // Obtener influencias para una canción
  app.get("/api/songs/:songId/influences", async (req, res) => {
    try {
      const songId = parseInt(req.params.songId);
      const influences = await storage.getSongInfluences(songId);
      res.json(influences);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener influencias" });
    }
  });
  
  // Crear una relación de influencia para una canción (solo admin)
  app.post("/api/songs/:songId/influences", async (req, res) => {
    if (!req.isAuthenticated?.() || !req.user.isAdmin) {
      return res.status(403).json({ message: "No autorizado" });
    }
    
    try {
      const songId = parseInt(req.params.songId);
      const data = songInfluenceSchema.parse({
        ...req.body,
        songId
      });
      
      const influence = await storage.createSongInfluence(data);
      res.status(201).json(influence);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: (error as z.ZodError).errors });
      }
      res.status(500).json({ message: "Error al crear influencia" });
    }
  });
  
  // ===== SISTEMA "RED CHALLENGES" =====
  
  // Obtener todos los challenges (con filtro opcional)
  app.get("/api/challenges", async (req, res) => {
    try {
      const { status, category } = req.query;
      
      const filter: {status?: string; category?: string} = {};
      if (status) filter.status = status as string;
      if (category) filter.category = category as string;
      
      const challenges = await storage.getChallenges(filter);
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener challenges" });
    }
  });
  
  // Obtener un challenge específico
  app.get("/api/challenges/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const challenge = await storage.getChallenge(id);
      
      if (challenge) {
        res.json(challenge);
      } else {
        res.status(404).json({ message: "Challenge no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener challenge" });
    }
  });
  
  // Crear un nuevo challenge (solo admin)
  app.post("/api/challenges", async (req, res) => {
    if (!req.isAuthenticated?.() || !req.user.isAdmin) {
      return res.status(403).json({ message: "No autorizado" });
    }
    
    try {
      const data = challengeSchema.parse(req.body);
      const challenge = await storage.createChallenge(data);
      res.status(201).json(challenge);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: (error as z.ZodError).errors });
      }
      res.status(500).json({ message: "Error al crear challenge" });
    }
  });
  
  // Actualizar un challenge (solo admin)
  app.patch("/api/challenges/:id", async (req, res) => {
    if (!req.isAuthenticated?.() || !req.user.isAdmin) {
      return res.status(403).json({ message: "No autorizado" });
    }
    
    try {
      const id = parseInt(req.params.id);
      const updatedChallenge = await storage.updateChallenge(id, req.body);
      res.json(updatedChallenge);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: (error as z.ZodError).errors });
      }
      res.status(500).json({ message: "Error al actualizar challenge" });
    }
  });
  
  // Obtener todas las entradas de un challenge
  app.get("/api/challenges/:id/entries", async (req, res) => {
    try {
      const challengeId = parseInt(req.params.id);
      const entries = await storage.getChallengeEntries(challengeId);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener entradas" });
    }
  });
  
  // Obtener una entrada específica
  app.get("/api/challenge-entries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const entry = await storage.getChallengeEntry(id);
      
      if (entry) {
        res.json(entry);
      } else {
        res.status(404).json({ message: "Entrada no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener entrada" });
    }
  });
  
  // Obtener las entradas del usuario actual
  app.get("/api/challenge-entries/user/me", async (req, res) => {
    if (!req.isAuthenticated?.()) {
      return res.status(401).json({ message: "No autenticado" });
    }
    
    try {
      const entries = await storage.getUserChallengeEntries(req.user.id);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener entradas" });
    }
  });
  
  // Crear una nueva entrada para un challenge
  app.post("/api/challenges/:id/entries", async (req, res) => {
    if (!req.isAuthenticated?.()) {
      return res.status(401).json({ message: "No autenticado" });
    }
    
    try {
      const challengeId = parseInt(req.params.id);
      const challenge = await storage.getChallenge(challengeId);
      
      // Verificar si el challenge existe y está activo
      if (!challenge || challenge.status !== "active") {
        return res.status(404).json({ message: "Challenge no encontrado o no está activo" });
      }
      
      const data = challengeEntrySchema.parse({
        ...req.body,
        challengeId,
        userId: req.user.id,
        status: "pending" // Por defecto, las entradas nuevas están pendientes de aprobación
      });
      
      const entry = await storage.createChallengeEntry(data);
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: (error as z.ZodError).errors });
      }
      res.status(500).json({ message: "Error al crear entrada" });
    }
  });
  
  // Actualizar una entrada
  app.patch("/api/challenge-entries/:id", async (req, res) => {
    if (!req.isAuthenticated?.()) {
      return res.status(401).json({ message: "No autenticado" });
    }
    
    try {
      const id = parseInt(req.params.id);
      const entry = await storage.getChallengeEntry(id);
      
      // Verificar si la entrada existe y pertenece al usuario (a menos que sea admin)
      if (!entry || (entry.userId !== req.user.id && !req.user.isAdmin)) {
        return res.status(404).json({ message: "Entrada no encontrada o no tienes permiso para editarla" });
      }
      
      // Los usuarios normales solo pueden editar entradas pendientes
      if (entry.userId === req.user.id && entry.status !== "pending" && !req.user.isAdmin) {
        return res.status(403).json({ message: "Solo puedes editar entradas que estén en estado pendiente" });
      }
      
      const updatedEntry = await storage.updateChallengeEntry(id, req.body);
      res.json(updatedEntry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: (error as z.ZodError).errors });
      }
      res.status(500).json({ message: "Error al actualizar entrada" });
    }
  });
  
  // Votar por una entrada
  app.post("/api/challenge-entries/:id/vote", async (req, res) => {
    if (!req.isAuthenticated?.()) {
      return res.status(401).json({ message: "No autenticado" });
    }
    
    try {
      const entryId = parseInt(req.params.id);
      const entry = await storage.getChallengeEntry(entryId);
      
      if (!entry) {
        return res.status(404).json({ message: "Entrada no encontrada" });
      }
      
      // Verificar que el challenge esté en modo de votación
      const challenge = await storage.getChallenge(entry.challengeId);
      if (!challenge || challenge.status !== "voting") {
        return res.status(400).json({ message: "Este challenge no está en fase de votación actualmente" });
      }
      
      // No se puede votar por entradas propias
      if (entry.userId === req.user.id) {
        return res.status(403).json({ message: "No puedes votar por tus propias entradas" });
      }
      
      // Verificar que la entrada esté aprobada
      if (entry.status !== "approved") {
        return res.status(400).json({ message: "Esta entrada no está disponible para votación" });
      }
      
      const result = await storage.voteChallengeEntry(req.user.id, entryId);
      
      if (result) {
        res.json({ success: true, message: "Voto registrado correctamente" });
      } else {
        res.status(400).json({ message: "Ya has votado por esta entrada" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al votar por la entrada" });
    }
  });
  
  // Obtener las entradas por las que ha votado el usuario
  app.get("/api/challenge-entries/votes/me", async (req, res) => {
    if (!req.isAuthenticated?.()) {
      return res.status(401).json({ message: "No autenticado" });
    }
    
    try {
      const votedEntryIds = await storage.getVotedEntries(req.user.id);
      res.json(votedEntryIds);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener votos" });
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
