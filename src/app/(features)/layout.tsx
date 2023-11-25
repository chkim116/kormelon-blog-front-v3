import { ReactNode } from 'react';
import '@shared/styles/tailwind.global.css';

interface LayoutProps {
  children: ReactNode;
  navbar: ReactNode;
  footer: ReactNode;
}

export default async function Layout({
  navbar,
  footer,
  children,
}: LayoutProps) {
  return (
    <>
      {navbar}
      <main className="min-h-[100vh] max-w-6xl w-full mx-auto">{children}</main>
      {footer}
    </>
  );
}
