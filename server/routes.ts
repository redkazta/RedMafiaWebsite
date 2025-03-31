import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, insertConcertSchema, insertGallerySchema, insertNewsSchema, insertReleaseSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod-validation-error";

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
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
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
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
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
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
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
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
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
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Datos inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Error al enviar el mensaje" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
