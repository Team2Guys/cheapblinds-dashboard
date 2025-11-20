import type { AuthProvider } from "@refinedev/core";
import { client } from "../graphql/client";
import { SIGNIN, SIGNUP, SIGNOUT } from "../graphql/mutations";
import { getErrorMessage } from "#utils/index";

export const authProviderGraphql: AuthProvider = {
  register: async ({ email, password, role }) => {
    try {
      const result = await client
        .mutation(SIGNUP, { input: { email, password, role } })
        .toPromise();

      if (result.error) throw result.error;

      return { success: true, redirectTo: "/login" };
    } catch (error: unknown) {
      const err = new Error(getErrorMessage(error));
      err.name = "Registration Failed";
      throw err;
    }
  },

  login: async ({ email, password, role }) => {
    try {
      const result = await client
        .mutation(SIGNIN, { input: { email, password, role } })
        .toPromise();

      if (result.error) throw result.error;

      const user = result.data?.signin?.data;
      localStorage.setItem("user", JSON.stringify(user));

      return { success: true, redirectTo: "/", data: user };
    } catch (error: unknown) {
      const err = new Error(getErrorMessage(error));
      err.name = "Login Failed";
      throw err;
    }
  },

  logout: async () => {
    try {
      const result = await client.mutation(SIGNOUT, {}).toPromise();
      if (result.error) throw result.error;

      localStorage.clear();
      return { success: true, redirectTo: "/login" };
    } catch {
      return { success: false };
    }
  },

  check: async () => {
    const user = localStorage.getItem("user");
    return user ? { authenticated: true } : { authenticated: false, redirectTo: "/login" };
  },

  getPermissions: async () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr).role : null;
  },

  getIdentity: async () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  onError: async (error) => {
    console.error("Auth error:", error);
    return { error };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  forgotPassword: async (_params) => {
    console.warn("forgotPassword not implemented");
    return { success: false };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updatePassword: async (_params) => {
    console.warn("updatePassword not implemented");
    return { success: false };
  },
};
