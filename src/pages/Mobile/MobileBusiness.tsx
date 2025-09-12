import React, { useState } from 'react';
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
  ChevronRight,
} from 'lucide-react';

const MobileBusiness: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Devices', value: '127', change: '+12%', icon: Building, color: 'bg-blue-500' },
    { label: 'Energy Saved', value: '23%', change: '+5%', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Automation Runs', value: '1,204', change: '+18%', icon: Zap, color: 'bg-purple-500' },
    { label: 'Cost Savings', value: '$2,450', change: '+9%', icon: BarChart3, color: 'bg-orange-500' },
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

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-6 mx-4 mt-4">
        <h2 className="text-2xl font-bold mb-2">Business Tools</h2>
        <p className="text-gray-300">Advanced management for enterprise environments</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`${stat.color} p-2 rounded-xl`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.change.startsWith("+")
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 truncate">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
          <div className="grid grid-cols-4 gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'templates', label: 'Templates', icon: Settings },
              { id: 'schedules', label: 'Schedules', icon: Calendar },
              { id: 'team', label: 'Team', icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
                <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500">Analytics chart would be displayed here</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Device Templates</h3>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-600 text-white p-2 rounded-lg"
                >
                  <Plus className="h-5 w-5" />
                </motion.button>
              </div>
              
              {mockDeviceTemplates.map((template) => (
                <div key={template.id} className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Settings className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-500">{template.devices} devices • {template.lastUsed}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'schedules' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Advanced Schedules</h3>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-600 text-white p-2 rounded-lg"
                >
                  <Plus className="h-5 w-5" />
                </motion.button>
              </div>
              
              {mockSchedules.map((schedule) => (
                <div key={schedule.id} className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        schedule.status === 'active' ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        <Clock className={`h-5 w-5 ${
                          schedule.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{schedule.name}</h4>
                        <p className="text-sm text-gray-500">{schedule.type} • Next: {schedule.nextRun}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      schedule.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {schedule.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-600 text-white p-2 rounded-lg"
                >
                  <Plus className="h-5 w-5" />
                </motion.button>
              </div>
              
              {mockTeamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-500">{member.role} • {member.lastActive}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MobileBusiness;