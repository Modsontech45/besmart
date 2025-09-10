import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Play,
  Square,
  AlertTriangle,
  RefreshCw,
  Eye,
  Wifi,
  WifiOff,
  Zap,
} from "lucide-react";
import { apiService } from "../../services/apiService";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface Camera {
  id: string;
  name: string;
  status: "online" | "offline";
  lastSnapshot: string;
  motionDetected: boolean;
  lastMotion: Date;
}

const VisionAI: React.FC = () => {
  const { t } = useTranslation();
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);
  const [capturingSnapshots, setCapturingSnapshots] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    fetchCameras();
  }, []);

  const fetchCameras = async () => {
    try {
      const data = await apiService.getCameras();
      setCameras(data);
    } catch (error) {
      toast.error("Failed to fetch cameras");
    } finally {
      setLoading(false);
    }
  };

  const handleCaptureSnapshot = async (cameraId: string) => {
    setCapturingSnapshots((prev) => new Set(prev).add(cameraId));

    try {
      const updatedCamera = await apiService.captureSnapshot(cameraId);
      setCameras(cameras.map((c) => (c.id === cameraId ? updatedCamera : c)));
      toast.success("Snapshot captured successfully");
    } catch (error) {
      toast.error("Failed to capture snapshot");
    } finally {
      setCapturingSnapshots((prev) => {
        const newSet = new Set(prev);
        newSet.delete(cameraId);
        return newSet;
      });
    }
  };

  const onlineCameras = cameras.filter((c) => c.status === "online");
  const offlineCameras = cameras.filter((c) => c.status === "offline");
  const motionAlerts = cameras.filter(
    (c) => c.motionDetected && c.status === "online"
  );

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
            {t("vision.title")}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Monitor and manage your security cameras with AI
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={fetchCameras}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>{t("common.refresh")}</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-400 mb-1">
                {t("vision.cameras")}
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                {cameras.length}
              </p>
              <p className="text-sm text-green-400">
                {onlineCameras.length} online
              </p>
            </div>
            <div className="bg-blue-500 p-2 sm:p-3 rounded-xl flex-shrink-0">
              <Camera className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-400 mb-1">
                {t("vision.motionAlerts")}
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                {motionAlerts.length}
              </p>
              <p className="text-sm text-orange-400">Active alerts</p>
            </div>
            <div className="bg-orange-500 p-2 sm:p-3 rounded-xl flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-400 mb-1">
                {t("vision.cameraAutomations")}
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                5
              </p>
              <p className="text-sm text-purple-400">Active rules</p>
            </div>
            <div className="bg-purple-500 p-2 sm:p-3 rounded-xl flex-shrink-0">
              <Zap className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Motion Alerts */}
      {motionAlerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-semibold text-white flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span>{t("vision.motionAlerts")}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {motionAlerts.map((camera) => (
              <motion.div
                key={`alert-${camera.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900 rounded-xl shadow-lg p-4 border border-orange-800 bg-gradient-to-br from-orange-900/20 to-gray-900"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white truncate pr-2">
                    {camera.name}
                  </h3>
                  <span className="px-2 py-1 bg-orange-900 text-orange-300 text-xs font-medium rounded-full">
                    {t("vision.motionDetected")}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Last motion: {format(new Date(camera.lastMotion), "h:mm a")}
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button className="flex-1 bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700">
                    {t("vision.viewLive")}
                  </button>
                  <button
                    onClick={() => handleCaptureSnapshot(camera.id)}
                    disabled={capturingSnapshots.has(camera.id)}
                    className="flex-1 border border-orange-600 text-orange-400 px-3 py-1 rounded text-sm hover:bg-orange-900 disabled:opacity-50"
                  >
                    {capturingSnapshots.has(camera.id)
                      ? "Capturing..."
                      : "Snapshot"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Live Snapshots */}
      <div className="space-y-4">
        <h2 className="text-base sm:text-lg font-semibold text-white">
          {t("vision.snapshots")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <AnimatePresence>
            {cameras.map((camera) => {
              const isCapturing = capturingSnapshots.has(camera.id);
              const isOnline = camera.status === "online";

              return (
                <motion.div
                  key={camera.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-800"
                >
                  {/* Camera Image */}
                  <div className="relative aspect-video bg-gray-800">
                    {isOnline && camera.lastSnapshot ? (
                      <img
                        src={camera.lastSnapshot}
                        alt={camera.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera className="h-12 w-12 text-gray-600" />
                      </div>
                    )}

                    {/* Status indicator */}
                    <div
                      className={`absolute top-2 right-2 flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
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
                      <span>{isOnline ? "Live" : "Offline"}</span>
                    </div>

                    {/* Motion indicator */}
                    {camera.motionDetected && isOnline && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium"
                      >
                        Motion
                      </motion.div>
                    )}

                    {/* Loading overlay */}
                    {isCapturing && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Camera Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-white truncate pr-2">
                        {camera.name}
                      </h3>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isOnline ? "bg-green-500" : "bg-red-500"
                        } flex-shrink-0`}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center justify-center space-x-1 disabled:opacity-50"
                        disabled={!isOnline}
                      >
                        <Eye className="h-4 w-4" />
                        <span>{t("vision.viewLive")}</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCaptureSnapshot(camera.id)}
                        disabled={!isOnline || isCapturing}
                        className="flex-1 border border-blue-600 text-blue-600 px-3 py-2 rounded-lg text-sm hover:bg-blue-50 flex items-center justify-center space-x-1 disabled:opacity-50"
                      >
                        <Camera className="h-4 w-4" />
                        <span>
                          {isCapturing
                            ? "Capturing..."
                            : t("vision.captureSnapshot")}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Empty State */}
      {cameras.length === 0 && (
        <div className="text-center py-12">
          <Camera className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            No cameras configured
          </h3>
          <p className="text-gray-400 mb-6">
            Add cameras to start monitoring your home with AI-powered vision
          </p>
          <button className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Camera className="h-4 w-4" />
            <span>Add Camera</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default VisionAI;
