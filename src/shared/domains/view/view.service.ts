import { ViewRepository } from '@core/repositories/view.repo.type';
import { ViewUiState } from './view.uiState';
import { toViewUiState } from './view.convert';

interface ViewService {
  /**
   * 조회수를 불러온다.
   */
  fetchView(): Promise<ViewUiState>;
  /**
   * 조회수를 증가시킨다.
   */
  addView(): Promise<void>;
}

export class ViewServiceImpl implements ViewService {
  constructor(private viewRepo: ViewRepository) {}

  async fetchView(): Promise<ViewUiState> {
    const { payload } = await this.viewRepo.fetchView();

    return toViewUiState(payload);
  }

  async addView() {
    await this.viewRepo.addView();
  }
}
