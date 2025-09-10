import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Key,
  Home as HomeIcon,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  Code,
  Download,
  Shield,
  AlertTriangle,
  CheckCircle,
  Plus,
  Smartphone,
  Settings,
  Trash2,
} from "lucide-react";
import {
  homeApiService,
  HomeCredentials,
  esp32ApiConfig,
} from "../../services/homeApiService";
import { format } from "date-fns";
import toast from "react-hot-toast";

const Credentials: React.FC = () => {
  const { t } = useTranslation();
  const [homeCredentials, setHomeCredentials] =
    useState<HomeCredentials | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [showDeviceKeys, setShowDeviceKeys] = useState<Set<string>>(new Set());
  const [showArduinoCode, setShowArduinoCode] = useState<string | null>(null);
  const [regeneratingHome, setRegeneratingHome] = useState(false);
  const [regeneratingDevice, setRegeneratingDevice] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    setLoading(true);
    try {
      // For demo, we'll use the first home
      const homes = await homeApiService.getHomes();
      if (homes.length > 0) {
        const credentials = await homeApiService.getHomeCredentials(
          homes[0].id
        );
        setHomeCredentials(credentials);
      }
    } catch (error) {
      toast.error("Failed to fetch credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleRegenerateHomeSecret = async () => {
    if (!homeCredentials?.home) return;

    if (
      !confirm(
        "Are you sure you want to regenerate the home secret key? All devices will need to be updated with the new key."
      )
    ) {
      return;
    }

    setRegeneratingHome(true);
    try {
      const updatedHome = await homeApiService.regenerateHomeSecretKey(
        homeCredentials.home.id
      );
      setHomeCredentials({
        ...homeCredentials,
        home: updatedHome,
      });
      toast.success("Home secret key regenerated successfully");
    } catch (error) {
      toast.error("Failed to regenerate home secret key");
    } finally {
      setRegeneratingHome(false);
    }
  };

  const handleRegenerateDeviceKey = async (deviceId: string) => {
    if (
      !confirm(
        "Are you sure you want to regenerate this device API key? The device will need to be updated with the new key."
      )
    ) {
      return;
    }

    setRegeneratingDevice(deviceId);
    try {
      const updatedCredential = await homeApiService.regenerateDeviceApiKey(
        deviceId
      );
      if (homeCredentials) {
        setHomeCredentials({
          ...homeCredentials,
          devices: homeCredentials.devices.map((d) =>
            d.deviceId === deviceId ? updatedCredential : d
          ),
        });
      }
      toast.success("Device API key regenerated successfully");
    } catch (error) {
      toast.error("Failed to regenerate device API key");
    } finally {
      setRegeneratingDevice(null);
    }
  };

  const toggleDeviceKeyVisibility = (deviceId: string) => {
    const newSet = new Set(showDeviceKeys);
    if (newSet.has(deviceId)) {
      newSet.delete(deviceId);
    } else {
      newSet.add(deviceId);
    }
    setShowDeviceKeys(newSet);
  };

  const handleDownloadArduinoCode = (deviceId: string) => {
    if (!homeCredentials) return;

    const device = homeCredentials.devices.find((d) => d.deviceId === deviceId);
    if (!device) return;

    const code = esp32ApiConfig.generateArduinoCode(
      homeCredentials.home.secretKey,
      device.apiKey,
      device.deviceId,
      device.deviceName
    );

    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${device.deviceName.replace(/\s+/g, "_")}_esp32_code.ino`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Arduino code downloaded");
  };

  const maskKey = (key: string) => {
    if (key.length <= 16) return key;
    return (
      key.substring(0, 12) +
      "•".repeat(key.length - 24) +
      key.substring(key.length - 12)
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-gray-700 border-t-primary-500 rounded-full"
        />
      </div>
    );
  }

  if (!homeCredentials) {
    return (
      <div className="text-center py-12">
        <HomeIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">No Home Found</h3>
        <p className="text-gray-400 mb-6">
          Create a home first to manage credentials
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          API Credentials
        </h1>
        <p className="text-gray-300 text-sm sm:text-base">
          Manage your home secret key and device API keys for ESP32 integration
        </p>
      </div>

      {/* Home Credentials */}
      <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-900 rounded-xl">
              <HomeIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {homeCredentials.home.name}
              </h3>
              <p className="text-sm text-gray-400">
                {homeCredentials.home.description}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-green-900 text-green-300 text-sm font-medium rounded-full">
              Active
            </span>
            <span className="text-sm text-gray-400">
              {homeCredentials.devices.length} devices
            </span>
          </div>
        </div>

        {/* Home Secret Key */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-white">Home Secret Key</h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSecretKey(!showSecretKey)}
                className="p-1.5 rounded text-gray-400 hover:text-white"
                title={showSecretKey ? "Hide key" : "Show key"}
              >
                {showSecretKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() =>
                  handleCopyToClipboard(
                    homeCredentials.home.secretKey,
                    "Home secret key"
                  )
                }
                className="p-1.5 rounded text-gray-400 hover:text-white"
                title="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button
                onClick={handleRegenerateHomeSecret}
                disabled={regeneratingHome}
                className="p-1.5 rounded text-gray-400 hover:text-orange-400 disabled:opacity-50"
                title="Regenerate key"
              >
                {regeneratingHome ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full"
                  />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
            <code className="text-sm font-mono text-white break-all">
              {showSecretKey
                ? homeCredentials.home.secretKey
                : maskKey(homeCredentials.home.secretKey)}
            </code>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <span>Created:</span>
              <span className="ml-2 text-white">
                {format(
                  new Date(homeCredentials.home.createdAt),
                  "MMM d, yyyy h:mm a"
                )}
              </span>
            </div>
            <div>
              <span>Last Used:</span>
              <span className="ml-2 text-white">
                {homeCredentials.home.lastUsed
                  ? format(
                      new Date(homeCredentials.home.lastUsed),
                      "MMM d, yyyy h:mm a"
                    )
                  : "Never"}
              </span>
            </div>
          </div>
        </div>

        {/* Security Warning */}
        <div className="mt-6 flex items-start space-x-3 p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-yellow-200 mb-1">
              Keep your home secret key secure
            </p>
            <p className="text-yellow-300">
              This key provides access to all devices in your home. Never share
              it publicly or commit it to version control.
            </p>
          </div>
        </div>
      </div>

      {/* Device Credentials */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Device API Keys</h2>
          <span className="text-sm text-gray-400">
            {homeCredentials.devices.length} device
            {homeCredentials.devices.length !== 1 ? "s" : ""}
          </span>
        </div>

        {homeCredentials.devices.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800">
            <Smartphone className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No Device Credentials
            </h3>
            <p className="text-gray-400">
              Device API keys will appear here when you add devices to your home
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {homeCredentials.devices.map((device) => (
              <div
                key={device.id}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-900 rounded-lg">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        {device.deviceName}
                      </h4>
                      <p className="text-sm text-gray-400">
                        Device ID: {device.deviceId}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleDeviceKeyVisibility(device.deviceId)}
                      className="p-1.5 rounded text-gray-400 hover:text-white"
                      title={
                        showDeviceKeys.has(device.deviceId)
                          ? "Hide key"
                          : "Show key"
                      }
                    >
                      {showDeviceKeys.has(device.deviceId) ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        handleCopyToClipboard(device.apiKey, "Device API key")
                      }
                      className="p-1.5 rounded text-gray-400 hover:text-white"
                      title="Copy API key"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setShowArduinoCode(device.deviceId)}
                      className="p-1.5 rounded text-gray-400 hover:text-blue-400"
                      title="Show Arduino code"
                    >
                      <Code className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDownloadArduinoCode(device.deviceId)}
                      className="p-1.5 rounded text-gray-400 hover:text-green-400"
                      title="Download Arduino code"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleRegenerateDeviceKey(device.deviceId)}
                      disabled={regeneratingDevice === device.deviceId}
                      className="p-1.5 rounded text-gray-400 hover:text-orange-400 disabled:opacity-50"
                      title="Regenerate key"
                    >
                      {regeneratingDevice === device.deviceId ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full"
                        />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <code className="text-sm font-mono text-white break-all">
                      {showDeviceKeys.has(device.deviceId)
                        ? device.apiKey
                        : maskKey(device.apiKey)}
                    </code>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
                    <div>
                      <span>Created:</span>
                      <span className="ml-2 text-white">
                        {format(
                          new Date(device.createdAt),
                          "MMM d, yyyy h:mm a"
                        )}
                      </span>
                    </div>
                    <div>
                      <span>Last Used:</span>
                      <span className="ml-2 text-white">
                        {device.lastUsed
                          ? format(
                              new Date(device.lastUsed),
                              "MMM d, yyyy h:mm a"
                            )
                          : "Never"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API Endpoints Information */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">API Endpoints</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <span className="text-gray-400">Base URL:</span>
            <code className="text-white">{esp32ApiConfig.baseUrl}</code>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <span className="text-gray-400">Device Status:</span>
            <code className="text-white">
              POST {esp32ApiConfig.endpoints.deviceStatus}
            </code>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <span className="text-gray-400">Device Commands:</span>
            <code className="text-white">
              GET {esp32ApiConfig.endpoints.deviceCommands}
            </code>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <span className="text-gray-400">Device Register:</span>
            <code className="text-white">
              POST {esp32ApiConfig.endpoints.deviceRegister}
            </code>
          </div>
        </div>
      </div>

      {/* Arduino Code Modal */}
      <AnimatePresence>
        {showArduinoCode && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-800"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">
                  ESP32 Arduino Code
                </h3>
                <button
                  onClick={() => setShowArduinoCode(null)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="relative">
                  <pre className="bg-gray-950 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
                    <code>
                      {homeCredentials &&
                        esp32ApiConfig.generateArduinoCode(
                          homeCredentials.home.secretKey,
                          homeCredentials.devices.find(
                            (d) => d.deviceId === showArduinoCode
                          )?.apiKey || "",
                          showArduinoCode,
                          homeCredentials.devices.find(
                            (d) => d.deviceId === showArduinoCode
                          )?.deviceName || ""
                        )}
                    </code>
                  </pre>
                  <button
                    onClick={() => {
                      const device = homeCredentials?.devices.find(
                        (d) => d.deviceId === showArduinoCode
                      );
                      if (device && homeCredentials) {
                        const code = esp32ApiConfig.generateArduinoCode(
                          homeCredentials.home.secretKey,
                          device.apiKey,
                          device.deviceId,
                          device.deviceName
                        );
                        navigator.clipboard.writeText(code);
                        toast.success("Arduino code copied to clipboard");
                      }
                    }}
                    className="absolute top-2 right-2 p-2 bg-gray-800 text-gray-400 hover:text-white rounded"
                    title="Copy code"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Credentials;
