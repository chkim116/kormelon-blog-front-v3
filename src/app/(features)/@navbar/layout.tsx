import { ReactNode } from 'react';

interface NavbarLayoutProps {
  children: ReactNode;
}

export default function NavbarLayout({ children }: NavbarLayoutProps) {
  return <>{children}</>;
}
