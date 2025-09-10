// homeApiService.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/devices";

export const homeApiService = {
  async registerDevice(device: { name: string; type: string }) {
    try {
      const res = await axios.post(`${API_BASE_URL}/register`, device);
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Device registration failed");
    }
  },

  async getDevices() {
    try {
      const res = await axios.get(API_BASE_URL);
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to fetch devices");
    }
  },

  async updateDevice(deviceId: string, updates: any) {
    try {
      const res = await axios.put(`${API_BASE_URL}/update`, {
        id: deviceId,
        ...updates,
      });
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Device update failed");
    }
  },

  async deleteDevice(deviceId: string) {
    try {
      const res = await axios.delete(`${API_BASE_URL}/delete`, {
        data: { id: deviceId },
      });
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Device deletion failed");
    }
  },

  async markDeviceOnline(deviceId: string) {
    try {
      const res = await axios.post(`${API_BASE_URL}/online`, { id: deviceId });
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to mark device online");
    }
  },
};
