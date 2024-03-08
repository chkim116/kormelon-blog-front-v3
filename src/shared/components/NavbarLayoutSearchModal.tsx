'use client';
import {
  ChangeEventHandler,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Input,
  Kbd,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import { LucideIcon } from '@common/components/LucideIcon';

export interface NavbarSearchModalHandle {
  open: () => Promise<string>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NavbarSearchModalProps {}

export const NavbarSearchModal = forwardRef<
  NavbarSearchModalHandle,
  NavbarSearchModalProps
>((_, ref) => {
  const refResolver = useRef<((value: string) => void) | null>(null);
  const refInput = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleChange = (value: string) => {
    setValue(value);
  };

  const handleSubmit: ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const resolve = refResolver.current;
    resolve?.(value);

    onClose();
  };

  useImperativeHandle(
    ref,
    () => ({
      open() {
        onOpen();

        return new Promise((resolve) => {
          refResolver.current = resolve;
        });
      },
    }),
    [onOpen],
  );

  useEffect(() => {
    if (isOpen) {
      refInput.current?.focus();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      hideCloseButton
    >
      <ModalContent>
        {() => (
          <ModalBody className="p-0">
            <form onSubmit={handleSubmit}>
              <Input
                onValueChange={handleChange}
                enterKeyHint="search"
                ref={refInput}
                type="search"
                size="lg"
                placeholder="Search Blog Post"
                startContent={<LucideIcon name="search" size={18} />}
                endContent={<Kbd>ESC</Kbd>}
              />
            </form>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
});

NavbarSearchModal.displayName = 'LayoutSearchModal';
