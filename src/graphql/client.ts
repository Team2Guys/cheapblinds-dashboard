import { createClient, cacheExchange, fetchExchange } from "urql";

export const client = createClient({
  url: `${import.meta.env.VITE_API_BASE_URL}/graphql`,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    credentials: "include", // important if you use cookies
  },
});
