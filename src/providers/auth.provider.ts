import type { AuthProvider } from "@refinedev/core";
import { SIGNIN_MUTATION, SIGNUP_MUTATION, SIGNOUT_MUTATION } from "../graphql/mutations";
import { gqlClient } from "#utils/index";

export const authProvider: AuthProvider = {
  register: async ({ email, password, role }) => {
    const { error } = await gqlClient
      .mutation(SIGNUP_MUTATION, { input: { email, password, role } })
      .toPromise();

    if (error) throw error;

    return { success: true, redirectTo: "/login" };
  },

  login: async ({ email, password, role }) => {
    const { data, error } = await gqlClient
      .mutation(SIGNIN_MUTATION, { input: { email, password, role } })
      .toPromise();

    if (error) throw error;

    const { signin: user } = data;
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true, redirectTo: "/", data: user };
  },

  logout: async () => {
    const { error } = await gqlClient.mutation(SIGNOUT_MUTATION, {}).toPromise();
    if (error) throw error;

    localStorage.clear();
    return { success: true, redirectTo: "/login" };
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
