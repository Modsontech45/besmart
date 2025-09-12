import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Play, AlertTriangle, RefreshCw, Eye, Wifi, WifiOff, Zap, SwordIcon as Record } from "lucide-react";
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

const MobileVisionAI: React.FC = () => {
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
  const motionAlerts = cameras.filter(
    (c) => c.motionDetected && c.status === "online"
  );

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
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl p-6 mx-4 mt-4">
        <h2 className="text-2xl font-bold mb-2">Vision AI</h2>
        <p className="text-indigo-100">
          {onlineCameras.length} cameras online • {motionAlerts.length} motion alerts
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 px-4">
        <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 text-center">
          <div className="bg-blue-100 p-3 rounded-xl mx-auto w-fit mb-3">
            <Camera className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{cameras.length}</p>
          <p className="text-sm text-gray-500">Cameras</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 text-center">
          <div className="bg-orange-100 p-3 rounded-xl mx-auto w-fit mb-3">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{motionAlerts.length}</p>
          <p className="text-sm text-gray-500">Alerts</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 text-center">
          <div className="bg-purple-100 p-3 rounded-xl mx-auto w-fit mb-3">
            <Zap className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">5</p>
          <p className="text-sm text-gray-500">Rules</p>
        </div>
      </div>

      {/* Motion Alerts */}
      {motionAlerts.length > 0 && (
        <div className="px-4">
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-orange-900">Motion Detected</h3>
            </div>
            <div className="space-y-3">
              {motionAlerts.map((camera) => (
                <div key={`alert-${camera.id}`} className="flex items-center justify-between bg-white rounded-xl p-3">
                  <div>
                    <p className="font-medium text-gray-900">{camera.name}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(camera.lastMotion), "h:mm a")}
                    </p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    View Live
                  </motion.button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Camera Grid */}
      <div className="px-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Live Cameras</h3>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={fetchCameras}
            className="p-2 bg-gray-100 rounded-lg"
          >
            <RefreshCw className="h-5 w-5 text-gray-600" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-4">
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
                  className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
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
                        <Camera className="h-16 w-16 text-gray-600" />
                      </div>
                    )}

                    {/* Status indicator */}
                    <div
                      className={`absolute top-3 right-3 flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                        isOnline
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
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
                        className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
                      >
                        <Record className="h-3 w-3" />
                        <span>Motion</span>
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
                      <h4 className="font-semibold text-gray-900">{camera.name}</h4>
                      <span
                        className={`w-3 h-3 rounded-full ${
                          isOnline ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        disabled={!isOnline}
                        className="flex items-center justify-center space-x-2 bg-primary-600 text-white py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Live</span>
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCaptureSnapshot(camera.id)}
                        disabled={!isOnline || isCapturing}
                        className="flex items-center justify-center space-x-2 border border-primary-600 text-primary-600 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Camera className="h-4 w-4" />
                        <span>
                          {isCapturing ? "Capturing..." : "Snapshot"}
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
        <div className="text-center py-12 px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Cameras Configured
            </h3>
            <p className="text-gray-500 mb-6">
              Add cameras to start monitoring your home with AI-powered vision
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium"
            >
              <Camera className="h-5 w-5" />
              <span>Add Camera</span>
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileVisionAI;