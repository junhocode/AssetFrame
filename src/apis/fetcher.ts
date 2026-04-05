import axios, { type AxiosRequestConfig } from "axios";

interface RequestProps {
  url: string;
  method?: "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
  errorMessage?: string;
  body?: unknown;
  headers?: Record<string, string>;
  params?: object;
}

const api = axios.create({
  withCredentials: true
});

const fetcher = {
  async request<T = unknown>({
    url,
    method,
    body,
    headers,
    params,
    errorMessage,
  }: RequestProps): Promise<T> {
    try {
      const response = await api({
        url,
        method,
        headers,
        data: body,
        params,
      } satisfies AxiosRequestConfig);
      return response.data as T;
    } catch (error: unknown) {
      const errorMsg =
        (axios.isAxiosError(error) ? error.response?.data?.message : undefined)
        ?? errorMessage
        ?? "Error occurred during api process.";
      throw new Error(errorMsg);
    }
  },

  get<T = unknown>(props: Omit<RequestProps, "method" | "body">) {
    return this.request<T>({ ...props, method: "GET" });
  },
  post<T = unknown>(props: Omit<RequestProps, "method">) {
    return this.request<T>({ ...props, method: "POST" });
  },
  delete<T = unknown>(props: Omit<RequestProps, "method">) {
    return this.request<T>({ ...props, method: "DELETE" });
  },
  patch<T = unknown>(props: Omit<RequestProps, "method">) {
    return this.request<T>({ ...props, method: "PATCH" });
  },
  put<T = unknown>(props: Omit<RequestProps, "method">) {
    return this.request<T>({ ...props, method: "PUT" });
  },
};

export default fetcher;
