import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}
export const Main = ({ children }: MainProps) => <main>{children}</main>;
