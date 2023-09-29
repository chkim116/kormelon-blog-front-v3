export interface Response<T = null, M = null> {
  meta: M;
  payload: T;
  status: number;
}

export interface PagingMeta {
  page: number;
  per: number;
  total: number;
}
