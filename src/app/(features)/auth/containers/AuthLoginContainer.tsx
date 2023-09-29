'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { useAppDispatch } from '@shared/stores';
import { effAuthLogin, selAuthLoading } from '@shared/stores/auth';
import { AuthLoginParamsModel } from '@domain/uiStates';
import { toast } from '@shared/services';
import { AuthLoginForm } from '../components/AuthLoginForm';

interface AuthLoginContainerPropsProps {
  onChangeClick: () => void;
}

export const AuthLoginContainer = ({
  onChangeClick,
}: AuthLoginContainerPropsProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selAuthLoading);
  const router = useRouter();

  const handleSubmit = (params: AuthLoginParamsModel) => {
    dispatch(effAuthLogin(params))
      .unwrap()
      .then(() => router.push('/blog'))
      .catch((err) => {
        toast.open('error', err.message);
      });
  };

  return (
    <>
      <AuthLoginForm isLoading={isLoading} onSubmit={handleSubmit} />
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
};
