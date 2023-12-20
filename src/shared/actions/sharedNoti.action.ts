'use server';
import 'server-only';

import { ActionFnType } from '@shared/domains/common/sharedActions.uiState';
import { notificationService } from '@shared/domains/notification';
import { NotificationSearchUiState } from '@shared/domains/notification/notification.uiState';
import {
  createActionRejectedWithError,
  createActionResolve,
  createActionResolveWithData,
} from '@shared/domains/common/sharedActions.create';

export const actSharedNotificationLoad: ActionFnType<
  void,
  NotificationSearchUiState[]
> = async () => {
  try {
    const notifications = await notificationService.fetchNoti();

    return createActionResolveWithData(notifications);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actSharedNotificationRead: ActionFnType<
  number,
  NotificationSearchUiState[]
> = async (id) => {
  try {
    await notificationService.readNoti(id);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};
