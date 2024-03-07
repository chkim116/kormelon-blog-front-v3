'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface NextAuthSessionProviderClientProps {
  children: ReactNode;
}

export default function NextAuthSessionProvider({
  children,
}: NextAuthSessionProviderClientProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
