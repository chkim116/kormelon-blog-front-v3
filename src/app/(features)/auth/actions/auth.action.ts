'use server';
import 'server-only';

import { authService } from '@domain/auth';
import {
  AuthLoginUiParams,
  AuthRegisterUiParams,
} from '@domain/auth/auth.uiState';
import {
  createActionRejectedWithError,
  createActionResolve,
  createActionResolveWithData,
} from 'src/app/shared/manipulates/sharedActions.create';
import {
  ActionFormFnType,
  ActionFnType,
} from 'src/app/shared/uiStates/sharedActions.uiState';

export const actAuthLogin: ActionFormFnType<AuthLoginUiParams, void> = async (
  _,
  params,
) => {
  try {
    await authService.login(params);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actAuthRegister: ActionFormFnType<
  AuthRegisterUiParams,
  void
> = async (_, params) => {
  try {
    await authService.register(params);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actAuthProfileUpload: ActionFnType<FormData, string> = async (
  fd: FormData,
) => {
  try {
    const imageUrl = await authService.profileUpload(fd);

    return createActionResolveWithData(imageUrl);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};
