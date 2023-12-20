import { ViewRepository } from '@shared/repositories/view.repo.type';
import { ViewUiState } from './view.uiState';
import { toViewUiState } from './view.convert';

interface ViewService {
  /**
   * 조회수를 불러온다.
   */
  fetchView(): Promise<ViewUiState>;
}

export class ViewServiceImpl implements ViewService {
  constructor(private viewRepo: ViewRepository) {}

  async fetchView(): Promise<ViewUiState> {
    const { payload } = await this.viewRepo.fetchView();

    return toViewUiState(payload);
  }
}
