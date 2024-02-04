'use client';

import { ChangeEventHandler, ReactNode, useState } from 'react';
import { Input } from '@nextui-org/react';
import { CategoryCreateUiParams } from '@features/categories/domains/category.uiState';

interface SettingsCategoryCreatorProps {
  onSubmit: (params: CategoryCreateUiParams) => Promise<void>;
  children: ReactNode;
}

export const SettingsCategoryCreator = ({
  onSubmit,
  children,
}: SettingsCategoryCreatorProps) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    if (!value) {
      setErrorMessage('값을 입력해 주세요.');
      return;
    }

    setErrorMessage('');
    value.trim();

    onSubmit({ value }).then(() => {
      setValue('');
    });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <form
      className="flex items-start py-4 max-w-xl w-full mb-12"
      autoComplete="off"
      action={handleSubmit}
    >
      <Input
        size="sm"
        classNames={{
          inputWrapper: 'h-10',
        }}
        id="category"
        name="category"
        placeholder="카테고리 입력"
        value={value}
        color={errorMessage ? 'danger' : 'default'}
        errorMessage={errorMessage}
        onChange={handleChange}
      />
      {children}
    </form>
  );
};
