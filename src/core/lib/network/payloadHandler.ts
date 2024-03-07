import { PrismaResolveResponse } from '@core/entities';

/**
 * payload를 핸들링.
 *
 * @param props
 * @param res
 * @returns
 */
export const prismaResolveHandler = <T = null, M = null>(
  payload: T = null as T,
  meta: M = null as M,
) => {
  const resolveData: PrismaResolveResponse<T, M> = {
    payload: payload || (null as T),
    meta: meta || (null as M),
  };

  return resolveData;
};
