import { notificationRepository } from '@core/repositories/notification.repo';
import { NotificationServiceImpl } from './notification.service';

export const notificationService = new NotificationServiceImpl(
  notificationRepository,
);
