import { createAsyncThunk } from '@reduxjs/toolkit';
import { repo } from '@core/repo';
import { NotificationSearchModel } from '@shared/models/notification.model';

export const effNotificationLoad = createAsyncThunk<
  NotificationSearchModel[],
  void
>('notificationLoad', async () => {
  const {
    data: { payload },
  } = await repo.notification.fetchList();

  return payload;
});

export const effNotificationRead = createAsyncThunk<void, number>(
  'notificationRead',
  async (id) => {
    await repo.notification.readNoti(id);
  },
);
