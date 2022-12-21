import { ComponentType, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { env } from '@common/env';
import { Dialog } from '@common/components';

function usePreventPageLeave(path = '/') {
  const { push, asPath, beforePopState } = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleOk = () => {
    setIsOpen(false);
    push(path);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePreventLeave = useCallback(() => {
    setIsOpen(true);
    push(asPath);
    return false;
  }, [asPath, push]);

  useEffect(() => {
    if (!env.isSSR) {
      beforePopState(handlePreventLeave);
      window.onbeforeunload = (e) => {
        e.preventDefault();
        e.returnValue = '';
        return false;
      };
    }

    return () => {
      window.onbeforeunload = null;
      beforePopState(() => true);
    };
  }, [beforePopState, handlePreventLeave]);

  const PreventDialog = () => (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      onOk={handleOk}
      text="나가시나요?"
    />
  );

  return { PreventDialog };
}

/**
 * 페이지에서 나가는 행위를 막는 HOC
 *
 * @param Component
 * @param path
 * @returns
 */
export function WithPreventPageLeave(Component: ComponentType, path?: string) {
  return function PreventPageLeave() {
    const { PreventDialog } = usePreventPageLeave(path);

    return (
      <>
        <PreventDialog />
        <Component />
      </>
    );
  };
}
