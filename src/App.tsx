
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Trending from "./pages/Trending";
import NewReleases from "./pages/NewReleases";
import About from "./pages/About";
import MixtapeDetail from "./pages/MixtapeDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/new" element={<NewReleases />} />
          <Route path="/about" element={<About />} />
          <Route path="/mixtape/:id" element={<MixtapeDetail />} />
          <Route path="/genre/:genreId" element={<Search />} />
          <Route path="/liked" element={<Search />} />
          <Route path="/downloads" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
