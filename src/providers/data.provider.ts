import type { DataProvider } from "@refinedev/core";

import { requestAPI } from "#utils/index";

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id }) => {
    try {
      const {
        data: { data },
      } = await requestAPI("GET", `/${resource}${id ? `/${id}` : ""}`);

      console.log("getOne data:", data);

      return {
        data: {} as any,
        error: {
          name: "Data Fetch Error",
          message: `Failed to fetch ${resource} with ID ${id}`,
        },
      };
    } catch (error: any) {
      return {
        data: {} as any,
        error: {
          name: "Data Fetch Error",
          message: `Failed to fetch ${resource} with ID ${id}: ${
            error?.response?.data?.message ?? ""
          }`,
        },
      };
    }
  },

  getList: async ({ resource, filters }) => {
    try {
      const params: any = [];
      if (filters) {
        filters.forEach((filter) => {
          if ("field" in filter) {
            params.push(`${filter.field}=${filter.value}`);
          }
        });
      }
      const query = params.length ? `?${params.join("&")}` : "";
      const { data } = await requestAPI("GET", `/${resource}${query}`);

      return {
        data: data.data,
        total: data.data.length,
      };
    } catch (error: any) {
      return {
        data: [],
        total: 0,
        error: {
          name: "Data Fetch Error",
          message: `Failed to fetch ${resource}: ${error?.response?.data?.message ?? ""}`,
        },
      };
    }
  },

  create: async ({
    resource,
    variables,
    meta,
  }: {
    resource: string;
    variables: any;
    meta?: any;
  }) => {
    try {
      const headers = meta?.headers ?? {};
      const { data } = await requestAPI("POST", `/${resource}`, variables, {
        headers,
      });

      data.data && localStorage.setItem("romulus-user-profile", JSON.stringify(data.data));

      return {
        data: data.data,
      };
    } catch (error: any) {
      return {
        data: {} as any,
        error: {
          name: "Data Creation Error",
          message: `Failed to create ${resource}: ${error?.response?.data?.message ?? ""}`,
        },
      };
    }
  },

  update: async ({
    resource,
    id,
    variables,
    meta,
  }: {
    resource: string;
    id: any;
    variables: any;
    meta?: any;
  }) => {
    try {
      const { data } = await requestAPI("PATCH", `/${resource}/${id}`, variables, meta);

      return {
        data: data.data,
      };
    } catch (error: any) {
      return {
        data: {} as any,
        error: {
          name: "Data Update Error",
          message: `Failed to update ${resource} with ID ${id}: ${
            error?.response?.data?.message ?? ""
          }`,
        },
      };
    }
  },

  deleteOne: async ({ resource, id }: { resource: string; id: any }) => {
    try {
      const { data } = await requestAPI("DELETE", `/${resource}/${id}`);

      return {
        data: data.data,
      };
    } catch (error: any) {
      return {
        data: {} as any,
        error: {
          name: "Data Deletion Error",
          message: `Failed to delete ${resource} with ID ${id}: ${
            error?.response?.data?.message ?? ""
          }`,
        },
      };
    }
  },

  custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
    try {
      const { data } = await requestAPI(method, url, payload, {
        params: {
          filters,
          sorters,
          query,
        },
        headers,
      });

      return {
        data: data.data,
      };
    } catch (error: any) {
      return {
        data: {} as any,
        error: {
          name: "Custom Request Error",
          message: `Failed to perform custom request to ${url}: ${
            error?.response?.data?.message ?? ""
          }`,
        },
      };
    }
  },

  getApiUrl: () => {
    return import.meta.env.VITE_API_BASE_URL;
  },
};
