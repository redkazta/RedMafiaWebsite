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

// Sistema de membresía "La Familia"
export const memberships = pgTable("memberships", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  type: text("type").notNull(), // "free", "standard", "premium", "vip"
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  status: text("status").notNull(), // "active", "expired", "canceled"
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const membershipSchema = createInsertSchema(memberships).omit({ 
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertMembership = z.infer<typeof membershipSchema>;
export type Membership = typeof memberships.$inferSelect;

// Sistema "Diseña el Próximo Merch"
export const merchDesigns = pgTable("merch_designs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // "camiseta", "sudadera", "gorra", "accesorio", "otro"
  status: text("status").notNull(), // "pending", "approved", "rejected", "production"
  votes: integer("votes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const merchDesignSchema = createInsertSchema(merchDesigns).omit({ 
  id: true,
  votes: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertMerchDesign = z.infer<typeof merchDesignSchema>;
export type MerchDesign = typeof merchDesigns.$inferSelect;

// Sistema de votos para los diseños
export const merchVotes = pgTable("merch_votes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  designId: integer("design_id").notNull().references(() => merchDesigns.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const merchVoteSchema = createInsertSchema(merchVotes).omit({ 
  id: true,
  createdAt: true,
});

export type InsertMerchVote = z.infer<typeof merchVoteSchema>;
export type MerchVote = typeof merchVotes.$inferSelect;

// Sistema "Bloodline" - Árbol de Influencias Musicales
export const influencers = pgTable("influencers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio"),
  imageUrl: text("image_url"),
  genre: text("genre").notNull(),
  era: text("era"), // "60s", "70s", "80s", "90s", "2000s", "2010s", "2020s"
  externalUrl: text("external_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const influencerSchema = createInsertSchema(influencers).omit({ 
  id: true,
  createdAt: true,
});

export type InsertInfluencer = z.infer<typeof influencerSchema>;
export type Influencer = typeof influencers.$inferSelect;

// Relaciones entre canciones e influencias
export const songInfluences = pgTable("song_influences", {
  id: serial("id").primaryKey(),
  songId: integer("song_id").notNull(),
  influencerId: integer("influencer_id").notNull().references(() => influencers.id),
  description: text("description"),
  sampleUrl: text("sample_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const songInfluenceSchema = createInsertSchema(songInfluences).omit({ 
  id: true,
  createdAt: true,
});

export type InsertSongInfluence = z.infer<typeof songInfluenceSchema>;
export type SongInfluence = typeof songInfluences.$inferSelect;

// Sistema "Red Challenges"
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // "cover", "fanart", "cosplay", "remix", "other"
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date").notNull(),
  prize: text("prize"),
  status: text("status").notNull(), // "upcoming", "active", "voting", "closed"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const challengeSchema = createInsertSchema(challenges).omit({ 
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertChallenge = z.infer<typeof challengeSchema>;
export type Challenge = typeof challenges.$inferSelect;

// Entradas para los Challenges
export const challengeEntries = pgTable("challenge_entries", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").notNull().references(() => challenges.id),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  mediaUrl: text("media_url").notNull(),
  votes: integer("votes").default(0),
  status: text("status").notNull(), // "pending", "approved", "rejected", "winner"
  createdAt: timestamp("created_at").defaultNow(),
});

export const challengeEntrySchema = createInsertSchema(challengeEntries).omit({ 
  id: true,
  votes: true,
  createdAt: true,
});

export type InsertChallengeEntry = z.infer<typeof challengeEntrySchema>;
export type ChallengeEntry = typeof challengeEntries.$inferSelect;

// Votos para las entradas de Challenges
export const challengeVotes = pgTable("challenge_votes", {
  id: serial("id").primaryKey(),
  entryId: integer("entry_id").notNull().references(() => challengeEntries.id),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const challengeVoteSchema = createInsertSchema(challengeVotes).omit({ 
  id: true,
  createdAt: true,
});

export type InsertChallengeVote = z.infer<typeof challengeVoteSchema>;
export type ChallengeVote = typeof challengeVotes.$inferSelect;
