import { Response, ViewEntity } from '@server/entities';
import { baseApiServer } from '@core/network/apiServer';
import { ViewRepository } from './types';

class ViewRepositoryImpl implements ViewRepository {
  /**
   * 조회수를 불러온다.
   */
  fetchView() {
    return baseApiServer<Response<ViewEntity>>('/view', {
      method: 'GET',
      next: {
        revalidate: 86400,
      },
    });
  }
}

export const viewRepository = new ViewRepositoryImpl();
