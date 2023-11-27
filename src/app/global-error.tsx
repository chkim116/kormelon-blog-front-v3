'use client';

import { ComponentProps } from 'react';
import { ErrorComponent } from 'next/dist/client/components/error-boundary';
import { NotFoundError } from '@shared/components/error/NotFoundError';

export default function GlobalErrorPage(_: ComponentProps<ErrorComponent>) {
  return (
    <html lang="ko">
      <body>
        <NotFoundError />
      </body>
    </html>
  );
}
