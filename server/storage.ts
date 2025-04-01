import { 
  users, type User, type InsertUser,
  releases, type Release, type InsertRelease,
  concerts, type Concert, type InsertConcert,
  news, type News, type InsertNews,
  gallery, type GalleryItem, type InsertGalleryItem,
  contact, type Contact, type InsertContact,
  memberships, type Membership, type InsertMembership,
  merchDesigns, type MerchDesign, type InsertMerchDesign,
  merchVotes, type MerchVote, type InsertMerchVote,
  influencers, type Influencer, type InsertInfluencer,
  songInfluences, type SongInfluence, type InsertSongInfluence,
  challenges, type Challenge, type InsertChallenge,
  challengeEntries, type ChallengeEntry, type InsertChallengeEntry,
  challengeVotes, type ChallengeVote, type InsertChallengeVote
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Releases
  getReleases(): Promise<Release[]>;
  getRelease(id: number): Promise<Release | undefined>;
  createRelease(release: InsertRelease): Promise<Release>;
  
  // Concerts
  getConcerts(): Promise<Concert[]>;
  getConcert(id: number): Promise<Concert | undefined>;
  createConcert(concert: InsertConcert): Promise<Concert>;
  
  // News
  getAllNews(): Promise<News[]>;
  getNewsItem(id: number): Promise<News | undefined>;
  createNewsItem(newsItem: InsertNews): Promise<News>;
  
  // Gallery
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItem(id: number): Promise<GalleryItem | undefined>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  
  // Contact
  createContactMessage(message: InsertContact): Promise<Contact>;
  
  // Membresía "La Familia"
  getMemberships(): Promise<Membership[]>;
  getMembershipByUserId(userId: number): Promise<Membership | undefined>;
  createMembership(membership: InsertMembership): Promise<Membership>;
  updateMembership(id: number, data: Partial<InsertMembership>): Promise<Membership>;
  updateStripeInfo(userId: number, stripeCustomerId: string, stripeSubscriptionId: string): Promise<Membership>;
  
  // Diseño de Merch
  getMerchDesigns(filter?: {category?: string; status?: string}): Promise<MerchDesign[]>;
  getMerchDesign(id: number): Promise<MerchDesign | undefined>;
  getMerchDesignsByUser(userId: number): Promise<MerchDesign[]>;
  createMerchDesign(design: InsertMerchDesign): Promise<MerchDesign>;
  updateMerchDesign(id: number, data: Partial<InsertMerchDesign>): Promise<MerchDesign>;
  voteMerchDesign(userId: number, designId: number): Promise<boolean>;
  getVotedDesigns(userId: number): Promise<number[]>;
  
  // Influencias Musicales
  getInfluencers(): Promise<Influencer[]>;
  getInfluencer(id: number): Promise<Influencer | undefined>;
  createInfluencer(influencer: InsertInfluencer): Promise<Influencer>;
  getSongInfluences(songId: number): Promise<SongInfluence[]>;
  createSongInfluence(influence: InsertSongInfluence): Promise<SongInfluence>;
  
  // Red Challenges
  getChallenges(filter?: {status?: string; category?: string}): Promise<Challenge[]>;
  getChallenge(id: number): Promise<Challenge | undefined>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  updateChallenge(id: number, data: Partial<InsertChallenge>): Promise<Challenge>;
  getChallengeEntries(challengeId: number): Promise<ChallengeEntry[]>;
  getChallengeEntry(id: number): Promise<ChallengeEntry | undefined>;
  getUserChallengeEntries(userId: number): Promise<ChallengeEntry[]>;
  createChallengeEntry(entry: InsertChallengeEntry): Promise<ChallengeEntry>;
  updateChallengeEntry(id: number, data: Partial<InsertChallengeEntry>): Promise<ChallengeEntry>;
  voteChallengeEntry(userId: number, entryId: number): Promise<boolean>;
  getVotedEntries(userId: number): Promise<number[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private releases: Map<number, Release>;
  private concerts: Map<number, Concert>;
  private newsItems: Map<number, News>;
  private galleryItems: Map<number, GalleryItem>;
  private contactMessages: Map<number, Contact>;
  private memberships: Map<number, Membership>;
  private merchDesigns: Map<number, MerchDesign>;
  private merchVotes: Map<number, MerchVote>;
  private influencers: Map<number, Influencer>;
  private songInfluences: Map<number, SongInfluence>;
  private challenges: Map<number, Challenge>;
  private challengeEntries: Map<number, ChallengeEntry>;
  private challengeVotes: Map<number, ChallengeVote>;
  
  private nextUserId: number;
  private nextReleaseId: number;
  private nextConcertId: number;
  private nextNewsId: number;
  private nextGalleryId: number;
  private nextContactId: number;
  private nextMembershipId: number;
  private nextMerchDesignId: number;
  private nextMerchVoteId: number;
  private nextInfluencerId: number;
  private nextSongInfluenceId: number;
  private nextChallengeId: number;
  private nextChallengeEntryId: number;
  private nextChallengeVoteId: number;

  constructor() {
    this.users = new Map();
    this.releases = new Map();
    this.concerts = new Map();
    this.newsItems = new Map();
    this.galleryItems = new Map();
    this.contactMessages = new Map();
    this.memberships = new Map();
    this.merchDesigns = new Map();
    this.merchVotes = new Map();
    this.influencers = new Map();
    this.songInfluences = new Map();
    this.challenges = new Map();
    this.challengeEntries = new Map();
    this.challengeVotes = new Map();
    
    this.nextUserId = 1;
    this.nextReleaseId = 1;
    this.nextConcertId = 1;
    this.nextNewsId = 1;
    this.nextGalleryId = 1;
    this.nextContactId = 1;
    this.nextMembershipId = 1;
    this.nextMerchDesignId = 1;
    this.nextMerchVoteId = 1;
    this.nextInfluencerId = 1;
    this.nextSongInfluenceId = 1;
    this.nextChallengeId = 1;
    this.nextChallengeEntryId = 1;
    this.nextChallengeVoteId = 1;
    
    // Inicializar datos demo
    this.initDemoData();
  }

  // Inicializar datos de ejemplo
  private initDemoData() {
    console.log('Initializing demo data...');
    // Releases
    this.createRelease({
      title: "SANGRE Y FUEGO",
      type: "Álbum",
      year: "2023",
      tracks: 12,
      description: "Nuestro álbum debut que captura la esencia cruda y poderosa del metal latino. Una fusión única de agresividad y pasión.",
      coverImage: "/assets/rh.jpeg",
      audioFiles: [
        "https://p.scdn.co/mp3-preview/2f1888daa2c9fb0e0f795974a458d0ae1d21df54",
        "https://p.scdn.co/mp3-preview/9c11c16e4907b9c9ee31c8d70a702d4b92748de4",
        "https://p.scdn.co/mp3-preview/df2b5f123d4624a7f62c1765e59d1cd8435a3477"
      ],
      trackTitles: [
        "Puño de Hierro",
        "Noches Sangrientas",
        "Fuego en las Calles",
        "Reina de la Noche",
        "Sombras del Pasado",
        "Alma de Metal",
        "Guerreros del Sur",
        "Herederos del Fuego",
        "Sangre en las Venas",
        "Código de Honor",
        "Legado Eterno",
        "Llamas de Libertad"
      ]
    });
    
    this.createRelease({
      title: "FURY UNLEASHED",
      type: "Single",
      year: "2024",
      tracks: 1,
      description: "Nuestro más reciente single que marca una evolución en nuestro sonido, fusionando la agresividad del metal con elementos sinfónicos.",
      coverImage: "/assets/imagen_1743454510922.png",
      audioFiles: [
        "https://p.scdn.co/mp3-preview/df2b5f123d4624a7f62c1765e59d1cd8435a3477"
      ],
      trackTitles: [
        "Fury Unleashed"
      ]
    });
    
    this.createRelease({
      title: "HELLBOUND",
      type: "EP",
      year: "2023",
      tracks: 5,
      description: "Una colección de canciones que rinden homenaje a nuestros orígenes y primeras influencias.",
      coverImage: "https://images.unsplash.com/photo-1504509546545-e000b4a62425?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      audioFiles: [
        "https://cdn.pixabay.com/download/audio/2022/01/20/audio_1faf8d7bbd.mp3",
        "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749d484.mp3",
        "https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe5950d.mp3"
      ],
      trackTitles: [
        "Origen",
        "Primera Sangre",
        "La Caída"
      ]
    });
    
    // Concerts
    this.createConcert({
      title: "FESTIVAL ROCK EN ROJO",
      date: "15",
      month: "MAY",
      year: "2023",
      venue: "Teatro Metropolitano, Ciudad de México",
      doors: "19:00",
      start: "21:00",
      tags: ["Principal", "Nuevo álbum"]
    });
    
    this.createConcert({
      title: "GIRA SANGRE Y FUEGO",
      date: "22",
      month: "JUN",
      year: "2023",
      venue: "Auditorio Nacional, Guadalajara",
      doors: "18:30",
      start: "20:30",
      tags: ["Gira nacional"]
    });
    
    this.createConcert({
      title: "RED MAFIA UNPLUGGED",
      date: "05",
      month: "JUL",
      year: "2023",
      venue: "Centro Cultural, Monterrey",
      doors: "19:00",
      start: "20:00",
      tags: ["Acústico", "Especial"]
    });
    
    // News
    this.createNewsItem({
      title: "RED MAFIA ANUNCIA GIRA INTERNACIONAL PARA 2024",
      category: "ANUNCIO",
      date: "15 Mayo, 2023",
      content: "La banda mexicana comenzará su primera gira internacional abarcando más de 15 países en Latinoamérica y Europa.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createNewsItem({
      title: "COLABORACIÓN SORPRESA CON ARTISTA INTERNACIONAL",
      category: "MÚSICA",
      date: "28 Abril, 2023",
      content: "Red Mafia anuncia una colaboración sorpresa que promete revolucionar la escena musical latina.",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createNewsItem({
      title: "ENTREVISTA EXCLUSIVA: EL PROCESO CREATIVO DE \"SANGRE Y FUEGO\"",
      category: "ENTREVISTA",
      date: "10 Abril, 2023",
      content: "Conversamos con la banda sobre las inspiraciones y desafíos detrás de su nuevo álbum.",
      image: "https://images.unsplash.com/photo-1453738773917-9c3eff1db985?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    // Gallery
    this.createGalleryItem({
      title: "Concierto Auditorio Nacional",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createGalleryItem({
      title: "Backstage - Gira 2022",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createGalleryItem({
      title: "Sesión de grabación - Nuevo álbum",
      image: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createGalleryItem({
      title: "Fans en Festival Rock en Rojo",
      image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createGalleryItem({
      title: "Escenario - Tour Sangre y Fuego",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createGalleryItem({
      title: "Ensayo previo a gira",
      image: "https://images.unsplash.com/photo-1614153733626-ed28a8b73cb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createGalleryItem({
      title: "Sesión fotográfica - Prensa",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createGalleryItem({
      title: "Entrevista para Canal Music+",
      image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.nextUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Releases
  async getReleases(): Promise<Release[]> {
    return [...this.releases.values()];
  }
  
  async getRelease(id: number): Promise<Release | undefined> {
    return this.releases.get(id);
  }
  
  async createRelease(insertRelease: InsertRelease): Promise<Release> {
    const id = this.nextReleaseId++;
    const now = new Date();
    const release: Release = { ...insertRelease, id, createdAt: now };
    this.releases.set(id, release);
    return release;
  }
  
  // Concerts
  async getConcerts(): Promise<Concert[]> {
    return [...this.concerts.values()];
  }
  
  async getConcert(id: number): Promise<Concert | undefined> {
    return this.concerts.get(id);
  }
  
  async createConcert(insertConcert: InsertConcert): Promise<Concert> {
    const id = this.nextConcertId++;
    const now = new Date();
    const concert: Concert = { ...insertConcert, id, createdAt: now };
    this.concerts.set(id, concert);
    return concert;
  }
  
  // News
  async getAllNews(): Promise<News[]> {
    return [...this.newsItems.values()];
  }
  
  async getNewsItem(id: number): Promise<News | undefined> {
    return this.newsItems.get(id);
  }
  
  async createNewsItem(insertNews: InsertNews): Promise<News> {
    const id = this.nextNewsId++;
    const now = new Date();
    const newsItem: News = { ...insertNews, id, createdAt: now };
    this.newsItems.set(id, newsItem);
    return newsItem;
  }
  
  // Gallery
  async getGalleryItems(): Promise<GalleryItem[]> {
    return [...this.galleryItems.values()];
  }
  
  async getGalleryItem(id: number): Promise<GalleryItem | undefined> {
    return this.galleryItems.get(id);
  }
  
  async createGalleryItem(insertGalleryItem: InsertGalleryItem): Promise<GalleryItem> {
    const id = this.nextGalleryId++;
    const now = new Date();
    const galleryItem: GalleryItem = { ...insertGalleryItem, id, createdAt: now };
    this.galleryItems.set(id, galleryItem);
    return galleryItem;
  }
  
  // Contact
  async createContactMessage(insertContact: InsertContact): Promise<Contact> {
    const id = this.nextContactId++;
    const now = new Date();
    const contactMessage: Contact = { ...insertContact, id, createdAt: now };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  // Membresía "La Familia"
  async getMemberships(): Promise<Membership[]> {
    return [...this.memberships.values()];
  }
  
  async getMembershipByUserId(userId: number): Promise<Membership | undefined> {
    return Array.from(this.memberships.values()).find(
      (membership) => membership.userId === userId,
    );
  }
  
  async createMembership(insertMembership: InsertMembership): Promise<Membership> {
    const id = this.nextMembershipId++;
    const now = new Date();
    const membership: Membership = { 
      ...insertMembership, 
      id, 
      createdAt: now, 
      updatedAt: now
    };
    this.memberships.set(id, membership);
    return membership;
  }
  
  async updateMembership(id: number, data: Partial<InsertMembership>): Promise<Membership> {
    const membership = this.memberships.get(id);
    if (!membership) {
      throw new Error(`Membresía con ID ${id} no encontrada.`);
    }
    
    const now = new Date();
    const updatedMembership: Membership = {
      ...membership,
      ...data,
      updatedAt: now
    };
    this.memberships.set(id, updatedMembership);
    return updatedMembership;
  }
  
  async updateStripeInfo(userId: number, stripeCustomerId: string, stripeSubscriptionId: string): Promise<Membership> {
    const membership = Array.from(this.memberships.values()).find(
      (m) => m.userId === userId,
    );
    
    if (!membership) {
      throw new Error(`Membresía para usuario ${userId} no encontrada.`);
    }
    
    const now = new Date();
    const updatedMembership: Membership = {
      ...membership,
      stripeCustomerId,
      stripeSubscriptionId,
      updatedAt: now
    };
    this.memberships.set(membership.id, updatedMembership);
    return updatedMembership;
  }
  
  // Diseño de Merch
  async getMerchDesigns(filter?: {category?: string; status?: string}): Promise<MerchDesign[]> {
    let designs = [...this.merchDesigns.values()];
    
    if (filter) {
      if (filter.category) {
        designs = designs.filter((design) => design.category === filter.category);
      }
      
      if (filter.status) {
        designs = designs.filter((design) => design.status === filter.status);
      }
    }
    
    return designs;
  }
  
  async getMerchDesign(id: number): Promise<MerchDesign | undefined> {
    return this.merchDesigns.get(id);
  }
  
  async getMerchDesignsByUser(userId: number): Promise<MerchDesign[]> {
    return Array.from(this.merchDesigns.values()).filter(
      (design) => design.userId === userId,
    );
  }
  
  async createMerchDesign(insertDesign: InsertMerchDesign): Promise<MerchDesign> {
    const id = this.nextMerchDesignId++;
    const now = new Date();
    const design: MerchDesign = {
      ...insertDesign,
      id,
      votes: 0,
      createdAt: now,
      updatedAt: now
    };
    this.merchDesigns.set(id, design);
    return design;
  }
  
  async updateMerchDesign(id: number, data: Partial<InsertMerchDesign>): Promise<MerchDesign> {
    const design = this.merchDesigns.get(id);
    if (!design) {
      throw new Error(`Diseño con ID ${id} no encontrado.`);
    }
    
    const now = new Date();
    const updatedDesign: MerchDesign = {
      ...design,
      ...data,
      updatedAt: now
    };
    this.merchDesigns.set(id, updatedDesign);
    return updatedDesign;
  }
  
  async voteMerchDesign(userId: number, designId: number): Promise<boolean> {
    // Verificar si el usuario ya votó por este diseño
    const existingVote = Array.from(this.merchVotes.values()).find(
      (vote) => vote.userId === userId && vote.designId === designId,
    );
    
    if (existingVote) {
      return false; // Usuario ya votó por este diseño
    }
    
    // Crear nuevo voto
    const vote: MerchVote = {
      id: this.nextMerchVoteId++,
      userId,
      designId,
      createdAt: new Date()
    };
    this.merchVotes.set(vote.id, vote);
    
    // Incrementar contador de votos en el diseño
    const design = this.merchDesigns.get(designId);
    if (design) {
      design.votes += 1;
      this.merchDesigns.set(designId, design);
    }
    
    return true;
  }
  
  async getVotedDesigns(userId: number): Promise<number[]> {
    return Array.from(this.merchVotes.values())
      .filter((vote) => vote.userId === userId)
      .map((vote) => vote.designId);
  }
  
  // Influencias Musicales
  async getInfluencers(): Promise<Influencer[]> {
    return [...this.influencers.values()];
  }
  
  async getInfluencer(id: number): Promise<Influencer | undefined> {
    return this.influencers.get(id);
  }
  
  async createInfluencer(insertInfluencer: InsertInfluencer): Promise<Influencer> {
    const id = this.nextInfluencerId++;
    const now = new Date();
    const influencer: Influencer = {
      ...insertInfluencer,
      id,
      createdAt: now
    };
    this.influencers.set(id, influencer);
    return influencer;
  }
  
  async getSongInfluences(songId: number): Promise<SongInfluence[]> {
    return Array.from(this.songInfluences.values()).filter(
      (influence) => influence.songId === songId,
    );
  }
  
  async createSongInfluence(insertInfluence: InsertSongInfluence): Promise<SongInfluence> {
    const id = this.nextSongInfluenceId++;
    const now = new Date();
    const influence: SongInfluence = {
      ...insertInfluence,
      id,
      createdAt: now
    };
    this.songInfluences.set(id, influence);
    return influence;
  }
  
  // Red Challenges
  async getChallenges(filter?: {status?: string; category?: string}): Promise<Challenge[]> {
    let challenges = [...this.challenges.values()];
    
    if (filter) {
      if (filter.status) {
        challenges = challenges.filter((challenge) => challenge.status === filter.status);
      }
      
      if (filter.category) {
        challenges = challenges.filter((challenge) => challenge.category === filter.category);
      }
    }
    
    return challenges;
  }
  
  async getChallenge(id: number): Promise<Challenge | undefined> {
    return this.challenges.get(id);
  }
  
  async createChallenge(insertChallenge: InsertChallenge): Promise<Challenge> {
    const id = this.nextChallengeId++;
    const now = new Date();
    const challenge: Challenge = {
      ...insertChallenge,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.challenges.set(id, challenge);
    return challenge;
  }
  
  async updateChallenge(id: number, data: Partial<InsertChallenge>): Promise<Challenge> {
    const challenge = this.challenges.get(id);
    if (!challenge) {
      throw new Error(`Challenge con ID ${id} no encontrado.`);
    }
    
    const now = new Date();
    const updatedChallenge: Challenge = {
      ...challenge,
      ...data,
      updatedAt: now
    };
    this.challenges.set(id, updatedChallenge);
    return updatedChallenge;
  }
  
  async getChallengeEntries(challengeId: number): Promise<ChallengeEntry[]> {
    return Array.from(this.challengeEntries.values()).filter(
      (entry) => entry.challengeId === challengeId,
    );
  }
  
  async getChallengeEntry(id: number): Promise<ChallengeEntry | undefined> {
    return this.challengeEntries.get(id);
  }
  
  async getUserChallengeEntries(userId: number): Promise<ChallengeEntry[]> {
    return Array.from(this.challengeEntries.values()).filter(
      (entry) => entry.userId === userId,
    );
  }
  
  async createChallengeEntry(insertEntry: InsertChallengeEntry): Promise<ChallengeEntry> {
    const id = this.nextChallengeEntryId++;
    const now = new Date();
    const entry: ChallengeEntry = {
      ...insertEntry,
      id,
      votes: 0,
      createdAt: now
    };
    this.challengeEntries.set(id, entry);
    return entry;
  }
  
  async updateChallengeEntry(id: number, data: Partial<InsertChallengeEntry>): Promise<ChallengeEntry> {
    const entry = this.challengeEntries.get(id);
    if (!entry) {
      throw new Error(`Entry con ID ${id} no encontrada.`);
    }
    
    const updatedEntry: ChallengeEntry = {
      ...entry,
      ...data
    };
    this.challengeEntries.set(id, updatedEntry);
    return updatedEntry;
  }
  
  async voteChallengeEntry(userId: number, entryId: number): Promise<boolean> {
    // Verificar si el usuario ya votó por esta entrada
    const existingVote = Array.from(this.challengeVotes.values()).find(
      (vote) => vote.userId === userId && vote.entryId === entryId,
    );
    
    if (existingVote) {
      return false; // Usuario ya votó por esta entrada
    }
    
    // Crear nuevo voto
    const vote: ChallengeVote = {
      id: this.nextChallengeVoteId++,
      userId,
      entryId,
      createdAt: new Date()
    };
    this.challengeVotes.set(vote.id, vote);
    
    // Incrementar contador de votos en la entrada
    const entry = this.challengeEntries.get(entryId);
    if (entry) {
      entry.votes += 1;
      this.challengeEntries.set(entryId, entry);
    }
    
    return true;
  }
  
  async getVotedEntries(userId: number): Promise<number[]> {
    return Array.from(this.challengeVotes.values())
      .filter((vote) => vote.userId === userId)
      .map((vote) => vote.entryId);
  }
}

export const storage = new MemStorage();
