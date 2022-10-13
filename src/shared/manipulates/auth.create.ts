import { env } from '@common/env';
import { STORAGE_USER_KEY } from '@common/constants';
import { UserRoleEnum, UserEntity } from '@core/entities/auth.entity';
import { tokenProvider } from '@core/tokenProvider';

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

export function createUserByLocalStorage() {
  if (env.isSSR) {
    return createInitialUser();
  }

  const user = tokenProvider().get<UserEntity>(STORAGE_USER_KEY);

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
