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

// Componentes animados
import { RedMafiaPageTransition, FloatingPlayer, BloodCorner } from "@/components/animated";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <Navbar />
      
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
  // Datos de ejemplo para el reproductor flotante
  const [demoTrack] = useState({
    title: "Sangre y Fuego",
    artist: "Red Mafia",
    audioSrc: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars3.wav", // URL de audio de ejemplo
    coverImage: "/images/covers/sangre-y-fuego.jpg"
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative">
        <Router />
        <FloatingPlayer track={demoTrack} />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
