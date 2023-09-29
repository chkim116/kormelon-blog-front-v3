import React, { ChangeEventHandler, useState } from 'react';
import { Input } from '@nextui-org/react';
import { Dialog } from '@shared/components/common';

interface SettingsCategorySubCategoryCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onOk: (value: string) => void;
}

export const SettingsCategorySubCategoryCreator = ({
  isOpen,
  onClose,
  onOk,
}: SettingsCategorySubCategoryCreatorProps) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleOk = () => {
    if (!value) {
      setErrorMessage('값을 입력해 주세요.');
      return;
    }

    onOk(value);
    setValue('');
    setErrorMessage('');
  };

  const handleClose = () => {
    onClose();
    setValue('');
    setErrorMessage('');
  };

  return (
    <Dialog
      open={isOpen}
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
        variant="underlined"
        onChange={handleChange}
        errorMessage={errorMessage}
      />
    </Dialog>
  );
};
