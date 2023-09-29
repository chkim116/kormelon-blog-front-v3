import { ViewEntity } from '@server/entities';
import { ViewModel } from '@domain/uiStates';

export function toViewModel(entity: ViewEntity): ViewModel {
  return {
    today: entity.today.toLocaleString(),
    total: entity.total.toLocaleString(),
  };
}
