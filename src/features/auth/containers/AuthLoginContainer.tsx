'use client';
import { Button } from '@nextui-org/react';
import { toast } from '@shared2/services/ToastService';
import { SubmitButton } from '@shared2/components/common/SubmitButton';
import { useFormActionState } from '@shared2/hooks/useFormActionState';
import AuthLoginForm from '../components/AuthLoginForm';
import { actAuthLogin } from '../actions/auth.action';

interface AuthLoginContainerPropsProps {
  onChangeClick: () => void;
}

export default function AuthLoginContainer({
  onChangeClick,
}: AuthLoginContainerPropsProps) {
  const { formAction: handleSubmit } = useFormActionState(actAuthLogin, {
    onError({ message }) {
      toast.open('error', message);
    },
    onSuccess(_, { redirectPath }) {
      redirectPath('/blog');
    },
  });

  return (
    <>
      <AuthLoginForm onSubmit={handleSubmit}>
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
