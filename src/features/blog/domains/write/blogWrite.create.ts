import { DEFAULT_IMAGE } from '@shared/constants/img.const';
import { BlogWriteCreateUiParams } from './blogWrite.uiState';

export function createBlogWriteCreateUiParams(): BlogWriteCreateUiParams {
  return {
    preview: '',
    thumbnail: DEFAULT_IMAGE,
    title: '',
    content: '',
    tags: [],
    categoryId: 0,
    subCategoryId: 0,
    isPrivate: false,
    userId: '',
  };
}
