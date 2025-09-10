import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNames: Record<string, string> = {
    dashboard: t('navigation.dashboard'),
    devices: t('navigation.devices'),
    automations: t('navigation.automations'),
    'ota-updates': t('navigation.otaUpdates'),
    'vision-ai': t('navigation.visionAI'),
    business: t('navigation.business'),
    credentials: t('navigation.credentials'),
    subscription: t('navigation.subscription'),
    settings: t('navigation.settings'),
  };

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <Link to="/dashboard" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-600" />
              {isLast ? (
                <span className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                  {breadcrumbNames[value] || value}
                </span>
              ) : (
                <Link
                  to={to}
                  className="ml-4 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
                >
                  {breadcrumbNames[value] || value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;