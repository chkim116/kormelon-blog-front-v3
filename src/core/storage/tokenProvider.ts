import { env } from '@core/env';
import {
  STORAGE_LIKE_KEY,
  STORAGE_THEME_KEY,
  STORAGE_TOKEN_KEY,
  STORAGE_USER_KEY,
} from '.';

type TokenType =
  | typeof STORAGE_TOKEN_KEY
  | typeof STORAGE_USER_KEY
  | typeof STORAGE_THEME_KEY
  | typeof STORAGE_LIKE_KEY;

function noop() {
  return undefined;
}

function getTokenProvider() {
  if (env.isSSR) {
    return {
      get: noop,
      set: noop,
      remove: noop,
      clear: noop,
    };
  }

  const keys = new Set();

  function get<T>(key: TokenType): T {
    const item = localStorage.getItem(key) || '';
    return item ? JSON.parse(item) : item;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function set(key: TokenType, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
    keys.add(key);
  }

  function remove(key: TokenType) {
    localStorage.removeItem(key);
    keys.delete(key);
  }

  function clear() {
    keys.forEach((key) => {
      if (typeof key === 'string') {
        localStorage.removeItem(key);
      }
    });
    keys.clear();
  }

  return {
    get,
    set,
    remove,
    clear,
  };
}

export const tokenProvider = getTokenProvider();
