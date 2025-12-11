import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { LocalStorageKeys } from '@/modules/shared';
import { env } from '@/config/env';

// Create axios instance
const baseApi: AxiosInstance = axios.create({
  baseURL: env.API_URL || 'http://localhost:3000', // Default to localhost if no env variable
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
baseApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage or your auth state management
    const token = localStorage.getItem(LocalStorageKeys.TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
baseApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401: // Unauthorized
          // Handle unauthorized access (e.g., logout user, redirect to login)
          localStorage.removeItem(LocalStorageKeys.TOKEN);
          // You might want to redirect to login or dispatch a logout action
          break;
        case 403: // Forbidden
          // Handle forbidden access
          break;
        case 404: // Not Found
          // Handle not found
          break;
        case 500: // Server Error
          // Handle server error
          break;
      }
    }

    return Promise.reject(error);
  }
);

export default baseApi;
