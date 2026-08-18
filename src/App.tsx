import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import AuthCallback from "./pages/auth/Callback.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Dashboard from "./pages/dashboard/page.tsx";
import TimelinePage from "./pages/dashboard/timeline/page.tsx";
import InsightsPage from "./pages/dashboard/insights/page.tsx";
import DiseaseProgressPage from "./pages/dashboard/disease-progress/page.tsx";
import MedicationPage from "./pages/dashboard/medication/page.tsx";
import DoctorSummaryPage from "./pages/dashboard/doctor_summary/page.tsx";
import UploadPage from "./pages/dashboard/upload/page.tsx";
import DashboardLayout from "./pages/dashboard/_components/DashboardLayout.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/timeline" element={<TimelinePage />} />
            <Route path="/dashboard/insights" element={<InsightsPage />} />
            <Route path="/dashboard/disease-progress" element={<DiseaseProgressPage />} />
            <Route path="/dashboard/medication" element={<MedicationPage />} />
            <Route path="/dashboard/doctor-summary" element={<DoctorSummaryPage />} />
            <Route path="/dashboard/upload" element={<UploadPage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DefaultProviders>
  );
}
