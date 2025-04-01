import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Releases from "@/pages/Releases";
import ReleaseDetail from "@/pages/ReleaseDetail";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Concerts from "@/pages/Concerts";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Merchandise from "@/pages/Merchandise";
import MediaKit from "@/pages/MediaKit";
// Nuevas páginas
import Familia from "@/pages/Familia";  // Sistema de membresía
import MerchDesign from "@/pages/MerchDesign";  // Diseña el próximo merch
import Bloodline from "@/pages/Bloodline";  // Árbol de influencias
import Challenges from "@/pages/Challenges";  // Sistema de desafíos

// Componentes animados
import { RedMafiaPageTransition, FloatingPlayer, BloodCorner, FireParticles } from "@/components/animated";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import ThemeToggle from "@/components/ThemeToggle";

// Wrapper de contenido con transiciones
function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <RedMafiaPageTransition duration={500}>
      <main className="animate-page-transition min-h-screen pt-16">
        {children}
      </main>
    </RedMafiaPageTransition>
  );
}

function Router() {
  const [location] = useLocation();
  
  // Scroll al inicio cuando cambia la ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <>
      {/* Decoración de esquinas con "sangre" */}
      <BloodCorner position="top-left" size={150} />
      <BloodCorner position="bottom-right" size={150} />
      
      <Switch>
        <Route path="/">
          {() => (
            <ContentWrapper>
              <Home />
            </ContentWrapper>
          )}
        </Route>
        <Route path="/lanzamientos">
          {() => (
            <ContentWrapper>
              <Releases />
            </ContentWrapper>
          )}
        </Route>
        <Route path="/lanzamientos/:id">
          {({ id }) => (
            <ContentWrapper>
              <ReleaseDetail />
            </ContentWrapper>
          )}
        </Route>
        <Route path="/noticias">
          {() => (
            <ContentWrapper>
              <News />
            </ContentWrapper>
          )}
        </Route>
        <Route path="/noticias/:id">
          {({ id }) => (
            <ContentWrapper>
              <NewsDetail />
            </ContentWrapper>
          )}
        </Route>
        <Route path="/conciertos">
          {() => (
            <ContentWrapper>
              <Concerts />
            </ContentWrapper>
          )}
        </Route>
        <Route path="/galeria">
          {() => (
            <ContentWrapper>
              <Gallery />
            </ContentWrapper>
          )}
        </Route>
        <Route path="/contacto">
          {() => (
            <ContentWrapper>
              <Contact />
            </ContentWrapper>
          )}
        </Route>
        <Route path="/nosotros">
          {() => (
            <ContentWrapper>
              <About />
            </ContentWrapper>
          )}
        </Route>
        <Route path="/tienda">
          {() => (
            <ContentWrapper>
              <Merchandise />
            </ContentWrapper>
          )}
        </Route>
        <Route path="/media-kit">
          {() => (
            <ContentWrapper>
              <MediaKit />
            </ContentWrapper>
          )}
        </Route>
        
        {/* Nuevas rutas para las funcionalidades */}
        <Route path="/familia">
          {() => (
            <ContentWrapper>
              <Familia />
            </ContentWrapper>
          )}
        </Route>
        <Route path="/disena-merch">
          {() => (
            <ContentWrapper>
              <MerchDesign />
            </ContentWrapper>
          )}
        </Route>
        <Route path="/bloodline">
          {() => (
            <ContentWrapper>
              <Bloodline />
            </ContentWrapper>
          )}
        </Route>
        <Route path="/challenges">
          {() => (
            <ContentWrapper>
              <Challenges />
            </ContentWrapper>
          )}
        </Route>
        
        <Route>
          {() => (
            <ContentWrapper>
              <NotFound />
            </ContentWrapper>
          )}
        </Route>
      </Switch>
      
      <Footer />
    </>
  );
}

function App() {
  // Estados para la aplicación
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'darker' | 'fire'>('dark');
  const [chatOpen, setChatOpen] = useState(false);
  
  // Datos de ejemplo para el reproductor flotante
  const [demoTrack] = useState({
    title: "Sangre y Fuego",
    artist: "Red Mafia",
    audioSrc: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars3.wav", // URL de audio de ejemplo
    coverImage: "/images/covers/sangre-y-fuego.jpg"
  });
  
  // Efecto para aplicar el tema
  useEffect(() => {
    document.documentElement.classList.remove('theme-dark', 'theme-darker', 'theme-fire');
    document.documentElement.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`relative theme-${currentTheme}`}>
        <Navbar />
        {/* Efecto de partículas de fuego solo en el tema 'fire' */}
        {currentTheme === 'fire' && (
          <FireParticles 
            className="fixed inset-0 pointer-events-none z-10"
            active={true}
            particleCount={30}
            intensity={5}
          />
        )}
        
        <Router />
        
        {/* Componentes flotantes */}
        <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end space-y-4">
          <ThemeToggle 
            className="shadow-lg"
            onChange={(theme) => setCurrentTheme(theme as 'dark' | 'darker' | 'fire')}
          />
          
          <button 
            onClick={() => setChatOpen(true)}
            className="bg-[#950101] hover:bg-[#FF0000] text-white p-3 rounded-full shadow-lg flex items-center justify-center"
            aria-label="Abrir chat en vivo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
        
        {/* Reproductor flotante */}
        <FloatingPlayer track={demoTrack} />
        
        {/* Chat en vivo */}
        {chatOpen && (
          <LiveChat 
            isOpen={chatOpen}
            onClose={() => setChatOpen(false)}
            eventName="Chat de Fans RED MAFIA"
            description="Conéctate con otros fans y comparte tu pasión por la banda"
          />
        )}
        
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
