'use server';
import 'server-only';

import { COOKIE_TOKEN_KEY } from '@core/server/constatns';
import { getCookies } from '@core/server/serverCookieProvider';
import { createApiClient } from '@core/network/createApiClient';

export const baseApiServer = createApiClient();

export const authApiServer = createApiClient({
  async setHeaders(headers) {
    const cookie = await getCookies<string>(COOKIE_TOKEN_KEY);

    if (cookie) {
      return {
        ...headers,
        authorization: cookie,
      };
    }

    return headers;
  },
});
