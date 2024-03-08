'use client';
import { forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getPortal } from '@common/utils/getPortal';
import 'react-toastify/dist/ReactToastify.css';

export type ToastStatusType = 'error' | 'warning' | 'info' | 'success';

interface ToastProps {
  status?: ToastStatusType;
  message?: string;
}

export interface ToastHandle {
  open: (status: ToastStatusType, message: string) => void;
}

export const Toast = forwardRef<ToastHandle, ToastProps>((_, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      open(status: ToastStatusType, message: string) {
        toast[status](message, {
          position: 'top-center',
          toastId: 'feedback_' + Date.now(),
          autoClose: 2000,
        });
      },
    }),
    [],
  );

  const portal = getPortal();
  if (portal) {
    return createPortal(<ToastContainer />, portal);
  }
});

Toast.displayName = 'Toast';
