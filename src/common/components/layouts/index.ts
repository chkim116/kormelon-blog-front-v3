import dynamic from 'next/dynamic';

export const Header = dynamic(
  () => import('./Header').then(({ Header }) => Header),
  {
    ssr: false,
  },
);
export const Footer = dynamic(
  () => import('./Footer').then((component) => component.Footer),
  { ssr: false },
);

export * from './Main';
