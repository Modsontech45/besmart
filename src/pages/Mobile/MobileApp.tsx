import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Wifi } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { useVoiceControl } from '../../hooks/useVoiceControl';
import MobileHeader from '../../components/Mobile/MobileHeader';
import MobileDeviceCard from '../../components/Mobile/MobileDeviceCard';
import toast from 'react-hot-toast';
import { differenceInSeconds } from 'date-fns';

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
  const [refreshing, setRefreshing] = useState(false);

  const {
    isListening,
    isSupported: isVoiceSupported,
    startListening,
    stopListening,
    transcript
  } = useVoiceControl(devices, setDevices);

  useEffect(() => {
    fetchDevices();
    
    // Set up real-time updates
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
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDevices();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Loading devices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <MobileHeader
        isListening={isListening}
        isVoiceSupported={isVoiceSupported}
        onStartListening={startListening}
        onStopListening={stopListening}
        onTurnAllOn={handleTurnAllOn}
        onTurnAllOff={handleTurnAllOff}
        deviceCount={devices.length}
        onlineCount={onlineDevices.length}
      />

      {/* Content */}
      <div className="px-4 py-6">
        {/* Refresh Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Your Devices ({devices.length})
          </h2>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 disabled:opacity-50"
          >
            <RefreshCw className={`h-5 w-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        {/* Connection Status */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Wifi className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Connection Status</p>
                <p className="text-sm text-gray-500">
                  {onlineDevices.length} online, {devices.length - onlineDevices.length} offline
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {devices.length > 0 ? Math.round((onlineDevices.length / devices.length) * 100) : 0}%
              </div>
              <div className="text-xs text-gray-500">Connected</div>
            </div>
          </div>
        </div>

        {/* Device Grid */}
        {devices.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Wifi className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Devices Found</h3>
            <p className="text-gray-500 mb-6">Add devices to your smart home to get started</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium"
            >
              Refresh Devices
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence>
              {devices.map((device) => (
                <MobileDeviceCard
                  key={device.id}
                  device={device}
                  onToggle={handleDeviceToggle}
                />
              ))}
            </AnimatePresence>
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

export default MobileApp;