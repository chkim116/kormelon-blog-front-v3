import { numberFormat } from 'safers';
import { ViewEntity } from '@server/entities';
import { ViewUiState } from './view.uiState';

export function toViewUiState(entity: ViewEntity) {
  const result: ViewUiState = {
    today: numberFormat(entity.today),
    total: numberFormat(entity.total),
  };

  return result;
}
