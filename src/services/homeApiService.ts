import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/devices";

const getToken = (): string => localStorage.getItem("token") || "";
const getUserId = (): string => localStorage.getItem("userId") || "";

const getAuthHeaders = () => ({
  "Authorization": `Bearer ${getToken()}`,
  "x-user-id": getUserId(), // optional, still useful for queries
});

export const homeApiService = {
  async registerDevice(device: { name: string; type: string; status?: string }) {
    try {
      const res = await axios.post(`${API_BASE_URL}/register`, device, {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Device registration failed");
    }
  },

  async getDevices() {
    try {
      const res = await axios.get(API_BASE_URL, {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Failed to fetch devices");
    }
  },

  async updateDevice(deviceId: string, updates: Record<string, any>) {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/update`,
        { device_uid: deviceId, ...updates },
        { headers: getAuthHeaders() }
      );
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Device update failed");
    }
  },

   async editDevice(deviceUid: string, payload: { device_name?: string; status?: string }) {
    const res = await axios.put(`${API_BASE_URL}/edit`, { device_uid: deviceUid, ...payload }, { headers: getAuthHeaders() });
    return res.data;
  },

// homeApiService.ts
async deleteDevice(deviceId: string) {
  try {
    const res = await axios.delete(`${API_BASE_URL}/delete`, {
      headers: getAuthHeaders(),
      data: { device_uid: deviceId }, // <- must be in `data` for DELETE request
    });
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Failed to delete device");
  }
}
,
  async markDeviceOnline(deviceId: string) {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/online`,
        { device_uid: deviceId },
        { headers: getAuthHeaders() }
      );
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Failed to mark device online");
    }
  },
};

// Optional config export
export const esp32ApiConfig = {
  baseUrl: API_BASE_URL,
  statusUpdate: "/online",
  register: "/register",
  update: "/update",
  delete: "/delete",
  edit: "/edit",
};
