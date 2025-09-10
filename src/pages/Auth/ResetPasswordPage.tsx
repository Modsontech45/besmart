import React, { useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Home, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const ResetPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const { resetPassword, user } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const result = await resetPassword(token, formData.password);
      if (result) {
        setSuccess(true);
        toast.success(t('auth.passwordReset'));
      } else {
        toast.error('Failed to reset password');
      }
    } catch (error) {
      toast.error('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl text-center"
        >
          <div className="mx-auto h-12 w-12 flex items-center justify-center bg-green-100 rounded-lg mb-4">
            <Lock className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Password Reset Successful</h2>
          <p className="text-gray-600">Your password has been reset successfully.</p>
          <Link
            to="/login"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Continue to Login
          </Link>
        </motion.div>
      </div>
    );
  }

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
          <h2 className="text-3xl font-bold text-gray-900">{t('auth.resetPassword')}</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your new password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="sr-only">
              New {t('auth.password')}
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-4 py-3 pl-12 pr-12 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="New password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              {t('auth.confirmPassword')}
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-4 py-3 pl-12 pr-12 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('auth.confirmPassword')}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
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
              'Reset Password'
            )}
          </motion.button>
        </form>

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

export default ResetPasswordPage;