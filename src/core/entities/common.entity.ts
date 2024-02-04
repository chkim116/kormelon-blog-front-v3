/**
 * @deprecated
 */
export interface Response<T = null, M = null> {
  meta: M;
  payload: T;
  status: number;
}

/**
 * prisma로부터 받은 응답을 클라이언트로 보내기 위한 인터페이스
 */
export interface PrismaResolveResponse<T = null, M = null> {
  payload: T;
  meta: M;
}

export interface PromisePrismaResolveResponse<T = null, M = null>
  extends Promise<PrismaResolveResponse<T, M>> {}

export interface ResponseWithFetch<T = null, M = null>
  extends Promise<Response<T, M>> {}

export interface PagingMeta {
  page: number;
  per: number;
  total: number;
}
