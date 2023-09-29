import { ReactNode } from 'react';
import { LayoutMain } from '@shared/components/layout';
import { AuthClientContainer } from './AuthClientContainer';
import { RootLayoutNavbarClientContainer } from './RootLayoutNavbarClientContainer';
import { RootLayoutFooterClientContainer } from './RootLayoutFooterClientContainer';

interface RootLayoutContainerProps {
  children: ReactNode;
}

export function RootLayoutContainer({ children }: RootLayoutContainerProps) {
  return (
    <AuthClientContainer>
      <RootLayoutNavbarClientContainer />
      <LayoutMain>{children}</LayoutMain>
      <RootLayoutFooterClientContainer />
    </AuthClientContainer>
  );
}
