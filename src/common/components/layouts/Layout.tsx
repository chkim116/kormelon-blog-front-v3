import { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <div>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </div>
);
