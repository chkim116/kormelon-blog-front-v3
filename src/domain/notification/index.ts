import { notificationRepository } from '@server/repositories/notification.repo';
import { NotificationServiceImpl } from './notification.service';

export const notificationService = new NotificationServiceImpl(
  notificationRepository,
);
