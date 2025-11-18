import axios, { Method } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Create optimized axios instance
const httpClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const requestAPI = (method: Method, url: string, data?: unknown) => {
  return httpClient.request({
    method,
    url,
    data,
  });
};
