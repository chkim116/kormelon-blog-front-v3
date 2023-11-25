import { ReactNode } from 'react';

interface CommentLayoutProps {
  children: ReactNode;
}

export default function CommentLayout({ children }: CommentLayoutProps) {
  return <section className="py-12 sm:py-16 lg:py-20">{children}</section>;
}
