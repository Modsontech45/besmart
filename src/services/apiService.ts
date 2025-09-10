// apiService.ts
import { homeApiService } from "./homeApiService";

export const apiService = {
  // DEVICE OPERATIONS
  async getDevices() {
    return homeApiService.getDevices();
  },

  async addDevice(device: { name: string; type: string }) {
    return homeApiService.registerDevice(device);
  },

  async updateDevice(id: string, updates: any) {
    return homeApiService.updateDevice(id, updates);
  },

  async deleteDevice(id: string) {
    return homeApiService.deleteDevice(id);
  },
  async editDevice(deviceUid: string, payload: { device_name?: string; status?: "online" | "offline" }) {
    return homeApiService.editDevice(deviceUid, payload);
  },



  async markOnline(id: string) {
    return homeApiService.markDeviceOnline(id);
  },

  // PLACEHOLDERS (until backend provides endpoints)
  async getAutomations() {
    return [];
  },

  async addAutomation(_: any) {
    return { success: false, message: "Not implemented yet" };
  },

  async getOTAUpdates() {
    return [];
  },

  async installUpdate(_: string) {
    return { success: false, message: "Not implemented yet" };
  },

  async getCameras() {
    return [];
  },

  async captureSnapshot(_: string) {
    return { success: false, message: "Not implemented yet" };
  },

  async getAnalytics() {
    return { totalDevices: 0, activeDevices: 0, energyUsage: 0 };
  },
};
