import createDataProvider from "@refinedev/graphql";
import { client } from "../graphql/client";

export const dataProviderGraphql = createDataProvider(client, {
  getList: {
    dataMapper: (response, params) => {
      const resource = params.resource;
      const operationName = `all${resource[0].toUpperCase()}${resource.slice(1)}`;
      return response.data?.[operationName].nodes;
    },
  },
});
