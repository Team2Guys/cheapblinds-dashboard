import { jwtDecode } from "jwt-decode";
import type { AuthProvider } from "@refinedev/core";

import { requestAPI } from "#utils/index";

export const authProvider: AuthProvider = {
  login: async (params) => {
    try {
      const {
        data: { data },
      } = await requestAPI("POST", "/auth/signin", params);

      localStorage.setItem("user", JSON.stringify(data));

      return {
        success: true,
        redirectTo: "/",
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Login failed",
          name: error.response.data.message || error.message,
        },
      };
    }
  },

  register: async (params) => {
    try {
      const { data } = await requestAPI("POST", "/auth/signup", params);

      return {
        data: data.data,
        success: true,
        successNotification: {
          message: data.message || "Registration successful",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: "Register failed",
          name: error?.response?.data?.message,
        },
      };
    }
  },

  updatePassword: async (params) => {
    try {
      const { data } = await requestAPI("PATCH", "/auth/update-password", params);

      return {
        data: data.data,
        success: true,
        successNotification: {
          message: data.message || "Password updated successfully",
          description: "Your password has been changed.",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: "Update password failed",
          name: error.response.data.message || error.message,
        },
      };
    }
  },

  forgotPassword: async (params: any) => {
    try {
      const { data } = await requestAPI("POST", "/auth/forgot-password", params);

      return {
        data: data.data,
        success: true,
        successNotification: {
          message: data.message || "Forgot password successful",
          description: "Please check your email for further instructions.",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: "Forgot password failed",
          name: error?.response?.data?.message,
        },
      };
    }
  },

  logout: async () => {
    try {
      requestAPI("POST", "/auth/signout");
      localStorage.clear();

      return {
        success: true,
        redirectTo: "/login",
      };
    } catch (error: any) {
      return {
        logout: true,
        success: false,
        error: {
          message: "Logout failed",
          name: error?.response?.data?.message || error.message,
        },
      };
    }
  },

  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },

  check: async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      return { authenticated: false, redirectTo: "/login" };
    }

    console.log("Auth Check - User:", user);

    return {
      authenticated: true,
      redirectTo: "/",
    };
  },

  getPermissions: async () => null,

  getIdentity: async () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!user) {
      return null;
    }

    return {
      id: user.user._id,
      name: user.firstName + " " + user.lastName,
      avatar: user.avatar || "",
    };
  },
};
