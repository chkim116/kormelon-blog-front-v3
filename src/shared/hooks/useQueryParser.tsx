import { useMemo } from 'react';
import { useRouter } from 'next/router';

interface Refiner<T> {
  (query: Record<string, string>): T;
}

export const useQueryParser = <T,>(refiner: Refiner<T>) => {
  const { query } = useRouter();

  const refinerQuery = useMemo(
    () => refiner(query as Record<string, string>),
    [query, refiner],
  );

  return refinerQuery;
};
