import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { useDeepCompareMemoize } from 'use-deep-compare-effect';

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

export const LucideIcon = ({ name, ...props }: IconProps) => {
  const Icon = useMemo(
    () => dynamic(dynamicIconImports[name]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [useDeepCompareMemoize({ name, ...props })],
  );

  return <Icon {...props} />;
};
