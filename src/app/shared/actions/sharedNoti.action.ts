'use server';
import { notificationService } from '@domain/notification';
import { NotificationSearchUiState } from '@domain/notification/notification.uiState';
import {
  createActionRejectedWithError,
  createActionResolve,
  createActionResolveWithData,
} from 'src/app/shared/manipulates/sharedActions.create';
import { ActionFnType } from 'src/app/shared/uiStates/sharedActions.uiState';
import 'server-only';

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
