// authService.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/auth";

export const authService = {
 async login(email: string, password: string) {
  try {
    const res = await axios.post(`${API_BASE_URL}/login`, { email, password });
    const { token, api_key, user } = res.data;

    // Save JWT token
    localStorage.setItem("token", token);

    // Save API key
    if (api_key) {
      localStorage.setItem("userId", user.id);
      console.log("Saved User ID:", user.id); // ✅ log for verification
    } else {
      console.warn("User ID not returned from backend");
    }

    return { success: true, token, api_key, user };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || "Login failed",
    };
  }
},

  async signup(name: string, email: string, password: string) {
    try {
      const res = await axios.post(`${API_BASE_URL}/signup`, {
        name,
        email,
        password,
      });
      return { success: true, message: res.data.message };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed",
      };
    }
  },

  async forgotPassword(email: string) {
    try {
      const res = await axios.post(`${API_BASE_URL}/request-reset`, { email });
      return { success: true, message: res.data.message };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || "Password reset request failed",
      };
    }
  },

  async resetPassword(token: string, password: string) {
    try {
      const res = await axios.post(`${API_BASE_URL}/reset-password`, {
        token,
        password,
      });
      return { success: true, message: res.data.message };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || "Password reset failed",
      };
    }
  },

  async verifyEmail(token: string) {
    try {
      const res = await axios.get(`${API_BASE_URL}/verify/${token}`);
      return { success: true, message: res.data.message };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || "Email verification failed",
      };
    }
  },

  async getCurrentUser() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const res = await axios.get(`${API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.user;
    } catch {
      return null;
    }
  },
};
