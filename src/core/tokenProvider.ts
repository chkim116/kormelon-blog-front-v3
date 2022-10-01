import { STORAGE_TOKEN_KEY, STORAGE_USER_KEY } from '@common/constants';

type TokenType = typeof STORAGE_TOKEN_KEY | typeof STORAGE_USER_KEY;

export function tokenProvider() {
  const keys = new Set();

  function get<T>(key: TokenType): T {
    const item = localStorage.getItem(key) || '';
    return JSON.parse(item);
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
