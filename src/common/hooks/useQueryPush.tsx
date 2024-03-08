'use client';
import { useCallback, useMemo } from 'react';
import qs from 'qs';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDeepCompareMemoize } from 'use-deep-compare-effect';
import { removeEmptyKeys } from 'safers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createPath = (path: string, query: Record<string, any> = {}) =>
  path + qs.stringify(removeEmptyKeys(query), { addQueryPrefix: true });

export const useQueryPush = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const query = useMemo(() => {
    const obj: Record<string, string> = {};

    searchParams?.forEach((value: string, key: string) => (obj[key] = value));

    return obj;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useDeepCompareMemoize(searchParams)]);

  const navigate = useCallback(
    (
      object: Record<string, string | number>,
      basePath = pathname,
      isMerge = false,
      isScroll = true,
    ) => {
      const queries = isMerge ? { ...query, ...object } : object;

      push(createPath(basePath, queries), {
        scroll: isScroll,
      });
    },
    [push, pathname, query],
  );

  return navigate;
};
