import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Smartphone,
  Zap,
  Download,
  Camera,
  Building,
  CreditCard,
  Key,
  X,
  Home,
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const navigation = [
    { name: t('navigation.dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('navigation.devices'), href: '/devices', icon: Smartphone },
    { name: t('navigation.automations'), href: '/automations', icon: Zap },
    { name: t('navigation.otaUpdates'), href: '/ota-updates', icon: Download },
    { name: t('navigation.visionAI'), href: '/vision-ai', icon: Camera },
    { name: t('navigation.business'), href: '/business', icon: Building },
    { name: t('navigation.credentials'), href: '/credentials', icon: Key },
    { name: t('navigation.subscription'), href: '/subscription', icon: CreditCard },
    { name: t('navigation.settings'), href: '/settings', icon: Settings },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "tween",
        duration: 0.3
      }
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:z-auto lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Synctuario</h1>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => onClose()}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-300 border-r-2 border-primary-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-primary-600 dark:text-primary-300' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    }`}
                  />
                  <span className="truncate">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;