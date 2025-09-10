import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Home, Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const { forgotPassword, user } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await forgotPassword(email);
      if (success) {
        setSent(true);
        toast.success('Password reset email sent!');
      } else {
        toast.error('Failed to send reset email');
      }
    } catch (error) {
      toast.error('Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl"
      >
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center bg-blue-600 rounded-lg mb-4">
            <Home className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{t('auth.forgotPassword')}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {sent ? t('auth.checkEmail') : 'Enter your email to reset your password'}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                {t('auth.email')}
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('auth.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Send Reset Email'
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>
        )}

        <div className="text-center">
          <Link
            to="/login"
            className="flex items-center justify-center text-sm text-blue-600 hover:text-blue-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('auth.backToLogin')}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;