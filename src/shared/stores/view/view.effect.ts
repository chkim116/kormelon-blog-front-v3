import { createAsyncThunk } from '@reduxjs/toolkit';
import { repo } from '@core/repo';
import { toViewModel } from '@shared/manipulates';
import { ViewModel } from '@shared/models';

export const effViewLoad = createAsyncThunk<ViewModel, void>(
  'viewLoad',
  async () => {
    const {
      data: { payload },
    } = await repo.view.getView();

    return toViewModel(payload);
  },
);
