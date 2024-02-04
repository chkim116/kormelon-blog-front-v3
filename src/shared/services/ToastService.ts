'use client';
import { createElement } from 'react';
import { Root, createRoot } from 'react-dom/client';
import {
  Toast,
  ToastStatusType,
  ToastHandle,
} from '../components/common/Toast';
import { getPortal } from '../utils/getPortal';

function ToastService() {
  const portal = getPortal();
  const root: Root | null = portal ? createRoot(portal) : null;

  return {
    open(
      status: ToastStatusType = 'error',
      message = '알 수 없는 에러입니다.',
    ) {
      const refHandler = (feedbackHandler: ToastHandle) => {
        feedbackHandler?.open(status, message);
      };

      const element = createElement(Toast, {
        ref: refHandler,
      });

      if (root) {
        root.render(element);
      }
    },
  };
}

export const toast = ToastService();
