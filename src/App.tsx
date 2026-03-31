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
const SpeechAnalyticsPage = lazy(() => import("./pages/SpeechAnalyticsPage"));
const SpeechAnalyticsKPPage = lazy(() => import("./pages/SpeechAnalyticsKPPage"));
const PresentationPage = lazy(() => import("./pages/PresentationPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const IntegrationsPage = lazy(() => import("./pages/IntegrationsPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const OfferPage = lazy(() => import("./pages/OfferPage"));
const MoscowPage = lazy(() => import("./pages/CityPage").then(m => ({ default: m.MoscowPage })));
const SaintPetersburgPage = lazy(() => import("./pages/CityPage").then(m => ({ default: m.SaintPetersburgPage })));
const TyumenPage = lazy(() => import("./pages/CityPage").then(m => ({ default: m.TyumenPage })));
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
            <Route path="/speech-analytics" element={<SpeechAnalyticsPage />} />
            <Route path="/speech-analytics-kp" element={<SpeechAnalyticsKPPage />} />
            <Route path="/presentation" element={<PresentationPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/blog/:slug" element={<ArticlePage />} />
            <Route path="/oferta" element={<OfferPage />} />
            <Route path="/moscow" element={<CityPage citySlug="moscow" />} />
            <Route path="/saint-petersburg" element={<CityPage citySlug="saint-petersburg" />} />
            <Route path="/tyumen" element={<CityPage citySlug="tyumen" />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
