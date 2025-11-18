import axios, { Method } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Create optimized axios instance
const httpClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const requestAPI = (method: Method, url: string, data?: unknown) => {
  return httpClient.request({
    method,
    url,
    data,
  });
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;

  if (typeof error === "object" && error !== null) {
    if ("response" in error) {
      const maybeResponse = error.response;
      if (typeof maybeResponse === "object" && maybeResponse !== null && "data" in maybeResponse) {
        const maybeData = maybeResponse.data;
        if (typeof maybeData === "object" && maybeData !== null && "message" in maybeData) {
          const maybeMessage = maybeData.message;
          if (typeof maybeMessage === "string") {
            return maybeMessage;
          }
        }
      }
    }
  }

  return "Unknown error";
};
