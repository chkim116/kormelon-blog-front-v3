import { useCallback } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';

export const useQueryPush = () => {
  const { pathname, push, query } = useRouter();

  const navigate = useCallback(
    (object: Record<string, string | number>, isScroll = true) => {
      const queries = { ...query, ...object };

      for (const key in queries) {
        if (!queries[key]) delete queries[key];
      }

      push(
        pathname + qs.stringify(queries, { addQueryPrefix: true }),
        undefined,
        { scroll: isScroll },
      );
    },
    [push, pathname, query],
  );

  return navigate;
};
