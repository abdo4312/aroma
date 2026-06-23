import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// ─── Eager imports (needed on every render, no lazy benefit) ───
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { QuickViewModal } from '@/features/products/QuickViewModal';
import { HomeHeader } from '@/features/home/HomeHeader';
import { HomeFooter } from '@/features/home/HomeFooter';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';
import { setOnUnauthorized } from '@/services/apiClient';
import ErrorBoundary from '@/shared/components/ErrorBoundary';
import { PageLoader } from '@/shared/components/PageLoader';

// ─── Lazy imports (loaded on demand when route is hit) ───
// Pattern: React.lazy requires a default export, but our pages use named
// exports, so we remap via `.then(m => ({ default: m.PageName }))`.

// Auth pages
const LoginPage = lazy(() => import('@/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('@/pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));

// Public pages
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const SupportPage = lazy(() => import('@/pages/SupportPage').then(m => ({ default: m.SupportPage })));
const ShippingPage = lazy(() => import('@/pages/ShippingPage').then(m => ({ default: m.ShippingPage })));
const BrewGuidePage = lazy(() => import('@/pages/BrewGuidePage').then(m => ({ default: m.BrewGuidePage })));
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => import('@/pages/TermsOfServicePage').then(m => ({ default: m.TermsOfServicePage })));

// Product & Shopping
const ShopBeansPage = lazy(() => import('@/pages/ShopBeansPage').then(m => ({ default: m.ShopBeansPage })));
const CoffeeDetails = lazy(() => import('@/pages/CoffeeDetailsPage').then(m => ({ default: m.CoffeeDetails })));
const CartPage = lazy(() => import('@/pages/CartPage').then(m => ({ default: m.CartPage })));
const EquipmentPage = lazy(() => import('@/pages/EquipmentPage').then(m => ({ default: m.EquipmentPage })));
const GiftCards = lazy(() => import('@/pages/GiftCardsPage').then(m => ({ default: m.GiftCards })));
const BuildYourBoxPage = lazy(() => import('@/pages/BuildYourBoxPage').then(m => ({ default: m.BuildYourBoxPage })));

// Booking & Services
const BookingPage = lazy(() => import('@/pages/BookingPage').then(m => ({ default: m.BookingPage })));
const BookingFormPage = lazy(() => import('@/pages/BookingFormPage').then(m => ({ default: m.BookingFormPage })));
const ConsultationPage = lazy(() => import('@/pages/ConsultationPage').then(m => ({ default: m.ConsultationPage })));
const GoldenHourPage = lazy(() => import('@/pages/GoldenHourPage').then(m => ({ default: m.GoldenHourPage })));

// Protected pages
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const OrderSuccessPage = lazy(() => import('@/pages/OrderSuccessPage').then(m => ({ default: m.OrderSuccessPage })));
const ProfilePage = lazy(() => import('@/pages/ProfilePage').then(m => ({ default: m.ProfilePage })));

// Auth pages that should NOT show header/footer
const AUTH_PAGES = ['/login', '/register', '/forgot-password'];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Register React Router navigation for 401 responses
  useEffect(() => {
    setOnUnauthorized(() => {
      navigate('/login', { replace: true });
    });
    return () => setOnUnauthorized(null);
  }, [navigate]);

  const isAuthPage = AUTH_PAGES.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {!isAuthPage && <HomeHeader />}

      <main className="min-h-screen">
        {/* Single Suspense boundary wraps all lazy routes.
                    Each chunk load shows the PageLoader until ready.
                    Errors (e.g. network failure mid-load) bubble up to
                    the top-level ErrorBoundary, which lets the user
                    hard-reload to recover. */}
        <Suspense fallback={<PageLoader label="Loading" />}>
          <Routes>
            {/* Public Routes — HomePage eager (landing page) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/shipping" element={<ShippingPage />} />

            {/* Product & Shopping Routes */}
            <Route path="/shop-beans" element={<ShopBeansPage />} />
            <Route path="/coffee/:id" element={<CoffeeDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/brew-gear" element={<EquipmentPage />} />
            <Route path="/brew-guide" element={<BrewGuidePage />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/build-your-box" element={<BuildYourBoxPage />} />

            {/* Booking & Services */}
            <Route path="/book-table" element={<BookingPage />} />
            <Route path="/booking-form" element={<BookingFormPage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/golden-hour" element={<GoldenHourPage />} />

            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />

            {/* Protected Routes */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <OrderSuccessPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Redirects — old routes to new ones */}
            <Route path="/coffee-list" element={<Navigate to="/shop-beans" replace />} />
            <Route path="/coffee-tools" element={<Navigate to="/brew-gear" replace />} />
            <Route path="/beans" element={<Navigate to="/shop-beans" replace />} />
            <Route path="/ads" element={<Navigate to="/shop-beans" replace />} />
            <Route path="/coffee" element={<Navigate to="/shop-beans" replace />} />

            {/* 404 — kept eager for instant render */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {!isAuthPage && <HomeFooter />}
      <QuickViewModal />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppLayout />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#4A3B32',
            color: '#fff',
            fontWeight: 600,
            borderRadius: '1rem',
          },
          success: {
            iconTheme: { primary: '#D4B895', secondary: '#4A3B32' },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: '#fff' },
          },
        }}
      />
    </ErrorBoundary>
  );
}

export default App;