import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";

const CasePage = lazy(() => import("./pages/CasePage"));
const PolicyPage = lazy(() => import("./pages/PolicyPage"));
const PaymentsPage = lazy(() => import("./pages/PaymentsPage"));
const WidgetsPage = lazy(() => import("./pages/WidgetsPage"));
const SetupAmocrmPage = lazy(() => import("./pages/SetupAmocrmPage"));
const TelephonyPage = lazy(() => import("./pages/TelephonyPage"));
const AutomationPage = lazy(() => import("./pages/AutomationPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen" />}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
