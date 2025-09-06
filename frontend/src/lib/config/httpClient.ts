import type { AxiosRequestConfig } from "axios";
import instance from "./axios";

export default class Client {
  static async get<T>(url: string, options?: AxiosRequestConfig<unknown>) {
    const response = await instance.get<T>(url, options);
    return response.data;
  }

  static async post<T>(
    url: string,
    data?: unknown,
    options?: AxiosRequestConfig<unknown>
  ) {
    const response = await instance.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data?: unknown) {
    const response = await instance.put<T>(url, data);
    return response.data;
  }

  static async patch<T>(
    url: string,
    data?: unknown,
    options?: AxiosRequestConfig<unknown>
  ) {
    const response = await instance.patch<T>(url, data, options);
    return response.data;
  }

  static async delete<T>(url: string, options?: AxiosRequestConfig<unknown>) {
    const response = await instance.delete<T>(url, options);
    return response.data;
  }
}
