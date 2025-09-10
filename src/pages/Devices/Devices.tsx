// Devices.tsx (cleaned & integrated)
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Lightbulb,
  ToggleLeft,
  Thermometer,
  Scissors as Sensors,
  Smartphone,
  Wifi,
  WifiOff,
} from "lucide-react";
import { apiService } from "../../services/apiService";
import { format } from "date-fns";
import toast from "react-hot-toast";

// Device controls components
import Toggle from "./Toggle";
import Slider from "./Slider";
import Gauge from "./Gauge";

interface Device {
  id: string;
  device_uid: string;
  device_name: string;
  device_type: string;
  status: "online" | "offline";
  lastSeen: Date;
  metadata?: Record<string, any>;
  api_key?: string;
  [key: string]: any; // for any additional properties
  
}

const Devices: React.FC = () => {
  const { t } = useTranslation();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [visibleApiKeys, setVisibleApiKeys] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const data = await apiService.getDevices();
      const normalized = data.map((d: any) => ({
        ...d,
        device_name: d.device_name || d.name || "Unnamed Device",
      }));
      setDevices(normalized);
    } catch {
      toast.error("Failed to fetch devices");
    } finally {
      setLoading(false);
    }
  };

  const handleEditDevice = async (
    deviceUid: string,
    name: string,
    status: "online" | "offline"
  ) => {
    try {
      await apiService.editDevice(deviceUid, { device_name: name, status });
      setDevices((prev) =>
        prev.map((d) =>
          d.device_uid === deviceUid ? { ...d, device_name: name, status } : d
        )
      );
      toast.success("Device updated successfully");
      setEditingDevice(null);
    } catch {
      toast.error("Failed to update device");
    }
  };

  const toggleApiKey = (deviceId: string) => {
    setVisibleApiKeys((prev) => ({ ...prev, [deviceId]: !prev[deviceId] }));
  };

  const handleDeviceControlChange = async (
    deviceId: string,
    key: string,
    value: any
  ) => {
    try {
      const device = devices.find((d) => d.id === deviceId);
      if (!device) return toast.error("Device not found");
      const updatedMetadata = { ...device.metadata, [key]: value };
      await apiService.updateDevice(device.device_uid, {
        metadata: updatedMetadata,
      });
      setDevices((prev) =>
        prev.map((d) =>
          d.id === deviceId ? { ...d, metadata: updatedMetadata } : d
        )
      );
      toast.success("Device updated");
    } catch {
      toast.error("Failed to update device");
    }
  };

  const handleAddDevice = async (
    deviceData: Omit<Device, "id" | "lastSeen">
  ) => {
    try {
      const newDevice = await apiService.addDevice(deviceData);
      setDevices([
        ...devices,
        {
          ...newDevice,
          device_name: newDevice.device_name || "Unnamed Device",
        },
      ]);
      toast.success("Device added successfully");
      fetchDevices();
      setShowAddModal(false);
    } catch {
      toast.error("Failed to add device");
    }
  };

  const handleDeleteDevice = async (deviceUid: string) => {
    if (!confirm("Are you sure you want to delete this device?")) return;
    try {
      await apiService.deleteDevice(deviceUid);
      setDevices((prev) => prev.filter((d) => d.device_uid !== deviceUid));
      toast.success("Device deleted successfully");
    } catch {
      toast.error("Failed to delete device");
    }
  };

  const handleCopyApiKey = async (apiKey: string, deviceName: string) => {
    try {
      if (!apiKey) return toast.error("No API key found for this device");
      await navigator.clipboard.writeText(apiKey);
      toast.success(`API key for ${deviceName} copied to clipboard`);
    } catch {
      toast.error("Failed to copy API key");
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "light":
        return Lightbulb;
      case "switch":
        return ToggleLeft;
      case "sensor":
        return Sensors;
      case "thermostat":
        return Thermometer;
      case "smartButton":
        return Smartphone;
      default:
        return Smartphone;
    }
  };

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = device.device_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" || device.device_type === filterType;
    return matchesSearch && matchesFilter;
  });

  const deviceTypes = [
    { value: "all", label: "All Devices" },
    { value: "light", label: t("devices.light") },
    { value: "switch", label: t("devices.switch") },
    { value: "sensor", label: t("devices.sensor") },
    { value: "thermostat", label: t("devices.thermostat") },
    { value: "smartButton", label: t("devices.smartButton") },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-gray-700 border-t-blue-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {t("devices.title")}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Manage your smart home devices
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>{t("devices.addDevice")}</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder={t("common.search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-500"
          />
        </div>
        <div className="relative sm:w-48">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 sm:py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
          >
            {deviceTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredDevices.map((device) => {
            const IconComponent = getDeviceIcon(device.device_type);
            const isOnline = device.status === "online";
            const meta = device.metadata || {};

            return (
              <motion.div
                key={device.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -2 }}
                className="bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-800 flex flex-col space-y-3"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div
                    className={`p-3 rounded-xl flex-shrink-0 ${
                      device.device_type === "light"
                        ? "bg-yellow-900"
                        : device.device_type === "switch"
                        ? "bg-blue-900"
                        : device.device_type === "sensor"
                        ? "bg-green-900"
                        : device.device_type === "thermostat"
                        ? "bg-orange-900"
                        : "bg-purple-900"
                    }`}
                  >
                    <IconComponent
                      className={`h-6 w-6 ${
                        device.device_type === "light"
                          ? "text-yellow-600"
                          : device.device_type === "switch"
                          ? "text-blue-600"
                          : device.device_type === "sensor"
                          ? "text-green-600"
                          : device.device_type === "thermostat"
                          ? "text-orange-600"
                          : "text-purple-600"
                      }`}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingDevice(device)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDevice(device.device_uid)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Device Info */}
                <div>
                  <h3 className="font-medium text-white truncate">
                    {device.device_name}
                  </h3>
                  <p className="text-sm text-gray-400 capitalize">
                    {device.device_type}
                  </p>

                  {/* Online Status */}
                  <div
                    className={`flex items-center space-x-2 mt-1 px-2 py-1 rounded-full ${
                      isOnline
                        ? "bg-green-900 text-green-300"
                        : "bg-red-900 text-red-300"
                    }`}
                  >
                    {isOnline ? (
                      <Wifi className="h-3 w-3" />
                    ) : (
                      <WifiOff className="h-3 w-3" />
                    )}
                    <span className="text-xs font-medium">
                      {isOnline ? t("devices.online") : t("devices.offline")}
                    </span>
                  </div>

                  {/* Last Seen */}
                  <div className="text-xs text-gray-400 truncate mt-1">
                    {t("devices.lastSeen")}:{" "}
                    {device.lastSeen
                      ? format(new Date(device.lastSeen), "MMM d, h:mm a")
                      : "N/A"}
                  </div>

                  {/* API Key Section */}
                  <div className="hidden sm:flex items-center space-x-2 mt-2">
                    <div className="text-xs text-gray-400 truncate font-mono">
                      {visibleApiKeys[device.id]
                        ? device.api_key
                        : `${device.api_key?.slice(0, 10)}...`}
                    </div>
                    <button
                      onClick={() => toggleApiKey(device.id)}
                      className="px-2 py-1 bg-blue-700 hover:bg-blue-600 text-white text-xs rounded-lg"
                    >
                      {visibleApiKeys[device.id] ? "Hide" : "View"}
                    </button>
                    <button
                      onClick={() =>
                        handleCopyApiKey(device.api_key, device.device_name)
                      }
                      className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-lg"
                    >
                      Copy
                    </button>
                  </div>

                  {/* Device-specific controls & state display */}
                  <div className="mt-2 space-y-2">
                    {/* Light */}
                    {device.device_type === "light" && (
                      <div className="space-y-1">
                        <Slider
                          value={meta.brightness ?? 0}
                          min={0}
                          max={255}
                          onChange={(val: number) =>
                            handleDeviceControlChange(
                              device.id,
                              "brightness",
                              val
                            )
                          }
                        />
                        <div className="text-xs text-gray-400">
                          Brightness:{" "}
                          {Math.round(((meta.brightness ?? 0) / 255) * 100)}%
                        </div>
                      </div>
                    )}

                    {/* Switch */}
                    {device.device_type === "switch" && (
                      <div className="flex items-center justify-between">
                        <Toggle
                          value={!!meta.state}
                          onChange={(val: boolean) =>
                            handleDeviceControlChange(device.id, "state", val)
                          }
                        />
                        <span className="text-xs text-gray-400">
                          {meta.state ? "On" : "Off"}
                        </span>
                      </div>
                    )}

                    {/* Sensor */}
                    {device.device_type === "sensor" &&
                      meta.value !== undefined && (
                        <div className="space-y-1">
                          <Gauge
                            value={meta.value}
                            unit={meta.unit || ""}
                            max={meta.max ?? 100}
                          />
                          <div className="text-xs text-gray-400">
                            Value: {meta.value}
                            {meta.unit}
                          </div>
                        </div>
                      )}

                    {/* Thermostat */}
                    {device.device_type === "thermostat" && (
                      <div className="flex flex-col space-y-2">
                        <div className="text-sm text-gray-300">
                          {meta.temperature}°C → {meta.targetTemperature}°C
                        </div>
                        <Slider
                          value={meta.targetTemperature ?? 20}
                          min={16}
                          max={30}
                          onChange={(val: number) =>
                            handleDeviceControlChange(
                              device.id,
                              "targetTemperature",
                              val
                            )
                          }
                        />
                        <div className="text-xs text-gray-400">
                          Target: {meta.targetTemperature ?? 20}°C
                        </div>
                      </div>
                    )}

                    {/* Smart Button */}
                    {device.device_type === "smartButton" && (
                      <div className="text-sm text-gray-300">
                        Battery: {meta.batteryLevel ?? 0}%
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredDevices.length === 0 && (
        <div className="text-center py-12">
          <Smartphone className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            No devices found
          </h3>
          <p className="text-gray-400 mb-6">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Get started by adding your first device"}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            <Plus className="h-4 w-4" />
            <span>{t("devices.addDevice")}</span>
          </button>
        </div>
      )}

      {/* Add Device Modal */}
      <AddDeviceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddDevice}
      />

      {/* Edit Device Modal */}
      {/* Edit Device Modal integrated */}
      {editingDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-800"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Edit Device
            </h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (editingDevice)
                  handleEditDevice(
                    editingDevice.device_uid,
                    editingDevice.device_name,
                    editingDevice.status
                  );
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {t("devices.deviceName")}
                </label>
                <input
                  type="text"
                  required
                  value={editingDevice.device_name}
                  onChange={(e) =>
                    setEditingDevice({
                      ...editingDevice,
                      device_name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {t("devices.status")}
                </label>
                <select
                  value={editingDevice.status}
                  onChange={(e) =>
                    setEditingDevice({
                      ...editingDevice,
                      status: e.target.value as "online" | "offline",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="online">{t("devices.online")}</option>
                  <option value="offline">{t("devices.offline")}</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingDevice(null)}
                  className="flex-1 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800"
                >
                  {t("common.cancel")}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  {t("common.save")}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Add Device Modal Component
const AddDeviceModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAdd: (device: any) => void;
}> = ({ isOpen, onClose, onAdd }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    type: "light",
    status: "online",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: "", type: "light", status: "online" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-800"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          {t("devices.addDevice")}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t("devices.deviceName")}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t("devices.deviceType")}
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">{t("devices.light")}</option>
              <option value="switch">{t("devices.switch")}</option>
              <option value="sensor">{t("devices.sensor")}</option>
              <option value="thermostat">{t("devices.thermostat")}</option>
              <option value="smartButton">{t("devices.smartButton")}</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              {t("common.add")}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Edit Device Modal Component
const EditDeviceModal: React.FC<{
  device: Device;
  onClose: () => void;
  onUpdate: (device: Device) => void;
}> = ({ device, onClose, onUpdate }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: device.name,
    type: device.type,
    status: device.status,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...device, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-800"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Edit Device</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t("devices.deviceName")}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t("devices.status")}
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "online" | "offline",
                })
              }
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="online">{t("devices.online")}</option>
              <option value="offline">{t("devices.offline")}</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault(); // Prevent default form submission
                if (editingDevice) {
                  handleEditDevice(editingDevice.device_uid); // Pass the UID
                }
              }}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              {t("common.save")}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Devices;
