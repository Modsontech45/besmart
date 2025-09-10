import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Building, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  Clock,
  Zap,
  TrendingUp,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const Business: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('provisioning');

  const tabs = [
    { id: 'provisioning', label: t('business.provisioning'), icon: Settings },
    { id: 'scheduling', label: t('business.scheduling'), icon: Calendar },
    { id: 'routines', label: t('business.routines'), icon: Zap },
    { id: 'analytics', label: t('business.analytics'), icon: BarChart3 },
    { id: 'team', label: t('business.teamManagement'), icon: Users },
  ];

  const mockDeviceTemplates = [
    { id: '1', name: 'Office Light Template', devices: 45, lastUsed: '2 hours ago' },
    { id: '2', name: 'Conference Room Setup', devices: 12, lastUsed: '1 day ago' },
    { id: '3', name: 'Security System Template', devices: 8, lastUsed: '3 days ago' },
  ];

  const mockSchedules = [
    { id: '1', name: 'Office Hours Automation', type: 'Daily', nextRun: '6:00 AM tomorrow', status: 'active' },
    { id: '2', name: 'Weekend Security Mode', type: 'Weekly', nextRun: '6:00 PM Friday', status: 'active' },
    { id: '3', name: 'Maintenance Schedule', type: 'Monthly', nextRun: '12:00 AM 1st', status: 'paused' },
  ];

  const mockTeamMembers = [
    { id: '1', name: 'John Smith', role: 'Administrator', lastActive: '2 minutes ago', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { id: '2', name: 'Sarah Johnson', role: 'Manager', lastActive: '1 hour ago', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { id: '3', name: 'Mike Davis', role: 'Technician', lastActive: '3 hours ago', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'provisioning':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-semibold text-white">{t('business.provisioning')}</h2>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                <span>New Template</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {mockDeviceTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ y: -4 }}
                  className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800 hover:shadow-xl transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-purple-900 rounded-xl flex-shrink-0">
                      <Settings className="h-6 w-6 text-purple-600" />
                    </div>
                    <button className="text-gray-400 hover:text-white">
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="font-medium text-white mb-2 truncate">{template.name}</h3>
                  <p className="text-sm text-gray-300 mb-3">{template.devices} devices configured</p>
                  <p className="text-xs text-gray-400">Last used: {template.lastUsed}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'scheduling':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-semibold text-white">{t('business.scheduling')}</h2>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                <span>New Schedule</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {mockSchedules.map((schedule) => (
                <div key={schedule.id} className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        schedule.status === 'active' ? 'bg-green-900' : 'bg-yellow-900'
                      }`}>
                        <Clock className={`h-4 w-4 ${
                          schedule.status === 'active' ? 'text-green-400' : 'text-yellow-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{schedule.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-gray-300">
                          <span>{schedule.type}</span>
                          <span>Next: {schedule.nextRun}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        schedule.status === 'active' 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-yellow-900 text-yellow-300'
                      }`}>
                        {schedule.status}
                      </span>
                      <button className="text-gray-400 hover:text-white">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'routines':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-semibold text-white">{t('business.routines')}</h2>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                <span>New Routine</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-900 rounded-xl flex-shrink-0">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="font-medium text-white mb-2">Morning Setup</h3>
                <p className="text-sm text-gray-300 mb-3">
                  Turns on office lights, adjusts temperature, and activates security systems
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Runs daily at 6:00 AM</span>
                  <span className="px-2 py-1 bg-green-900 text-green-300 rounded-full font-medium">Active</span>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-orange-900 rounded-xl flex-shrink-0">
                    <Zap className="h-6 w-6 text-orange-600" />
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="font-medium text-white mb-2">Evening Shutdown</h3>
                <p className="text-sm text-gray-300 mb-3">
                  Turns off non-essential devices, activates night security mode
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Runs daily at 8:00 PM</span>
                  <span className="px-2 py-1 bg-green-900 text-green-300 rounded-full font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white">{t('business.analytics')}</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {[
                { label: 'Total Devices', value: '127', change: '+12%', icon: Building },
                { label: 'Energy Saved', value: '23%', change: '+5%', icon: TrendingUp },
                { label: 'Automation Runs', value: '1,204', change: '+18%', icon: Zap },
                { label: 'Cost Savings', value: '$2,450', change: '+9%', icon: BarChart3 },
              ].map((stat, index) => (
                <div key={index} className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-400 mb-1 truncate">{stat.label}</p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{stat.value}</p>
                      <p className={`text-sm font-medium ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="bg-blue-500 p-3 rounded-xl">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Device Usage Overview</h3>
              <div className="h-48 sm:h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Analytics chart would be displayed here</p>
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-semibold text-white">{t('business.teamManagement')}</h2>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                <span>Invite Member</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {mockTeamMembers.map((member) => (
                <div key={member.id} className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-medium text-white">{member.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-gray-300">
                          <span>{member.role}</span>
                          <span>Last active: {member.lastActive}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <button className="text-gray-400 hover:text-white">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{t('business.title')}</h1>
        <p className="text-gray-300 text-sm sm:text-base">Advanced tools for business and enterprise management</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  isActive
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
};

export default Business;