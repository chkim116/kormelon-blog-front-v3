import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Button, Input } from '@nextui-org/react';

interface SettingsCategoryCreatorProps {
  loading: boolean;
  onSubmit: (value: string) => Promise<void>;
}

export const SettingsCategoryCreator = ({
  loading,
  onSubmit,
}: SettingsCategoryCreatorProps) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!value) {
      setErrorMessage('값을 입력해 주세요.');
      return;
    }

    setErrorMessage('');
    value.trim();

    onSubmit(value).then(() => {
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
      onSubmit={handleSubmit}
    >
      <Input
        data-cy="create-category-input"
        id="category"
        name="category"
        placeholder="카테고리 입력"
        value={value}
        color={errorMessage ? 'danger' : 'default'}
        errorMessage={errorMessage}
        onChange={handleChange}
      />
      <Button
        data-cy="create-category-submit"
        isLoading={loading}
        isDisabled={loading}
        type="submit"
        color="primary"
      >
        생성
      </Button>
    </form>
  );
};
