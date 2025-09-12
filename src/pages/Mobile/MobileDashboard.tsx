import React, { useEffect, useState } from "react";
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
  Wifi,
  WifiOff,
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
import { format, differenceInSeconds } from "date-fns";

const MobileDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsData, devicesData] = await Promise.all([
          apiService.getAnalytics(),
          apiService.getDevices()
        ]);
        setAnalytics(analyticsData);
        setDevices(devicesData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

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

  const onlineDevices = devices.filter(device => 
    device.last_seen && differenceInSeconds(new Date(), new Date(device.last_seen)) <= 60
  );

  const stats = [
    {
      name: "Total Devices",
      value: devices.length,
      icon: Smartphone,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      name: "Online Devices",
      value: onlineDevices.length,
      icon: Activity,
      color: "bg-green-500",
      change: "+5%",
    },
    {
      name: "Energy Usage",
      value: `${analytics?.energyUsage || 0} kWh`,
      icon: Zap,
      color: "bg-yellow-500",
      change: "-3%",
    },
    {
      name: "Automations",
      value: analytics?.automationsRunning || 0,
      icon: TrendingUp,
      color: "bg-purple-500",
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
    <div className="space-y-6 pb-20">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl p-6 mx-4 mt-4">
        <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
        <p className="text-primary-100">
          {onlineDevices.length} of {devices.length} devices are online
        </p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Wifi className="h-5 w-5" />
            <span className="text-sm">Connected</span>
          </div>
          <div className="text-2xl font-bold">
            {devices.length > 0 ? Math.round((onlineDevices.length / devices.length) * 100) : 0}%
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`${stat.color} p-2 rounded-xl`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.change.startsWith("+")
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 truncate">{stat.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Device Status Chart */}
      <div className="mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Status</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Online', value: onlineDevices.length, color: '#10B981' },
                    { name: 'Offline', value: devices.length - onlineDevices.length, color: '#EF4444' }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {[
                    { name: 'Online', value: onlineDevices.length, color: '#10B981' },
                    { name: 'Offline', value: devices.length - onlineDevices.length, color: '#EF4444' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Energy Consumption Chart */}
      <div className="mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Consumption</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analytics?.energyData || []}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" fontSize={10} tick={{ fill: "#6B7280" }} />
                <YAxis fontSize={10} tick={{ fill: "#6B7280" }} />
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
      <div className="mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {analytics?.recentActivity?.slice(0, 5).map((activity: any) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activity.type === "device"
                        ? "bg-blue-100 text-blue-600"
                        : activity.type === "automation"
                        ? "bg-green-100 text-green-600"
                        : activity.type === "alert"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(activity.time), "MMM d, h:mm a")}
                    </p>
                  </div>
                </div>
              );
            }) || (
              <div className="text-center py-8 text-gray-500">
                <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No recent activity</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileDashboard;