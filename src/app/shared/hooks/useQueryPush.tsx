'use client';
import { useCallback, useMemo } from 'react';
import qs from 'qs';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDeepCompareMemoize } from 'use-deep-compare-effect';
import { removeEmptyKeys } from 'safers';

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
      const newQueries = removeEmptyKeys(queries);

      push(basePath + qs.stringify(newQueries, { addQueryPrefix: true }), {
        scroll: isScroll,
      });
    },
    [push, pathname, query],
  );

  return navigate;
};
