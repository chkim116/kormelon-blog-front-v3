'use server';
import 'server-only';

import { COOKIE_TOKEN_KEY } from '@server/constants/cookie.const';
import { getCookies } from '@server/cookies/serverCookieProvider';
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
