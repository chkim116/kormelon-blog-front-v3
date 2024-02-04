'use client';
import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useBlogViewCount } from '@shared/hooks/useBlogViewCount';

interface AppProviderContainerProps {
  children: ReactNode;
}

export function AppProviderContainer({ children }: AppProviderContainerProps) {
  const router = useRouter();

  useBlogViewCount();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SessionProvider>{children}</SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
