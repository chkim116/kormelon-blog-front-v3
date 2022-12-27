import { Response, ViewEntity } from '@core/entities';
import { apiClient } from '@core/network';

export const viewRepository = {
  /**
   * 조회수를 불러온다.
   */
  getView() {
    return apiClient.get<Response<ViewEntity>>('/view');
  },
};
