import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Play,
  Pause,
  Clock,
  Zap,
  Calendar,
  ChevronRight,
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

const MobileAutomations: React.FC = () => {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);

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
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl p-6 mx-4 mt-4">
        <h2 className="text-2xl font-bold mb-2">Automations</h2>
        <p className="text-purple-100">
          {automations.filter(a => a.enabled).length} of {automations.length} automations active
        </p>
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 bg-green-50 text-green-700 p-4 rounded-xl border border-green-200"
            >
              <Play className="h-5 w-5" />
              <span className="font-medium">Enable All</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 bg-gray-50 text-gray-700 p-4 rounded-xl border border-gray-200"
            >
              <Pause className="h-5 w-5" />
              <span className="font-medium">Disable All</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Automations List */}
      <div className="px-4 space-y-4">
        <AnimatePresence>
          {automations.map((automation) => (
            <motion.div
              key={automation.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {automation.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        automation.enabled
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {automation.enabled ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleAutomation(automation.id)}
                  className={`p-3 rounded-full transition-colors ${
                    automation.enabled
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {automation.enabled ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </motion.button>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                    <Zap className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Trigger</p>
                    <p className="text-sm text-gray-600">{automation.trigger}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <Play className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Action</p>
                    <p className="text-sm text-gray-600">{automation.action}</p>
                  </div>
                </div>

                {automation.lastRun && (
                  <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Last run: {format(new Date(automation.lastRun), "MMM d, h:mm a")}
                    </span>
                  </div>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 flex items-center justify-center space-x-2 bg-gray-50 text-gray-700 p-3 rounded-xl border border-gray-200"
              >
                <span className="font-medium">View Details</span>
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {automations.length === 0 && (
        <div className="text-center py-12 px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <Zap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Automations Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first automation to make your home smarter
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium"
            >
              <Plus className="h-5 w-5" />
              <span>Create Automation</span>
            </motion.button>
          </div>
        </div>
      )}

      {/* Floating Add Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg z-10"
      >
        <Plus className="h-6 w-6" />
      </motion.button>
    </div>
  );
};

export default MobileAutomations;