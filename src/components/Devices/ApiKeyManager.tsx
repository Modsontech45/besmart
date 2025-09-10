import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Key,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  Code,
  Download,
  Shield,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";
import {
  deviceApiService,
  DeviceApiKey,
  esp32ApiEndpoints,
} from "../../services/deviceApi";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface ApiKeyManagerProps {
  deviceId: string;
  deviceName: string;
  isOpen: boolean;
  onClose: () => void;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({
  deviceId,
  deviceName,
  isOpen,
  onClose,
}) => {
  const [apiKey, setApiKey] = useState<DeviceApiKey | null>(null);
  const [loading, setLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchApiKey();
    }
  }, [isOpen, deviceId]);

  const fetchApiKey = async () => {
    setLoading(true);
    try {
      let key = await deviceApiService.getApiKey(deviceId);
      if (!key) {
        // Generate new API key if none exists
        key = await deviceApiService.generateApiKey(deviceId);
        toast.success("API key generated successfully");
      }
      setApiKey(key);
    } catch (error) {
      toast.error("Failed to fetch API key");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey.apiKey);
      toast.success("API key copied to clipboard");
    }
  };

  const handleRegenerateKey = async () => {
    if (
      !confirm(
        "Are you sure you want to regenerate the API key? The old key will be revoked immediately."
      )
    ) {
      return;
    }

    setRegenerating(true);
    try {
      const newKey = await deviceApiService.regenerateApiKey(deviceId);
      setApiKey(newKey);
      toast.success("API key regenerated successfully");
    } catch (error) {
      toast.error("Failed to regenerate API key");
    } finally {
      setRegenerating(false);
    }
  };

  const handleDownloadCode = () => {
    if (!apiKey) return;

    const code = esp32ApiEndpoints.getArduinoCode(apiKey.apiKey, deviceId);
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${deviceName.replace(/\s+/g, "_")}_esp32_code.ino`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Arduino code downloaded");
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 12) return key;
    return (
      key.substring(0, 8) +
      "•".repeat(key.length - 16) +
      key.substring(key.length - 8)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-2xl border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                API Key Management
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {deviceName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full"
              />
            </div>
          ) : apiKey ? (
            <>
              {/* API Key Display */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    API Key
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        apiKey.isActive
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                      }`}
                    >
                      {apiKey.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <code className="flex-1 text-sm font-mono text-gray-900 dark:text-white break-all">
                      {showKey ? apiKey.apiKey : maskApiKey(apiKey.apiKey)}
                    </code>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setShowKey(!showKey)}
                        className="p-1.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        title={showKey ? "Hide key" : "Show key"}
                      >
                        {showKey ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={handleCopyApiKey}
                        className="p-1.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      Created:
                    </span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {format(new Date(apiKey.createdAt), "MMM d, yyyy h:mm a")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      Last Used:
                    </span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {apiKey.lastUsed
                        ? format(
                            new Date(apiKey.lastUsed),
                            "MMM d, yyyy h:mm a"
                          )
                        : "Never"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Warning */}
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                    Keep your API key secure
                  </p>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    This key provides full access to your device. Never share it
                    publicly or commit it to version control.
                  </p>
                </div>
              </div>

              {/* API Endpoints */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  API Endpoints
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-gray-600 dark:text-gray-400">
                      Status Update:
                    </span>
                    <code className="text-gray-900 dark:text-white">
                      POST {esp32ApiEndpoints.baseUrl}/device/status
                    </code>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-gray-600 dark:text-gray-400">
                      Command Poll:
                    </span>
                    <code className="text-gray-900 dark:text-white">
                      GET {esp32ApiEndpoints.baseUrl}/device/commands
                    </code>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={handleRegenerateKey}
                  disabled={regenerating}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {regenerating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  <span>Regenerate Key</span>
                </button>

                <button
                  onClick={() => setShowCode(!showCode)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Code className="h-4 w-4" />
                  <span>{showCode ? "Hide" : "Show"} Arduino Code</span>
                </button>

                <button
                  onClick={handleDownloadCode}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Code</span>
                </button>
              </div>

              {/* Arduino Code */}
              <AnimatePresence>
                {showCode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      ESP32 Arduino Code
                    </h4>
                    <div className="relative">
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto max-h-64 overflow-y-auto">
                        <code>
                          {esp32ApiEndpoints.getArduinoCode(
                            apiKey.apiKey,
                            deviceId
                          )}
                        </code>
                      </pre>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            esp32ApiEndpoints.getArduinoCode(
                              apiKey.apiKey,
                              deviceId
                            )
                          );
                          toast.success("Code copied to clipboard");
                        }}
                        className="absolute top-2 right-2 p-2 bg-gray-800 text-gray-400 hover:text-white rounded"
                        title="Copy code"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <div className="text-center py-8">
              <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No API Key Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Generate an API key to connect your ESP32 device
              </p>
              <button
                onClick={fetchApiKey}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Key className="h-4 w-4" />
                <span>Generate API Key</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ApiKeyManager;
