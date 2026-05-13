import { lazy, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import useAuthStore from './store/useAuthStore';
import useThemeStore from './store/useThemeStore';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Messages = lazy(() => import('./pages/Messages'));

// Dashboard Sub-pages (NEW)
const AdminProjects = lazy(() => import('./pages/AdminProjects'));
const AdminNewProject = lazy(() => import('./pages/AdminNewProject'));
const AdminOrders = lazy(() => import('./pages/AdminOrders'));
const AdminUsers = lazy(() => import('./pages/AdminUsers'));
const AdminAnalytics = lazy(() => import('./pages/AdminAnalytics'));
const AdminCoupons = lazy(() => import('./pages/AdminCoupons'));
const AdminCareers = lazy(() => import('./pages/AdminCareers'));
const MyProjects = lazy(() => import('./pages/MyProjects'));
const ProfileSettings = lazy(() => import('./pages/ProfileSettings'));

function App() {
    const { checkAuth, isCheckingAuth } = useAuthStore();
    const { initTheme } = useThemeStore();

    useEffect(() => {
        checkAuth();
        initTheme(); // Apply persisted theme globally on every boot
    }, [checkAuth, initTheme]);

    if (isCheckingAuth) {
        return (
            <div className="min-h-[100dvh] bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(138,43,226,0.5)]"></div>
                    <span className="text-xs uppercase tracking-widest text-outline font-bold">Initializing Monolith</span>
                </div>
            </div>
        );
    }

    // Default development key if env is missing to prevent provider crash
    const reCaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

    return (
        <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
            <BrowserRouter>
                <Suspense fallback={
                    <div className="min-h-screen bg-background flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                }>
                    <Routes>
                        {/* Public Routes with Navbar/Footer */}
                        <Route element={<Home />} path="/" />
                        <Route element={<Projects />} path="/projects" />
                        <Route element={<ProjectDetail />} path="/projects/:id" />
                        <Route element={<About />} path="/about" />
                        <Route element={<Careers />} path="/careers" />
                        <Route element={<Contact />} path="/contact" />
                        
                        {/* Auth Routes (No Navbar for clean focus) */}
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />

                        {/* Authenticated Dashboard Core */}
                        <Route element={<ProtectedRoute />}>
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<Cart />} path="/cart" />
                            <Route element={<Wishlist />} path="/wishlist" />
                            <Route element={<Messages />} path="/messages" />
                            
                            {/* New Dashboard Destinations */}
                            <Route element={<MyProjects />} path="/dashboard/my-projects" />
                            <Route element={<ProfileSettings />} path="/settings" />

                            {/* Admin Destinations */}
                            <Route element={<AdminProjects />} path="/admin/projects" />
                            <Route element={<AdminNewProject />} path="/admin/projects/new" />
                            <Route element={<AdminOrders />} path="/admin/orders" />
                            <Route element={<AdminUsers />} path="/admin/users" />
                            <Route element={<AdminCoupons />} path="/admin/coupons" />
                            <Route element={<AdminCareers />} path="/admin/careers" />
                            <Route element={<AdminAnalytics />} path="/admin/analytics" />
                        </Route>
                        
                        {/* Fallback */}
                        <Route element={<Navigate to="/" replace />} path="*" />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </GoogleReCaptchaProvider>
    );
}

export default App;
