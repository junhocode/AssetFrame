import axios, { type AxiosRequestConfig } from "axios";
import { BASE_URL } from "./url.api";

interface RequestProps {
  url: string;
  method?: "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
  errorMessage?: string;
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

const fetcher = {
  async request<T = any>({
    url,
    method = "GET",
    body,
    headers,
    params,
    errorMessage,
  }: RequestProps): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        url,
        method,
        headers,
        data: body,
        params,
      };

      const api = axios.create({
        baseURL: BASE_URL,
        withCredentials: true,
      });

      const response = await api(config);
      return response.data as T;
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        errorMessage ||
        "API 요청 중 오류가 발생했습니다.";
      throw new Error(errorMsg);
    }
  },

  get<T = any>(props: Omit<RequestProps, "method" | "body">) {
    return this.request<T>({ ...props, method: "GET" });
  },
  post<T = any>(props: Omit<RequestProps, "method">) {
    return this.request<T>({ ...props, method: "POST" });
  },
  delete<T = any>(props: Omit<RequestProps, "method">) {
    return this.request<T>({ ...props, method: "DELETE" });
  },
  patch<T = any>(props: Omit<RequestProps, "method">) {
    return this.request<T>({ ...props, method: "PATCH" });
  },
  put<T = any>(props: Omit<RequestProps, "method">) {
    return this.request<T>({ ...props, method: "PUT" });
  },
};

export default fetcher;
