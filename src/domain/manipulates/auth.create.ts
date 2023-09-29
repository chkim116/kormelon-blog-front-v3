import { UserEntity, UserRoleEnum } from '@server/entities';
import { env } from '@core/env';
import { STORAGE_USER_KEY, tokenProvider } from '@core/storage';
import {
  AuthLoginParamsModel,
  AuthRegisterParamsModel,
} from '@domain/uiStates';

function refineString(val: string | undefined) {
  return val || '';
}

export function createInitialUser() {
  return {
    id: '',
    profileImage: '',
    role: UserRoleEnum.MEMBER,
    username: '',
  };
}

export function createAuthRegisterParamsModel() {
  const result: AuthRegisterParamsModel = {
    email: '',
    password: '',
    profileImage: '',
    username: '',
  };

  return result;
}

export function createAuthLoginParamsModel() {
  const result: AuthLoginParamsModel = {
    email: '',
    password: '',
  };

  return result;
}

export function createUserByLocalStorage() {
  if (env.isSSR) {
    return createInitialUser();
  }

  const user = tokenProvider.get<UserEntity>(STORAGE_USER_KEY);

  if (!user) {
    return createInitialUser();
  }

  return {
    id: refineString(user.id),
    profileImage: refineString(user.profileImage),
    role: user.role || UserRoleEnum.MEMBER,
    username: refineString(user.username),
  };
}
