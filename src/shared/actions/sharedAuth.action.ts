'use server';
import 'server-only';

import { getServerSession } from 'next-auth';
import { AuthRoleEnum } from '@core/entities';
import { nextAuthOptions } from '@core/lib/nextAuthOptions';
import { authService } from '@shared/domains/auth';
import { createAuthUserUiState } from '@shared/domains/auth/auth.create';
import { createSafeAction } from '@shared/domains/common/sharedActions.create';

export async function getServerUserSession() {
  const session = await getServerSession(nextAuthOptions);

  return session?.user || createAuthUserUiState();
}

export const actSharedCheckAdmin = createSafeAction(async () => {
  const user = await getServerUserSession();

  const isAdmin = user.role === AuthRoleEnum.ADMIN;

  if (!isAdmin) {
    throw new Error('권한이 없습니다.');
  }

  return user;
}, createAuthUserUiState());

export const actSharedCheckUser = createSafeAction(async () => {
  const user = await getServerUserSession();

  return user;
}, createAuthUserUiState());

export const actSharedCheckAuth = createSafeAction(async () => {
  const user = await getServerUserSession();

  return Boolean(user.id);
}, false);

export async function actSharedLogout() {
  await authService.logout();
}
