'use client';
import { Button } from '@nextui-org/react';
import gravatar from 'gravatar';
import { toast } from '@shared2/services/ToastService';
import { useFormActionState } from '@shared2/hooks/useFormActionState';
import { useActionState } from '@shared2/hooks/useActionState';
import { SubmitButton } from '@shared2/components/common/SubmitButton';
import AuthRegisterForm from '../components/AuthRegisterForm';
import { actAuthProfileUpload, actAuthRegister } from '../actions/auth.action';

interface AuthRegisterContainerProps {
  onChangeClick: () => void;
}

const defaultProfileImage = gravatar.url('default', {
  s: '100',
  r: 'pg',
  d: 'retro',
  protocol: 'http',
});

export default function AuthRegisterContainer({
  onChangeClick,
}: AuthRegisterContainerProps) {
  const { formAction: handleSubmit } = useFormActionState(actAuthRegister, {
    onError({ message }) {
      toast.open('error', message);
    },
    onSuccess() {
      onChangeClick();
    },
  });

  const {
    action: handleUpload,
    state: { data: profileImage },
  } = useActionState(defaultProfileImage, actAuthProfileUpload, {
    onError(state) {
      toast.open('error', state.message);
    },
  });

  return (
    <>
      <AuthRegisterForm
        profileImage={profileImage}
        onSubmit={handleSubmit}
        onUpload={handleUpload}
      >
        <SubmitButton
          className="w-full"
          data-cy="registerButton"
          type="submit"
          color="primary"
        >
          Sign Up
        </SubmitButton>
      </AuthRegisterForm>
      <Button
        className="w-full mt-4"
        variant="light"
        data-cy="toLogin"
        onClick={onChangeClick}
      >
        로그인
      </Button>
    </>
  );
}
