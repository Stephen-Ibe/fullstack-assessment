import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 404) {
      return Promise.reject({
        message:
          (error.response.data as { message?: string })?.message ||
          "Resource not found",
      });
    }
    return Promise.reject(error?.response?.data || error.message);
  }
);

export default instance;
