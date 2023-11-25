import { notificationRepository } from '@server/repositories/notification.repo';
import { NotificationSearchUiState } from './notification.uiState';

interface NotificationService {
  /**
   * 알림을 가져온다.
   */
  fetchNoti(): Promise<NotificationSearchUiState[]>;
  /**
   * 알림을 읽는다.
   *
   * @param id 알림 식별자
   */
  readNoti(id: number): Promise<void>;
}

export class NotificationServiceImpl implements NotificationService {
  constructor(private notiRepo: typeof notificationRepository) {}

  async fetchNoti(): Promise<NotificationSearchUiState[]> {
    const { payload } = await this.notiRepo.fetchList();

    return payload || [];
  }

  async readNoti(id: number): Promise<void> {
    await this.notiRepo.readNoti(id);
  }
}
