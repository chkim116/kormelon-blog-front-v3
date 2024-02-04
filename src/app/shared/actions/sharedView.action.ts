import { viewService } from '@domain/view';
import { ViewUiState } from '@domain/view/view.uiState';
import {
  createActionResolveWithData,
  createActionRejectedWithError,
} from 'src/app/shared/manipulates/sharedActions.create';
import { ActionFnType } from 'src/app/shared/uiStates/sharedActions.uiState';

export const actSharedViewLoad: ActionFnType<void, ViewUiState> = async () => {
  try {
    const view = await viewService.fetchView();
    return createActionResolveWithData(view);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};
