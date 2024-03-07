'use server';
import 'server-only';

import {
  createSafeAction,
  createSafeFormAction,
} from '@common/lib/createSafeAction';
import {
  CreateSafeFormAction,
  CreateSafeAction,
} from '@common/lib/createSafeAction.uiState';
import {
  AuthLoginUiParams,
  AuthRegisterUiParams,
} from '../../../shared/domains/auth/auth.uiState';
import { authService } from '../../../shared/domains/auth';

export const actAuthLogin: CreateSafeFormAction<AuthLoginUiParams, void> =
  createSafeFormAction(async (params) => {
    await authService.login(params);
  });

export const actAuthRegister: CreateSafeFormAction<AuthRegisterUiParams, void> =
  createSafeFormAction(async (params) => {
    await authService.register(params);
  });

export const actAuthProfileUpload: CreateSafeAction<FormData, string> =
  createSafeAction(async (fd: FormData) => {
    const imageUrl = await authService.profileUpload(fd);

    return imageUrl;
  });
