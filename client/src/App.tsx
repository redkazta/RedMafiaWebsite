import { Switch, Route } from "wouter";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/lanzamientos" component={Releases}/>
      <Route path="/lanzamientos/:id" component={ReleaseDetail}/>
      <Route path="/noticias" component={News}/>
      <Route path="/noticias/:id" component={NewsDetail}/>
      <Route path="/conciertos" component={Concerts}/>
      <Route path="/galeria" component={Gallery}/>
      <Route path="/contacto" component={Contact}/>
      <Route path="/nosotros" component={About}/>
      <Route path="/tienda" component={Merchandise}/>
      <Route path="/media-kit" component={MediaKit}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
