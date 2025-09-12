import React, { useState } from 'react';
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
  Phone,
  LogOut
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const MobileSettings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('main');

  const mainSettings = [
    { id: 'profile', label: 'Profile', icon: User, description: 'Manage your account' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Alert preferences' },
    { id: 'security', label: 'Security', icon: Shield, description: 'Password & 2FA' },
    { id: 'appearance', label: 'Appearance', icon: Palette, description: 'Theme & colors' },
    { id: 'language', label: 'Language', icon: Globe, description: 'App language' },
    { id: 'devices', label: 'Device Settings', icon: Smartphone, description: 'Device preferences' },
    { id: 'network', label: 'Network', icon: Wifi, description: 'Connection settings' },
    { id: 'privacy', label: 'Privacy', icon: Database, description: 'Data & privacy' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, description: 'Get assistance' },
  ];

  const renderMainSettings = () => (
    <div className="space-y-4">
      {/* Profile Card */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl p-6">
        <div className="flex items-center space-x-4">
          <img
            src={user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
            alt={user?.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
          />
          <div>
            <h3 className="text-xl font-bold">{user?.name}</h3>
            <p className="text-primary-100">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="flex items-center justify-center space-x-2 bg-gray-50 text-gray-700 p-4 rounded-xl border border-gray-200"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="font-medium">{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')}
            className="flex items-center justify-center space-x-2 bg-gray-50 text-gray-700 p-4 rounded-xl border border-gray-200"
          >
            <Globe className="h-5 w-5" />
            <span className="font-medium">{i18n.language === 'en' ? 'Français' : 'English'}</span>
          </motion.button>
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {mainSettings.map((setting, index) => (
          <motion.button
            key={setting.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveSection(setting.id)}
            className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
              index !== mainSettings.length - 1 ? 'border-b border-gray-100' : ''
            } hover:bg-gray-50`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <setting.icon className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{setting.label}</p>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </motion.button>
        ))}
      </div>

      {/* Logout Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={logout}
        className="w-full bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl font-medium flex items-center justify-center space-x-2"
      >
        <LogOut className="h-5 w-5" />
        <span>Sign Out</span>
      </motion.button>

      {/* App Info */}
      <div className="text-center text-sm text-gray-500 py-4">
        <p>Aƒe Nyanu v2.1.0</p>
        <p>© 2025 Synctuario</p>
      </div>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
        
        <div className="text-center mb-6">
          <img
            src={user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
            alt={user?.name}
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Change Photo
          </motion.button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue={user?.name}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full mt-6 bg-primary-600 text-white py-3 rounded-xl font-medium"
        >
          Save Changes
        </motion.button>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          {[
            { key: 'deviceAlerts', label: 'Device Alerts', desc: 'Get notified when devices go offline' },
            { key: 'motionDetection', label: 'Motion Detection', desc: 'Receive alerts when motion is detected' },
            { key: 'automationUpdates', label: 'Automation Updates', desc: 'Get notified when automations run' },
            { key: 'systemUpdates', label: 'System Updates', desc: 'Receive notifications about updates' },
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Send notifications to your email' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Change Password</h4>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium"
              >
                Update Password
              </motion.button>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-medium"
            >
              Enable 2FA
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 mx-4 mt-4 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-gray-300">Manage your preferences</p>
          </div>
          {activeSection !== 'main' && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection('main')}
              className="bg-white/20 p-2 rounded-lg"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-6">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'main' && renderMainSettings()}
          {activeSection === 'profile' && renderProfileSettings()}
          {activeSection === 'notifications' && renderNotificationSettings()}
          {activeSection === 'security' && renderSecuritySettings()}
          {activeSection !== 'main' && activeSection !== 'profile' && activeSection !== 'notifications' && activeSection !== 'security' && (
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 text-center">
              <div className="text-gray-400 mb-4">
                <Settings className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-gray-500">This feature is currently in development</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MobileSettings;