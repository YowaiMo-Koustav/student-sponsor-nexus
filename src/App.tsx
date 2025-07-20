import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ui/error-boundary";
import Index from "./pages/Index";
import ForStudents from "./pages/ForStudents";
import ForSponsors from "./pages/ForSponsors";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ChatRoom from "./pages/ChatRoom";
import NotificationCenter from "./components/notifications/NotificationCenter";
import Footer from "./components/layout/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <div className="dark">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <NotificationCenter />
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/for-students" element={<ForStudents />} />
                    <Route path="/for-sponsors" element={<ForSponsors />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/chat/:roomId" element={<ChatRoom />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </div>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
