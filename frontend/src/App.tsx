import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PublicLayout } from '@/components/public/PublicLayout';
import { AppLayout } from '@/components/layout/AppLayout';
import { LandingPage } from '@/pages/LandingPage';
import { PricingPage } from '@/pages/PricingPage';
import { AboutPage } from '@/pages/AboutPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { CompanySetupPage } from '@/pages/CompanySetupPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { InvestigationsPage } from '@/pages/InvestigationsPage';
import { InvestigationDetailPage } from '@/pages/InvestigationDetailPage';
import { ActionsPage } from '@/pages/ActionsPage';
import { TasksPage } from '@/pages/TasksPage';
import { DataHubPage } from '@/pages/DataHubPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { InsightsPage } from '@/pages/InsightsPage';
import { IntegrationsPage } from '@/pages/IntegrationsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { SystemStatusPage } from '@/pages/SystemStatusPage';
import { BillingPage } from '@/pages/BillingPage';
import { TeamPage } from '@/pages/TeamPage';
import { CompanySettingsPage } from '@/pages/CompanySettingsPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/company/setup" element={<CompanySetupPage />} />

          {/* Protected app routes */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/investigations" element={<InvestigationsPage />} />
            <Route path="/investigations/:id" element={<InvestigationDetailPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/actions" element={<ActionsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/workload" element={<TasksPage />} />
            <Route path="/data-hub" element={<DataHubPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/system" element={<SystemStatusPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/settings/team" element={<TeamPage />} />
            <Route path="/settings/billing" element={<BillingPage />} />
            <Route path="/settings/company" element={<CompanySettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
