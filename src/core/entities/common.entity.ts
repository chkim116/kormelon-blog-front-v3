export interface Response<T = null, M = null> {
  meta: M;
  payload: T;
  status: number;
}
