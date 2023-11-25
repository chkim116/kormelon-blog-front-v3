import { ofetch } from 'ofetch';
import { env } from '@core/env';
import { HttpError } from './HttpError';

interface ApiClientParams {
  baseURL?: string;
  credentials?: RequestCredentials;
  setHeaders?: (headers: HeadersInit) => HeadersInit | Promise<HeadersInit>;
  throwableError?: boolean;
}

export function createApiClient({
  baseURL = env.apiUrl,
  credentials = 'include',
  setHeaders = (headers) => headers,
  throwableError = true,
}: ApiClientParams = {}) {
  return ofetch.create({
    baseURL,
    credentials,
    parseResponse: JSON.parse,

    async onRequest(ctx) {
      ctx.options.headers = await setHeaders(ctx.options.headers || {});
    },

    onResponseError(context) {
      const { _data } = context.response;

      if (_data.status >= 400) {
        if (throwableError) {
          throw new HttpError(_data.message, _data.status);
        }
      }
    },
  });
}
