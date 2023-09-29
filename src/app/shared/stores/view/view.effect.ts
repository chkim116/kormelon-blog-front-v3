import { createAsyncThunk } from '@reduxjs/toolkit';
import { ViewModel } from '@domain/uiStates';
import { toViewModel } from '@domain/manipulates';
import { repo } from '@server/repo';

export const effViewLoad = createAsyncThunk<ViewModel, void>(
  'viewLoad',
  async () => {
    const {
      data: { payload },
    } = await repo.view.getView();

    return toViewModel(payload);
  },
);
