import { DEFAULT_PAGE, DEFAULT_PER } from '@shared/constants';
import { BlogSearchUiParams } from './blogSearch.uiState';

export function createBlogSearchUiParams() {
  const result: BlogSearchUiParams = {
    page: DEFAULT_PAGE,
    per: DEFAULT_PER,
    keyword: '',
    categoryId: 0,
    subCategoryId: 0,
  };

  return result;
}
