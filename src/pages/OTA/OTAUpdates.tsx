import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Smartphone,
} from "lucide-react";
import { apiService } from "../../services/apiService";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface OTAUpdate {
  id: string;
  deviceId: string;
  deviceName: string;
  version: string;
  currentVersion: string;
  releaseDate: Date;
  status: "available" | "pending" | "completed" | "failed";
  description: string;
}

const OTAUpdates: React.FC = () => {
  const { t } = useTranslation();
  const [updates, setUpdates] = useState<OTAUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [installingUpdates, setInstallingUpdates] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const data = await apiService.getOTAUpdates();
      setUpdates(data);
    } catch (error) {
      toast.error("Failed to fetch updates");
    } finally {
      setLoading(false);
    }
  };

  const handleInstallUpdate = async (updateId: string) => {
    setInstallingUpdates((prev) => new Set(prev).add(updateId));

    try {
      const updatedUpdate = await apiService.installUpdate(updateId);
      setUpdates(updates.map((u) => (u.id === updateId ? updatedUpdate : u)));
      toast.success("Update installed successfully");
    } catch (error) {
      toast.error("Failed to install update");
    } finally {
      setInstallingUpdates((prev) => {
        const newSet = new Set(prev);
        newSet.delete(updateId);
        return newSet;
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return Download;
      case "pending":
        return Clock;
      case "completed":
        return CheckCircle;
      case "failed":
        return XCircle;
      default:
        return Download;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-blue-600 bg-blue-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "completed":
        return "text-green-600 bg-green-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const availableUpdates = updates.filter((u) => u.status === "available");
  const updateHistory = updates.filter((u) => u.status !== "available");

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
            {t("ota.title")}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Manage over-the-air updates for your devices
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={fetchUpdates}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Check for Updates</span>
        </motion.button>
      </div>

      {/* Available Updates */}
      {availableUpdates.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-semibold text-white">
            {t("ota.availableUpdates")}
          </h2>
          <div className="space-y-4">
            <AnimatePresence>
              {availableUpdates.map((update) => {
                const StatusIcon = getStatusIcon(update.status);
                const isInstalling = installingUpdates.has(update.id);

                return (
                  <motion.div
                    key={update.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div
                            className={`p-2 rounded-lg flex-shrink-0 ${
                              update.status === "available"
                                ? "bg-blue-900"
                                : update.status === "pending"
                                ? "bg-yellow-900"
                                : update.status === "completed"
                                ? "bg-green-900"
                                : "bg-red-900"
                            }`}
                          >
                            <Smartphone className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-medium text-white truncate">
                              {update.deviceName}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {update.currentVersion} → {update.version}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-300 mb-2 break-words">
                            {update.description}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-gray-400">
                            <span>
                              {t("ota.releaseDate")}:{" "}
                              {format(
                                new Date(update.releaseDate),
                                "MMM d, yyyy"
                              )}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium self-start ${
                                update.status === "available"
                                  ? "bg-blue-900 text-blue-300"
                                  : update.status === "pending"
                                  ? "bg-yellow-900 text-yellow-300"
                                  : update.status === "completed"
                                  ? "bg-green-900 text-green-300"
                                  : "bg-red-900 text-red-300"
                              }`}
                            >
                              {t(`ota.${update.status}`)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="ml-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleInstallUpdate(update.id)}
                          disabled={isInstalling}
                          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isInstalling ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              />
                              <span>Installing...</span>
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4" />
                              <span>{t("ota.install")}</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Update History */}
      {updateHistory.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-semibold text-white">
            {t("ota.updateHistory")}
          </h2>
          <div className="space-y-4">
            {updateHistory.map((update) => {
              const StatusIcon = getStatusIcon(update.status);

              return (
                <div
                  key={update.id}
                  className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg flex-shrink-0 ${
                          update.status === "available"
                            ? "bg-blue-900"
                            : update.status === "pending"
                            ? "bg-yellow-900"
                            : update.status === "completed"
                            ? "bg-green-900"
                            : "bg-red-900"
                        }`}
                      >
                        <StatusIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-medium text-white">
                          {update.deviceName}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Updated to {update.version} on{" "}
                          {format(new Date(update.releaseDate), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium self-start sm:self-center ${
                        update.status === "available"
                          ? "bg-blue-900 text-blue-300"
                          : update.status === "pending"
                          ? "bg-yellow-900 text-yellow-300"
                          : update.status === "completed"
                          ? "bg-green-900 text-green-300"
                          : "bg-red-900 text-red-300"
                      }`}
                    >
                      {t(`ota.${update.status}`)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {updates.length === 0 && (
        <div className="text-center py-12">
          <Download className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            All devices are up to date
          </h3>
          <p className="text-gray-400 mb-6">
            Your devices are running the latest firmware versions
          </p>
          <button
            onClick={fetchUpdates}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Check for Updates</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default OTAUpdates;
