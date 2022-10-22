import { createSlice } from '@reduxjs/toolkit';
import { NotificationSearchModel } from '@shared/models/notification.model';
import { effNotificationLoad } from './notification.effect';

interface NotificationSliceState {
  loading: boolean;

  notifications: NotificationSearchModel[];
}

function createNotificationSliceState(): NotificationSliceState {
  return {
    loading: false,
    notifications: [],
  };
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: createNotificationSliceState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(effNotificationLoad.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(effNotificationLoad.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.notifications = payload;
    });
    builder.addCase(effNotificationLoad.rejected, (state) => {
      state.loading = false;
    });
  },
});
