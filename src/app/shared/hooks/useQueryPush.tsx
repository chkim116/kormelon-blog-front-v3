'use client';
import { useCallback, useMemo } from 'react';
import qs from 'qs';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const useQueryPush = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const query = useMemo(() => {
    const obj: Record<string, string> = {};

    searchParams?.forEach((value: string, key: string) => (obj[key] = value));

    return obj;
  }, [searchParams]);

  const navigate = useCallback(
    (
      object: Record<string, string | number>,
      basePath = pathname,
      isScroll = true,
    ) => {
      const queries = { ...query, ...object };

      for (const key in queries) {
        if (!queries[key]) delete queries[key];
      }

      push(basePath + qs.stringify(queries, { addQueryPrefix: true }), {
        scroll: isScroll,
      });
    },
    [push, pathname, query],
  );

  return navigate;
};
