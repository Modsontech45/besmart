import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  LayoutDashboard, 
  Zap, 
  Camera, 
  Building, 
  Settings, 
  Menu, 
  X,
  Smartphone,
  Globe
} from 'lucide-react';
import LanguageSwitcher from '../UI/LanguageSwitcher';

interface MobileNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ currentPage, onPageChange }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'devices', label: t('navigation.devices'), icon: Smartphone },
    { id: 'dashboard', label: t('navigation.dashboard'), icon: LayoutDashboard },
    { id: 'automations', label: t('navigation.automations'), icon: Zap },
    { id: 'vision-ai', label: t('navigation.visionAI'), icon: Camera },
    { id: 'business', label: t('navigation.business'), icon: Building },
    { id: 'settings', label: t('navigation.settings'), icon: Settings },
  ];

  const handlePageChange = (pageId: string) => {
    onPageChange(pageId);
    setIsMenuOpen(false);
  };

  const currentPageData = navigationItems.find(item => item.id === currentPage);

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-600 rounded-lg">
              <Home className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Aƒe Nyanu</h1>
              <p className="text-xs text-gray-500">
                {currentPageData?.label || t('navigation.devices')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom">
        <div className="flex justify-around">
          {navigationItems.slice(0, 4).map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
          
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-gray-500 hover:text-gray-700"
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </div>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-xl z-50 flex flex-col"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-600 rounded-lg">
                    <Home className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Aƒe Nyanu</h2>
                    <p className="text-sm text-gray-500">{t('navigation.dashboard')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 py-4">
                {navigationItems.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handlePageChange(item.id)}
                      className={`w-full flex items-center space-x-4 px-6 py-4 text-left transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="h-6 w-6" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Menu Footer */}
              <div className="p-6 border-t border-gray-200">
                <div className="text-center text-sm text-gray-500">
                  <p>Aƒe Nyanu v2.1.0</p>
                  <p>© 2025 Synctuario</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavigation;