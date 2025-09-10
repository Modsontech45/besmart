import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Left side - Branding */}
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
              <Home className="h-5 w-5 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {t('footer.poweredBy')} <span className="font-bold text-primary-600 dark:text-primary-400">Synctuario</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t('footer.smartHomeManagement')}
              </p>
            </div>
          </div>

          {/* Right side - Copyright */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>© {currentYear} Synctuario.</span>
            <span>{t('footer.allRightsReserved')}</span>
            <Heart className="h-4 w-4 text-red-500" />
          </div>
        </div>

        {/* Additional Links */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap justify-center sm:justify-between items-center space-y-2 sm:space-y-0">
            <div className="flex flex-wrap justify-center sm:justify-start space-x-6 text-sm">
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('footer.terms')}
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('footer.support')}
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('footer.contact')}
              </a>
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {t('footer.version')} 2.1.0
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;