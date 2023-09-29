'use client';
import { LayoutFooter } from '@shared/components/layout';
import { useAppSelector } from '@shared/stores';
import { selViewValue } from '@shared/stores/view';

export function RootLayoutFooterClientContainer() {
  const view = useAppSelector(selViewValue);

  return <LayoutFooter view={view} />;
}
