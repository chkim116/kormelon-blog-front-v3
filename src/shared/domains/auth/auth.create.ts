import { AuthRoleEnum } from '@core/entities';
import {
  AuthLoginUiParams,
  AuthRegisterUiParams,
  AuthUserUiState,
} from './auth.uiState';

export function createAuthUserUiState() {
  const result: AuthUserUiState = {
    id: '',
    profileImage: '',
    role: AuthRoleEnum.MEMBER,
    username: '',
    email: '',
  };

  return result;
}

export function createAuthRegisterUiParams() {
  const result: AuthRegisterUiParams = {
    email: '',
    password: '',
    profileImage: '',
    username: '',
  };

  return result;
}

export function createAuthLoginUiParams() {
  const result: AuthLoginUiParams = {
    email: '',
    password: '',
  };

  return result;
}
