'use client';
import { Button } from '@nextui-org/react';
import gravatar from 'gravatar';
import { toString } from 'safers';
import { toast } from '@shared/services/ToastService';
import { useActionState } from '@shared/hooks/useActionState';
import { SubmitButton } from '@shared/components/common/SubmitButton';
import AuthRegisterForm from '../components/AuthRegisterForm';
import { actAuthProfileUpload } from '../actions/auth.action';
import { AuthRegisterUiParams } from '../../../shared/domains/auth/auth.uiState';
import { authService } from '../../../shared/domains/auth';

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
  const {
    action: handleUpload,
    state: { data: profileImage },
  } = useActionState(defaultProfileImage, actAuthProfileUpload, {
    onError(state) {
      toast.open('error', state.message);
    },
  });

  const handleSubmit = async (params: AuthRegisterUiParams) => {
    await authService
      .register(params)
      .then(() => {
        toast.open('success', '회원가입이 완료되었습니다.');
        onChangeClick();
        return;
      })
      .catch((error) => {
        toast.open('error', toString(error.message));
      });
  };

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
