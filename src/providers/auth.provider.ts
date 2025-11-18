import type { AuthProvider } from "@refinedev/core";

import { getErrorMessage, requestAPI } from "#utils/index";

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
    } catch (error: unknown) {
      return {
        success: false,
        error: {
          message: "Login failed",
          name: getErrorMessage(error),
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
    } catch (error: unknown) {
      return {
        success: false,
        error: {
          message: "Register failed",
          name: getErrorMessage(error),
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
    } catch (error: unknown) {
      return {
        success: false,
        error: {
          message: "Update password failed",
          name: getErrorMessage(error),
        },
      };
    }
  },

  forgotPassword: async (params: unknown) => {
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
    } catch (error: unknown) {
      return {
        success: false,
        error: {
          message: "Forgot password failed",
          name: getErrorMessage(error),
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
    } catch (error: unknown) {
      return {
        logout: true,
        success: false,
        error: {
          message: "Logout failed",
          name: getErrorMessage(error),
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

    return {
      authenticated: true,
      redirectTo: "/",
    };
  },

  getPermissions: async () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    return user ? user.role : null;
  },

  getIdentity: async () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!user) {
      return null;
    }

    console.log("user", user);

    return {
      id: user.user.id,
      name: user.role,
    };
  },
};
