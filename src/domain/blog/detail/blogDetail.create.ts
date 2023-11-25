import { DEFAULT_IMAGE } from '@shared/constants';
import { BlogDetailNearUiState, BlogDetailUiState } from './blogDetail.uiState';

export function createBlogDetailUiState(): BlogDetailUiState {
  return {
    content: '',
    user: {
      id: '',
      profileImage: '',
      username: '',
    },
    tags: [],
    id: 0,
    title: '',
    thumbnail: DEFAULT_IMAGE,
    view: 0,
    like: 0,
    category: {
      id: 0,
      value: '',
      subCategoryId: 0,
      subCategoryValue: '',
    },
    createdAt: '',
    preview: '',
    readTime: '',
    isPrivate: false,
  };
}

export function createBlogDetailNearUiState(): BlogDetailNearUiState {
  return {
    id: 0,
    title: '',
    thumbnail: '',
    createdAt: '',
  };
}
