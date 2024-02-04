import { NotificationRepository } from '@core/repositories/notification.repo.type';
import { NotificationSearchUiState } from './notification.uiState';

interface NotificationService {
  /**
   * 알림을 가져온다.
   */
  fetchNoti(userId: string): Promise<NotificationSearchUiState[]>;
  /**
   * 알림을 읽는다.
   *
   * @param id 알림 식별자
   */
  readNoti(id: number, userId: string): Promise<void>;
}

export class NotificationServiceImpl implements NotificationService {
  constructor(private notiRepo: NotificationRepository) {}

  async fetchNoti(userId: string): Promise<NotificationSearchUiState[]> {
    const { payload } = await this.notiRepo.fetchList(userId);

    return payload || [];
  }

  async readNoti(id: number, userId: string): Promise<void> {
    await this.notiRepo.readNoti(id, userId);
  }
}
