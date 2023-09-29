'use client';
import { useMemo } from 'react';
import { useSearchParams, useParams } from 'next/navigation';

interface Refiner<T> {
  (query: Record<string, string>): T;
}

export const useQueryParser = <T,>(refiner: Refiner<T>) => {
  const params = useParams() as Record<string, string>;
  const query = useSearchParams();

  const refinerQuery = useMemo(() => {
    const obj: Record<string, string> = { ...(params || {}) };
    query?.forEach((value, key) => (obj[key] = value));

    return refiner(obj);
  }, [params, query, refiner]);

  return refinerQuery;
};
