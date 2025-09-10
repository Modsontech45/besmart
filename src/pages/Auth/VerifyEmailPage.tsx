import React, { useEffect, useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Home, Mail, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

const VerifyEmailPage: React.FC = () => {
  const { t } = useTranslation();
  const { verifyEmail, user } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setError('Invalid verification link');
        setLoading(false);
        return;
      }

      try {
        const result = await verifyEmail(token);
        if (result) {
          setSuccess(true);
        } else {
          setError('Email verification failed');
        }
      } catch (error) {
        setError('Email verification failed');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, verifyEmail]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl text-center"
      >
        {/* Logo */}
        <div className="mx-auto h-12 w-12 flex items-center justify-center bg-blue-600 rounded-lg mb-4">
          <Home className="h-6 w-6 text-white" />
        </div>

        {loading ? (
          <>
            <h2 className="text-3xl font-bold text-gray-900">Verifying Email</h2>
            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"
              />
            </div>
            <p className="text-gray-600">Please wait while we verify your email...</p>
          </>
        ) : success ? (
          <>
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Email Verified!</h2>
            <p className="text-gray-600">{t('auth.emailVerified')}</p>
            <Link
              to="/login"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Continue to Login
            </Link>
          </>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Verification Failed</h2>
            <p className="text-gray-600">{error}</p>
            <div className="space-y-4">
              <Link
                to="/signup"
                className="w-full flex justify-center items-center py-3 px-4 border border-blue-600 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50"
              >
                Create New Account
              </Link>
              <Link
                to="/login"
                className="flex items-center justify-center text-sm text-blue-600 hover:text-blue-500"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('auth.backToLogin')}
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmailPage;