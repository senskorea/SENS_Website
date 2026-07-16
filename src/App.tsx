import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Whitepaper from "./pages/Whitepaper.tsx";
import IndexV2 from "./pages/IndexV2.tsx";
import Collab from "./pages/Collab.tsx";
import { Navigate } from "react-router-dom";
import WorkWithUs from "./pages/WorkWithUs.tsx";
import Demo from "./pages/Demo.tsx";
import Deck from "./pages/Deck.tsx";
import AltDeck from "./pages/AltDeck.tsx";
import StoryV2 from "./pages/StoryV2.tsx";
import Card from "./pages/Card.tsx";
import NotFound from "./pages/NotFound.tsx";
import SensLaunchBanner from "./components/SensLaunchBanner.tsx";

const queryClient = new QueryClient();

const LaunchRedirect = () => {
  useEffect(() => {
    window.location.replace("https://sensai-dh2z.vercel.app/");
  }, []);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/SENS_Website/">
        <Routes>
          <Route path="/" element={<IndexV2 />} />
          <Route path="/story" element={<StoryV2 />} />
          <Route path="/story-v2" element={<StoryV2 />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/collab" element={<Collab />} />
          <Route path="/investors" element={<Navigate to="/collab" replace />} />
          <Route path="/work-with-us" element={<WorkWithUs />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/deck" element={<Deck />} />
          <Route path="/altdeck" element={<AltDeck />} />
          <Route path="/launch" element={<LaunchRedirect />} />
          <Route path="/banner" element={<div className="min-h-screen bg-[#050508] flex items-center"><SensLaunchBanner /></div>} />
          <Route path="/card" element={<Card />} />
          <Route path="/paul" element={<Card />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
