import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Power,
  Lightbulb,
  Thermometer,
  Volume2,
  Wifi,
  WifiOff,
  Settings,
  Activity,
} from "lucide-react";
import { deviceApiService } from "../../services/deviceApi";
import toast from "react-hot-toast";

interface Device {
  id: string;
  name: string;
  type: string;
  status: "online" | "offline";
  [key: string]: any;
}

interface DeviceControlProps {
  device: Device;
  onUpdate: (device: Device) => void;
}

const DeviceControl: React.FC<DeviceControlProps> = ({ device, onUpdate }) => {
  const [sending, setSending] = useState(false);

  const sendCommand = async (command: string, value?: any) => {
    setSending(true);
    try {
      await deviceApiService.sendCommand(device.id, {
        command,
        value,
        timestamp: new Date(),
      });

      // Update local device state
      const updatedDevice = { ...device };
      switch (command) {
        case "turn_on":
          updatedDevice.state = true;
          break;
        case "turn_off":
          updatedDevice.state = false;
          break;
        case "set_brightness":
          updatedDevice.brightness = value;
          break;
        case "set_temperature":
          updatedDevice.targetTemperature = value;
          break;
      }

      onUpdate(updatedDevice);
      toast.success(`Command sent to ${device.name}`);
    } catch (error) {
      toast.error("Failed to send command");
    } finally {
      setSending(false);
    }
  };

  const renderControls = () => {
    switch (device.type) {
      case "light":
        return (
          <div className="space-y-4">
            {/* Power Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Power
              </span>
              <button
                onClick={() =>
                  sendCommand(device.state ? "turn_off" : "turn_on")
                }
                disabled={sending || device.status === "offline"}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  device.state ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                } disabled:opacity-50`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    device.state ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Brightness Slider */}
            {device.brightness !== undefined && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Brightness
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {device.brightness}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={device.brightness}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    sendCommand("set_brightness", value);
                  }}
                  disabled={sending || device.status === "offline"}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            )}
          </div>
        );

      case "switch":
        return (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Power
            </span>
            <button
              onClick={() => sendCommand(device.state ? "turn_off" : "turn_on")}
              disabled={sending || device.status === "offline"}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                device.state ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
              } disabled:opacity-50`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  device.state ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        );

      case "thermostat":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {device.temperature}°C
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Current Temperature
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Target Temperature
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {device.targetTemperature}°C
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                value={device.targetTemperature}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  sendCommand("set_temperature", value);
                }}
                disabled={sending || device.status === "offline"}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        );

      case "sensor":
        return (
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {device.value}
              {device.unit}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Current Reading
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <Activity className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">No controls available</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900 dark:text-white">
          Device Controls
        </h3>
        <div
          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            device.status === "online"
              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
              : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
          }`}
        >
          {device.status === "online" ? (
            <Wifi className="h-3 w-3" />
          ) : (
            <WifiOff className="h-3 w-3" />
          )}
          <span>{device.status}</span>
        </div>
      </div>

      {renderControls()}

      {sending && (
        <div className="mt-4 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"
          />
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            Sending command...
          </span>
        </div>
      )}
    </div>
  );
};

export default DeviceControl;
