import { ReactNode } from 'react';
import { Container } from '@mui/material';
import styled from '@emotion/styled';

interface MainProps {
  children: ReactNode;
}

const Wrap = styled.main`
  width: 100%;
  min-height: calc(100vh - 64px);
`;

export const Main = ({ children }: MainProps) => (
  <Wrap>
    <Container maxWidth="xl">{children}</Container>
  </Wrap>
);
