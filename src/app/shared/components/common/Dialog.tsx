'use client';
import { ReactNode, useEffect } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
  Button,
  ModalHeader,
} from '@nextui-org/react';

interface DialogProps {
  open?: boolean;
  text?: string;
  className?: string;
  hideClose?: boolean;
  hideOk?: boolean;
  okText?: string;
  closeText?: string;
  onOk?: (close: () => void) => void;
  onClose?: () => void;
  children?: ReactNode;
}

// TODO: headless UI로 변경
export const Dialog = ({
  open = false,
  text = '',
  hideClose = false,
  hideOk = false,
  className,
  okText = '확인',
  closeText = '취소',
  children,
  onOk,
  onClose,
}: DialogProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClose = () => {
    onOpenChange();

    onClose?.();
  };

  const handleOk = () => {
    onOk?.(onOpenChange);
  };

  useEffect(() => {
    if (open) {
      onOpen();
    }
  }, [onOpen, open]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent className={className}>
        {() => (
          <>
            <ModalHeader>{text}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              {!hideClose && (
                <Button color="danger" variant="flat" onPress={handleClose}>
                  {closeText}
                </Button>
              )}
              {!hideOk && (
                <Button color="primary" onPress={handleOk}>
                  {okText}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
