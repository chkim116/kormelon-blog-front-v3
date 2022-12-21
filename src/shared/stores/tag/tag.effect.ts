import { createAsyncThunk } from '@reduxjs/toolkit';
import { TagEntity } from '@core/entities';
import { repo } from '@core/repo';
import { TagSearchResultPayload } from '@shared/models';
import { toTagModels, toTagWithPostModels } from '@shared/manipulates';

export const effTagSearchLoad = createAsyncThunk<TagEntity[], string>(
  'effTagSearchLoad',
  async (value) => {
    const {
      data: { payload },
    } = await repo.tag.getTagByValue(value);

    return toTagModels(payload);
  },
);

export const effTagAllSearchLoad = createAsyncThunk<
  TagSearchResultPayload,
  void
>('tagSearchLoad', async () => {
  const {
    data: { payload, meta },
  } = await repo.tag.getAllTags();

  return {
    tags: toTagWithPostModels(payload),
    total: meta.total,
  };
});

export const effTagCreate = createAsyncThunk<TagEntity, string>(
  'tagCreate',
  async (value) => {
    const {
      data: { payload },
    } = await repo.tag.createTag(value);

    return payload;
  },
);
