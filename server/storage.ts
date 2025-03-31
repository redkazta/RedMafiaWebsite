import { 
  users, type User, type InsertUser,
  releases, type Release, type InsertRelease,
  concerts, type Concert, type InsertConcert,
  news, type News, type InsertNews,
  gallery, type GalleryItem, type InsertGalleryItem,
  contact, type Contact, type InsertContact
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private releases: Map<number, Release>;
  private concerts: Map<number, Concert>;
  private newsItems: Map<number, News>;
  private galleryItems: Map<number, GalleryItem>;
  private contactMessages: Map<number, Contact>;
  
  private nextUserId: number;
  private nextReleaseId: number;
  private nextConcertId: number;
  private nextNewsId: number;
  private nextGalleryId: number;
  private nextContactId: number;

  constructor() {
    this.users = new Map();
    this.releases = new Map();
    this.concerts = new Map();
    this.newsItems = new Map();
    this.galleryItems = new Map();
    this.contactMessages = new Map();
    
    this.nextUserId = 1;
    this.nextReleaseId = 1;
    this.nextConcertId = 1;
    this.nextNewsId = 1;
    this.nextGalleryId = 1;
    this.nextContactId = 1;
    
    // Inicializar datos demo
    this.initDemoData();
  }

  // Inicializar datos de ejemplo
  private initDemoData() {
    // Releases
    this.createRelease({
      title: "SANGRE Y FUEGO",
      type: "Álbum",
      year: "2023",
      tracks: 12,
      description: "Nuestro último lanzamiento explora nuevas dimensiones sonoras mientras mantiene la esencia que nos caracteriza.",
      coverImage: "https://images.unsplash.com/photo-1544656376-ffe19d4b7353?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createRelease({
      title: "NOCHE ETERNA",
      type: "Sencillo",
      year: "2023",
      tracks: 1,
      description: "Un adelanto exclusivo de nuestro próximo proyecto con un sonido más íntimo y personal.",
      coverImage: "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createRelease({
      title: "RAÍCES",
      type: "EP",
      year: "2022",
      tracks: 5,
      description: "Una colección de canciones que rinden homenaje a nuestros orígenes y primeras influencias.",
      coverImage: "https://images.unsplash.com/photo-1504509546545-e000b4a62425?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
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
}

export const storage = new MemStorage();
