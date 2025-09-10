import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services/authService';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.getCurrentUser().then((userData) => {
        if (userData) {
          setUser(userData);
        }
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await authService.login(email, password);
      if (result.success) {
        setUser(result.user);
        localStorage.setItem('token', result.token);
        localStorage.setItem('userEmail', result.user.email);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const result = await authService.signup(name, email, password);
      return result.success;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      const result = await authService.forgotPassword(email);
      return result.success;
    } catch (error) {
      return false;
    }
  };

  const resetPassword = async (token: string, password: string): Promise<boolean> => {
    try {
      const result = await authService.resetPassword(token, password);
      return result.success;
    } catch (error) {
      return false;
    }
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      const result = await authService.verifyEmail(token);
      return result.success;
    } catch (error) {
      return false;
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};