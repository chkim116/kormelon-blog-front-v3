import { NotificationSearchEntity, ResponseWithFetch } from '@server/entities';

export interface NotificationRepository {
  /**
   * 알림을 가져온다.
   * @returns
   */
  fetchList(): ResponseWithFetch<NotificationSearchEntity[]>;

  /**
   * 알림을 읽는다.
   * @param id
   * @returns
   */
  readNoti(id: number): Promise<void>;
}
