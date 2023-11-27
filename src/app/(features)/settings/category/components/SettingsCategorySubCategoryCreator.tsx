'use client';

import {
  ChangeEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Input } from '@nextui-org/react';
import {
  Dialog,
  DialogOkCallback,
} from 'src/app/shared/components/common/Dialog';
import { PromiseResolver } from 'src/app/shared/uiStates/sharedCommon.uiState';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SettingsCategorySubCategoryCreatorProps {}

export interface SettingsCategorySubCategoryCreatorHandle {
  open(): Promise<string>;
}

export const SettingsCategorySubCategoryCreator = forwardRef<
  SettingsCategorySubCategoryCreatorHandle,
  SettingsCategorySubCategoryCreatorProps
>((_, ref) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const refResolver = useRef<PromiseResolver<string> | null>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const resetValue = () => {
    setOpen(false);
    setValue('');
    setErrorMessage('');
  };

  const handleOk = (close: DialogOkCallback) => {
    if (!value) {
      setErrorMessage('값을 입력해 주세요.');
      return;
    }

    refResolver.current?.resolve(value);
    resetValue();
    close();
  };

  const handleClose = () => {
    refResolver.current?.reject();
    resetValue();
  };

  useImperativeHandle(
    ref,
    () => ({
      open() {
        setOpen(true);

        return new Promise((resolve, reject) => {
          refResolver.current = {
            resolve,
            reject,
          };
        });
      },
    }),
    [],
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onOk={handleOk}
      className="pt-3"
      data-cy="create-dialog"
      closeText="닫기"
    >
      <Input
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        id="subCategory"
        data-cy="create-subcategory-input"
        autoComplete="off"
        placeholder="서브 카테고리 이름 작성"
        type="text"
        color={errorMessage ? 'danger' : 'default'}
        fullWidth
        value={value}
        variant="underlined"
        onChange={handleChange}
        errorMessage={errorMessage}
      />
    </Dialog>
  );
});

SettingsCategorySubCategoryCreator.displayName =
  'SettingsCategorySubCategoryCreator';
