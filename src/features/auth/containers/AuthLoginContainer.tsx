'use client';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { toString } from 'safers';
import { SubmitButton } from '@common/components/SubmitButton';
import { toast } from '@common/lib/ToastService';
import AuthLoginForm from '../components/AuthLoginForm';
import { AuthLoginUiParams } from '../../../shared/domains/auth/auth.uiState';
import { authService } from '../../../shared/domains/auth';

interface AuthLoginContainerPropsProps {
  onChangeClick: () => void;
}

export default function AuthLoginContainer({
  onChangeClick,
}: AuthLoginContainerPropsProps) {
  const router = useRouter();

  const handleLogin = async (params: AuthLoginUiParams) => {
    await authService
      .login(params)
      .then(() => {
        toast.open('success', '로그인 되었습니다.');
        router.push('/blog');
      })
      .catch((err) => {
        toast.open('error', toString(err.message));
      });
  };

  return (
    <>
      <AuthLoginForm onSubmit={handleLogin}>
        <SubmitButton
          className="w-full"
          type="submit"
          color="primary"
          data-cy="signInButton"
        >
          Sign in
        </SubmitButton>
      </AuthLoginForm>

      <Button
        className="w-full mt-4"
        variant="light"
        data-cy="toRegister"
        onClick={onChangeClick}
      >
        회원가입
      </Button>
    </>
  );
}
