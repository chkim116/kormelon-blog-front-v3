import { NotificationSearchEntity, Response } from '@server/entities';
import { apiClient } from '@core/network';

export const notificationRepository = {
  /**
   * 알림을 가져온다.
   * @returns
   */
  fetchList() {
    return apiClient.get<Response<NotificationSearchEntity[]>>('/notification');
  },

  /**
   * 알림을 읽는다.
   * @param id
   * @returns
   */
  readNoti(id: number) {
    return apiClient.post<void>('/notification', { id });
  },
};
