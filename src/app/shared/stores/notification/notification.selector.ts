import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@shared/stores';

const selNoti = (state: RootState) => state.shared.notification;

export const selNotiLoading = createSelector(selNoti, (state) => state.loading);

export const selNotifications = createSelector(
  selNoti,
  (state) => state.notifications,
);
