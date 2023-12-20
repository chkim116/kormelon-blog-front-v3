import { Response, ViewEntity } from '@shared/entities';
import { baseApiServer } from '@core/server/apiServer';
import { ViewRepository } from './view.repo.type';

class ViewRepositoryImpl implements ViewRepository {
  /**
   * 조회수를 불러온다.
   */
  fetchView() {
    return baseApiServer<Response<ViewEntity>>('/view', {
      method: 'GET',
    });
  }
}

export const viewRepository = new ViewRepositoryImpl();
