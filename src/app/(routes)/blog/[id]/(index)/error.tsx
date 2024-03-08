'use client';

import { ComponentProps } from 'react';
import { ErrorComponent } from 'next/dist/client/components/error-boundary';
import { CommonError } from '@common/components/CommonError';

export default function BlogDetailErrorPage(_: ComponentProps<ErrorComponent>) {
  return <CommonError text="존재하지 않는 게시글 입니다 :(" />;
}
