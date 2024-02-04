import { useSession } from 'next-auth/react';
import { createAuthUserUiState } from '@shared/domains/auth/auth.create';

export function useUserSession() {
  const session = useSession();

  return session.data?.user || createAuthUserUiState();
}
