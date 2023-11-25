import { ViewEntity } from '@server/entities';
import { ViewUiState } from './view.uiState';

export function toViewUiState(entity: ViewEntity) {
  const result: ViewUiState = {
    today: entity.today.toLocaleString(),
    total: entity.total.toLocaleString(),
  };

  return result;
}
