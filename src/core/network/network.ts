import axios, { AxiosError } from 'axios';
import { env } from '@core/env';
import { STORAGE_TOKEN_KEY, tokenProvider } from '@core/storage';

const BASE_URL = env.apiUrl;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers['Authorization'] =
      tokenProvider.get(STORAGE_TOKEN_KEY) || '';
  }

  return config;
});

interface AxiosResponseError {
  message: string;
}

function isAxiosError(err: unknown): err is AxiosError<AxiosResponseError> {
  return err instanceof AxiosError;
}

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    // TODO: custom error parse
    if (isAxiosError(err) && err.response?.data.message) {
      throw new Error(err.response.data.message);
    }

    throw new Error('알 수 없는 오류입니다.');
  },
);
