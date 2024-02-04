import { PromisePrismaResolveResponse, ViewEntity } from '@core/entities';

export interface ViewRepository {
  /**
   * 조회수를 불러온다.
   */
  fetchView(): PromisePrismaResolveResponse<ViewEntity>;

  /**
   * 조회수를 올린다.
   */
  addView(): PromisePrismaResolveResponse;
}
