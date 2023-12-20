'use server';

import { cookies } from 'next/headers';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { toString } from 'safers';

interface ServerCookieProviderModel {
  get: <T>(key: string) => Promise<T>;
  set: <T>(key: string, value: T) => void;
  remove: (key: string) => void;
  clear: () => void;
}

class ServerCookieProvider implements ServerCookieProviderModel {
  private _keys: Set<string>;

  constructor() {
    this._keys = new Set();
  }

  private getServerCookies() {
    return cookies();
  }

  get<T>(key: string): T {
    const item = this.getServerCookies().get(key);

    const parsedItem = toString(item?.value, '');

    try {
      return JSON.parse(parsedItem);
    } catch (err) {
      return '' as T;
    }
  }

  set<T>(key: string, value: T, options: Partial<ResponseCookie> = {}) {
    this.getServerCookies().set(key, JSON.stringify(value), options);
    this._keys.add(key);
  }

  remove(key: string) {
    this.getServerCookies().delete(key);
    this._keys.delete(key);
  }

  clear() {
    this._keys.forEach((key) => {
      if (this.getServerCookies().has(key)) {
        this.getServerCookies().delete(key);
      }
    });
    this._keys.clear();
  }
}

const serverCookieProvider = new ServerCookieProvider();

export async function getCookies<T>(key: string) {
  const cookie = serverCookieProvider.get<T>(key);

  return cookie;
}

export async function setCookies<T>(
  key: string,
  value: T,
  options: Partial<ResponseCookie>,
) {
  return serverCookieProvider.set(key, value, options);
}

export async function removeCookies(key: string) {
  return serverCookieProvider.remove(key);
}

export async function clearCookies() {
  return serverCookieProvider.clear();
}
