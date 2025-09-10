import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Smartphone,
  Zap,
  Activity,
  TrendingUp,
  Lightbulb,
  Play,
  AlertTriangle,
  Download,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { apiService } from "../../services/apiService";
import { format } from "date-fns";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await apiService.getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

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

  const stats = [
    {
      name: t("dashboard.totalDevices"),
      value: analytics?.totalDevices || 0,
      icon: Smartphone,
      color: "bg-primary-500",
      change: "+12%",
    },
    {
      name: t("dashboard.activeDevices"),
      value: analytics?.activeDevices || 0,
      icon: Activity,
      color: "bg-primary-500",
      change: "+5%",
    },
    {
      name: t("dashboard.energyUsage"),
      value: `${analytics?.energyUsage || 0} kWh`,
      icon: Zap,
      color: "bg-primary-500",
      change: "-3%",
    },
    {
      name: t("dashboard.automationsRunning"),
      value: analytics?.automationsRunning || 0,
      icon: TrendingUp,
      color: "bg-primary-500",
      change: "+8%",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "device":
        return Lightbulb;
      case "automation":
        return Play;
      case "alert":
        return AlertTriangle;
      case "update":
        return Download;
      default:
        return Activity;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          {t("dashboard.title")}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base">
          {t("dashboard.welcomeBack")}, have a great day!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs sm:text-sm text-gray-400 mb-1 truncate">
                  {stat.name}
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  {stat.value}
                </p>
                <p
                  className={`text-sm font-medium ${
                    stat.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
              <div
                className={`${stat.color} p-2 sm:p-3 rounded-xl flex-shrink-0`}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Device Status Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800"
        >
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
            {t("dashboard.deviceStatus")}
          </h3>
          <div className="h-40 sm:h-48 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics?.deviceStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {analytics?.deviceStatusData?.map(
                    (entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    )
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Energy Consumption Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800"
        >
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
            {t("dashboard.energyConsumption")}
          </h3>
          <div className="h-40 sm:h-48 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analytics?.energyData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" fontSize={10} tick={{ fill: "#9CA3AF" }} />
                <YAxis fontSize={10} tick={{ fill: "#9CA3AF" }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800"
      >
        <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
          {t("dashboard.recentActivity")}
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {analytics?.recentActivity?.map((activity: any) => {
            const IconComponent = getActivityIcon(activity.type);
            return (
              <div
                key={activity.id}
                className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div
                  className={`p-2 rounded-lg ${
                    activity.type === "device"
                      ? "bg-blue-900"
                      : activity.type === "automation"
                      ? "bg-green-900"
                      : activity.type === "alert"
                      ? "bg-orange-900"
                      : "bg-purple-900"
                  } flex-shrink-0`}
                >
                  <IconComponent
                    className={`h-4 w-4 ${
                      activity.type === "device"
                        ? "text-blue-600"
                        : activity.type === "automation"
                        ? "text-green-600"
                        : activity.type === "alert"
                        ? "text-orange-600"
                        : "text-purple-600"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-400">
                    {format(new Date(activity.time), "MMM d, h:mm a")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
