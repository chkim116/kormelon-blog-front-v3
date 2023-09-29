'use client';

import { ReactNode, useLayoutEffect } from 'react';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import { useAppDispatch } from '@shared/stores';
import { actAuthCheck } from '@shared/stores/auth';
// TODO:적절한 위로 이동
dayjs.extend(localizedFormat);

interface AuthClientContainerProps {
  children: ReactNode;
}

export function AuthClientContainer({ children }: AuthClientContainerProps) {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(actAuthCheck());
  }, [dispatch]);

  return <>{children}</>;
}
