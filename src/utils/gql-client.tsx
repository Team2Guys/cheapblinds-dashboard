import { Client, fetchExchange } from "@urql/core";

export const gqlClient = new Client({
  url: `${import.meta.env.VITE_API_BASE_URL}/graphql`,
  exchanges: [fetchExchange],
});
