import { NotificationSearchEntity, Response } from '@server/entities';
import { authApiServer } from '@server/apiServer';
import { NotificationRepository } from './types';

export const FETCH_NOTIFICATION_LIST_CACHE_TAG = 'fetchNotiList';

class NotificationRepositoryImpl implements NotificationRepository {
  /**
   * 알림을 가져온다.
   * @returns
   */
  fetchList() {
    return authApiServer<Response<NotificationSearchEntity[]>>(
      '/notification',
      {
        method: 'GET',
        next: {
          revalidate: 60,
          tags: [FETCH_NOTIFICATION_LIST_CACHE_TAG],
        },
      },
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
