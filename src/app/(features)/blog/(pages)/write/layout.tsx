import { ReactNode } from 'react';

interface BlogWriteLayoutProps {
  children: ReactNode;
}

export default function BlogWriteLayout({ children }: BlogWriteLayoutProps) {
  return <section className="max-5xl mx-auto p-4 sm:p-12">{children}</section>;
}
