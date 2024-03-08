'use client';

import { ComponentProps } from 'react';
import { ErrorComponent } from 'next/dist/client/components/error-boundary';
import { NotFoundError } from '@common/components/NotFoundError';

export default function NotFoundPage(_: ComponentProps<ErrorComponent>) {
  return <NotFoundError />;
}
