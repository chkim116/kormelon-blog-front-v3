/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorModel } from '@core/network/HttpError';
import { ActionFormStateUiState } from 'src/app/shared/uiStates/sharedActions.uiState';

export function createActionResolve(message = ''): ActionFormStateUiState {
  return {
    isSuccess: true,
    isError: false,
    message,
    data: null,
  };
}

export function createActionResolveWithData<Data = any>(
  data: Data,
  message = '',
): ActionFormStateUiState<Data> {
  return {
    isSuccess: true,
    isError: false,
    message,
    data,
  };
}

export function createActionRejectedWithError(
  error: unknown,
): ActionFormStateUiState {
  return {
    isSuccess: false,
    isError: true,
    message: (error as HttpErrorModel).message,
    data: null,
  };
}

export function createActionRejected(message = ''): ActionFormStateUiState {
  return {
    isSuccess: false,
    isError: true,
    message,
    data: null,
  };
}

export function createActionFormStateUiState(): ActionFormStateUiState {
  return {
    isError: false,
    isSuccess: false,
    data: null,
    message: '',
  };
}
