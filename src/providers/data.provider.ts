import { DataProvider } from "@refinedev/core";
import { gqlClient } from "#utils/gql-client";

export const dataProvider: DataProvider = {
  getList: async ({ resource, meta }) => {
    if (!meta?.gqlQuery) {
      throw new Error(`gqlQuery is required in meta for resource ${resource}`);
    }

    const { data } = await gqlClient.query(meta.gqlQuery, meta.variables || {}).toPromise();

    return {
      data: data[meta.operationName],
      total: data.length,
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getOne: async ({ resource, id, meta }) => {
    if (!meta?.gqlQuery) {
      throw new Error(`gqlQuery is required in meta for resource ${resource}`);
    }

    const { data } = await gqlClient.query(meta.gqlQuery, meta.variables || {}).toPromise();

    return {
      data: data[meta.operationName],
    };
  },

  create: async ({ resource, variables, meta }) => {
    if (!meta?.gqlMutation) {
      throw new Error(`gqlMutation is required in meta for resource ${resource}`);
    }

    const { data } = await gqlClient.mutation(meta.gqlMutation, { input: variables }).toPromise();

    return {
      data: data[meta.operationName],
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    if (!meta?.gqlMutation) {
      throw new Error(`gqlMutation is required in meta for resource ${resource}`);
    }

    const { data } = await gqlClient
      .mutation(meta.gqlMutation, { id, input: variables })
      .toPromise();

    return {
      data: data[meta.operationName],
    };
  },

  deleteOne: async ({ resource, id, meta }) => {
    if (!meta?.gqlMutation) {
      throw new Error(`gqlMutation is required in meta for resource ${resource}`);
    }

    const { data } = await gqlClient.mutation(meta.gqlMutation, { id }).toPromise();

    return {
      data: data[meta.operationName],
    };
  },

  getApiUrl: () => "",
};
