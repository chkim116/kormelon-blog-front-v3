'use client';
import { ReactNode } from 'react';

interface LayoutMainProps {
  children: ReactNode;
}
export function LayoutMain({ children }: LayoutMainProps) {
  return (
    <main className="min-h-[100vh] max-w-6xl w-full mx-auto">{children}</main>
  );
}
