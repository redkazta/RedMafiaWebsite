import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Usuarios del sistema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Lanzamientos musicales
export const releases = pgTable("releases", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // Álbum, EP, Single, etc.
  year: text("year").notNull(),
  tracks: integer("tracks").notNull(),
  description: text("description").notNull(),
  coverImage: text("cover_image").notNull(),
  audioFiles: text("audio_files").array(), // URLs de los archivos de audio
  trackTitles: text("track_titles").array(), // Títulos de las pistas
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReleaseSchema = createInsertSchema(releases).omit({ 
  id: true,
  createdAt: true 
});

export type InsertRelease = z.infer<typeof insertReleaseSchema>;
export type Release = typeof releases.$inferSelect;

// Conciertos/Presentaciones
export const concerts = pgTable("concerts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(), // Día del mes
  month: text("month").notNull(),
  year: text("year").notNull(),
  venue: text("venue").notNull(),
  doors: text("doors").notNull(), // Hora de apertura
  start: text("start").notNull(), // Hora de inicio
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertConcertSchema = createInsertSchema(concerts).omit({ 
  id: true, 
  createdAt: true 
});

export type InsertConcert = z.infer<typeof insertConcertSchema>;
export type Concert = typeof concerts.$inferSelect;

// Noticias del blog
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  date: text("date").notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNewsSchema = createInsertSchema(news).omit({ 
  id: true, 
  createdAt: true 
});

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

// Elementos de la galería
export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGallerySchema = createInsertSchema(gallery).omit({ 
  id: true, 
  createdAt: true 
});

export type InsertGalleryItem = z.infer<typeof insertGallerySchema>;
export type GalleryItem = typeof gallery.$inferSelect;

// Contacto
export const contact = pgTable("contact", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactSchema = createInsertSchema(contact).omit({ 
  id: true, 
  createdAt: true 
});

export type InsertContact = z.infer<typeof contactSchema>;
export type Contact = typeof contact.$inferSelect;
