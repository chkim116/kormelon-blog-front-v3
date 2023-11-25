import { ReactNode } from 'react';

interface OthersLayoutProps {
  children: ReactNode;
}

export default function OthersLayout({ children }: OthersLayoutProps) {
  return <>{children}</>;
}
