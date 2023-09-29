import { createAsyncThunk } from '@reduxjs/toolkit';
import { TagSearchResultPayload } from '@domain/uiStates';
import { toTagModels, toTagWithPostModels } from '@domain/manipulates';
import { repo } from '@server/repo';
import { TagEntity } from '@server/entities';

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
