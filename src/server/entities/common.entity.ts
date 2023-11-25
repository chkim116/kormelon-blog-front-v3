export interface Response<T = null, M = null> {
  meta: M;
  payload: T;
  status: number;
}

export interface ResponseWithFetch<T = null, M = null>
  extends Promise<Response<T, M>> {}

export interface PagingMeta {
  page: number;
  per: number;
  total: number;
}
