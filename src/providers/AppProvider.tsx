'use client';
import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import RouteProgressLoader from './RouteProgressLoader';

import './styles/tailwind.global.css';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <RouteProgressLoader />
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
