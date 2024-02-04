import {
  AuthLoginParams,
  AuthRegisterParams,
  AuthUserEntity,
} from '@server/entities';

export type AuthUserUiState = AuthUserEntity;

export type AuthLoginUiParams = AuthLoginParams;

export type AuthRegisterUiParams = AuthRegisterParams;
