'use server';
import 'server-only';

import { toString } from 'safers';
import { createSafeAction } from '@shared/domains/common/sharedActions.create';
import { notificationService } from '@shared/domains/notification';
import { getServerUserSession } from './sharedAuth.action';

export const actSharedNotificationLoad = createSafeAction(async () => {
  const session = await getServerUserSession();

  const userId = toString(session.id);

  if (!userId) {
    throw new Error('로그인이 필요합니다.');
  }

  const notifications = await notificationService.fetchNoti(userId);

  return notifications;
}, []);

export const actSharedNotificationRead = createSafeAction(
  async (id: number) => {
    const session = await getServerUserSession();

    const userId = toString(session.id);

    if (!userId) {
      throw new Error('로그인이 필요합니다.');
    }

    await notificationService.readNoti(id, userId);
  },
  null,
);
