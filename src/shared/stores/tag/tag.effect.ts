import { createAsyncThunk } from '@reduxjs/toolkit';
import { TagEntity } from '@core/entities';
import { repo } from '@core/repo';

export const effTagSearchLoad = createAsyncThunk<TagEntity[], string>(
  'effTagSearchLoad',
  async (value) => {
    const {
      data: { payload },
    } = await repo.tag.getTagByValue(value);

    return payload;
  },
);

export const effTagCreate = createAsyncThunk<TagEntity, string>(
  'tagCreate',
  async (value) => {
    const {
      data: { payload },
    } = await repo.tag.createTag(value);

    return payload;
  },
);
