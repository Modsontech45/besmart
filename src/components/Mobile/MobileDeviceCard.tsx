import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  ToggleLeft, 
  Thermometer, 
  Sensors, 
  Smartphone,
  Wifi,
  WifiOff
} from 'lucide-react';
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

interface MobileDeviceCardProps {
  device: Device;
  onToggle: (deviceId: string, state: boolean) => void;
}

const MobileDeviceCard: React.FC<MobileDeviceCardProps> = ({ device, onToggle }) => {
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'light': return Lightbulb;
      case 'switch': return ToggleLeft;
      case 'sensor': return Sensors;
      case 'thermostat': return Thermometer;
      default: return Smartphone;
    }
  };

  const getDeviceColor = (type: string) => {
    switch (type) {
      case 'light': return 'text-yellow-500';
      case 'switch': return 'text-blue-500';
      case 'sensor': return 'text-green-500';
      case 'thermostat': return 'text-orange-500';
      default: return 'text-purple-500';
    }
  };

  const isOnline = device.last_seen 
    ? differenceInSeconds(new Date(), new Date(device.last_seen)) <= 60
    : false;

  const isDeviceOn = device.metadata?.state || false;
  const canToggle = device.device_type === 'switch' || device.device_type === 'light';

  const IconComponent = getDeviceIcon(device.device_type);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-300 ${
        isOnline 
          ? isDeviceOn 
            ? 'border-green-400 bg-green-50' 
            : 'border-gray-200' 
          : 'border-red-200 bg-red-50'
      }`}
    >
      {/* Device Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-full ${
            isOnline 
              ? isDeviceOn 
                ? 'bg-green-100' 
                : 'bg-gray-100' 
              : 'bg-red-100'
          }`}>
            <IconComponent className={`h-6 w-6 ${
              isOnline 
                ? isDeviceOn 
                  ? 'text-green-600' 
                  : getDeviceColor(device.device_type)
                : 'text-red-500'
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {device.device_name}
            </h3>
            <p className="text-sm text-gray-500 capitalize">
              {device.device_type}
            </p>
          </div>
        </div>

        {/* Online Status */}
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
          isOnline 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {isOnline ? (
            <Wifi className="h-4 w-4" />
          ) : (
            <WifiOff className="h-4 w-4" />
          )}
          <span className="text-xs font-medium">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Device Controls */}
      <div className="space-y-4">
        {canToggle && (
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Power</span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggle(device.id, !isDeviceOn)}
              disabled={!isOnline}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 ${
                isDeviceOn ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <motion.span
                layout
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                  isDeviceOn ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </motion.button>
          </div>
        )}

        {/* Device-specific information */}
        {device.device_type === 'sensor' && device.metadata?.value !== undefined && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {device.metadata.value}{device.metadata.unit || ''}
              </div>
              <div className="text-sm text-gray-500">Current Reading</div>
            </div>
          </div>
        )}

        {device.device_type === 'thermostat' && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {device.metadata?.temperature || 20}°C
                </div>
                <div className="text-xs text-gray-500">Current</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {device.metadata?.targetTemperature || 22}°C
                </div>
                <div className="text-xs text-gray-500">Target</div>
              </div>
            </div>
          </div>
        )}

        {device.device_type === 'light' && device.metadata?.brightness !== undefined && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600">
                {Math.round((device.metadata.brightness / 255) * 100)}%
              </div>
              <div className="text-xs text-gray-500">Brightness</div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MobileDeviceCard;