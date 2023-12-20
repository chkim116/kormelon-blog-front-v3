import { ResponseWithFetch, ViewEntity } from '@shared/entities';

export interface ViewRepository {
  /**
   * 조회수를 불러온다.
   */
  fetchView(): ResponseWithFetch<ViewEntity>;
}
