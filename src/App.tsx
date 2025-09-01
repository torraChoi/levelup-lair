import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="study" element={<div>Study Tracker - Coming Soon</div>} />
            <Route path="habits" element={<div>Habits - Coming Soon</div>} />
            <Route path="journal" element={<div>Journal - Coming Soon</div>} />
            <Route path="pomodoro" element={<div>Pomodoro - Coming Soon</div>} />
            <Route path="rewards" element={<div>Rewards & XP - Coming Soon</div>} />
            <Route path="progress" element={<div>Progress - Coming Soon</div>} />
            <Route path="calendar" element={<div>Calendar - Coming Soon</div>} />
            <Route path="playlist" element={<div>Playlist - Coming Soon</div>} />
            <Route path="settings" element={<div>Settings - Coming Soon</div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
