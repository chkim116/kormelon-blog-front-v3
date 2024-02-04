import React from 'react';
import { Button, ButtonProps } from '@nextui-org/react';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps extends ButtonProps {}

export const SubmitButton = (props: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return <Button {...props} isLoading={pending || props.isLoading} />;
};
