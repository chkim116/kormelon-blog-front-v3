import { ViewEntity } from '@core/entities';
import { ViewModel } from '@shared/models';

export function toViewModel(entity: ViewEntity): ViewModel {
  return {
    today: entity.today.toLocaleString(),
    total: entity.total.toLocaleString(),
  };
}
