import React, { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useSite } from './context/SiteContext';
import { useLenis } from './lib/lenis';
import { ToastProvider } from './context/ToastContext';

// ── Eager-loaded public pages (instant navigation, no spinner) ─
import Home from './pages/Home';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Company from './pages/Company';
import Contact from './pages/Contact';
import TrustCenter from './pages/TrustCenter';
import ServiceDetail from './pages/ServiceDetail';
import ProjectsPage from './pages/Projects';
import CaseStudyDetail from './pages/CaseStudyDetail';
import CRMSystem from './pages/systems/CRMSystem';
import AdminLogin from './pages/admin/AdminLogin';

// ── Lazy-loaded admin pages (rarely visited, fine to lazy load) ─
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminJobs = lazy(() => import('./pages/admin/AdminJobs'));
const AdminTeam = lazy(() => import('./pages/admin/AdminTeam'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminHomeContent = lazy(() => import('./pages/admin/AdminHomeContent'));
const AdminCompanyContent = lazy(() => import('./pages/admin/AdminCompanyContent'));
const AdminServicesContent = lazy(() => import('./pages/admin/AdminServicesContent'));
const AdminGlobalContent = lazy(() => import('./pages/admin/AdminGlobalContent'));
const AdminPartners = lazy(() => import('./pages/admin/AdminPartners'));
const MapCalibrate = lazy(() => import('./pages/MapCalibrate'));

// ── Skeleton loading screens ─────────────────────────────────
import { AdminSkeleton, AuthSkeleton } from './components/Skeleton';

// ── Protected Route (admin auth guard) ────────────────────────
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loadingAuth } = useSite();
  if (loadingAuth) return <AuthSkeleton />;
  return session ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

// ── Scroll to Top on route change ─────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ── App ───────────────────────────────────────────────────────
function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const isStandalone = pathname.startsWith('/admin') || pathname.startsWith('/systems');

  useLenis(!isStandalone);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#050816]">
        <ScrollToTop />
        {!isStandalone && <Navbar />}

        <main className={isStandalone ? 'h-screen overflow-hidden' : ''}>
          {/* Public routes render instantly — no Suspense, no spinner, no animation */}
          {!isStandalone ? (
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/systems/crm" element={<CRMSystem />} />
              <Route path="/security" element={<Navigate to="/services/security" replace />} />
              <Route path="/software" element={<Navigate to="/services/software" replace />} />
              <Route path="/networking" element={<Navigate to="/services/networking" replace />} />
              <Route path="/ai" element={<Navigate to="/services/ai" replace />} />
              <Route path="/cloud" element={<Navigate to="/services/cloud" replace />} />
              <Route path="/data" element={<Navigate to="/services/data" replace />} />
              <Route path="/apps" element={<Navigate to="/services/apps" replace />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/fintech" element={<Navigate to="/industries" replace />} />
              <Route path="/health" element={<Navigate to="/industries" replace />} />
              <Route path="/gov" element={<Navigate to="/industries" replace />} />
              <Route path="/retail" element={<Navigate to="/industries" replace />} />
              <Route path="/edu" element={<Navigate to="/industries" replace />} />
              <Route path="/founders" element={<Navigate to="/#leadership" replace />} />
              <Route path="/team" element={<Navigate to="/#leadership" replace />} />
              <Route path="/offices" element={<Navigate to="/#offices" replace />} />
              <Route path="/sustainability" element={<Navigate to="/#impact" replace />} />
              <Route path="/about" element={<Navigate to="/company" replace />} />
              <Route path="/company" element={<Company />} />
              <Route path="/company/story" element={<Navigate to="/company#story" replace />} />
              <Route path="/company/mission-vision" element={<Navigate to="/company#vision" replace />} />
              <Route path="/company/values" element={<Navigate to="/company#values" replace />} />
              <Route path="/company/leadership" element={<Navigate to="/company#leadership" replace />} />
              <Route path="/company/partners" element={<Navigate to="/company#partners" replace />} />
              <Route path="/company/impact" element={<Navigate to="/company#impact" replace />} />
              <Route path="/company/culture" element={<Navigate to="/company#culture" replace />} />
              <Route path="/legal" element={<TrustCenter />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<CaseStudyDetail />} />
              <Route path="/portfolio" element={<Navigate to="/projects" replace />} />
              <Route path="*" element={<Home />} />
            </Routes>
          ) : (
            /* Admin routes — wrapped in Suspense since they're lazy */
            <Suspense fallback={<AdminSkeleton />}>
              <Routes location={location}>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="jobs" element={<AdminJobs />} />
                  <Route path="team" element={<AdminTeam />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="content/home" element={<AdminHomeContent />} />
                  <Route path="content/company" element={<AdminCompanyContent />} />
                  <Route path="content/services" element={<AdminServicesContent />} />
                  <Route path="content/global" element={<AdminGlobalContent />} />
                  <Route path="partners" element={<AdminPartners />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
                <Route path="/map-calibrate" element={<MapCalibrate />} />
                <Route path="*" element={<AdminLogin />} />
              </Routes>
            </Suspense>
          )}
        </main>

        {!isStandalone && <Footer />}
        {!isStandalone && <Chatbot />}
      </div>
    </ToastProvider>
  );
}

export default App;
