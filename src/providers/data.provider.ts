import type {
  DataProvider,
  GetOneParams,
  GetOneResponse,
  BaseRecord,
  CreateParams,
  CreateResponse,
} from "@refinedev/core";

import { getErrorMessage, requestAPI } from "#utils/index";

export const dataProvider: DataProvider = {
  getOne: async <TData extends BaseRecord = BaseRecord>({
    resource,
    id,
  }: GetOneParams): Promise<GetOneResponse<TData>> => {
    try {
      const {
        data: { data },
      } = await requestAPI("GET", `/${resource}${id ? `/${id}` : ""}`);

      console.log("getOne data:", data);

      return {
        data: data as TData,
      };
    } catch (error: unknown) {
      const err = new Error(getErrorMessage(error));
      err.name = "Data Fetch Error";
      throw err;
    }
  },

  getList: async ({ resource, filters }) => {
    try {
      const params: string[] = [];
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
    } catch (error: unknown) {
      const err = new Error(getErrorMessage(error));
      err.name = "Data Fetch Error";
      throw err;
    }
  },

  create: async <TData extends BaseRecord = BaseRecord, TVariables = unknown>({
    resource,
    variables,
  }: CreateParams<TVariables>): Promise<CreateResponse<TData>> => {
    try {
      const { data } = await requestAPI("POST", `/${resource}`, variables);

      return {
        data: data.data,
      } as CreateResponse<TData>;
    } catch (error: unknown) {
      const err = new Error(getErrorMessage(error));
      err.name = "Data Fetch Error";
      throw err;
    }
  },

  update: async ({
    resource,
    id,
    variables,
  }: {
    resource: string;
    id: unknown;
    variables: unknown;
  }) => {
    try {
      const { data } = await requestAPI("PATCH", `/${resource}/${id}`, variables);

      return {
        data: data.data,
      };
    } catch (error: unknown) {
      const err = new Error(getErrorMessage(error));
      err.name = "Data Fetch Error";
      throw err;
    }
  },

  deleteOne: async ({ resource, id }: { resource: string; id: unknown }) => {
    try {
      const { data } = await requestAPI("DELETE", `/${resource}/${id}`);

      return {
        data: data.data,
      };
    } catch (error: unknown) {
      const err = new Error(getErrorMessage(error));
      err.name = "Data Fetch Error";
      throw err;
    }
  },

  getApiUrl: () => {
    return import.meta.env.VITE_API_BASE_URL;
  },
};
