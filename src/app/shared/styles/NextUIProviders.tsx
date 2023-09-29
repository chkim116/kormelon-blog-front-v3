'use client';
import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface NextUIProvidersProps {
  children: ReactNode;
}

export function NextUIProviders({ children }: NextUIProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
