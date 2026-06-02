import { AnimatePresence, motion } from 'framer-motion';
import React, { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useSite } from './context/SiteContext';
import { useLenis } from './lib/lenis';

// ── Eager loaded (above the fold) ────────────────────────────
import Home from './pages/Home';
import AdminLogin from './pages/admin/AdminLogin';

// ── Lazy loaded pages ─────────────────────────────────────────
const Company = lazy(() => import('./pages/Company'));
const Careers = lazy(() => import('./pages/Careers'));
const JobDetail = lazy(() => import('./pages/JobDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const TrustCenter = lazy(() => import('./pages/TrustCenter'));
const Story = lazy(() => import('./pages/company/Story'));
const MissionVision = lazy(() => import('./pages/company/MissionVision'));
const Values = lazy(() => import('./pages/company/Values'));
const Leadership = lazy(() => import('./pages/company/Leadership'));
const Partners = lazy(() => import('./pages/company/Partners'));
const Impact = lazy(() => import('./pages/company/Impact'));
const Culture = lazy(() => import('./pages/company/Culture'));
// Service subpages merged into massive scroll hub
const Industries = lazy(() => import('./pages/Industries'));
const Services = lazy(() => import('./pages/Services'));
const ProjectsPage = lazy(() => import('./pages/Projects'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const CRMSystem = lazy(() => import('./pages/systems/CRMSystem'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminJobs = lazy(() => import('./pages/admin/AdminJobs'));
const AdminTeam = lazy(() => import('./pages/admin/AdminTeam'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminContent = lazy(() => import('./pages/admin/AdminContent'));

// ── Loading Spinner ───────────────────────────────────────────
const PageLoader = () => (
 <div className="min-h-screen bg-[#050816] flex items-center justify-center">
 <div className="relative w-10 h-10">
 <div className="absolute inset-0 rounded-full border-2 border-[#F5A800]/20" />
 <div className="absolute inset-0 rounded-full border-2 border-t-[#F5A800] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
 <div className="absolute inset-2 rounded-full bg-[#F5A800]/10 animate-pulse" />
 </div>
 </div>
);

// ── Protected Route ───────────────────────────────────────────
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
 const { session, loadingAuth } = useSite();
 if (loadingAuth) return <PageLoader />;
 return session ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

// ── Scroll to Top ─────────────────────────────────────────────
function ScrollToTop() {
 const { pathname } = useLocation();
 useEffect(() => {
 window.scrollTo(0, 0);
 }, [pathname]);
 return null;
}

// ── Page Transition ───────────────────────────────────────────
const pageVariants = {
 initial: { opacity: 0, y: 16 },
 animate: { opacity: 1, y: 0 },
 exit: { opacity: 0, y: -10 },
};
const pageTransition = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as any };

// ── App ───────────────────────────────────────────────────────
function App() {
 const location = useLocation();
 const isStandalone = location.pathname.startsWith('/admin') ||
 location.pathname.startsWith('/systems');

 // Initialize Lenis smooth scrolling on public routes only
 useLenis(!isStandalone);

 return (
 <div className="min-h-screen bg-[#050816]">
 <ScrollToTop />
 {!isStandalone && <Navbar />}

 <main className={isStandalone ? 'h-screen overflow-hidden' : ''}>
 <AnimatePresence mode="wait">
 <motion.div
 key={location.pathname}
 variants={pageVariants}
 initial="initial"
 animate="animate"
 exit="exit"
 transition={pageTransition}
 className="w-full h-full"
 >
 <Suspense fallback={<PageLoader />}>
 <Routes location={location}>
 {/* ── Public ── */}
 <Route path="/" element={<Home />} />
 <Route path="/services" element={<Services />} />
 <Route path="/systems/crm" element={<CRMSystem />} />

 {/* Service detail merged into /services hash links */}
 <Route path="/services/security" element={<Navigate to="/services#security" replace />} />
 <Route path="/services/software" element={<Navigate to="/services#software" replace />} />
 <Route path="/services/networking" element={<Navigate to="/services#networking" replace />} />
 <Route path="/services/ai" element={<Navigate to="/services#ai" replace />} />
 <Route path="/services/cloud" element={<Navigate to="/services#cloud" replace />} />
 <Route path="/services/data" element={<Navigate to="/services#data" replace />} />
 <Route path="/services/apps" element={<Navigate to="/services#apps" replace />} />

 {/* Legacy redirects */}
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

 <Route path="/careers" element={<Careers />} />
 <Route path="/careers/:id" element={<JobDetail />} />
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
 {/* Legacy /portfolio redirect */}

 {/* ── Admin ── */}
 <Route path="/admin/login" element={<AdminLogin />} />
 <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
 <Route index element={<AdminDashboard />} />
 <Route path="jobs" element={<AdminJobs />} />
 <Route path="team" element={<AdminTeam />} />
 <Route path="testimonials" element={<AdminTestimonials />} />
 <Route path="messages" element={<AdminMessages />} />
 <Route path="users" element={<AdminUsers />} />
 <Route path="content" element={<AdminContent />} />
 <Route path="settings" element={<AdminSettings />} />
 </Route>

 <Route path="*" element={<Home />} />
 </Routes>
 </Suspense>
 </motion.div>
 </AnimatePresence>
 </main>

 {!isStandalone && <Footer />}
 {!isStandalone && <Chatbot />}
 </div>
 );
}

export default App;
