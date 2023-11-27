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
import { FETCH_NOTIFICATION_LIST_CACHE_TAG } from '@server/repositories/notification.repo';
import { actSharedRevalidateTags } from './sharedUtils.action';

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

    await actSharedRevalidateTags(FETCH_NOTIFICATION_LIST_CACHE_TAG);
    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};
