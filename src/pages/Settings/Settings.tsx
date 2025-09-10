import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Smartphone,
  Wifi,
  Database,
  Download,
  HelpCircle,
  ChevronRight,
  Moon,
  Sun,
  Volume2,
  Lock,
  Eye,
  Mail,
  Phone
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, colorScheme, toggleTheme, setColorScheme } = useTheme();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');

  const settingSections = [
    { id: 'profile', label: t('settings.profile'), icon: User },
    { id: 'notifications', label: t('settings.notifications'), icon: Bell },
    { id: 'security', label: t('settings.security'), icon: Shield },
    { id: 'appearance', label: t('settings.appearance'), icon: Palette },
    { id: 'language', label: t('settings.language'), icon: Globe },
    { id: 'devices', label: t('settings.devices'), icon: Smartphone },
    { id: 'network', label: t('settings.network'), icon: Wifi },
    { id: 'data', label: t('settings.dataPrivacy'), icon: Database },
    { id: 'updates', label: t('settings.updates'), icon: Download },
    { id: 'help', label: t('settings.helpSupport'), icon: HelpCircle },
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('settings.profileSettings')}</h3>
            
            <div className="flex items-center space-x-4">
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
                alt={user?.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                  {t('settings.changePhoto')}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('settings.fullName')}
                </label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('settings.email')}
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('settings.phone')}
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('settings.timezone')}
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC+0 (GMT)</option>
                </select>
              </div>
            </div>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              {t('settings.saveChanges')}
            </button>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('settings.notificationSettings')}</h3>
            
            <div className="space-y-4">
              {[
                { key: 'deviceAlerts', label: t('settings.deviceAlerts'), desc: t('settings.deviceAlertsDesc') },
                { key: 'motionDetection', label: t('settings.motionDetection'), desc: t('settings.motionDetectionDesc') },
                { key: 'automationUpdates', label: t('settings.automationUpdates'), desc: t('settings.automationUpdatesDesc') },
                { key: 'systemUpdates', label: t('settings.systemUpdates'), desc: t('settings.systemUpdatesDesc') },
                { key: 'emailNotifications', label: t('settings.emailNotifications'), desc: t('settings.emailNotificationsDesc') },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{item.label}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('settings.appearanceSettings')}</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{t('settings.darkMode')}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.darkModeDesc')}</p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    <span>{theme === 'dark' ? t('settings.lightMode') : t('settings.darkMode')}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t('settings.colorScheme')}</h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'blue', color: 'bg-blue-500' },
                    { name: 'teal', color: 'bg-teal-500' },
                    { name: 'purple', color: 'bg-purple-500' }
                  ].map((scheme) => (
                    <button
                      key={scheme.name}
                      onClick={() => setColorScheme(scheme.name as 'blue' | 'teal' | 'purple')}
                      className={`p-3 rounded-lg border-2 ${
                        colorScheme === scheme.name 
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900' 
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className={`w-full h-8 rounded ${scheme.color}`}></div>
                      <p className="text-sm mt-2 capitalize text-gray-900 dark:text-white">{scheme.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('settings.languageSettings')}</h3>
            
            <div className="space-y-3">
              {[
                { code: 'en', name: 'English', flag: '🇺🇸' },
                { code: 'fr', name: 'Français', flag: '🇫🇷' },
              ].map((language) => (
                <button
                  key={language.code}
                  onClick={() => i18n.changeLanguage(language.code)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                    i18n.language === language.code
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{language.flag}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{language.name}</span>
                  </div>
                  {i18n.language === language.code && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('settings.securitySettings')}</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t('settings.changePassword')}</h4>
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder={t('settings.currentPassword')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder={t('settings.newPassword')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder={t('settings.confirmPassword')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    {t('settings.updatePassword')}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t('settings.twoFactorAuth')}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{t('settings.twoFactorAuthDesc')}</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  {t('settings.enable2FA')}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('settings.comingSoon')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t('settings.featureInDevelopment')}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{t('settings.title')}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{t('settings.description')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
            <nav className="space-y-1">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <section.icon className="h-4 w-4" />
                    <span>{section.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
          >
            {renderSectionContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;