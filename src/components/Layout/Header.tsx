import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, Bell, Search, Globe } from 'lucide-react';
import LanguageSwitcher from '../UI/LanguageSwitcher';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          {/* Search */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t('common.search')}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 lg:w-64 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
          {/* Language switcher */}
          <LanguageSwitcher />
          
          {/* Notifications */}
          <button className="relative p-1.5 sm:p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
              alt={user?.name}
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {t('navigation.logout')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;