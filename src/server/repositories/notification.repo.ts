import { NotificationSearchEntity, Response } from '@server/entities';
import { authApiServer } from '@core/network/apiServer';
import { NotificationRepository } from './types';

class NotificationRepositoryImpl implements NotificationRepository {
  /**
   * 알림을 가져온다.
   * @returns
   */
  fetchList() {
    return authApiServer<Response<NotificationSearchEntity[]>>(
      '/notification',
      { method: 'GET' },
    );
  }

  /**
   * 알림을 읽는다.
   * @param id
   * @returns
   */
  readNoti(id: number) {
    return authApiServer<void>('/notification', {
      body: { id },
      method: 'POST',
    });
  }
}

export const notificationRepository = new NotificationRepositoryImpl();
