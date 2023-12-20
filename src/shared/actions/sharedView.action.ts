import { ActionFnType } from '@shared/domains/common/sharedActions.uiState';
import { viewService } from '@shared/domains/view';
import { ViewUiState } from '@shared/domains/view/view.uiState';
import {
  createActionResolveWithData,
  createActionRejectedWithError,
} from '@shared/domains/common/sharedActions.create';

export const actSharedViewLoad: ActionFnType<void, ViewUiState> = async () => {
  try {
    const view = await viewService.fetchView();
    return createActionResolveWithData(view);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};
