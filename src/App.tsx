import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoadingSpinner from './components/UI/LoadingSpinner';
import LandingPage from './pages/Landing/LandingPage';

// Auth pages
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';
import VerifyEmailPage from './pages/Auth/VerifyEmailPage';

// Main pages
import Dashboard from './pages/Dashboard/Dashboard';
import Devices from './pages/Devices/Devices';
import Automations from './pages/Automations/Automations';
import OTAUpdates from './pages/OTA/OTAUpdates';
import VisionAI from './pages/VisionAI/VisionAI';
import Business from './pages/Business/Business';
import Settings from './pages/Settings/Settings';
import Subscription from './pages/Subscription/Subscription';
import Credentials from './pages/Credentials/Credentials';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-black">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Landing page */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/landing" element={<LandingPage />} />
                  
                  {/* Public routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/verify-email" element={<VerifyEmailPage />} />
                  
                  {/* Protected routes */}
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="devices" element={<Devices />} />
                    <Route path="automations" element={<Automations />} />
                    <Route path="ota-updates" element={<OTAUpdates />} />
                    <Route path="vision-ai" element={<VisionAI />} />
                    <Route path="business" element={<Business />} />
                    <Route path="credentials" element={<Credentials />} />
                    <Route path="subscription" element={<Subscription />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                  
                  {/* Catch all */}
                  <Route path="*" element={<Navigate to="/landing" replace />} />
                </Routes>
              </Suspense>
              <Toaster position="top-right" />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;