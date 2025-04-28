
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";

// Pages
import Index from "./pages/Index";
import CalendarView from "./pages/CalendarView";
import TableView from "./pages/TableView";
import TimelineView from "./pages/TimelineView";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

// For demo purposes, we'll use this to simulate authentication
// In a real app, this would be handled by an auth provider
const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TaskProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<PrivateRoute><Index /></PrivateRoute>} />
            <Route path="/calendar" element={<PrivateRoute><CalendarView /></PrivateRoute>} />
            <Route path="/table" element={<PrivateRoute><TableView /></PrivateRoute>} />
            <Route path="/timeline" element={<PrivateRoute><TimelineView /></PrivateRoute>} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
