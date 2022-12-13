import axios, { AxiosError } from 'axios';
import { env } from '@common/env';
import { STORAGE_TOKEN_KEY } from '@common/constants';
import { tokenProvider } from './tokenProvider';

const BASE_URL = env.isProduction
  ? 'https://api.kormelon.com/api'
  : 'http://localhost:4000/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers['Authorization'] =
      tokenProvider().get(STORAGE_TOKEN_KEY) || '';
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
    if (isAxiosError(err) && err.response?.data.message) {
      throw new Error(err.response.data.message);
    }

    throw new Error('알 수 없는 오류입니다.');
  },
);
