'use server';
import 'server-only';

import { viewService } from '@shared/domains/view';
import {
  createSafeAction,
  createSafeFormAction,
} from '@shared/domains/common/sharedActions.create';
import { createViewUiState } from '@shared/domains/view/view.create';

export const actSharedViewLoad = createSafeAction(
  async () => await viewService.fetchView(),
  createViewUiState(),
);

export const actSharedViewAdd = createSafeFormAction(async () => {
  await viewService.addView();
});
