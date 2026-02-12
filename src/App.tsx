import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import CasePage from "./pages/CasePage";
import PolicyPage from "./pages/PolicyPage";
import PaymentsPage from "./pages/PaymentsPage";
import WidgetsPage from "./pages/WidgetsPage";
import SetupAmocrmPage from "./pages/SetupAmocrmPage";
import TelephonyPage from "./pages/TelephonyPage";
import AutomationPage from "./pages/AutomationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cases/:slug" element={<CasePage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/widgets" element={<WidgetsPage />} />
          <Route path="/setup-amocrm" element={<SetupAmocrmPage />} />
          <Route path="/telephony" element={<TelephonyPage />} />
          <Route path="/automation" element={<AutomationPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
