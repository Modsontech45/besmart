import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '../../services/apiService';
import { useVoiceControl } from '../../hooks/useVoiceControl';
import MobileNavigation from '../../components/Mobile/MobileNavigation';
import MobileDeviceCard from '../../components/Mobile/MobileDeviceCard';
import MobileDashboard from './MobileDashboard';
import MobileAutomations from './MobileAutomations';
import MobileVisionAI from './MobileVisionAI';
import MobileBusiness from './MobileBusiness';
import MobileSettings from './MobileSettings';
import toast from 'react-hot-toast';
import { differenceInSeconds } from 'date-fns';
import { Mic, MicOff, Power, RefreshCw } from 'lucide-react';

interface Device {
  id: string;
  device_uid: string;
  device_name: string;
  device_type: string;
  status: 'online' | 'offline';
  last_seen: string;
  metadata?: Record<string, any>;
}

const MobileApp: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('devices');

  const {
    isListening,
    isSupported: isVoiceSupported,
    startListening,
    stopListening,
    transcript
  } = useVoiceControl(devices, setDevices);

  useEffect(() => {
    fetchDevices();
    
    const interval = setInterval(fetchDevices, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchDevices = async () => {
    try {
      const data = await apiService.getDevices();
      setDevices(data.map((d: any) => ({
        ...d,
        device_name: d.device_name || d.name || 'Unnamed Device',
      })));
    } catch (error) {
      toast.error('Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  };

  const handleDeviceToggle = async (deviceId: string, newState: boolean) => {
    try {
      const device = devices.find(d => d.id === deviceId);
      if (!device) return;

      const updatedMetadata = { ...device.metadata, state: newState };
      await apiService.updateDevice(device.device_uid, { metadata: updatedMetadata });
      
      setDevices(prev => prev.map(d =>
        d.id === deviceId ? { ...d, metadata: updatedMetadata } : d
      ));
      
      toast.success(`${device.device_name} ${newState ? 'turned on' : 'turned off'}`);
    } catch (error) {
      toast.error('Failed to update device');
    }
  };

  const handleTurnAllOn = async () => {
    try {
      const controllableDevices = devices.filter(d => 
        d.device_type === 'switch' || d.device_type === 'light'
      );
      
      const updatedDevices = await Promise.all(
        controllableDevices.map(async (device) => {
          const updatedMetadata = { ...device.metadata, state: true };
          await apiService.updateDevice(device.device_uid, { metadata: updatedMetadata });
          return { ...device, metadata: updatedMetadata };
        })
      );

      setDevices(prev => prev.map(device => {
        const updated = updatedDevices.find(u => u.id === device.id);
        return updated || device;
      }));

      toast.success('All devices turned on');
    } catch (error) {
      toast.error('Failed to turn on all devices');
    }
  };

  const handleTurnAllOff = async () => {
    try {
      const controllableDevices = devices.filter(d => 
        d.device_type === 'switch' || d.device_type === 'light'
      );
      
      const updatedDevices = await Promise.all(
        controllableDevices.map(async (device) => {
          const updatedMetadata = { ...device.metadata, state: false };
          await apiService.updateDevice(device.device_uid, { metadata: updatedMetadata });
          return { ...device, metadata: updatedMetadata };
        })
      );

      setDevices(prev => prev.map(device => {
        const updated = updatedDevices.find(u => u.id === device.id);
        return updated || device;
      }));

      toast.success('All devices turned off');
    } catch (error) {
      toast.error('Failed to turn off all devices');
    }
  };

  const onlineDevices = devices.filter(device => 
    device.last_seen && differenceInSeconds(new Date(), new Date(device.last_seen)) <= 60
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <MobileDashboard />;
      case 'automations':
        return <MobileAutomations />;
      case 'vision-ai':
        return <MobileVisionAI />;
      case 'business':
        return <MobileBusiness />;
      case 'settings':
        return <MobileSettings />;
      default:
        return renderDevicesPage();
    }
  };

  const renderDevicesPage = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-gray-200 border-t-primary-600 rounded-full"
          />
        </div>
      );
    }

    return (
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl p-6 mx-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Smart Home</h2>
              <p className="text-primary-100">
                {onlineDevices.length} of {devices.length} devices online
              </p>
            </div>

            {/* Voice Control Button */}
            {isVoiceSupported && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={isListening ? stopListening : startListening}
                className={`p-3 rounded-full transition-colors ${
                  isListening 
                    ? 'bg-red-500 animate-pulse' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {isListening ? (
                  <MicOff className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </motion.button>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex space-x-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleTurnAllOn}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <Power className="h-5 w-5" />
              <span>Turn All On</span>
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleTurnAllOff}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <Power className="h-5 w-5" />
              <span>Turn All Off</span>
            </motion.button>
          </div>

          {/* Voice Status */}
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Listening...</span>
                </div>
                <p className="text-xs text-primary-100">
                  Say "Turn on [device]", "Turn off [device]", "Turn all on", or "Turn all off"
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="px-4">
          {/* Refresh Button */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Your Devices ({devices.length})
            </h3>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={fetchDevices}
              className="p-2 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <RefreshCw className="h-5 w-5 text-gray-600" />
            </motion.button>
          </div>

          {/* Device Grid */}
          {devices.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                <div className="text-gray-400 mb-4">
                  <Power className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Devices Found</h3>
                <p className="text-gray-500 mb-6">Add devices to your smart home to get started</p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchDevices}
                  className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium"
                >
                  Refresh Devices
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {devices.map((device) => (
                <MobileDeviceCard
                  key={device.id}
                  device={device}
                  onToggle={handleDeviceToggle}
                />
              ))}
            </div>
          )}

          {/* Voice Transcript Display */}
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4"
            >
              <p className="text-sm text-blue-800">
                <strong>Voice Command:</strong> "{transcript}"
              </p>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-gray-200 border-t-primary-600 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <MobileNavigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
      
      {/* Page Content */}
      {renderCurrentPage()}
    </div>
  );
};

export default MobileApp;