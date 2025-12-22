
"use client"; 

import axios from "axios";
import { getAccessToken } from "./storage";

const API_URL = "https://ecommerce-inventory.thegallerygen.com/api/";

const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

const protectedApi = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

protectedApi.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const token = await getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional response interceptor
protectedApi.interceptors.response.use(
  (response) => {
    console.log("Response received:", response);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

// Function to get CSRF token from cookies (client-side only)
const getCsrfToken = () => {
  if (typeof window === "undefined") return "";

  const name = "XSRF-TOKEN=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(name)) return cookie.substring(name.length);
  }

  return "";
};

// Add CSRF token to public API requests
publicApi.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = csrfToken;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default {
  public: publicApi,
  protected: protectedApi,
};
