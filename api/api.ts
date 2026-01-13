import { useAuth } from "@/stores/useAuth";
import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export interface IPage {
  page: number,
  size: number,
}

export interface IDataResponse<T = unknown> {
  status?: string;
  message?: string;
  data: T;
}

export class ApiError extends Error {
  statusCode?: number;
  responseData?: unknown;
  originalError?: Error;

  constructor(message: string, statusCode?: number, responseData?: unknown, originalError?: Error) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.responseData = responseData;
    this.originalError = originalError;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

interface IRootApiOptions {
  withToken?: boolean;
  isFile?: boolean
}

async function rootApi<T = undefined>(
  config: AxiosRequestConfig,
  options?: IRootApiOptions,
): Promise<IDataResponse<T>> {
  const defaultOptions = {
    withToken: false,
    ...options,
  };

  const apiClient = axios.create({
    headers: {
      "Content-Type": options?.isFile ? "multipart/form-data" : "application/json",
    },
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
    timeout: 30000,
  });

  if (defaultOptions.withToken) {
    const user = useAuth.getState().user
    const initToken = user?.accessToken

    if (initToken) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${initToken}`;
    }
  }

  try {
    const response: AxiosResponse<IDataResponse<T>> = await apiClient.request({
      ...config,
    });

    if (response.data.status === "error") {
      throw new ApiError(
        response.data.message || 'Bad Request',
        400,
        response.data
      );
    }

    return response.data;
  } catch (error) {
    // Handle network errors

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<IDataResponse<T>>;

      if (axiosError.code === "ERR_NETWORK") {
        localStorage.clear();
        window.location.href = "/sign-in";
        throw new ApiError('Network error', 0, null, axiosError);
      }

      // Create a proper error object with all necessary information
      throw new ApiError(
        axiosError.response?.data?.message || axiosError.message || 'API Error',
        axiosError.response?.status,
        axiosError.response?.data,
        axiosError
      );
    }

    // For non-axios errors, re-throw with better context
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error',
      0,
      null,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

export default rootApi;
