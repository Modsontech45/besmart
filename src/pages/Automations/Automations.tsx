import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Play,
  Pause,
  Edit,
  Trash2,
  Clock,
  Zap,
  Calendar,
} from "lucide-react";
import { apiService } from "../../services/apiService";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface Automation {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
  lastRun: Date | null;
}

const Automations: React.FC = () => {
  const { t } = useTranslation();
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchAutomations();
  }, []);

  const fetchAutomations = async () => {
    try {
      const data = await apiService.getAutomations();
      setAutomations(data);
    } catch (error) {
      toast.error("Failed to fetch automations");
    } finally {
      setLoading(false);
    }
  };

  const toggleAutomation = async (id: string) => {
    const automation = automations.find((a) => a.id === id);
    if (!automation) return;

    const updatedAutomation = { ...automation, enabled: !automation.enabled };
    setAutomations(
      automations.map((a) => (a.id === id ? updatedAutomation : a))
    );
    toast.success(
      `Automation ${updatedAutomation.enabled ? "enabled" : "disabled"}`
    );
  };

  const handleAddAutomation = async (
    automationData: Omit<Automation, "id" | "lastRun">
  ) => {
    try {
      const newAutomation = await apiService.addAutomation(automationData);
      setAutomations([...automations, newAutomation]);
      toast.success("Automation created successfully");
      setShowAddModal(false);
    } catch (error) {
      toast.error("Failed to create automation");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("automations.title")}
          </h1>
          <p className="text-gray-600">
            Create and manage smart home automations
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>{t("automations.createAutomation")}</span>
        </motion.button>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        <AnimatePresence>
          {automations.map((automation) => (
            <motion.div
              key={automation.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {automation.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        automation.enabled
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {automation.enabled
                        ? t("automations.enabled")
                        : t("automations.disabled")}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Zap className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {t("automations.trigger")}
                        </p>
                        <p className="text-sm text-gray-600">
                          {automation.trigger}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Play className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {t("automations.action")}
                        </p>
                        <p className="text-sm text-gray-600">
                          {automation.action}
                        </p>
                      </div>
                    </div>
                  </div>

                  {automation.lastRun && (
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>
                        Last run:{" "}
                        {format(new Date(automation.lastRun), "MMM d, h:mm a")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => toggleAutomation(automation.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      automation.enabled
                        ? "bg-green-100 text-green-600 hover:bg-green-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {automation.enabled ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </button>
                  <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {automations.length === 0 && (
        <div className="text-center py-12">
          <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No automations yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first automation to make your home smarter
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>{t("automations.createAutomation")}</span>
          </button>
        </div>
      )}

      {/* Add Automation Modal */}
      <AddAutomationModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddAutomation}
      />
    </div>
  );
};

// Add Automation Modal Component
const AddAutomationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAdd: (automation: any) => void;
}> = ({ isOpen, onClose, onAdd }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    trigger: "",
    action: "",
    enabled: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: "", trigger: "", action: "", enabled: true });
  };

  const triggerOptions = [
    "Time: 7:00 AM",
    "Time: 6:00 PM",
    "Motion detected",
    "Door opened",
    "Temperature above 25°C",
    "Sunset",
    "Sunrise",
  ];

  const actionOptions = [
    "Turn on lights",
    "Turn off all devices",
    "Set thermostat to 22°C",
    "Send notification",
    "Activate security mode",
    "Start music playlist",
  ];

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
          {t("automations.createAutomation")}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t("automations.automationName")}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="My Automation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t("automations.trigger")}
            </label>
            <select
              required
              value={formData.trigger}
              onChange={(e) =>
                setFormData({ ...formData, trigger: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a trigger</option>
              {triggerOptions.map((trigger) => (
                <option key={trigger} value={trigger}>
                  {trigger}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t("automations.action")}
            </label>
            <select
              required
              value={formData.action}
              onChange={(e) =>
                setFormData({ ...formData, action: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an action</option>
              {actionOptions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="enabled"
              checked={formData.enabled}
              onChange={(e) =>
                setFormData({ ...formData, enabled: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-800 rounded"
            />
            <label
              htmlFor="enabled"
              className="ml-2 block text-sm text-gray-300"
            >
              Enable automation immediately
            </label>
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
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Automations;
